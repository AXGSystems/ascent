'use client';

import { cn, fmtCurrency } from '@/lib/utils';
import { transactions, budgetCategories } from '@/lib/data';
import Card from './Card';

const totalBudget = 4600;
const totalSpent = budgetCategories.reduce((a, c) => a + c.spent, 0);
const safeToSpend = totalBudget - totalSpent;
const daysLeft = 12;
const dailyBudget = Math.round(safeToSpend / daysLeft);

// Today's transactions (simulate)
const todayTx = transactions.filter(
  (t) => t.date === 'Today' && t.amount < 0
);
const todaySpent = Math.abs(
  todayTx.reduce((a, t) => a + t.amount, 0)
);
const todayPct = Math.min(Math.round((todaySpent / dailyBudget) * 100), 100);

function getMeterColor(pct: number): string {
  if (pct < 60) return 'bg-brand-green';
  if (pct < 85) return 'bg-brand-gold';
  return 'bg-brand-red';
}

function getMeterTextColor(pct: number): string {
  if (pct < 60) return 'text-brand-green';
  if (pct < 85) return 'text-brand-gold';
  return 'text-brand-red';
}

export default function DailySpendTracker() {
  return (
    <Card>
      <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
        Today&apos;s Spending
      </h2>

      {/* Meter */}
      <div className="mb-3">
        <div className="flex items-end justify-between mb-1.5">
          <span className={cn('text-2xl font-bold tabular-nums', getMeterTextColor(todayPct))}>
            {fmtCurrency(todaySpent)}
          </span>
          <span className="text-xs text-[var(--text-muted)]">
            of {fmtCurrency(dailyBudget)} daily budget
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-[var(--border-color)] overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-700 ease-out',
              getMeterColor(todayPct)
            )}
            style={{ width: `${todayPct}%` }}
          />
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-1.5">
          {todayPct < 100
            ? `${fmtCurrency(dailyBudget - todaySpent)} remaining today`
            : 'Daily budget reached — hold off on spending!'}
        </p>
      </div>

      {/* Today's transactions */}
      {todayTx.length > 0 && (
        <div className="border-t border-[var(--border-color)] pt-2 -mx-4 md:-mx-5 px-4 md:px-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">
            Today
          </p>
          <div className="space-y-2">
            {todayTx.map((tx) => (
              <div key={`${tx.name}-${tx.date}`} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
                  <span className="text-xs text-[var(--text-secondary)]">{tx.name}</span>
                </div>
                <span className="text-xs font-medium tabular-nums text-[var(--text-primary)]">
                  {fmtCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {todayTx.length === 0 && (
        <p className="text-xs text-[var(--text-muted)] text-center py-2">
          No spending yet today. Keep it up!
        </p>
      )}
    </Card>
  );
}
