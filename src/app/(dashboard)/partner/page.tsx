'use client';

import { auditTrail } from '@/lib/data';
import { cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import AdvisorTip from '@/components/AdvisorTip';
import CountUp from '@/components/CountUp';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';

const trustScore = 74;

const deletedTransactions = [
  { name: 'Target Refund', amount: '$84.50', who: 'Channelle', date: 'Mar 10', restored: false },
];

const privacySettings = [
  { label: 'View all transactions', christian: true, channelle: true },
  { label: 'Edit categories', christian: true, channelle: true },
  { label: 'Delete transactions', christian: true, channelle: true },
  { label: 'Disconnect accounts', christian: true, channelle: true },
  { label: 'Export data', christian: true, channelle: false },
  { label: 'Change budget limits', christian: true, channelle: false },
];

function severityColor(severity: 'info' | 'warn' | 'danger'): 'info' | 'warning' | 'danger' {
  if (severity === 'info') return 'info';
  if (severity === 'warn') return 'warning';
  return 'danger';
}

export default function PartnerPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Partner Transparency</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1"><LearnTooltip term="Diversification"><span>Partner Trust Score</span></LearnTooltip></p>
              <p className="text-4xl md:text-5xl font-black tabular-nums text-white"><CountUp value={trustScore} /><span className="text-lg font-normal text-white/50">/100</span></p>
              <p className="mt-2 text-sm text-white/60">Transparency and account health between partners</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-teal/30 flex items-center justify-center text-white text-xs font-bold">C</div>
              <span className="text-white/50 text-lg">+</span>
              <div className="w-10 h-10 rounded-full bg-brand-gold/30 flex items-center justify-center text-white text-xs font-bold">Ch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Trust Score" value={`${trustScore}/100`} accent="text-brand-gold" sub="Needs improvement" />
        <StatCard label="Audit Events" value={`${auditTrail.length}`} sub="Last 60 days" />
        <StatCard label="Deleted Txns" value={`${deletedTransactions.length}`} accent="text-brand-red" sub="Pending review" />
        <StatCard label="Sync Health" value="83%" sub="5/6 accounts connected" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="insight">
            Trust score is {trustScore}/100 &mdash; reconnecting Cap One Savings would push it to 89. Transparency builds financial alignment.
          </AdvisorTip>
          <AdvisorTip type="tip">
            Joint finances require openness. Schedule a monthly money date to review the audit trail together without judgment.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Audit Trail + Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Audit Trail */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Audit Trail</h2>
          <div className="space-y-3">
            {auditTrail.map((event, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--border-color)]/50">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0',
                  event.who === 'Christian' ? 'bg-brand-teal/15 text-brand-teal' : 'bg-brand-gold/15 text-brand-gold'
                )}>
                  {event.who === 'Christian' ? 'C' : 'Ch'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{event.action}</p>
                    <Badge variant={severityColor(event.severity)}>{event.severity}</Badge>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{event.detail}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          {/* Deleted Transactions */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Deleted Transactions</h2>
            {deletedTransactions.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">No deleted transactions</p>
            ) : (
              <div className="space-y-3">
                {deletedTransactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-brand-red/5 border border-brand-red/10">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{tx.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{tx.who} - {tx.date}</p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">{tx.amount}</span>
                      <button type="button" className="px-3 py-1.5 text-xs font-medium rounded-lg bg-brand-teal text-white hover:bg-brand-teal-dark transition-colors">
                        Restore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Privacy Settings */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Privacy Settings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)]">Permission</th>
                    <th className="text-center py-2 text-xs font-semibold text-brand-teal">C</th>
                    <th className="text-center py-2 text-xs font-semibold text-brand-gold">Ch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {privacySettings.map((s) => (
                    <tr key={s.label}>
                      <td className="py-2 text-[var(--text-secondary)]">{s.label}</td>
                      <td className="py-2 text-center">{s.christian ? '\u2705' : '\u274C'}</td>
                      <td className="py-2 text-center">{s.channelle ? '\u2705' : '\u274C'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    
      {/* QUICK TIP */}
      <QuickTip page="partner" />
    </div>
  );
}
