'use client';

import { subscriptions } from '@/lib/data';
import { fmtCurrency, cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import DonutChart from '@/components/DonutChart';
import Badge from '@/components/Badge';
import { useStore } from '@/lib/store';

const totalMonthly = subscriptions.reduce((a, s) => a + s.amount, 0);
const unused = subscriptions.filter((s) => s.usageScore <= 3);
const potentialSavings = unused.reduce((a, s) => a + s.amount, 0);

const catTotals: Record<string, number> = {};
subscriptions.forEach((s) => {
  catTotals[s.category] = (catTotals[s.category] ?? 0) + s.amount;
});
const catColors: Record<string, string> = {
  Entertainment: '#0a8ebc',
  Wellness: '#2d8f5e',
  Productivity: '#c0392b',
  Storage: '#5b7ba5',
  Fitness: '#d4a843',
  News: '#8b5cf6',
  AI: '#e879f9',
};
const donutSegments = Object.entries(catTotals).map(([label, value]) => ({
  label,
  value,
  color: catColors[label] ?? '#999',
}));

function scoreColor(score: number): string {
  if (score >= 7) return 'bg-brand-green';
  if (score >= 4) return 'bg-brand-gold';
  return 'bg-brand-red';
}

export default function SubscriptionsPage() {
  const openSheet = useStore((s) => s.openSheet);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Subscriptions</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">Subscriptions</p>
            <p className="text-4xl md:text-5xl font-black tabular-nums text-white">{fmtCurrency(totalMonthly)}<span className="text-lg font-normal text-white/50">/mo</span></p>
            <p className="mt-2 text-sm text-white/60">{subscriptions.length} active subscriptions across {Object.keys(catTotals).length} categories</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Monthly Total" value={fmtCurrency(totalMonthly)} sub={`${fmtCurrency(totalMonthly * 12)}/yr`} />
        <StatCard label="Unused / Low" value={`${unused.length} subs`} accent="text-brand-red" sub="Score 3 or below" />
        <StatCard label="Potential Savings" value={fmtCurrency(potentialSavings)} accent="text-brand-green" sub={`${fmtCurrency(potentialSavings * 12)}/yr`} />
        <StatCard label="Avg Score" value={`${(subscriptions.reduce((a, s) => a + s.usageScore, 0) / subscriptions.length).toFixed(1)}/10`} sub="Usage score" />
      </section>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Subscription List */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-base font-bold text-[var(--text-primary)]">All Subscriptions</h2>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {subscriptions.map((sub) => (
              <button
                key={sub.name}
                type="button"
                className="w-full flex items-center gap-4 px-5 py-3 hover:bg-[var(--bg-card-hover)] transition-colors text-left min-h-[44px]"
                onClick={() =>
                  openSheet(
                    sub.name,
                    `Amount: ${fmtCurrency(sub.amount)}/mo\nOwner: ${sub.owner}\nCategory: ${sub.category}\nUsage Score: ${sub.usageScore}/10${sub.issue ? `\n\nIssue: ${sub.issue}` : ''}${sub.ok ? '\n\nStatus: Active & healthy' : ''}`
                  )
                }
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2">
                    {sub.name}
                    {sub.issue && <Badge variant="danger">{sub.issue}</Badge>}
                    {sub.ok && <Badge variant="success">OK</Badge>}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{sub.owner} - {sub.category}</p>
                </div>
                <div className="w-20">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] text-[var(--text-muted)]">{sub.usageScore}/10</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden bg-[var(--border-color)]">
                    <div
                      className={cn('h-full rounded-full transition-all', scoreColor(sub.usageScore))}
                      style={{ width: `${sub.usageScore * 10}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm tabular-nums font-semibold text-[var(--text-primary)] w-16 text-right">
                  {fmtCurrency(sub.amount)}
                </span>
              </button>
            ))}
          </div>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">By Category</h2>
            <DonutChart
              segments={donutSegments}
              size={160}
              centerLabel="Total"
              centerValue={fmtCurrency(totalMonthly)}
            />
          </Card>

          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Decay Alerts</h2>
            <div className="space-y-3">
              {unused.map((sub) => (
                <div key={sub.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{sub.name}</p>
                    <p className="text-xs text-brand-red">{sub.issue}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">{fmtCurrency(sub.amount)}/mo</p>
                    <p className="text-xs text-[var(--text-muted)]">Score: {sub.usageScore}/10</p>
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-[var(--border-color)]">
                <p className="text-sm font-semibold text-brand-green">Cancel all = {fmtCurrency(potentialSavings)}/mo saved</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
