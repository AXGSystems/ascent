'use client';

import { budgetCategories, monthlyBudgetHistory, bills, subscriptions, monthlySpending } from '@/lib/data';
import { fmtCurrency, pct } from '@/lib/utils';
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
      <h1 className="sr-only">Spending & Budget</h1>
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">
                April Budget
              </p>
              <p className="text-4xl md:text-5xl font-black tabular-nums text-white">
                {fmtCurrency(totalSpent)} <span className="text-lg font-normal text-white/50">/ {fmtCurrency(totalBudget)}</span>
              </p>
              <div className="mt-3 max-w-md">
                <div className="w-full h-3 rounded-full overflow-hidden bg-white/20">
                  <div
                    className="h-full rounded-full bg-white/90 transition-all duration-700"
                    style={{ width: `${pct(totalSpent, totalBudget)}%` }}
                  />
                </div>
              </div>
              <p className="mt-2 text-sm text-white/60">
                {fmtCurrency(remaining)} remaining - {pct(totalSpent, totalBudget)}% used
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/50">Safe to Spend</p>
              <p className="text-2xl font-bold tabular-nums text-emerald-300">$1,680</p>
              <p className="text-xs text-white/40">$140/day for 12 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Fixed Costs" value={fmtCurrency(1500)} sub="Housing + Insurance" />
        <StatCard label="Variable" value={fmtCurrency(totalSpent - 1500)} sub="Discretionary spending" />
        <StatCard label="Over Budget" value="1 category" accent="text-brand-red" sub="Shopping +$35" />
        <StatCard label="Days Left" value="12" sub="In April" />
      </section>

      {/* Budget breakdown + history */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Category Breakdown */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Category Breakdown
          </h2>
          <div className="space-y-4">
            {budgetCategories.map((cat) => (
              <button
                key={cat.name}
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
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
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
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
              Spending by Category (6 Months)
            </h2>
            <BarChart
              data={[
                { label: 'Groceries', value: monthlySpending[monthlySpending.length - 1].g, color: '#0a8ebc' },
                { label: 'Dining', value: monthlySpending[monthlySpending.length - 1].d, color: '#d4a843' },
                { label: 'Shopping', value: monthlySpending[monthlySpending.length - 1].s, color: '#c0392b' },
                { label: 'Entertain', value: monthlySpending[monthlySpending.length - 1].e, color: '#2d8f5e' },
                { label: 'Transport', value: monthlySpending[monthlySpending.length - 1].t, color: '#5b7ba5' },
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
            <h2 className="text-base font-bold text-[var(--text-primary)]">Bills</h2>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {bills.map((bill) => (
              <div key={bill.name} className="flex items-center justify-between px-5 py-3 min-h-[44px]">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{bill.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Due {bill.dueLabel} {bill.autopay ? '- Autopay' : '- Manual'}
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
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              Subscriptions
              <span className="ml-2 text-xs font-normal text-[var(--text-muted)]">
                {fmtCurrency(subscriptions.reduce((a, s) => a + s.amount, 0))}/mo
              </span>
            </h2>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {subscriptions.map((sub) => (
              <button
                key={sub.name}
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
