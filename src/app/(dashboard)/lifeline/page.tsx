'use client';

import { lifeEvents, nwProjectionData } from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import LineChart from '@/components/LineChart';
import Badge from '@/components/Badge';
import AdvisorTip from '@/components/AdvisorTip';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';

const enabledEvents = lifeEvents.filter((e) => e.enabled);
const totalImpact = enabledEvents.reduce((a, e) => a + e.monthlyImpact, 0);
const totalCost = enabledEvents.reduce((a, e) => a + e.estimatedCost, 0);
const nextEvent = enabledEvents.sort((a, b) => a.targetAge - b.targetAge)[0];

export default function LifeLinePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-emerald-600 to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">LifeLine</p>
            <h1 className="sr-only">LifeLine — Life Event Financial Simulator</h1>
            <p className="text-3xl md:text-4xl font-black text-white">Life Event Financial Simulator</p>
            <p className="mt-2 text-sm text-white/70">See how life&apos;s big moments shape your financial future.</p>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Active Events" value={`${enabledEvents.length}`} sub={`of ${lifeEvents.length} planned`} accent="text-brand-teal" />
        <StatCard label="Total Cost" value={fmtCurrency(totalCost)} sub="One-time costs" accent="text-brand-red" />
        <StatCard label="Monthly Impact" value={fmtCurrency(totalImpact)} sub="Net cash flow change" trend={totalImpact < 0 ? 'down' : 'up'} trendLabel={totalImpact < 0 ? 'Negative' : 'Positive'} />
        <StatCard label="Next Event" value={nextEvent?.name ?? 'None'} sub={nextEvent ? `Age ${nextEvent.targetAge}` : ''} />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="insight">
            Major life events reshape your finances. Planning for {enabledEvents.length} upcoming events reduces stress and helps you enjoy the journey.
          </AdvisorTip>
          <AdvisorTip type="tip">
            Start saving for big events 2-3 years early. Even small monthly <LearnTooltip term="Sinking Fund"><span>sinking fund</span></LearnTooltip> contributions add up to stress-free milestones.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Net Worth Projection Chart */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Net Worth Projection</h2>
            <LineChart
              data={nwProjectionData.map((p) => ({ label: `Age ${p.age}`, value: p.withoutEvents }))}
              height={240}
              color="#2d8f5e"
              formatValue={(v) => fmtCurrency(v, true)}
            />
            <div className="flex gap-4 mt-3 justify-center">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green shrink-0" />
                <span className="text-[var(--text-secondary)]">Without Events</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-teal shrink-0" />
                <span className="text-[var(--text-secondary)]">With Events</span>
              </div>
            </div>
          </Card>

          {/* Monthly Cash Flow Impact */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Monthly Cash Flow Impact</h2>
            <div className="space-y-3">
              {enabledEvents.map((event) => (
                <div key={event.name} className="flex items-center justify-between py-2 border-b border-[var(--border-color)] last:border-0">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{event.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">Age {event.targetAge}</p>
                  </div>
                  <span className={`text-sm font-semibold tabular-nums ${event.monthlyImpact >= 0 ? 'text-brand-green' : 'text-brand-red'}`}>
                    {event.monthlyImpact >= 0 ? '+' : ''}{fmtCurrency(event.monthlyImpact)}/mo
                  </span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2 border-t-2 border-[var(--border-color)]">
                <p className="text-sm font-bold text-[var(--text-primary)]">Net Monthly Impact</p>
                <span className={`text-sm font-bold tabular-nums ${totalImpact >= 0 ? 'text-brand-green' : 'text-brand-red'}`}>
                  {totalImpact >= 0 ? '+' : ''}{fmtCurrency(totalImpact)}/mo
                </span>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Event Cards */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Life Event Cards</h2>
            <div className="space-y-3">
              {lifeEvents.map((event) => (
                <div
                  key={event.name}
                  className={`p-4 rounded-xl border transition-colors ${event.enabled ? 'border-brand-teal/30 bg-brand-teal/5' : 'border-[var(--border-color)] bg-[var(--bg-card)] opacity-60'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{event.icon === 'baby' ? '\uD83D\uDC76' : event.icon === 'home' ? '\uD83C\uDFE0' : event.icon === 'briefcase' ? '\uD83D\uDCBC' : event.icon === 'sunset' ? '\uD83C\uDF05' : event.icon === 'rocket' ? '\uD83D\uDE80' : '\uD83C\uDF93'}</span>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">{event.name}</span>
                    </div>
                    <Badge variant={event.enabled ? 'success' : 'default'}>
                      {event.enabled ? 'Active' : 'Off'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[var(--text-muted)]">Target Age</span>
                      <p className="font-semibold text-[var(--text-primary)] tabular-nums">{event.targetAge}</p>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)]">Est. Cost</span>
                      <p className="font-semibold text-[var(--text-primary)] tabular-nums">{fmtCurrency(event.estimatedCost)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Milestone Markers */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Milestone Markers</h2>
            <div className="relative pl-6">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[var(--border-color)]" />
              {nwProjectionData.filter((_, i) => i % 2 === 0).map((point) => (
                <div key={point.age} className="relative pb-6 last:pb-0">
                  <div className="absolute left-[-18px] w-3 h-3 rounded-full bg-brand-teal border-2 border-[var(--bg-card)]" />
                  <p className="text-sm font-semibold text-[var(--text-primary)]">Age {point.age}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Projected: {fmtCurrency(point.withEvents, true)} (with events)
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    
      {/* QUICK TIP */}
      <QuickTip page="lifeline" />
    </div>
  );
}
