const express = require('express');
const router = express.Router();

// Obtener historial de diagnósticos
router.get('/', (req, res) => {
  const history = [
    {
      id: 1,
      date: '2024-03-15T10:30:00Z',
      type: 'Full Scan',
      dtcCount: 0,
      status: 'OK',
      duration: 25,
      vehicle: 'Toyota Camry 2020'
    },
    {
      id: 2,
      date: '2024-03-10T14:20:00Z',
      type: 'DTC Read',
      dtcCount: 2,
      status: 'Warning',
      duration: 5,
      vehicle: 'Toyota Camry 2020'
    },
    {
      id: 3,
      date: '2024-03-05T09:15:00Z',
      type: 'Sensor Monitoring',
      dtcCount: 0,
      status: 'OK',
      duration: 300,
      vehicle: 'Toyota Camry 2020'
    }
  ];

  res.json({
    success: true,
    data: history
  });
});

// Guardar diagnóstico en historial
router.post('/', (req, res) => {
  const { type, dtcCount, status, duration, vehicle } = req.body;
  
  const newEntry = {
    id: Date.now(),
    date: new Date().toISOString(),
    type,
    dtcCount,
    status,
    duration,
    vehicle
  };

  res.json({
    success: true,
    message: 'Diagnóstico guardado en historial',
    data: newEntry
  });
});

// Obtener estadísticas
router.get('/stats', (req, res) => {
  const stats = {
    totalScans: 45,
    totalDTCsFound: 12,
    averageScanDuration: 18,
    mostCommonDTC: 'P0420',
    lastScan: '2024-03-15T10:30:00Z',
    vehiclesScanned: 3
  };

  res.json({
    success: true,
    data: stats
  });
});

module.exports = router;
