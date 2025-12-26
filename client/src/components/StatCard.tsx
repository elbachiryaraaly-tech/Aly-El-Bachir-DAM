import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  icon: ReactNode
  color?: string
  trend?: string
}

export default function StatCard({ title, value, icon, color = 'text-blue-500', trend }: StatCardProps) {
  const isPositiveTrend = trend?.startsWith('+')
  
  return (
    <div className="glass p-4 rounded-xl card-hover">
      <div className="flex items-center justify-between mb-2">
        <div className={color}>{icon}</div>
        {trend && (
          <div className={`flex items-center text-xs ${isPositiveTrend ? 'text-green-500' : 'text-red-500'}`}>
            {isPositiveTrend ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {trend}
          </div>
        )}
      </div>
      <h3 className="text-sm text-slate-400 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  )
}
