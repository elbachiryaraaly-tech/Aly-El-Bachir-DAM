import React from 'react';
import { Brain, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  dtcCodes: string[];
  data: any;
}

export const AIDiagnostics: React.FC<Props> = ({ dtcCodes, data }) => {
  return (
    <div className="glass-panel p-6 h-full flex flex-col overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <Brain className="w-8 h-8 text-neon-blue animate-pulse" />
        <h2 className="text-2xl font-bold neon-text">NEXUS AI CORE</h2>
      </div>

      <div className="space-y-4">
        {/* Status Card */}
        <div className={`p-4 rounded-lg border ${dtcCodes.length > 0 ? 'bg-red-900/20 border-red-500/50' : 'bg-green-900/20 border-green-500/50'}`}>
          <div className="flex items-center gap-2 mb-2">
            {dtcCodes.length > 0 ? (
              <AlertTriangle className="text-red-500 w-5 h-5" />
            ) : (
              <CheckCircle className="text-green-500 w-5 h-5" />
            )}
            <h3 className="font-semibold text-lg">
              {dtcCodes.length > 0 ? 'Anomalías Detectadas' : 'Sistemas Nominales'}
            </h3>
          </div>
          <p className="text-gray-400 text-sm">
            {dtcCodes.length > 0 
              ? 'El sistema ha detectado patrones irregulares que requieren atención inmediata.' 
              : 'El análisis predictivo indica una operación óptima para los próximos 500km.'}
          </p>
        </div>

        {/* Predictive Analysis */}
        <div className="p-4 rounded-lg bg-blue-900/10 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="text-neon-blue w-4 h-4" />
            <h3 className="font-semibold text-neon-blue">Análisis Predictivo</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Salud de Batería</span>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-green-500" 
                  initial={{ width: 0 }}
                  animate={{ width: `${(data.voltage / 14) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-300">Eficiencia de Combustible</span>
              <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-yellow-500" 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Active Codes */}
        {dtcCodes.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-wider">Códigos Activos</h3>
            {dtcCodes.map(code => (
              <div key={code} className="p-3 bg-red-500/10 border border-red-500/30 rounded mb-2">
                <span className="font-mono font-bold text-red-400">{code}</span>
                <p className="text-xs text-gray-300 mt-1">
                  {code === 'P0300' ? 'Fallo de encendido aleatorio detectado.' : 'Sistema muy pobre (Banco 1).'}
                </p>
                <div className="mt-2 text-xs text-neon-blue flex gap-1 items-center cursor-pointer hover:underline">
                  Ver solución guiada por IA &rarr;
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
