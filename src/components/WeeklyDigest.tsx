'use client';

import Card from './Card';
import Badge from './Badge';
import { fmtCurrency } from '@/lib/utils';

const weekData = {
  spent: 1240,
  saved: 680,
  nwChange: 550,
  prevWeekSpent: 1380,
  prevWeekSaved: 620,
  prevWeekNWChange: 480,
  topCategories: [
    { name: 'Groceries', amount: 420 },
    { name: 'Dining', amount: 310 },
    { name: 'Shopping', amount: 235 },
  ],
  aiInsight:
    'Your weekday spending dropped 18% compared to last week. If you keep this pattern through April, you will finish $200 under budget.',
};

export default function WeeklyDigest() {
  const spentDelta = weekData.spent - weekData.prevWeekSpent;
  const savedDelta = weekData.saved - weekData.prevWeekSaved;
  const nwDelta = weekData.nwChange - weekData.prevWeekNWChange;

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          Weekly Digest
        </h2>
        <Badge variant="info">This Week</Badge>
      </div>

      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
        You spent <span className="font-semibold text-[var(--text-primary)]">{fmtCurrency(weekData.spent)}</span>,
        saved <span className="font-semibold text-brand-green">{fmtCurrency(weekData.saved)}</span>,
        and your net worth changed by{' '}
        <span className="font-semibold text-brand-teal">+{fmtCurrency(weekData.nwChange)}</span>.
      </p>

      {/* Top Categories */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {weekData.topCategories.map((cat, i) => (
          <div key={cat.name} className="rounded-lg bg-[var(--border-color)]/50 p-2 text-center">
            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">#{i + 1}</p>
            <p className="text-xs font-semibold text-[var(--text-primary)]">{cat.name}</p>
            <p className="text-sm font-bold tabular-nums text-[var(--text-primary)]">{fmtCurrency(cat.amount)}</p>
          </div>
        ))}
      </div>

      {/* vs Last Week */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Comparison label="Spending" delta={spentDelta} invert />
        <Comparison label="Savings" delta={savedDelta} />
        <Comparison label="NW Change" delta={nwDelta} />
      </div>

      {/* AI Insight */}
      <div className="rounded-xl bg-brand-teal/5 border border-brand-teal/20 p-3">
        <div className="flex items-start gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-teal shrink-0 mt-0.5">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
          </svg>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {weekData.aiInsight}
          </p>
        </div>
      </div>
    </Card>
  );
}

function Comparison({ label, delta, invert }: { label: string; delta: number; invert?: boolean }) {
  const isBetter = invert ? delta < 0 : delta > 0;
  return (
    <div className="text-center">
      <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">{label}</p>
      <p className={`text-xs font-semibold ${isBetter ? 'text-brand-green' : 'text-brand-red'}`}>
        {isBetter ? '\u25B2' : '\u25BC'} {delta > 0 ? '+' : ''}{fmtCurrency(delta)}
      </p>
      <p className="text-[10px] text-[var(--text-muted)]">vs last week</p>
    </div>
  );
}
