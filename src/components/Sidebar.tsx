import React from 'react';
import { useBrowserStore, SidebarPanel, Theme } from '../store/browserStore';
import {
  Bookmark,
  Clock,
  Download,
  Layers,
  Settings,
  Globe,
  Trash2,
  ExternalLink,
} from 'lucide-react';

const THEMES: { id: Theme; label: string; gradient: string }[] = [
  { id: 'dark', label: 'Oscuro', gradient: 'linear-gradient(135deg, #0a0a0f, #1a1a28)' },
  { id: 'light', label: 'Claro', gradient: 'linear-gradient(135deg, #f8f8fc, #e8e8f0)' },
  { id: 'aurora', label: 'Aurora', gradient: 'linear-gradient(135deg, #0a0f1a, #22D3EE)' },
  { id: 'sunset', label: 'Atardecer', gradient: 'linear-gradient(135deg, #1a0a0f, #F97316)' },
  { id: 'ocean', label: 'Océano', gradient: 'linear-gradient(135deg, #0a0f18, #3B82F6)' },
  { id: 'cyberpunk', label: 'Cyberpunk', gradient: 'linear-gradient(135deg, #0d0008, #FF00FF)' },
];

const sidebarItems: { panel: SidebarPanel; icon: React.ReactNode; label: string }[] = [
  { panel: 'workspaces', icon: <Layers size={18} />, label: 'Espacios' },
  { panel: 'bookmarks', icon: <Bookmark size={18} />, label: 'Marcadores' },
  { panel: 'history', icon: <Clock size={18} />, label: 'Historial' },
  { panel: 'downloads', icon: <Download size={18} />, label: 'Descargas' },
  { panel: 'settings', icon: <Settings size={18} />, label: 'Ajustes' },
];

const Sidebar: React.FC = () => {
  const {
    sidebarOpen,
    sidebarPanel,
    setSidebarPanel,
    bookmarks,
    history,
    workspaces,
    activeWorkspaceId,
    theme,
    setTheme,
    removeBookmark,
    clearHistory,
    navigateTo,
    addTab,
  } = useBrowserStore();

  const handlePanelClick = (panel: SidebarPanel) => {
    if (sidebarPanel === panel && sidebarOpen) {
      setSidebarPanel('none');
    } else {
      setSidebarPanel(panel);
    }
  };

  const handleOpenUrl = (url: string) => {
    addTab(url);
  };

  const renderPanel = () => {
    switch (sidebarPanel) {
      case 'workspaces':
        return (
          <div className="sidebar-panel animate-fade-in">
            <div className="sidebar-panel-header">
              <span>Espacios de Trabajo</span>
            </div>
            <div className="sidebar-panel-content">
              {workspaces.map((ws) => (
                <div
                  key={ws.id}
                  className={`workspace-pill ${ws.id === activeWorkspaceId ? 'active' : ''}`}
                >
                  <div className="workspace-color" style={{ background: ws.color }} />
                  <span className="workspace-name">
                    {ws.icon} {ws.name}
                  </span>
                </div>
              ))}
              <div
                className="workspace-pill"
                style={{ justifyContent: 'center', color: 'var(--text-muted)', fontSize: '13px', marginTop: '8px' }}
              >
                + Nuevo espacio
              </div>
            </div>
          </div>
        );

      case 'bookmarks':
        return (
          <div className="sidebar-panel animate-fade-in">
            <div className="sidebar-panel-header">
              <span>Marcadores</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                {bookmarks.length}
              </span>
            </div>
            <div className="sidebar-panel-content">
              {bookmarks.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                  Sin marcadores aún
                </div>
              ) : (
                bookmarks.map((bk) => (
                  <div key={bk.id} className="sidebar-item" onClick={() => handleOpenUrl(bk.url)}>
                    <div className="sidebar-item-icon">
                      <Globe size={14} />
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div className="sidebar-item-title">{bk.title}</div>
                      <div className="sidebar-item-subtitle truncate">{bk.url}</div>
                    </div>
                    <button
                      className="address-bar-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBookmark(bk.id);
                      }}
                      style={{ width: '22px', height: '22px' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="sidebar-panel animate-fade-in">
            <div className="sidebar-panel-header">
              <span>Historial</span>
              {history.length > 0 && (
                <button
                  className="address-bar-action"
                  onClick={clearHistory}
                  style={{ fontSize: '11px', width: 'auto', padding: '2px 8px' }}
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
            <div className="sidebar-panel-content">
              {history.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                  Sin historial
                </div>
              ) : (
                history.slice(0, 50).map((entry) => (
                  <div key={entry.id} className="sidebar-item" onClick={() => handleOpenUrl(entry.url)}>
                    <div className="sidebar-item-icon">
                      <Clock size={14} />
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div className="sidebar-item-title">{entry.title}</div>
                      <div className="sidebar-item-subtitle truncate">
                        {new Date(entry.visitedAt).toLocaleTimeString('es')}
                      </div>
                    </div>
                    <ExternalLink size={12} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'downloads':
        return (
          <div className="sidebar-panel animate-fade-in">
            <div className="sidebar-panel-header">
              <span>Descargas</span>
            </div>
            <div className="sidebar-panel-content">
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                Sin descargas recientes
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="sidebar-panel animate-fade-in">
            <div className="sidebar-panel-header">
              <span>Ajustes</span>
            </div>
            <div className="sidebar-panel-content">
              <div style={{ padding: '8px 4px', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                Tema
              </div>
              <div className="settings-grid">
                {THEMES.map((t) => (
                  <div
                    key={t.id}
                    className={`theme-option ${theme === t.id ? 'active' : ''}`}
                    onClick={() => setTheme(t.id)}
                  >
                    <div
                      className="theme-swatch"
                      style={{ background: t.gradient }}
                    />
                    <span className="theme-label">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-icons">
        {sidebarItems.map((item) => (
          <button
            key={item.panel}
            className={`sidebar-icon-btn ${sidebarPanel === item.panel && sidebarOpen ? 'active' : ''}`}
            onClick={() => handlePanelClick(item.panel)}
            data-tooltip={item.label}
          >
            {item.icon}
          </button>
        ))}
        <div className="sidebar-divider" />
      </div>
      {sidebarOpen && renderPanel()}
    </div>
  );
};

export default Sidebar;
