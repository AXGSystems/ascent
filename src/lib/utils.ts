// A$cent — Utility functions

/** Format number as USD currency */
export function fmtCurrency(value: number, compact?: boolean): string {
  if (compact && Math.abs(value) >= 1000) {
    const sign = value < 0 ? '-' : '';
    const abs = Math.abs(value);
    if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
    return `${sign}$${(abs / 1000).toFixed(abs % 1000 === 0 ? 0 : 1)}k`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Format number as a percentage */
export function fmtPercent(value: number): string {
  return `${value.toFixed(0)}%`;
}

/** Clamp a value between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Join class names, filtering out falsy values */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Get initials from a who code */
export function whoLabel(who: string): string {
  switch (who) {
    case 'C': return 'Christian';
    case 'Ch': return 'Channelle';
    case 'J': return 'Joint';
    default: return who;
  }
}

/** Get badge color for who */
export function whoBadgeColor(who: string): string {
  switch (who) {
    case 'C': return 'bg-brand-teal/15 text-brand-teal';
    case 'Ch': return 'bg-brand-gold/15 text-brand-gold';
    case 'J': return 'bg-brand-navy/15 text-brand-navy dark:bg-white/10 dark:text-white';
    default: return 'bg-gray-100 text-gray-600';
  }
}

/** Get status indicator color */
export function statusColor(status: 'ok' | 'warn' | 'stale'): string {
  switch (status) {
    case 'ok': return 'bg-brand-green';
    case 'warn': return 'bg-brand-gold';
    case 'stale': return 'bg-brand-red';
  }
}

/** Calculate percentage */
export function pct(current: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((current / total) * 100);
}
