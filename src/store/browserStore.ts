import { create } from 'zustand';

export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon: string;
  isLoading: boolean;
  isActive: boolean;
  isPinned: boolean;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon: string;
  folder?: string;
  createdAt: number;
}

export interface HistoryEntry {
  id: string;
  title: string;
  url: string;
  favicon: string;
  visitedAt: number;
}

export interface Workspace {
  id: string;
  name: string;
  color: string;
  icon: string;
  tabIds: string[];
}

export type SidebarPanel = 'none' | 'bookmarks' | 'history' | 'downloads' | 'workspaces' | 'settings';
export type Theme = 'dark' | 'light' | 'aurora' | 'sunset' | 'ocean' | 'cyberpunk';

interface BrowserState {
  tabs: Tab[];
  activeTabId: string | null;
  sidebarPanel: SidebarPanel;
  sidebarOpen: boolean;
  theme: Theme;
  bookmarks: Bookmark[];
  history: HistoryEntry[];
  workspaces: Workspace[];
  activeWorkspaceId: string;
  isAddressBarFocused: boolean;
  addressBarValue: string;

  // Tab actions
  addTab: (url?: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<Tab>) => void;
  pinTab: (id: string) => void;
  reorderTabs: (fromIndex: number, toIndex: number) => void;

  // Sidebar actions
  toggleSidebar: (panel?: SidebarPanel) => void;
  setSidebarPanel: (panel: SidebarPanel) => void;

  // Theme
  setTheme: (theme: Theme) => void;

  // Bookmarks
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (id: string) => void;

  // History
  addHistoryEntry: (entry: Omit<HistoryEntry, 'id' | 'visitedAt'>) => void;
  clearHistory: () => void;

  // Address bar
  setAddressBarFocused: (focused: boolean) => void;
  setAddressBarValue: (value: string) => void;

