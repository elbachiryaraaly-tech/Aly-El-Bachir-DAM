import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import { initDatabase } from './database';
import obdRoutes from './routes/obd';
import diagnosticRoutes from './routes/diagnostic';
import vehicleRoutes from './routes/vehicle';
import maintenanceRoutes from './routes/maintenance';
import analyticsRoutes from './routes/analytics';
import { OBDSimulator } from './services/obdSimulator';
import { broadcastRealTimeData } from './services/websocket';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Inicializar base de datos
initDatabase();

// Rutas
app.use('/api/obd', obdRoutes);
app.use('/api/diagnostic', diagnosticRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/analytics', analyticsRoutes);

// Crear servidor HTTP
const server = createServer(app);

// Configurar WebSocket para datos en tiempo real
const wss = new WebSocketServer({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('Cliente WebSocket conectado');
  
  ws.on('message', (message) => {
    console.log('Mensaje recibido:', message.toString());
  });

  ws.on('close', () => {
    console.log('Cliente WebSocket desconectado');
  });
});

// Iniciar simulador OBD y broadcasting
const obdSimulator = new OBDSimulator();
setInterval(() => {
  const data = obdSimulator.getRealtimeData();
  broadcastRealTimeData(wss, data);
}, 100); // Actualización cada 100ms para datos ultra fluidos

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CarDiag Pro Ultra API funcionando correctamente' });
});

server.listen(PORT, () => {
  console.log(`🚗 CarDiag Pro Ultra Server corriendo en puerto ${PORT}`);
  console.log(`🔌 WebSocket disponible en ws://localhost:${PORT}/ws`);
});
