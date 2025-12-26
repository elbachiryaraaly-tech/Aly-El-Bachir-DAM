import { Router } from 'express';
import { query, run } from '../database';
import { addDays, addMonths, format } from 'date-fns';

const router = Router();

// Crear recordatorio de mantenimiento
router.post('/', async (req, res) => {
  try {
    const { vehicle_id, type, description, due_date, due_mileage, notes } = req.body;
    
    const result = await run(
      `INSERT INTO maintenance 
       (vehicle_id, type, description, due_date, due_mileage, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [vehicle_id, type, description, due_date, due_mileage, notes]
    );

    res.json({
      success: true,
      id: result.id,
      message: 'Recordatorio de mantenimiento creado'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear recordatorio' });
  }
});

// Obtener mantenimientos de un vehículo
router.get('/vehicle/:vehicleId', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { status } = req.query;

    let sql = 'SELECT * FROM maintenance WHERE vehicle_id = ?';
    const params: any[] = [vehicleId];

    if (status === 'pending') {
      sql += ' AND completed = 0';
    } else if (status === 'completed') {
      sql += ' AND completed = 1';
    }

    sql += ' ORDER BY due_date ASC';

    const result = await query(sql, params);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mantenimientos' });
  }
});

// Marcar mantenimiento como completado
router.put('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const { cost, notes } = req.body;
    
    await run(
      `UPDATE maintenance 
       SET completed = 1, completed_date = DATE('now'), cost = ?, notes = ?
       WHERE id = ?`,
      [cost, notes, id]
    );

    res.json({
      success: true,
      message: 'Mantenimiento marcado como completado'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al completar mantenimiento' });
  }
});

// Eliminar mantenimiento
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await run('DELETE FROM maintenance WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Mantenimiento eliminado'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar mantenimiento' });
  }
});

// Obtener programación de mantenimiento recomendada
router.get('/schedule/:vehicleId', async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const currentOdometer = 45000; // En producción esto vendría del OBD

    // Programación de mantenimiento típica
    const schedule = [
      {
        type: 'oil_change',
        name: 'Cambio de Aceite y Filtro',
        interval_km: 8000,
        interval_months: 6,
        next_due_km: Math.ceil(currentOdometer / 8000) * 8000,
        priority: 'HIGH',
        estimated_cost: 80
      },
      {
        type: 'air_filter',
        name: 'Cambio de Filtro de Aire',
        interval_km: 20000,
        interval_months: 12,
        next_due_km: Math.ceil(currentOdometer / 20000) * 20000,
        priority: 'MEDIUM',
        estimated_cost: 35
      },
      {
        type: 'cabin_filter',
        name: 'Cambio de Filtro de Cabina',
        interval_km: 20000,
        interval_months: 12,
        next_due_km: Math.ceil(currentOdometer / 20000) * 20000,
        priority: 'MEDIUM',
        estimated_cost: 40
      },
      {
        type: 'spark_plugs',
        name: 'Cambio de Bujías',
        interval_km: 60000,
        interval_months: 36,
        next_due_km: Math.ceil(currentOdometer / 60000) * 60000,
        priority: 'MEDIUM',
        estimated_cost: 150
      },
      {
        type: 'brake_fluid',
        name: 'Cambio de Líquido de Frenos',
        interval_km: 40000,
        interval_months: 24,
        next_due_km: Math.ceil(currentOdometer / 40000) * 40000,
        priority: 'HIGH',
        estimated_cost: 60
      },
      {
        type: 'coolant',
        name: 'Cambio de Refrigerante',
        interval_km: 80000,
        interval_months: 48,
        next_due_km: Math.ceil(currentOdometer / 80000) * 80000,
        priority: 'HIGH',
        estimated_cost: 120
      },
      {
        type: 'transmission_fluid',
        name: 'Cambio de Aceite de Transmisión',
        interval_km: 80000,
        interval_months: 48,
        next_due_km: Math.ceil(currentOdometer / 80000) * 80000,
        priority: 'HIGH',
        estimated_cost: 200
      },
      {
        type: 'timing_belt',
        name: 'Cambio de Correa de Distribución',
        interval_km: 100000,
        interval_months: 60,
        next_due_km: Math.ceil(currentOdometer / 100000) * 100000,
        priority: 'CRITICAL',
        estimated_cost: 600
      },
      {
        type: 'tire_rotation',
        name: 'Rotación de Neumáticos',
        interval_km: 10000,
        interval_months: 6,
        next_due_km: Math.ceil(currentOdometer / 10000) * 10000,
        priority: 'MEDIUM',
        estimated_cost: 40
      },
      {
        type: 'brake_inspection',
        name: 'Inspección de Frenos',
        interval_km: 15000,
        interval_months: 12,
        next_due_km: Math.ceil(currentOdometer / 15000) * 15000,
        priority: 'HIGH',
        estimated_cost: 50
      }
    ];

    // Calcular próximo servicio y fecha estimada
    schedule.forEach(item => {
      item.km_remaining = item.next_due_km - currentOdometer;
      // Asumir 15,000 km por año
      const daysUntil = (item.km_remaining / 15000) * 365;
      item.estimated_date = format(addDays(new Date(), daysUntil), 'yyyy-MM-dd');
      item.is_due_soon = item.km_remaining < 2000;
      item.is_overdue = item.km_remaining < 0;
    });

    // Ordenar por proximidad
    schedule.sort((a, b) => a.km_remaining - b.km_remaining);

    res.json({
      current_odometer: currentOdometer,
      schedule: schedule,
      urgent_items: schedule.filter(s => s.is_due_soon || s.is_overdue).length
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener programación' });
  }
});

export default router;
