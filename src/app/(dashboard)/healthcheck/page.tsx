'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import AdvisorTip from '@/components/AdvisorTip';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/CountUp';
import QuickTip from '@/components/QuickTip';

interface HealthMetric {
  name: string;
  grade: string;
  score: number;
  maxScore: number;
  value: string;
  explanation: string;
  howToImprove: string;
  color: string;
}

const metrics: HealthMetric[] = [
  {
    name: 'Emergency Fund Coverage',
    grade: 'D',
    score: 35,
    maxScore: 100,
    value: '0.8 months',
    explanation:
      'You have 0.8 months of expenses covered by your emergency fund. The recommended minimum is 3 months, ideally 6 months. Your $3,600 covers about 24 days of essential expenses.',
    howToImprove:
      'Increase your daily auto-save from $15 to $25. At that rate, you will hit 1 month of coverage by June and 3 months by December. Consider redirecting your shopping surplus here.',
    color: '#c0392b',
  },
  {
    name: 'Savings Rate',
    grade: 'A',
    score: 92,
    maxScore: 100,
    value: '39%',
    explanation:
      'You are saving 39% of your household income — well above the recommended 20%. This puts you in the top 10% of American households. Your savings rate has been above 30% for 4 consecutive months.',
    howToImprove:
      'Maintain this excellent rate. Consider directing excess savings toward retirement accounts for tax advantages. Maxing out an IRA adds $6,500/yr in tax-advantaged growth.',
    color: '#2d8f5e',
  },
  {
    name: 'Debt-to-Income Ratio',
    grade: 'A',
    score: 95,
    maxScore: 100,
    value: '4.5%',
    explanation:
      'Your monthly debt payments ($320 student loan + $385 car) represent only 4.5% of your gross income. Lenders consider under 20% excellent and under 36% acceptable.',
    howToImprove:
      'Your DTI is already excellent. Focus on paying off the Chase Visa ($1,800 at 22.99% APR) first to eliminate your highest-interest debt and free up $45/mo.',
    color: '#2d8f5e',
  },
  {
    name: 'Credit Score',
    grade: 'B+',
    score: 78,
    maxScore: 100,
    value: '756',
    explanation:
      'Your credit score of 756 is "Good" (740+ is considered very good). It has increased 44 points over the past 12 months. You are 24 points away from the "Excellent" tier (780+).',
    howToImprove:
      'Keep credit utilization under 10% (currently around 8%). Avoid opening new accounts. Your score should naturally reach 780+ within 6-8 months if you maintain current habits.',
    color: '#0a8ebc',
  },
  {
    name: 'Budget Adherence',
    grade: 'B',
    score: 72,
    maxScore: 100,
    value: '63% spent',
    explanation:
      'You have used 63% of your April budget with 12 days remaining. Shopping is $35 over budget, and Dining is at 93%. 8 of 10 categories are within limits.',
    howToImprove:
      'Set up weekly budget check-ins every Sunday. Use the spending freeze technique for Shopping the rest of April. The Budget Simulator can help you find $50-100/mo in painless cuts.',
    color: '#0a8ebc',
  },
  {
    name: 'Account Sync Health',
    grade: 'B',
    score: 70,
    maxScore: 100,
    value: '83% synced',
    explanation:
      'Five of six accounts are syncing. Cap One Savings has been disconnected for 47 days, which means your net worth figure may be understated. Capital One Checking is 3 days stale.',
    howToImprove:
      'Reconnect Cap One Savings immediately — 47 days of missing data affects accuracy. Set up sync health notifications to catch issues within 24 hours.',
    color: '#0a8ebc',
  },
  {
    name: 'Investment Diversification',
    grade: 'C+',
    score: 58,
    maxScore: 100,
    value: 'Moderate',
    explanation:
      'Your investments are concentrated in a single brokerage (Ally Invest) with a mix of index funds and a high-fee growth fund. The REIT fund has a 0.48% expense ratio — above benchmark.',
    howToImprove:
      'Replace the Growth Fund (0.85% ER) with a low-cost total market index fund (0.03% ER). This saves $120/yr in fees. Consider adding international exposure to 20% of portfolio.',
    color: '#d4a843',
  },
  {
    name: 'Insurance Coverage',
    grade: '?',
    score: 0,
    maxScore: 100,
    value: 'Unknown',
    explanation:
      'We do not have enough data to assess your insurance coverage. Life insurance, disability insurance, and liability coverage are critical for household protection.',
    howToImprove:
      'Add your insurance policies to A$cent. At minimum, ensure you have: term life insurance (10x income), disability insurance, renters/homeowners, and an umbrella policy.',
    color: '#6b7280',
  },
  {
    name: 'Expense Ratio',
    grade: 'C',
    score: 52,
    maxScore: 100,
    value: '0.42% avg',
    explanation:
      'Your average investment expense ratio of 0.42% is above the recommended 0.20% threshold. The Growth Fund alone costs $128/yr in fees. Total annual fee drag is approximately $215.',
    howToImprove:
      'Switch the Growth Fund and REIT to Vanguard or Fidelity equivalents with expense ratios under 0.10%. This would save $166/yr — that is $4,150+ over 25 years with compound growth.',
    color: '#d4a843',
  },
  {
    name: 'Net Worth Trend',
    grade: 'A',
    score: 90,
    maxScore: 100,
    value: 'Up 14% YoY',
    explanation:
      'Your net worth has grown from $72,400 to $82,450 — a $10,050 increase (13.9%) over the past 12 months. You have had 12 consecutive months of positive growth.',
    howToImprove:
      'Maintain this trajectory. At the current rate, you will hit $100K net worth by March 2027. Increasing savings by $100/mo would accelerate this to December 2026.',
    color: '#2d8f5e',
  },
];

