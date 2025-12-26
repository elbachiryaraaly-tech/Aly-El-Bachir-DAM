import { useState, useEffect } from 'react';

export interface OBDData {
  rpm: number;
  speed: number;
  coolantTemp: number;
  engineLoad: number;
  intakeTemp: number;
  voltage: number;
  maf: number; // Mass Air Flow
  isConnected: boolean;
  dtcCodes: string[];
}

export const useOBDData = () => {
  const [data, setData] = useState<OBDData>({
    rpm: 0,
    speed: 0,
    coolantTemp: 90,
    engineLoad: 0,
    intakeTemp: 20,
    voltage: 12.6,
    maf: 0,
    isConnected: false,
    dtcCodes: [],
  });

  const [simulationActive, setSimulationActive] = useState(false);

  useEffect(() => {
    if (!simulationActive) return;

    const interval = setInterval(() => {
      setData(prev => {
        // Simulate realistic fluctuations
        const newRpm = prev.rpm + (Math.random() * 200 - 100);
        const newSpeed = prev.speed + (Math.random() * 5 - 2);
        
        // Clamp values
        const finalRpm = Math.max(800, Math.min(7000, newRpm));
        const finalSpeed = Math.max(0, Math.min(220, newSpeed));

        // Randomly trigger a DTC code occasionally for demo
        const newDtc = Math.random() > 0.99 ? ['P0300', 'P0171'] : prev.dtcCodes;

        return {
          ...prev,
          rpm: Math.floor(finalRpm),
          speed: Math.floor(finalSpeed),
          coolantTemp: 90 + Math.random() * 5 - 2.5,
          engineLoad: Math.max(10, Math.min(100, prev.engineLoad + (Math.random() * 10 - 5))),
          voltage: 13.8 + (Math.random() * 0.4 - 0.2),
          isConnected: true,
          dtcCodes: newDtc
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [simulationActive]);

  const toggleConnection = () => {
    setSimulationActive(!simulationActive);
    if (!simulationActive) {
      setData(prev => ({ ...prev, isConnected: true, rpm: 800, speed: 0 }));
    } else {
      setData(prev => ({ ...prev, isConnected: false, rpm: 0, speed: 0 }));
    }
  };

  return { data, toggleConnection, simulationActive };
};
