import React from 'react';
import { motion } from 'framer-motion';

interface GaugeProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
}

export const Gauge: React.FC<GaugeProps> = ({ value, max, label, unit, color = '#00f3ff' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const strokeDasharray = 283; // 2 * pi * 45
  const strokeDashoffset = strokeDasharray - (percentage / 100) * strokeDasharray;

  return (
    <div className="relative flex flex-col items-center justify-center p-4 glass-panel w-full">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="45"
            fill="transparent"
            stroke="#1a1a2e"
            strokeWidth="8"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="45"
            fill="transparent"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5 }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <span className="text-2xl font-bold font-mono">{Math.round(value)}</span>
          <span className="text-xs text-gray-400">{unit}</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-300 uppercase tracking-wider">{label}</span>
    </div>
  );
};
