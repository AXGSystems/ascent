'use client';

import { useState, useEffect, useRef } from 'react';
import { cn, clamp } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
  warning?: boolean;
  over?: boolean;
}

export default function ProgressBar({
  value,
  max,
  color,
  height = 'h-2',
  showLabel,
  warning,
  over,
}: ProgressBarProps) {
  const pct = clamp((value / max) * 100, 0, 100);
  const [mounted, setMounted] = useState(false);
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    // Delay to trigger CSS transition from 0
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMounted(true);
      });
    });
  }, []);

  const barColor = over
    ? 'bg-brand-red'
    : warning
      ? 'bg-brand-gold'
      : color || 'bg-brand-teal';

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs tabular-nums text-[var(--text-secondary)]">
            {Math.round(pct)}%
          </span>
        </div>
      )}
      <div className={cn('w-full rounded-full overflow-hidden bg-[var(--border-color)]', height)}>
        <div
          className={cn('h-full rounded-full transition-all duration-1000 ease-out', barColor)}
          style={{ width: mounted ? `${pct}%` : '0%' }}
        />
      </div>
    </div>
  );
}
