import React, { useEffect } from 'react';
import { useBrowserStore } from './store/browserStore';
import TitleBar from './components/TitleBar';
import TabBar from './components/TabBar';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import WebContent from './components/WebContent';
import StatusBar from './components/StatusBar';

const App: React.FC = () => {
  const theme = useBrowserStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="nova-browser" data-theme={theme}>
      <TitleBar />
      <TabBar />
      <NavBar />
      <div className="main-content">
        <Sidebar />
        <WebContent />
      </div>
      <StatusBar />
    </div>
  );
};

export default App;
