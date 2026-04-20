'use client';

import { cn, fmtCurrency } from '@/lib/utils';
import { nwHistory, cashFlow, monthlySpending } from '@/lib/data';
import Card from './Card';
import Sparkline from './Sparkline';

// Net worth trend
const currentNW = nwHistory[nwHistory.length - 1].v;
const prevNW = nwHistory[nwHistory.length - 2].v;
const nwDelta = currentNW - prevNW;

// Spending trend
const latestSpend = monthlySpending[monthlySpending.length - 1];
const prevSpend = monthlySpending[monthlySpending.length - 2];
const totalLatest = latestSpend.g + latestSpend.d + latestSpend.s + latestSpend.e + latestSpend.t;
const totalPrev = prevSpend.g + prevSpend.d + prevSpend.s + prevSpend.e + prevSpend.t;
const spendDeltaPct = Math.round(((totalLatest - totalPrev) / totalPrev) * 100);

// Savings trend (cash flow surplus)
const latestCF = cashFlow[cashFlow.length - 1];
const prevCF = cashFlow[cashFlow.length - 2];
const latestSurplus = latestCF.inc - latestCF.exp;
const prevSurplus = prevCF.inc - prevCF.exp;
const savingsDelta = latestSurplus - prevSurplus;

interface TrendRowProps {
  label: string;
  direction: 'up' | 'down';
  value: string;
  positive: boolean;
  sparkData: number[];
  sparkColor: string;
}

function TrendRow({ label, direction, value, positive, sparkData, sparkColor }: TrendRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2 min-w-0">
        <span className={cn(
          'text-xs font-semibold w-3',
          positive ? 'text-brand-green' : 'text-brand-red'
        )}>
          {direction === 'up' ? '\u2191' : '\u2193'}
        </span>
        <div>
          <p className="text-xs font-medium text-[var(--text-primary)]">{label}</p>
          <p className={cn(
            'text-xs font-semibold tabular-nums',
            positive ? 'text-brand-green' : 'text-brand-red'
          )}>
            {value}
          </p>
        </div>
      </div>
      <Sparkline
        data={sparkData}
        width={80}
        height={28}
        color={sparkColor}
      />
    </div>
  );
}

export default function TrendMini() {
  return (
    <Card>
      <h2 className="text-base font-bold text-[var(--text-primary)] mb-1">
        30-Day Trends
      </h2>
      <div className="divide-y divide-[var(--border-color)]">
        <TrendRow
          label="Net Worth"
          direction="up"
          value={`+${fmtCurrency(nwDelta)}`}
          positive={true}
          sparkData={nwHistory.slice(-6).map((p) => p.v)}
          sparkColor="#2d8f5e"
        />
        <TrendRow
          label="Spending"
          direction={spendDeltaPct <= 0 ? 'down' : 'up'}
          value={`${spendDeltaPct > 0 ? '+' : ''}${spendDeltaPct}% vs last month`}
          positive={spendDeltaPct <= 0}
          sparkData={monthlySpending.slice(-6).map((m) => m.g + m.d + m.s + m.e + m.t)}
          sparkColor={spendDeltaPct <= 0 ? '#2d8f5e' : '#c0392b'}
        />
        <TrendRow
          label="Monthly Surplus"
          direction={savingsDelta >= 0 ? 'up' : 'down'}
          value={`${savingsDelta >= 0 ? '+' : ''}${fmtCurrency(savingsDelta)} vs last month`}
          positive={savingsDelta >= 0}
          sparkData={cashFlow.slice(-6).map((c) => c.inc - c.exp)}
          sparkColor={savingsDelta >= 0 ? '#2d8f5e' : '#c0392b'}
        />
      </div>
    </Card>
  );
}
