'use client'

import { useState, useEffect } from 'react'
import { Activity, AlertTriangle, CheckCircle, Clock, Car } from 'lucide-react'
import axios from 'axios'

export default function Dashboard() {
  const [vehicleInfo, setVehicleInfo] = useState<any>(null)
  const [scanResults, setScanResults] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [vehicleRes, scanRes] = await Promise.all([
        axios.get('http://localhost:5000/api/diagnostic/vehicle-info'),
        axios.post('http://localhost:5000/api/diagnostic/full-scan')
      ])

      setVehicleInfo(vehicleRes.data.data)
      setScanResults(scanRes.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error cargando dashboard:', error)
      setLoading(false)
    }
  }

  const handleFullScan = async () => {
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/diagnostic/full-scan')
      setScanResults(response.data.data)
    } catch (error) {
      console.error('Error en escaneo:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading && !vehicleInfo) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Información del vehículo */}
      {vehicleInfo && (
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <Car className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Información del Vehículo</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Marca/Modelo</p>
              <p className="text-white font-semibold">{vehicleInfo.make} {vehicleInfo.model}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Año</p>
              <p className="text-white font-semibold">{vehicleInfo.year}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Motor</p>
              <p className="text-white font-semibold">{vehicleInfo.engine}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Kilometraje</p>
              <p className="text-white font-semibold">{vehicleInfo.mileage.toLocaleString()} km</p>
            </div>
          </div>
        </div>
      )}

      {/* Botón de escaneo completo */}
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Escaneo Completo del Sistema</h3>
            <p className="text-gray-400">Escanea todos los módulos del vehículo</p>
          </div>
          <button
            onClick={handleFullScan}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
          >
            <Activity className="w-5 h-5" />
            <span>{loading ? 'Escaneando...' : 'Iniciar Escaneo'}</span>
          </button>
        </div>
      </div>

      {/* Resultados del escaneo */}
      {scanResults && (
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Resultados del Escaneo</h3>
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Duración: {scanResults.duration}s</span>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-gray-400">Módulos OK</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {scanResults.modules.filter((m: any) => m.status === 'OK').length}
              </p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <span className="text-gray-400">Advertencias</span>
              </div>
              <p className="text-2xl font-bold text-white">{scanResults.warnings}</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-red-400" />
                <span className="text-gray-400">Códigos DTC</span>
              </div>
              <p className="text-2xl font-bold text-white">{scanResults.totalDTCs}</p>
            </div>
          </div>

          {/* Lista de módulos */}
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-white mb-3">Módulos Escaneados</h4>
            {scanResults.modules.map((module: any, index: number) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  module.status === 'OK'
                    ? 'bg-green-900/20 border-green-700'
                    : 'bg-yellow-900/20 border-yellow-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {module.status === 'OK' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    )}
                    <span className="text-white font-semibold">{module.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-400 text-sm">
                      {module.dtcCount} código(s) DTC
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        module.status === 'OK'
                          ? 'bg-green-600 text-white'
                          : 'bg-yellow-600 text-white'
                      }`}
                    >
                      {module.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
