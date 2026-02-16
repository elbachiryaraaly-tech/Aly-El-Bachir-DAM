import React from 'react';

const TitleBar: React.FC = () => {
  const handleMinimize = () => window.novaAPI?.window.minimize();
  const handleMaximize = () => window.novaAPI?.window.maximize();
  const handleClose = () => window.novaAPI?.window.close();

  return (
    <div className="title-bar">
      <div className="title-bar-drag" />
      <div className="window-controls">
        <button className="window-btn" onClick={handleMinimize} title="Minimizar">
          <svg viewBox="0 0 10 1" fill="currentColor">
            <rect width="10" height="1" />
          </svg>
        </button>
        <button className="window-btn" onClick={handleMaximize} title="Maximizar">
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="0.5" y="0.5" width="9" height="9" />
          </svg>
        </button>
        <button className="window-btn close" onClick={handleClose} title="Cerrar">
          <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.2">
            <line x1="1" y1="1" x2="9" y2="9" />
            <line x1="9" y1="1" x2="1" y2="9" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
