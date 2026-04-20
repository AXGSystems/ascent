'use client';

import { incomeShieldMonths, incomeSourceReliability } from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
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

const baseline = 7080;
const stabilityScore = 78;
const bufferMonths = 2.1;
const avgActual = Math.round(incomeShieldMonths.reduce((a, m) => a + m.actual, 0) / incomeShieldMonths.length);

export default function IncomeShieldPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-600 via-cyan-600 to-brand-navy p-6 md:p-8 shadow-lg shadow-teal-600/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1"><LearnTooltip term="Cash Flow"><span>IncomeShield</span></LearnTooltip></p>
              <h1 className="sr-only">IncomeShield — Variable Income Stabilizer</h1>
              <p className="text-3xl md:text-4xl font-black text-white">Variable Income Stabilizer</p>
              <p className="mt-2 text-sm text-white/70">Smooth out income volatility and protect your budget.</p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-xs text-white/50 mb-1">Income Stability Score</p>
              <p className="text-5xl font-black tabular-nums text-white"><CountUp value={stabilityScore} /></p>
              <p className="text-sm text-white/60 mt-1">out of 100</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Stability Score" value={`${stabilityScore}/100`} sub="Good stability" accent="text-brand-teal" />
        <StatCard label="Buffer Status" value={`${bufferMonths} mo`} sub="Income buffer secured" accent="text-brand-green" />
        <StatCard label="Baseline Income" value={fmtCurrency(baseline)} sub="Monthly target" />
        <StatCard label="Avg Actual" value={fmtCurrency(avgActual)} sub="12-month average" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="tip">
            Income volatility is normal with freelance work. A {bufferMonths}-month buffer is good &mdash; build to 3 months to fully smooth out uneven periods.
          </AdvisorTip>
          <AdvisorTip type="insight">
            Stability score is {stabilityScore}/100. Your ALTA salary anchors reliability while freelance adds growth potential. A strong combo.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Baseline vs Actual Chart */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Baseline vs Actual Income</h2>
            <AreaChart
              labels={incomeShieldMonths.map((m) => m.m)}
              series={[
                { label: 'Baseline', color: '#0a8ebc', data: incomeShieldMonths.map((m) => m.baseline) },
                { label: 'Actual', color: '#2d8f5e', data: incomeShieldMonths.map((m) => m.actual) },
              ]}
              height={240}
            />
          </Card>

          {/* Income Source Reliability */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Income Source Reliability</h2>
            <div className="space-y-4">
              {incomeSourceReliability.map((source) => (
                <div key={source.source}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[var(--text-primary)]">{source.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs tabular-nums text-[var(--text-muted)]">{fmtCurrency(source.avgAmount)}/mo</span>
                      <Badge variant={source.reliability >= 90 ? 'success' : source.reliability >= 60 ? 'warning' : 'danger'}>
                        {source.reliability}%
                      </Badge>
                    </div>
                  </div>
                  <ProgressBar
                    value={source.reliability}
                    max={100}
                    height="h-1.5"
                    color={source.reliability >= 90 ? 'bg-brand-green' : undefined}
                    warning={source.reliability >= 60 && source.reliability < 90}
                    over={source.reliability < 60}
                  />
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                    Variance: {'\u00B1'}{source.variance}%
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Buffer Status Gauge */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Buffer Status</h2>
            <div className="text-center py-4">
              <div className="relative inline-block">
                <svg viewBox="0 0 120 120" width={160} height={160} aria-hidden="true">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="var(--border-color)" strokeWidth="10" />
                  <circle
                    cx="60" cy="60" r="50" fill="none"
                    stroke="#2d8f5e" strokeWidth="10"
                    strokeDasharray={`${(bufferMonths / 3) * 314} 314`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                  <text x="60" y="55" textAnchor="middle" fontSize="22" fontWeight="bold" fill="var(--text-primary)">{bufferMonths}</text>
                  <text x="60" y="72" textAnchor="middle" fontSize="10" fill="var(--text-muted)">months</text>
                </svg>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-2">Target: 3 months of expenses buffered</p>
              <ProgressBar value={bufferMonths} max={3} color="bg-brand-green" height="h-2" showLabel />
            </div>
          </Card>

          {/* Surplus Routing */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Surplus Routing</h2>
            <p className="text-xs text-[var(--text-muted)] mb-3">When income exceeds baseline, surplus is routed to:</p>
            <div className="space-y-3">
              {[
                { label: 'Income Buffer', percent: 40, desc: 'Build up to 3-month buffer' },
                { label: 'Emergency Fund', percent: 30, desc: 'Boost emergency savings' },
                { label: 'Debt Payoff', percent: 20, desc: 'Extra debt payments' },
                { label: 'Fun Money', percent: 10, desc: 'Guilt-free spending' },
              ].map((route) => (
                <div key={route.label} className="flex items-center justify-between py-2 border-b border-[var(--border-color)] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{route.label}</p>
                    <p className="text-xs text-[var(--text-muted)]">{route.desc}</p>
                  </div>
                  <span className="text-sm font-bold tabular-nums text-[var(--text-primary)]">{route.percent}%</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Alert Settings */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Alerts</h2>
            <div className="space-y-3">
              {[
                { label: 'Below-baseline alert', desc: 'Notify when income drops below baseline', on: true },
                { label: 'Buffer depletion', desc: 'Alert when buffer falls below 1 month', on: true },
                { label: 'Surplus detected', desc: 'Notify when extra income arrives', on: false },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{setting.label}</p>
                    <p className="text-xs text-[var(--text-muted)]">{setting.desc}</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-colors ${setting.on ? 'bg-brand-teal justify-end' : 'bg-[var(--border-color)] justify-start'}`}>
                    <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    
      {/* QUICK TIP */}
      <QuickTip page="incomeshield" />
    </div>
  );
}
