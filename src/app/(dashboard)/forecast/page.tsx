'use client';

import { nwHistory, projectedSavings, actualSavings, cashFlow, savingsRateHistory } from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import AreaChart from '@/components/AreaChart';
import Badge from '@/components/Badge';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';
import AdvisorTip from '@/components/AdvisorTip';
import NetWorthTimeline from '@/components/NetWorthTimeline';
import CountUp from '@/components/CountUp';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';

// Projections
const currentNW = nwHistory[nwHistory.length - 1].v;
const monthlyGrowth = (nwHistory[nwHistory.length - 1].v - nwHistory[0].v) / 11;
const projected3m = currentNW + monthlyGrowth * 3;
const projected6m = currentNW + monthlyGrowth * 6;
const projected12m = currentNW + monthlyGrowth * 12;

const avgIncome = cashFlow.reduce((a, c) => a + c.inc, 0) / cashFlow.length;
const avgExpense = cashFlow.reduce((a, c) => a + c.exp, 0) / cashFlow.length;
const avgSavings = avgIncome - avgExpense;
const avgSavingsRate = savingsRateHistory.reduce((a, s) => a + s.r, 0) / savingsRateHistory.length;

// Build projection data
const projectionMonths = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const optimistic = projectionMonths.map((m, i) => ({
  label: m,
  value: Math.round(currentNW + (monthlyGrowth * 1.2) * (i + 1)),
}));
const baseline = projectionMonths.map((m, i) => ({
  label: m,
  value: Math.round(currentNW + monthlyGrowth * (i + 1)),
}));
const conservative = projectionMonths.map((m, i) => ({
  label: m,
  value: Math.round(currentNW + (monthlyGrowth * 0.7) * (i + 1)),
}));

