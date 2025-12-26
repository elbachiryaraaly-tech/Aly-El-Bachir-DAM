// Base de datos de códigos DTC más completa
const dtcDatabase = {
  // Códigos P0xxx - Powertrain (Motor y Transmisión)
  'P0001': {
    code: 'P0001',
    description: 'Fuel Volume Regulator Control Circuit/Open',
    category: 'Powertrain',
    severity: 'Medium',
    causes: ['Wiring issue', 'Faulty fuel regulator', 'ECM problem'],
    solutions: ['Check wiring', 'Replace fuel regulator', 'Check ECM']
  },
  'P0100': {
    code: 'P0100',
    description: 'Mass or Volume Air Flow Circuit Malfunction',
    category: 'Powertrain',
    severity: 'High',
    causes: ['Faulty MAF sensor', 'Wiring issue', 'Air leak'],
    solutions: ['Clean/replace MAF sensor', 'Check wiring', 'Check for air leaks']
  },
  'P0101': {
    code: 'P0101',
    description: 'Mass or Volume Air Flow Circuit Range/Performance Problem',
    category: 'Powertrain',
    severity: 'Medium',
    causes: ['Dirty MAF sensor', 'Air filter clogged'],
    solutions: ['Clean MAF sensor', 'Replace air filter']
  },
  'P0171': {
    code: 'P0171',
    description: 'System Too Lean (Bank 1)',
    category: 'Powertrain',
    severity: 'High',
    causes: ['Vacuum leak', 'Faulty oxygen sensor', 'Fuel pressure low'],
    solutions: ['Check for vacuum leaks', 'Replace oxygen sensor', 'Check fuel pressure']
  },
  'P0172': {
    code: 'P0172',
    description: 'System Too Rich (Bank 1)',
    category: 'Powertrain',
    severity: 'High',
    causes: ['Faulty oxygen sensor', 'High fuel pressure', 'Faulty injector'],
    solutions: ['Replace oxygen sensor', 'Check fuel pressure', 'Check injectors']
  },
  'P0300': {
    code: 'P0300',
    description: 'Random/Multiple Cylinder Misfire Detected',
    category: 'Powertrain',
    severity: 'High',
    causes: ['Spark plugs', 'Ignition coils', 'Fuel system'],
    solutions: ['Replace spark plugs', 'Check ignition coils', 'Check fuel system']
  },
  'P0301': {
    code: 'P0301',
    description: 'Cylinder 1 Misfire Detected',
    category: 'Powertrain',
    severity: 'High',
    causes: ['Faulty spark plug', 'Ignition coil', 'Fuel injector'],
    solutions: ['Replace spark plug', 'Check ignition coil', 'Check fuel injector']
  },
  'P0420': {
    code: 'P0420',
    description: 'Catalyst System Efficiency Below Threshold (Bank 1)',
    category: 'Powertrain',
    severity: 'Medium',
    causes: ['Faulty catalytic converter', 'Oxygen sensor', 'Exhaust leak'],
    solutions: ['Replace catalytic converter', 'Check oxygen sensors', 'Check exhaust']
  },
  'P0440': {
    code: 'P0440',
    description: 'Evaporative Emission Control System Malfunction',
    category: 'Powertrain',
    severity: 'Low',
    causes: ['Loose gas cap', 'Faulty purge valve', 'Leak in EVAP system'],
    solutions: ['Tighten gas cap', 'Replace purge valve', 'Check EVAP system']
  },
  'P0455': {
    code: 'P0455',
    description: 'Evaporative Emission Control System Leak Detected (Large Leak)',
    category: 'Powertrain',
    severity: 'Medium',
    causes: ['Loose gas cap', 'Leak in EVAP system'],
    solutions: ['Tighten gas cap', 'Check EVAP system for leaks']
  },
  
  // Códigos B0xxx - Body
  'B0001': {
    code: 'B0001',
    description: 'Driver Airbag Circuit',
    category: 'Body',
    severity: 'High',
    causes: ['Faulty airbag', 'Wiring issue'],
    solutions: ['Check airbag system', 'Check wiring']
  },
  
  // Códigos C0xxx - Chassis
  'C0001': {
    code: 'C0001',
    description: 'ABS Front Left Wheel Speed Sensor Circuit',
    category: 'Chassis',
    severity: 'High',
    causes: ['Faulty wheel speed sensor', 'Wiring issue'],
    solutions: ['Replace sensor', 'Check wiring']
  },
  
  // Códigos U0xxx - Network
  'U0001': {
    code: 'U0001',
    description: 'High Speed CAN Communication Bus',
    category: 'Network',
    severity: 'High',
    causes: ['CAN bus wiring', 'ECM communication'],
    solutions: ['Check CAN bus wiring', 'Check ECM']
  }
};

// Función para obtener información de un código DTC
function getDTCInfo(code) {
  const upperCode = code.toUpperCase();
  const dtc = dtcDatabase[upperCode];
  
  if (dtc) {
    return dtc;
  }
  
  // Si no está en la base de datos, generar información básica
  const prefix = upperCode.charAt(0);
  const categoryMap = {
    'P': 'Powertrain',
    'B': 'Body',
    'C': 'Chassis',
    'U': 'Network'
  };
  
  return {
    code: upperCode,
    description: 'Código DTC no encontrado en base de datos',
    category: categoryMap[prefix] || 'Unknown',
    severity: 'Unknown',
    causes: ['Requiere diagnóstico adicional'],
    solutions: ['Consultar manual de servicio']
  };
}

// Función para obtener todos los códigos DTC
function getAllDTCs() {
  return Object.values(dtcDatabase);
}

// Función para limpiar códigos DTC
function clearDTCs() {
  return {
    success: true,
    message: 'Códigos DTC limpiados',
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  getDTCInfo,
  getAllDTCs,
  clearDTCs
};
