'use client';

import { nests } from '@/lib/data';
import { fmtCurrency, pct } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import LineChart from '@/components/LineChart';
import Badge from '@/components/Badge';
import AdvisorTip from '@/components/AdvisorTip';
import CountUp from '@/components/CountUp';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';

const totalSaved = nests.reduce((a, n) => a + n.current, 0);
const totalGoals = nests.reduce((a, n) => a + n.goal, 0);
const overallPct = pct(totalSaved, totalGoals);

const growthProjection = [
  { label: 'Apr', value: totalSaved },
  { label: 'May', value: totalSaved + 1200 },
  { label: 'Jun', value: totalSaved + 2400 },
  { label: 'Jul', value: totalSaved + 3600 },
  { label: 'Aug', value: totalSaved + 4800 },
  { label: 'Sep', value: totalSaved + 6000 },
  { label: 'Oct', value: totalSaved + 7200 },
  { label: 'Nov', value: totalSaved + 8400 },
  { label: 'Dec', value: totalSaved + 9600 },
];

const contributions = [
  { date: 'Apr 14', nest: 'Emergency', amount: 15, type: 'Auto' },
  { date: 'Apr 13', nest: 'Hawaii', amount: 25, type: 'Auto' },
  { date: 'Apr 12', nest: 'Wedding Fund', amount: 30, type: 'Auto' },
  { date: 'Apr 11', nest: 'New Car', amount: 20, type: 'Auto' },
  { date: 'Apr 10', nest: 'Mortgage DP', amount: 50, type: 'Auto' },
  { date: 'Apr 9', nest: 'College', amount: 10, type: 'Auto' },
];

export default function NestsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Nests (Savings Goals)</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">Total Saved</p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-black tabular-nums text-white"><CountUp value={totalSaved} prefix="$" /></p>
              <p className="mt-2 text-sm text-white/60">{overallPct}% of {fmtCurrency(totalGoals)} across {nests.length} nests</p>
            </div>
            <button type="button" className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 transition-colors text-white text-sm font-medium">
              + Add Nest
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Total Saved" value={fmtCurrency(totalSaved)} sub={`of ${fmtCurrency(totalGoals)}`} />
        <StatCard label="Active Nests" value={`${nests.length}`} sub="Savings goals" />
        <StatCard label="Monthly Auto" value={fmtCurrency(nests.reduce((a, n) => {
          const mult = n.frequency === 'Daily' ? 30 : n.frequency === 'Weekly' ? 4.3 : n.frequency === 'Biweekly' ? 2.15 : 1;
          return a + n.autoAmount * mult;
        }, 0))} sub="Auto-contributions" />
        <StatCard label="Completion" value={`${overallPct}%`} sub="Overall progress" accent="text-brand-teal" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="celebration">
            Hawaii Trip is 45% funded &mdash; at current pace you will get there by October! Keep those auto-contributions flowing.
          </AdvisorTip>
          <AdvisorTip type="tip">
            Naming your savings goals makes them real. Your <LearnTooltip term="Sinking Fund"><span>sinking funds</span></LearnTooltip> are the engine that powers guilt-free spending.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Nest Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nests.map((nest) => (
          <Card key={nest.name}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">{nest.name}</h3>
              <Badge variant={pct(nest.current, nest.goal) >= 70 ? 'success' : pct(nest.current, nest.goal) >= 40 ? 'info' : 'warning'}>
                {pct(nest.current, nest.goal)}%
              </Badge>
            </div>
            <ProgressBar value={nest.current} max={nest.goal} />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs tabular-nums text-[var(--text-secondary)]">{fmtCurrency(nest.current)}</span>
              <span className="text-xs tabular-nums text-[var(--text-muted)]">{fmtCurrency(nest.goal)}</span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              Auto: {fmtCurrency(nest.autoAmount)} {nest.frequency.toLowerCase()}
            </p>
          </Card>
        ))}
      </section>

      {/* Growth Projection + Contributions */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Growth Projection</h2>
          <LineChart
            data={growthProjection}
            height={220}
            color="#0a8ebc"
          />
        </Card>

        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Recent Contributions</h2>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {contributions.map((c, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 min-h-[44px]">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{c.nest}</p>
                  <p className="text-xs text-[var(--text-muted)]">{c.date} - {c.type}</p>
                </div>
                <span className="text-sm font-semibold tabular-nums text-brand-green">+{fmtCurrency(c.amount)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    
      {/* QUICK TIP */}
      <QuickTip page="nests" />
    </div>
  );
}
