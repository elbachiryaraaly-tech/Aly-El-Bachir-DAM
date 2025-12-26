import { useState, useEffect } from 'react'
import { 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Trash2, 
  Download,
  XCircle,
  Info,
  Wrench,
  DollarSign
} from 'lucide-react'

interface DiagnosticsProps {
  isConnected: boolean
}

interface DTCCode {
  code: string
  description: string
  system: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  possible_causes?: string
  solutions?: string
  estimated_cost_min?: number
  estimated_cost_max?: number
}

export default function Diagnostics({ isConnected }: DiagnosticsProps) {
  const [dtcCodes, setDtcCodes] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCode, setSelectedCode] = useState<DTCCode | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isConnected) {
      readDTCCodes()
    }
  }, [isConnected])

  const readDTCCodes = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/obd/dtc')
      const data = await response.json()
      setDtcCodes(data.codes || [])
    } catch (error) {
      console.error('Error reading DTC codes:', error)
    }
    setLoading(false)
  }

  const clearDTCCodes = async () => {
    if (!confirm('¿Estás seguro de que deseas borrar todos los códigos de error?')) {
      return
    }

    try {
      await fetch('http://localhost:5000/api/obd/dtc', { method: 'DELETE' })
      setDtcCodes([])
      alert('Códigos DTC borrados exitosamente')
    } catch (error) {
      console.error('Error clearing DTC codes:', error)
      alert('Error al borrar códigos DTC')
    }
  }

  const searchDTCInfo = async (code: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/diagnostic/dtc/${code}`)
      const data = await response.json()
      setSelectedCode(data)
    } catch (error) {
      console.error('Error searching DTC:', error)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'LOW': return 'text-blue-500 bg-blue-500/20'
      case 'MEDIUM': return 'text-yellow-500 bg-yellow-500/20'
      case 'HIGH': return 'text-orange-500 bg-orange-500/20'
      case 'CRITICAL': return 'text-red-500 bg-red-500/20'
      default: return 'text-slate-500 bg-slate-500/20'
    }
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Diagnósticos Avanzados</h1>
          <p className="text-slate-400">Análisis completo de códigos DTC con IA</p>
        </div>
        {isConnected && (
          <div className="flex space-x-3">
            <button
              onClick={readDTCCodes}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors btn-glow"
              disabled={loading}
            >
              {loading ? 'Leyendo...' : 'Leer Códigos'}
            </button>
            {dtcCodes.length > 0 && (
              <button
                onClick={clearDTCCodes}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors flex items-center space-x-2"
              >
                <Trash2 className="w-5 h-5" />
                <span>Borrar Códigos</span>
              </button>
            )}
          </div>
        )}
      </div>

      {!isConnected ? (
        <div className="glass p-12 rounded-2xl text-center">
          <AlertTriangle className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No Conectado</h2>
          <p className="text-slate-400">Conecta tu dispositivo OBD-II para leer códigos de diagnóstico</p>
        </div>
      ) : (
        <>
          {/* Estado de diagnóstico */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-xl card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 mb-1">Códigos Detectados</p>
                  <p className="text-4xl font-bold text-white">{dtcCodes.length}</p>
                </div>
                <AlertTriangle className={`w-12 h-12 ${dtcCodes.length > 0 ? 'text-red-500' : 'text-slate-600'}`} />
              </div>
            </div>

            <div className="glass p-6 rounded-xl card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 mb-1">Estado del Sistema</p>
                  <p className="text-xl font-bold text-white">
                    {dtcCodes.length === 0 ? 'Sin Errores' : 'Requiere Atención'}
                  </p>
                </div>
                {dtcCodes.length === 0 ? (
                  <CheckCircle className="w-12 h-12 text-green-500" />
                ) : (
                  <XCircle className="w-12 h-12 text-red-500" />
                )}
              </div>
            </div>

            <div className="glass p-6 rounded-xl card-hover">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 mb-1">Monitores Listos</p>
                  <p className="text-4xl font-bold text-white">8/11</p>
                </div>
                <CheckCircle className="w-12 h-12 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Buscador de códigos */}
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Buscar Código DTC
            </h3>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Ingresa un código DTC (ej: P0300, P0171)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => searchDTCInfo(searchTerm)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Información del código seleccionado */}
          {selectedCode && (
            <div className="glass p-6 rounded-xl animate-slide-in">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedCode.code}</h3>
                  <p className="text-slate-300">{selectedCode.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(selectedCode.severity)}`}>
                  {selectedCode.severity}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2 text-yellow-500" />
                    Causas Posibles
                  </h4>
                  <p className="text-slate-400 text-sm">{selectedCode.possible_causes || 'No disponible'}</p>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <Wrench className="w-4 h-4 mr-2 text-blue-500" />
                    Soluciones Recomendadas
                  </h4>
                  <p className="text-slate-400 text-sm">{selectedCode.solutions || 'No disponible'}</p>
                </div>
              </div>

              {selectedCode.estimated_cost_min && (
                <div className="mt-4 bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2 flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                    Costo Estimado de Reparación
                  </h4>
                  <p className="text-2xl font-bold text-blue-400">
                    ${selectedCode.estimated_cost_min} - ${selectedCode.estimated_cost_max} USD
                  </p>
                  <p className="text-slate-400 text-sm mt-1">
                    *El costo puede variar según el taller y la región
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Lista de códigos detectados */}
          {dtcCodes.length > 0 && (
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold text-white mb-4">Códigos DTC Detectados</h3>
              <div className="space-y-3">
                {dtcCodes.map((dtc, index) => (
                  <div
                    key={index}
                    className="bg-slate-800/50 p-4 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    onClick={() => searchDTCInfo(dtc.code)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <AlertTriangle className="w-6 h-6 text-red-500" />
                        <div>
                          <p className="text-white font-bold">{dtc.code}</p>
                          <p className="text-slate-400 text-sm">{dtc.status}</p>
                        </div>
                      </div>
                      <Info className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monitores de preparación */}
          <div className="glass p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Monitores de Preparación (Readiness)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Fallas de Encendido', ready: true },
                { name: 'Sistema de Combustible', ready: true },
                { name: 'Catalizador', ready: true },
                { name: 'Sistema EVAP', ready: true },
                { name: 'Sensor O2', ready: true },
                { name: 'Calentador O2', ready: true },
                { name: 'Sistema EGR', ready: false },
                { name: 'Aire Secundario', ready: false }
              ].map((monitor, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 p-3 rounded-lg flex items-center justify-between"
                >
                  <span className="text-slate-300 text-sm">{monitor.name}</span>
                  {monitor.ready ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
