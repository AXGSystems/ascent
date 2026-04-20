'use client';

import { sharedExpenses } from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import AdvisorTip from '@/components/AdvisorTip';
import CountUp from '@/components/CountUp';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';

const christianIncome = 4280;
const channelleIncome = 2800;
const totalIncome = christianIncome + channelleIncome;
const christianPercent = Math.round((christianIncome / totalIncome) * 100);
const channellePercent = 100 - christianPercent;

const christianPaid = sharedExpenses.filter((e) => e.paidBy === 'Christian').reduce((a, e) => a + e.amount, 0);
const channellePaid = sharedExpenses.filter((e) => e.paidBy === 'Channelle').reduce((a, e) => a + e.amount, 0);
const totalShared = christianPaid + channellePaid;
const christianOwes = totalShared * (christianPercent / 100);
const balance = christianPaid - christianOwes;

export default function SplitSensePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-500 to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-violet-600/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1"><LearnTooltip term="Cash Flow"><span>SplitSense</span></LearnTooltip></p>
              <h1 className="sr-only">SplitSense — Intelligent Expense Splitting</h1>
              <p className="text-3xl md:text-4xl font-black text-white">Intelligent Expense Splitting</p>
              <p className="mt-2 text-sm text-white/70">Fair, proportional, transparent expense sharing.</p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-xs text-white/50 mb-1">Running Balance</p>
              <p className="text-3xl md:text-4xl font-black tabular-nums text-white">
                <CountUp value={Math.abs(balance)} prefix="$" />
              </p>
              <p className="text-sm text-white/60 mt-1">
                {balance > 0 ? 'Channelle owes Christian' : 'Christian owes Channelle'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Christian Income" value={fmtCurrency(christianIncome)} sub={`${christianPercent}% of total`} accent="text-brand-teal" />
        <StatCard label="Channelle Income" value={fmtCurrency(channelleIncome)} sub={`${channellePercent}% of total`} accent="text-brand-gold" />
        <StatCard label="Split Ratio" value={`${christianPercent}/${channellePercent}`} sub="Proportional" />
        <StatCard label="Total Shared" value={fmtCurrency(totalShared)} sub="This month" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="insight">
            Fair does not always mean 50/50. Your proportional split ({christianPercent}/{channellePercent}) reflects income differences and keeps things equitable.
          </AdvisorTip>
          <AdvisorTip type="tip">
            Settle up weekly to prevent running balances from becoming friction points. Regular settling keeps both partners feeling respected.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Income Comparison */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Income Comparison</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-[var(--text-secondary)]">Christian</span>
                  <span className="text-sm tabular-nums font-semibold text-brand-teal">{fmtCurrency(christianIncome)}</span>
                </div>
                <div className="w-full h-4 rounded-full overflow-hidden bg-[var(--border-color)]">
                  <div className="h-full rounded-full bg-brand-teal transition-all duration-500" style={{ width: `${christianPercent}%` }} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-[var(--text-secondary)]">Channelle</span>
                  <span className="text-sm tabular-nums font-semibold text-brand-gold">{fmtCurrency(channelleIncome)}</span>
                </div>
                <div className="w-full h-4 rounded-full overflow-hidden bg-[var(--border-color)]">
                  <div className="h-full rounded-full bg-brand-gold transition-all duration-500" style={{ width: `${channellePercent}%` }} />
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-brand-teal/5 border border-brand-teal/20 text-center">
              <p className="text-xs text-[var(--text-secondary)]">
                Proportional Split: Christian pays <strong>{christianPercent}%</strong> and Channelle pays <strong>{channellePercent}%</strong> of shared expenses
              </p>
            </div>
          </Card>

          {/* Recent Shared Expenses */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-base font-bold text-[var(--text-primary)]">Recent Shared Expenses</h2>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {sharedExpenses.map((expense) => (
                <div key={`${expense.name}-${expense.date}`} className="flex items-center justify-between px-5 py-3 min-h-[44px]">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">{expense.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{expense.category} - {expense.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={expense.paidBy === 'Christian' ? 'info' : 'warning'}>
                      {expense.paidBy}
                    </Badge>
                    <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">{fmtCurrency(expense.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Running Balance */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Running Balance</h2>
            <div className="text-center py-4">
              <p className="text-3xl md:text-4xl font-black tabular-nums text-[var(--text-primary)]">{fmtCurrency(Math.abs(balance))}</p>
              <p className="text-sm text-[var(--text-muted)] mt-2">
                {balance > 0 ? 'Channelle owes Christian' : 'Christian owes Channelle'}
              </p>
              <button
                type="button"
                className="mt-4 px-6 py-2.5 rounded-xl bg-brand-teal text-white font-semibold text-sm hover:bg-brand-teal/90 transition-colors"
              >
                Settle Up
              </button>
            </div>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Christian paid total</span>
                <span className="tabular-nums font-semibold">{fmtCurrency(christianPaid)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Channelle paid total</span>
                <span className="tabular-nums font-semibold">{fmtCurrency(channellePaid)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Christian should pay ({christianPercent}%)</span>
                <span className="tabular-nums font-semibold">{fmtCurrency(christianOwes)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Channelle should pay ({channellePercent}%)</span>
                <span className="tabular-nums font-semibold">{fmtCurrency(totalShared - christianOwes)}</span>
              </div>
            </div>
          </Card>

          {/* Split Mode Toggle */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Split Mode</h2>
            <div className="space-y-2">
              {[
                { mode: 'Equal', desc: '50/50 split regardless of income', selected: false },
                { mode: 'Proportional', desc: 'Based on income ratio', selected: true },
                { mode: 'Custom', desc: 'Set your own percentages', selected: false },
              ].map((opt) => (
                <div
                  key={opt.mode}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${opt.selected ? 'border-brand-teal bg-brand-teal/5' : 'border-[var(--border-color)] hover:bg-[var(--bg-card-hover)]'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${opt.selected ? 'border-brand-teal' : 'border-[var(--border-color)]'}`}>
                      {opt.selected && <div className="w-2 h-2 rounded-full bg-brand-teal" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{opt.mode}</p>
                      <p className="text-xs text-[var(--text-muted)]">{opt.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">By Category</h2>
            <div className="space-y-2">
              {Object.entries(
                sharedExpenses.reduce<Record<string, number>>((acc, e) => {
                  acc[e.category] = (acc[e.category] || 0) + e.amount;
                  return acc;
                }, {})
              )
                .sort((a, b) => b[1] - a[1])
                .map(([cat, total]) => (
                  <div key={cat} className="flex justify-between text-sm py-1">
                    <span className="text-[var(--text-secondary)]">{cat}</span>
                    <span className="tabular-nums font-semibold text-[var(--text-primary)]">{fmtCurrency(total)}</span>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </section>
    
      {/* QUICK TIP */}
      <QuickTip page="splitsense" />
    </div>
  );
}
