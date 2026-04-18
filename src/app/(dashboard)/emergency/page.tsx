'use client';

import { fmtCurrency, pct } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import DonutChart from '@/components/DonutChart';
import LineChart from '@/components/LineChart';
import ProgressBar from '@/components/ProgressBar';

const current = 3600;
const monthlyExpenses = 4500;
const targetMonths = 3;
const target = monthlyExpenses * targetMonths;
const coverage = current / monthlyExpenses;

const expenseBreakdown = [
  { label: 'Housing', value: 2000, color: '#0a8ebc' },
  { label: 'Bills', value: 950, color: '#d4a843' },
  { label: 'Groceries', value: 600, color: '#2d8f5e' },
  { label: 'Transport', value: 200, color: '#5b7ba5' },
  { label: 'Other', value: 750, color: '#c0392b' },
];

const fundHistory = [
  { label: 'Nov', value: 1200 },
  { label: 'Dec', value: 1600 },
  { label: 'Jan', value: 2100 },
  { label: 'Feb', value: 2600 },
  { label: 'Mar', value: 3100 },
  { label: 'Apr', value: 3600 },
];

const scenarios = [
  { name: 'Current pace', monthlyAdd: 450, monthsToGoal: 22, date: 'Feb 2028' },
  { name: 'Add $200/mo', monthlyAdd: 650, monthsToGoal: 15, date: 'Jul 2027' },
  { name: 'Add $400/mo', monthlyAdd: 850, monthsToGoal: 12, date: 'Apr 2027' },
  { name: 'Add $600/mo', monthlyAdd: 1050, monthsToGoal: 10, date: 'Feb 2027' },
];

export default function EmergencyPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Emergency Fund</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 hero-pattern" />
          <div className="relative flex flex-col items-center text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-2">Emergency Fund Coverage</p>
            <p className="text-5xl font-bold text-white tabular-nums">{coverage.toFixed(1)}<span className="text-lg font-normal text-white/50"> months</span></p>
            <p className="mt-2 text-sm text-white/60">Target: {targetMonths} months ({fmtCurrency(target)})</p>
            <div className="mt-4 w-full max-w-md">
              <div className="w-full h-3 rounded-full overflow-hidden bg-white/20">
                <div
                  className="h-full rounded-full bg-white/90 transition-all duration-700"
                  style={{ width: `${pct(current, target)}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-white/50">{fmtCurrency(current)} / {fmtCurrency(target)} ({pct(current, target)}%)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Current Fund" value={fmtCurrency(current)} sub={`${coverage.toFixed(1)} months`} />
        <StatCard label="Target" value={fmtCurrency(target)} sub={`${targetMonths} months expenses`} />
        <StatCard label="Remaining" value={fmtCurrency(target - current)} accent="text-brand-gold" sub={`${pct(current, target)}% funded`} />
        <StatCard label="Mo. Expenses" value={fmtCurrency(monthlyExpenses)} sub="Essential costs" />
      </section>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Scenarios */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">How to Get There Faster</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Scenario</th>
                    <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Monthly</th>
                    <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Months</th>
                    <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Target Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {scenarios.map((s) => (
                    <tr key={s.name}>
                      <td className="py-3 font-medium text-[var(--text-primary)]">{s.name}</td>
                      <td className="py-3 text-right tabular-nums text-[var(--text-secondary)]">{fmtCurrency(s.monthlyAdd)}</td>
                      <td className="py-3 text-right tabular-nums text-[var(--text-secondary)]">{s.monthsToGoal}</td>
                      <td className="py-3 text-right text-[var(--text-secondary)]">{s.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Contribution Trend */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Fund Growth</h2>
            <LineChart data={fundHistory} height={200} color="#2d8f5e" />
          </Card>
        </div>

        {/* Expense Breakdown */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Monthly Expenses</h2>
          <DonutChart
            segments={expenseBreakdown}
            size={160}
            centerLabel="Monthly"
            centerValue={fmtCurrency(monthlyExpenses)}
          />
          <div className="mt-4 space-y-2">
            {expenseBreakdown.map((e) => (
              <div key={e.label} className="flex items-center justify-between">
                <span className="text-sm text-[var(--text-secondary)]">{e.label}</span>
                <span className="text-sm tabular-nums font-semibold text-[var(--text-primary)]">{fmtCurrency(e.value)}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
