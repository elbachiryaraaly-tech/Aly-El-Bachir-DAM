import React from 'react';
import { useBrowserStore } from '../store/browserStore';
import NewTabPage from '../pages/NewTabPage';

const WebContent: React.FC = () => {
  const { tabs, activeTabId, updateTab } = useBrowserStore();
  const activeTab = tabs.find((t) => t.id === activeTabId);

  if (!activeTab) return null;

  if (activeTab.url === 'nova://newtab') {
    return (
      <div className="web-content">
        <NewTabPage />
      </div>
    );
  }

  return (
    <div className="web-content">
      <div className="webview-container">
        {/* In Electron, this would be a <webview> tag. For the web preview, show an iframe or placeholder */}
        <iframe
          src={activeTab.url}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: 0,
            background: '#fff',
          }}
          title={activeTab.title}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          onLoad={() => {
            updateTab(activeTab.id, { isLoading: false });
          }}
        />
      </div>
    </div>
  );
};

export default WebContent;
