'use client';

import { creditHistory } from '@/lib/data';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import LineChart from '@/components/LineChart';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';

const current = creditHistory[creditHistory.length - 1];
const prev = creditHistory[creditHistory.length - 2];
const delta = current.score - prev.score;
const yearStart = creditHistory[0].score;
const yearDelta = current.score - yearStart;

function scoreRating(score: number): string {
  if (score >= 800) return 'Excellent';
  if (score >= 740) return 'Very Good';
  if (score >= 670) return 'Good';
  if (score >= 580) return 'Fair';
  return 'Poor';
}

export default function CreditPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="sr-only">Credit Score</h1>
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-green via-brand-teal to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-green/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-2">
                <LearnTooltip term="Credit Score">
                  <span>Current Score</span>
                </LearnTooltip>
              </p>
              <p className="text-6xl md:text-7xl font-black tabular-nums text-white">
                {current.score}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white">
                  {scoreRating(current.score)}
                </span>
                <span className="text-sm text-emerald-300 font-medium">
                  +{delta} this month
                </span>
              </div>
            </div>
            <div className="flex-1 max-w-md">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-white/50">
                  <span>300</span>
                  <span>850</span>
                </div>
                <div className="relative h-4 rounded-full overflow-hidden bg-gradient-to-r from-red-400 via-yellow-400 to-emerald-400">
                  <div
                    className="absolute top-0 w-1.5 h-full bg-white rounded-full shadow-md border border-white/60"
                    style={{ left: `${((current.score - 300) / 550) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/40">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Very Good</span>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="12-Month Change" value={`+${yearDelta}`} trend="up" trendLabel="Improving" accent="text-brand-green" />
        <StatCard label="Best Score" value={`${Math.max(...creditHistory.map((h) => h.score))}`} sub="All time high" />
        <StatCard label="Utilization" value="12%" sub="Keep under 30%" accent="text-brand-green" tooltip="Credit Utilization: The percentage of your available credit you're using. Keep it under 30% — ideally under 10% — for the best credit score impact." />
        <StatCard label="Avg Age" value="4.2 yr" sub="Average account age" />
      </section>

      {/* Chart */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Score History (12 Months)</h2>
        <LineChart
          data={creditHistory.map((p) => ({ label: p.month, value: p.score }))}
          height={220}
          color="#2d8f5e"
          formatValue={(v) => v.toString()}
        />
      </Card>

      {/* Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Positive Factors</h2>
          <div className="space-y-4">
            {[
              { name: 'Payment History', impact: 95, desc: 'On-time payments for 36+ months', weight: '35% of score' },
              { name: 'Low Utilization', impact: 88, desc: 'Using 12% of available credit', weight: '30% of score' },
              { name: 'Account Mix', impact: 75, desc: 'Good variety of credit types', weight: '10% of score' },
            ].map((f, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-[var(--text-primary)]">{f.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--text-muted)]">{f.weight}</span>
                    <span className="text-xs text-brand-green font-semibold tabular-nums">{f.impact}%</span>
                  </div>
                </div>
                <ProgressBar value={f.impact} max={100} color="bg-brand-green" height="h-1.5" />
                <p className="text-xs text-[var(--text-muted)] mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Areas to Improve</h2>
          <div className="space-y-4">
            {[
              { name: 'Hard Inquiries', impact: 45, desc: '2 inquiries in last 12 months', weight: '10% of score' },
              { name: 'Account Age', impact: 60, desc: 'Average age is 4.2 years', weight: '15% of score' },
              { name: 'Total Accounts', impact: 55, desc: 'Could benefit from more accounts', weight: '10% of score' },
            ].map((f, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-[var(--text-primary)]">{f.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--text-muted)]">{f.weight}</span>
                    <span className="text-xs text-brand-gold font-semibold tabular-nums">{f.impact}%</span>
                  </div>
                </div>
                <ProgressBar value={f.impact} max={100} color="bg-brand-gold" height="h-1.5" />
                <p className="text-xs text-[var(--text-muted)] mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Improvement Tips */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Improvement Tips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Keep Utilization Low',
              desc: 'Stay below 30% utilization on each card. You are at 12% - great work. Aim for under 10% for maximum benefit.',
              badge: 'On Track',
              variant: 'success' as const,
            },
            {
              title: 'Avoid New Hard Inquiries',
              desc: 'Each hard inquiry can drop your score 5-10 points. Wait 6+ months before applying for new credit.',
              badge: 'Watch',
              variant: 'warning' as const,
            },
            {
              title: 'Keep Old Accounts Open',
              desc: 'Average account age of 4.2 years is growing. Keep your oldest cards open, even if rarely used.',
              badge: 'Good Habit',
              variant: 'info' as const,
            },
            {
              title: 'Diversify Credit Mix',
              desc: 'A mix of revolving credit, installment loans, and mortgage helps. Your car payment and mortgage contribute positively.',
              badge: 'On Track',
              variant: 'success' as const,
            },
            {
              title: 'Set Up Autopay',
              desc: 'Never miss a payment. Your 36+ month streak is your biggest asset. Keep all accounts on autopay.',
              badge: 'Strong',
              variant: 'success' as const,
            },
            {
              title: 'Monitor Regularly',
              desc: 'Check your credit report annually for errors. Dispute any inaccuracies immediately for fastest correction.',
              badge: 'Reminder',
              variant: 'info' as const,
            },
          ].map((tip, i) => (
            <div
              key={i}
              className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]"
            >
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{tip.title}</h3>
                <Badge variant={tip.variant}>{tip.badge}</Badge>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* QUICK TIP */}
      <QuickTip page="credit" />
    </div>
  );
}
