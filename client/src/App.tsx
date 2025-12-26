import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Diagnostics from './pages/Diagnostics'
import Performance from './pages/Performance'
import Maintenance from './pages/Maintenance'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

function App() {
  const [isConnected, setIsConnected] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <Router>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isConnected={isConnected}
          onConnect={() => setIsConnected(!isConnected)}
        />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'} p-8`}>
          <Routes>
            <Route path="/" element={<Dashboard isConnected={isConnected} />} />
            <Route path="/diagnostics" element={<Diagnostics isConnected={isConnected} />} />
            <Route path="/performance" element={<Performance isConnected={isConnected} />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