  // Navigation
  navigateTo: (url: string) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

const DEFAULT_SPEED_DIAL = [
  { title: 'YouTube', url: 'https://youtube.com', icon: '▶', color: '#FF0000' },
  { title: 'GitHub', url: 'https://github.com', icon: '⬡', color: '#8B5CF6' },
  { title: 'Twitter/X', url: 'https://x.com', icon: '𝕏', color: '#1DA1F2' },
  { title: 'Reddit', url: 'https://reddit.com', icon: '◉', color: '#FF4500' },
  { title: 'Gmail', url: 'https://mail.google.com', icon: '✉', color: '#EA4335' },
  { title: 'Netflix', url: 'https://netflix.com', icon: 'N', color: '#E50914' },
  { title: 'Spotify', url: 'https://open.spotify.com', icon: '♫', color: '#1DB954' },
  { title: 'Amazon', url: 'https://amazon.com', icon: 'a', color: '#FF9900' },
];

export const useSpeedDial = () => DEFAULT_SPEED_DIAL;

export const useBrowserStore = create<BrowserState>((set, get) => ({
  tabs: [
    {
      id: 'initial-tab',
      title: 'Nueva Pestaña',
      url: 'nova://newtab',
      favicon: '',
      isLoading: false,
      isActive: true,
      isPinned: false,
    },
  ],
  activeTabId: 'initial-tab',
  sidebarPanel: 'none',
  sidebarOpen: false,
  theme: 'dark',
  bookmarks: [
    { id: 'bk1', title: 'YouTube', url: 'https://youtube.com', favicon: '', createdAt: Date.now() },
    { id: 'bk2', title: 'GitHub', url: 'https://github.com', favicon: '', createdAt: Date.now() },
  ],
  history: [],
  workspaces: [
    { id: 'ws-personal', name: 'Personal', color: '#8B5CF6', icon: '🏠', tabIds: [] },
    { id: 'ws-work', name: 'Trabajo', color: '#3B82F6', icon: '💼', tabIds: [] },
    { id: 'ws-entertainment', name: 'Entretenimiento', color: '#EC4899', icon: '🎮', tabIds: [] },
  ],
  activeWorkspaceId: 'ws-personal',
  isAddressBarFocused: false,
  addressBarValue: '',

  addTab: (url = 'nova://newtab') => {
    const id = generateId();
    const newTab: Tab = {
      id,
      title: url === 'nova://newtab' ? 'Nueva Pestaña' : url,
      url,
      favicon: '',
      isLoading: url !== 'nova://newtab',
      isActive: true,
      isPinned: false,
    };
    set((state) => ({
      tabs: [
        ...state.tabs.map((t) => ({ ...t, isActive: false })),
        newTab,
      ],
      activeTabId: id,
      addressBarValue: url === 'nova://newtab' ? '' : url,
    }));
  },

  closeTab: (id) => {
    const state = get();
    if (state.tabs.length <= 1) {
      set({
        tabs: [{
          id: generateId(),
          title: 'Nueva Pestaña',
          url: 'nova://newtab',
          favicon: '',
          isLoading: false,
          isActive: true,
          isPinned: false,
        }],
      });
      return;
    }
    const tabIndex = state.tabs.findIndex((t) => t.id === id);
    const newTabs = state.tabs.filter((t) => t.id !== id);
    if (state.activeTabId === id) {
      const newActiveIndex = Math.min(tabIndex, newTabs.length - 1);
      newTabs[newActiveIndex].isActive = true;
      set({
        tabs: newTabs,
        activeTabId: newTabs[newActiveIndex].id,
        addressBarValue: newTabs[newActiveIndex].url === 'nova://newtab' ? '' : newTabs[newActiveIndex].url,
      });
    } else {
      set({ tabs: newTabs });
    }
  },

  setActiveTab: (id) => {
    set((state) => {
      const tab = state.tabs.find((t) => t.id === id);
      return {
        tabs: state.tabs.map((t) => ({ ...t, isActive: t.id === id })),
        activeTabId: id,
        addressBarValue: tab?.url === 'nova://newtab' ? '' : (tab?.url || ''),
      };
    });
  },

  updateTab: (id, updates) => {
    set((state) => ({
      tabs: state.tabs.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      ),
    }));
  },

  pinTab: (id) => {
    set((state) => ({
      tabs: state.tabs.map((t) =>
        t.id === id ? { ...t, isPinned: !t.isPinned } : t
      ),
    }));
  },

  reorderTabs: (fromIndex, toIndex) => {
    set((state) => {
      const newTabs = [...state.tabs];
      const [moved] = newTabs.splice(fromIndex, 1);
      newTabs.splice(toIndex, 0, moved);
      return { tabs: newTabs };
    });
  },

  toggleSidebar: (panel) => {
    set((state) => {
      if (panel && panel !== state.sidebarPanel) {
        return { sidebarOpen: true, sidebarPanel: panel };
      }
      return { sidebarOpen: !state.sidebarOpen };
    });
  },

  setSidebarPanel: (panel) => {
    set({ sidebarPanel: panel, sidebarOpen: panel !== 'none' });
  },

  setTheme: (theme) => set({ theme }),

  addBookmark: (bookmark) => {
    set((state) => ({
      bookmarks: [
        ...state.bookmarks,
        { ...bookmark, id: generateId(), createdAt: Date.now() },
      ],
    }));
  },

  removeBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== id),
    }));
  },

  addHistoryEntry: (entry) => {
    set((state) => ({
      history: [
        { ...entry, id: generateId(), visitedAt: Date.now() },
        ...state.history,
      ].slice(0, 1000),
    }));
  },

  clearHistory: () => set({ history: [] }),

  setAddressBarFocused: (focused) => set({ isAddressBarFocused: focused }),
  setAddressBarValue: (value) => set({ addressBarValue: value }),

  navigateTo: (url) => {
    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('nova://')) {
      if (url.includes('.') && !url.includes(' ')) {
        finalUrl = 'https://' + url;
      } else {
        finalUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
      }
    }
    const state = get();
    if (state.activeTabId) {
      set((s) => ({
        tabs: s.tabs.map((t) =>
          t.id === s.activeTabId
            ? { ...t, url: finalUrl, isLoading: true, title: finalUrl }
            : t
        ),
        addressBarValue: finalUrl,
      }));
      get().addHistoryEntry({ title: finalUrl, url: finalUrl, favicon: '' });
    }
  },
}));