export default function ForecastPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Financial Forecast</h1>
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-brand-teal-dark to-brand-gold p-6 md:p-8 shadow-lg shadow-brand-navy/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">
                <LearnTooltip term="Compound Interest">
                  <span>Financial Forecast</span>
                </LearnTooltip>
              </p>
              <p className="text-4xl md:text-5xl font-black tabular-nums text-white">
                <CountUp value={projected12m} prefix="$" />
              </p>
              <p className="mt-2 text-sm text-white/50">
                Projected net worth in 12 months (+{fmtCurrency(projected12m - currentNW)})
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/50">Monthly Growth</p>
              <p className="text-2xl font-bold tabular-nums text-emerald-300">+{fmtCurrency(monthlyGrowth)}</p>
              <p className="text-xs text-white/40">avg per month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Current NW" value={fmtCurrency(currentNW)} accent="text-brand-teal" />
        <StatCard
          label="3-Month Projection"
          value={fmtCurrency(projected3m)}
          trend="up"
          trendLabel={`+${fmtCurrency(projected3m - currentNW)}`}
          accent="text-brand-green"
        />
        <StatCard
          label="6-Month Projection"
          value={fmtCurrency(projected6m)}
          trend="up"
          trendLabel={`+${fmtCurrency(projected6m - currentNW)}`}
        />
        <StatCard
          label="12-Month Projection"
          value={fmtCurrency(projected12m)}
          trend="up"
          trendLabel={`+${fmtCurrency(projected12m - currentNW)}`}
        />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="insight">
            At current pace, you will cross $100K <LearnTooltip term="Net Worth"><span>net worth</span></LearnTooltip> by March 2027 &mdash; small changes today compound dramatically.
          </AdvisorTip>
          <AdvisorTip type="tip">
            Applying bill audit savings of $147/mo adds $1,764/yr to your net worth. That is the highest-impact action available.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* NW Projections */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
          Net Worth Projection (3 Scenarios)
        </h2>
        <AreaChart
          labels={projectionMonths}
          series={[
            { label: 'Optimistic', color: '#2d8f5e', data: optimistic.map((d) => d.value) },
            { label: 'Baseline', color: '#0a8ebc', data: baseline.map((d) => d.value) },
            { label: 'Conservative', color: '#d4a843', data: conservative.map((d) => d.value) },
          ]}
          height={240}
        />
      </Card>

      {/* Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Projection */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Cash Flow Averages
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-[var(--text-secondary)]">Avg Monthly Income</span>
              <span className="text-sm font-semibold tabular-nums text-brand-green">{fmtCurrency(avgIncome)}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[var(--border-color)]">
              <span className="text-sm text-[var(--text-secondary)]">Avg Monthly Expenses</span>
              <span className="text-sm font-semibold tabular-nums text-brand-red">{fmtCurrency(avgExpense)}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[var(--border-color)]">
              <span className="text-sm text-[var(--text-secondary)]">Avg Monthly Savings</span>
              <span className="text-sm font-semibold tabular-nums text-brand-teal">{fmtCurrency(avgSavings)}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[var(--border-color)]">
              <span className="text-sm text-[var(--text-secondary)]">Avg Savings Rate</span>
              <span className="text-sm font-semibold tabular-nums text-brand-teal">{avgSavingsRate.toFixed(1)}%</span>
            </div>
          </div>
        </Card>

        {/* Cumulative Savings */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
            Savings Trajectory (Actual vs Projected)
          </h2>
          <AreaChart
            labels={[...actualSavings.map((a) => a.m), ...projectedSavings.slice(0, 4).map((p) => p.m)]}
            series={[
              {
                label: 'Actual',
                color: '#0a8ebc',
                data: [...actualSavings.map((a) => a.v), ...projectedSavings.slice(0, 4).map(() => 0)],
              },
              {
                label: 'Projected',
                color: '#2d8f5e',
                data: [
                  ...actualSavings.map(() => 0),
                  ...projectedSavings.slice(0, 4).map((p) => p.proj),
                ],
              },
            ]}
            height={200}
          />
        </Card>
      </div>

      {/* Milestones */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Upcoming Milestones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { goal: 'Emergency Fund Full', target: '$5,000', eta: 'June 2026', progress: 72 },
            { goal: 'Hawaii Vacation', target: '$4,000', eta: 'October 2026', progress: 45 },
            { goal: 'Net Worth $100k', target: '$100,000', eta: 'March 2027', progress: 82 },
            { goal: 'Debt Free', target: '$0 debt', eta: 'December 2026', progress: 65 },
            { goal: 'New Car Fund', target: '$8,000', eta: 'February 2027', progress: 10 },
            { goal: 'College Fund $5k', target: '$5,000', eta: 'August 2027', progress: 9 },
          ].map((milestone, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]"
            >
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">{milestone.goal}</h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Target: {milestone.target} - ETA: {milestone.eta}
              </p>
              <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[var(--text-secondary)]">Progress</span>
                  <span className="tabular-nums font-medium text-[var(--text-primary)]">
                    {milestone.progress}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden bg-[var(--border-color)]">
                  <div
                    className="h-full rounded-full bg-brand-teal transition-all duration-500"
                    style={{ width: `${milestone.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Recommendations</h2>
        <div className="space-y-3">
          {[
            {
              action: 'Apply bill audit savings of $147/mo',
              impact: '+$1,764/yr to net worth',
              badge: 'High Impact',
              variant: 'success' as const,
            },
            {
              action: 'Drop 3 unused subscriptions ($62/mo)',
              impact: '+$744/yr to savings',
              badge: 'Quick Win',
              variant: 'info' as const,
            },
            {
              action: 'Increase daily auto-save by $5',
              impact: '+$1,825/yr to emergency fund',
              badge: 'Steady Growth',
              variant: 'success' as const,
            },
            {
              action: 'Reconnect Cap One Savings (47 days stale)',
              impact: 'Accurate net worth tracking',
              badge: 'Action Needed',
              variant: 'warning' as const,
            },
            {
              action: 'Reduce dining out by $50/mo',
              impact: '+$600/yr, budget stays on track',
              badge: 'Moderate',
              variant: 'info' as const,
            },
          ].map((rec, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-[var(--border-color)] min-h-[44px]">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[var(--text-primary)]">{rec.action}</span>
                <Badge variant={rec.variant}>{rec.badge}</Badge>
              </div>
              <span className="text-xs tabular-nums text-[var(--text-secondary)] whitespace-nowrap ml-3">{rec.impact}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* NET WORTH MILESTONES TIMELINE */}
      <NetWorthTimeline />

      {/* QUICK TIP */}
      <QuickTip page="forecast" />
    </div>
  );
}
