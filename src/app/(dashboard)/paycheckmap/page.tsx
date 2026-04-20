'use client';

import { paycheckAllocations } from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';

const grossPay = 4280;
const totalAllocated = paycheckAllocations.reduce((a, p) => a + p.amount, 0);

export default function PaycheckMapPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-green via-emerald-600 to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-green/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">PaycheckMap</p>
              <h1 className="sr-only">PaycheckMap — Income Allocation Visualizer</h1>
              <p className="text-3xl md:text-4xl font-black text-white">Income Allocation Visualizer</p>
              <p className="mt-2 text-sm text-white/70">See exactly where your latest paycheck flows.</p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-xs text-white/50 mb-1">Latest Paycheck</p>
              <p className="text-5xl font-black tabular-nums text-white">{fmtCurrency(grossPay)}</p>
              <p className="text-sm text-white/60 mt-1">ALTA Payroll - Apr 11</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {paycheckAllocations.map((alloc) => (
          <StatCard
            key={alloc.label}
            label={alloc.label}
            value={fmtCurrency(alloc.amount)}
            sub={`${alloc.percent}% of paycheck`}
          />
        ))}
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Sankey-style Flow */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Paycheck Flow</h2>
            <div className="relative py-4">
              {/* Source */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-green/10 border border-brand-green/20">
                  <span className="text-sm font-bold text-brand-green">ALTA Payroll</span>
                  <span className="text-lg font-black tabular-nums text-[var(--text-primary)]">{fmtCurrency(grossPay)}</span>
                </div>
              </div>

              {/* Flow bars */}
              <div className="space-y-3">
                {paycheckAllocations.map((alloc) => (
                  <div key={alloc.label} className="group">
                    <div className="flex items-center gap-3">
                      <div className="w-28 text-right shrink-0">
                        <span className="text-xs font-medium text-[var(--text-secondary)]">{alloc.label}</span>
                      </div>
                      <div className="flex-1 relative">
                        <div className="w-full h-8 rounded-lg overflow-hidden bg-[var(--border-color)]">
                          <div
                            className="h-full rounded-lg transition-all duration-700 ease-out flex items-center px-3"
                            style={{ width: `${alloc.percent}%`, backgroundColor: alloc.color }}
                          >
                            <span className="text-xs font-bold text-white whitespace-nowrap">
                              {fmtCurrency(alloc.amount)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="w-12 text-right shrink-0">
                        <span className="text-xs tabular-nums font-semibold text-[var(--text-muted)]">{alloc.percent}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-6 pt-4 border-t-2 border-[var(--border-color)] flex items-center justify-between">
                <span className="text-sm font-bold text-[var(--text-primary)]">Total Allocated</span>
                <span className="text-sm font-bold tabular-nums text-[var(--text-primary)]">{fmtCurrency(totalAllocated)}</span>
              </div>
            </div>
          </Card>

          {/* Detailed Breakdown */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Detailed Breakdown</h2>
            <div className="space-y-4">
              {/* Bills & Housing Detail */}
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Bills & Housing ($2,100)</h3>
                <div className="space-y-2 pl-3 border-l-2 border-[var(--border-color)]">
                  {[
                    { name: 'Mortgage', amount: 2000 },
                    { name: 'Insurance', amount: 184 },
                    { name: 'Electric', amount: 145 },
                    { name: 'Water', amount: 65 },
                    { name: 'Internet', amount: 89 },
                    { name: 'Phone', amount: 140 },
                  ].map((item) => (
                    <div key={item.name} className="flex justify-between text-xs">
                      <span className="text-[var(--text-secondary)]">{item.name}</span>
                      <span className="tabular-nums text-[var(--text-primary)]">{fmtCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Savings Detail */}
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Savings ($650)</h3>
                <div className="space-y-2 pl-3 border-l-2 border-brand-green/30">
                  {[
                    { name: 'Emergency Fund', amount: 300 },
                    { name: 'Hawaii Nest', amount: 175 },
                    { name: 'Auto Round-Ups', amount: 85 },
                    { name: 'College Fund', amount: 90 },
                  ].map((item) => (
                    <div key={item.name} className="flex justify-between text-xs">
                      <span className="text-[var(--text-secondary)]">{item.name}</span>
                      <span className="tabular-nums text-brand-green">{fmtCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Allocation Summary */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Allocation Summary</h2>
            <div className="space-y-4">
              {paycheckAllocations.map((alloc) => (
                <div key={alloc.label}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: alloc.color }} />
                      <span className="text-sm text-[var(--text-secondary)]">{alloc.label}</span>
                    </div>
                    <span className="text-sm tabular-nums font-semibold text-[var(--text-primary)]">{fmtCurrency(alloc.amount)}</span>
                  </div>
                  <ProgressBar value={alloc.percent} max={100} height="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* 50/30/20 Comparison */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">50/30/20 Rule Check</h2>
            <div className="space-y-4">
              {[
                { label: 'Needs (50%)', actual: 49, target: 50, status: 'On target' },
                { label: 'Wants (30%)', actual: 34, target: 30, status: 'Slightly over' },
                { label: 'Savings (20%)', actual: 17, target: 20, status: 'Room to grow' },
              ].map((rule) => (
                <div key={rule.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-[var(--text-secondary)]">{rule.label}</span>
                    <span className="text-xs text-[var(--text-muted)]">{rule.actual}% (target: {rule.target}%)</span>
                  </div>
                  <ProgressBar
                    value={rule.actual}
                    max={100}
                    height="h-2"
                    warning={Math.abs(rule.actual - rule.target) > 3}
                  />
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{rule.status}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Confirm Allocation */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Next Paycheck</h2>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              Your next paycheck on Apr 25 will follow this allocation. Make changes before it arrives.
            </p>
            <button
              type="button"
              className="w-full py-3 rounded-xl bg-brand-teal text-white font-semibold text-sm hover:bg-brand-teal/90 transition-colors"
            >
              Confirm Allocation
            </button>
          </Card>
        </div>
      </section>
    </div>
  );
}
