'use client';

import { creditHistory } from '@/lib/data';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import LineChart from '@/components/LineChart';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';

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

function scoreColor(score: number): string {
  if (score >= 740) return 'text-brand-green';
  if (score >= 670) return 'text-brand-teal';
  if (score >= 580) return 'text-brand-gold';
  return 'text-brand-red';
}

export default function CreditPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">Credit Score</h1>

      {/* Hero */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Current Score
            </p>
            <p className={`text-6xl font-bold tabular-nums ${scoreColor(current.score)}`}>
              {current.score}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <Badge variant="success">{scoreRating(current.score)}</Badge>
              <span className="text-sm text-brand-green font-medium">
                +{delta} this month
              </span>
            </div>
          </div>
          <div className="flex-1 max-w-md">
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[var(--text-muted)]">
                <span>300</span>
                <span>850</span>
              </div>
              <div className="relative h-4 rounded-full overflow-hidden bg-gradient-to-r from-brand-red via-brand-gold to-brand-green">
                <div
                  className="absolute top-0 w-1 h-full bg-white border border-gray-400 rounded-full shadow-md"
                  style={{ left: `${((current.score - 300) / 550) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Very Good</span>
                <span>Excellent</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="12-Month Change" value={`+${yearDelta}`} trend="up" trendLabel="Improving" accent="text-brand-green" />
        <StatCard label="Best Score" value={`${Math.max(...creditHistory.map((h) => h.score))}`} sub="All time high" />
        <StatCard label="Utilization" value="12%" sub="Keep under 30%" accent="text-brand-green" />
        <StatCard label="Avg Age" value="4.2 yr" sub="Average account age" />
      </section>

      {/* Chart */}
      <Card>
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Score History (12 Months)</h2>
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
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Positive Factors</h2>
          <div className="space-y-4">
            {[
              { name: 'Payment History', impact: 95, desc: 'On-time payments for 36+ months' },
              { name: 'Low Utilization', impact: 88, desc: 'Using 12% of available credit' },
              { name: 'Account Mix', impact: 75, desc: 'Good variety of credit types' },
            ].map((f, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-[var(--text-primary)]">{f.name}</span>
                  <span className="text-xs text-brand-green font-semibold">{f.impact}%</span>
                </div>
                <ProgressBar value={f.impact} max={100} color="bg-brand-green" height="h-1.5" />
                <p className="text-xs text-[var(--text-muted)] mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Areas to Improve</h2>
          <div className="space-y-4">
            {[
              { name: 'Hard Inquiries', impact: 45, desc: '2 inquiries in last 12 months' },
              { name: 'Account Age', impact: 60, desc: 'Average age is 4.2 years' },
              { name: 'Total Accounts', impact: 55, desc: 'Could benefit from more accounts' },
            ].map((f, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-[var(--text-primary)]">{f.name}</span>
                  <span className="text-xs text-brand-gold font-semibold">{f.impact}%</span>
                </div>
                <ProgressBar value={f.impact} max={100} color="bg-brand-gold" height="h-1.5" />
                <p className="text-xs text-[var(--text-muted)] mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
