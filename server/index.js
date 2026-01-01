const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, '../data/locations.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Almacenamiento en memoria de ubicaciones activas
const activeDevices = new Map();

// Cargar datos persistentes
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error cargando datos:', error);
  }
  return { devices: {} };
}

// Guardar datos
function saveData(data) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error guardando datos:', error);
  }
}

// API REST Endpoints
app.get('/api/devices', (req, res) => {
  const devices = Array.from(activeDevices.values());
  res.json({ devices });
});

app.post('/api/device/register', (req, res) => {
  const { deviceName, deviceType } = req.body;
  const deviceId = uuidv4();
  
  const device = {
    id: deviceId,
    name: deviceName || `Dispositivo ${deviceType}`,
    type: deviceType || 'unknown',
    registeredAt: new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    location: null
  };
  
  activeDevices.set(deviceId, device);
  
  // Guardar en archivo
  const data = loadData();
  data.devices[deviceId] = device;
  saveData(data);
  
  res.json({ success: true, device });
});

app.post('/api/location/update', (req, res) => {
  const { deviceId, location } = req.body;
  
  if (!deviceId || !location) {
    return res.status(400).json({ error: 'deviceId y location son requeridos' });
  }
  
  const device = activeDevices.get(deviceId);
  if (!device) {
    return res.status(404).json({ error: 'Dispositivo no encontrado' });
  }
  
  device.location = {
    ...location,
    timestamp: new Date().toISOString()
  };
  device.lastSeen = new Date().toISOString();
  
  activeDevices.set(deviceId, device);
  
  // Emitir actualización a todos los clientes conectados
  io.emit('location-update', {
    deviceId,
    device
  });
  
  // Guardar en archivo
  const data = loadData();
  data.devices[deviceId] = device;
  saveData(data);
  
  res.json({ success: true, device });
});

// WebSocket para actualizaciones en tiempo real
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  
  // Enviar lista de dispositivos al conectarse
  socket.emit('devices-list', {
    devices: Array.from(activeDevices.values())
  });
  
  // Registrar dispositivo
  socket.on('register-device', (data) => {
    const { deviceName, deviceType } = data;
    const deviceId = data.deviceId || uuidv4();
    
    const device = {
      id: deviceId,
      name: deviceName || `Dispositivo ${deviceType}`,
      type: deviceType || 'unknown',
      socketId: socket.id,
      registeredAt: new Date().toISOString(),
      lastSeen: new Date().toISOString(),
      location: null
    };
    
    activeDevices.set(deviceId, device);
    
    socket.emit('device-registered', { device });
    
    // Notificar a todos los demás clientes
    socket.broadcast.emit('new-device', { device });
    
    console.log(`Dispositivo registrado: ${device.name} (${deviceId})`);
  });
  
  // Actualizar ubicación
  socket.on('update-location', (data) => {
    const { deviceId, location } = data;
    
    const device = activeDevices.get(deviceId);
    if (device) {
      device.location = {
        ...location,
        timestamp: new Date().toISOString()
      };
      device.lastSeen = new Date().toISOString();
      
      activeDevices.set(deviceId, device);
      
      // Emitir a todos los clientes
      io.emit('location-update', {
        deviceId,
        device
      });
      
      // Guardar periódicamente
      const data = loadData();
      data.devices[deviceId] = device;
      saveData(data);
    }
  });
  
  // Solicitar ubicación de un dispositivo específico
  socket.on('request-location', (data) => {
    const { targetDeviceId } = data;
    const device = activeDevices.get(targetDeviceId);
    
    if (device && device.socketId) {
      io.to(device.socketId).emit('location-requested');
    }
  });
  
  // Desconexión
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
    
    // Marcar dispositivo como desconectado pero mantener en memoria
    for (const [deviceId, device] of activeDevices.entries()) {
      if (device.socketId === socket.id) {
        device.socketId = null;
        device.lastSeen = new Date().toISOString();
        activeDevices.set(deviceId, device);
      }
    }
  });
});

// Cargar dispositivos guardados al iniciar
const savedData = loadData();
if (savedData.devices) {
  Object.entries(savedData.devices).forEach(([deviceId, device]) => {
    activeDevices.set(deviceId, device);
  });
  console.log(`Cargados ${activeDevices.size} dispositivos desde archivo`);
}

// Iniciar servidor
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor de rastreo de ubicación ejecutándose en puerto ${PORT}`);
  console.log(`📱 Abre http://localhost:${PORT} en tus dispositivos`);
});
