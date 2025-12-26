import { useState, useEffect } from 'react'
import { 
  Zap, 
  Timer, 
  Gauge, 
  TrendingUp,
  Award,
  Play,
  Square,
  RotateCcw
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface PerformanceProps {
  isConnected: boolean
}

export default function Performance({ isConnected }: PerformanceProps) {
  const [testing, setTesting] = useState(false)
  const [testType, setTestType] = useState<'0-100' | 'quarter-mile' | 'power'>('0-100')
  const [testResults, setTestResults] = useState<any>(null)
  const [performanceHistory, setPerformanceHistory] = useState<any[]>([
    { date: '2024-01-15', time: 7.2, speed: 180 },
    { date: '2024-01-20', time: 6.9, speed: 182 },
    { date: '2024-01-25', time: 6.8, speed: 185 },
    { date: '2024-02-01', time: 6.7, speed: 187 },
  ])

  const startTest = () => {
    setTesting(true)
    
    // Simular prueba de rendimiento
    setTimeout(() => {
      const result = {
        testType,
        timestamp: new Date(),
        '0-100': testType === '0-100' ? (6.5 + Math.random()).toFixed(2) : null,
        quarterMileTime: testType === 'quarter-mile' ? (14.5 + Math.random()).toFixed(2) : null,
        quarterMileSpeed: testType === 'quarter-mile' ? Math.round(160 + Math.random() * 20) : null,
        maxHP: testType === 'power' ? Math.round(250 + Math.random() * 50) : null,
        maxTorque: testType === 'power' ? Math.round(350 + Math.random() * 50) : null,
        topSpeed: Math.round(180 + Math.random() * 30)
      }
      
      setTestResults(result)
      setTesting(false)
    }, 5000)
  }

  const resetTest = () => {
    setTestResults(null)
    setTesting(false)
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="glass p-12 rounded-2xl text-center max-w-md">
          <Zap className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">No Conectado</h2>
          <p className="text-slate-400">
            Conecta tu dispositivo OBD-II para realizar pruebas de rendimiento
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Pruebas de Rendimiento</h1>
        <p className="text-slate-400">Mide el rendimiento real de tu vehículo</p>
      </div>

      {/* Selector de tipo de prueba */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Tipo de Prueba</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setTestType('0-100')}
            className={`p-6 rounded-xl transition-all ${
              testType === '0-100'
                ? 'bg-blue-600 shadow-lg shadow-blue-600/50'
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <Timer className="w-8 h-8 mb-2 mx-auto" />
            <h4 className="font-bold text-lg mb-1">0-100 km/h</h4>
            <p className="text-sm text-slate-400">Aceleración</p>
          </button>

          <button
            onClick={() => setTestType('quarter-mile')}
            className={`p-6 rounded-xl transition-all ${
              testType === 'quarter-mile'
                ? 'bg-blue-600 shadow-lg shadow-blue-600/50'
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <Gauge className="w-8 h-8 mb-2 mx-auto" />
            <h4 className="font-bold text-lg mb-1">1/4 Milla</h4>
            <p className="text-sm text-slate-400">Drag Race</p>
          </button>

          <button
            onClick={() => setTestType('power')}
            className={`p-6 rounded-xl transition-all ${
              testType === 'power'
                ? 'bg-blue-600 shadow-lg shadow-blue-600/50'
                : 'bg-slate-800 hover:bg-slate-700'
            }`}
          >
            <Zap className="w-8 h-8 mb-2 mx-auto" />
            <h4 className="font-bold text-lg mb-1">Potencia</h4>
            <p className="text-sm text-slate-400">HP & Torque</p>
          </button>
        </div>
      </div>

      {/* Controles de prueba */}
      <div className="glass p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Control de Prueba</h3>
          {testing && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-500 font-semibold">Probando...</span>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            onClick={startTest}
            disabled={testing}
            className={`flex-1 py-4 rounded-lg font-bold flex items-center justify-center space-x-2 transition-all ${
              testing
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 btn-glow'
            }`}
          >
            <Play className="w-5 h-5" />
            <span>Iniciar Prueba</span>
          </button>

          <button
            onClick={resetTest}
            disabled={testing}
            className="px-6 py-4 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold flex items-center space-x-2 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Reiniciar</span>
          </button>
        </div>

        {testing && (
          <div className="mt-6 bg-slate-800/50 p-6 rounded-lg">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <p className="text-center text-slate-400">
              Recolectando datos en tiempo real...
            </p>
            <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Resultados de la prueba */}
      {testResults && (
        <div className="glass p-6 rounded-2xl animate-slide-in">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Award className="w-6 h-6 mr-2 text-yellow-500" />
            Resultados de la Prueba
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testResults['0-100'] && (
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-xl">
                <p className="text-blue-200 mb-2">0-100 km/h</p>
                <p className="text-4xl font-bold text-white">{testResults['0-100']}s</p>
                <p className="text-blue-200 text-sm mt-2">⚡ Excelente</p>
              </div>
            )}

            {testResults.quarterMileTime && (
              <>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-6 rounded-xl">
                  <p className="text-purple-200 mb-2">1/4 Milla - Tiempo</p>
                  <p className="text-4xl font-bold text-white">{testResults.quarterMileTime}s</p>
                  <p className="text-purple-200 text-sm mt-2">🏁 Competitivo</p>
                </div>
                <div className="bg-gradient-to-br from-pink-600 to-pink-800 p-6 rounded-xl">
                  <p className="text-pink-200 mb-2">1/4 Milla - Velocidad</p>
                  <p className="text-4xl font-bold text-white">{testResults.quarterMileSpeed} km/h</p>
                  <p className="text-pink-200 text-sm mt-2">🚀 Veloz</p>
                </div>
              </>
            )}

            {testResults.maxHP && (
              <>
                <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-6 rounded-xl">
                  <p className="text-orange-200 mb-2">Potencia Máxima</p>
                  <p className="text-4xl font-bold text-white">{testResults.maxHP} HP</p>
                  <p className="text-orange-200 text-sm mt-2">💪 Potente</p>
                </div>
                <div className="bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-xl">
                  <p className="text-red-200 mb-2">Torque Máximo</p>
                  <p className="text-4xl font-bold text-white">{testResults.maxTorque} Nm</p>
                  <p className="text-red-200 text-sm mt-2">🔧 Robusto</p>
                </div>
              </>
            )}

            <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl">
              <p className="text-green-200 mb-2">Velocidad Máxima</p>
              <p className="text-4xl font-bold text-white">{testResults.topSpeed} km/h</p>
              <p className="text-green-200 text-sm mt-2">🏎️ Rápido</p>
            </div>
          </div>

          <div className="mt-6 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
            <p className="text-blue-400 text-sm">
              💡 <strong>Consejo:</strong> Los resultados pueden variar según las condiciones de la carretera,
              temperatura ambiente, presión de neumáticos y carga del vehículo.
            </p>
          </div>
        </div>
      )}

      {/* Historial de rendimiento */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
          Historial de Rendimiento
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="time"
              stroke="#0ea5e9"
              strokeWidth={2}
              name="0-100 km/h (s)"
              dot={{ fill: '#0ea5e9', r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="speed"
              stroke="#8b5cf6"
              strokeWidth={2}
              name="Velocidad Máx (km/h)"
              dot={{ fill: '#8b5cf6', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Comparación con especificaciones del fabricante */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Comparación con Especificaciones</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>0-100 km/h</span>
              <span>Tu resultado: 6.5s | Fabricante: 7.0s</span>
            </div>
            <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-600 to-blue-600 rounded-full" style={{ width: '93%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Potencia</span>
              <span>Medido: 270 HP | Especificado: 250 HP</span>
            </div>
            <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full" style={{ width: '108%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Velocidad Máxima</span>
              <span>Alcanzada: 210 km/h | Especificada: 220 km/h</span>
            </div>
            <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
          <p className="text-green-400">
            ✅ Tu vehículo está funcionando al <strong>98%</strong> de su rendimiento óptimo
          </p>
        </div>
      </div>
    </div>
  )
}
