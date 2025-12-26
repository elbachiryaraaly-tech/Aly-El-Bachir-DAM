'use client'

import { useState, useEffect } from 'react'
import { Search, X, AlertCircle, Info, Trash2, CheckCircle } from 'lucide-react'
import axios from 'axios'

export default function DTCPanel() {
  const [dtcCodes, setDtcCodes] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCode, setSelectedCode] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadDTCs()
  }, [])

  const loadDTCs = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:5000/api/dtc/read')
      setDtcCodes(response.data.data || [])
    } catch (error) {
      console.error('Error cargando DTCs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      loadDTCs()
      return
    }

    setLoading(true)
    try {
      const response = await axios.get(
        `http://localhost:5000/api/dtc/search?query=${encodeURIComponent(searchQuery)}`
      )
      setDtcCodes(response.data.data || [])
    } catch (error) {
      console.error('Error en búsqueda:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCodeClick = async (code: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/dtc/info/${code}`)
      setSelectedCode(response.data.data)
    } catch (error) {
      console.error('Error obteniendo información:', error)
    }
  }

  const handleClearDTCs = async () => {
    if (!confirm('¿Estás seguro de que deseas limpiar todos los códigos DTC?')) {
      return
    }

    try {
      await axios.post('http://localhost:5000/api/dtc/clear')
      alert('Códigos DTC limpiados exitosamente')
      loadDTCs()
    } catch (error) {
      console.error('Error limpiando DTCs:', error)
      alert('Error al limpiar códigos DTC')
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'text-red-400 bg-red-900/20 border-red-700'
      case 'medium':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-700'
      case 'low':
        return 'text-blue-400 bg-blue-900/20 border-blue-700'
      default:
        return 'text-gray-400 bg-gray-700 border-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Barra de búsqueda y acciones */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex space-x-2">
            <input
              type="text"
              placeholder="Buscar código DTC (ej: P0420) o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Search className="w-5 h-5" />
              <span>Buscar</span>
            </button>
          </div>
          <button
            onClick={handleClearDTCs}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Trash2 className="w-5 h-5" />
            <span>Limpiar DTCs</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lista de códigos DTC */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">
            Códigos DTC Detectados ({dtcCodes.length})
          </h3>

          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : dtcCodes.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No se encontraron códigos DTC</p>
              <p className="text-gray-500 text-sm mt-2">El vehículo está funcionando correctamente</p>
            </div>
          ) : (
            <div className="space-y-3">
              {dtcCodes.map((dtc, index) => (
                <div
                  key={index}
                  onClick={() => handleCodeClick(dtc.code)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-105 ${
                    selectedCode?.code === dtc.code
                      ? 'bg-blue-900/20 border-blue-500'
                      : 'bg-gray-700 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-yellow-400" />
                        <span className="text-xl font-bold text-white">{dtc.code}</span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            dtc.status === 'Active'
                              ? 'bg-red-600 text-white'
                              : 'bg-yellow-600 text-white'
                          }`}
                        >
                          {dtc.status}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{dtc.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detalles del código seleccionado */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Información Detallada</h3>

          {selectedCode ? (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border ${getSeverityColor(selectedCode.severity)}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="w-5 h-5" />
                  <span className="font-semibold">Severidad: {selectedCode.severity}</span>
                </div>
                <p className="text-sm opacity-90">{selectedCode.description}</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Causas Posibles:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedCode.causes?.map((cause: string, idx: number) => (
                    <li key={idx} className="text-gray-300 text-sm">{cause}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Soluciones Recomendadas:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedCode.solutions?.map((solution: string, idx: number) => (
                    <li key={idx} className="text-gray-300 text-sm">{solution}</li>
                  ))}
                </ul>
              </div>

              {selectedCode.freezeFrame && (
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Freeze Frame:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">RPM:</span>
                      <span className="text-white ml-2">{selectedCode.freezeFrame.rpm}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Velocidad:</span>
                      <span className="text-white ml-2">{selectedCode.freezeFrame.speed} km/h</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Carga:</span>
                      <span className="text-white ml-2">{selectedCode.freezeFrame.load}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Temp:</span>
                      <span className="text-white ml-2">{selectedCode.freezeFrame.temp}°C</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <Info className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Selecciona un código DTC para ver información detallada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
