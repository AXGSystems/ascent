'use client';

import { useRouter } from 'next/navigation';
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
  /** Navigate to this path on click (used for mobile stat cards) */
  href?: string;
}

export default function StatCard({ label, value, sub, trend, trendLabel, accent, onClick, tooltip, href }: StatCardProps) {
  const router = useRouter();

  const handleClick = onClick ?? (href ? () => router.push(href) : undefined);

  return (
    <Card onClick={handleClick} className="group min-h-[100px] hover:bg-gradient-to-br hover:from-[var(--bg-card-hover)] hover:to-[var(--bg-card)]">
      <div className="p-0 md:p-0">
        <p
          className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1 transition-colors group-hover:text-[var(--text-secondary)]"
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
            'text-lg md:text-xl lg:text-2xl font-bold tabular-nums tracking-tight transition-transform duration-200',
            accent || 'text-[var(--text-primary)]'
          )}
        >
          {value}
        </p>
        {(sub || trendLabel) && (
          <p className="mt-1 text-xs md:text-sm text-[var(--text-secondary)] flex items-center gap-1 transition-colors group-hover:text-[var(--text-primary)]">
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
        {/* Clickable indicator */}
        {handleClick && (
          <span className="mt-2 text-[10px] font-medium text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity md:hidden block">
            Tap for details &rarr;
          </span>
        )}
      </div>
    </Card>
  );
}
