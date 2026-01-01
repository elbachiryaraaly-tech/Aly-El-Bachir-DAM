const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Almacenamiento en memoria de dispositivos y ubicaciones
const devices = new Map(); // deviceId -> { name, type, location, lastUpdate }

// Ruta principal - servir la aplicación web
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API REST para obtener ubicaciones
app.get('/api/devices', (req, res) => {
  const devicesArray = Array.from(devices.entries()).map(([id, data]) => ({
    id,
    ...data
  }));
  res.json(devicesArray);
});

app.get('/api/device/:id', (req, res) => {
  const device = devices.get(req.params.id);
  if (device) {
    res.json({ id: req.params.id, ...device });
  } else {
    res.status(404).json({ error: 'Dispositivo no encontrado' });
  }
});

// WebSocket para actualizaciones en tiempo real
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  // Registrar nuevo dispositivo
  socket.on('register-device', (data) => {
    const deviceId = data.deviceId || uuidv4();
    const deviceName = data.name || `Dispositivo ${deviceId.substring(0, 8)}`;
    const deviceType = data.type || 'unknown';

    devices.set(deviceId, {
      name: deviceName,
      type: deviceType,
      location: null,
      lastUpdate: null,
      socketId: socket.id
    });

    socket.deviceId = deviceId;
    socket.emit('device-registered', { deviceId, name: deviceName });

    // Enviar lista de dispositivos al nuevo cliente
    const devicesArray = Array.from(devices.entries()).map(([id, data]) => ({
      id,
      name: data.name,
      type: data.type,
      location: data.location,
      lastUpdate: data.lastUpdate
    }));
    socket.emit('devices-updated', devicesArray);

    // Notificar a otros clientes sobre el nuevo dispositivo
    socket.broadcast.emit('device-added', {
      id: deviceId,
      name: deviceName,
      type: deviceType
    });

    console.log(`Dispositivo registrado: ${deviceName} (${deviceId})`);
  });

  // Actualizar ubicación
  socket.on('update-location', (data) => {
    if (!socket.deviceId) {
      socket.emit('error', { message: 'Dispositivo no registrado' });
      return;
    }

    const device = devices.get(socket.deviceId);
    if (device) {
      device.location = {
        latitude: data.latitude,
        longitude: data.longitude,
        accuracy: data.accuracy,
        altitude: data.altitude || null,
        heading: data.heading || null,
        speed: data.speed || null,
        timestamp: new Date().toISOString()
      };
      device.lastUpdate = new Date().toISOString();

      // Enviar actualización a todos los clientes conectados
      io.emit('location-updated', {
        deviceId: socket.deviceId,
        location: device.location
      });

      console.log(`Ubicación actualizada para ${device.name}:`, device.location);
    }
  });

  // Solicitar ubicación de otro dispositivo
  socket.on('request-location', (data) => {
    const targetDevice = devices.get(data.deviceId);
    if (targetDevice && targetDevice.location) {
      socket.emit('location-response', {
        deviceId: data.deviceId,
        location: targetDevice.location
      });
    } else {
      socket.emit('location-response', {
        deviceId: data.deviceId,
        location: null,
        error: 'Ubicación no disponible'
      });
    }
  });

  // Desconexión
  socket.on('disconnect', () => {
    if (socket.deviceId) {
      const device = devices.get(socket.deviceId);
      if (device) {
        console.log(`Dispositivo desconectado: ${device.name}`);
        devices.delete(socket.deviceId);
        socket.broadcast.emit('device-removed', { deviceId: socket.deviceId });
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('Listo para recibir conexiones de dispositivos...');
});
