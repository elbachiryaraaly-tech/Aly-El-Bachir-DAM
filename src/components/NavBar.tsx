import React, { useState, useRef, useEffect } from 'react';
import { useBrowserStore } from '../store/browserStore';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Shield,
  Search,
  Star,
  PanelLeft,
  Download,
  MoreHorizontal,
} from 'lucide-react';

const NavBar: React.FC = () => {
  const {
    tabs,
    activeTabId,
    addressBarValue,
    setAddressBarValue,
    navigateTo,
    addTab,
    sidebarOpen,
    toggleSidebar,
    bookmarks,
    addBookmark,
    removeBookmark,
  } = useBrowserStore();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const activeTab = tabs.find((t) => t.id === activeTabId);
  const isSecure = activeTab?.url.startsWith('https://');
  const isNewTab = activeTab?.url === 'nova://newtab';

  const isBookmarked = bookmarks.some((b) => b.url === activeTab?.url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressBarValue.trim()) {
      navigateTo(addressBarValue.trim());
      inputRef.current?.blur();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleToggleBookmark = () => {
    if (!activeTab || isNewTab) return;
    if (isBookmarked) {
      const bk = bookmarks.find((b) => b.url === activeTab.url);
      if (bk) removeBookmark(bk.id);
    } else {
      addBookmark({
        title: activeTab.title,
        url: activeTab.url,
        favicon: activeTab.favicon,
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        addTab();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [addTab]);

  return (
    <div className="nav-bar">
      <button className={`nav-btn sidebar-toggle ${sidebarOpen ? 'active' : ''}`} onClick={() => toggleSidebar()} data-tooltip="Panel lateral">
        <PanelLeft size={18} />
      </button>

      <button className="nav-btn" data-tooltip="Atrás">
        <ArrowLeft size={18} />
      </button>
      <button className="nav-btn" data-tooltip="Adelante">
        <ArrowRight size={18} />
      </button>
      <button className="nav-btn" data-tooltip="Recargar">
        <RotateCw size={16} />
      </button>
      <button className="nav-btn" onClick={() => addTab()} data-tooltip="Inicio">
        <Home size={17} />
      </button>

      <form className="address-bar-container" onSubmit={handleSubmit}>
        <div className={`address-bar-icon ${isSecure && !isNewTab ? 'secure' : ''}`}>
          {isNewTab ? (
            <Search size={14} />
          ) : isSecure ? (
            <Shield size={14} />
          ) : (
            <Search size={14} />
          )}
        </div>
        <input
          ref={inputRef}
          className="address-bar"
          type="text"
          value={addressBarValue}
          onChange={(e) => setAddressBarValue(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Buscar o escribir una URL"
          spellCheck={false}
        />
        <div className="address-bar-actions">
          {!isNewTab && (
            <button
              type="button"
              className={`address-bar-action ${isBookmarked ? 'bookmarked' : ''}`}
              onClick={handleToggleBookmark}
              data-tooltip={isBookmarked ? 'Quitar marcador' : 'Agregar marcador'}
            >
              <Star size={14} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          )}
        </div>
      </form>

      <button className="nav-btn" data-tooltip="Descargas">
        <Download size={17} />
      </button>
      <button className="nav-btn" data-tooltip="Más opciones">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
};

export default NavBar;
