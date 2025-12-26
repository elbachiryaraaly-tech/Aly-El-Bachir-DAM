import { useState, useEffect } from 'react'
import { 
  Activity, 
  Thermometer, 
  Zap, 
  Gauge as GaugeIcon,
  Fuel,
  Battery,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Wind
} from 'lucide-react'
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import GaugeComponent from '../components/GaugeComponent'
import StatCard from '../components/StatCard'

interface DashboardProps {
  isConnected: boolean
}

export default function Dashboard({ isConnected }: DashboardProps) {
  const [realtimeData, setRealtimeData] = useState<any>({
    rpm: 0,
    speed: 0,
    coolantTemp: 0,
    engineLoad: 0,
    throttlePos: 0,
    fuelLevel: 75,
    batteryVoltage: 14.2,
    o2Voltage: 0.45,
    mafRate: 2.5,
    intakeTemp: 25
  })

  const [rpmHistory, setRpmHistory] = useState<any[]>([])
  const [ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    if (isConnected) {
      // Conectar WebSocket
      const websocket = new WebSocket('ws://localhost:5000/ws')
      
      websocket.onopen = () => {
        console.log('WebSocket conectado')
      }

      websocket.onmessage = (event) => {
        const message = JSON.parse(event.data)
        if (message.type === 'REALTIME_DATA') {
          setRealtimeData(message.data)
          
          // Actualizar historial de RPM
          setRpmHistory(prev => {
            const newHistory = [...prev, {
              time: new Date().toLocaleTimeString(),
              rpm: message.data.rpm,
              speed: message.data.speed
            }]
            // Mantener solo los últimos 50 puntos
            return newHistory.slice(-50)
          })
        }
      }

      websocket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      setWs(websocket)

      return () => {
        websocket.close()
      }
    }
  }, [isConnected])

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="glass p-12 rounded-2xl text-center max-w-md">
          <AlertCircle className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">No Conectado</h2>
          <p className="text-slate-400 mb-6">
            Por favor, conecta tu dispositivo OBD-II para comenzar a monitorear tu vehículo en tiempo real.
          </p>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <p className="text-sm text-slate-300">
              💡 Tip: Asegúrate de que tu adaptador OBD-II esté conectado al puerto del vehículo y el motor esté encendido.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard en Tiempo Real</h1>
          <p className="text-slate-400">Monitoreo completo de tu vehículo</p>
        </div>
        <div className="flex items-center space-x-2 glass px-4 py-2 rounded-lg">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-white font-semibold">En Vivo</span>
        </div>
      </div>

      {/* Gauges principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GaugeComponent
          title="RPM"
          value={realtimeData.rpm}
          max={7000}
          unit="rpm"
          color="#0ea5e9"
          icon={<Activity className="w-6 h-6" />}
        />
        <GaugeComponent
          title="Velocidad"
          value={realtimeData.speed}
          max={220}
          unit="km/h"
          color="#8b5cf6"
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <GaugeComponent
          title="Temperatura"
          value={realtimeData.coolantTemp}
          max={120}
          unit="°C"
          color="#f59e0b"
          icon={<Thermometer className="w-6 h-6" />}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Carga del Motor"
          value={`${realtimeData.engineLoad}%`}
          icon={<Zap className="w-5 h-5" />}
          color="text-yellow-500"
          trend={realtimeData.engineLoad > 50 ? '+12%' : '-5%'}
        />
        <StatCard
          title="Posición del Acelerador"
          value={`${realtimeData.throttlePos}%`}
          icon={<GaugeIcon className="w-5 h-5" />}
          color="text-blue-500"
        />
        <StatCard
          title="Nivel de Combustible"
          value={`${realtimeData.fuelLevel}%`}
          icon={<Fuel className="w-5 h-5" />}
          color="text-green-500"
        />
        <StatCard
          title="Voltaje Batería"
          value={`${realtimeData.batteryVoltage}V`}
          icon={<Battery className="w-5 h-5" />}
          color="text-purple-500"
        />
      </div>

      {/* Gráficos en tiempo real */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de RPM */}
        <div className="glass p-6 rounded-2xl card-hover">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-500" />
            Historial de RPM
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={rpmHistory}>
              <defs>
                <linearGradient id="colorRpm" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" />
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
                dataKey="rpm" 
                stroke="#0ea5e9" 
                fillOpacity={1} 
                fill="url(#colorRpm)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Velocidad */}
        <div className="glass p-6 rounded-2xl card-hover">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
            Historial de Velocidad
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={rpmHistory}>
              <defs>
                <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" />
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
                dataKey="speed" 
                stroke="#8b5cf6" 
                fillOpacity={1} 
                fill="url(#colorSpeed)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Datos adicionales del motor */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Wind className="w-5 h-5 mr-2 text-cyan-500" />
          Parámetros Avanzados del Motor
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <p className="text-slate-400 text-sm mb-1">Sensor O2</p>
            <p className="text-2xl font-bold text-white">{realtimeData.o2Voltage}V</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <p className="text-slate-400 text-sm mb-1">MAF</p>
            <p className="text-2xl font-bold text-white">{realtimeData.mafRate} g/s</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <p className="text-slate-400 text-sm mb-1">Temp. Admisión</p>
            <p className="text-2xl font-bold text-white">{realtimeData.intakeTemp}°C</p>
          </div>
          <div className="bg-slate-800/50 p-4 rounded-lg">
            <p className="text-slate-400 text-sm mb-1">Estado</p>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-lg font-bold text-white">Normal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Salud del vehículo */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Salud del Vehículo</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-4xl font-bold text-green-500">95/100</p>
            <p className="text-slate-400 mt-1">Estado: Excelente</p>
          </div>
          <div className="text-right">
            <CheckCircle className="w-16 h-16 text-green-500 mb-2" />
            <p className="text-sm text-slate-400">Todos los sistemas operando normalmente</p>
          </div>
        </div>
      </div>
    </div>
  )
}
