'use client';

import { ascentSubScores } from '@/lib/data';
import { cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';

const overallScore = 742;
const maxScore = 1000;

function trendIcon(trend: 'up' | 'down' | 'flat'): string {
  if (trend === 'up') return '\u25B2';
  if (trend === 'down') return '\u25BC';
  return '\u2014';
}

function trendColor(trend: 'up' | 'down' | 'flat'): string {
  if (trend === 'up') return 'text-brand-green';
  if (trend === 'down') return 'text-brand-red';
  return 'text-[var(--text-muted)]';
}

const improvementActions = [
  { action: 'Fund emergency savings to 3 months', impact: 'High', points: '+40', category: 'Emergency Fund' },
  { action: 'Reconnect Capital One Savings', impact: 'High', points: '+30', category: 'Account Health' },
  { action: 'Get shopping under budget', impact: 'Medium', points: '+15', category: 'Budget Adherence' },
  { action: 'Set up autopay for Electric & Water', impact: 'Medium', points: '+5', category: 'Bill Health' },
  { action: 'Increase savings rate to 42%', impact: 'Low', points: '+8', category: 'Savings Rate' },
];

// SVG gauge calculations
const gaugeRadius = 80;
const gaugeCircumference = Math.PI * gaugeRadius; // half circle
const gaugePct = overallScore / maxScore;
const gaugeDash = gaugePct * gaugeCircumference;

export default function ScorePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">A$cent Score</h1>

      {/* Hero with Gauge */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 hero-pattern" />
          <div className="relative flex flex-col items-center text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-4">A$cent Score</p>
            <svg width="200" height="120" viewBox="0 0 200 120" aria-label={`Score: ${overallScore}`}>
              <path
                d="M 10 110 A 80 80 0 0 1 190 110"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d="M 10 110 A 80 80 0 0 1 190 110"
                fill="none"
                stroke="rgba(255,255,255,0.9)"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${gaugeDash} ${gaugeCircumference}`}
              />
            </svg>
            <div className="-mt-16">
              <p className="text-5xl font-bold text-white tabular-nums">{overallScore}</p>
              <p className="text-sm text-white/50">out of {maxScore}</p>
            </div>
            <p className="mt-3 text-sm text-emerald-300 font-semibold">Good - Keep improving!</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Overall" value={`${overallScore}`} sub={`/${maxScore}`} accent="text-brand-teal" />
        <StatCard label="Best Score" value="Bill Health" sub="95/100" trend="flat" trendLabel="Stable" />
        <StatCard label="Needs Work" value="Emergency" sub="28/100" accent="text-brand-red" trend="up" trendLabel="Improving" />
        <StatCard label="Potential" value="+98 pts" sub="5 actions available" accent="text-brand-green" />
      </section>

      {/* Sub-Scores + Improvements */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Sub-Scores */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Score Breakdown</h2>
          <div className="space-y-4">
            {ascentSubScores.map((sub) => (
              <div key={sub.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2">
                    {sub.name}
                    <span className={cn('text-xs', trendColor(sub.trend))}>{trendIcon(sub.trend)}</span>
                  </span>
                  <span className="text-sm tabular-nums font-semibold text-[var(--text-primary)]">
                    {sub.score}/{sub.maxScore}
                  </span>
                </div>
                <ProgressBar
                  value={sub.score}
                  max={sub.maxScore}
                  warning={sub.score < 50}
                  over={sub.score < 30}
                />
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{sub.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Improvement Actions */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Improvement Actions</h2>
          <div className="space-y-3">
            {improvementActions.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--border-color)]/50">
                <span className="text-xs font-bold text-brand-teal bg-brand-teal/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{item.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={item.impact === 'High' ? 'danger' : item.impact === 'Medium' ? 'warning' : 'default'}>
                      {item.impact}
                    </Badge>
                    <span className="text-xs font-semibold text-brand-green">{item.points}</span>
                    <span className="text-xs text-[var(--text-muted)]">{item.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
