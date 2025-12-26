import { ReactNode } from 'react'

interface GaugeComponentProps {
  title: string
  value: number
  max: number
  unit: string
  color: string
  icon: ReactNode
}

export default function GaugeComponent({ title, value, max, unit, color, icon }: GaugeComponentProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const rotation = (percentage / 100) * 270 - 135 // -135 a +135 grados

  return (
    <div className="glass p-6 rounded-2xl card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div style={{ color }}>{icon}</div>
      </div>
      
      <div className="relative w-full aspect-square flex items-center justify-center">
        {/* Círculo de fondo */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#334155"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${percentage * 2.827} 282.7`}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 10px ${color})`,
              transition: 'stroke-dasharray 0.3s ease'
            }}
          />
        </svg>

        {/* Valor central */}
        <div className="text-center z-10">
          <div className="text-4xl font-bold text-white" style={{ color }}>
            {value}
          </div>
          <div className="text-sm text-slate-400 mt-1">{unit}</div>
        </div>
      </div>

      {/* Barra de progreso adicional */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>0</span>
          <span>{max}</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
              boxShadow: `0 0 10px ${color}`
            }}
          />
        </div>
      </div>
    </div>
  )
}
