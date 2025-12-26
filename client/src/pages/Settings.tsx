import { useState } from 'react'
import { 
  Settings as SettingsIcon, 
  Car, 
  Bell, 
  Globe, 
  Save,
  Database,
  Wifi,
  Moon,
  Sun,
  Volume2,
  Smartphone,
  Mail
} from 'lucide-react'

export default function Settings() {
  const [darkMode, setDarkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [autoConnect, setAutoConnect] = useState(true)
  const [soundAlerts, setSoundAlerts] = useState(true)
  const [language, setLanguage] = useState('es')
  const [units, setUnits] = useState('metric')

  const [vehicleInfo, setVehicleInfo] = useState({
    make: 'BMW',
    model: 'Serie 3',
    year: '2020',
    vin: 'WBAABCD123456789X',
    engine: '2.0L Turbo I4',
    transmission: 'Automática'
  })

  const saveSettings = () => {
    alert('Configuración guardada exitosamente')
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Configuración</h1>
        <p className="text-slate-400">Personaliza tu experiencia</p>
      </div>

      {/* Información del Vehículo */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Car className="w-6 h-6 mr-2 text-blue-500" />
          Información del Vehículo
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Marca</label>
            <input
              type="text"
              value={vehicleInfo.make}
              onChange={(e) => setVehicleInfo({...vehicleInfo, make: e.target.value})}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Modelo</label>
            <input
              type="text"
              value={vehicleInfo.model}
              onChange={(e) => setVehicleInfo({...vehicleInfo, model: e.target.value})}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Año</label>
            <input
              type="text"
              value={vehicleInfo.year}
              onChange={(e) => setVehicleInfo({...vehicleInfo, year: e.target.value})}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">VIN</label>
            <input
              type="text"
              value={vehicleInfo.vin}
              onChange={(e) => setVehicleInfo({...vehicleInfo, vin: e.target.value})}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Motor</label>
            <input
              type="text"
              value={vehicleInfo.engine}
              onChange={(e) => setVehicleInfo({...vehicleInfo, engine: e.target.value})}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-2">Transmisión</label>
            <input
              type="text"
              value={vehicleInfo.transmission}
              onChange={(e) => setVehicleInfo({...vehicleInfo, transmission: e.target.value})}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Configuración de Conexión */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Wifi className="w-6 h-6 mr-2 text-green-500" />
          Conexión OBD-II
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <p className="text-white font-semibold">Conexión Automática</p>
              <p className="text-slate-400 text-sm">Conectar automáticamente al iniciar</p>
            </div>
            <button
              onClick={() => setAutoConnect(!autoConnect)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                autoConnect ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                autoConnect ? 'transform translate-x-6' : ''
              }`} />
            </button>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Tipo de Conexión</label>
            <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500">
              <option>Bluetooth</option>
              <option>WiFi</option>
              <option>USB</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Protocolo OBD</label>
            <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500">
              <option>Auto (Detectar Automáticamente)</option>
              <option>ISO 15765-4 CAN (11 bit ID, 500 kbaud)</option>
              <option>ISO 15765-4 CAN (29 bit ID, 500 kbaud)</option>
              <option>ISO 14230-4 KWP (5 baud init)</option>
              <option>ISO 9141-2</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notificaciones */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Bell className="w-6 h-6 mr-2 text-yellow-500" />
          Notificaciones
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <p className="text-white font-semibold">Notificaciones Push</p>
              <p className="text-slate-400 text-sm">Recibir alertas en tiempo real</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                notifications ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                notifications ? 'transform translate-x-6' : ''
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <p className="text-white font-semibold">Alertas de Sonido</p>
              <p className="text-slate-400 text-sm">Reproducir sonidos para alertas críticas</p>
            </div>
            <button
              onClick={() => setSoundAlerts(!soundAlerts)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                soundAlerts ? 'bg-blue-600' : 'bg-slate-600'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                soundAlerts ? 'transform translate-x-6' : ''
              }`} />
            </button>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg">
            <p className="text-white font-semibold mb-3">Tipos de Alertas</p>
            <div className="space-y-2">
              {[
                'Códigos DTC detectados',
                'Temperatura alta del motor',
                'Batería baja',
                'Mantenimiento próximo',
                'Límite de velocidad'
              ].map((alert, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-slate-300 text-sm">{alert}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preferencias */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Globe className="w-6 h-6 mr-2 text-purple-500" />
          Preferencias
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">Idioma</label>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Unidades</label>
            <select 
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="metric">Métrico (km, L, °C)</option>
              <option value="imperial">Imperial (mi, gal, °F)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Tema</label>
            <div className="flex space-x-3">
              <button
                onClick={() => setDarkMode(true)}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  darkMode
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-slate-700 bg-slate-800/50'
                }`}
              >
                <Moon className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">Oscuro</p>
              </button>
              <button
                onClick={() => setDarkMode(false)}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  !darkMode
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-slate-700 bg-slate-800/50'
                }`}
              >
                <Sun className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">Claro</p>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Frecuencia de Actualización</label>
            <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500">
              <option>Muy Alta (50ms)</option>
              <option>Alta (100ms)</option>
              <option>Media (250ms)</option>
              <option>Baja (500ms)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Datos y Privacidad */}
      <div className="glass p-6 rounded-2xl">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Database className="w-6 h-6 mr-2 text-red-500" />
          Datos y Privacidad
        </h3>
        <div className="space-y-3">
          <button className="w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-semibold transition-colors text-left">
            Exportar Datos
          </button>
          <button className="w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-semibold transition-colors text-left">
            Limpiar Caché
          </button>
          <button className="w-full p-4 bg-red-900/20 border border-red-500/30 hover:bg-red-900/30 rounded-lg text-red-400 font-semibold transition-colors text-left">
            Eliminar Todos los Datos
          </button>
        </div>
      </div>

      {/* Botón Guardar */}
      <div className="flex justify-end space-x-3">
        <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors">
          Cancelar
        </button>
        <button
          onClick={saveSettings}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center space-x-2 btn-glow"
        >
          <Save className="w-5 h-5" />
          <span>Guardar Cambios</span>
        </button>
      </div>

      {/* Información de la App */}
      <div className="glass p-6 rounded-2xl text-center">
        <h3 className="text-2xl font-bold gradient-text mb-2">CarDiag Pro Ultra</h3>
        <p className="text-slate-400 mb-4">Version 1.0.0</p>
        <p className="text-slate-500 text-sm">
          © 2024 CarDiag Pro Ultra. Todos los derechos reservados.
          <br />
          La plataforma de diagnóstico automotriz más avanzada del mundo.
        </p>
      </div>
    </div>
  )
}
