const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

// Almacenamiento en memoria de dispositivos y ubicaciones
const devices = new Map();
const deviceGroups = new Map(); // Agrupa dispositivos por código de sincronización

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API para obtener información del servidor
app.get('/api/status', (req, res) => {
  res.json({ 
    status: 'online', 
    connectedDevices: devices.size,
    timestamp: new Date().toISOString()
  });
});

// Manejo de conexiones WebSocket
io.on('connection', (socket) => {
  console.log(`[${new Date().toISOString()}] Nuevo dispositivo conectado: ${socket.id}`);
  
  // Registrar dispositivo
  socket.on('register-device', (data) => {
    const deviceInfo = {
      id: socket.id,
      name: data.name || 'Dispositivo desconocido',
      type: data.type || 'unknown', // 'mobile' o 'desktop'
      syncCode: data.syncCode,
      location: null,
      lastUpdate: null,
      accuracy: null,
      battery: data.battery || null
    };
    
    devices.set(socket.id, deviceInfo);
    
    // Unirse al grupo de sincronización
    if (data.syncCode) {
      socket.join(data.syncCode);
      
      if (!deviceGroups.has(data.syncCode)) {
        deviceGroups.set(data.syncCode, new Set());
      }
      deviceGroups.get(data.syncCode).add(socket.id);
      
      // Notificar a otros dispositivos del grupo
      socket.to(data.syncCode).emit('device-joined', {
        id: socket.id,
        name: deviceInfo.name,
        type: deviceInfo.type
      });
      
      // Enviar lista de dispositivos actuales al nuevo dispositivo
      const groupDevices = [];
      deviceGroups.get(data.syncCode).forEach(deviceId => {
        if (deviceId !== socket.id && devices.has(deviceId)) {
          const dev = devices.get(deviceId);
          groupDevices.push({
            id: dev.id,
            name: dev.name,
            type: dev.type,
            location: dev.location,
            lastUpdate: dev.lastUpdate,
            accuracy: dev.accuracy
          });
        }
      });
      
      socket.emit('devices-list', groupDevices);
    }
    
    console.log(`[${new Date().toISOString()}] Dispositivo registrado: ${deviceInfo.name} (${deviceInfo.type}) - Código: ${data.syncCode}`);
  });
  
  // Actualizar ubicación
  socket.on('update-location', (data) => {
    const device = devices.get(socket.id);
    if (device) {
      device.location = {
        latitude: data.latitude,
        longitude: data.longitude,
        altitude: data.altitude || null
      };
      device.accuracy = data.accuracy;
      device.lastUpdate = new Date().toISOString();
      device.speed = data.speed || null;
      device.heading = data.heading || null;
      
      // Emitir a todos los dispositivos del mismo grupo
      if (device.syncCode) {
        socket.to(device.syncCode).emit('location-update', {
          id: socket.id,
          name: device.name,
          type: device.type,
          location: device.location,
          accuracy: device.accuracy,
          lastUpdate: device.lastUpdate,
          speed: device.speed,
          heading: device.heading
        });
      }
      
      console.log(`[${new Date().toISOString()}] Ubicación actualizada: ${device.name} - Lat: ${data.latitude}, Lng: ${data.longitude}, Precisión: ${data.accuracy}m`);
    }
  });
  
  // Solicitar ubicación de otro dispositivo
  socket.on('request-location', (targetId) => {
    io.to(targetId).emit('location-requested', { requesterId: socket.id });
  });
  
  // Desconexión
  socket.on('disconnect', () => {
    const device = devices.get(socket.id);
    if (device) {
      console.log(`[${new Date().toISOString()}] Dispositivo desconectado: ${device.name}`);
      
      // Notificar al grupo
      if (device.syncCode) {
        socket.to(device.syncCode).emit('device-left', {
          id: socket.id,
          name: device.name
        });
        
        // Eliminar del grupo
        if (deviceGroups.has(device.syncCode)) {
          deviceGroups.get(device.syncCode).delete(socket.id);
          if (deviceGroups.get(device.syncCode).size === 0) {
            deviceGroups.delete(device.syncCode);
          }
        }
      }
      
      devices.delete(socket.id);
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║     🌍 Device Location Tracker - Servidor Iniciado        ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  Puerto: ${PORT}                                              ║
║  URL Local: http://localhost:${PORT}                          ║
║                                                            ║
║  Para acceder desde otros dispositivos en la red local:    ║
║  Usa tu IP local (ej: http://192.168.x.x:${PORT})             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});
