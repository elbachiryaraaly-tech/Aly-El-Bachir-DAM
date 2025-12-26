const express = require('express');
const router = express.Router();
const { initializeDatabase } = require('../database/db');

// Inicializar base de datos
initializeDatabase();

// Conectar al vehículo
router.post('/connect', async (req, res) => {
  try {
    const { protocol = 'auto' } = req.body;
    
    // Simulación de conexión OBD
    const connection = {
      connected: true,
      protocol: protocol === 'auto' ? 'ISO 9141-2' : protocol,
      vin: generateVIN(),
      ecuCount: Math.floor(Math.random() * 5) + 3,
      supportedPIDs: generateSupportedPIDs(),
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Conexión establecida exitosamente',
      data: connection
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al conectar',
      error: error.message
    });
  }
});

// Desconectar
router.post('/disconnect', (req, res) => {
  res.json({
    success: true,
    message: 'Desconectado exitosamente'
  });
});

// Información del vehículo
router.get('/vehicle-info', (req, res) => {
  const vehicleInfo = {
    vin: generateVIN(),
    make: 'Toyota',
    model: 'Camry',
    year: 2020,
    engine: '2.5L 4-Cylinder',
    transmission: 'Automatic',
    mileage: Math.floor(Math.random() * 50000) + 10000,
    lastService: '2024-01-15',
    nextService: '2024-07-15'
  };

  res.json({
    success: true,
    data: vehicleInfo
  });
});

// Escaneo completo del sistema
router.post('/full-scan', async (req, res) => {
  try {
    const scanResults = {
      timestamp: new Date().toISOString(),
      duration: Math.floor(Math.random() * 30) + 10,
      modules: [
        { name: 'Engine Control Module', status: 'OK', dtcCount: 0 },
        { name: 'Transmission Control Module', status: 'OK', dtcCount: 0 },
        { name: 'Anti-lock Brake System', status: 'OK', dtcCount: 0 },
        { name: 'Airbag Control Module', status: 'OK', dtcCount: 0 },
        { name: 'Body Control Module', status: 'WARNING', dtcCount: 1 }
      ],
      totalDTCs: 1,
      criticalIssues: 0,
      warnings: 1
    };

    res.json({
      success: true,
      data: scanResults
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en escaneo completo',
      error: error.message
    });
  }
});

// Función auxiliar para generar VIN
function generateVIN() {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789';
  let vin = '';
  for (let i = 0; i < 17; i++) {
    vin += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return vin;
}

// Función auxiliar para generar PIDs soportados
function generateSupportedPIDs() {
  return [
    'PIDs 01-20', 'PIDs 21-40', 'PIDs 41-60', 'PIDs 61-80',
    'PIDs 81-A0', 'PIDs A1-C0', 'PIDs C1-E0'
  ];
}

module.exports = router;
