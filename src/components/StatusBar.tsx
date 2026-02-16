import React from 'react';
import { useBrowserStore } from '../store/browserStore';
import { Shield } from 'lucide-react';

const StatusBar: React.FC = () => {
  const { tabs, activeTabId } = useBrowserStore();
  const activeTab = tabs.find((t) => t.id === activeTabId);

  const isSecure = activeTab?.url.startsWith('https://');
  const isNewTab = activeTab?.url === 'nova://newtab';

  return (
    <div className="status-bar">
      <div className="status-indicator" />
      <span>
        {isNewTab
          ? 'NovaBrowser - Listo'
          : activeTab?.isLoading
          ? `Cargando ${activeTab?.url}...`
          : activeTab?.url}
      </span>
      <div className="status-bar-right">
        {isSecure && !isNewTab && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10B981' }}>
            <Shield size={10} />
            Seguro
          </span>
        )}
        <span>NovaBrowser v1.0</span>
      </div>
    </div>
  );
};

export default StatusBar;
