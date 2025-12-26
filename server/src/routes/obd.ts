import { Router } from 'express';
import { OBDSimulator } from '../services/obdSimulator';

const router = Router();
const obdSimulator = new OBDSimulator();

// Conectar a OBD
router.post('/connect', (req, res) => {
  // Simular conexión exitosa
  res.json({
    success: true,
    message: 'Conectado al vehículo via OBD-II',
    protocol: 'ISO 15765-4 CAN (11 bit ID, 500 kbaud)',
    vehicle: obdSimulator.getVehicleInfo()
  });
});

// Desconectar de OBD
router.post('/disconnect', (req, res) => {
  res.json({
    success: true,
    message: 'Desconectado del vehículo'
  });
});

// Obtener datos en tiempo real
router.get('/realtime', (req, res) => {
  const data = obdSimulator.getRealtimeData();
  res.json(data);
});

// Obtener información del vehículo
router.get('/vehicle-info', (req, res) => {
  const info = obdSimulator.getVehicleInfo();
  res.json(info);
});

// Leer códigos DTC
router.get('/dtc', (req, res) => {
  const codes = obdSimulator.getDTCCodes();
  res.json({
    count: codes.length,
    codes: codes
  });
});

// Borrar códigos DTC
router.delete('/dtc', (req, res) => {
  obdSimulator.clearDTC();
  res.json({
    success: true,
    message: 'Códigos DTC borrados exitosamente'
  });
});

// Simular problema (para demo)
router.post('/simulate-problem', (req, res) => {
  const { code } = req.body;
  obdSimulator.simulateProblem(code);
  res.json({
    success: true,
    message: `Problema ${code} simulado`
  });
});

// Toggle motor (para demo)
router.post('/toggle-engine', (req, res) => {
  obdSimulator.toggleEngine();
  res.json({
    success: true
  });
});

export default router;
