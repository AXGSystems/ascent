'use client';

import { useState } from 'react';
import { cn, fmtCurrency } from '@/lib/utils';

interface BarItem {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

interface BarChartProps {
  data: BarItem[];
  horizontal?: boolean;
  height?: number;
  showValues?: boolean;
}

export default function BarChart({ data, horizontal = true, showValues = true }: BarChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const maxVal = Math.max(...data.map((d) => d.maxValue ?? d.value));
  const avg = data.reduce((a, d) => a + d.value, 0) / data.length;

  if (horizontal) {
    return (
      <div className="space-y-3">
        {data.map((d, i) => {
          const pct = maxVal > 0 ? (d.value / maxVal) * 100 : 0;
          const isHov = hovered === i;
          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-default"
            >
              <div className="flex justify-between items-center mb-1">
                <span className={cn('text-sm', isHov ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-secondary)]')}>
                  {d.label}
                </span>
                <div className="flex items-center gap-2">
                  {showValues && (
                    <span className="text-sm tabular-nums font-medium text-[var(--text-primary)]">
                      {fmtCurrency(d.value)}
                    </span>
                  )}
                  {isHov && (
                    <span className="text-[10px] tabular-nums text-[var(--text-muted)]">
                      {d.value >= avg ? 'above' : 'below'} avg
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden bg-[var(--border-color)]">
                <div
                  className={cn('h-full rounded-full transition-all duration-500')}
                  style={{
                    width: `${Math.min(pct, 100)}%`,
                    backgroundColor: d.color || 'var(--brand-teal)',
                    filter: isHov ? 'brightness(1.2)' : 'none',
                    transition: 'width 0.5s, filter 0.15s',
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Vertical bars
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((d, i) => {
        const pct = maxVal > 0 ? (d.value / maxVal) * 100 : 0;
        const isHov = hovered === i;
        return (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-1"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span className={cn('text-[10px] tabular-nums', isHov ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-muted)]')}>
              {fmtCurrency(d.value, true)}
            </span>
            <div className="w-full flex items-end justify-center" style={{ height: '80px' }}>
              <div
                className="w-full max-w-[24px] rounded-t transition-all duration-500"
                style={{
                  height: `${pct}%`,
                  backgroundColor: d.color || 'var(--brand-teal)',
                  filter: isHov ? 'brightness(1.2)' : 'none',
                  transition: 'height 0.5s, filter 0.15s',
                }}
              />
            </div>
            <span className={cn('text-[10px] text-center', isHov ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-muted)]')}>
              {d.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
