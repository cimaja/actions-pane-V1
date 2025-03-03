import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserSettingsState {
  isPremiumUser: boolean;
  setIsPremiumUser: (isPremium: boolean) => void;
}

// Clear existing storage to ensure we start fresh
try {
  localStorage.clear();
} catch (e) {
  console.error('Failed to clear localStorage:', e);
}

// Create a simple store without persistence to fix the issue
export const useUserSettingsStore = create<UserSettingsState>()((set) => ({
  isPremiumUser: false, // Default to false (OFF)
  setIsPremiumUser: (isPremium: boolean) => {
    console.log('Setting premium user to:', isPremium);
    set({ isPremiumUser: isPremium });
  },
}));
