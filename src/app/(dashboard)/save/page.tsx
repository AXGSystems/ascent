'use client';

import { nests, savingsRateHistory, actualSavings, projectedSavings, achievements } from '@/lib/data';
import { fmtCurrency, pct, cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import LineChart from '@/components/LineChart';
import Badge from '@/components/Badge';
import { useStore } from '@/lib/store';

const totalSaved = nests.reduce((a, n) => a + n.current, 0);
const totalGoals = nests.reduce((a, n) => a + n.goal, 0);
const currentRate = savingsRateHistory[savingsRateHistory.length - 1].r;

export default function SavePage() {
  const openSheet = useStore((s) => s.openSheet);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <Card>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Total Saved in Goals
              </p>
              <p className="text-4xl font-bold tabular-nums text-brand-green">
                {fmtCurrency(totalSaved)}
              </p>
              <div className="mt-3 max-w-md">
                <ProgressBar value={totalSaved} max={totalGoals} color="bg-brand-green" height="h-3" />
              </div>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {pct(totalSaved, totalGoals)}% of {fmtCurrency(totalGoals)} total goals
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[var(--text-muted)]">Savings Rate</p>
              <p className="text-2xl font-bold tabular-nums text-brand-teal">{currentRate}%</p>
              <p className="text-xs text-brand-green">+1% vs last month</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Goals" value={`${nests.length}`} sub="Saving simultaneously" />
        <StatCard label="This Month" value={fmtCurrency(2760)} trend="up" trendLabel="On track" accent="text-brand-green" />
        <StatCard label="YTD Saved" value={fmtCurrency(10760)} sub="Jan - Apr 2026" />
        <StatCard label="Emergency" value={`${pct(3600, 5000)}%`} sub="$3,600 of $5,000" accent="text-brand-gold" />
      </section>

      {/* Goals Grid */}
      <section>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Savings Goals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nests.map((nest, i) => (
            <Card
              key={i}
              onClick={() =>
                openSheet(
                  nest.name,
                  `Current: ${fmtCurrency(nest.current)}\nGoal: ${fmtCurrency(nest.goal)}\nProgress: ${pct(nest.current, nest.goal)}%\nAuto-Save: ${fmtCurrency(nest.autoAmount)} ${nest.frequency}\n\nRemaining: ${fmtCurrency(nest.goal - nest.current)}`
                )
              }
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{nest.name}</h3>
                <Badge variant="info">{nest.frequency}</Badge>
              </div>
              <p className="text-2xl font-bold tabular-nums text-[var(--text-primary)] mb-1">
                {fmtCurrency(nest.current)}
              </p>
              <p className="text-xs text-[var(--text-muted)] mb-3">
                of {fmtCurrency(nest.goal)} goal
              </p>
              <ProgressBar
                value={nest.current}
                max={nest.goal}
                color="bg-brand-green"
                showLabel
              />
              <p className="mt-2 text-xs text-[var(--text-secondary)]">
                Auto-saving {fmtCurrency(nest.autoAmount)} {nest.frequency.toLowerCase()}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Savings Rate */}
        <Card>
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
            Savings Rate Trend
          </h2>
          <LineChart
            data={savingsRateHistory.map((p) => ({ label: p.m, value: p.r }))}
            height={180}
            color="#2d8f5e"
            formatValue={(v) => `${v}%`}
          />
        </Card>

        {/* Cumulative Savings */}
        <Card>
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
            Cumulative Savings 2026
          </h2>
          <LineChart
            data={actualSavings.map((p) => ({ label: p.m, value: p.v }))}
            height={180}
            color="#0a8ebc"
          />
        </Card>
      </div>

      {/* Achievements */}
      <section>
        <Card>
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {achievements.map((a, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  'p-3 rounded-xl border text-left transition-all min-h-[44px]',
                  a.done
                    ? 'border-brand-green/30 bg-brand-green/5'
                    : 'border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]'
                )}
                onClick={() =>
                  openSheet(
                    a.name,
                    `${a.description}${a.done ? `\n\nCompleted: ${a.date}` : `\n\nProgress: ${a.progress}%`}`
                  )
                }
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn('text-sm', a.done ? 'text-brand-green' : 'text-[var(--text-muted)]')}>
                    {a.done ? '\u2713' : '\u25CB'}
                  </span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{a.name}</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] ml-6">{a.description}</p>
                {!a.done && a.progress !== undefined && (
                  <div className="mt-2 ml-6">
                    <ProgressBar value={a.progress} max={100} height="h-1" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
