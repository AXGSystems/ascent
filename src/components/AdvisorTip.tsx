'use client';

import { cn } from '@/lib/utils';

interface AdvisorTipProps {
  type: 'insight' | 'warning' | 'tip' | 'celebration';
  children: React.ReactNode;
}

const config = {
  insight: {
    icon: '\u{1F4A1}',
    border: 'border-brand-teal/30',
    bg: 'bg-brand-teal/5',
    text: 'text-brand-teal',
  },
  warning: {
    icon: '\u26A0\uFE0F',
    border: 'border-brand-gold/30',
    bg: 'bg-brand-gold/5',
    text: 'text-brand-gold',
  },
  tip: {
    icon: '\u{1F4B0}',
    border: 'border-brand-green/30',
    bg: 'bg-brand-green/5',
    text: 'text-brand-green',
  },
  celebration: {
    icon: '\u{1F389}',
    border: 'border-[#d4a843]/30',
    bg: 'bg-[#d4a843]/5',
    text: 'text-[#d4a843]',
  },
};

export default function AdvisorTip({ type, children }: AdvisorTipProps) {
  const c = config[type];

  return (
    <div
      className={cn(
        'flex items-start gap-2.5 px-4 py-3 rounded-xl border',
        c.border,
        c.bg,
        'animate-card-in'
      )}
    >
      <span className="text-base shrink-0 mt-0.5" aria-hidden="true">
        {c.icon}
      </span>
      <p
        className={cn(
          'text-sm leading-relaxed',
          'text-[var(--text-secondary)]',
          'italic'
        )}
      >
        {children}
      </p>
    </div>
  );
}
