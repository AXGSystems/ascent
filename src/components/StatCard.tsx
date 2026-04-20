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
  tooltip?: string;
  href?: string;
}

export default function StatCard({ label, value, sub, trend, trendLabel, accent, onClick, tooltip, href }: StatCardProps) {
  return (
    <Card onClick={onClick} className="group min-h-[100px] hover:bg-gradient-to-br hover:from-[var(--bg-card-hover)] hover:to-[var(--bg-card)]">
      <p
        className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1 transition-colors group-hover:text-[var(--text-secondary)]"
        title={tooltip}
      >
        {label}
        {tooltip && (
          <span className="ml-1 inline-block opacity-40 text-[10px]" aria-hidden="true">
            ?
          </span>
        )}
      </p>
      <p
        className={cn(
          'text-2xl font-bold tabular-nums tracking-tight transition-transform duration-200',
          accent || 'text-[var(--text-primary)]'
        )}
      >
        {value}
      </p>
      {(sub || trendLabel) && (
        <p className="mt-1 text-sm text-[var(--text-secondary)] flex items-center gap-1 transition-colors group-hover:text-[var(--text-primary)]">
          {trend && (
            <span
              className={cn(
                'inline-block text-xs font-semibold',
                trend === 'up' && 'text-brand-green trend-arrow-up',
                trend === 'down' && 'text-brand-red trend-arrow-down',
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
