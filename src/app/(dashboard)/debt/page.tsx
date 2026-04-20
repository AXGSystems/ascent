'use client';

import { debtAccounts } from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import LineChart from '@/components/LineChart';

const totalDebt = debtAccounts.reduce((a, d) => a + d.balance, 0);
const totalMinPayment = debtAccounts.reduce((a, d) => a + d.minPayment, 0);
const weightedRate = debtAccounts.reduce((a, d) => a + d.rate * d.balance, 0) / totalDebt;

// Avalanche: highest rate first
const avalanche = [...debtAccounts].sort((a, b) => b.rate - a.rate);
// Snowball: lowest balance first
const snowball = [...debtAccounts].sort((a, b) => a.balance - b.balance);

// Simplified payoff timeline (months)
const payoffTimeline = [
  { label: 'Now', value: totalDebt },
  { label: '6mo', value: totalDebt - totalMinPayment * 6 },
  { label: '12mo', value: Math.max(0, totalDebt - totalMinPayment * 12) },
  { label: '18mo', value: Math.max(0, totalDebt - totalMinPayment * 18) },
  { label: '24mo', value: Math.max(0, totalDebt - totalMinPayment * 24) },
  { label: '30mo', value: Math.max(0, totalDebt - totalMinPayment * 30) },
  { label: '36mo', value: 0 },
];

const extraPaymentScenarios = [
  { extra: 0, months: 33, interest: 4200, label: 'Min Only' },
  { extra: 100, months: 27, interest: 3400, label: '+$100/mo' },
  { extra: 200, months: 23, interest: 2800, label: '+$200/mo' },
  { extra: 500, months: 16, interest: 1900, label: '+$500/mo' },
];

export default function DebtPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Debt Plan</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">Total Debt</p>
            <p className="text-4xl md:text-5xl font-bold tabular-nums text-white">{fmtCurrency(totalDebt)}</p>
            <p className="mt-2 text-sm text-white/60">{debtAccounts.length} accounts - {weightedRate.toFixed(1)}% weighted avg rate</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Debt" value={fmtCurrency(totalDebt)} sub={`${debtAccounts.length} accounts`} />
        <StatCard label="Min Payment" value={fmtCurrency(totalMinPayment)} sub="Per month" />
        <StatCard label="Avg Rate" value={`${weightedRate.toFixed(1)}%`} accent="text-brand-red" sub="Weighted average" />
        <StatCard label="Payoff Est." value="~33 mo" sub="At minimum payments" />
      </section>

      {/* Debt Table */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Debt Accounts</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Account</th>
                <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Type</th>
                <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Balance</th>
                <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Rate</th>
                <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Min Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {debtAccounts.map((d) => (
                <tr key={d.name}>
                  <td className="py-3 font-medium text-[var(--text-primary)]">{d.name}</td>
                  <td className="py-3 text-[var(--text-secondary)]">{d.type}</td>
                  <td className="py-3 text-right tabular-nums font-semibold text-[var(--text-primary)]">{fmtCurrency(d.balance)}</td>
                  <td className="py-3 text-right tabular-nums text-brand-red">{d.rate}%</td>
                  <td className="py-3 text-right tabular-nums text-[var(--text-secondary)]">{fmtCurrency(d.minPayment)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Strategy Comparison + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Avalanche vs Snowball */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Strategy Comparison</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-[var(--text-muted)] mb-2">Avalanche (Rate)</p>
              {avalanche.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 py-1.5">
                  <span className="text-xs font-bold text-brand-teal w-5">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-[var(--text-primary)]">{d.name}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{d.rate}% APR</p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-[var(--text-muted)] mt-2">Saves the most in interest</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-[var(--text-muted)] mb-2">Snowball (Balance)</p>
              {snowball.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 py-1.5">
                  <span className="text-xs font-bold text-brand-gold w-5">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-[var(--text-primary)]">{d.name}</p>
                    <p className="text-[10px] text-[var(--text-muted)]">{fmtCurrency(d.balance)}</p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-[var(--text-muted)] mt-2">Fastest psychological wins</p>
            </div>
          </div>
        </Card>

        {/* Payoff Timeline */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Payoff Timeline</h2>
          <LineChart data={payoffTimeline} height={200} color="#c0392b" />
        </Card>
      </div>

      {/* Extra Payment Calculator */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Extra Payment Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {extraPaymentScenarios.map((s) => (
            <div key={s.label} className="text-center p-4 rounded-xl bg-[var(--border-color)]/50">
              <p className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-1">{s.label}</p>
              <p className="text-2xl font-bold tabular-nums text-[var(--text-primary)]">{s.months}<span className="text-sm font-normal text-[var(--text-muted)]"> mo</span></p>
              <p className="text-xs text-[var(--text-muted)] mt-1">~{fmtCurrency(s.interest)} interest</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
