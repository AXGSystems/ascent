'use client';

import { useStore } from '@/lib/store';
import NavIcon from './NavIcon';

export default function Header() {
  const toggleSidebar = useStore((s) => s.toggleSidebar);
  const dark = useStore((s) => s.dark);
  const toggleDark = useStore((s) => s.toggleDark);

  return (
    <header className="h-16 shrink-0 flex items-center justify-between px-4 lg:px-6 border-b border-[var(--border-color)] bg-[var(--bg-glass)] glass-blur z-20">
      {/* Left: hamburger (mobile) */}
      <button
        onClick={toggleSidebar}
        className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-[var(--border-color)] transition-colors lg:hidden"
        aria-label="Toggle sidebar"
        type="button"
      >
        <NavIcon name="menu" className="w-5 h-5 text-[var(--text-primary)]" />
      </button>

      {/* Center spacer on mobile, nothing on desktop */}
      <div className="flex-1" />

      {/* Right: actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={toggleDark}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-[var(--border-color)] transition-colors"
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          type="button"
        >
          <NavIcon
            name={dark ? 'sun' : 'moon'}
            className="w-5 h-5 text-[var(--text-secondary)]"
          />
        </button>
        <button
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-[var(--border-color)] transition-colors relative"
          aria-label="Notifications"
          type="button"
        >
          <NavIcon name="bell" className="w-5 h-5 text-[var(--text-secondary)]" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-red" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
