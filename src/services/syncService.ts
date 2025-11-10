// BroadcastChannel sync service for real-time communication
const CHANNEL_NAME = 'presentation-sync';
const STORAGE_KEY = 'presentation-state';
const VERSION_KEY = 'presentation-version';

export type ComponentType = 'carrusel' | 'ruleta' | 'pomodoro' | null;

export interface PresentationState {
  activeComponent: ComponentType;
  version: number;
  timestamp: number;
}

class SyncService {
  private channel: BroadcastChannel | null = null;
  private listeners: Set<(state: PresentationState) => void> = new Set();

  constructor() {
    // Initialize BroadcastChannel if supported
    if (typeof BroadcastChannel !== 'undefined') {
      this.channel = new BroadcastChannel(CHANNEL_NAME);
      this.channel.onmessage = (event) => {
        this.notifyListeners(event.data);
      };
    }

    // Listen to storage events for cross-tab sync (fallback)
    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          const state = JSON.parse(event.newValue);
          this.notifyListeners(state);
        } catch (e) {
          console.error('Failed to parse storage state', e);
        }
      }
    });
  }

  // Get current state from localStorage
  getState(): PresentationState {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse stored state', e);
      }
    }
    return {
      activeComponent: null,
      version: Date.now(),
      timestamp: Date.now(),
    };
  }

  // Set component and broadcast to all tabs
  setComponent(component: ComponentType) {
    const state: PresentationState = {
      activeComponent: component,
      version: this.getVersion(),
      timestamp: Date.now(),
    };

    this.saveState(state);
    this.broadcast(state);
  }

  // Increment version and force reload
  incrementVersion() {
    const newVersion = Date.now();
    localStorage.setItem(VERSION_KEY, newVersion.toString());
    
    const state: PresentationState = {
      activeComponent: this.getState().activeComponent,
      version: newVersion,
      timestamp: Date.now(),
    };

    this.saveState(state);
    this.broadcast({ ...state, forceReload: true } as any);
  }

  // Get current version
  getVersion(): number {
    const stored = localStorage.getItem(VERSION_KEY);
    if (stored) {
      return parseInt(stored, 10);
    }
    const newVersion = Date.now();
    localStorage.setItem(VERSION_KEY, newVersion.toString());
    return newVersion;
  }

  // Subscribe to state changes
  subscribe(callback: (state: PresentationState) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  // Private methods
  private saveState(state: PresentationState) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  private broadcast(state: any) {
    if (this.channel) {
      this.channel.postMessage(state);
    }
  }

  private notifyListeners(state: PresentationState) {
    this.listeners.forEach(listener => listener(state));
  }

  // Cleanup
  destroy() {
    if (this.channel) {
      this.channel.close();
    }
    this.listeners.clear();
  }
}

export const syncService = new SyncService();
