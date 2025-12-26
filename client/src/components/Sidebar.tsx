import { Link, useLocation } from 'react-router-dom'
import { 
  Gauge, 
  AlertTriangle, 
  Zap, 
  Wrench, 
  BarChart3, 
  Settings,
  Menu,
  Wifi,
  WifiOff,
  Car
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  isConnected: boolean
  onConnect: () => void
}

export default function Sidebar({ isOpen, onToggle, isConnected, onConnect }: SidebarProps) {
  const location = useLocation()

  const menuItems = [
    { path: '/', icon: Gauge, label: 'Dashboard' },
    { path: '/diagnostics', icon: AlertTriangle, label: 'Diagnósticos' },
    { path: '/performance', icon: Zap, label: 'Rendimiento' },
    { path: '/maintenance', icon: Wrench, label: 'Mantenimiento' },
    { path: '/analytics', icon: BarChart3, label: 'Análisis' },
    { path: '/settings', icon: Settings, label: 'Configuración' }
  ]

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-slate-900/95 backdrop-blur-md border-r border-slate-700/50 transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-20'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl font-bold gradient-text">CarDiag Pro Ultra</h1>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      {/* Connection Status */}
      <div className="p-4 border-b border-slate-700/50">
        <button
          onClick={onConnect}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all ${
            isConnected 
              ? 'bg-green-600 hover:bg-green-700 pulse-glow' 
              : 'bg-slate-800 hover:bg-slate-700'
          }`}
        >
          {isConnected ? (
            <>
              <Wifi className="w-5 h-5" />
              {isOpen && <span className="font-semibold">Conectado</span>}
            </>
          ) : (
            <>
              <WifiOff className="w-5 h-5" />
              {isOpen && <span className="font-semibold">Conectar OBD</span>}
            </>
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4 p-4 glass rounded-lg">
          <p className="text-xs text-slate-400 text-center">
            © 2024 CarDiag Pro Ultra
            <br />
            Version 1.0.0
          </p>
        </div>
      )}
    </aside>
  )
}
