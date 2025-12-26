// Simulador OBD-II avanzado con datos realistas
export class OBDSimulator {
  private rpm: number = 800;
  private speed: number = 0;
  private coolantTemp: number = 90;
  private engineLoad: number = 15;
  private throttlePos: number = 0;
  private fuelPressure: number = 58;
  private intakeTemp: number = 25;
  private mafRate: number = 2.5;
  private o2Voltage: number = 0.45;
  private fuelLevel: number = 75;
  private batteryVoltage: number = 14.2;
  private intakeManifoldPressure: number = 30;
  private timingAdvance: number = 15;
  private shortTermFuelTrim: number = 0;
  private longTermFuelTrim: number = 2;
  private distanceMIL: number = 0;
  private runtimeSinceStart: number = 0;
  private controlModuleVoltage: number = 14.1;
  private absoluteLoad: number = 18;
  private commandedEGR: number = 0;
  private egrError: number = 0;
  private evapPurge: number = 0;
  private fuelTankLevel: number = 75;
  private warmUpsSinceCodesCleared: number = 12;
  private distanceSinceCodesCleared: number = 458;
  
  // Estados del vehículo
  private isAccelerating: boolean = false;
  private isBraking: boolean = false;
  private isIdling: boolean = true;
  private engineOn: boolean = true;
  
  // Simulación de problemas (para demostración)
  private hasP0300: boolean = false; // Fallas de encendido
  private hasP0171: boolean = false; // Sistema pobre
  private hasP0420: boolean = false; // Catalizador

  constructor() {
    // Iniciar simulación de comportamiento del vehículo
    this.startSimulation();
  }

  private startSimulation() {
    setInterval(() => {
      this.updateVehicleState();
    }, 100);
  }

  private updateVehicleState() {
    if (!this.engineOn) {
      this.rpm = 0;
      this.speed = 0;
      return;
    }

    this.runtimeSinceStart += 0.1;

    // Simular diferentes estados de conducción
    const rand = Math.random();
    
    if (this.isIdling) {
      // Ralentí
      this.rpm = 800 + Math.random() * 50 - 25;
      this.speed = 0;
      this.throttlePos = 0;
      this.engineLoad = 15 + Math.random() * 5;
      
      // Probabilidad de empezar a acelerar
      if (rand > 0.98) {
        this.isIdling = false;
        this.isAccelerating = true;
      }
    } else if (this.isAccelerating) {
      // Aceleración
      this.rpm = Math.min(this.rpm + 100, 5500);
      this.speed = Math.min(this.speed + 2, 120);
      this.throttlePos = 45 + Math.random() * 30;
      this.engineLoad = 50 + Math.random() * 30;
      
      // Probabilidad de dejar de acelerar
      if (rand > 0.95 || this.speed > 100) {
        this.isAccelerating = false;
      }
    } else if (this.isBraking) {
      // Frenado
      this.rpm = Math.max(this.rpm - 200, 800);
      this.speed = Math.max(this.speed - 3, 0);
      this.throttlePos = 0;
      this.engineLoad = 10 + Math.random() * 5;
      
      // Probabilidad de dejar de frenar
      if (rand > 0.96 || this.speed <= 0) {
        this.isBraking = false;
        if (this.speed <= 0) {
          this.isIdling = true;
        }
      }
    } else {
      // Velocidad constante
      this.rpm = 2000 + this.speed * 20;
      this.throttlePos = 10 + Math.random() * 10;
      this.engineLoad = 25 + Math.random() * 10;
      
      // Probabilidad de cambiar de estado
      if (rand > 0.97) {
        this.isBraking = true;
      } else if (rand < 0.03) {
        this.isAccelerating = true;
      }
    }

    // Actualizar otros parámetros basados en el estado
    this.updateTemperatures();
    this.updateFuelSystem();
    this.updateElectrical();
    this.updateEmissions();
  }

  private updateTemperatures() {
    // Temperatura de refrigerante
    const targetTemp = this.engineLoad > 40 ? 95 : 90;
    this.coolantTemp += (targetTemp - this.coolantTemp) * 0.01;
    
    // Temperatura de admisión
    this.intakeTemp = 25 + (this.engineLoad / 5) + Math.random() * 2;
  }

  private updateFuelSystem() {
    // MAF (Mass Air Flow)
    this.mafRate = (this.rpm / 1000) * (this.engineLoad / 20) + Math.random() * 0.5;
    
    // Presión de combustible
    this.fuelPressure = 55 + (this.throttlePos / 10) + Math.random() * 2;
    
    // Sensor O2
    const targetVoltage = this.throttlePos > 20 ? 0.65 : 0.35;
    this.o2Voltage += (targetVoltage - this.o2Voltage) * 0.1;
    
    // Nivel de combustible (disminuye lentamente)
    this.fuelLevel -= 0.0001 * this.speed;
    this.fuelTankLevel = this.fuelLevel;
    
    // Fuel trim
    this.shortTermFuelTrim = Math.sin(Date.now() / 1000) * 3;
    
    // Simular sistema pobre si hay código P0171
    if (this.hasP0171) {
      this.shortTermFuelTrim += 10;
      this.longTermFuelTrim += 0.01;
    }
  }

  private updateElectrical() {
    // Voltaje de batería
    this.batteryVoltage = 14.0 + Math.random() * 0.4;
    this.controlModuleVoltage = this.batteryVoltage - 0.1;
  }

