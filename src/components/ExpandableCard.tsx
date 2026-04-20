'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ExpandableCardProps {
  children: React.ReactNode;
  expandedContent: React.ReactNode;
  title?: string;
  className?: string;
}

export default function ExpandableCard({
  children,
  expandedContent,
  title,
  className,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [open, expandedContent]);

  const base = 'rounded-2xl glass-blur border transition-all duration-200 ease-out animate-card-in';
  const colors = 'bg-[var(--bg-card)] border-[var(--border-color)]';
  const shadow = 'shadow-[var(--shadow-card)]';
  const ring = 'ring-1 ring-[var(--border-glass)] ring-inset';
  const hover = 'cursor-pointer hover:bg-[var(--bg-card-hover)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 active:scale-[0.985] active:shadow-none';

  return (
    <div className={cn(base, colors, shadow, ring, hover, className)}>
      <button
        type="button"
        className="w-full text-left p-5"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={title ? `${title} - click to ${open ? 'collapse' : 'expand'}` : undefined}
      >
        <div className="relative">
          {children}
          <span
            className={cn(
              'absolute top-0 right-0 text-[var(--text-muted)] transition-transform duration-200',
              open && 'rotate-180'
            )}
            aria-hidden="true"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
      </button>
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
        style={{
          maxHeight: open ? `${height}px` : '0px',
          opacity: open ? 1 : 0,
        }}
      >
        <div ref={contentRef} className="px-5 pb-5 pt-0">
          <div className="border-t border-[var(--border-color)] pt-4">
            {expandedContent}
          </div>
        </div>
      </div>
    </div>
  );
}
