/// <reference types="vite/client" />

interface NovaAPI {
  window: {
    minimize: () => void;
    maximize: () => void;
    close: () => void;
    isMaximized: () => Promise<boolean>;
    onMaximizedChanged: (callback: (maximized: boolean) => void) => void;
  };
  platform: string;
}

declare global {
  interface Window {
    novaAPI?: NovaAPI;
  }
}

export {};
