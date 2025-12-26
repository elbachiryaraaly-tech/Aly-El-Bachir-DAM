import { Router } from 'express';
import { query, run } from '../database';
import { AIPredictor } from '../services/aiPredictor';

const router = Router();
const aiPredictor = new AIPredictor();

// Buscar código DTC en base de datos
router.get('/dtc/:code', async (req, res) => {
  try {
    const { code } = req.params;
    const result = await query(
      'SELECT * FROM dtc_codes WHERE code = ?',
      [code.toUpperCase()]
    );

    if (result.length === 0) {
      return res.status(404).json({
        error: 'Código no encontrado',
        message: `El código ${code} no se encuentra en la base de datos`
      });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar código DTC' });
  }
});

// Buscar códigos DTC por sistema
router.get('/dtc-by-system/:system', async (req, res) => {
  try {
    const { system } = req.params;
    const result = await query(
      'SELECT * FROM dtc_codes WHERE system = ? ORDER BY code',
      [system]
    );

    res.json({
      system: system,
      count: result.length,
      codes: result
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar códigos' });
  }
});

// Buscar códigos DTC
router.get('/search/:term', async (req, res) => {
  try {
    const { term } = req.params;
    const result = await query(
      `SELECT * FROM dtc_codes 
       WHERE code LIKE ? OR description LIKE ? OR system LIKE ?
       LIMIT 50`,
      [`%${term}%`, `%${term}%`, `%${term}%`]
    );

    res.json({
      term: term,
      count: result.length,
      results: result
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar' });
  }
});

// Obtener todos los sistemas
router.get('/systems', async (req, res) => {
  try {
    const result = await query(
      'SELECT DISTINCT system FROM dtc_codes ORDER BY system'
    );

    const systems = result.map(r => r.system);
    res.json({ systems });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener sistemas' });
  }
});

// Guardar historial de diagnóstico
router.post('/history', async (req, res) => {
  try {
    const { vehicle_id, dtc_codes, freeze_frame, readiness_status, notes } = req.body;
    
    const result = await run(
      `INSERT INTO diagnostic_history 
       (vehicle_id, dtc_codes, freeze_frame, readiness_status, notes)
       VALUES (?, ?, ?, ?, ?)`,
      [
        vehicle_id,
        JSON.stringify(dtc_codes),
        JSON.stringify(freeze_frame),
        JSON.stringify(readiness_status),
        notes
      ]
    );

    res.json({
      success: true,
      id: result.id,
      message: 'Historial guardado correctamente'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar historial' });
  }
});

// Obtener historial de diagnóstico
router.get('/history/:vehicleId', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const result = await query(
      `SELECT * FROM diagnostic_history 
       WHERE vehicle_id = ? 
       ORDER BY timestamp DESC
       LIMIT 50`,
      [vehicleId]
    );

    // Parsear JSON fields
    const history = result.map(h => ({
      ...h,
      dtc_codes: JSON.parse(h.dtc_codes || '[]'),
      freeze_frame: JSON.parse(h.freeze_frame || '{}'),
      readiness_status: JSON.parse(h.readiness_status || '{}')
    }));

    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial' });
  }
});

// Detectar anomalías con IA
router.post('/detect-anomalies', async (req, res) => {
  try {
    const { currentData, historicalAverage } = req.body;
    const anomalies = aiPredictor.detectAnomalies(currentData, historicalAverage);
    
    res.json({
      anomaliesDetected: anomalies.length,
      anomalies: anomalies
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al detectar anomalías' });
  }
});

// Calcular salud del vehículo
router.post('/vehicle-health', async (req, res) => {
  try {
    const { data, dtcCodes } = req.body;
    const health = aiPredictor.calculateVehicleHealth(data, dtcCodes);
    
    res.json(health);
  } catch (error) {
    res.status(500).json({ error: 'Error al calcular salud del vehículo' });
  }
});

// Predecir fallo de componente
router.get('/predict-failure/:component', async (req, res) => {
  try {
    const { component } = req.params;
    const prediction = aiPredictor.predictComponentFailure(component, []);
    
    if (!prediction) {
      return res.status(404).json({ error: 'Componente no encontrado' });
    }

    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: 'Error al predecir fallo' });
  }
});

export default router;
