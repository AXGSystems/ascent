'use client';

import { taxThresholdAlerts, quarterlyPayments, taxDeductions } from '@/lib/data';
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

const estimatedLiability = 8400;
const effectiveRate = 12.8;
const totalDeductions = taxDeductions.reduce((a, d) => a + d.amount, 0);
const potentialSavings = taxThresholdAlerts.reduce((a, t) => a + t.potentialSavings, 0);

export default function TaxRadarPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-teal-600 to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-emerald-700/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">TaxRadar</p>
              <h1 className="sr-only">TaxRadar — Year-Round Tax Optimization</h1>
              <p className="text-3xl md:text-4xl font-black text-white">Year-Round Tax Optimization</p>
              <p className="mt-2 text-sm text-white/70">Stay ahead of tax season all year long.</p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-xs text-white/50 mb-1">Est. Tax Liability</p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-black tabular-nums text-white"><CountUp value={estimatedLiability} prefix="$" /></p>
              <p className="text-sm text-white/60 mt-1">Effective rate: {effectiveRate}%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Est. Liability" value={fmtCurrency(estimatedLiability)} sub="Federal + State" accent="text-brand-teal" />
        <StatCard label="Effective Rate" value={`${effectiveRate}%`} sub="Below avg for bracket" accent="text-brand-green" />
        <StatCard label="Deductions Found" value={fmtCurrency(totalDeductions)} sub={`${taxDeductions.length} categories`} />
        <StatCard label="Potential Savings" value={fmtCurrency(potentialSavings)} sub="From threshold alerts" accent="text-brand-green" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="tip">
            <LearnTooltip term="Tax Deduction"><span>Tax-loss harvesting</span></LearnTooltip> and threshold awareness can save you thousands. You have {fmtCurrency(potentialSavings)} in potential savings from alerts alone.
          </AdvisorTip>
          <AdvisorTip type="insight">
            Your effective tax rate is {effectiveRate}% &mdash; below average for your bracket. That means your deduction strategy is working.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Threshold Alerts */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Threshold Alerts</h2>
            <div className="space-y-3">
              {taxThresholdAlerts.map((alert) => (
                <div
                  key={alert.title}
                  className={`p-4 rounded-xl border ${alert.status === 'met' ? 'border-brand-green/20 bg-brand-green/5' : alert.status === 'near' ? 'border-brand-gold/20 bg-brand-gold/5' : 'border-[var(--border-color)]'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{alert.title}</span>
                    <Badge variant={alert.status === 'met' ? 'success' : alert.status === 'near' ? 'warning' : 'default'}>
                      {alert.status === 'met' ? 'Qualified' : alert.status === 'near' ? 'Almost There' : 'Opportunity'}
                    </Badge>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{alert.description}</p>
                  <p className="text-xs font-semibold text-brand-green mt-2">
                    Potential savings: {fmtCurrency(alert.potentialSavings)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Deductions Table */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-base font-bold text-[var(--text-primary)]">Deductions Tracker</h2>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {taxDeductions.map((deduction) => (
                <div key={deduction.category} className="flex items-center justify-between px-5 py-3 min-h-[44px]">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{deduction.category}</p>
                    <p className="text-xs text-[var(--text-muted)]">{deduction.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">{fmtCurrency(deduction.amount)}</span>
                    <Badge variant={deduction.status === 'claimed' ? 'success' : deduction.status === 'potential' ? 'info' : 'warning'}>
                      {deduction.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Quarterly Payment Tracker */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Quarterly Payments</h2>
            <div className="space-y-3">
              {quarterlyPayments.map((payment) => (
                <div
                  key={payment.quarter}
                  className={`p-3 rounded-xl border ${payment.status === 'paid' ? 'border-brand-green/20 bg-brand-green/5' : payment.status === 'overdue' ? 'border-brand-red/20 bg-brand-red/5' : 'border-[var(--border-color)]'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{payment.quarter} - {payment.due}</p>
                      <p className="text-xs text-[var(--text-muted)]">{fmtCurrency(payment.amount)}</p>
                    </div>
                    <Badge variant={payment.status === 'paid' ? 'success' : payment.status === 'overdue' ? 'danger' : 'default'}>
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex justify-between">
              <span className="text-sm font-bold text-[var(--text-primary)]">Total for Year</span>
              <span className="text-sm font-bold tabular-nums text-[var(--text-primary)]">{fmtCurrency(quarterlyPayments.reduce((a, p) => a + p.amount, 0))}</span>
            </div>
          </Card>

          {/* Tax Summary */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Tax Summary</h2>
            <div className="space-y-3">
              {[
                { label: 'Gross Income (Est.)', value: fmtCurrency(65600) },
                { label: 'Total Deductions', value: `-${fmtCurrency(totalDeductions)}` },
                { label: 'Taxable Income', value: fmtCurrency(65600 - totalDeductions) },
                { label: 'Federal Tax', value: fmtCurrency(6200) },
                { label: 'State Tax', value: fmtCurrency(2200) },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-1 text-sm">
                  <span className="text-[var(--text-secondary)]">{item.label}</span>
                  <span className="tabular-nums font-semibold text-[var(--text-primary)]">{item.value}</span>
                </div>
              ))}
              <div className="pt-2 border-t-2 border-[var(--border-color)] flex justify-between text-sm">
                <span className="font-bold text-[var(--text-primary)]">Total Liability</span>
                <span className="font-bold tabular-nums text-brand-teal">{fmtCurrency(estimatedLiability)}</span>
              </div>
            </div>
          </Card>

          {/* Export */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Tax Prep Package</h2>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              Export all deductions, income records, and quarterly payments for your tax preparer.
            </p>
            <button
              type="button"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Export Tax Package
            </button>
          </Card>
        </div>
      </section>
    
      {/* QUICK TIP */}
      <QuickTip page="taxradar" />
    </div>
  );
}
