'use client';

import { billAuditItems } from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import BarChart from '@/components/BarChart';
import AdvisorTip from '@/components/AdvisorTip';
import CountUp from '@/components/CountUp';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';

const totalSavings = billAuditItems.reduce((a, b) => a + b.savings, 0);
const annualSavings = totalSavings * 12;
const actionable = billAuditItems.filter((b) => b.status === 'actionable');

export default function BillAuditPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Bill Audit</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1"><LearnTooltip term="Recurring Expense"><span>Bill Audit</span></LearnTooltip></p>
            <p className="text-3xl md:text-4xl lg:text-5xl font-black tabular-nums text-white"><CountUp value={totalSavings} prefix="$" /><span className="text-lg font-normal text-white/50">/mo savings</span></p>
            <p className="mt-2 text-sm text-emerald-300 font-semibold">{fmtCurrency(annualSavings)}/yr potential savings found</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Monthly Savings" value={fmtCurrency(totalSavings)} accent="text-brand-green" sub="If all applied" />
        <StatCard label="Annual Savings" value={fmtCurrency(annualSavings)} accent="text-brand-green" sub="Projected yearly" />
        <StatCard label="Opportunities" value={`${billAuditItems.length}`} sub="Bills analyzed" />
        <StatCard label="Actionable" value={`${actionable.length}`} accent="text-brand-teal" sub="Ready to apply" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="celebration">
            {fmtCurrency(annualSavings)}/yr in potential savings found! Most people overpay for insurance, internet, and phone by $100+/month.
          </AdvisorTip>
          <AdvisorTip type="tip">
            A yearly negotiation call can save $1,200+. Start with {actionable.length} actionable items &mdash; one phone call each could transform your budget.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Opportunities */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {billAuditItems.map((item) => (
          <Card key={item.name}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">{item.name}</h3>
                <p className="text-xs text-[var(--text-muted)]">Switch to {item.provider}</p>
              </div>
              <Badge variant={item.status === 'actionable' ? 'success' : item.status === 'done' ? 'info' : 'warning'}>
                {item.status}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="text-center p-2 rounded-lg bg-brand-red/5">
                <p className="text-[10px] uppercase text-[var(--text-muted)]">Current</p>
                <p className="text-lg font-bold tabular-nums text-brand-red">{fmtCurrency(item.current)}</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-[var(--border-color)]/50 flex items-center justify-center">
                <span className="text-brand-teal text-xl">&#8594;</span>
              </div>
              <div className="text-center p-2 rounded-lg bg-brand-green/5">
                <p className="text-[10px] uppercase text-[var(--text-muted)]">Potential</p>
                <p className="text-lg font-bold tabular-nums text-brand-green">{fmtCurrency(item.potential)}</p>
              </div>
            </div>

            <p className="text-sm text-[var(--text-secondary)] mb-3">{item.action}</p>

            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-brand-green">Save {fmtCurrency(item.savings)}/mo ({fmtCurrency(item.savings * 12)}/yr)</span>
              {item.status === 'actionable' && (
                <button type="button" className="px-4 py-2 text-xs font-semibold rounded-xl bg-brand-teal text-white hover:bg-brand-teal-dark transition-colors min-h-[44px]">
                  Take Action
                </button>
              )}
            </div>
          </Card>
        ))}
      </section>

      {/* Savings Chart */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Savings by Bill</h2>
        <BarChart
          data={billAuditItems.map((b) => ({
            label: b.name,
            value: b.savings,
            color: '#2d8f5e',
          }))}
          horizontal
        />
      </Card>
    
      {/* QUICK TIP */}
      <QuickTip page="billaudit" />
    </div>
  );
}
