'use client';

import {
  coupleSyncAreas,
  coupleSpendingComparison,
  conversationStarters,
} from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
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
import PartnerComparison from '@/components/PartnerComparison';

const alignmentScore = 72;
const alignedCount = coupleSyncAreas.filter((a) => a.aligned).length;
const frictionAreas = coupleSyncAreas
  .filter((a) => !a.aligned)
  .sort((a, b) => Math.abs(b.christianScore - b.channelleScore) - Math.abs(a.christianScore - a.channelleScore));

export default function CoupleSyncPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-600 via-rose-500 to-brand-navy p-6 md:p-8 shadow-lg shadow-pink-600/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1"><LearnTooltip term="Budget"><span>CoupleSync</span></LearnTooltip></p>
              <h1 className="sr-only">CoupleSync — Financial Alignment Score</h1>
              <p className="text-3xl md:text-4xl font-black text-white">Financial Alignment</p>
              <p className="mt-2 text-sm text-white/70">How aligned are you and Channelle on money?</p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-xs text-white/50 mb-1">Alignment Score</p>
              <p className="text-6xl font-black tabular-nums text-white"><CountUp value={alignmentScore} /></p>
              <p className="text-sm text-white/60 mt-1">out of 100</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Alignment Score" value={`${alignmentScore}/100`} sub="Good alignment" accent="text-brand-teal" />
        <StatCard label="Aligned Areas" value={`${alignedCount}/${coupleSyncAreas.length}`} sub="Areas in sync" accent="text-brand-green" />
        <StatCard label="Top Friction" value={frictionAreas[0]?.area ?? 'None'} sub={`${Math.abs(frictionAreas[0]?.christianScore - frictionAreas[0]?.channelleScore)}pt gap`} accent="text-brand-red" />
        <StatCard label="Conversations" value={`${conversationStarters.length}`} sub="Starter topics ready" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="insight">
            Financial alignment score is {alignmentScore}/100 &mdash; you and Channelle are aligned in {alignedCount} areas. Address the top friction point to jump 10+ points.
          </AdvisorTip>
          <AdvisorTip type="tip">
            Use the conversation starters before your next money date. Structured questions prevent arguments and build financial partnership.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Spending Comparison */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Spending Comparison</h2>
            <div className="space-y-4">
              {coupleSpendingComparison.map((cat) => {
                const maxVal = Math.max(cat.christian, cat.channelle, 1);
                return (
                  <div key={cat.category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-[var(--text-secondary)]">{cat.category}</span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {fmtCurrency(cat.christian)} vs {fmtCurrency(cat.channelle)}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div className="flex-1">
                        <div className="w-full h-2 rounded-full overflow-hidden bg-[var(--border-color)]">
                          <div
                            className="h-full rounded-full bg-brand-teal transition-all duration-500"
                            style={{ width: `${(cat.christian / maxVal) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="w-full h-2 rounded-full overflow-hidden bg-[var(--border-color)]">
                          <div
                            className="h-full rounded-full bg-brand-gold transition-all duration-500"
                            style={{ width: `${(cat.channelle / maxVal) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="flex gap-4 justify-center text-xs mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-teal" />Christian
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-gold" />Channelle
                </span>
              </div>
            </div>
          </Card>

          {/* Alignment Areas Detail */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Alignment Breakdown</h2>
            <div className="space-y-3">
              {coupleSyncAreas.map((area) => (
                <div key={area.area} className="p-3 rounded-xl border border-[var(--border-color)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[var(--text-primary)]">{area.area}</span>
                    <Badge variant={area.aligned ? 'success' : 'warning'}>
                      {area.aligned ? 'Aligned' : 'Gap'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] text-[var(--text-muted)] mb-0.5">Christian</p>
                      <ProgressBar value={area.christianScore} max={100} color="bg-brand-teal" height="h-1.5" />
                      <p className="text-xs tabular-nums text-[var(--text-secondary)] mt-0.5">{area.christianScore}/100</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[var(--text-muted)] mb-0.5">Channelle</p>
                      <ProgressBar value={area.channelleScore} max={100} color="bg-brand-gold" height="h-1.5" />
                      <p className="text-xs tabular-nums text-[var(--text-secondary)] mt-0.5">{area.channelleScore}/100</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Friction Forecast */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Friction Forecast</h2>
            <p className="text-xs text-[var(--text-muted)] mb-3">Top misalignment areas that could cause conflict</p>
            <div className="space-y-3">
              {frictionAreas.slice(0, 3).map((area, i) => (
                <div key={area.area} className="p-3 rounded-xl bg-brand-red/5 border border-brand-red/20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-brand-red/20 text-brand-red text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{area.area}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Gap: {Math.abs(area.christianScore - area.channelleScore)} points
                    ({area.christianScore > area.channelleScore ? 'Christian' : 'Channelle'} rates higher)
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Conversation Starters */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Conversation Starters</h2>
            <div className="space-y-2">
              {conversationStarters.map((starter, i) => (
                <div key={i} className="p-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--bg-card-hover)] transition-colors">
                  <div className="flex items-start gap-2">
                    <span className="text-lg shrink-0">{'\uD83D\uDCAC'}</span>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{starter}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pattern Match */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Pattern Match</h2>
            <p className="text-xs text-[var(--text-muted)] mb-3">Areas where you are aligned</p>
            <div className="space-y-2">
              {coupleSyncAreas.filter((a) => a.aligned).map((area) => (
                <div key={area.area} className="flex items-center gap-2 p-2 rounded-lg bg-brand-green/5">
                  <span className="text-brand-green text-sm">{'\u2713'}</span>
                  <span className="text-sm text-[var(--text-primary)]">{area.area}</span>
                  <span className="text-xs text-[var(--text-muted)] ml-auto">
                    {Math.round((area.christianScore + area.channelleScore) / 2)}/100
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* PARTNER COMPARISON WIDGET */}
      <ScrollReveal>
        <PartnerComparison />
      </ScrollReveal>

      <QuickTip page="couplesync" />
    </div>
  );
}
