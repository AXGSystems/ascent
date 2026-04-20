'use client';

import { bills } from '@/lib/data';
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

const totalBills = bills.reduce((a, b) => a + b.amount, 0);
const paidBills = bills.filter((b) => b.paid);
const unpaidBills = bills.filter((b) => !b.paid);
const autopayCount = bills.filter((b) => b.autopay).length;
const paidTotal = paidBills.reduce((a, b) => a + b.amount, 0);
const unpaidTotal = unpaidBills.reduce((a, b) => a + b.amount, 0);

const calendarDays: Array<{ day: number; bills: typeof bills }> = [];
for (let d = 1; d <= 30; d++) {
  calendarDays.push({ day: d, bills: bills.filter((b) => b.dueDay === d) });
}

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
// April 2026 starts on Wednesday (index 3)
const startDow = 3;
const blanks = Array.from({ length: startDow }, (_, i) => i);

export default function BillsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Bills</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">
              <LearnTooltip term="Recurring Expense"><span>April Bills</span></LearnTooltip>
            </p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-black tabular-nums text-white"><CountUp value={totalBills} prefix="$" /></p>
            <p className="mt-2 text-sm text-white/60">{bills.length} bills - {autopayCount} on <LearnTooltip term="Autopay"><span>autopay</span></LearnTooltip></p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
          <StatCard label="Total Bills" value={fmtCurrency(totalBills)} sub="9 recurring" />
          <StatCard label="Paid" value={fmtCurrency(paidTotal)} accent="text-brand-green" sub={`${paidBills.length} bills`} />
          <StatCard label="Remaining" value={fmtCurrency(unpaidTotal)} accent="text-brand-gold" sub={`${unpaidBills.length} bills`} />
          <StatCard label="Autopay" value={`${autopayCount}/${bills.length}`} sub="Coverage" />
        </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="tip">
            Setting up <LearnTooltip term="Autopay"><span>autopay</span></LearnTooltip> on your remaining {bills.length - autopayCount} manual bills would eliminate late fees and protect your <LearnTooltip term="Credit Score"><span>credit score</span></LearnTooltip>.
          </AdvisorTip>
          <AdvisorTip type="celebration">
            {autopayCount} of {bills.length} bills are on autopay &mdash; solid automation. Two more and you hit 100% coverage!
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Calendar + List */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Calendar Grid */}
        <ScrollReveal>
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">April Calendar</h2>
          <div className="grid grid-cols-7 gap-1 min-w-0">
            {weekdays.map((d) => (
              <div key={d} className="text-center text-[10px] font-semibold text-[var(--text-muted)] uppercase py-1">{d}</div>
            ))}
            {blanks.map((b) => (
              <div key={`blank-${b}`} className="aspect-square" />
            ))}
            {calendarDays.map(({ day, bills: dayBills }) => (
              <div
                key={day}
                className={`aspect-square rounded-lg border text-center flex flex-col items-center justify-center gap-0.5 text-xs ${
                  dayBills.length > 0
                    ? 'border-brand-teal/30 bg-brand-teal/5'
                    : 'border-transparent'
                } ${day === 15 ? 'ring-2 ring-brand-teal/50' : ''}`}
              >
                <span className={`tabular-nums ${dayBills.length > 0 ? 'font-bold text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                  {day}
                </span>
                {dayBills.length > 0 && (
                  <span className="text-[8px] text-brand-teal font-medium">{dayBills.length} bill{dayBills.length > 1 ? 's' : ''}</span>
                )}
              </div>
            ))}
          </div>
        </Card>
        </ScrollReveal>

        {/* Bills List */}
        <ScrollReveal delay={100}>
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-base font-bold text-[var(--text-primary)]">All Bills</h2>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {bills.map((bill) => (
              <div key={bill.name} className="flex items-center justify-between px-5 py-3 min-h-[44px]">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{bill.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Due {bill.dueLabel} {bill.autopay ? '- Autopay' : '- Manual'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">
                    {fmtCurrency(bill.amount)}
                  </span>
                  {bill.paid ? (
                    <Badge variant="success">Paid</Badge>
                  ) : bill.autopay ? (
                    <Badge variant="info">Auto</Badge>
                  ) : (
                    <Badge variant="warning">Due</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
        </ScrollReveal>
      </div>

      {/* Payment History */}
      <ScrollReveal>
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Recent Payment History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Bill</th>
                <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Amount</th>
                <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Date</th>
                <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Method</th>
                <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {paidBills.map((bill) => (
                <tr key={bill.name}>
                  <td className="py-2 font-medium text-[var(--text-primary)]">{bill.name}</td>
                  <td className="py-2 tabular-nums text-[var(--text-primary)]">{fmtCurrency(bill.amount)}</td>
                  <td className="py-2 text-[var(--text-secondary)]">Apr {bill.dueDay}</td>
                  <td className="py-2 text-[var(--text-secondary)]">{bill.autopay ? 'Autopay' : 'Manual'}</td>
                  <td className="py-2"><Badge variant="success">Paid</Badge></td>
                </tr>
              ))}
              {/* Previous month for more history */}
              {bills.slice(0, 4).map((bill) => (
                <tr key={`prev-${bill.name}`} className="opacity-70">
                  <td className="py-2 font-medium text-[var(--text-primary)]">{bill.name}</td>
                  <td className="py-2 tabular-nums text-[var(--text-primary)]">{fmtCurrency(bill.amount)}</td>
                  <td className="py-2 text-[var(--text-secondary)]">Mar {bill.dueDay}</td>
                  <td className="py-2 text-[var(--text-secondary)]">{bill.autopay ? 'Autopay' : 'Manual'}</td>
                  <td className="py-2"><Badge variant="success">Paid</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      </ScrollReveal>

      {/* QUICK TIP */}
      <QuickTip page="bills" />
    </div>
  );
}
