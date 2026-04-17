'use client';

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
  const maxVal = Math.max(...data.map((d) => d.maxValue ?? d.value));

  if (horizontal) {
    return (
      <div className="space-y-3">
        {data.map((d, i) => {
          const pct = maxVal > 0 ? (d.value / maxVal) * 100 : 0;
          return (
            <div key={i}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[var(--text-secondary)]">{d.label}</span>
                {showValues && (
                  <span className="text-sm tabular-nums font-medium text-[var(--text-primary)]">
                    {fmtCurrency(d.value)}
                  </span>
                )}
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden bg-[var(--border-color)]">
                <div
                  className={cn('h-full rounded-full transition-all duration-500')}
                  style={{
                    width: `${Math.min(pct, 100)}%`,
                    backgroundColor: d.color || 'var(--brand-teal)',
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
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[10px] tabular-nums text-[var(--text-muted)]">
              {fmtCurrency(d.value, true)}
            </span>
            <div className="w-full flex items-end justify-center" style={{ height: '80px' }}>
              <div
                className="w-full max-w-[24px] rounded-t transition-all duration-500"
                style={{
                  height: `${pct}%`,
                  backgroundColor: d.color || 'var(--brand-teal)',
                }}
              />
            </div>
            <span className="text-[10px] text-[var(--text-muted)] text-center">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
