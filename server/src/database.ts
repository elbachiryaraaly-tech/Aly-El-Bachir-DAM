import sqlite3 from 'sqlite3';
import path from 'path';

const DB_PATH = path.join(__dirname, '../data/cardiag.db');

export const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('✅ Base de datos conectada correctamente');
  }
});

export const initDatabase = () => {
  db.serialize(() => {
    // Tabla de códigos DTC (Diagnostic Trouble Codes)
    db.run(`
      CREATE TABLE IF NOT EXISTS dtc_codes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT UNIQUE NOT NULL,
        description TEXT NOT NULL,
        system TEXT NOT NULL,
        severity TEXT NOT NULL,
        possible_causes TEXT,
        solutions TEXT,
        estimated_cost_min INTEGER,
        estimated_cost_max INTEGER
      )
    `);

    // Tabla de vehículos
    db.run(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vin TEXT UNIQUE,
        make TEXT NOT NULL,
        model TEXT NOT NULL,
        year INTEGER NOT NULL,
        engine TEXT,
        transmission TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de historial de diagnósticos
    db.run(`
      CREATE TABLE IF NOT EXISTS diagnostic_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicle_id INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        dtc_codes TEXT,
        freeze_frame TEXT,
        readiness_status TEXT,
        notes TEXT,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
      )
    `);

    // Tabla de mantenimiento
    db.run(`
      CREATE TABLE IF NOT EXISTS maintenance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicle_id INTEGER,
        type TEXT NOT NULL,
        description TEXT,
        due_date DATE,
        due_mileage INTEGER,
        completed BOOLEAN DEFAULT 0,
        completed_date DATE,
        cost REAL,
        notes TEXT,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
      )
    `);

    // Tabla de datos históricos para análisis
    db.run(`
      CREATE TABLE IF NOT EXISTS sensor_data_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vehicle_id INTEGER,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        rpm INTEGER,
        speed INTEGER,
        coolant_temp INTEGER,
        engine_load INTEGER,
        fuel_pressure REAL,
        intake_temp INTEGER,
        maf_rate REAL,
        throttle_pos INTEGER,
        o2_sensor_voltage REAL,
        fuel_level INTEGER,
        FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
      )
    `);

    // Insertar códigos DTC más comunes (versión extendida)
    insertDTCCodes();
  });
};

const insertDTCCodes = () => {
  const dtcCodes = [
    // Códigos P0xxx - Powertrain
    ['P0001', 'Control de Regulador de Presión de Combustible - Circuito Abierto', 'Combustible', 'MEDIUM', 
     'Cableado dañado, regulador de presión defectuoso, ECU defectuosa', 
     'Verificar cableado, reemplazar regulador de presión, verificar ECU', 150, 800],
    ['P0010', 'Actuador de Posición del Árbol de Levas A (Banco 1) - Mal funcionamiento del circuito', 'Motor', 'MEDIUM',
     'Solenoide VVT defectuoso, cableado dañado, nivel de aceite bajo, filtro de aceite obstruido',
     'Verificar nivel de aceite, cambiar filtro, verificar solenoide VVT, revisar cableado', 200, 600],
    ['P0011', 'Posición del Árbol de Levas A - Sincronización Sobre-Avanzada o Rendimiento del Sistema (Banco 1)', 'Motor', 'MEDIUM',
     'Bajo nivel de aceite, aceite sucio, solenoide VVT defectuoso, sensor de posición del árbol de levas defectuoso',
     'Cambio de aceite, reemplazar solenoide VVT, verificar sensor CMP', 200, 900],
    ['P0020', 'Actuador de Posición del Árbol de Levas A (Banco 2) - Mal funcionamiento del circuito', 'Motor', 'MEDIUM',
     'Solenoide VVT defectuoso, cableado dañado, nivel de aceite bajo',
     'Verificar nivel de aceite, reemplazar solenoide VVT', 200, 600],
    ['P0030', 'Sensor de O2 Calentador Control Circuito (Banco 1, Sensor 1)', 'Emisiones', 'LOW',
     'Calentador de sensor O2 defectuoso, fusible quemado, cableado en corto',
     'Reemplazar sensor O2, verificar fusibles y cableado', 100, 400],
    
    ['P0100', 'Sensor de Flujo de Aire Masivo (MAF) - Mal funcionamiento del Circuito', 'Admisión', 'MEDIUM',
     'Sensor MAF sucio o defectuoso, fuga de aire en admisión, filtro de aire obstruido',
     'Limpiar o reemplazar sensor MAF, verificar fugas de aire, cambiar filtro de aire', 150, 500],
    ['P0101', 'Sensor de Flujo de Aire Masivo (MAF) - Rango/Rendimiento del Circuito', 'Admisión', 'MEDIUM',
     'Sensor MAF contaminado, fuga de vacío, filtro de aire obstruido',
     'Limpiar sensor MAF, verificar fugas de vacío, reemplazar filtro de aire', 150, 500],
    ['P0102', 'Sensor de Flujo de Aire Masivo (MAF) - Entrada Baja del Circuito', 'Admisión', 'MEDIUM',
     'Sensor MAF defectuoso, cableado en corto a tierra, conexión suelta',
     'Verificar conexiones, revisar cableado, reemplazar sensor MAF si es necesario', 150, 500],
    ['P0110', 'Sensor de Temperatura del Aire de Admisión - Mal funcionamiento del Circuito', 'Admisión', 'LOW',
     'Sensor IAT defectuoso, cableado dañado, conexión suelta',
     'Verificar conexiones, revisar cableado, reemplazar sensor IAT', 50, 200],
    
    ['P0115', 'Circuito del Sensor de Temperatura del Refrigerante del Motor', 'Enfriamiento', 'MEDIUM',
     'Sensor de temperatura defectuoso, cableado dañado, termostato atascado',
     'Reemplazar sensor ECT, verificar cableado, verificar termostato', 50, 250],
    ['P0116', 'Rango/Rendimiento del Circuito del Sensor de Temperatura del Refrigerante', 'Enfriamiento', 'MEDIUM',
     'Sensor ECT defectuoso, termostato atascado abierto, bajo nivel de refrigerante',
     'Verificar nivel de refrigerante, reemplazar termostato, reemplazar sensor ECT', 50, 300],
    ['P0117', 'Circuito del Sensor de Temperatura del Refrigerante - Entrada Baja', 'Enfriamiento', 'MEDIUM',
     'Sensor en corto a tierra, cableado dañado, sensor defectuoso',
     'Verificar cableado, reemplazar sensor ECT', 50, 250],
    ['P0118', 'Circuito del Sensor de Temperatura del Refrigerante - Entrada Alta', 'Enfriamiento', 'MEDIUM',
     'Sensor en circuito abierto, cableado dañado, conexión suelta',
     'Verificar conexiones, revisar cableado, reemplazar sensor ECT', 50, 250],
    
    ['P0120', 'Sensor de Posición del Acelerador/Interruptor del Pedal A - Mal funcionamiento del Circuito', 'Admisión', 'HIGH',
     'Sensor TPS defectuoso, cableado dañado, cuerpo de aceleración sucio',
     'Limpiar cuerpo de aceleración, verificar cableado, reemplazar sensor TPS', 150, 600],
    ['P0121', 'Sensor de Posición del Acelerador - Rango/Rendimiento', 'Admisión', 'HIGH',
     'Sensor TPS fuera de calibración, cuerpo de aceleración sucio, conexión suelta',
     'Limpiar cuerpo de aceleración, calibrar o reemplazar sensor TPS', 150, 600],
    ['P0122', 'Sensor de Posición del Acelerador - Entrada Baja del Circuito', 'Admisión', 'HIGH',
     'Sensor TPS en corto a tierra, cableado dañado, sensor defectuoso',
     'Verificar cableado, reemplazar sensor TPS', 150, 600],
    ['P0123', 'Sensor de Posición del Acelerador - Entrada Alta del Circuito', 'Admisión', 'HIGH',
     'Sensor TPS en circuito abierto, cableado dañado, sensor defectuoso',
     'Verificar cableado, reemplazar sensor TPS', 150, 600],
    
    ['P0130', 'Sensor de O2 Circuito Mal funcionamiento (Banco 1, Sensor 1)', 'Emisiones', 'MEDIUM',
     'Sensor O2 defectuoso, cableado dañado, fuga de escape, combustible contaminado',
     'Verificar fugas de escape, reemplazar sensor O2, verificar calidad del combustible', 100, 400],
    ['P0131', 'Sensor de O2 Circuito Voltaje Bajo (Banco 1, Sensor 1)', 'Emisiones', 'MEDIUM',
     'Sensor O2 defectuoso, mezcla pobre, fuga de vacío, inyector obstruido',
     'Verificar fugas de vacío, limpiar inyectores, reemplazar sensor O2', 100, 500],
    ['P0132', 'Sensor de O2 Circuito Voltaje Alto (Banco 1, Sensor 1)', 'Emisiones', 'MEDIUM',
     'Sensor O2 defectuoso, mezcla rica, filtro de aire sucio, fuga de inyector',
     'Cambiar filtro de aire, verificar inyectores, reemplazar sensor O2', 100, 500],
    ['P0133', 'Sensor de O2 Circuito Respuesta Lenta (Banco 1, Sensor 1)', 'Emisiones', 'MEDIUM',
     'Sensor O2 envejecido, fuga de escape, sensor contaminado',
     'Reemplazar sensor O2, verificar fugas de escape', 100, 400],
    ['P0134', 'Sensor de O2 Circuito Sin Actividad (Banco 1, Sensor 1)', 'Emisiones', 'MEDIUM',
     'Sensor O2 defectuoso, cableado en circuito abierto, fusible quemado',
     'Verificar fusibles y cableado, reemplazar sensor O2', 100, 400],
    
    ['P0171', 'Sistema Demasiado Pobre (Banco 1)', 'Combustible', 'MEDIUM',
     'Fuga de vacío, sensor MAF sucio, filtro de combustible obstruido, bomba de combustible débil, inyector obstruido',
     'Verificar fugas de vacío, limpiar MAF, cambiar filtro de combustible, verificar presión de combustible', 100, 800],
    ['P0172', 'Sistema Demasiado Rico (Banco 1)', 'Combustible', 'MEDIUM',
     'Sensor MAF sucio, sensor O2 defectuoso, filtro de aire sucio, fuga de inyector, regulador de presión defectuoso',
     'Cambiar filtro de aire, limpiar MAF, verificar inyectores y regulador de presión', 100, 800],
    ['P0174', 'Sistema Demasiado Pobre (Banco 2)', 'Combustible', 'MEDIUM',
     'Fuga de vacío, sensor MAF sucio, filtro de combustible obstruido, inyector obstruido',
     'Verificar fugas de vacío, limpiar MAF, verificar sistema de combustible', 100, 800],
    ['P0175', 'Sistema Demasiado Rico (Banco 2)', 'Combustible', 'MEDIUM',
     'Sensor MAF sucio, sensor O2 defectuoso, filtro de aire sucio, fuga de inyector',
     'Cambiar filtro de aire, limpiar MAF, verificar inyectores', 100, 800],
    
    ['P0200', 'Circuito del Inyector - Mal funcionamiento', 'Combustible', 'HIGH',
     'Inyector defectuoso, cableado dañado, ECU defectuosa',
     'Verificar cableado de inyectores, probar inyectores, verificar ECU', 200, 1000],
    ['P0201', 'Circuito del Inyector Cilindro 1 - Mal funcionamiento', 'Combustible', 'HIGH',
     'Inyector defectuoso o obstruido, cableado dañado, conexión suelta',
     'Limpiar o reemplazar inyector, verificar cableado y conexiones', 150, 400],
    ['P0202', 'Circuito del Inyector Cilindro 2 - Mal funcionamiento', 'Combustible', 'HIGH',
     'Inyector defectuoso o obstruido, cableado dañado',
     'Limpiar o reemplazar inyector, verificar cableado', 150, 400],
    ['P0203', 'Circuito del Inyector Cilindro 3 - Mal funcionamiento', 'Combustible', 'HIGH',
     'Inyector defectuoso o obstruido, cableado dañado',
     'Limpiar o reemplazar inyector, verificar cableado', 150, 400],
    ['P0204', 'Circuito del Inyector Cilindro 4 - Mal funcionamiento', 'Combustible', 'HIGH',
     'Inyector defectuoso o obstruido, cableado dañado',
     'Limpiar o reemplazar inyector, verificar cableado', 150, 400],
    
    ['P0300', 'Fallas de Encendido Aleatorias/Múltiples Cilindros Detectadas', 'Encendido', 'HIGH',
     'Bujías desgastadas, bobinas defectuosas, inyectores sucios, bajo nivel de combustible, fuga de vacío, compresión baja',
     'Reemplazar bujías, verificar bobinas, limpiar inyectores, verificar compresión', 100, 1200],
    ['P0301', 'Falla de Encendido Detectada - Cilindro 1', 'Encendido', 'HIGH',
     'Bujía defectuosa, bobina defectuosa, inyector obstruido, baja compresión, fuga de vacío',
     'Reemplazar bujía, verificar bobina, probar compresión, verificar inyector', 50, 600],
    ['P0302', 'Falla de Encendido Detectada - Cilindro 2', 'Encendido', 'HIGH',
     'Bujía defectuosa, bobina defectuosa, inyector obstruido, baja compresión',
     'Reemplazar bujía, verificar bobina, probar compresión', 50, 600],
    ['P0303', 'Falla de Encendido Detectada - Cilindro 3', 'Encendido', 'HIGH',
     'Bujía defectuosa, bobina defectuosa, inyector obstruido, baja compresión',
     'Reemplazar bujía, verificar bobina, probar compresión', 50, 600],
    ['P0304', 'Falla de Encendido Detectada - Cilindro 4', 'Encendido', 'HIGH',
     'Bujía defectuosa, bobina defectuosa, inyector obstruido, baja compresión',
     'Reemplazar bujía, verificar bobina, probar compresión', 50, 600],
    ['P0305', 'Falla de Encendido Detectada - Cilindro 5', 'Encendido', 'HIGH',
     'Bujía defectuosa, bobina defectuosa, inyector obstruido',
     'Reemplazar bujía, verificar bobina', 50, 600],
    ['P0306', 'Falla de Encendido Detectada - Cilindro 6', 'Encendido', 'HIGH',
     'Bujía defectuosa, bobina defectuosa, inyector obstruido',
     'Reemplazar bujía, verificar bobina', 50, 600],
    
    ['P0325', 'Circuito del Sensor de Detonación 1 (Banco 1)', 'Encendido', 'MEDIUM',
     'Sensor de detonación defectuoso, cableado dañado, conexión suelta',
     'Verificar conexiones, revisar cableado, reemplazar sensor', 150, 400],
    ['P0335', 'Sensor de Posición del Cigüeñal A - Mal funcionamiento del Circuito', 'Encendido', 'CRITICAL',
     'Sensor CKP defectuoso, cableado dañado, rueda reluctora dañada, interferencia electromagnética',
     'Verificar cableado y conexiones, limpiar sensor, reemplazar sensor CKP', 100, 350],
    ['P0340', 'Sensor de Posición del Árbol de Levas - Mal funcionamiento del Circuito', 'Encendido', 'HIGH',
     'Sensor CMP defectuoso, cableado dañado, árbol de levas desgastado',
     'Verificar cableado, reemplazar sensor CMP, inspeccionar árbol de levas', 100, 400],
    
    ['P0401', 'Flujo de Recirculación de Gases de Escape (EGR) Insuficiente', 'Emisiones', 'MEDIUM',
     'Válvula EGR obstruida, pasajes EGR bloqueados, válvula EGR defectuosa, fuga de vacío',
     'Limpiar válvula y pasajes EGR, reemplazar válvula EGR si es necesario', 150, 600],
    ['P0402', 'Flujo de Recirculación de Gases de Escape (EGR) Excesivo', 'Emisiones', 'MEDIUM',
     'Válvula EGR atascada abierta, fuga de vacío al sistema EGR',
     'Limpiar o reemplazar válvula EGR, verificar líneas de vacío', 150, 600],
    ['P0403', 'Circuito de Recirculación de Gases de Escape (EGR) - Mal funcionamiento', 'Emisiones', 'MEDIUM',
     'Válvula EGR defectuosa, cableado dañado, conexión suelta',
     'Verificar cableado y conexiones, reemplazar válvula EGR', 150, 600],
    
    ['P0420', 'Eficiencia del Sistema Catalítico Bajo el Umbral (Banco 1)', 'Emisiones', 'MEDIUM',
     'Convertidor catalítico degradado, sensores O2 defectuosos, fuga de escape, mezcla rica/pobre',
     'Verificar sensores O2, verificar fugas de escape, reemplazar catalizador si es necesario', 200, 2500],
    ['P0430', 'Eficiencia del Sistema Catalítico Bajo el Umbral (Banco 2)', 'Emisiones', 'MEDIUM',
     'Convertidor catalítico degradado, sensores O2 defectuosos, fuga de escape',
     'Verificar sensores O2, reemplazar catalizador si es necesario', 200, 2500],
    ['P0440', 'Sistema de Emisiones Evaporativas - Mal funcionamiento', 'Emisiones', 'LOW',
     'Tapa de combustible suelta o defectuosa, fuga en sistema EVAP, válvula purga defectuosa',
     'Apretar o reemplazar tapa de combustible, verificar líneas EVAP, reemplazar válvula purga', 50, 400],
    ['P0441', 'Sistema de Emisiones Evaporativas - Flujo Incorrecto de Purga', 'Emisiones', 'LOW',
     'Válvula de purga defectuosa, mangueras EVAP obstruidas, canister obstruido',
     'Reemplazar válvula de purga, verificar mangueras y canister', 100, 400],
    ['P0442', 'Sistema de Emisiones Evaporativas - Fuga Pequeña Detectada', 'Emisiones', 'LOW',
     'Tapa de combustible suelta, líneas EVAP agrietadas, válvula purga con fuga',
     'Verificar tapa de combustible, inspeccionar líneas EVAP, realizar prueba de humo', 50, 300],
    ['P0443', 'Circuito de la Válvula de Purga del Sistema EVAP - Mal funcionamiento', 'Emisiones', 'LOW',
     'Válvula de purga defectuosa, cableado dañado, conexión suelta',
     'Verificar cableado, reemplazar válvula de purga', 100, 300],
    ['P0455', 'Sistema de Emisiones Evaporativas - Fuga Grande Detectada', 'Emisiones', 'MEDIUM',
     'Tapa de combustible ausente o muy suelta, línea EVAP desconectada, canister dañado',
     'Verificar tapa de combustible, inspeccionar líneas EVAP, realizar prueba de humo', 50, 400],
    
    ['P0500', 'Sensor de Velocidad del Vehículo - Mal funcionamiento', 'Transmisión', 'MEDIUM',
     'Sensor VSS defectuoso, cableado dañado, engranaje de sensor roto',
     'Verificar cableado, reemplazar sensor VSS, inspeccionar engranajes', 100, 300],
    ['P0505', 'Control de Ralentí - Mal funcionamiento del Sistema', 'Admisión', 'MEDIUM',
     'Válvula IAC sucia o defectuosa, fuga de vacío, cuerpo de aceleración sucio, fuga de PCV',
     'Limpiar válvula IAC y cuerpo de aceleración, verificar fugas de vacío', 100, 400],
    
    ['P0562', 'Voltaje del Sistema - Bajo', 'Eléctrico', 'MEDIUM',
     'Batería débil, alternador defectuoso, cableado de carga dañado, conexiones sueltas',
     'Probar batería y alternador, verificar cableado y conexiones', 100, 800],
    ['P0563', 'Voltaje del Sistema - Alto', 'Eléctrico', 'MEDIUM',
     'Alternador sobrecargando, regulador de voltaje defectuoso',
     'Probar alternador y regulador de voltaje, reemplazar si es necesario', 150, 600],
    
    ['P0600', 'Enlace de Comunicación de Datos Serie - Mal funcionamiento', 'Electrónica', 'HIGH',
     'ECU defectuosa, problema de comunicación CAN, cableado dañado',
     'Verificar cableado del bus CAN, verificar ECU, realizar diagnóstico de comunicación', 200, 1500],
    ['P0601', 'Módulo de Control del Motor - Error de Memoria', 'Electrónica', 'HIGH',
     'ECU defectuosa, corrupción de memoria, problema de alimentación',
     'Reprogramar ECU, reemplazar ECU si es necesario', 300, 2000],
    ['P0606', 'Módulo de Control del Motor - Error del Procesador', 'Electrónica', 'CRITICAL',
     'ECU defectuosa, problema de alimentación eléctrica',
     'Verificar alimentación eléctrica, reemplazar ECU', 500, 2500],
    
    ['P0700', 'Sistema de Control de Transmisión - Mal funcionamiento', 'Transmisión', 'HIGH',
     'Problema en transmisión, TCM defectuoso, nivel bajo de fluido, sensor defectuoso',
     'Verificar nivel de fluido de transmisión, escanear TCM para códigos específicos', 100, 3000],
    ['P0705', 'Circuito del Sensor de Rango de Transmisión - Mal funcionamiento (PRNDL)', 'Transmisión', 'MEDIUM',
     'Sensor de rango defectuoso, cableado dañado, palanca de cambios mal ajustada',
     'Ajustar o reemplazar sensor de rango, verificar cableado', 150, 500],
    ['P0715', 'Sensor de Velocidad de Entrada de Transmisión - Mal funcionamiento del Circuito', 'Transmisión', 'MEDIUM',
     'Sensor defectuoso, cableado dañado, bajo nivel de fluido',
     'Verificar nivel de fluido, reemplazar sensor si es necesario', 150, 600],
    ['P0720', 'Sensor de Velocidad de Salida - Mal funcionamiento del Circuito', 'Transmisión', 'MEDIUM',
     'Sensor defectuoso, cableado dañado, engranaje de sensor roto',
     'Reemplazar sensor, verificar cableado y engranajes', 150, 600],
    ['P0730', 'Relación de Cambio Incorrecta', 'Transmisión', 'HIGH',
     'Bajo nivel de fluido, presión hidráulica baja, embragues desgastados, TCM defectuoso',
     'Verificar nivel de fluido, verificar presión, revisar transmisión internamente', 200, 3500],
    
    ['P0850', 'Interruptor de Posición de Parking/Neutral - Circuito de Entrada', 'Transmisión', 'LOW',
     'Interruptor defectuoso, cableado dañado, mal ajuste',
     'Ajustar o reemplazar interruptor, verificar cableado', 100, 300],
    
    // Códigos C0xxx - Chasis
    ['C0035', 'Sensor de Velocidad de Rueda Delantera Izquierda - Mal funcionamiento', 'ABS/Chasis', 'MEDIUM',
     'Sensor de velocidad defectuoso, cableado dañado, anillo reluctor dañado',
     'Reemplazar sensor, verificar cableado, inspeccionar anillo reluctor', 100, 400],
    ['C0040', 'Sensor de Velocidad de Rueda Delantera Derecha - Mal funcionamiento', 'ABS/Chasis', 'MEDIUM',
     'Sensor de velocidad defectuoso, cableado dañado, anillo reluctor dañado',
     'Reemplazar sensor, verificar cableado, inspeccionar anillo reluctor', 100, 400],
    ['C0045', 'Sensor de Velocidad de Rueda Trasera Izquierda - Mal funcionamiento', 'ABS/Chasis', 'MEDIUM',
     'Sensor de velocidad defectuoso, cableado dañado',
     'Reemplazar sensor, verificar cableado', 100, 400],
    ['C0050', 'Sensor de Velocidad de Rueda Trasera Derecha - Mal funcionamiento', 'ABS/Chasis', 'MEDIUM',
     'Sensor de velocidad defectuoso, cableado dañado',
     'Reemplazar sensor, verificar cableado', 100, 400],
    
    // Códigos B0xxx - Body (Carrocería)
    ['B0001', 'Resistencia del Airbag del Conductor - Circuito Abierto', 'Airbag/Seguridad', 'CRITICAL',
     'Airbag defectuoso, cableado dañado, módulo de airbag defectuoso',
     'Verificar cableado, reemplazar airbag o módulo según sea necesario', 300, 1500],
    ['B0010', 'Resistencia del Airbag del Pasajero - Circuito Abierto', 'Airbag/Seguridad', 'CRITICAL',
     'Airbag defectuoso, cableado dañado, sensor de ocupación defectuoso',
     'Verificar cableado y sensor, reemplazar airbag si es necesario', 300, 1500],
    
    // Códigos U0xxx - Network (Red de comunicación)
    ['U0001', 'Bus CAN de Alta Velocidad - Mal funcionamiento', 'Red/Comunicación', 'HIGH',
     'Cortocircuito en bus CAN, módulo defectuoso, terminación incorrecta',
     'Verificar cableado del bus CAN, verificar módulos, verificar resistencias de terminación', 150, 1000],
    ['U0100', 'Pérdida de Comunicación con ECM/PCM', 'Red/Comunicación', 'CRITICAL',
     'ECM defectuoso, problema en bus CAN, cableado dañado, problema de alimentación',
     'Verificar alimentación de ECM, verificar cableado CAN, reemplazar ECM si es necesario', 200, 2000],
    ['U0101', 'Pérdida de Comunicación con TCM', 'Red/Comunicación', 'HIGH',
     'TCM defectuoso, problema en bus CAN, cableado dañado',
     'Verificar cableado CAN, verificar alimentación de TCM', 200, 1500],
    ['U0121', 'Pérdida de Comunicación con Módulo de Control ABS', 'Red/Comunicación', 'HIGH',
     'Módulo ABS defectuoso, problema en bus CAN, cableado dañado',
     'Verificar cableado CAN, verificar módulo ABS', 200, 1200],
    ['U0140', 'Pérdida de Comunicación con Módulo de Control de Carrocería', 'Red/Comunicación', 'MEDIUM',
     'BCM defectuoso, problema en bus CAN, cableado dañado',
     'Verificar cableado CAN, verificar BCM', 150, 1000],
    
    // Códigos adicionales P04xx-P08xx
    ['P0603', 'Error de Memoria RAM del Módulo de Control Interno', 'Electrónica', 'HIGH',
     'ECU defectuosa, interferencia electromagnética, problema de alimentación',
     'Reprogramar ECU, verificar alimentación, reemplazar ECU si persiste', 300, 2000],
    ['P0711', 'Sensor de Temperatura de Fluido de Transmisión - Rango/Rendimiento', 'Transmisión', 'MEDIUM',
     'Sensor defectuoso, cableado dañado, bajo nivel de fluido',
     'Verificar nivel de fluido, reemplazar sensor si es necesario', 100, 400],
    ['P1000', 'Monitor de Diagnóstico a Bordo No Completado', 'Sistema', 'LOW',
     'Ciclo de conducción incompleto después de borrar códigos, batería desconectada',
     'Completar ciclo de conducción según especificaciones del fabricante', 0, 0],
  ];

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO dtc_codes 
    (code, description, system, severity, possible_causes, solutions, estimated_cost_min, estimated_cost_max)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  dtcCodes.forEach(code => {
    stmt.run(code);
  });

  stmt.finalize();
};

// Funciones de utilidad para consultas
export const query = (sql: string, params: any[] = []): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const run = (sql: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

export const get = (sql: string, params: any[] = []): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};
