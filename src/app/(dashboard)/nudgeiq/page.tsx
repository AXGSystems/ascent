'use client';

import { nudgeItems } from '@/lib/data';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';

const savedNudges = nudgeItems.filter((n) => n.saved);
const totalImpact = nudgeItems.filter((n) => n.saved).length;
const categoryIcons: Record<string, string> = {
  savings: '\uD83D\uDCA1',
  debt: '\uD83D\uDCB3',
  spending: '\uD83D\uDED2',
  goal: '\uD83C\uDFAF',
};
const categoryColors: Record<string, 'info' | 'danger' | 'warning' | 'success'> = {
  savings: 'info',
  debt: 'danger',
  spending: 'warning',
  goal: 'success',
};

export default function NudgeIQPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500 via-amber-500 to-brand-navy p-6 md:p-8 shadow-lg shadow-yellow-500/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">NudgeIQ</p>
            <h1 className="sr-only">NudgeIQ — AI Micro-Coaching</h1>
            <p className="text-3xl md:text-4xl font-black text-white">AI Micro-Coaching</p>
            <p className="mt-2 text-sm text-white/70">Personalized financial nudges to keep you on track.</p>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Nudges" value={`${nudgeItems.length}`} sub="This week" accent="text-brand-gold" />
        <StatCard label="Saved" value={`${totalImpact}`} sub="Actionable nudges saved" accent="text-brand-teal" />
        <StatCard label="Categories" value="4" sub="Savings, Debt, Spending, Goals" />
        <StatCard label="Est. Impact" value="$2,500+" sub="Annual savings potential" accent="text-brand-green" />
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Nudge Feed */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-base font-bold text-[var(--text-primary)]">Insight Feed</h2>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {nudgeItems.map((nudge) => (
                <div key={nudge.id} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl shrink-0 mt-0.5">{categoryIcons[nudge.category]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={categoryColors[nudge.category]}>
                          {nudge.category}
                        </Badge>
                        <span className="text-xs text-[var(--text-muted)]">{nudge.date}</span>
                        {nudge.saved && (
                          <span className="text-xs text-brand-teal font-medium">{'\u2605'} Saved</span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--text-primary)] leading-relaxed">{nudge.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-semibold text-brand-green">{nudge.impact}</span>
                        <button
                          type="button"
                          className="text-xs font-medium text-brand-teal hover:underline"
                        >
                          {nudge.saved ? 'Unsave' : 'Save'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Saved Nudges */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Saved Nudges</h2>
            {savedNudges.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)]">No saved nudges yet. Tap Save on any nudge to keep it here.</p>
            ) : (
              <div className="space-y-3">
                {savedNudges.map((nudge) => (
                  <div key={nudge.id} className="p-3 rounded-xl border border-brand-teal/20 bg-brand-teal/5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm">{categoryIcons[nudge.category]}</span>
                      <Badge variant={categoryColors[nudge.category]}>{nudge.category}</Badge>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{nudge.message}</p>
                    <p className="text-xs font-semibold text-brand-green mt-1">{nudge.impact}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Category Breakdown */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">By Category</h2>
            <div className="space-y-3">
              {(['savings', 'debt', 'spending', 'goal'] as const).map((cat) => {
                const count = nudgeItems.filter((n) => n.category === cat).length;
                return (
                  <div key={cat} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{categoryIcons[cat]}</span>
                      <span className="text-sm font-medium text-[var(--text-primary)] capitalize">{cat === 'goal' ? 'Goals' : cat}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm tabular-nums text-[var(--text-muted)]">{count}</span>
                      <Badge variant={categoryColors[cat]}>{cat}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Frequency Settings */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Nudge Frequency</h2>
            <div className="space-y-3">
              {[
                { label: 'Daily digest', desc: 'Summary of top nudges each morning', on: true },
                { label: 'Real-time alerts', desc: 'Instant nudges during spending', on: true },
                { label: 'Weekly recap', desc: 'Sunday evening weekly insights', on: false },
                { label: 'Goal milestones', desc: 'Celebrate when goals are reached', on: true },
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
        </div>
      </section>
    </div>
  );
}
