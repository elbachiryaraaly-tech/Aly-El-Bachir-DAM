import { Router } from 'express';
import { query, run } from '../database';
import { AIPredictor } from '../services/aiPredictor';
import PDFDocument from 'pdfkit';

const router = Router();
const aiPredictor = new AIPredictor();

// Guardar datos de sensor para análisis histórico
router.post('/sensor-data', async (req, res) => {
  try {
    const { vehicle_id, data } = req.body;
    
    await run(
      `INSERT INTO sensor_data_history 
       (vehicle_id, rpm, speed, coolant_temp, engine_load, fuel_pressure, 
        intake_temp, maf_rate, throttle_pos, o2_sensor_voltage, fuel_level)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        vehicle_id,
        data.rpm,
        data.speed,
        data.coolantTemp,
        data.engineLoad,
        data.fuelPressure,
        data.intakeTemp,
        data.mafRate,
        data.throttlePos,
        data.o2Voltage,
        data.fuelLevel
      ]
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar datos' });
  }
});

// Obtener análisis de datos históricos
router.get('/history/:vehicleId', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { limit = 1000 } = req.query;
    
    const result = await query(
      `SELECT * FROM sensor_data_history 
       WHERE vehicle_id = ? 
       ORDER BY timestamp DESC 
       LIMIT ?`,
      [vehicleId, limit]
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial' });
  }
});

// Análisis de tendencias
router.get('/trends/:vehicleId', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    
    const historicalData = await query(
      `SELECT * FROM sensor_data_history 
       WHERE vehicle_id = ? 
       ORDER BY timestamp DESC 
       LIMIT 100`,
      [vehicleId]
    );

    if (historicalData.length < 10) {
      return res.json({
        error: 'Datos insuficientes',
        message: 'Se necesitan al menos 10 registros para análisis de tendencias'
      });
    }

    const trends = aiPredictor.analyzeTrends(historicalData);
    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: 'Error al analizar tendencias' });
  }
});

// Estadísticas de conducción
router.get('/driving-stats/:vehicleId', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { period = 'week' } = req.query; // day, week, month, year
    
    // Calcular fecha de inicio según periodo
    let daysBack = 7;
    switch(period) {
      case 'day': daysBack = 1; break;
      case 'week': daysBack = 7; break;
      case 'month': daysBack = 30; break;
      case 'year': daysBack = 365; break;
    }

    const data = await query(
      `SELECT 
        COUNT(*) as records,
        AVG(rpm) as avg_rpm,
        MAX(rpm) as max_rpm,
        AVG(speed) as avg_speed,
        MAX(speed) as max_speed,
        AVG(coolant_temp) as avg_coolant_temp,
        MAX(coolant_temp) as max_coolant_temp,
        AVG(engine_load) as avg_engine_load,
        MAX(engine_load) as max_engine_load,
        AVG(throttle_pos) as avg_throttle,
        AVG(fuel_level) as avg_fuel_level
       FROM sensor_data_history 
       WHERE vehicle_id = ? 
       AND timestamp >= datetime('now', '-${daysBack} days')`,
      [vehicleId]
    );

    if (data[0].records === 0) {
      return res.json({
        error: 'No hay datos disponibles',
        message: `No hay datos para el periodo seleccionado (${period})`
      });
    }

    // Calcular métricas adicionales
    const stats = {
      period: period,
      records: data[0].records,
      engine: {
        avg_rpm: Math.round(data[0].avg_rpm),
        max_rpm: Math.round(data[0].max_rpm),
        avg_load: Math.round(data[0].avg_engine_load),
        max_load: Math.round(data[0].max_engine_load)
      },
      speed: {
        avg_speed: Math.round(data[0].avg_speed),
        max_speed: Math.round(data[0].max_speed)
      },
      temperature: {
        avg_coolant: Math.round(data[0].avg_coolant_temp),
        max_coolant: Math.round(data[0].max_coolant_temp)
      },
      driving_style: this.analyzeDrivingStyle(data[0]),
      fuel: {
        avg_level: Math.round(data[0].avg_fuel_level),
        estimated_consumption: this.estimateFuelConsumption(data[0])
      }
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estadísticas' });
  }
});

// Generar reporte PDF
router.get('/report/:vehicleId', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    
    // Obtener información del vehículo
    const vehicle = await query(
      'SELECT * FROM vehicles WHERE id = ?',
      [vehicleId]
    );

    if (vehicle.length === 0) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    // Obtener datos recientes
    const recentData = await query(
      `SELECT * FROM sensor_data_history 
       WHERE vehicle_id = ? 
       ORDER BY timestamp DESC 
       LIMIT 1`,
      [vehicleId]
    );

    // Obtener códigos DTC recientes
    const diagnostics = await query(
      `SELECT * FROM diagnostic_history 
       WHERE vehicle_id = ? 
       ORDER BY timestamp DESC 
       LIMIT 1`,
      [vehicleId]
    );

    // Crear PDF
    const doc = new PDFDocument();
    
    // Configurar headers para descarga
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=cardiag-report-${vehicleId}-${Date.now()}.pdf`);
    
    doc.pipe(res);

    // Título
    doc.fontSize(25).text('CarDiag Pro Ultra', { align: 'center' });
    doc.fontSize(20).text('Reporte de Diagnóstico', { align: 'center' });
    doc.moveDown();

    // Información del vehículo
    doc.fontSize(16).text('Información del Vehículo', { underline: true });
    doc.fontSize(12);
    doc.text(`Marca: ${vehicle[0].make}`);
    doc.text(`Modelo: ${vehicle[0].model}`);
    doc.text(`Año: ${vehicle[0].year}`);
    doc.text(`VIN: ${vehicle[0].vin || 'N/A'}`);
    doc.moveDown();

    // Datos actuales
    if (recentData.length > 0) {
      doc.fontSize(16).text('Estado Actual del Motor', { underline: true });
      doc.fontSize(12);
      doc.text(`RPM: ${recentData[0].rpm}`);
      doc.text(`Velocidad: ${recentData[0].speed} km/h`);
      doc.text(`Temperatura: ${recentData[0].coolant_temp}°C`);
      doc.text(`Carga del Motor: ${recentData[0].engine_load}%`);
      doc.text(`Nivel de Combustible: ${recentData[0].fuel_level}%`);
      doc.moveDown();
    }

    // Códigos de error
    if (diagnostics.length > 0 && diagnostics[0].dtc_codes) {
      const codes = JSON.parse(diagnostics[0].dtc_codes);
      if (codes.length > 0) {
        doc.fontSize(16).text('Códigos de Error Detectados', { underline: true });
        doc.fontSize(12);
        codes.forEach((code: string) => {
          doc.text(`• ${code}`);
        });
        doc.moveDown();
      }
    }

    // Footer
    doc.fontSize(10).text(
      `Reporte generado el ${new Date().toLocaleString('es-ES')}`,
      { align: 'center' }
    );

    doc.end();
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Error al generar reporte' });
  }
});

