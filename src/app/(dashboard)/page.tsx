'use client';

import { useStore } from '@/lib/store';
import {
  nwHistory,
  monthlySpending,
  cashFlow,
  topMerchants,
  transactions,
  bills,
  achievements,
  budgetCategories,
} from '@/lib/data';
import { fmtCurrency, whoLabel, whoBadgeColor, cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Sparkline from '@/components/Sparkline';
import LineChart from '@/components/LineChart';
import DonutChart from '@/components/DonutChart';
import AreaChart from '@/components/AreaChart';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';
import Link from 'next/link';

const currentNW = nwHistory[nwHistory.length - 1].v;
const prevNW = nwHistory[nwHistory.length - 2].v;
const nwDelta = currentNW - prevNW;
const nwPct = ((nwDelta / prevNW) * 100).toFixed(1);

export default function HomePage() {
  const openSheet = useStore((s) => s.openSheet);

  const recentTx = transactions.slice(0, 8);
  const upcomingBills = bills.filter((b) => !b.paid).slice(0, 4);
  const doneAchievements = achievements.filter((a) => a.done).length;
  const totalAchievements = achievements.length;

  // Latest spending for donut
  const latest = monthlySpending[monthlySpending.length - 1];
  const spendingSegments = [
    { label: 'Groceries', value: latest.g, color: '#0a8ebc' },
    { label: 'Dining', value: latest.d, color: '#d4a843' },
    { label: 'Shopping', value: latest.s, color: '#c0392b' },
    { label: 'Entertainment', value: latest.e, color: '#2d8f5e' },
    { label: 'Transport', value: latest.t, color: '#5b7ba5' },
  ];
  const totalSpent = latest.g + latest.d + latest.s + latest.e + latest.t;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">A$cent Dashboard</h1>
      {/* HERO: Net Worth — gradient background */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">
                Net Worth
              </p>
              <p className="text-4xl md:text-5xl font-black tabular-nums text-white">
                {fmtCurrency(currentNW)}
              </p>
              <p className="mt-2 text-sm flex items-center gap-1.5">
                <span className="text-emerald-300 font-semibold">
                  {'\u25B2'} +{fmtCurrency(nwDelta)} ({nwPct}%)
                </span>
                <span className="text-white/50">vs last month</span>
              </p>
            </div>
            <div className="shrink-0">
              <Sparkline
                data={nwHistory.map((p) => p.v)}
                width={200}
                height={56}
                color="rgba(255,255,255,0.85)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STAT CARDS ROW */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Safe to Spend"
          value="$1,680"
          sub="$140/day for 12 days"
          accent="text-brand-green"
        />
        <StatCard
          label="Budget Spent"
          value="$2,920"
          trendLabel="63% of $4,600"
          trend="flat"
        />
        <StatCard
          label="Savings Rate"
          value="39%"
          trendLabel="+1% vs Feb"
          trend="up"
          accent="text-brand-teal"
        />
        <StatCard
          label="Achievements"
          value={`${doneAchievements}/${totalAchievements}`}
          onClick={() => {
            const list = achievements
              .map((a) => `${a.done ? '[x]' : '[ ]'} ${a.name} - ${a.description}${a.progress ? ` (${a.progress}%)` : ''}`)
              .join('\n');
            openSheet('Achievements', list);
          }}
          sub="Tap to view all"
        />
      </section>

      {/* NET WORTH CHART (full width) */}
      <section>
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Net Worth - 12 Months
          </h2>
          <LineChart
            data={nwHistory.map((p) => ({ label: p.m, value: p.v }))}
            height={220}
            color="#0a8ebc"
          />
        </Card>
      </section>

      {/* TWO COLUMN LAYOUT — asymmetric: larger left for spending/tx, narrower right for flow/bills */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Spending Donut + Budget Progress */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                April Spending
              </h2>
              <Link
                href="/spend"
                className="text-xs font-medium text-brand-teal hover:underline"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <DonutChart
                segments={spendingSegments}
                size={140}
                centerLabel="Total"
                centerValue={fmtCurrency(totalSpent)}
              />
              <div className="flex-1 w-full space-y-3">
                {budgetCategories.slice(0, 5).map((cat) => (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
                        {cat.name}
                        {cat.over && <span className="text-brand-red text-[10px]">Over</span>}
                      </span>
                      <span className="text-xs tabular-nums text-[var(--text-muted)]">
                        {fmtCurrency(cat.spent)} / {fmtCurrency(cat.allocated)}
                      </span>
                    </div>
                    <ProgressBar
                      value={cat.spent}
                      max={cat.allocated}
                      height="h-1.5"
                      over={cat.over}
                      warning={cat.warning}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Recent Transactions */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Recent Transactions
              </h2>
              <Link
                href="/transactions"
                className="text-xs font-medium text-brand-teal hover:underline"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {recentTx.map((tx) => (
                <button
                  key={`${tx.name}-${tx.date}`}
                  className="w-full flex items-center gap-3 px-5 py-3 hover:bg-[var(--bg-card-hover)] transition-colors text-left min-h-[44px]"
                  type="button"
                  onClick={() =>
                    openSheet(
                      tx.name,
                      `Category: ${tx.category}\nAmount: ${fmtCurrency(tx.amount)}\nDate: ${tx.date}\nWho: ${whoLabel(tx.who)}${tx.flagged ? '\n\nFLAGGED: Unusual amount' : ''}`
                    )
                  }
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0',
                      whoBadgeColor(tx.who)
                    )}
                  >
                    {tx.who}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate flex items-center gap-1.5">
                      {tx.name}
                      {tx.flagged && (
                        <span className="text-brand-red text-[10px]" aria-label="Flagged transaction">{'\u26A0'}</span>
                      )}
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {tx.category} - {tx.date}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'text-sm font-semibold tabular-nums',
                      tx.amount >= 0 ? 'text-brand-green' : 'text-[var(--text-primary)]'
                    )}
                  >
                    {tx.amount >= 0 ? '+' : ''}{fmtCurrency(tx.amount)}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {/* Cash Flow */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
              Cash Flow
            </h2>
            <AreaChart
              labels={cashFlow.map((c) => c.m)}
              series={[
                { label: 'Income', color: '#2d8f5e', data: cashFlow.map((c) => c.inc) },
                { label: 'Expenses', color: '#c0392b', data: cashFlow.map((c) => c.exp) },
              ]}
              height={180}
            />
          </Card>

          {/* Upcoming Bills */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Upcoming Bills
              </h2>
              <Link
                href="/bills"
                className="text-xs font-medium text-brand-teal hover:underline"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {upcomingBills.map((bill) => (
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
                    {bill.autopay ? (
                      <Badge variant="success">Auto</Badge>
                    ) : (
                      <Badge variant="warning">Due</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
              Quick Actions
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Budget', href: '/spend', icon: 'credit-card' },
                { label: 'Goals', href: '/save', icon: 'piggy-bank' },
                { label: 'Coach', href: '/coach', icon: 'sparkles' },
                { label: 'ChargeIQ', href: '/chargeiq', icon: 'search' },
                { label: 'Credit', href: '/credit', icon: 'shield' },
                { label: 'Forecast', href: '/forecast', icon: 'trending-up' },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[var(--border-color)] transition-colors min-h-[44px]"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {action.icon === 'credit-card' && <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>}
                      {action.icon === 'piggy-bank' && <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.3-11-.5-11 5 0 4.3 2.7 7 7 8v2h4v-2c1 0 2-.5 3-1l2 1V14l-1-1c.7-2 .2-4-1-5z" />}
                      {action.icon === 'sparkles' && <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75L18 15z" /></>}
                      {action.icon === 'search' && <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>}
                      {action.icon === 'shield' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                      {action.icon === 'trending-up' && <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>}
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-[var(--text-secondary)]">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </Card>

          {/* Top Merchants */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3 flex items-center justify-between">
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                Top Merchants
              </h2>
              <Link
                href="/transactions"
                className="text-xs font-medium text-brand-teal hover:underline"
              >
                View all &rarr;
              </Link>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {topMerchants.slice(0, 5).map((m, idx) => (
                <div key={m.n} className="flex items-center justify-between px-5 py-3 min-h-[44px]">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[var(--text-muted)] w-4 tabular-nums">{idx + 1}</span>
                    <span className="text-sm text-[var(--text-primary)]">{m.n}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">
                      {fmtCurrency(m.total)}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] ml-2">
                      {m.count}x
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
