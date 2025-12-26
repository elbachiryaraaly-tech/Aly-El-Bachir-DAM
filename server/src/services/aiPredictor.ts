// Servicio de predicción con IA/ML para diagnóstico predictivo
import { SimpleLinearRegression } from 'ml-regression';

export class AIPredictor {
  // Predecir próximo mantenimiento basado en datos históricos
  public predictNextMaintenance(historicalData: any[]) {
    if (historicalData.length < 3) {
      return null;
    }

    // Extraer datos para regresión
    const x = historicalData.map((_, index) => index);
    const y = historicalData.map(d => d.odometer);

    const regression = new SimpleLinearRegression(x, y);
    
    // Predecir siguiente mantenimiento (índice futuro)
    const nextIndex = historicalData.length;
    const predictedOdometer = regression.predict(nextIndex);
    
    return {
      predictedOdometer: Math.round(predictedOdometer),
      confidence: this.calculateConfidence(historicalData),
      daysUntil: this.estimateDaysUntil(historicalData, predictedOdometer)
    };
  }

  // Detectar anomalías en parámetros del motor
  public detectAnomalies(currentData: any, historicalAverage: any) {
    const anomalies: any[] = [];
    
    // RPM anormales
    if (currentData.rpm > historicalAverage.rpm * 1.5) {
      anomalies.push({
        parameter: 'RPM',
        severity: 'MEDIUM',
        message: 'RPM inusualmente altas detectadas',
        recommendation: 'Verificar carga del motor y sistema de transmisión'
      });
    }

    // Temperatura de refrigerante alta
    if (currentData.coolantTemp > 105) {
      anomalies.push({
        parameter: 'Temperatura de Refrigerante',
        severity: 'HIGH',
        message: 'Temperatura de refrigerante por encima del rango normal',
        recommendation: 'Verificar nivel de refrigerante, termostato y ventilador'
      });
    }

    // Voltaje bajo de batería
    if (currentData.batteryVoltage < 12.5) {
      anomalies.push({
        parameter: 'Voltaje de Batería',
        severity: 'MEDIUM',
        message: 'Voltaje de batería bajo',
        recommendation: 'Probar batería y alternador'
      });
    }

    // Fuel trim anormal (indica problema de mezcla)
    if (Math.abs(currentData.shortTermFuelTrim) > 10 || Math.abs(currentData.longTermFuelTrim) > 10) {
      anomalies.push({
        parameter: 'Fuel Trim',
        severity: 'MEDIUM',
        message: 'Ajuste de combustible fuera de rango normal',
        recommendation: 'Verificar sensores de O2, MAF y posibles fugas de vacío'
      });
    }

    return anomalies;
  }

  // Calcular salud general del vehículo (0-100)
  public calculateVehicleHealth(data: any, dtcCodes: any[]) {
    let health = 100;

    // Penalizar por códigos DTC
    health -= dtcCodes.length * 15;

    // Penalizar por parámetros fuera de rango
    if (data.coolantTemp > 100) health -= 10;
    if (data.coolantTemp < 70) health -= 5;
    if (data.batteryVoltage < 13.0) health -= 8;
    if (Math.abs(data.shortTermFuelTrim) > 10) health -= 7;
    if (Math.abs(data.longTermFuelTrim) > 10) health -= 7;
    if (data.o2Voltage < 0.1 || data.o2Voltage > 0.9) health -= 10;

    // Asegurar que esté en rango 0-100
    health = Math.max(0, Math.min(100, health));

    return {
      score: Math.round(health),
      status: health >= 90 ? 'EXCELLENT' : 
              health >= 75 ? 'GOOD' : 
              health >= 50 ? 'FAIR' : 
              health >= 25 ? 'POOR' : 'CRITICAL',
      recommendations: this.generateRecommendations(health, data, dtcCodes)
    };
  }

