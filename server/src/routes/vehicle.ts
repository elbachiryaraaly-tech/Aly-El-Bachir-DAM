import { Router } from 'express';
import { query, run } from '../database';

const router = Router();

// Crear vehículo
router.post('/', async (req, res) => {
  try {
    const { vin, make, model, year, engine, transmission } = req.body;
    
    const result = await run(
      `INSERT INTO vehicles (vin, make, model, year, engine, transmission)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [vin, make, model, year, engine, transmission]
    );

    res.json({
      success: true,
      id: result.id,
      message: 'Vehículo registrado correctamente'
    });
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(400).json({ error: 'VIN ya registrado' });
    } else {
      res.status(500).json({ error: 'Error al registrar vehículo' });
    }
  }
});

// Obtener todos los vehículos
router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM vehicles ORDER BY created_at DESC'
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vehículos' });
  }
});

// Obtener vehículo por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(
      'SELECT * FROM vehicles WHERE id = ?',
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }

    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vehículo' });
  }
});

// Actualizar vehículo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { make, model, year, engine, transmission } = req.body;
    
    await run(
      `UPDATE vehicles 
       SET make = ?, model = ?, year = ?, engine = ?, transmission = ?
       WHERE id = ?`,
      [make, model, year, engine, transmission, id]
    );

    res.json({
      success: true,
      message: 'Vehículo actualizado correctamente'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar vehículo' });
  }
});

// Eliminar vehículo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    await run('DELETE FROM vehicles WHERE id = ?', [id]);

    res.json({
      success: true,
      message: 'Vehículo eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar vehículo' });
  }
});

// Decodificar VIN
router.get('/decode/:vin', async (req, res) => {
  try {
    const { vin } = req.params;
    
    // Simulación de decodificación de VIN
    // En producción, esto usaría una API real como NHTSA vPIC
    const decoded = {
      vin: vin,
      make: 'BMW',
      model: 'Serie 3',
      year: 2020,
      engine: '2.0L Turbo I4',
      transmission: 'Automática',
      bodyType: 'Sedán',
      fuelType: 'Gasolina',
      country: 'Alemania',
      manufacturer: 'BMW AG'
    };

    res.json(decoded);
  } catch (error) {
    res.status(500).json({ error: 'Error al decodificar VIN' });
  }
});

export default router;
