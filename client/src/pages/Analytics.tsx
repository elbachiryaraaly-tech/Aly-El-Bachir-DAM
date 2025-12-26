import { useState, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Activity,
  Fuel,
  ThermometerSun,
  Gauge
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

export default function Analytics() {
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('week')
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    loadAnalytics()
  }, [period])

  const loadAnalytics = async () => {
    // Simular carga de datos
    setStats({
      total_trips: 45,
      total_distance: 1250,
      avg_speed: 65,
      max_speed: 145,
      avg_fuel_consumption: 8.2,
      driving_style_score: 75
    })
  }

  const drivingData = [
    { day: 'Lun', distance: 45, fuel: 3.8, avgSpeed: 62 },
    { day: 'Mar', distance: 38, fuel: 3.2, avgSpeed: 58 },
    { day: 'Mié', distance: 52, fuel: 4.5, avgSpeed: 68 },
    { day: 'Jue', distance: 41, fuel: 3.5, avgSpeed: 64 },
    { day: 'Vie', distance: 48, fuel: 4.1, avgSpeed: 66 },
    { day: 'Sáb', distance: 65, fuel: 5.6, avgSpeed: 72 },
    { day: 'Dom', distance: 55, fuel: 4.7, avgSpeed: 69 }
  ]

  const engineHealthData = [
    { parameter: 'Motor', value: 95 },
    { parameter: 'Transmisión', value: 92 },
    { parameter: 'Frenos', value: 88 },
    { parameter: 'Suspensión', value: 90 },
    { parameter: 'Eléctrico', value: 94 },
    { parameter: 'Emisiones', value: 91 }
  ]

  const temperatureData = [
    { time: '00:00', temp: 88 },
    { time: '02:00', temp: 89 },
    { time: '04:00', temp: 90 },
    { time: '06:00', temp: 91 },
    { time: '08:00', temp: 93 },
    { time: '10:00', temp: 94 },
    { time: '12:00', temp: 95 },
    { time: '14:00', temp: 96 },
    { time: '16:00', temp: 94 },
    { time: '18:00', temp: 92 },
    { time: '20:00', temp: 90 },
    { time: '22:00', temp: 89 }
  ]

  const downloadReport = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/analytics/report/1')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `cardiag-report-${Date.now()}.pdf`
      a.click()
    } catch (error) {
      console.error('Error downloading report:', error)
    }
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Análisis Avanzado</h1>
          <p className="text-slate-400">Insights inteligentes con IA</p>
        </div>
        <div className="flex space-x-3">
          <div className="flex bg-slate-800 rounded-lg p-1">
            {(['week', 'month', 'year'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  period === p
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p === 'week' ? 'Semana' : p === 'month' ? 'Mes' : 'Año'}
              </button>
            ))}
          </div>
          <button
            onClick={downloadReport}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center space-x-2 btn-glow"
          >
            <Download className="w-5 h-5" />
            <span>Descargar Reporte</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass p-6 rounded-xl card-hover">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-slate-400 text-sm">Viajes Totales</p>
          <p className="text-3xl font-bold text-white">{stats?.total_trips || 0}</p>
        </div>

        <div className="glass p-6 rounded-xl card-hover">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 text-purple-500" />
          </div>
          <p className="text-slate-400 text-sm">Distancia Total</p>
          <p className="text-3xl font-bold text-white">{stats?.total_distance || 0} km</p>
        </div>

        <div className="glass p-6 rounded-xl card-hover">
          <div className="flex items-center justify-between mb-2">
            <Gauge className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-slate-400 text-sm">Velocidad Promedio</p>
          <p className="text-3xl font-bold text-white">{stats?.avg_speed || 0} km/h</p>
        </div>

        <div className="glass p-6 rounded-xl card-hover">
          <div className="flex items-center justify-between mb-2">
            <Fuel className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-slate-400 text-sm">Consumo Promedio</p>
          <p className="text-3xl font-bold text-white">{stats?.avg_fuel_consumption || 0} L/100km</p>
        </div>
      </div>

      {/* Gráfico de Distancia y Combustible */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />
          Distancia y Consumo de Combustible
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={drivingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Bar dataKey="distance" fill="#0ea5e9" name="Distancia (km)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="fuel" fill="#8b5cf6" name="Combustible (L)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Velocidad Promedio */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-purple-500" />
          Velocidad Promedio por Día
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={drivingData}>
            <defs>
              <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="avgSpeed" 
              stroke="#8b5cf6" 
              fillOpacity={1} 
              fill="url(#colorSpeed)"
              name="Velocidad (km/h)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Salud del Motor (Radar Chart) */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Salud General del Vehículo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={engineHealthData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="parameter" stroke="#94a3b8" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#94a3b8" />
              <Radar
                name="Salud"
                dataKey="value"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.6}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>

          <div className="space-y-3">
            {engineHealthData.map((item, index) => (
              <div key={index} className="bg-slate-800/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">{item.parameter}</span>
                  <span className="text-2xl font-bold text-blue-400">{item.value}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Temperatura del Motor */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <ThermometerSun className="w-6 h-6 mr-2 text-orange-500" />
          Temperatura del Motor (Últimas 24h)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" domain={[85, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px'
              }}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ fill: '#f59e0b', r: 4 }}
              name="Temperatura (°C)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Estilo de Conducción */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Análisis de Estilo de Conducción</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl">
            <p className="text-green-200 text-sm mb-2">Puntuación General</p>
            <p className="text-5xl font-bold text-white mb-2">75/100</p>
            <p className="text-green-200">Conducción Moderada</p>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl">
            <h4 className="text-white font-semibold mb-4">Fortalezas</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-green-400 text-sm">
                <span className="mr-2">✓</span>
                Frenado suave
              </li>
              <li className="flex items-center text-green-400 text-sm">
                <span className="mr-2">✓</span>
                Velocidad constante
              </li>
              <li className="flex items-center text-green-400 text-sm">
                <span className="mr-2">✓</span>
                Bajo ralentí
              </li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-6 rounded-xl">
            <h4 className="text-white font-semibold mb-4">Áreas de Mejora</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-yellow-400 text-sm">
                <span className="mr-2">⚠</span>
                Aceleración brusca
              </li>
              <li className="flex items-center text-yellow-400 text-sm">
                <span className="mr-2">⚠</span>
                RPM elevadas
              </li>
              <li className="flex items-center text-yellow-400 text-sm">
                <span className="mr-2">⚠</span>
                Cambios frecuentes
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <p className="text-blue-400">
            💡 <strong>Consejo de IA:</strong> Reducir la aceleración brusca en un 20% podría mejorar 
            tu eficiencia de combustible en aproximadamente 1.2 L/100km, ahorrando $40/mes.
          </p>
        </div>
      </div>

      {/* Predicciones de IA */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">🤖 Predicciones Inteligentes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
            <h4 className="text-blue-400 font-semibold mb-2">Próximo Mantenimiento</h4>
            <p className="text-slate-300 text-sm mb-2">
              Basándose en tu uso actual, se predice que necesitarás:
            </p>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• Cambio de aceite en <strong className="text-white">12 días</strong></li>
              <li>• Rotación de neumáticos en <strong className="text-white">28 días</strong></li>
            </ul>
          </div>

          <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-lg">
            <h4 className="text-purple-400 font-semibold mb-2">Eficiencia de Combustible</h4>
            <p className="text-slate-300 text-sm mb-2">
              Tendencia basada en tu conducción:
            </p>
            <p className="text-2xl font-bold text-white">
              8.2 L/100km <span className="text-sm text-green-400">(-5% vs mes anterior)</span>
            </p>
          </div>

          <div className="bg-orange-900/20 border border-orange-500/30 p-4 rounded-lg">
            <h4 className="text-orange-400 font-semibold mb-2">Desgaste de Componentes</h4>
            <p className="text-slate-300 text-sm mb-2">
              Predicción de vida útil restante:
            </p>
            <ul className="text-sm text-slate-400 space-y-1">
              <li>• Frenos: <strong className="text-white">70%</strong> (18,000 km)</li>
              <li>• Batería: <strong className="text-white">85%</strong> (2.5 años)</li>
            </ul>
          </div>

          <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
            <h4 className="text-green-400 font-semibold mb-2">Ahorro Potencial</h4>
            <p className="text-slate-300 text-sm mb-2">
              Optimizando tu conducción podrías ahorrar:
            </p>
            <p className="text-3xl font-bold text-white">$65/mes</p>
            <p className="text-sm text-slate-400 mt-1">en combustible y mantenimiento</p>
          </div>
        </div>
      </div>
    </div>
  )
}
