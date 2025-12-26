'use client'

import { Wrench, Zap } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                Diagnóstico Avanzado
              </h1>
              <p className="text-sm text-gray-400">
                Plataforma Superior de Diagnóstico Automotriz
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-green-400">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">100% Gratuito</span>
          </div>
        </div>
      </div>
    </header>
  )
}