function gradeColor(grade: string): string {
  if (grade.startsWith('A')) return 'text-brand-green';
  if (grade.startsWith('B')) return 'text-brand-teal';
  if (grade.startsWith('C')) return 'text-brand-gold';
  if (grade.startsWith('D') || grade.startsWith('F')) return 'text-brand-red';
  return 'text-[var(--text-muted)]';
}

function overallGrade(mets: HealthMetric[]): { grade: string; score: number; explanation: string } {
  const scorable = mets.filter((m) => m.grade !== '?');
  const avg = Math.round(scorable.reduce((a, m) => a + m.score, 0) / scorable.length);
  let grade = 'B';
  if (avg >= 90) grade = 'A';
  else if (avg >= 80) grade = 'B+';
  else if (avg >= 70) grade = 'B';
  else if (avg >= 60) grade = 'C+';
  else if (avg >= 50) grade = 'C';
  else if (avg >= 40) grade = 'D';
  else grade = 'F';

  return {
    grade,
    score: avg,
    explanation:
      grade === 'B'
        ? 'Your financial health is solid with strong savings and low debt. Focus on building your emergency fund and optimizing investment fees to reach an A.'
        : `Your overall financial health score is ${avg}/100. Keep improving your weakest areas for the biggest gains.`,
  };
}

export default function HealthCheckPage() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const overall = overallGrade(metrics);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Financial Health Check</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-green via-brand-teal to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-brand-green/10 hero-sweep">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">
                Overall Financial Health
              </p>
              <div className="flex items-baseline gap-4">
                <p className="text-6xl md:text-7xl font-black text-white">{overall.grade}</p>
                <div>
                  <p className="text-2xl font-bold text-white/80">
                    <CountUp value={overall.score} duration={1500} /> / 100
                  </p>
                  <p className="text-sm text-white/50 mt-1 max-w-md">{overall.explanation}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/50">Metrics Graded</p>
              <p className="text-3xl font-bold text-white">{metrics.filter((m) => m.grade !== '?').length}/{metrics.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
          <StatCard label="Strongest Area" value="DTI Ratio" sub="Grade: A (95/100)" accent="text-brand-green" />
          <StatCard label="Weakest Area" value="Emergency" sub="Grade: D (35/100)" accent="text-brand-red" />
          <StatCard label="A Grades" value={`${metrics.filter((m) => m.grade.startsWith('A')).length}`} sub="of 10 metrics" accent="text-brand-green" />
          <StatCard label="Needs Work" value={`${metrics.filter((m) => m.grade === 'D' || m.grade === 'F' || m.grade === '?').length}`} sub="metrics below C" accent="text-brand-gold" />
        </StaggeredList>
      </section>

      <ScrollReveal>
        <AdvisorTip type="insight">
          Your two biggest opportunities for improvement are Emergency Fund Coverage (D) and Expense Ratio (C). Fixing just these two could raise your overall grade to B+ within 6 months.
        </AdvisorTip>
      </ScrollReveal>

      {/* Two Column: Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {metrics.map((metric, idx) => {
          const isExpanded = expandedIdx === idx;
          return (
            <ScrollReveal key={metric.name} delay={idx * 50}>
              <button
                type="button"
                className="w-full text-left"
                onClick={() => setExpandedIdx(isExpanded ? null : idx)}
              >
                <Card className={isExpanded ? 'ring-2 ring-brand-teal/30' : ''}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-2xl font-black ${gradeColor(metric.grade)}`}>
                          {metric.grade}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[var(--text-primary)]">
                            {metric.name}
                          </p>
                          <p className="text-xs text-[var(--text-muted)]">{metric.value}</p>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs tabular-nums text-[var(--text-muted)]">
                      {metric.grade !== '?' ? `${metric.score}/100` : 'N/A'}
                    </span>
                  </div>

                  {metric.grade !== '?' && (
                    <ProgressBar
                      value={metric.score}
                      max={metric.maxScore}
                      color={
                        metric.score >= 80
                          ? 'bg-brand-green'
                          : metric.score >= 60
                            ? 'bg-brand-teal'
                            : metric.score >= 40
                              ? 'bg-brand-gold'
                              : 'bg-brand-red'
                      }
                      height="h-2"
                    />
                  )}

                  <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                    {metric.explanation}
                  </p>

                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t border-[var(--border-color)] animate-card-in">
                      <div className="rounded-lg bg-brand-teal/5 border border-brand-teal/20 p-3">
                        <p className="text-xs font-semibold text-brand-teal mb-1">How to Improve</p>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          {metric.howToImprove}
                        </p>
                      </div>
                    </div>
                  )}
                </Card>
              </button>
            </ScrollReveal>
          );
        })}
      </div>

      <QuickTip page="score" />
    </div>
  );
}
