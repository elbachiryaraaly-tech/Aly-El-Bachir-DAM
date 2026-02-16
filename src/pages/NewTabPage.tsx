import React, { useState, useEffect } from 'react';
import { useBrowserStore, useSpeedDial } from '../store/browserStore';
import { Search } from 'lucide-react';

const NewTabPage: React.FC = () => {
  const { navigateTo, history, bookmarks } = useBrowserStore();
  const speedDial = useSpeedDial();
  const [searchValue, setSearchValue] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 6) setGreeting('Buenas noches');
    else if (hour < 12) setGreeting('Buenos días');
    else if (hour < 19) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, [currentTime]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigateTo(searchValue.trim());
    }
  };

  const handleSpeedDialClick = (url: string) => {
    navigateTo(url);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="new-tab-page">
      <div className="new-tab-bg" />
      <div className="new-tab-content">
        {/* Time Display */}
        <div style={{ textAlign: 'center', marginBottom: '-12px' }}>
          <div style={{
            fontSize: '64px',
            fontWeight: 800,
            letterSpacing: '-3px',
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.1,
          }}>
            {formatTime(currentTime)}
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--text-muted)',
            marginTop: '4px',
            textTransform: 'capitalize',
          }}>
            {formatDate(currentTime)}
          </div>
        </div>

        {/* Greeting */}
        <div style={{
          fontSize: '22px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          textAlign: 'center',
        }}>
          {greeting} ✨
        </div>

        {/* Search Bar */}
        <form className="new-tab-search" onSubmit={handleSearch}>
          <div className="new-tab-search-icon">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Buscar en la web o escribir una URL..."
            autoFocus
          />
        </form>

        {/* Speed Dial */}
        <div className="speed-dial">
          {speedDial.map((item, index) => (
            <div
              key={index}
              className="speed-dial-item"
              onClick={() => handleSpeedDialClick(item.url)}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: `fadeIn 0.4s ease-out ${index * 50}ms both`,
              }}
            >
              <div
                className="speed-dial-icon"
                style={{ background: item.color }}
              >
                {item.icon}
              </div>
              <span className="speed-dial-title">{item.title}</span>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="quick-stat">
            <span className="quick-stat-value">{bookmarks.length}</span>
            <span className="quick-stat-label">Marcadores</span>
          </div>
          <div className="quick-stat">
            <span className="quick-stat-value">{history.length}</span>
            <span className="quick-stat-label">Historial</span>
          </div>
          <div className="quick-stat">
            <span className="quick-stat-value">0</span>
            <span className="quick-stat-label">Anuncios bloqueados</span>
          </div>
        </div>

        {/* Nova Branding */}
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <div className="nova-logo">NOVA</div>
          <div className="nova-subtitle">browser</div>
        </div>
      </div>
    </div>
  );
};

export default NewTabPage;
