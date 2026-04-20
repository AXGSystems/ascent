'use client';

import { useState } from 'react';
import { nests } from '@/lib/data';
import { fmtCurrency, pct } from '@/lib/utils';
import Card from './Card';
import ProgressRing from './ProgressRing';

const nestColors = ['#0a8ebc', '#2d8f5e', '#d4a843', '#c0392b', '#8b5cf6', '#ec4899'];

export default function GoalProgressRings() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Card>
      <h2 className="text-base font-bold text-[var(--text-primary)] mb-1">
        Goal Progress Rings
      </h2>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        All savings goals at a glance — click any ring for details
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {nests.map((nest, idx) => {
          const progress = pct(nest.current, nest.goal);
          const isExpanded = expanded === nest.name;
          return (
            <button
              key={nest.name}
              type="button"
              className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:bg-[var(--border-color)]/50 active:scale-95"
              onClick={() => setExpanded(isExpanded ? null : nest.name)}
            >
              <ProgressRing
                value={progress}
                size={90}
                strokeWidth={7}
                color={nestColors[idx % nestColors.length]}
                label={nest.name}
              />
              <div className="text-center">
                <p className="text-xs font-semibold text-[var(--text-primary)]">
                  {fmtCurrency(nest.current)}
                </p>
                <p className="text-[10px] text-[var(--text-muted)]">
                  of {fmtCurrency(nest.goal)}
                </p>
              </div>
              {isExpanded && (
                <div className="w-full mt-1 pt-2 border-t border-[var(--border-color)] text-left animate-card-in">
                  <div className="space-y-1 text-xs text-[var(--text-secondary)]">
                    <p>Auto-Save: {fmtCurrency(nest.autoAmount)} {nest.frequency.toLowerCase()}</p>
                    <p>Remaining: {fmtCurrency(nest.goal - nest.current)}</p>
                    <p>
                      ETA:{' '}
                      {nest.frequency === 'Daily'
                        ? `${Math.ceil((nest.goal - nest.current) / nest.autoAmount)} days`
                        : nest.frequency === 'Weekly'
                          ? `${Math.ceil((nest.goal - nest.current) / nest.autoAmount)} weeks`
                          : `${Math.ceil((nest.goal - nest.current) / nest.autoAmount)} periods`}
                    </p>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
