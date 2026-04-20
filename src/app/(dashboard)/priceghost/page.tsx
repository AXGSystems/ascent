'use client';

import { priceCreepItems } from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Sparkline from '@/components/Sparkline';
import Badge from '@/components/Badge';

const totalCreep = priceCreepItems.reduce((a, s) => a + (s.currentPrice - s.originalPrice), 0);
const annualOverpay = totalCreep * 12;
const avgIncrease = Math.round(
  priceCreepItems.filter((s) => s.increasePercent > 0).reduce((a, s) => a + s.increasePercent, 0) /
  priceCreepItems.filter((s) => s.increasePercent > 0).length
);
const worstOffender = priceCreepItems.sort((a, b) => b.increasePercent - a.increasePercent)[0];

export default function PriceGhostPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-600 via-slate-700 to-brand-navy p-6 md:p-8 shadow-lg shadow-slate-600/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">PriceGhost</p>
              <h1 className="sr-only">PriceGhost — Subscription Price Creep Detector</h1>
              <p className="text-3xl md:text-4xl font-black text-white">Subscription Price Creep</p>
              <p className="mt-2 text-sm text-white/70">Tracking silent price increases across {priceCreepItems.length} subscriptions.</p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-xs text-white/50 mb-1">Monthly Creep</p>
              <p className="text-5xl font-black tabular-nums text-white">{fmtCurrency(totalCreep)}</p>
              <p className="text-sm text-red-300 font-medium mt-1">Extra per month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Monthly Creep" value={fmtCurrency(totalCreep)} sub="vs original prices" accent="text-brand-red" />
        <StatCard label="Annual Overpay" value={fmtCurrency(annualOverpay)} sub="Total extra per year" accent="text-brand-red" />
        <StatCard label="Avg Increase" value={`${avgIncrease}%`} sub="Across all subs" />
        <StatCard label="Worst Offender" value={worstOffender.name} sub={`+${worstOffender.increasePercent}%`} accent="text-brand-red" />
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Subscription Price Table */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-base font-bold text-[var(--text-primary)]">Price History</h2>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {priceCreepItems.map((item) => (
                <div key={item.name} className="flex items-center gap-4 px-5 py-3 min-h-[56px]">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{item.name}</p>
                      {item.increasePercent > 30 && <Badge variant="danger">+{item.increasePercent}%</Badge>}
                      {item.increasePercent > 0 && item.increasePercent <= 30 && <Badge variant="warning">+{item.increasePercent}%</Badge>}
                      {item.increasePercent === 0 && <Badge variant="success">Stable</Badge>}
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">{item.category} - Since {item.startDate}</p>
                  </div>
                  <div className="shrink-0 w-16">
                    <Sparkline data={item.priceHistory} width={64} height={24} color={item.increasePercent > 30 ? '#c0392b' : '#d4a843'} />
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs line-through text-[var(--text-muted)]">{fmtCurrency(item.originalPrice)}</p>
                    <p className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">{fmtCurrency(item.currentPrice)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Annual Impact */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Annual Impact</h2>
            <div className="text-center py-4">
              <p className="text-4xl font-black tabular-nums text-brand-red">{fmtCurrency(annualOverpay)}</p>
              <p className="text-sm text-[var(--text-muted)] mt-2">Extra you pay per year due to price creep</p>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-brand-red/5 border border-brand-red/20">
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                If invested at 7% annual return, this {fmtCurrency(annualOverpay)}/yr becomes <strong className="text-[var(--text-primary)]">{fmtCurrency(annualOverpay * 14.78)}</strong> in 10 years.
              </p>
            </div>
          </Card>

          {/* Dispute Templates */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Dispute Actions</h2>
            <div className="space-y-3">
              {priceCreepItems
                .filter((s) => s.increasePercent > 20)
                .slice(0, 5)
                .map((item) => (
                  <div key={item.name} className="p-3 rounded-xl border border-[var(--border-color)]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[var(--text-primary)]">{item.name}</span>
                      <span className="text-xs tabular-nums text-brand-red font-semibold">+{fmtCurrency(item.currentPrice - item.originalPrice)}/mo</span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mb-2">
                      Price increased {item.increasePercent}% since {item.startDate}
                    </p>
                    <button
                      type="button"
                      className="w-full py-2 text-xs font-semibold rounded-lg bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 transition-colors"
                    >
                      Generate Dispute Template
                    </button>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
