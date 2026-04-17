// A$cent — Zustand store

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AscentState {
  // Theme
  dark: boolean;
  toggleDark: () => void;
  setDark: (dark: boolean) => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Sheet / Drawer
  sheetOpen: boolean;
  sheetTitle: string;
  sheetContent: string | null;
  openSheet: (title: string, content: string) => void;
  closeSheet: () => void;

  // Coach messages
  coachMessages: Array<{ role: 'user' | 'assistant'; content: string }>;
  addCoachMessage: (msg: { role: 'user' | 'assistant'; content: string }) => void;
  clearCoachMessages: () => void;

  // Transaction search
  txSearch: string;
  setTxSearch: (s: string) => void;
  txFilter: string;
  setTxFilter: (f: string) => void;
}

export const useStore = create<AscentState>()(
  persist(
    (set) => ({
      // Theme
      dark: false,
      toggleDark: () => set((s) => ({ dark: !s.dark })),
      setDark: (dark) => set({ dark }),

      // Sidebar
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      // Sheet
      sheetOpen: false,
      sheetTitle: '',
      sheetContent: null,
      openSheet: (title, content) => set({ sheetOpen: true, sheetTitle: title, sheetContent: content }),
      closeSheet: () => set({ sheetOpen: false, sheetTitle: '', sheetContent: null }),

      // Coach
      coachMessages: [],
      addCoachMessage: (msg) => set((s) => ({ coachMessages: [...s.coachMessages, msg] })),
      clearCoachMessages: () => set({ coachMessages: [] }),

      // Transaction search
      txSearch: '',
      setTxSearch: (s) => set({ txSearch: s }),
      txFilter: 'All',
      setTxFilter: (f) => set({ txFilter: f }),
    }),
    {
      name: 'ascent-store',
      partialize: (state) => ({
        dark: state.dark,
      }),
    },
  ),
);