  private updateEmissions() {
    // EGR
    if (this.speed > 30 && this.throttlePos < 70) {
      this.commandedEGR = 20 + Math.random() * 10;
    } else {
      this.commandedEGR = 0;
    }
    
    // EVAP Purge
    if (this.coolantTemp > 80 && this.throttlePos > 10) {
      this.evapPurge = 15 + Math.random() * 10;
    } else {
      this.evapPurge = 0;
    }
    
    // Timing advance
    this.timingAdvance = 10 + (this.rpm / 500) + (this.engineLoad / 5);
    
    // Presión de admisión
    this.intakeManifoldPressure = 30 + (this.throttlePos / 2);
  }

  public getRealtimeData() {
    return {
      timestamp: Date.now(),
      rpm: Math.round(this.rpm),
      speed: Math.round(this.speed),
      coolantTemp: Math.round(this.coolantTemp),
      engineLoad: Math.round(this.engineLoad),
      throttlePos: Math.round(this.throttlePos),
      fuelPressure: Math.round(this.fuelPressure * 10) / 10,
      intakeTemp: Math.round(this.intakeTemp),
      mafRate: Math.round(this.mafRate * 10) / 10,
      o2Voltage: Math.round(this.o2Voltage * 100) / 100,
      fuelLevel: Math.round(this.fuelLevel),
      batteryVoltage: Math.round(this.batteryVoltage * 10) / 10,
      intakeManifoldPressure: Math.round(this.intakeManifoldPressure),
      timingAdvance: Math.round(this.timingAdvance * 10) / 10,
      shortTermFuelTrim: Math.round(this.shortTermFuelTrim * 10) / 10,
      longTermFuelTrim: Math.round(this.longTermFuelTrim * 10) / 10,
      distanceMIL: Math.round(this.distanceMIL),
      runtimeSinceStart: Math.round(this.runtimeSinceStart),
      controlModuleVoltage: Math.round(this.controlModuleVoltage * 10) / 10,
      absoluteLoad: Math.round(this.absoluteLoad),
      commandedEGR: Math.round(this.commandedEGR),
      egrError: Math.round(this.egrError * 10) / 10,
      evapPurge: Math.round(this.evapPurge),
      fuelTankLevel: Math.round(this.fuelTankLevel),
      warmUpsSinceCodesCleared: this.warmUpsSinceCodesCleared,
      distanceSinceCodesCleared: this.distanceSinceCodesCleared,
      
      // Estados
      engineOn: this.engineOn,
      isAccelerating: this.isAccelerating,
      isBraking: this.isBraking,
      isIdling: this.isIdling,
      
      // PIDs calculados adicionales
      calculatedEngineLoad: Math.round(this.engineLoad),
      fuelRate: Math.round((this.mafRate * 0.5) * 10) / 10, // Litros por hora aproximado
      instantMPG: this.speed > 0 ? Math.round((this.speed / (this.mafRate * 0.5)) * 10) / 10 : 0,
      
      // Readiness monitors (simulado)
      readinessMonitors: {
        misfire: true,
        fuelSystem: true,
        components: true,
        catalyst: !this.hasP0420,
        heatedCatalyst: true,
        evapSystem: true,
        secondaryAir: true,
        acRefrigerant: true,
        oxygenSensor: true,
        oxygenSensorHeater: true,
        egrSystem: true
      }
    };
  }

  public getDTCCodes() {
    const codes: any[] = [];
    
    if (this.hasP0300) {
      codes.push({
        code: 'P0300',
        status: 'CONFIRMED',
        freezeFrame: this.getRealtimeData()
      });
    }
    
    if (this.hasP0171) {
      codes.push({
        code: 'P0171',
        status: 'CONFIRMED',
        freezeFrame: this.getRealtimeData()
      });
    }
    
    if (this.hasP0420) {
      codes.push({
        code: 'P0420',
        status: 'PENDING',
        freezeFrame: null
      });
    }
    
    return codes;
  }

  public getVehicleInfo() {
    return {
      vin: 'WBAABCD123456789X',
      make: 'BMW',
      model: 'Serie 3',
      year: 2020,
      engine: '2.0L Turbo I4',
      transmission: 'Automática 8 velocidades',
      fuelType: 'Gasolina',
      odometer: 45682,
      protocol: 'ISO 15765-4 CAN (11 bit ID, 500 kbaud)',
      ecuName: 'Bosch ME9.2',
      calibrationId: 'AZBC12345',
      cvn: '0x12AB34CD'
    };
  }

  // Métodos para simular problemas (para demostración)
  public simulateProblem(code: string) {
    switch(code) {
      case 'P0300':
        this.hasP0300 = true;
        break;
      case 'P0171':
        this.hasP0171 = true;
        break;
      case 'P0420':
        this.hasP0420 = true;
        break;
    }
  }

  public clearDTC() {
    this.hasP0300 = false;
    this.hasP0171 = false;
    this.hasP0420 = false;
    this.distanceSinceCodesCleared = 0;
    this.warmUpsSinceCodesCleared = 0;
  }

  public toggleEngine() {
    this.engineOn = !this.engineOn;
    if (this.engineOn) {
      this.runtimeSinceStart = 0;
    }
  }
}
