'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { generateGuidedActions } from '@/lib/guided-actions';
import type { GuidedAction } from '@/lib/guided-actions';

const typeBadge: Record<GuidedAction['type'], { label: string; color: string }> = {
  save: { label: 'Save', color: 'bg-brand-green/10 text-brand-green' },
  reduce: { label: 'Reduce', color: 'bg-brand-red/10 text-brand-red' },
  protect: { label: 'Protect', color: 'bg-brand-gold/10 text-brand-gold' },
  grow: { label: 'Grow', color: 'bg-brand-teal/10 text-brand-teal' },
  fix: { label: 'Fix', color: 'bg-brand-red/10 text-brand-red' },
};

export default function GuidedActions() {
  const actions = generateGuidedActions();

  return (
    <section aria-label="Guided actions">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          What Should I Do?
        </h2>
        <span className="text-xs text-[var(--text-muted)]">Top {actions.length} actions by impact</span>
      </div>
      <div className="space-y-2">
        {actions.map((action, idx) => (
          <Link
            key={action.title}
            href={action.href}
            className="group flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] hover:bg-[var(--bg-card-hover)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5 transition-all glass-blur ring-1 ring-[var(--border-glass)] ring-inset animate-fade-in active:scale-[0.98]"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            {/* Number */}
            <div className="w-7 h-7 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-brand-teal">{idx + 1}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-brand-teal transition-colors">
                  {action.icon} {action.title}
                </span>
                <span className={cn('px-1.5 py-0.5 rounded-full text-[10px] font-medium', typeBadge[action.type].color)}>
                  {typeBadge[action.type].label}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] line-clamp-1">{action.description}</p>
              <p className="text-xs font-semibold text-brand-green mt-1">{action.impact}</p>
            </div>

            {/* Arrow */}
            <span className="text-[var(--text-muted)] group-hover:text-brand-teal transition-colors shrink-0 mt-1 text-sm">
              &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
