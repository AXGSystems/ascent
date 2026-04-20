'use client';

import { nests, savingsRateHistory, actualSavings, achievements } from '@/lib/data';
import { fmtCurrency, pct, cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import LineChart from '@/components/LineChart';
import Badge from '@/components/Badge';
import AdvisorTip from '@/components/AdvisorTip';
import CountUp from '@/components/CountUp';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';
import GoalProgressRings from '@/components/GoalProgressRings';
import MobileSection from '@/components/MobileSection';
import ShowMore from '@/components/ShowMore';
import { useStore } from '@/lib/store';
import { useIsMobile } from '@/hooks/useIsMobile';

const totalSaved = nests.reduce((a, n) => a + n.current, 0);
const totalGoals = nests.reduce((a, n) => a + n.goal, 0);
const currentRate = savingsRateHistory[savingsRateHistory.length - 1].r;

export default function SavePage() {
  const openSheet = useStore((s) => s.openSheet);
  const isMobile = useIsMobile();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Savings Goals</h1>
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-green via-brand-teal to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-brand-green/10 hero-sweep">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4">
            <div>
              <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-white/60 mb-0.5 md:mb-1">
                Total Saved in Goals
              </p>
              <p className="text-2xl md:text-4xl lg:text-5xl font-black text-white">
                <CountUp value={totalSaved} prefix="$" duration={1800} />
              </p>
              <div className="mt-2 md:mt-3 max-w-md">
                <div className="w-full h-2 md:h-3 rounded-full overflow-hidden bg-white/20">
                  <div
                    className="h-full rounded-full bg-white/90 transition-all duration-1000 ease-out animate-progress-fill"
                    style={{ width: `${pct(totalSaved, totalGoals)}%` }}
                  />
                </div>
              </div>
              <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-white/60">
                {pct(totalSaved, totalGoals)}% of {fmtCurrency(totalGoals)} total goals
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs md:text-sm text-white/50">
                <LearnTooltip term="Savings Rate">
                  <span>Savings Rate</span>
                </LearnTooltip>
              </p>
              <p className="text-xl md:text-2xl font-bold tabular-nums text-emerald-300">
                <CountUp value={currentRate} suffix="%" duration={1200} />
              </p>
              <p className="text-[10px] md:text-xs text-white/40">+1% vs last month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" delay={80}>
          <StatCard label="Active Goals" value={`${nests.length}`} sub="Saving simultaneously" tooltip="Active Goals: The number of savings goals you are currently funding." />
          <StatCard label="This Month" value={fmtCurrency(2760)} trend="up" trendLabel="On track" accent="text-brand-green" tooltip="This Month: Total amount saved across all goals during the current month." />
          <StatCard label="YTD Saved" value={fmtCurrency(10760)} sub="Jan - Apr" tooltip="Year-to-Date Saved: Cumulative savings since January." />
          <StatCard label="Emergency" value={`${pct(3600, 5000)}%`} sub="$3,600 / $5,000" accent="text-brand-gold" href="/emergency" tooltip="Emergency Fund: Progress toward your emergency fund target." />
        </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="celebration">
            Your savings rate has been above 30% for 4 months straight &mdash; that puts you in the top 15% of households!
          </AdvisorTip>
          {!isMobile && (
            <AdvisorTip type="tip">
              Moving $50 more per month to your{' '}
              <LearnTooltip term="Emergency Fund">
                <span>Emergency Fund</span>
              </LearnTooltip>{' '}
              would reach 1 full month of coverage by June and your $5,000 target by September.
            </AdvisorTip>
          )}
        </section>
      </ScrollReveal>

      {/* Goals — horizontal scroll on mobile, grid on desktop */}
      <ScrollReveal>
        <MobileSection title="Savings Goals">
          {isMobile ? (
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-hide">
              {nests.map((nest) => (
                <div key={nest.name} className="snap-start shrink-0 w-[260px]">
                  <Card
                    onClick={() =>
                      openSheet(
                        nest.name,
                        `Current: ${fmtCurrency(nest.current)}\nGoal: ${fmtCurrency(nest.goal)}\nProgress: ${pct(nest.current, nest.goal)}%\nAuto-Save: ${fmtCurrency(nest.autoAmount)} ${nest.frequency}\n\nRemaining: ${fmtCurrency(nest.goal - nest.current)}`
                      )
                    }
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">{nest.name}</h3>
                      <Badge variant="info">{nest.frequency}</Badge>
                    </div>
                    <p className="text-xl font-bold tabular-nums text-[var(--text-primary)] mb-0.5">
                      {fmtCurrency(nest.current)}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] mb-2">
                      of {fmtCurrency(nest.goal)} goal
                    </p>
                    <ProgressBar
                      value={nest.current}
                      max={nest.goal}
                      color="bg-brand-green"
                      showLabel
                    />
                    <p className="mt-1.5 text-[10px] text-[var(--text-secondary)]">
                      Auto-saving {fmtCurrency(nest.autoAmount)} {nest.frequency.toLowerCase()}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <StaggeredList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" delay={100}>
              {nests.map((nest) => (
                <Card
                  key={nest.name}
                  onClick={() =>
                    openSheet(
                      nest.name,
                      `Current: ${fmtCurrency(nest.current)}\nGoal: ${fmtCurrency(nest.goal)}\nProgress: ${pct(nest.current, nest.goal)}%\nAuto-Save: ${fmtCurrency(nest.autoAmount)} ${nest.frequency}\n\nRemaining: ${fmtCurrency(nest.goal - nest.current)}`
                    )
                  }
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">{nest.name}</h3>
                    <Badge variant="info">{nest.frequency}</Badge>
                  </div>
                  <p className="text-2xl font-bold tabular-nums text-[var(--text-primary)] mb-1">
                    {fmtCurrency(nest.current)}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mb-3">
                    of {fmtCurrency(nest.goal)} goal
                  </p>
                  <ProgressBar
                    value={nest.current}
                    max={nest.goal}
                    color="bg-brand-green"
                    showLabel
                  />
                  <p className="mt-2 text-xs text-[var(--text-secondary)]">
                    <LearnTooltip term="Dollar Cost Averaging">
                      <span>Auto-saving</span>
                    </LearnTooltip>{' '}
                    {fmtCurrency(nest.autoAmount)} {nest.frequency.toLowerCase()}
                  </p>
                </Card>
              ))}
            </StaggeredList>
          )}
        </MobileSection>
      </ScrollReveal>

      {/* Charts Row — collapse on mobile */}
      <MobileSection title="Trends" defaultCollapsed={isMobile}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">
              <LearnTooltip term="Savings Rate">
                <span>Savings Rate</span>
              </LearnTooltip>{' '}
              Trend
            </h3>
            <LineChart
              data={savingsRateHistory.map((p) => ({ label: p.m, value: p.r }))}
              height={isMobile ? 140 : 180}
              color="#2d8f5e"
              formatValue={(v) => `${v}%`}
            />
          </Card>
          <Card>
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">
              <LearnTooltip term="Compound Interest">
                <span>Cumulative Savings</span>
              </LearnTooltip>{' '}
              2026
            </h3>
            <LineChart
              data={actualSavings.map((p) => ({ label: p.m, value: p.v }))}
              height={isMobile ? 140 : 180}
              color="#0a8ebc"
            />
          </Card>
        </div>
      </MobileSection>

      {/* Achievements */}
      <ScrollReveal>
        <MobileSection title="Achievements" defaultCollapsed={isMobile}>
          <Card>
            <ShowMore
              items={achievements}
              mobileLimit={4}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              renderItem={(a) => (
                <button
                  key={a.name}
                  type="button"
                  className={cn(
                    'p-3 rounded-xl border text-left transition-all min-h-[44px] active:scale-[0.98]',
                    a.done
                      ? 'border-brand-green/30 bg-brand-green/5'
                      : 'border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]'
                  )}
                  onClick={() =>
                    openSheet(
                      a.name,
                      `${a.description}${a.done ? `\n\nCompleted: ${a.date}` : `\n\nProgress: ${a.progress}%`}`
                    )
                  }
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn('text-sm', a.done ? 'text-brand-green' : 'text-[var(--text-muted)]')}>
                      {a.done ? '\u2713' : '\u25CB'}
                    </span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{a.name}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] ml-6">{a.description}</p>
                  {!a.done && a.progress !== undefined && (
                    <div className="mt-2 ml-6">
                      <ProgressBar value={a.progress} max={100} height="h-1" />
                    </div>
                  )}
                </button>
              )}
            />
          </Card>
        </MobileSection>
      </ScrollReveal>

      {/* GOAL PROGRESS RINGS */}
      {!isMobile && (
        <ScrollReveal>
          <GoalProgressRings />
        </ScrollReveal>
      )}

      <QuickTip page="save" />
    </div>
  );
}
