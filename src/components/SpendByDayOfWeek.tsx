'use client';

import { useState } from 'react';
import Card from './Card';
import AdvisorTip from './AdvisorTip';
import { fmtCurrency, cn } from '@/lib/utils';

const dayData = [
  { day: 'Mon', avg: 82 },
  { day: 'Tue', avg: 68 },
  { day: 'Wed', avg: 74 },
  { day: 'Thu', avg: 91 },
  { day: 'Fri', avg: 120 },
  { day: 'Sat', avg: 165 },
  { day: 'Sun', avg: 142 },
];

const maxAvg = Math.max(...dayData.map((d) => d.avg));
const weekdayAvg = Math.round(dayData.slice(0, 5).reduce((a, d) => a + d.avg, 0) / 5);
const weekendAvg = Math.round((dayData[5].avg + dayData[6].avg) / 2);
const weekendPctMore = Math.round(((weekendAvg - weekdayAvg) / weekdayAvg) * 100);

export default function SpendByDayOfWeek() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <Card>
      <h2 className="text-base font-bold text-[var(--text-primary)] mb-1">
        Spending by Day of Week
      </h2>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        Average daily spend based on last 3 months
      </p>

      <div className="flex items-end gap-2 h-40 mb-3">
        {dayData.map((d, i) => {
          const pct = (d.avg / maxAvg) * 100;
          const isWeekend = i >= 5;
          const isHov = hovered === i;
          return (
            <div
              key={d.day}
              className="flex-1 flex flex-col items-center gap-1"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className={cn(
                'text-[10px] tabular-nums transition-all',
                isHov ? 'text-[var(--text-primary)] font-semibold' : 'text-[var(--text-muted)]'
              )}>
                {fmtCurrency(d.avg)}
              </span>
              <div className="w-full flex items-end justify-center" style={{ height: '100px' }}>
                <div
                  className={cn(
                    'w-full max-w-[32px] rounded-t transition-all duration-500',
                    isHov && 'ring-2 ring-brand-teal'
                  )}
                  style={{
                    height: `${pct}%`,
                    backgroundColor: isWeekend ? '#c0392b' : '#0a8ebc',
                    opacity: isHov ? 1 : 0.8,
                    transition: 'height 0.5s, opacity 0.15s',
                  }}
                />
              </div>
              <span className={cn(
                'text-xs',
                isHov ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-muted)]',
                isWeekend && 'text-brand-red'
              )}>
                {d.day}
              </span>
            </div>
          );
        })}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center rounded-lg bg-[var(--border-color)]/50 p-2">
          <p className="text-[10px] text-[var(--text-muted)] uppercase">Weekday Avg</p>
          <p className="text-sm font-bold tabular-nums text-brand-teal">{fmtCurrency(weekdayAvg)}</p>
        </div>
        <div className="text-center rounded-lg bg-[var(--border-color)]/50 p-2">
          <p className="text-[10px] text-[var(--text-muted)] uppercase">Weekend Avg</p>
          <p className="text-sm font-bold tabular-nums text-brand-red">{fmtCurrency(weekendAvg)}</p>
        </div>
        <div className="text-center rounded-lg bg-[var(--border-color)]/50 p-2">
          <p className="text-[10px] text-[var(--text-muted)] uppercase">Biggest Day</p>
          <p className="text-sm font-bold tabular-nums text-[var(--text-primary)]">Saturday</p>
        </div>
      </div>

      <AdvisorTip type="tip">
        You spend {weekendPctMore}% more on weekends than weekdays. Setting a weekend spending limit of {fmtCurrency(weekdayAvg + 20)}/day could save you {fmtCurrency((weekendAvg - weekdayAvg - 20) * 8)}/month.
      </AdvisorTip>
    </Card>
  );
}
