'use client';

import { coupleSpendingComparison } from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
import Card from './Card';

const christianTotal = coupleSpendingComparison.reduce((a, c) => a + c.christian, 0);
const channelleTotal = coupleSpendingComparison.reduce((a, c) => a + c.channelle, 0);

// Savings rate comparison
const christianIncome = 4280;
const channelleIncome = 2800;
const christianSavingsRate = Math.round(((christianIncome - christianTotal / 1) / christianIncome) * 100);
const channelleSavingsRate = Math.round(((channelleIncome - channelleTotal / 1) / channelleIncome) * 100);

// Weekday vs Weekend
const christianWeekday = 520;
const christianWeekend = 335;
const channelleWeekday = 640;
const channelleWeekend = 445;

export default function PartnerComparison() {
  const maxSpend = Math.max(
    ...coupleSpendingComparison.map((c) => Math.max(c.christian, c.channelle))
  );

  return (
    <Card>
      <h2 className="text-base font-bold text-[var(--text-primary)] mb-1">
        Partner Spending Comparison
      </h2>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        Christian vs Channelle — April breakdown
      </p>

      {/* Side-by-side bar chart */}
      <div className="space-y-3 mb-5">
        {coupleSpendingComparison.map((cat) => (
          <div key={cat.category}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-[var(--text-secondary)]">{cat.category}</span>
              <div className="flex items-center gap-3 text-xs tabular-nums">
                <span className="text-brand-teal font-medium">{fmtCurrency(cat.christian)}</span>
                <span className="text-brand-gold font-medium">{fmtCurrency(cat.channelle)}</span>
              </div>
            </div>
            <div className="flex gap-1 h-2">
              <div className="flex-1 bg-[var(--border-color)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-teal transition-all duration-500"
                  style={{ width: `${maxSpend > 0 ? (cat.christian / maxSpend) * 100 : 0}%` }}
                />
              </div>
              <div className="flex-1 bg-[var(--border-color)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-brand-gold transition-all duration-500"
                  style={{ width: `${maxSpend > 0 ? (cat.channelle / maxSpend) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-teal" />
          <span className="text-xs text-[var(--text-secondary)]">Christian ({fmtCurrency(christianTotal)})</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-gold" />
          <span className="text-xs text-[var(--text-secondary)]">Channelle ({fmtCurrency(channelleTotal)})</span>
        </div>
      </div>

      {/* Savings Rate Comparison */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="rounded-xl bg-brand-teal/5 border border-brand-teal/20 p-3 text-center">
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Christian Savings Rate</p>
          <p className="text-xl font-bold text-brand-teal">{christianSavingsRate}%</p>
        </div>
        <div className="rounded-xl bg-brand-gold/5 border border-brand-gold/20 p-3 text-center">
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Channelle Savings Rate</p>
          <p className="text-xl font-bold text-brand-gold">{channelleSavingsRate}%</p>
        </div>
      </div>

      {/* Weekday vs Weekend Patterns */}
      <div className="rounded-xl bg-[var(--border-color)]/50 p-3">
        <h3 className="text-xs font-semibold text-[var(--text-primary)] mb-2">Spending Patterns</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] text-[var(--text-muted)]">Christian</p>
            <p className="text-xs text-[var(--text-secondary)]">
              Weekday: {fmtCurrency(christianWeekday)} | Weekend: {fmtCurrency(christianWeekend)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-[var(--text-muted)]">Channelle</p>
            <p className="text-xs text-[var(--text-secondary)]">
              Weekday: {fmtCurrency(channelleWeekday)} | Weekend: {fmtCurrency(channelleWeekend)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
