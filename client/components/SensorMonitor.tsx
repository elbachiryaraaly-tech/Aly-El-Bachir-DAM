'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Activity, Gauge, Thermometer, Zap } from 'lucide-react'
import io from 'socket.io-client'
import axios from 'axios'

const socket = io('http://localhost:5000')

export default function SensorMonitor() {
  const [sensors, setSensors] = useState<any[]>([])
  const [sensorData, setSensorData] = useState<any[]>([])
  const [selectedSensors, setSelectedSensors] = useState<string[]>(['rpm', 'speed', 'coolantTemp'])
  const [monitoring, setMonitoring] = useState(false)
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    loadSensors()
  }, [])

  useEffect(() => {
    if (monitoring) {
      socket.emit('start-monitoring')
      socket.on('sensor-data', handleSensorData)
    }

    return () => {
      socket.off('sensor-data')
    }
  }, [monitoring])

  const loadSensors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sensors/list')
      setSensors(response.data.data)
    } catch (error) {
      console.error('Error cargando sensores:', error)
    }
  }

  const handleSensorData = (data: any) => {
    setSensorData([data])
    
    // Actualizar datos del gráfico
    const newDataPoint = {
      time: new Date().toLocaleTimeString(),
      ...data
    }
    
    setChartData(prev => {
      const updated = [...prev, newDataPoint]
      return updated.slice(-50) // Mantener últimos 50 puntos
    })
  }

  const toggleSensor = (sensorId: string) => {
    setSelectedSensors(prev =>
      prev.includes(sensorId)
        ? prev.filter(id => id !== sensorId)
        : [...prev, sensorId]
    )
  }

  const getSensorValue = (sensorId: string) => {
    const data = sensorData[0]
    return data ? data[sensorId] : 0
  }

  const getSensorInfo = (sensorId: string) => {
    return sensors.find(s => s.id === sensorId)
  }

  const getSensorIcon = (category: string) => {
    switch (category) {
      case 'Motor':
        return <Activity className="w-5 h-5" />
      case 'Temperatura':
        return <Thermometer className="w-5 h-5" />
      case 'Velocidad':
        return <Gauge className="w-5 h-5" />
      default:
        return <Zap className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Controles */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Monitoreo en Tiempo Real</h3>
          <button
            onClick={() => setMonitoring(!monitoring)}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              monitoring
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {monitoring ? 'Detener' : 'Iniciar'} Monitoreo
          </button>
        </div>

        {/* Selector de sensores */}
        <div>
          <p className="text-gray-400 mb-3">Seleccionar sensores para monitorear:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {sensors.map(sensor => (
              <button
                key={sensor.id}
                onClick={() => toggleSensor(sensor.id)}
                className={`p-3 rounded-lg border transition-all ${
                  selectedSensors.includes(sensor.id)
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:border-gray-500'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {getSensorIcon(sensor.category)}
                  <span className="text-sm font-semibold">{sensor.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Valores actuales */}
      {monitoring && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {selectedSensors.map(sensorId => {
            const sensor = getSensorInfo(sensorId)
            const value = getSensorValue(sensorId)
            
            return sensor ? (
              <div
                key={sensorId}
                className="bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2 text-gray-400">
                  {getSensorIcon(sensor.category)}
                  <span className="text-sm">{sensor.name}</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {typeof value === 'number' ? value.toFixed(sensor.unit === '°C' ? 0 : 1) : value}
                </div>
                <div className="text-sm text-gray-500">{sensor.unit}</div>
              </div>
            ) : null
          })}
        </div>
      )}

      {/* Gráfico */}
      {monitoring && chartData.length > 0 && (
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Gráfico en Tiempo Real</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              {selectedSensors.map(sensorId => {
                const sensor = getSensorInfo(sensorId)
                return (
                  <Line
                    key={sensorId}
                    type="monotone"
                    dataKey={sensorId}
                    stroke={
                      sensorId === 'rpm' ? '#3B82F6' :
                      sensorId === 'speed' ? '#10B981' :
                      sensorId === 'coolantTemp' ? '#EF4444' :
                      sensorId === 'throttle' ? '#F59E0B' :
                      '#8B5CF6'
                    }
                    strokeWidth={2}
                    name={sensor?.name}
                    dot={false}
                  />
                )
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {!monitoring && (
        <div className="bg-gray-800 rounded-lg shadow-xl p-12 border border-gray-700 text-center">
          <Activity className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Presiona "Iniciar Monitoreo" para comenzar</p>
        </div>
      )}
    </div>
  )
}
