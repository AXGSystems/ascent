'use client';

import { cn } from '@/lib/utils';

interface ChartTooltipProps {
  x: number;
  y: number;
  visible: boolean;
  children: React.ReactNode;
}

export default function ChartTooltip({ x, y, visible, children }: ChartTooltipProps) {
  if (!visible) return null;

  return (
    <div
      className={cn(
        'absolute z-50 pointer-events-none',
        'px-3 py-2 rounded-xl text-xs font-medium',
        'bg-[var(--bg-card)]/90 backdrop-blur-xl',
        'border border-[var(--border-color)]',
        'shadow-lg shadow-black/10',
        'text-[var(--text-primary)]',
        'transition-opacity duration-150',
        visible ? 'opacity-100' : 'opacity-0'
      )}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -110%)',
      }}
    >
      {children}
    </div>
  );
}
