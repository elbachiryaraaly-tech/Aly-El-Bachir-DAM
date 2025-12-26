import { useState, useEffect } from 'react'
import { 
  Wrench, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus,
  DollarSign,
  Car
} from 'lucide-react'

export default function Maintenance() {
  const [maintenanceItems, setMaintenanceItems] = useState<any[]>([])
  const [schedule, setSchedule] = useState<any[]>([])
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    loadMaintenanceSchedule()
  }, [])

  const loadMaintenanceSchedule = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/maintenance/schedule/1')
      const data = await response.json()
      setSchedule(data.schedule || [])
    } catch (error) {
      console.error('Error loading maintenance:', error)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-500'
      case 'HIGH': return 'bg-orange-500'
      case 'MEDIUM': return 'bg-yellow-500'
      case 'LOW': return 'bg-blue-500'
      default: return 'bg-slate-500'
    }
  }

  const getStatusColor = (item: any) => {
    if (item.is_overdue) return 'border-red-500 bg-red-900/20'
    if (item.is_due_soon) return 'border-yellow-500 bg-yellow-900/20'
    return 'border-slate-700 bg-slate-800/50'
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Mantenimiento Inteligente</h1>
          <p className="text-slate-400">Planificación predictiva con IA</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center space-x-2 btn-glow"
        >
          <Plus className="w-5 h-5" />
          <span>Agregar Mantenimiento</span>
        </button>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass p-6 rounded-xl card-hover">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <span className="text-3xl font-bold text-white">
              {schedule.filter(s => s.is_overdue).length}
            </span>
          </div>
          <p className="text-slate-400">Atrasados</p>
        </div>

        <div className="glass p-6 rounded-xl card-hover">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8 text-yellow-500" />
            <span className="text-3xl font-bold text-white">
              {schedule.filter(s => s.is_due_soon && !s.is_overdue).length}
            </span>
          </div>
          <p className="text-slate-400">Próximos</p>
        </div>

        <div className="glass p-6 rounded-xl card-hover">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <span className="text-3xl font-bold text-white">
              {schedule.filter(s => !s.is_due_soon && !s.is_overdue).length}
            </span>
          </div>
          <p className="text-slate-400">Al Día</p>
        </div>

        <div className="glass p-6 rounded-xl card-hover">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-blue-500" />
            <span className="text-3xl font-bold text-white">
              ${schedule.reduce((sum, s) => sum + (s.estimated_cost || 0), 0)}
            </span>
          </div>
          <p className="text-slate-400">Costo Total Est.</p>
        </div>
      </div>

      {/* Odómetro actual */}
      <div className="glass p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Car className="w-12 h-12 text-blue-500" />
            <div>
              <p className="text-slate-400 text-sm">Kilometraje Actual</p>
              <p className="text-4xl font-bold text-white">45,000 km</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-sm">Promedio Mensual</p>
            <p className="text-2xl font-bold text-white">1,250 km</p>
          </div>
        </div>
      </div>

      {/* Cronograma de mantenimiento */}
      <div className="glass p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-blue-500" />
          Cronograma de Mantenimiento
        </h3>

        <div className="space-y-3">
          {schedule.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg ${getStatusColor(item)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Wrench className="w-5 h-5 text-blue-400" />
                    <h4 className="text-white font-bold">{item.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Intervalo</p>
                      <p className="text-white font-semibold">{item.interval_km.toLocaleString()} km</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Próximo Servicio</p>
                      <p className="text-white font-semibold">{item.next_due_km.toLocaleString()} km</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Kilómetros Restantes</p>
                      <p className={`font-semibold ${
                        item.km_remaining < 1000 ? 'text-red-500' : 
                        item.km_remaining < 2000 ? 'text-yellow-500' : 
                        'text-green-500'
                      }`}>
                        {item.km_remaining.toLocaleString()} km
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400">Costo Estimado</p>
                      <p className="text-white font-semibold">${item.estimated_cost}</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-slate-400 text-xs mb-1">Fecha Estimada</p>
                    <p className="text-white text-sm">{new Date(item.estimated_date).toLocaleDateString('es-ES', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                  </div>
                </div>

                <button
                  className="ml-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold transition-colors flex items-center space-x-1"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Completar</span>
                </button>
              </div>

              {/* Barra de progreso */}
              <div className="mt-4">
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.km_remaining < 1000 ? 'bg-red-500' :
                      item.km_remaining < 2000 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{
                      width: `${Math.max(0, Math.min(100, ((item.next_due_km - 45000) / item.interval_km) * 100))}%`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendaciones de IA */}
      <div className="glass p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-4">🤖 Recomendaciones de IA</h3>
        <div className="space-y-3">
          <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
            <p className="text-blue-400 font-semibold mb-1">💡 Mantenimiento Preventivo</p>
            <p className="text-slate-300 text-sm">
              Basándose en tu estilo de conducción y condiciones, recomendamos adelantar el cambio de aceite 
              a 43,000 km en lugar de 48,000 km.
            </p>
          </div>

          <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded-lg">
            <p className="text-yellow-400 font-semibold mb-1">⚠️ Atención Requerida</p>
            <p className="text-slate-300 text-sm">
              Los frenos han perdido un 8% de eficiencia en las últimas 1,000 km. 
              Considera una inspección en tu próxima visita al taller.
            </p>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
            <p className="text-green-400 font-semibold mb-1">✅ Todo en Orden</p>
            <p className="text-slate-300 text-sm">
              Tu batería está en excelente estado con 95% de salud. Se espera una vida útil de 2+ años más.
            </p>
          </div>
        </div>
      </div>

      {/* Historial de mantenimiento completado */}
      <div className="glass p-6 rounded-xl">
        <h3 className="text-xl font-bold text-white mb-4">Historial de Mantenimiento</h3>
        <div className="space-y-2">
          {[
            { date: '2024-01-15', service: 'Cambio de Aceite', cost: 80, km: 40000 },
            { date: '2023-12-01', service: 'Rotación de Neumáticos', cost: 40, km: 38000 },
            { date: '2023-10-20', service: 'Cambio de Filtro de Aire', cost: 35, km: 36000 },
          ].map((item, index) => (
            <div key={index} className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between hover:bg-slate-800 transition-colors">
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-white font-semibold">{item.service}</p>
                  <p className="text-slate-400 text-sm">{item.date} • {item.km.toLocaleString()} km</p>
                </div>
              </div>
              <p className="text-white font-bold">${item.cost}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
