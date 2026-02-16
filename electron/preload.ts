import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('novaAPI', {
  window: {
    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    close: () => ipcRenderer.send('window:close'),
    isMaximized: () => ipcRenderer.invoke('window:isMaximized'),
    onMaximizedChanged: (callback: (maximized: boolean) => void) => {
      ipcRenderer.on('window:maximized-changed', (_event, maximized) => {
        callback(maximized);
      });
    },
  },
  platform: process.platform,
});
