'use client'

import { useState, useEffect } from 'react'
import { Clock, FileText, Download, TrendingUp } from 'lucide-react'
import axios from 'axios'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function HistoryPanel() {
  const [history, setHistory] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    setLoading(true)
    try {
      const [historyRes, statsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/history'),
        axios.get('http://localhost:5000/api/history/stats')
      ])
      setHistory(historyRes.data.data)
      setStats(statsRes.data.data)
    } catch (error) {
      console.error('Error cargando historial:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = () => {
    const report = {
      generated: new Date().toISOString(),
      stats,
      history
    }
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `diagnostico-reporte-${Date.now()}.json`
    a.click()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OK':
        return 'bg-green-600'
      case 'Warning':
        return 'bg-yellow-600'
      case 'Error':
        return 'bg-red-600'
      default:
        return 'bg-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400">Total Escaneos</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalScans}</p>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-400">Códigos DTC Encontrados</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalDTCsFound}</p>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-green-400" />
              <span className="text-gray-400">Duración Promedio</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.averageScanDuration}s</p>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <span className="text-gray-400">Vehículos Escaneados</span>
            </div>
            <p className="text-3xl font-bold text-white">{stats.vehiclesScanned}</p>
          </div>
        </div>
      )}

      {/* Botón de exportar */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Exportar Reporte</h3>
            <p className="text-gray-400">Descarga un reporte completo en formato JSON</p>
          </div>
          <button
            onClick={exportReport}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Historial */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">Historial de Diagnósticos</h3>

        {history.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No hay historial disponible</p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-gray-700 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(item.status)} text-white`}>
                        {item.status}
                      </span>
                      <span className="text-white font-semibold">{item.type}</span>
                      <span className="text-gray-400 text-sm">
                        {format(new Date(item.date), "dd MMM yyyy 'a las' HH:mm", { locale: es })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Vehículo: {item.vehicle}</span>
                      <span>Duración: {item.duration}s</span>
                      {item.dtcCount > 0 && (
                        <span className="text-yellow-400">{item.dtcCount} código(s) DTC</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
