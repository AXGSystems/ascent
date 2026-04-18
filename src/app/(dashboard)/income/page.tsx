'use client';

import { incomeSources, incomeHistory } from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import LineChart from '@/components/LineChart';
import DonutChart from '@/components/DonutChart';
import Badge from '@/components/Badge';

const totalMonthly = incomeSources.reduce((a, s) => a + s.amountNum, 0);
const totalAnnual = totalMonthly * 12;
const avgIncome = incomeHistory.reduce((a, p) => a + p.v, 0) / incomeHistory.length;

const incomeSegments = incomeSources.map((s, i) => ({
  label: s.source.split('(')[0].trim(),
  value: s.amountNum,
  color: ['#0a8ebc', '#d4a843', '#2d8f5e', '#c0392b', '#5b7ba5'][i] ?? '#999',
}));

export default function IncomePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Income</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 hero-pattern" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">Monthly Income</p>
            <p className="text-4xl md:text-5xl font-bold tabular-nums text-white">~{fmtCurrency(totalMonthly)}</p>
            <p className="mt-2 text-sm text-white/60">{incomeSources.length} income sources - {fmtCurrency(totalAnnual)}/yr estimated</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Monthly Est." value={`~${fmtCurrency(totalMonthly)}`} sub="All sources" />
        <StatCard label="12mo Average" value={fmtCurrency(avgIncome)} sub="Per month" />
        <StatCard label="Sources" value={`${incomeSources.length}`} sub="Active income streams" />
        <StatCard label="Next Payment" value="Apr 15" sub="Freelance (Channelle)" accent="text-brand-gold" />
      </section>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Income Sources Table */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Income Sources</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Source</th>
                    <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Frequency</th>
                    <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Next</th>
                    <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Amount</th>
                    <th className="text-right py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {incomeSources.map((src) => (
                    <tr key={src.source}>
                      <td className="py-3 font-medium text-[var(--text-primary)]">{src.source}</td>
                      <td className="py-3 text-[var(--text-secondary)]">{src.frequency}</td>
                      <td className="py-3 text-[var(--text-secondary)]">{src.nextDate}</td>
                      <td className="py-3 text-right tabular-nums font-semibold text-[var(--text-primary)]">{src.amount}</td>
                      <td className="py-3 text-right">
                        {src.status === 'ok' ? (
                          <Badge variant="success">On Track</Badge>
                        ) : (
                          <Badge variant="warning">Due</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Income Trend */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">12-Month Income Trend</h2>
            <LineChart
              data={incomeHistory.map((p) => ({ label: p.m, value: p.v }))}
              height={220}
              color="#2d8f5e"
            />
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Income by Source</h2>
            <DonutChart
              segments={incomeSegments}
              size={160}
              centerLabel="Monthly"
              centerValue={`~${fmtCurrency(totalMonthly, true)}`}
            />
          </Card>

          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Upcoming Payments</h2>
            <div className="space-y-3">
              {incomeSources.map((src) => (
                <div key={src.source} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{src.source.split('(')[0].trim()}</p>
                    <p className="text-xs text-[var(--text-muted)]">{src.nextDate}</p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-brand-green">{src.amount}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
