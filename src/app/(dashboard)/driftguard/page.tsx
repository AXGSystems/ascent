'use client';

import { driftIndicators, driftHistoryData } from '@/lib/data';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import AreaChart from '@/components/AreaChart';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';
import AdvisorTip from '@/components/AdvisorTip';
import CountUp from '@/components/CountUp';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';

const driftRate = 28;
const prevDriftRate = 22;
const latestData = driftHistoryData[driftHistoryData.length - 1];
const spendGap = latestData.spendingGrowth - latestData.incomeGrowth;

export default function DriftGuardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-orange-600 to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-amber-600/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">DriftGuard</p>
              <h1 className="sr-only">DriftGuard — Lifestyle Inflation Warning</h1>
              <p className="text-3xl md:text-4xl font-black text-white">Lifestyle Inflation Warning</p>
              <p className="mt-2 text-sm text-white/70">Detecting spending drift before it derails your goals.</p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-xs text-white/50 mb-1">Drift Rate</p>
              <p className="text-6xl font-black tabular-nums text-white"><CountUp value={driftRate} suffix="%" /></p>
              <p className="text-sm text-red-300 font-medium mt-1">
                {'\u25B2'} +{driftRate - prevDriftRate}% vs last quarter
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Drift Rate" value={`${driftRate}%`} trend="up" trendLabel="+6% vs Q4" accent="text-brand-gold" />
        <StatCard label="Income Growth" value={`${latestData.incomeGrowth}%`} sub="Year over year" accent="text-brand-green" />
        <StatCard label="Spending Growth" value={`${latestData.spendingGrowth}%`} sub="Year over year" accent="text-brand-red" />
        <StatCard label="Spend Gap" value={`${spendGap}%`} sub="Spending outpacing income" trend="up" trendLabel="Warning" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="warning">
            Lifestyle <LearnTooltip term="Inflation"><span>inflation</span></LearnTooltip> is the silent wealth killer. Your spending is growing {spendGap}% faster than your income &mdash; time to course correct.
          </AdvisorTip>
          <AdvisorTip type="tip">
            Set a lifestyle cap: limit spending growth to your income growth rate. Automate savings increases every time you get a raise.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Income vs Spending Growth Chart */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Income vs Spending Growth</h2>
            <AreaChart
              labels={driftHistoryData.map((d) => d.m)}
              series={[
                { label: 'Income Growth %', color: '#2d8f5e', data: driftHistoryData.map((d) => d.incomeGrowth) },
                { label: 'Spending Growth %', color: '#c0392b', data: driftHistoryData.map((d) => d.spendingGrowth) },
              ]}
              height={220}
              formatValue={(v) => `${v}%`}
            />
          </Card>

          {/* Drift Rate Gauge */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Drift Rate Gauge</h2>
            <div className="flex flex-col items-center py-4">
              <div className="relative w-48 h-24 overflow-hidden">
                <svg viewBox="0 0 200 100" className="w-full h-full" aria-hidden="true">
                  <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="var(--border-color)" strokeWidth="16" strokeLinecap="round" />
                  <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="url(#drift-gradient)" strokeWidth="16" strokeLinecap="round" strokeDasharray={`${driftRate * 2.82} 282`} />
                  <defs>
                    <linearGradient id="drift-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2d8f5e" />
                      <stop offset="50%" stopColor="#d4a843" />
                      <stop offset="100%" stopColor="#c0392b" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="text-3xl font-black tabular-nums text-[var(--text-primary)] -mt-4">{driftRate}%</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">0% = No drift | 100% = Severe inflation</p>
              <div className="flex gap-4 mt-4 text-xs">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-green" />Safe (&lt;20%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-gold" />Caution (20-40%)</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-red" />Alert (&gt;40%)</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Drift Indicators */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Drift Indicators</h2>
            <div className="space-y-4">
              {driftIndicators.map((indicator) => (
                <div key={indicator.label} className="p-3 rounded-xl border border-[var(--border-color)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[var(--text-primary)]">{indicator.label}</span>
                    <Badge variant={indicator.changePercent > 40 ? 'danger' : indicator.changePercent > 20 ? 'warning' : 'success'}>
                      +{indicator.changePercent}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[var(--text-muted)]">Then: </span>
                      <span className="font-semibold text-[var(--text-secondary)]">{indicator.previous}</span>
                    </div>
                    <span className="text-[var(--text-muted)]">{'\u2192'}</span>
                    <div>
                      <span className="text-[var(--text-muted)]">Now: </span>
                      <span className="font-semibold text-[var(--text-primary)]">{indicator.current}</span>
                    </div>
                  </div>
                  <ProgressBar value={indicator.changePercent} max={100} height="h-1" warning={indicator.changePercent > 20} over={indicator.changePercent > 40} />
                </div>
              ))}
            </div>
          </Card>

          {/* Recommendations */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Drift Reduction Tips</h2>
            <div className="space-y-2">
              {[
                'Set a "lifestyle cap" — limit spending growth to income growth rate',
                'Review subscriptions monthly — you added 4 new ones this year',
                'Use the 48-hour rule for purchases over $75',
                'Automate savings increases when income rises',
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg text-xs text-[var(--text-secondary)]">
                  <span className="text-brand-teal font-bold shrink-0">{i + 1}.</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    
      {/* QUICK TIP */}
      <QuickTip page="driftguard" />
    </div>
  );
}
