'use client';

import { useState, useRef, useEffect } from 'react';
import { financialTerms } from '@/lib/education';

interface LearnTooltipProps {
  term: string;
  children: React.ReactNode;
}

export default function LearnTooltip({ term, children }: LearnTooltipProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const definition = financialTerms[term];
  if (!definition) return <>{children}</>;

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <span ref={ref} className="inline-flex items-center gap-0.5 relative">
      {children}
      <button
        type="button"
        aria-label={`Learn about ${term}`}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold bg-brand-teal/15 text-brand-teal hover:bg-brand-teal/25 transition-colors cursor-help shrink-0 leading-none"
      >
        ?
      </button>
      {open && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-72 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl shadow-black/10 glass-blur ring-1 ring-[var(--border-glass)] ring-inset animate-fade-in"
        >
          <p className="text-xs font-semibold text-brand-teal mb-1">{term}</p>
          <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
            {definition}
          </p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[var(--bg-card)] border-r border-b border-[var(--border-color)] -mt-1" />
        </div>
      )}
    </span>
  );
}