  // Predecir fallo de componente
  public predictComponentFailure(component: string, historicalData: any[]) {
    // Simulación simple de predicción
    const predictions: any = {
      'battery': {
        probability: 0.15,
        timeframe: '6-12 meses',
        signs: ['Arranques lentos', 'Voltaje bajo', 'Edad de batería > 3 años']
      },
      'alternator': {
        probability: 0.08,
        timeframe: '12-18 meses',
        signs: ['Fluctuaciones de voltaje', 'Luces tenues', 'Batería descargándose']
      },
      'spark_plugs': {
        probability: 0.20,
        timeframe: '3-6 meses',
        signs: ['Fallas de encendido', 'Ralentí irregular', 'Kilometraje alto']
      },
      'oxygen_sensor': {
        probability: 0.12,
        timeframe: '6-9 meses',
        signs: ['Fuel trim anormal', 'Economía de combustible reducida', 'Códigos P013x']
      },
      'catalytic_converter': {
        probability: 0.05,
        timeframe: '24+ meses',
        signs: ['Código P0420/P0430', 'Pérdida de potencia', 'Ruido metálico']
      }
    };

    return predictions[component] || null;
  }

  // Análisis de tendencias
  public analyzeTrends(historicalData: any[]) {
    if (historicalData.length < 10) {
      return { insufficient_data: true };
    }

    const recent = historicalData.slice(-10);
    const older = historicalData.slice(0, 10);

    const trends = {
      coolantTemp: this.calculateTrend(older.map(d => d.coolantTemp), recent.map(d => d.coolantTemp)),
      fuelTrim: this.calculateTrend(older.map(d => d.longTermFuelTrim), recent.map(d => d.longTermFuelTrim)),
      o2Sensor: this.calculateTrend(older.map(d => d.o2Voltage), recent.map(d => d.o2Voltage)),
      batteryVoltage: this.calculateTrend(older.map(d => d.batteryVoltage), recent.map(d => d.batteryVoltage))
    };

    return trends;
  }

  private calculateTrend(olderValues: number[], recentValues: number[]) {
    const olderAvg = olderValues.reduce((a, b) => a + b, 0) / olderValues.length;
    const recentAvg = recentValues.reduce((a, b) => a + b, 0) / recentValues.length;
    const change = ((recentAvg - olderAvg) / olderAvg) * 100;

    return {
      direction: change > 2 ? 'INCREASING' : change < -2 ? 'DECREASING' : 'STABLE',
      changePercent: Math.round(change * 10) / 10,
      concern: Math.abs(change) > 10 ? 'HIGH' : Math.abs(change) > 5 ? 'MEDIUM' : 'LOW'
    };
  }

  private calculateConfidence(data: any[]) {
    // Confianza basada en cantidad de datos
    if (data.length < 5) return 0.5;
    if (data.length < 10) return 0.7;
    if (data.length < 20) return 0.85;
    return 0.95;
  }

  private estimateDaysUntil(historicalData: any[], targetOdometer: number) {
    if (historicalData.length < 2) return null;

    // Calcular kilometraje promedio por día
    const first = historicalData[0];
    const last = historicalData[historicalData.length - 1];
    const days = (new Date(last.timestamp).getTime() - new Date(first.timestamp).getTime()) / (1000 * 60 * 60 * 24);
    const kmPerDay = (last.odometer - first.odometer) / days;

    const currentOdometer = last.odometer;
    const kmRemaining = targetOdometer - currentOdometer;
    
    return Math.round(kmRemaining / kmPerDay);
  }

  private generateRecommendations(health: number, data: any, dtcCodes: any[]) {
    const recommendations: string[] = [];

    if (dtcCodes.length > 0) {
      recommendations.push('Atender códigos de error diagnosticados lo antes posible');
    }

    if (health < 75) {
      recommendations.push('Realizar inspección completa del vehículo');
    }

    if (data.coolantTemp > 100) {
      recommendations.push('Sistema de enfriamiento requiere atención inmediata');
    }

    if (data.batteryVoltage < 13.0) {
      recommendations.push('Sistema eléctrico requiere diagnóstico');
    }

    if (recommendations.length === 0) {
      recommendations.push('Mantener rutina de mantenimiento preventivo regular');
    }

    return recommendations;
  }
}
