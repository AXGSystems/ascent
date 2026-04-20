'use client';

import { moneyMemoryComparisons, retrospectiveTimeline } from '@/lib/data';
import { fmtCurrency, cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import AdvisorTip from '@/components/AdvisorTip';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';

const totalProgress = moneyMemoryComparisons.reduce((a, c) => a + (c.changePercent > 0 ? 1 : 0), 0);
const bestImprovement = moneyMemoryComparisons.sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))[0];

export default function MoneyMemoryPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-amber-500/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">MoneyMemory</p>
            <h1 className="sr-only">MoneyMemory — On This Day Retrospective</h1>
            <p className="text-3xl md:text-4xl font-black text-white">&quot;On This Day&quot; Retrospective</p>
            <p className="mt-2 text-sm text-white/70">Look back to see how far you have come. One year ago today...</p>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Areas Improved" value={`${totalProgress}/${moneyMemoryComparisons.length}`} sub="Year over year" accent="text-brand-green" />
        <StatCard label="Best Improvement" value={bestImprovement.label} sub={`${bestImprovement.changePercent > 0 ? '+' : ''}${bestImprovement.changePercent.toFixed(1)}%`} accent="text-brand-teal" />
        <StatCard label="NW Growth" value={fmtCurrency(moneyMemoryComparisons[0].change)} trend="up" trendLabel="+11.7%" accent="text-brand-green" />
        <StatCard label="Streak" value="12 mo" sub="Consecutive tracking" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="celebration">
            In just 12 months, your <LearnTooltip term="Net Worth"><span>net worth</span></LearnTooltip> grew {fmtCurrency(8650)} and your <LearnTooltip term="Savings Rate"><span>savings rate</span></LearnTooltip> jumped from 27% to 39%. Incredible progress!
          </AdvisorTip>
          <AdvisorTip type="insight">
            Looking back at where you started keeps you motivated. {totalProgress} of {moneyMemoryComparisons.length} financial areas improved year-over-year.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* 1 Year Ago Comparison Cards */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">1 Year Ago vs Today</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {moneyMemoryComparisons.map((item) => {
                const isPositive = item.label === 'Monthly Spending' || item.label === 'Total Debt'
                  ? item.change < 0
                  : item.change > 0;
                return (
                  <div key={item.label} className="p-4 rounded-xl border border-[var(--border-color)]">
                    <p className="text-xs text-[var(--text-muted)] mb-2">{item.label}</p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-[var(--text-muted)] line-through">
                          {item.label === 'Savings Rate' ? `${item.then}%` : fmtCurrency(item.then)}
                        </p>
                        <p className="text-xl font-bold tabular-nums text-[var(--text-primary)]">
                          {item.label === 'Savings Rate' ? `${item.now}%` : fmtCurrency(item.now)}
                        </p>
                      </div>
                      <Badge variant={isPositive ? 'success' : 'danger'}>
                        {item.changePercent > 0 ? '+' : ''}{item.changePercent.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Monthly Retrospective Timeline */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Monthly Retrospective</h2>
            <div className="relative pl-6">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[var(--border-color)]" />
              {retrospectiveTimeline.map((item) => (
                <div key={item.month} className="relative pb-5 last:pb-0">
                  <div className={cn(
                    'absolute left-[-18px] w-3 h-3 rounded-full border-2 border-[var(--bg-card)]',
                    item.good ? 'bg-brand-green' : 'bg-brand-red'
                  )} />
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{item.month}</p>
                      <p className="text-xs text-[var(--text-secondary)]">{item.highlight}</p>
                    </div>
                    <Badge variant={item.good ? 'success' : 'warning'}>{item.metric}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Progress Celebration */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Progress Celebration</h2>
            <div className="text-center py-6">
              <p className="text-3xl md:text-4xl lg:text-5xl mb-3">{'\uD83C\uDF89'}</p>
              <p className="text-lg font-bold text-[var(--text-primary)]">Incredible Progress!</p>
              <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed">
                In just 12 months, you have grown your net worth by <strong className="text-brand-green">{fmtCurrency(8650)}</strong>,
                reduced spending by <strong className="text-brand-green">16.9%</strong>, and improved your savings rate
                from <strong>27%</strong> to <strong className="text-brand-green">39%</strong>.
              </p>
              <div className="mt-4 p-3 rounded-xl bg-brand-green/5 border border-brand-green/20">
                <p className="text-xs text-brand-green font-semibold">
                  At this rate, you will hit $100k net worth by December 2026!
                </p>
              </div>
            </div>
          </Card>

          {/* Shareable Summary */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Shareable Summary</h2>
            <div className="p-4 rounded-xl bg-gradient-to-br from-brand-teal/10 to-brand-navy/10 border border-brand-teal/20">
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                {'\uD83D\uDCC8'} My 1-Year Financial Check-In:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-[var(--text-secondary)]">
                <li>{'\u2705'} Net worth up {fmtCurrency(8650)} (+11.7%)</li>
                <li>{'\u2705'} Spending down 16.9%</li>
                <li>{'\u2705'} Savings rate: 27% {'\u2192'} 39%</li>
                <li>{'\u2705'} Debt reduced by {fmtCurrency(4200)}</li>
              </ul>
            </div>
            <button
              type="button"
              className="w-full mt-3 py-2.5 rounded-xl bg-brand-teal/10 text-brand-teal font-semibold text-sm hover:bg-brand-teal/20 transition-colors"
            >
              Copy to Clipboard
            </button>
          </Card>

          {/* Key Milestones */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Key Milestones</h2>
            <div className="space-y-2">
              {[
                { milestone: 'First $1k saved', date: 'Feb 2025', icon: '\uD83C\uDFC6' },
                { milestone: 'Credit card paid off', date: 'Oct 2025', icon: '\u2705' },
                { milestone: 'Net worth ATH $82.4k', date: 'Apr 2026', icon: '\uD83D\uDE80' },
                { milestone: '14-day budget streak', date: 'Apr 2026', icon: '\uD83D\uDD25' },
              ].map((m) => (
                <div key={m.milestone} className="flex items-center gap-3 p-2 rounded-lg">
                  <span className="text-lg">{m.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{m.milestone}</p>
                    <p className="text-xs text-[var(--text-muted)]">{m.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    
      {/* QUICK TIP */}
      <QuickTip page="moneymemory" />
    </div>
  );
}
