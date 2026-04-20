'use client';

import {
  moneyMindSegments,
  topRegretPurchases,
  categoryRegretRates,
  impulseScoreTrend,
} from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import DonutChart from '@/components/DonutChart';
import Sparkline from '@/components/Sparkline';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';

const impulseScore = impulseScoreTrend[impulseScoreTrend.length - 1];
const prevImpulse = impulseScoreTrend[impulseScoreTrend.length - 2];
const totalRegretSpend = topRegretPurchases.reduce((a, p) => a + p.amount, 0);
const avgRegretRate = Math.round(
  categoryRegretRates.reduce((a, c) => a + c.regretRate, 0) / categoryRegretRates.length
);

export default function MoneyMindPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-purple-600/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">MoneyMind</p>
              <h1 className="sr-only">MoneyMind — Behavioral Spending Autopsy</h1>
              <p className="text-3xl md:text-4xl font-black text-white">Behavioral Spending Autopsy</p>
              <p className="mt-2 text-sm text-white/70">Understand the emotions behind every dollar you spend.</p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-xs text-white/50 mb-1">Impulse Score</p>
              <p className="text-5xl font-black tabular-nums text-white">{impulseScore}</p>
              <p className="text-sm text-emerald-300 font-medium mt-1">
                {impulseScore < prevImpulse ? '\u25BC' : '\u25B2'} {Math.abs(impulseScore - prevImpulse)} pts vs last month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Impulse Score" value={`${impulseScore}/100`} trend="down" trendLabel="Lower is better" accent="text-brand-green" />
        <StatCard label="Regret Spend" value={fmtCurrency(totalRegretSpend)} sub="This month" accent="text-brand-red" />
        <StatCard label="Avg Regret Rate" value={`${avgRegretRate}%`} sub="Across categories" />
        <StatCard label="Joy Purchases" value="5%" sub="Could be higher" accent="text-purple-500" />
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Regret Donut */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Spending by Emotion</h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <DonutChart
                segments={moneyMindSegments.map((s) => ({
                  label: s.label,
                  value: s.value,
                  color: s.color,
                }))}
                size={160}
                centerLabel="Breakdown"
                centerValue="100%"
                showLegend={false}
              />
              <div className="flex-1 w-full space-y-3">
                {moneyMindSegments.map((seg) => (
                  <div key={seg.label}>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                        {seg.label}
                      </span>
                      <span className="text-xs tabular-nums text-[var(--text-muted)]">{seg.value}%</span>
                    </div>
                    <ProgressBar value={seg.value} max={100} height="h-1.5" />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Top Regretted Purchases */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-base font-bold text-[var(--text-primary)]">Top Regretted Purchases</h2>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {topRegretPurchases.map((p) => (
                <div key={`${p.name}-${p.date}`} className="flex items-center justify-between px-5 py-3 min-h-[44px]">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">{p.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{p.category} - {p.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">{fmtCurrency(p.amount)}</span>
                    <Badge variant={p.regretScore >= 80 ? 'danger' : p.regretScore >= 60 ? 'warning' : 'default'}>
                      {p.regretScore}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Impulse Score Trend */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Impulse Score Trend</h2>
            <p className="text-xs text-[var(--text-muted)] mb-3">Lower is better — you are improving!</p>
            <Sparkline data={impulseScoreTrend} width={320} height={80} color="#8b5cf6" />
          </Card>

          {/* Category Regret Rates */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Category Regret Rates</h2>
            <div className="space-y-4">
              {categoryRegretRates.map((cat) => (
                <div key={cat.category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-[var(--text-secondary)]">{cat.category}</span>
                    <span className="text-xs tabular-nums font-semibold text-[var(--text-primary)]">{cat.regretRate}%</span>
                  </div>
                  <ProgressBar
                    value={cat.regretRate}
                    max={100}
                    color={cat.regretRate >= 40 ? 'bg-brand-red' : cat.regretRate >= 25 ? 'bg-brand-gold' : 'bg-brand-green'}
                    height="h-1.5"
                  />
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Avg purchase: {fmtCurrency(cat.avgAmount)}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Pre-Purchase Nudge Settings */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Pre-Purchase Nudges</h2>
            <div className="space-y-3">
              {[
                { label: 'Impulse purchase alert', desc: 'Warn when spending pattern suggests impulse', on: true },
                { label: '24-hour cooling period', desc: 'Delay non-essential purchases over $50', on: true },
                { label: 'Budget impact preview', desc: 'Show remaining budget before purchase', on: false },
                { label: 'Regret probability', desc: 'Display predicted regret score', on: true },
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
    </div>
  );
}
