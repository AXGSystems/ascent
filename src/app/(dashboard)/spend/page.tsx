'use client';

import { budgetCategories, monthlyBudgetHistory, bills, subscriptions, monthlySpending } from '@/lib/data';
import { fmtCurrency, cn, pct } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';
import BarChart from '@/components/BarChart';
import { useStore } from '@/lib/store';

const totalBudget = 4600;
const totalSpent = budgetCategories.reduce((acc, c) => acc + c.spent, 0);
const remaining = totalBudget - totalSpent;

export default function SpendPage() {
  const openSheet = useStore((s) => s.openSheet);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <Card>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
                April Budget
              </p>
              <p className="text-4xl font-bold tabular-nums text-[var(--text-primary)]">
                {fmtCurrency(totalSpent)} <span className="text-lg font-normal text-[var(--text-muted)]">/ {fmtCurrency(totalBudget)}</span>
              </p>
              <div className="mt-3 max-w-md">
                <ProgressBar value={totalSpent} max={totalBudget} height="h-3" />
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {fmtCurrency(remaining)} remaining - {pct(totalSpent, totalBudget)}% used
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[var(--text-muted)]">Safe to Spend</p>
              <p className="text-2xl font-bold tabular-nums text-brand-green">$1,680</p>
              <p className="text-xs text-[var(--text-muted)]">$140/day for 12 days</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Fixed Costs" value={fmtCurrency(1500)} sub="Housing + Insurance" />
        <StatCard label="Variable" value={fmtCurrency(totalSpent - 1500)} sub="Discretionary spending" />
        <StatCard label="Over Budget" value="1 category" accent="text-brand-red" sub="Shopping +$35" />
        <StatCard label="Days Left" value="12" sub="In April" />
      </section>

      {/* Budget breakdown + history */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card>
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
            Category Breakdown
          </h2>
          <div className="space-y-4">
            {budgetCategories.map((cat, i) => (
              <button
                key={i}
                type="button"
                className="w-full text-left hover:bg-[var(--border-color)] rounded-lg p-2 -mx-2 transition-colors min-h-[44px]"
                onClick={() =>
                  openSheet(
                    cat.name,
                    `Allocated: ${fmtCurrency(cat.allocated)}\nSpent: ${fmtCurrency(cat.spent)}\nRemaining: ${fmtCurrency(cat.allocated - cat.spent)}\nUsed: ${pct(cat.spent, cat.allocated)}%${cat.over ? '\n\nOVER BUDGET' : ''}${cat.warning ? '\n\nApproaching limit' : ''}${cat.fixed ? '\n\nFixed cost' : ''}`
                  )
                }
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2">
                    {cat.name}
                    {cat.over && <Badge variant="danger">Over</Badge>}
                    {cat.warning && <Badge variant="warning">Close</Badge>}
                    {cat.fixed && <Badge>Fixed</Badge>}
                  </span>
                  <span className="text-sm tabular-nums text-[var(--text-secondary)]">
                    {fmtCurrency(cat.spent)} / {fmtCurrency(cat.allocated)}
                  </span>
                </div>
                <ProgressBar
                  value={cat.spent}
                  max={cat.allocated}
                  over={cat.over}
                  warning={cat.warning}
                />
              </button>
            ))}
          </div>
        </Card>

        {/* Budget History */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
              Monthly Budget vs Spent
            </h2>
            <BarChart
              data={monthlyBudgetHistory.map((m) => ({
                label: m.m,
                value: m.spent,
                maxValue: m.budget,
                color: m.spent > m.budget ? '#c0392b' : '#0a8ebc',
              }))}
              horizontal={false}
            />
          </Card>

          {/* Spending Trend */}
          <Card>
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
              Spending by Category (6 Months)
            </h2>
            <BarChart
              data={[
                { label: 'Groceries', value: monthlySpending[monthlySpending.length - 1].g, color: '#0a8ebc' },
                { label: 'Dining', value: monthlySpending[monthlySpending.length - 1].d, color: '#d4a843' },
                { label: 'Shopping', value: monthlySpending[monthlySpending.length - 1].s, color: '#c0392b' },
                { label: 'Entertain', value: monthlySpending[monthlySpending.length - 1].e, color: '#2d8f5e' },
                { label: 'Transport', value: monthlySpending[monthlySpending.length - 1].t, color: '#1a2744' },
              ]}
              horizontal={false}
            />
          </Card>
        </div>
      </div>

      {/* Bills + Subscriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bills */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">Bills</h2>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {bills.map((bill, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 min-h-[44px]">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{bill.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Due {bill.dueLabel} {bill.autopay ? '- Autopay' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">
                    {fmtCurrency(bill.amount)}
                  </span>
                  {bill.paid ? (
                    <Badge variant="success">Paid</Badge>
                  ) : bill.autopay ? (
                    <Badge variant="info">Auto</Badge>
                  ) : (
                    <Badge variant="warning">Due</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Subscriptions */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">
              Subscriptions
              <span className="ml-2 text-xs font-normal text-[var(--text-muted)]">
                {fmtCurrency(subscriptions.reduce((a, s) => a + s.amount, 0))}/mo
              </span>
            </h2>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {subscriptions.map((sub, i) => (
              <button
                key={i}
                type="button"
                className="w-full flex items-center justify-between px-5 py-3 min-h-[44px] hover:bg-[var(--bg-card-hover)] transition-colors text-left"
                onClick={() =>
                  openSheet(
                    sub.name,
                    `Amount: ${fmtCurrency(sub.amount)}/mo\nOwner: ${sub.owner}\nCategory: ${sub.category}\nUsage Score: ${sub.usageScore}/10${sub.issue ? `\n\nIssue: ${sub.issue}` : ''}${sub.ok ? '\n\nStatus: Active & healthy' : ''}`
                  )
                }
              >
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2">
                    {sub.name}
                    {sub.issue && <Badge variant="danger">{sub.issue}</Badge>}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {sub.owner} - {sub.category}
                  </p>
                </div>
                <span className="text-sm tabular-nums font-medium text-[var(--text-primary)]">
                  {fmtCurrency(sub.amount)}
                </span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
