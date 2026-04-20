'use client';

import { cn, fmtCurrency } from '@/lib/utils';
import { bills, nests, incomeSources } from '@/lib/data';
import Card from './Card';

interface MoneyEvent {
  label: string;
  amount: string;
  type: 'bill' | 'income' | 'save' | 'goal';
  when: string;
  icon: string;
}

function buildEvents(): MoneyEvent[] {
  const events: MoneyEvent[] = [];

  // Upcoming bills (unpaid)
  bills
    .filter((b) => !b.paid)
    .slice(0, 3)
    .forEach((bill) => {
      events.push({
        label: bill.name,
        amount: fmtCurrency(bill.amount),
        type: 'bill',
        when: `Due ${bill.dueLabel}`,
        icon: bill.autopay ? '\uD83D\uDD04' : '\uD83D\uDCC5',
      });
    });

  // Expected income
  const dueIncome = incomeSources.filter((s) => s.status === 'due');
  dueIncome.forEach((src) => {
    events.push({
      label: src.source,
      amount: src.amount,
      type: 'income',
      when: src.nextDate,
      icon: '\uD83D\uDCB5',
    });
  });

  // Next paycheck
  const nextPaycheck = incomeSources.find((s) => s.source.includes('ALTA'));
  if (nextPaycheck) {
    events.push({
      label: 'Payday (ALTA)',
      amount: nextPaycheck.amount,
      type: 'income',
      when: nextPaycheck.nextDate,
      icon: '\uD83C\uDF89',
    });
  }

  // Auto-saves happening this week
  const dailySaves = nests.filter((n) => n.frequency === 'Daily');
  if (dailySaves.length > 0) {
    const total = dailySaves.reduce((a, n) => a + n.autoAmount, 0);
    events.push({
      label: `Daily auto-saves (${dailySaves.length} goals)`,
      amount: `${fmtCurrency(total)}/day`,
      type: 'save',
      when: 'Every day',
      icon: '\uD83D\uDCB0',
    });
  }

  const weeklySaves = nests.filter((n) => n.frequency === 'Weekly');
  if (weeklySaves.length > 0) {
    const total = weeklySaves.reduce((a, n) => a + n.autoAmount, 0);
    events.push({
      label: `Weekly auto-saves (${weeklySaves.length} goals)`,
      amount: `${fmtCurrency(total)}/week`,
      type: 'save',
      when: 'This week',
      icon: '\uD83D\uDCB0',
    });
  }

  // Goal milestone approaching
  const closeGoals = nests.filter((n) => {
    const pct = (n.current / n.goal) * 100;
    return pct >= 70 && pct < 100;
  });
  closeGoals.forEach((nest) => {
    const pct = Math.round((nest.current / nest.goal) * 100);
    events.push({
      label: `${nest.name} at ${pct}%`,
      amount: fmtCurrency(nest.goal - nest.current) + ' to go',
      type: 'goal',
      when: 'Milestone close',
      icon: '\uD83C\uDFAF',
    });
  });

  return events.slice(0, 7);
}

const typeColor: Record<MoneyEvent['type'], string> = {
  bill: 'text-brand-red',
  income: 'text-brand-green',
  save: 'text-brand-teal',
  goal: 'text-brand-gold',
};

export default function UpcomingEvents() {
  const events = buildEvents();

  return (
    <Card padding={false}>
      <div className="px-5 pt-5 pb-2">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          Upcoming Money Events
        </h2>
        <p className="text-xs text-[var(--text-muted)]">Next 7 days</p>
      </div>
      <div className="divide-y divide-[var(--border-color)]">
        {events.map((event, i) => (
          <div
            key={`${event.label}-${i}`}
            className="flex items-center gap-3 px-5 py-2.5 min-h-[44px]"
          >
            <span className="text-base shrink-0" aria-hidden="true">
              {event.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[var(--text-primary)] truncate">
                {event.label}
              </p>
              <p className="text-[10px] text-[var(--text-muted)]">{event.when}</p>
            </div>
            <span
              className={cn(
                'text-xs font-semibold tabular-nums shrink-0',
                typeColor[event.type]
              )}
            >
              {event.type === 'bill' ? '-' : ''}{event.amount}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
