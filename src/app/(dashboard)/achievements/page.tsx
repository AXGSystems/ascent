'use client';

import { achievements } from '@/lib/data';
import { cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';

const done = achievements.filter((a) => a.done);
const inProgress = achievements.filter((a) => !a.done);

// Simulated 30-day streak (days with financial activity)
const streakDays = [1,1,1,0,1,1,1,1,1,0,1,1,1,1,0,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1];

const milestones = [
  { date: 'Jan 15', event: 'Created first Nest', icon: 'start' },
  { date: 'Feb 22', event: 'Auto-saved $1,000', icon: 'save' },
  { date: 'Mar 30', event: 'Auto-saved $5,000', icon: 'save' },
  { date: 'Apr 1', event: '4 Money Dates completed', icon: 'heart' },
  { date: 'Apr 14', event: '14-day budget streak', icon: 'fire' },
];

const leaderboard = [
  { name: 'Christian', achievements: 3, streak: 8, score: 420 },
  { name: 'Channelle', achievements: 2, streak: 5, score: 310 },
];

export default function AchievementsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Achievements</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative text-center">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">Achievements</p>
            <p className="text-4xl md:text-5xl font-bold text-white">{done.length}<span className="text-lg font-normal text-white/50"> / {achievements.length}</span></p>
            <p className="mt-2 text-sm text-white/60">Keep going! {inProgress.length} in progress</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Completed" value={`${done.length}`} accent="text-brand-green" sub="Achievements" />
        <StatCard label="In Progress" value={`${inProgress.length}`} sub="Working on it" />
        <StatCard label="Current Streak" value="14 days" accent="text-brand-teal" sub="Under budget" />
        <StatCard label="Best Streak" value="14 days" sub="This month!" />
      </section>

      {/* Achievement Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((a) => (
          <Card key={a.name}>
            <div className="flex items-start gap-3">
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0',
                a.done ? 'bg-brand-green/15' : 'bg-[var(--border-color)]'
              )}>
                {a.done ? '\u2705' : '\u{1F3AF}'}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[var(--text-primary)]">{a.name}</p>
                  {a.done && <Badge variant="success">Done</Badge>}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{a.description}</p>
                {a.date && <p className="text-xs text-brand-teal mt-1">{a.date}</p>}
                {a.progress !== undefined && !a.done && (
                  <div className="mt-2">
                    <ProgressBar value={a.progress} max={100} showLabel />
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* Streak Heatmap + Milestones + Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-6">
        {/* Streak Heatmap */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">30-Day Activity</h2>
          <div className="grid grid-cols-10 gap-1.5">
            {streakDays.map((active, i) => (
              <div
                key={i}
                className={cn(
                  'aspect-square rounded-sm',
                  active ? 'bg-brand-teal' : 'bg-[var(--border-color)]'
                )}
                title={`Day ${i + 1}: ${active ? 'Active' : 'Inactive'}`}
              />
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-2">{streakDays.filter(Boolean).length}/30 active days</p>
        </Card>

        {/* Milestones */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Milestones</h2>
          <div className="space-y-3">
            {milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)] w-14 shrink-0">{m.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0" />
                <span className="text-xs text-[var(--text-primary)]">{m.event}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Leaderboard */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Leaderboard</h2>
          <div className="space-y-3">
            {leaderboard.map((p, i) => (
              <div key={p.name} className={cn(
                'p-3 rounded-xl',
                i === 0 ? 'bg-brand-teal/5 border border-brand-teal/10' : 'bg-[var(--border-color)]/50'
              )}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--text-primary)]">{i === 0 ? '\u{1F947}' : '\u{1F948}'} {p.name}</span>
                  <span className="text-sm font-bold tabular-nums text-brand-teal">{p.score}</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1">{p.achievements} done - {p.streak} day streak</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
