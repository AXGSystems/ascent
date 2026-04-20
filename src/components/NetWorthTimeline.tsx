'use client';

import { useState } from 'react';
import Card from './Card';
import { fmtCurrency } from '@/lib/utils';

interface Milestone {
  label: string;
  value: number;
  date: string;
  type: 'past' | 'current' | 'future';
}

const milestones: Milestone[] = [
  { label: 'Started tracking', value: 61000, date: 'Jan 2025', type: 'past' },
  { label: 'Hit $70K', value: 70000, date: 'May 2025', type: 'past' },
  { label: 'Hit $75K', value: 75000, date: 'Aug 2025', type: 'past' },
  { label: 'Hit $80K', value: 80000, date: 'Dec 2025', type: 'past' },
  { label: 'Today', value: 82450, date: 'Apr 2026', type: 'current' },
  { label: '$85K projected', value: 85000, date: 'Jul 2026', type: 'future' },
  { label: '$90K projected', value: 90000, date: 'Oct 2026', type: 'future' },
  { label: '$100K projected', value: 100000, date: 'Mar 2027', type: 'future' },
];

export default function NetWorthTimeline() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <Card>
      <h2 className="text-base font-bold text-[var(--text-primary)] mb-1">
        Net Worth Milestones
      </h2>
      <p className="text-xs text-[var(--text-muted)] mb-6">
        Your journey from start to $100K and beyond
      </p>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-teal via-brand-teal to-brand-teal/30" />

        <div className="space-y-0">
          {milestones.map((ms, idx) => {
            const isExpanded = expanded === idx;
            return (
              <button
                key={idx}
                type="button"
                className="w-full text-left relative pl-10 pr-2 py-3 hover:bg-[var(--border-color)]/30 rounded-lg transition-all active:scale-[0.98] group"
                onClick={() => setExpanded(isExpanded ? null : idx)}
              >
                {/* Dot on timeline */}
                <div
                  className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all ${
                    ms.type === 'current'
                      ? 'bg-brand-teal border-brand-teal shadow-[0_0_8px_rgba(10,142,188,0.5)] scale-125'
                      : ms.type === 'past'
                        ? 'bg-brand-green border-brand-green'
                        : 'bg-[var(--bg-card)] border-brand-teal/40'
                  }`}
                />

                {/* Card content */}
                <div
                  className={`rounded-xl border p-3 transition-all ${
                    ms.type === 'current'
                      ? 'border-brand-teal/40 bg-brand-teal/5 shadow-sm shadow-brand-teal/10'
                      : ms.type === 'past'
                        ? 'border-[var(--border-color)] bg-[var(--bg-card)]'
                        : 'border-dashed border-[var(--border-color)] bg-[var(--bg-card)]/50'
                  } ${isExpanded ? 'ring-1 ring-brand-teal/30' : ''} group-hover:-translate-y-0.5 group-hover:shadow-md`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-semibold ${ms.type === 'current' ? 'text-brand-teal' : 'text-[var(--text-primary)]'}`}>
                        {ms.label}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">{ms.date}</p>
                    </div>
                    <p className={`text-lg font-bold tabular-nums ${
                      ms.type === 'current' ? 'text-brand-teal' : ms.type === 'future' ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]'
                    }`}>
                      {fmtCurrency(ms.value)}
                    </p>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      {ms.type === 'past' && idx > 0 && (
                        <p>
                          Grew {fmtCurrency(ms.value - milestones[idx - 1].value)} since{' '}
                          {milestones[idx - 1].label} — that is a{' '}
                          {(((ms.value - milestones[idx - 1].value) / milestones[idx - 1].value) * 100).toFixed(1)}% increase.
                        </p>
                      )}
                      {ms.type === 'current' && (
                        <p>
                          Up {fmtCurrency(ms.value - milestones[0].value)} ({(((ms.value - milestones[0].value) / milestones[0].value) * 100).toFixed(1)}%) since
                          you started tracking. At current pace, you will hit $100K in about 18 months.
                        </p>
                      )}
                      {ms.type === 'future' && (
                        <p>
                          Based on your current monthly growth of ~$838/mo. Increase your savings rate by
                          2% to reach this milestone 1 month sooner.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
