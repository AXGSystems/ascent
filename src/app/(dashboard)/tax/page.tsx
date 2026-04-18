'use client';

import { taxDeductions } from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import DonutChart from '@/components/DonutChart';
import Badge from '@/components/Badge';

const totalDeductions = taxDeductions.reduce((a, d) => a + d.amount, 0);
const claimed = taxDeductions.filter((d) => d.status === 'claimed');
const potential = taxDeductions.filter((d) => d.status === 'potential');
const review = taxDeductions.filter((d) => d.status === 'review');
const claimedTotal = claimed.reduce((a, d) => a + d.amount, 0);
const potentialTotal = potential.reduce((a, d) => a + d.amount, 0);

const catColors: Record<string, string> = {
  'Mortgage Interest': '#0a8ebc',
  'State Taxes': '#d4a843',
  'Charitable': '#2d8f5e',
  'Home Office': '#c0392b',
  'Education': '#5b7ba5',
  'Medical': '#8b5cf6',
  'Business Expenses': '#e879f9',
};

const donutSegments = taxDeductions.map((d) => ({
  label: d.category,
  value: d.amount,
  color: catColors[d.category] ?? '#999',
}));

const bracketEstimates = [
  { bracket: '10%', savings: fmtCurrency(totalDeductions * 0.1) },
  { bracket: '12%', savings: fmtCurrency(totalDeductions * 0.12) },
  { bracket: '22%', savings: fmtCurrency(totalDeductions * 0.22) },
  { bracket: '24%', savings: fmtCurrency(totalDeductions * 0.24) },
  { bracket: '32%', savings: fmtCurrency(totalDeductions * 0.32) },
];

export default function TaxPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Tax Deductions</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 hero-pattern" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">YTD Deductions</p>
            <p className="text-4xl md:text-5xl font-bold tabular-nums text-white">{fmtCurrency(totalDeductions)}</p>
            <p className="mt-2 text-sm text-white/60">{taxDeductions.length} deduction categories tracked</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="YTD Total" value={fmtCurrency(totalDeductions)} sub={`${taxDeductions.length} categories`} />
        <StatCard label="Claimed" value={fmtCurrency(claimedTotal)} accent="text-brand-green" sub={`${claimed.length} items`} />
        <StatCard label="Potential" value={fmtCurrency(potentialTotal)} accent="text-brand-gold" sub={`${potential.length} items`} />
        <StatCard label="Est. Savings" value={fmtCurrency(totalDeductions * 0.22)} sub="At 22% bracket" />
      </section>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Deductions Table */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Deductions by Category</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Category</th>
                    <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Description</th>
                    <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Amount</th>
                    <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {taxDeductions.map((d) => (
                    <tr key={d.category}>
                      <td className="py-3 font-medium text-[var(--text-primary)]">{d.category}</td>
                      <td className="py-3 text-[var(--text-secondary)]">{d.description}</td>
                      <td className="py-3 text-right tabular-nums font-semibold text-[var(--text-primary)]">{fmtCurrency(d.amount)}</td>
                      <td className="py-3 text-right">
                        <Badge variant={d.status === 'claimed' ? 'success' : d.status === 'potential' ? 'warning' : 'info'}>
                          {d.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Bracket Estimates */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Estimated Tax Savings by Bracket</h2>
            <div className="grid grid-cols-5 gap-3">
              {bracketEstimates.map((b) => (
                <div key={b.bracket} className="text-center p-3 rounded-xl bg-[var(--border-color)]/50">
                  <p className="text-xs font-semibold text-[var(--text-muted)]">{b.bracket}</p>
                  <p className="text-sm font-bold tabular-nums text-[var(--text-primary)] mt-1">{b.savings}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Deductions Breakdown</h2>
          <DonutChart
            segments={donutSegments}
            size={160}
            centerLabel="YTD"
            centerValue={fmtCurrency(totalDeductions)}
          />
        </Card>
      </div>
    </div>
  );
}
