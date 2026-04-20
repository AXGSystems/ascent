'use client';

import { useState, useMemo } from 'react';
import Card from './Card';
import AdvisorTip from './AdvisorTip';
import { fmtCurrency } from '@/lib/utils';

interface SimCategory {
  name: string;
  current: number;
  min: number;
  max: number;
}

const categories: SimCategory[] = [
  { name: 'Groceries', current: 480, min: 200, max: 800 },
  { name: 'Dining Out', current: 280, min: 0, max: 500 },
  { name: 'Shopping', current: 235, min: 0, max: 500 },
  { name: 'Entertainment', current: 85, min: 0, max: 300 },
  { name: 'Transport', current: 120, min: 50, max: 300 },
  { name: 'Subscriptions', current: 62, min: 20, max: 200 },
];

const hawaiiWeeklyRate = 25;

function getImpact(saved: number): string {
  if (saved <= 0) return 'No additional savings.';
  const yearSaved = saved * 12;
  const hawaiiMonthsFaster = Math.round(saved / hawaiiWeeklyRate);
  const parts: string[] = [];
  parts.push(`Save ${fmtCurrency(yearSaved)}/yr`);
  if (hawaiiMonthsFaster >= 1) {
    parts.push(`fund Hawaii ${hawaiiMonthsFaster} week${hawaiiMonthsFaster > 1 ? 's' : ''} faster`);
  }
  if (yearSaved >= 1200) {
    parts.push(`that is ${fmtCurrency(yearSaved * 10)} over a decade with 5% returns`);
  }
  return parts.join(' — ');
}

export default function BudgetSimulator() {
  const [adjustments, setAdjustments] = useState<Record<string, number>>(
    Object.fromEntries(categories.map((c) => [c.name, c.current]))
  );

  const totalSaved = useMemo(() => {
    return categories.reduce((acc, cat) => {
      return acc + (cat.current - (adjustments[cat.name] ?? cat.current));
    }, 0);
  }, [adjustments]);

  return (
    <Card>
      <h2 className="text-base font-bold text-[var(--text-primary)] mb-1">
        Budget Simulator
      </h2>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        Drag sliders to see how budget changes impact your goals
      </p>

      <div className="space-y-4">
        {categories.map((cat) => {
          const val = adjustments[cat.name] ?? cat.current;
          const diff = cat.current - val;
          return (
            <div key={cat.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {cat.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm tabular-nums font-semibold text-[var(--text-primary)]">
                    {fmtCurrency(val)}
                  </span>
                  {diff !== 0 && (
                    <span className={`text-xs tabular-nums font-medium ${diff > 0 ? 'text-brand-green' : 'text-brand-red'}`}>
                      {diff > 0 ? '-' : '+'}{fmtCurrency(Math.abs(diff))}
                    </span>
                  )}
                </div>
              </div>
              <input
                type="range"
                min={cat.min}
                max={cat.max}
                step={10}
                value={val}
                onChange={(e) =>
                  setAdjustments((prev) => ({
                    ...prev,
                    [cat.name]: Number(e.target.value),
                  }))
                }
                className="w-full h-2 rounded-full appearance-none cursor-pointer accent-brand-teal bg-[var(--border-color)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-teal [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand-teal [&::-moz-range-thumb]:border-0 touch-manipulation"
              />
              <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-0.5">
                <span>{fmtCurrency(cat.min)}</span>
                <span>{fmtCurrency(cat.max)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Impact Summary */}
      <div className="mt-5 rounded-xl bg-gradient-to-r from-brand-teal/10 to-brand-green/10 border border-brand-teal/20 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-[var(--text-primary)]">Monthly Savings</span>
          <span className={`text-xl font-black tabular-nums ${totalSaved > 0 ? 'text-brand-green' : totalSaved < 0 ? 'text-brand-red' : 'text-[var(--text-muted)]'}`}>
            {totalSaved >= 0 ? '+' : ''}{fmtCurrency(totalSaved)}
          </span>
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          {getImpact(totalSaved)}
        </p>
      </div>

      {totalSaved > 50 && (
        <div className="mt-3">
          <AdvisorTip type="celebration">
            Reducing spending by {fmtCurrency(totalSaved)}/mo would add {fmtCurrency(totalSaved * 12)} to your yearly savings. That is enough to fully fund your Emergency Fund gap in {Math.ceil((5000 - 3600) / totalSaved)} months!
          </AdvisorTip>
        </div>
      )}

      <button
        type="button"
        className="mt-3 w-full py-2 rounded-lg text-xs font-medium text-brand-teal hover:bg-brand-teal/10 transition-colors"
        onClick={() => setAdjustments(Object.fromEntries(categories.map((c) => [c.name, c.current])))}
      >
        Reset to Current
      </button>
    </Card>
  );
}
