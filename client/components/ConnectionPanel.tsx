'use client'

import { useState } from 'react'
import { Plug, Wifi, Bluetooth, CheckCircle } from 'lucide-react'
import axios from 'axios'

interface ConnectionPanelProps {
  onConnect: () => void
}

export default function ConnectionPanel({ onConnect }: ConnectionPanelProps) {
  const [connecting, setConnecting] = useState(false)
  const [protocol, setProtocol] = useState('auto')

  const handleConnect = async () => {
    setConnecting(true)
    try {
      const response = await axios.post('http://localhost:5000/api/diagnostic/connect', {
        protocol
      })
      
      if (response.data.success) {
        setTimeout(() => {
          setConnecting(false)
          onConnect()
        }, 1500)
      }
    } catch (error) {
      console.error('Error de conexión:', error)
      setConnecting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full mb-4">
            <Plug className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Conectar al Vehículo
          </h2>
          <p className="text-gray-400">
            Selecciona el método de conexión OBD-II
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
            <Bluetooth className="w-6 h-6 text-blue-400" />
            <div className="flex-1">
              <h3 className="text-white font-semibold">Bluetooth OBD-II</h3>
              <p className="text-sm text-gray-400">Conexión inalámbrica</p>
            </div>
            <input
              type="radio"
              name="connection"
              value="bluetooth"
              checked={protocol === 'bluetooth'}
              onChange={() => setProtocol('bluetooth')}
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
            <Wifi className="w-6 h-6 text-green-400" />
            <div className="flex-1">
              <h3 className="text-white font-semibold">WiFi OBD-II</h3>
              <p className="text-sm text-gray-400">Conexión por red WiFi</p>
            </div>
            <input
              type="radio"
              name="connection"
              value="wifi"
              checked={protocol === 'wifi'}
              onChange={() => setProtocol('wifi')}
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
            <Plug className="w-6 h-6 text-purple-400" />
            <div className="flex-1">
              <h3 className="text-white font-semibold">USB/Cable</h3>
              <p className="text-sm text-gray-400">Conexión por cable</p>
            </div>
            <input
              type="radio"
              name="connection"
              value="usb"
              checked={protocol === 'usb'}
              onChange={() => setProtocol('usb')}
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
            <CheckCircle className="w-6 h-6 text-yellow-400" />
            <div className="flex-1">
              <h3 className="text-white font-semibold">Detección Automática</h3>
              <p className="text-sm text-gray-400">Detecta automáticamente el protocolo</p>
            </div>
            <input
              type="radio"
              name="connection"
              value="auto"
              checked={protocol === 'auto'}
              onChange={() => setProtocol('auto')}
              className="w-5 h-5"
            />
          </div>
        </div>

        <button
          onClick={handleConnect}
          disabled={connecting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {connecting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Conectando...</span>
            </>
          ) : (
            <>
              <Plug className="w-5 h-5" />
              <span>Conectar</span>
            </>
          )}
        </button>

        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
          <p className="text-sm text-blue-300">
            <strong>Nota:</strong> Esta plataforma funciona con adaptadores OBD-II estándar.
            Asegúrate de que tu adaptador esté conectado y emparejado antes de continuar.
          </p>
        </div>
      </div>
    </div>
  )
}
