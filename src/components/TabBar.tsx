import React from 'react';
import { useBrowserStore } from '../store/browserStore';

const TabBar: React.FC = () => {
  const { tabs, activeTabId, addTab, closeTab, setActiveTab } = useBrowserStore();

  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${tab.isActive ? 'active' : ''} ${tab.isPinned ? 'pinned' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          onMouseDown={(e) => {
            if (e.button === 1) {
              e.preventDefault();
              closeTab(tab.id);
            }
          }}
        >
          {tab.isLoading ? (
            <div className="tab-loading" />
          ) : (
            <div className="tab-favicon">
              {tab.url === 'nova://newtab' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              ) : (
                <img
                  src={`https://www.google.com/s2/favicons?domain=${new URL(tab.url.startsWith('http') ? tab.url : 'https://example.com').hostname}&sz=32`}
                  width="14"
                  height="14"
                  alt=""
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              )}
            </div>
          )}
          {!tab.isPinned && <span className="tab-title">{tab.title}</span>}
          {!tab.isPinned && (
            <button
              className="tab-close"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              ×
            </button>
          )}
        </div>
      ))}
      <button className="tab-add" onClick={() => addTab()} title="Nueva pestaña">
        +
      </button>
    </div>
  );
};

export default TabBar;