// Funciones auxiliares
function analyzeDrivingStyle(data: any) {
  const avgThrottle = data.avg_throttle || 0;
  const avgLoad = data.avg_engine_load || 0;
  const maxRpm = data.max_rpm || 0;

  if (avgThrottle > 60 || avgLoad > 70 || maxRpm > 5000) {
    return { style: 'AGRESIVO', score: 60, tips: ['Acelerar más suavemente', 'Evitar RPM altas'] };
  } else if (avgThrottle > 40 || avgLoad > 50) {
    return { style: 'MODERADO', score: 75, tips: ['Mantener velocidad constante'] };
  } else {
    return { style: 'ECO', score: 90, tips: ['Continuar con conducción eficiente'] };
  }
}

function estimateFuelConsumption(data: any) {
  const avgLoad = data.avg_engine_load || 0;
  const avgSpeed = data.avg_speed || 0;
  
  // Estimación simplificada (L/100km)
  const baseConsumption = 8;
  const loadFactor = (avgLoad / 100) * 3;
  const speedFactor = avgSpeed > 80 ? 2 : avgSpeed < 50 ? -1 : 0;
  
  const estimated = baseConsumption + loadFactor + speedFactor;
  return Math.max(5, Math.min(20, estimated)).toFixed(1);
}

export default router;
