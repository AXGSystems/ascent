'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { SmartAlert } from '@/lib/alerts-engine';
import { getTopAlerts } from '@/lib/alerts-engine';

const typeStyles: Record<SmartAlert['type'], string> = {
  urgent: 'border-brand-red/30 bg-brand-red/5',
  warning: 'border-brand-gold/30 bg-brand-gold/5',
  opportunity: 'border-brand-teal/30 bg-brand-teal/5',
  milestone: 'border-brand-green/30 bg-brand-green/5',
  learning: 'border-brand-navy/30 bg-brand-navy/5 dark:border-white/10 dark:bg-white/5',
};

const typeAccent: Record<SmartAlert['type'], string> = {
  urgent: 'text-brand-red',
  warning: 'text-brand-gold',
  opportunity: 'text-brand-teal',
  milestone: 'text-brand-green',
  learning: 'text-brand-navy dark:text-white/80',
};

export default function SmartAlertBanner({ count = 3 }: { count?: number }) {
  const alerts = getTopAlerts(count);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = alerts.filter((a) => !dismissed.has(a.id));
  if (visible.length === 0) return null;

  return (
    <section className="space-y-2" aria-label="Smart alerts">
      {visible.map((alert, idx) => (
        <div
          key={alert.id}
          className={cn(
            'relative rounded-xl border p-3 animate-fade-in transition-all',
            typeStyles[alert.type]
          )}
          style={{ animationDelay: `${idx * 80}ms` }}
        >
          <div className="flex items-start gap-2.5">
            <span className="text-base shrink-0 mt-0.5" aria-hidden="true">
              {alert.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className={cn('text-xs font-semibold', typeAccent[alert.type])}>
                {alert.title}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                {alert.message}
              </p>
              {alert.action && (
                <Link
                  href={alert.action.href}
                  className="inline-block mt-1.5 text-xs font-medium text-brand-teal hover:underline action-link"
                >
                  {alert.action.label} &rarr;
                </Link>
              )}
            </div>
            {alert.dismissable && (
              <button
                type="button"
                aria-label={`Dismiss ${alert.title}`}
                onClick={() => setDismissed((prev) => new Set(prev).add(alert.id))}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-sm leading-none p-1 min-w-[28px] min-h-[28px] flex items-center justify-center"
              >
                &times;
              </button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

// Compact inline alert for use within pages
export function InlineAlert({ alert }: { alert: SmartAlert }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div className={cn('rounded-xl border p-3 animate-fade-in', typeStyles[alert.type])}>
      <div className="flex items-start gap-2">
        <span className="text-sm shrink-0" aria-hidden="true">{alert.icon}</span>
        <div className="flex-1">
          <p className={cn('text-xs font-semibold', typeAccent[alert.type])}>
            {alert.title}
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{alert.message}</p>
          {alert.action && (
            <Link href={alert.action.href} className="text-xs font-medium text-brand-teal hover:underline mt-1 inline-block">
              {alert.action.label} &rarr;
            </Link>
          )}
        </div>
        {alert.dismissable && (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setHidden(true)}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-sm p-1"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
}
