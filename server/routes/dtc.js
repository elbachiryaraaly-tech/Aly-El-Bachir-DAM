const express = require('express');
const router = express.Router();
const { getDTCInfo, getAllDTCs, clearDTCs } = require('../services/dtcService');

// Obtener códigos DTC
router.get('/codes', async (req, res) => {
  try {
    const codes = await getAllDTCs();
    res.json({
      success: true,
      data: codes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener códigos DTC',
      error: error.message
    });
  }
});

// Leer códigos DTC del vehículo
router.get('/read', async (req, res) => {
  try {
    // Simulación de lectura de códigos DTC
    const dtcCodes = [
      {
        code: 'P0420',
        description: 'Catalyst System Efficiency Below Threshold',
        status: 'Pending',
        freezeFrame: {
          rpm: 2500,
          speed: 65,
          load: 45,
          temp: 195
        }
      }
    ];

    const detailedCodes = await Promise.all(
      dtcCodes.map(async (dtc) => {
        const info = await getDTCInfo(dtc.code);
        return { ...dtc, ...info };
      })
    );

    res.json({
      success: true,
      data: detailedCodes,
      count: detailedCodes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al leer códigos DTC',
      error: error.message
    });
  }
});

// Información detallada de un código DTC
router.get('/info/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const info = await getDTCInfo(code);
    
    res.json({
      success: true,
      data: info
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener información del código',
      error: error.message
    });
  }
});

// Limpiar códigos DTC
router.post('/clear', async (req, res) => {
  try {
    const result = await clearDTCs();
    res.json({
      success: true,
      message: 'Códigos DTC limpiados exitosamente',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al limpiar códigos DTC',
      error: error.message
    });
  }
});

// Buscar códigos DTC
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const allDTCs = await getAllDTCs();
    
    const filtered = allDTCs.filter(dtc => 
      dtc.code.toLowerCase().includes(query.toLowerCase()) ||
      dtc.description.toLowerCase().includes(query.toLowerCase())
    );

    res.json({
      success: true,
      data: filtered,
      count: filtered.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en búsqueda',
      error: error.message
    });
  }
});

module.exports = router;
