'use client';

import { investmentFees } from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';

const totalPortfolio = 26500;
const totalAnnualCost = investmentFees.reduce((a, f) => a + f.annualCost, 0);
const displayAvg = 0.42; // weighted by balance, not cost

const feeDragProjection = [
  { years: 7, current: 1505, lowCost: 557 },
  { years: 15, current: 3420, lowCost: 1195 },
  { years: 30, current: 7840, lowCost: 2390 },
];

const recommendations = [
  { current: 'Ally Growth Fund (0.85%)', suggested: 'VTI Total Market ETF (0.03%)', annualSave: 120 },
  { current: 'Ally REIT Fund (0.48%)', suggested: 'VNQ REIT ETF (0.12%)', annualSave: 28 },
];

function verdictColor(verdict: 'good' | 'ok' | 'high'): 'success' | 'warning' | 'danger' {
  if (verdict === 'good') return 'success';
  if (verdict === 'ok') return 'warning';
  return 'danger';
}

export default function FeesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Fee Analyzer</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">Weighted Avg Expense Ratio</p>
            <p className="text-4xl md:text-5xl font-black tabular-nums text-white">{displayAvg}%</p>
            <p className="mt-2 text-sm text-white/60">{fmtCurrency(totalAnnualCost)}/yr in fees across {investmentFees.length} funds</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Avg Ratio" value={`${displayAvg}%`} sub="Weighted average" />
        <StatCard label="Annual Cost" value={fmtCurrency(totalAnnualCost)} sub="Total fees/yr" />
        <StatCard label="Portfolio" value={fmtCurrency(totalPortfolio)} sub="Total invested" />
        <StatCard label="Potential Save" value={fmtCurrency(148)} accent="text-brand-green" sub="Switch to low-cost" />
      </section>

      {/* Fund Table */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Fund-Level Fees</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Fund</th>
                <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Type</th>
                <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Expense Ratio</th>
                <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Benchmark</th>
                <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Annual Cost</th>
                <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Verdict</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {investmentFees.map((f) => (
                <tr key={f.account}>
                  <td className="py-3 font-medium text-[var(--text-primary)]">{f.account}</td>
                  <td className="py-3 text-[var(--text-secondary)]">{f.type}</td>
                  <td className="py-3 text-right tabular-nums text-[var(--text-primary)]">{f.rate}%</td>
                  <td className="py-3 text-right tabular-nums text-[var(--text-muted)]">{f.benchmark}%</td>
                  <td className="py-3 text-right tabular-nums font-semibold text-[var(--text-primary)]">{fmtCurrency(f.annualCost)}</td>
                  <td className="py-3 text-right"><Badge variant={verdictColor(f.verdict)}>{f.verdict}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Fee Drag + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fee Drag Projection */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Fee Drag Projection</h2>
          <div className="space-y-4">
            {feeDragProjection.map((p) => (
              <div key={p.years}>
                <p className="text-sm font-medium text-[var(--text-primary)] mb-1">{p.years}-Year Projection</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-brand-red/5 border border-brand-red/10">
                    <p className="text-[10px] uppercase text-[var(--text-muted)]">Current Fees</p>
                    <p className="text-lg font-bold tabular-nums text-brand-red">{fmtCurrency(p.current)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-brand-green/5 border border-brand-green/10">
                    <p className="text-[10px] uppercase text-[var(--text-muted)]">Low-Cost Alt</p>
                    <p className="text-lg font-bold tabular-nums text-brand-green">{fmtCurrency(p.lowCost)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recommendations */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Recommendations</h2>
          <div className="space-y-4">
            {recommendations.map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-[var(--border-color)]/50 space-y-2">
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Current</p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{r.current}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-brand-teal text-xs">&#8594;</span>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Switch to</p>
                    <p className="text-sm font-medium text-brand-teal">{r.suggested}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-brand-green">Save {fmtCurrency(r.annualSave)}/yr</p>
              </div>
            ))}
            <div className="pt-3 border-t border-[var(--border-color)]">
              <p className="text-sm font-bold text-brand-green">Total potential savings: {fmtCurrency(recommendations.reduce((a, r) => a + r.annualSave, 0))}/yr</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
