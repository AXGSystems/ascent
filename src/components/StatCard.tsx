'use client';

import Card from './Card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: 'up' | 'down' | 'flat';
  trendLabel?: string;
  accent?: string;
  onClick?: () => void;
}

export default function StatCard({ label, value, sub, trend, trendLabel, accent, onClick }: StatCardProps) {
  return (
    <Card onClick={onClick} className="min-h-[100px]">
      <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
        {label}
      </p>
      <p
        className={cn(
          'text-2xl font-bold tabular-nums tracking-tight',
          accent || 'text-[var(--text-primary)]'
        )}
      >
        {value}
      </p>
      {(sub || trendLabel) && (
        <p className="mt-1 text-sm text-[var(--text-secondary)] flex items-center gap-1">
          {trend && (
            <span
              className={cn(
                'inline-block text-xs font-semibold',
                trend === 'up' && 'text-brand-green',
                trend === 'down' && 'text-brand-red',
                trend === 'flat' && 'text-[var(--text-muted)]'
              )}
            >
              {trend === 'up' ? '\u25B2' : trend === 'down' ? '\u25BC' : '\u2014'}
            </span>
          )}
          {trendLabel && <span>{trendLabel}</span>}
          {sub && !trendLabel && <span>{sub}</span>}
        </p>
      )}
    </Card>
  );
}
