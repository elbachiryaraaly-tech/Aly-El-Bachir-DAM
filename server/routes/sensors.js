const express = require('express');
const router = express.Router();

// Obtener todos los sensores disponibles
router.get('/list', (req, res) => {
  const sensors = [
    {
      id: 'rpm',
      name: 'RPM del Motor',
      unit: 'rpm',
      min: 0,
      max: 8000,
      category: 'Motor'
    },
    {
      id: 'speed',
      name: 'Velocidad',
      unit: 'km/h',
      min: 0,
      max: 200,
      category: 'Velocidad'
    },
    {
      id: 'coolantTemp',
      name: 'Temperatura del Refrigerante',
      unit: '°C',
      min: -40,
      max: 215,
      category: 'Temperatura'
    },
    {
      id: 'intakeTemp',
      name: 'Temperatura del Aire de Admisión',
      unit: '°C',
      min: -40,
      max: 215,
      category: 'Temperatura'
    },
    {
      id: 'maf',
      name: 'Flujo de Aire Masivo (MAF)',
      unit: 'g/s',
      min: 0,
      max: 655,
      category: 'Aire/Combustible'
    },
    {
      id: 'throttle',
      name: 'Posición del Acelerador',
      unit: '%',
      min: 0,
      max: 100,
      category: 'Motor'
    },
    {
      id: 'fuelLevel',
      name: 'Nivel de Combustible',
      unit: '%',
      min: 0,
      max: 100,
      category: 'Combustible'
    },
    {
      id: 'engineLoad',
      name: 'Carga del Motor',
      unit: '%',
      min: 0,
      max: 100,
      category: 'Motor'
    },
    {
      id: 'timingAdvance',
      name: 'Avance del Encendido',
      unit: '°',
      min: -64,
      max: 63.5,
      category: 'Motor'
    },
    {
      id: 'oxygenSensor',
      name: 'Sensor de Oxígeno',
      unit: 'V',
      min: 0,
      max: 1.275,
      category: 'Aire/Combustible'
    },
    {
      id: 'fuelPressure',
      name: 'Presión de Combustible',
      unit: 'kPa',
      min: 0,
      max: 765,
      category: 'Combustible'
    },
    {
      id: 'batteryVoltage',
      name: 'Voltaje de Batería',
      unit: 'V',
      min: 0,
      max: 65.535,
      category: 'Eléctrico'
    }
  ];

  res.json({
    success: true,
    data: sensors
  });
});

// Obtener valor actual de un sensor
router.get('/:sensorId', (req, res) => {
  const { sensorId } = req.params;
  
  // Valores simulados según el sensor
  const sensorValues = {
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

  const value = sensorValues[sensorId] || 0;

  res.json({
    success: true,
    data: {
      sensorId,
      value: parseFloat(value),
      timestamp: new Date().toISOString()
    }
  });
});

// Obtener múltiples sensores
router.post('/batch', (req, res) => {
  const { sensorIds } = req.body;
  
  const sensorValues = {
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

  const results = sensorIds.map(id => ({
    sensorId: id,
    value: parseFloat(sensorValues[id] || 0),
    timestamp: new Date().toISOString()
  }));

  res.json({
    success: true,
    data: results
  });
});

module.exports = router;
