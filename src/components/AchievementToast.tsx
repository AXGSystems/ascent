'use client';

import { useState, useEffect } from 'react';

interface AchievementToastProps {
  message: string;
  delay?: number;
  duration?: number;
}

export default function AchievementToast({
  message,
  delay = 2000,
  duration = 5000,
}: AchievementToastProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), delay);
    const hideTimer = setTimeout(() => setVisible(false), delay + duration);
    const removeTimer = setTimeout(() => setDismissed(true), delay + duration + 500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [delay, duration]);

  if (dismissed) return null;

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-sm transition-all duration-500 ease-out ${
        visible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 -translate-y-4 scale-95'
      }`}
    >
      <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[var(--bg-card)] border border-brand-gold/30 shadow-lg shadow-brand-gold/10 glass-blur achievement-toast-glow">
        <span className="text-2xl shrink-0 achievement-bounce-icon">&#x1F525;</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[var(--text-primary)]">{message}</p>
        </div>
        <button
          type="button"
          onClick={() => { setVisible(false); setTimeout(() => setDismissed(true), 500); }}
          className="shrink-0 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          aria-label="Dismiss"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
