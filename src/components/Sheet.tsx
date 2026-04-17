'use client';

import { useStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export default function Sheet() {
  const open = useStore((s) => s.sheetOpen);
  const title = useStore((s) => s.sheetTitle);
  const content = useStore((s) => s.sheetContent);
  const close = useStore((s) => s.closeSheet);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 glass-blur transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={close}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-md',
          'bg-[var(--bg-glass)] glass-blur shadow-2xl border-l border-[var(--border-color)]',
          'ring-1 ring-[var(--border-glass)] ring-inset',
          'transform transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between p-5 border-b border-[var(--border-color)]">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
          <button
            onClick={close}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl hover:bg-[var(--border-color)] transition-colors"
            aria-label="Close"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 overflow-y-auto h-[calc(100%-73px)]">
          {content && (
            <pre className="whitespace-pre-wrap text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
              {content}
            </pre>
          )}
        </div>
      </div>
    </>
  );
}
