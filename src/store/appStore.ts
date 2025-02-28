import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { App } from '../data/apps';

interface AppState {
  installedApps: string[];
  installApp: (appId: string) => void;
  uninstallApp: (appId: string) => void;
  isAppInstalled: (appId: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      installedApps: [],
      installApp: (appId: string) => {
        set((state) => ({
          installedApps: [...state.installedApps, appId]
        }));
      },
      uninstallApp: (appId: string) => {
        set((state) => ({
          installedApps: state.installedApps.filter(id => id !== appId)
        }));
      },
      isAppInstalled: (appId: string) => {
        return get().installedApps.includes(appId);
      }
    }),
    {
      name: 'app-storage',
    }
  )
);