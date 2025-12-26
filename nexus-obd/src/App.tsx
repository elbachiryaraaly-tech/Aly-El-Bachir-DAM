import { useOBDData } from './hooks/useOBDData';
import { Gauge } from './components/Gauge';
import { AIDiagnostics } from './components/AIDiagnostics';
import { LiveChart } from './components/LiveChart';
import { Car, Settings, Activity, Power } from 'lucide-react';

function App() {
  const { data, toggleConnection, simulationActive } = useOBDData();

  return (
    <div className="min-h-screen bg-dark-bg text-white p-6 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-neon-blue/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-neon-red/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto h-[90vh] flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 glass-panel p-4">
          <div className="flex items-center gap-3">
            <div className="bg-neon-blue/20 p-2 rounded-lg border border-neon-blue/30">
              <Car className="text-neon-blue w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tighter">NEXUS <span className="text-neon-blue">OBD</span></h1>
              <span className="text-xs text-gray-400 tracking-[0.2em] uppercase">Plataforma de Diagnóstico Avanzado</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/5">
              <div className={`w-2 h-2 rounded-full ${simulationActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-xs font-mono">{simulationActive ? 'CONECTADO - ECU' : 'DESCONECTADO'}</span>
            </div>
            <button 
              onClick={toggleConnection}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-all ${
                simulationActive 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' 
                  : 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50 hover:bg-neon-blue/30'
              }`}
            >
              <Power className="w-4 h-4" />
              {simulationActive ? 'DETENER SIMULACIÓN' : 'INICIAR SISTEMA'}
            </button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Settings className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="grid grid-cols-12 gap-6 flex-1 min-h-0">
          
          {/* Left Column: Gauges & Real-time Data */}
          <div className="col-span-8 flex flex-col gap-6">
            
            {/* Top Row Gauges */}
            <div className="grid grid-cols-3 gap-6">
              <Gauge value={data.rpm} max={8000} label="Revoluciones" unit="RPM" color="#00f3ff" />
              <Gauge value={data.speed} max={240} label="Velocidad" unit="KM/H" color="#00ff9d" />
              <Gauge value={data.coolantTemp} max={130} label="Temperatura" unit="°C" color="#ff0055" />
            </div>

            {/* Middle Row: More Data & Chart */}
            <div className="grid grid-cols-2 gap-6 flex-1">
              <div className="space-y-6">
                <div className="glass-panel p-4 flex justify-between items-center">
                  <div>
                    <span className="text-gray-400 text-xs block uppercase">Carga Motor</span>
                    <span className="text-2xl font-mono font-bold">{Math.round(data.engineLoad)}%</span>
                  </div>
                  <Activity className="text-neon-blue w-6 h-6" />
                </div>
                <div className="glass-panel p-4 flex justify-between items-center">
                  <div>
                    <span className="text-gray-400 text-xs block uppercase">Voltaje</span>
                    <span className="text-2xl font-mono font-bold">{data.voltage.toFixed(1)}V</span>
                  </div>
                  <Activity className="text-neon-green w-6 h-6" />
                </div>
                <div className="glass-panel p-4 flex justify-between items-center">
                  <div>
                    <span className="text-gray-400 text-xs block uppercase">Intake Temp</span>
                    <span className="text-2xl font-mono font-bold">{Math.round(data.intakeTemp)}°C</span>
                  </div>
                  <Activity className="text-purple-500 w-6 h-6" />
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                 <LiveChart dataPoint={data.rpm} />
                 <div className="glass-panel flex-1 p-4 flex items-center justify-center border-dashed border-2 border-white/5">
                    <span className="text-gray-500 text-sm">Espacio para expansión de módulos</span>
                 </div>
              </div>
            </div>

          </div>

          {/* Right Column: AI Diagnostics */}
          <div className="col-span-4 h-full">
            <AIDiagnostics dtcCodes={data.dtcCodes} data={data} />
          </div>

        </main>
      </div>
    </div>
  );
}

export default App;
