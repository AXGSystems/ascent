'use client';

import { cn } from '@/lib/utils';

interface HorizontalScrollProps {
  children: React.ReactNode;
  /** Width of each card on mobile (default "280px") */
  cardWidth?: string;
  /** Desktop grid columns class (default "lg:grid-cols-3") */
  desktopCols?: string;
  className?: string;
}

/**
 * On mobile: horizontal scroll with snap points.
 * On desktop: regular grid.
 */
export default function HorizontalScroll({
  children,
  cardWidth = '280px',
  desktopCols = 'lg:grid-cols-3',
  className,
}: HorizontalScrollProps) {
  return (
    <div
      className={cn(
        // Mobile: horizontal scroll
        'flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-hide',
        // Desktop: grid
        'lg:grid lg:overflow-visible lg:mx-0 lg:px-0 lg:pb-0',
        desktopCols,
        className
      )}
    >
      {children}
    </div>
  );
}

/** Wrapper for each child inside HorizontalScroll */
export function HScrollItem({
  children,
  width = '280px',
  className,
}: {
  children: React.ReactNode;
  width?: string;
  className?: string;
}) {
  return (
    <div
      className={cn('snap-start shrink-0 lg:w-auto', className)}
      style={{ width }}
    >
      {children}
    </div>
  );
}
