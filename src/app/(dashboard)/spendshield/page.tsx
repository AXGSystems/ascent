'use client';

import { spendShieldPurchases } from '@/lib/data';
import { fmtCurrency, cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';
import AdvisorTip from '@/components/AdvisorTip';
import CountUp from '@/components/CountUp';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';

const avgScore = Math.round(spendShieldPurchases.reduce((a, p) => a + p.score, 0) / spendShieldPurchases.length);
const flaggedCount = spendShieldPurchases.filter((p) => p.score < 50).length;
const totalAnalyzed = spendShieldPurchases.length;
const potentialSaved = spendShieldPurchases.filter((p) => p.score < 40).reduce((a, p) => a + p.amount, 0);

export default function SpendShieldPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-600 via-brand-teal to-brand-navy p-6 md:p-8 shadow-lg shadow-cyan-600/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1"><LearnTooltip term="Variable Spending"><span>SpendShield</span></LearnTooltip></p>
              <h1 className="sr-only">SpendShield — Real-Time Purchase Decision Engine</h1>
              <p className="text-3xl md:text-4xl font-black text-white">Purchase Decision Engine</p>
              <p className="mt-2 text-sm text-white/70">Real-time intelligence for every purchase.</p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-xs text-white/50 mb-1">SpendShield Score</p>
              <p className="text-5xl font-black tabular-nums text-white"><CountUp value={avgScore} /></p>
              <p className="text-sm text-white/60 mt-1">Average across purchases</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Avg Score" value={`${avgScore}/100`} sub="Higher is better" accent="text-brand-teal" />
        <StatCard label="Flagged" value={`${flaggedCount}`} sub="Low-score purchases" accent="text-brand-red" />
        <StatCard label="Analyzed" value={`${totalAnalyzed}`} sub="Purchases this week" />
        <StatCard label="Potential Saved" value={fmtCurrency(potentialSaved)} sub="If flagged items skipped" accent="text-brand-green" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="tip">
            Before big purchases, check the SpendShield score. A score under 50 means you are likely to regret it &mdash; {flaggedCount} flagged this week.
          </AdvisorTip>
          <AdvisorTip type="insight">
            If you had skipped all flagged purchases this week, you would have saved {fmtCurrency(potentialSaved)} for your savings goals.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Purchase Intelligence Feed */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-base font-bold text-[var(--text-primary)]">Purchase Intelligence Feed</h2>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {spendShieldPurchases.map((purchase) => (
                <div key={`${purchase.merchant}-${purchase.date}`} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">{purchase.merchant}</span>
                      <Badge variant={purchase.score >= 70 ? 'success' : purchase.score >= 40 ? 'warning' : 'danger'}>
                        {purchase.score}/100
                      </Badge>
                    </div>
                    <span className="text-sm font-bold tabular-nums text-[var(--text-primary)]">{fmtCurrency(purchase.amount)}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-[var(--text-muted)]">Category</span>
                      <p className="font-medium text-[var(--text-secondary)]">{purchase.category}</p>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">Budget Left</span>
                      <p className={cn('font-medium tabular-nums', purchase.budgetRemaining < 50 ? 'text-brand-red' : 'text-brand-green')}>
                        {fmtCurrency(purchase.budgetRemaining)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">vs Average</span>
                      <p className={cn('font-medium tabular-nums', purchase.amount > purchase.avgSpend ? 'text-brand-red' : 'text-brand-green')}>
                        {purchase.amount > purchase.avgSpend ? '+' : ''}{fmtCurrency(purchase.amount - purchase.avgSpend)}
                      </p>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">Regret Prob.</span>
                      <p className={cn('font-medium tabular-nums', purchase.regretProbability > 50 ? 'text-brand-red' : 'text-brand-green')}>
                        {purchase.regretProbability}%
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <ProgressBar
                      value={purchase.score}
                      max={100}
                      height="h-1"
                      color={purchase.score >= 70 ? 'bg-brand-green' : undefined}
                      warning={purchase.score >= 40 && purchase.score < 70}
                      over={purchase.score < 40}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* SpendShield Score Legend */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Score Guide</h2>
            <div className="space-y-3">
              {[
                { range: '80-100', label: 'Great Purchase', desc: 'Within budget, low regret risk, good value', color: 'bg-brand-green' },
                { range: '50-79', label: 'Acceptable', desc: 'Minor concerns, but generally fine', color: 'bg-brand-gold' },
                { range: '20-49', label: 'Caution', desc: 'Budget pressure or high regret probability', color: 'bg-orange-500' },
                { range: '0-19', label: 'Avoid', desc: 'Over budget, high regret, poor value', color: 'bg-brand-red' },
              ].map((tier) => (
                <div key={tier.range} className="flex items-start gap-3 p-2">
                  <span className={`w-3 h-3 rounded-full shrink-0 mt-0.5 ${tier.color}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">{tier.range}</span>
                      <span className="text-xs text-[var(--text-muted)]">{tier.label}</span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)]">{tier.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Setting Toggles */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Alert Settings</h2>
            <div className="space-y-3">
              {[
                { label: 'Low-score alerts', desc: 'Notify when score < 40', on: true },
                { label: 'Budget impact preview', desc: 'Show remaining budget', on: true },
                { label: 'Regret prediction', desc: 'Display regret probability', on: true },
                { label: 'Average comparison', desc: 'Compare to historical average', on: false },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{setting.label}</p>
                    <p className="text-xs text-[var(--text-muted)]">{setting.desc}</p>
                  </div>
                  <div className={`w-10 h-6 rounded-full flex items-center px-0.5 transition-colors ${setting.on ? 'bg-brand-teal justify-end' : 'bg-[var(--border-color)] justify-start'}`}>
                    <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Alert History */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Recent Alerts</h2>
            <div className="space-y-2">
              {spendShieldPurchases.filter((p) => p.score < 50).map((p) => (
                <div key={`alert-${p.merchant}`} className="p-2 rounded-lg bg-brand-red/5 border border-brand-red/10 text-xs">
                  <span className="font-semibold text-brand-red">{p.merchant}</span>
                  <span className="text-[var(--text-muted)]"> — Score {p.score}, {p.regretProbability}% regret risk</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    
      {/* QUICK TIP */}
      <QuickTip page="spendshield" />
    </div>
  );
}
