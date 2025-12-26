'use client'

import { useState, useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import ConnectionPanel from '@/components/ConnectionPanel'
import DTCPanel from '@/components/DTCPanel'
import SensorMonitor from '@/components/SensorMonitor'
import HistoryPanel from '@/components/HistoryPanel'
import Header from '@/components/Header'

export default function Home() {
  const [connected, setConnected] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {!connected ? (
          <ConnectionPanel onConnect={() => setConnected(true)} />
        ) : (
          <div className="space-y-6">
            {/* Tabs de navegación */}
            <div className="flex space-x-2 border-b border-gray-700">
              {[
                { id: 'dashboard', label: 'Dashboard' },
                { id: 'dtc', label: 'Códigos DTC' },
                { id: 'sensors', label: 'Sensores' },
                { id: 'history', label: 'Historial' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-400'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Contenido de las tabs */}
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'dtc' && <DTCPanel />}
            {activeTab === 'sensors' && <SensorMonitor />}
            {activeTab === 'history' && <HistoryPanel />}
          </div>
        )}
      </div>
    </main>
  )
}
