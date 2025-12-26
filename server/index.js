const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importar rutas
const diagnosticRoutes = require('./routes/diagnostic');
const dtcRoutes = require('./routes/dtc');
const sensorRoutes = require('./routes/sensors');
const historyRoutes = require('./routes/history');

// Rutas API
app.use('/api/diagnostic', diagnosticRoutes);
app.use('/api/dtc', dtcRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/history', historyRoutes);

// Ruta de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Plataforma de Diagnóstico Automotriz funcionando' });
});

// WebSocket para datos en tiempo real
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('start-monitoring', () => {
    // Simular datos en tiempo real
    const interval = setInterval(() => {
      const sensorData = generateSensorData();
      socket.emit('sensor-data', sensorData);
    }, 1000);

    socket.on('disconnect', () => {
      clearInterval(interval);
    });
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Función para generar datos de sensores simulados
function generateSensorData() {
  return {
    timestamp: new Date().toISOString(),
    rpm: Math.floor(Math.random() * 3000) + 1000,
    speed: Math.floor(Math.random() * 120),
    coolantTemp: Math.floor(Math.random() * 40) + 80,
    intakeTemp: Math.floor(Math.random() * 30) + 20,
    maf: (Math.random() * 50 + 10).toFixed(2),
    throttle: Math.floor(Math.random() * 100),
    fuelLevel: Math.floor(Math.random() * 100),
    engineLoad: Math.floor(Math.random() * 100),
    timingAdvance: (Math.random() * 20 - 10).toFixed(2),
    oxygenSensor: (Math.random() * 2).toFixed(3),
    fuelPressure: Math.floor(Math.random() * 50) + 30,
    batteryVoltage: (Math.random() * 2 + 12).toFixed(2)
  };
}

server.listen(PORT, () => {
  console.log(`🚗 Servidor de diagnóstico ejecutándose en puerto ${PORT}`);
  console.log(`📡 WebSocket disponible para datos en tiempo real`);
});
