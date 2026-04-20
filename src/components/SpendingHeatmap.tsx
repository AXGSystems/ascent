'use client';

import { useState, useMemo } from 'react';
import Card from './Card';
import { fmtCurrency } from '@/lib/utils';

// Generate 30 days of mock spending data
function generateDailySpending(): { date: string; amount: number; top: string[] }[] {
  const days: { date: string; amount: number; top: string[] }[] = [];
  const merchants = [
    'Whole Foods', 'Amazon', 'Starbucks', 'Shell Gas', 'Target',
    'Costco', "Trader Joe's", 'Uber Eats', 'Netflix', 'CVS',
  ];
  const now = new Date(2026, 3, 15); // Apr 15, 2026
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay();
    // Weekends spend more
    const base = dayOfWeek === 0 || dayOfWeek === 6 ? 120 : 65;
    const variance = Math.round((Math.sin(i * 1.7) + 1) * 60 + base);
    const amount = Math.max(8, Math.min(350, variance));
    const topCount = amount > 150 ? 3 : amount > 80 ? 2 : 1;
    const shuffled = [...merchants].sort(() => Math.random() - 0.5);
    days.push({
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount,
      top: shuffled.slice(0, topCount),
    });
  }
  return days;
}

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getColor(amount: number, max: number): string {
  const ratio = amount / max;
  if (ratio < 0.15) return 'bg-emerald-100 dark:bg-emerald-900/40';
  if (ratio < 0.3) return 'bg-emerald-200 dark:bg-emerald-800/50';
  if (ratio < 0.45) return 'bg-yellow-200 dark:bg-yellow-800/40';
  if (ratio < 0.6) return 'bg-orange-200 dark:bg-orange-700/40';
  if (ratio < 0.75) return 'bg-orange-300 dark:bg-orange-600/50';
  if (ratio < 0.9) return 'bg-red-300 dark:bg-red-700/50';
  return 'bg-red-400 dark:bg-red-600/60';
}

export default function SpendingHeatmap() {
  const dailyData = useMemo(() => generateDailySpending(), []);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxAmount = Math.max(...dailyData.map((d) => d.amount));

  // Organize into weeks (rows = days of week, columns = weeks)
  // Find the first Monday
  const firstDate = new Date(2026, 2, 17); // Mar 17
  const startDow = firstDate.getDay();
  // Adjust to Monday-based
  const mondayOffset = startDow === 0 ? 6 : startDow - 1;

  // Build grid: 7 rows, ~5 columns
  const weeks: (typeof dailyData[number] | null)[][] = [];
  let weekIdx = 0;
  let dayInWeek = mondayOffset;

  // Pre-fill first week with nulls
  weeks[0] = Array(7).fill(null);
  for (let i = 0; i < dailyData.length; i++) {
    if (dayInWeek >= 7) {
      dayInWeek = 0;
      weekIdx++;
      weeks[weekIdx] = Array(7).fill(null);
    }
    weeks[weekIdx][dayInWeek] = dailyData[i];
    dayInWeek++;
  }

  return (
    <Card>
      <h2 className="text-base font-bold text-[var(--text-primary)] mb-1">
        30-Day Spending Heatmap
      </h2>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        Daily spending intensity — lighter is lower, darker is higher
      </p>
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="flex flex-col gap-1 pr-1">
          {DAYS_OF_WEEK.map((d) => (
            <div key={d} className="h-7 flex items-center">
              <span className="text-[10px] text-[var(--text-muted)] w-6">{d}</span>
            </div>
          ))}
        </div>
        {/* Grid */}
        <div className="flex gap-1 flex-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1 flex-1">
              {week.map((day, di) => {
                const globalIdx = wi * 7 + di - mondayOffset;
                const isValid = day !== null && globalIdx >= 0 && globalIdx < dailyData.length;
                return (
                  <div
                    key={di}
                    className={`h-7 rounded-sm transition-all duration-150 relative ${
                      isValid
                        ? `${getColor(day!.amount, maxAmount)} cursor-pointer hover:ring-2 hover:ring-brand-teal hover:scale-110`
                        : 'bg-transparent'
                    }`}
                    onMouseEnter={() => isValid ? setHoveredIdx(globalIdx) : null}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {hoveredIdx === globalIdx && isValid && day && (
                      <div className="absolute z-30 bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg shadow-lg p-2.5 min-w-[140px] pointer-events-none">
                        <p className="text-xs font-semibold text-[var(--text-primary)] mb-0.5">
                          {day.date}
                        </p>
                        <p className="text-sm font-bold text-brand-teal tabular-nums">
                          {fmtCurrency(day.amount)}
                        </p>
                        <div className="mt-1 text-[10px] text-[var(--text-muted)]">
                          {day.top.map((t) => (
                            <p key={t}>{t}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="text-[10px] text-[var(--text-muted)]">Less</span>
        {['bg-emerald-100 dark:bg-emerald-900/40', 'bg-emerald-200 dark:bg-emerald-800/50', 'bg-yellow-200 dark:bg-yellow-800/40', 'bg-orange-200 dark:bg-orange-700/40', 'bg-red-300 dark:bg-red-700/50', 'bg-red-400 dark:bg-red-600/60'].map((c, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${c}`} />
        ))}
        <span className="text-[10px] text-[var(--text-muted)]">More</span>
      </div>
    </Card>
  );
}
