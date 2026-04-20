'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MobileSectionProps {
  title: string;
  children: React.ReactNode;
  /** Start collapsed on mobile (default: false = starts open) */
  defaultCollapsed?: boolean;
  /** Extra trailing element in the header row (e.g. a "See all" link) */
  trailing?: React.ReactNode;
  className?: string;
}

/**
 * Collapsible section for mobile. On desktop it is always open and the
 * chevron is hidden so it behaves like a plain heading.
 */
export default function MobileSection({
  title,
  children,
  defaultCollapsed = false,
  trailing,
  className,
}: MobileSectionProps) {
  const [open, setOpen] = useState(!defaultCollapsed);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [open, children]);

  return (
    <section className={cn('', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full min-h-[44px] md:pointer-events-none md:cursor-default"
        aria-expanded={open}
      >
        <h2 className="text-base font-bold text-[var(--text-primary)]">{title}</h2>
        <div className="flex items-center gap-2">
          {trailing}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              'text-[var(--text-muted)] transition-transform duration-200 md:hidden',
              open && 'rotate-180'
            )}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Content: collapsible on mobile, always visible on desktop */}
      <div
        className={cn(
          'overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out md:!max-h-none md:!opacity-100'
        )}
        style={{
          maxHeight: open ? (height !== undefined ? `${height}px` : '9999px') : '0px',
          opacity: open ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="pt-3">
          {children}
        </div>
      </div>
    </section>
  );
}
