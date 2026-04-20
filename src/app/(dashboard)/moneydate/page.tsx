'use client';

import { moneyDateItems, nests } from '@/lib/data';
import { fmtCurrency, pct } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';
import AdvisorTip from '@/components/AdvisorTip';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';
import PartnerComparison from '@/components/PartnerComparison';

const wins = [
  'Hit $82,450 net worth - all-time high!',
  'Savings rate at 39%, up from 35%',
  'Emergency fund grew to $3,600',
  'Budget streak: 14 days under budget',
];

const decisions = [
  { topic: 'Increase Hawaii fund to $35/wk?', status: 'pending' },
  { topic: 'Switch phone plan to Mint Mobile?', status: 'pending' },
  { topic: 'Cancel Disney+ subscription?', status: 'pending' },
  { topic: 'Set up autopay for Electric?', status: 'pending' },
];

const goalCheckins = nests.slice(0, 4).map((n) => ({
  name: n.name,
  current: n.current,
  goal: n.goal,
  progress: pct(n.current, n.goal),
}));

export default function MoneyDatePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Money Date</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1"><LearnTooltip term="Budget"><span>Money Date</span></LearnTooltip></p>
            <p className="text-3xl md:text-4xl font-black text-white">Christian & Channelle</p>
            <p className="mt-2 text-sm text-white/60">April 2026 - Weekly Review</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="C Spending" value="$780" sub="This month" />
        <StatCard label="Ch Spending" value="$1,060" sub="This month" accent="text-brand-gold" />
        <StatCard label="Combined" value="$1,840" sub="vs $2,300 budget" />
        <StatCard label="Date #5" value="Apr 19" sub="Upcoming" accent="text-brand-teal" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="celebration">
            This is your 5th Money Date &mdash; couples who review finances together save 23% more than those who don&apos;t!
          </AdvisorTip>
          <AdvisorTip type="tip">
            A weekly 15-minute money check-in is more effective than an annual deep dive. Make it a ritual, not a chore.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Spending Comparison + Wins */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Side by Side */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Spending Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)] uppercase">Category</th>
                  <th className="text-right py-2 text-xs font-semibold text-brand-teal uppercase">Christian</th>
                  <th className="text-right py-2 text-xs font-semibold text-brand-gold uppercase">Channelle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {moneyDateItems.map((item) => (
                  <tr key={item.label}>
                    <td className="py-2 font-medium text-[var(--text-primary)]">{item.label}</td>
                    <td className="py-2 text-right tabular-nums text-brand-teal">{item.christianVal}</td>
                    <td className="py-2 text-right tabular-nums text-brand-gold">{item.channelleVal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Wins to Celebrate */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Wins to Celebrate</h2>
          <div className="space-y-3">
            {wins.map((win, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-brand-green/5 border border-brand-green/10">
                <span className="text-brand-green text-lg shrink-0">&#9733;</span>
                <p className="text-sm text-[var(--text-primary)]">{win}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Goal Check-ins + Decisions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goal Check-ins */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Goal Check-ins</h2>
          <div className="space-y-4">
            {goalCheckins.map((g) => (
              <div key={g.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[var(--text-primary)]">{g.name}</span>
                  <span className="text-xs tabular-nums text-[var(--text-secondary)]">
                    {fmtCurrency(g.current)} / {fmtCurrency(g.goal)} ({g.progress}%)
                  </span>
                </div>
                <ProgressBar value={g.current} max={g.goal} />
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Decisions */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Decisions to Make</h2>
          <div className="space-y-3">
            {decisions.map((d, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[var(--border-color)]/50">
                <p className="text-sm text-[var(--text-primary)]">{d.topic}</p>
                <Badge variant="warning">Pending</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* PARTNER COMPARISON WIDGET */}
      <ScrollReveal>
        <PartnerComparison />
      </ScrollReveal>

      <QuickTip page="moneydate" />
    </div>
  );
}
