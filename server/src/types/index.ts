export interface OBDData {
  timestamp: number;
  rpm: number;
  speed: number;
  coolantTemp: number;
  engineLoad: number;
  throttlePos: number;
  fuelPressure: number;
  intakeTemp: number;
  mafRate: number;
  o2Voltage: number;
  fuelLevel: number;
  batteryVoltage: number;
}

export interface DTCCode {
  code: string;
  description: string;
  system: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  possible_causes?: string;
  solutions?: string;
  estimated_cost_min?: number;
  estimated_cost_max?: number;
}

export interface Vehicle {
  id?: number;
  vin?: string;
  make: string;
  model: string;
  year: number;
  engine?: string;
  transmission?: string;
  created_at?: string;
}

export interface Maintenance {
  id?: number;
  vehicle_id: number;
  type: string;
  description?: string;
  due_date?: string;
  due_mileage?: number;
  completed?: boolean;
  completed_date?: string;
  cost?: number;
  notes?: string;
}
