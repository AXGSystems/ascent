'use client';

import { useState } from 'react';
import { budgetCategories, monthlyBudgetHistory, bills, subscriptions, monthlySpending } from '@/lib/data';
import { fmtCurrency, pct } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';
import BarChart from '@/components/BarChart';
import AdvisorTip from '@/components/AdvisorTip';
import CountUp from '@/components/CountUp';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';
import SpendingHeatmap from '@/components/SpendingHeatmap';
import SpendByDayOfWeek from '@/components/SpendByDayOfWeek';
import BudgetSimulator from '@/components/BudgetSimulator';
import MobileSection from '@/components/MobileSection';
import ShowMore from '@/components/ShowMore';
import { useStore } from '@/lib/store';
import { useIsMobile } from '@/hooks/useIsMobile';

const totalBudget = 4600;
const totalSpent = budgetCategories.reduce((acc, c) => acc + c.spent, 0);
const remaining = totalBudget - totalSpent;

export default function SpendPage() {
  const openSheet = useStore((s) => s.openSheet);
  const isMobile = useIsMobile();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Spending & Budget</h1>
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-brand-teal/10 hero-sweep">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-4">
            <div>
              <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-white/60 mb-0.5 md:mb-1">
                <LearnTooltip term="Budget">
                  <span>April Budget</span>
                </LearnTooltip>
              </p>
              <p className="text-2xl md:text-4xl lg:text-5xl font-black text-white">
                <CountUp value={totalSpent} prefix="$" duration={1500} /> <span className="text-sm md:text-lg font-normal text-white/50">/ {fmtCurrency(totalBudget)}</span>
              </p>
              <div className="mt-2 md:mt-3 max-w-md">
                <div className="w-full h-2 md:h-3 rounded-full overflow-hidden bg-white/20">
                  <div
                    className="h-full rounded-full bg-white/90 transition-all duration-1000 ease-out animate-progress-fill"
                    style={{ width: `${pct(totalSpent, totalBudget)}%` }}
                  />
                </div>
              </div>
              <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-white/60">
                {fmtCurrency(remaining)} remaining - {pct(totalSpent, totalBudget)}% used
              </p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-xs md:text-sm text-white/50">
                <LearnTooltip term="Safe to Spend">
                  <span>Safe to Spend</span>
                </LearnTooltip>
              </p>
              <p className="text-xl md:text-2xl font-bold tabular-nums text-emerald-300">
                <CountUp value={remaining} prefix="$" duration={1200} />
              </p>
              <p className="text-[10px] md:text-xs text-white/40">{fmtCurrency(Math.round(remaining / 12))}/day for 12 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" delay={80}>
          <StatCard label="Fixed Costs" value={fmtCurrency(1500)} sub="Housing + Insurance" tooltip="Fixed Costs: Recurring obligations like mortgage, insurance, and loans that don't change month to month." />
          <StatCard label="Variable" value={fmtCurrency(totalSpent - 1500)} sub="Discretionary" tooltip="Variable Spending: Discretionary categories like groceries, dining, and shopping." />
          <StatCard label="Over Budget" value="1 category" accent="text-brand-red" sub="Shopping +$35" tooltip="Over Budget: Categories where spending has exceeded the monthly allocation." />
          <StatCard label="Days Left" value="12" sub="In April" tooltip="Days Left: Remaining days in the billing period." />
        </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="warning">
            Shopping is $35 over its $200 budget. You have 12 days left &mdash; consider a spending freeze on non-essentials to get back on track.
          </AdvisorTip>
          {!isMobile && (
            <AdvisorTip type="tip">
              <LearnTooltip term="Variable Spending">
                <span>Dining Out</span>
              </LearnTooltip>{' '}
              is at 93% of budget with 12 days left. Cooking 3 more meals at home this week could save ~$45 and keep you under limit.
            </AdvisorTip>
          )}
        </section>
      </ScrollReveal>

      {/* Budget breakdown + history */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Category Breakdown */}
        <ScrollReveal>
          <MobileSection title="Category Breakdown">
            <Card>
              <ShowMore
                items={budgetCategories}
                mobileLimit={4}
                className="space-y-4"
                renderItem={(cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    className="w-full text-left hover:bg-[var(--border-color)] rounded-lg p-2 -mx-2 transition-colors min-h-[44px] active:scale-[0.98]"
                    onClick={() =>
                      openSheet(
                        cat.name,
                        `Allocated: ${fmtCurrency(cat.allocated)}\nSpent: ${fmtCurrency(cat.spent)}\nRemaining: ${fmtCurrency(cat.allocated - cat.spent)}\nUsed: ${pct(cat.spent, cat.allocated)}%${cat.over ? '\n\nOVER BUDGET' : ''}${cat.warning ? '\n\nApproaching limit' : ''}${cat.fixed ? '\n\nFixed cost' : ''}`
                      )
                    }
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2">
                        {cat.name}
                        {cat.over && <Badge variant="danger">Over</Badge>}
                        {cat.warning && <Badge variant="warning">Close</Badge>}
                        {cat.fixed && <Badge>Fixed</Badge>}
                      </span>
                      <span className="text-xs md:text-sm tabular-nums text-[var(--text-secondary)]">
                        {fmtCurrency(cat.spent)} / {fmtCurrency(cat.allocated)}
                      </span>
                    </div>
                    <ProgressBar
                      value={cat.spent}
                      max={cat.allocated}
                      over={cat.over}
                      warning={cat.warning}
                    />
                  </button>
                )}
              />
            </Card>
          </MobileSection>
        </ScrollReveal>

        {/* Budget History */}
        <div className="space-y-6">
          <ScrollReveal>
            <MobileSection title="Budget History" defaultCollapsed={isMobile}>
              <Card>
                <BarChart
                  data={monthlyBudgetHistory.map((m) => ({
                    label: m.m,
                    value: m.spent,
                    maxValue: m.budget,
                    color: m.spent > m.budget ? '#c0392b' : '#0a8ebc',
                  }))}
                  horizontal={false}
                />
              </Card>
            </MobileSection>
          </ScrollReveal>

          {!isMobile && (
            <ScrollReveal delay={100}>
              <Card>
                <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
                  Spending by Category (6 Months)
                </h2>
                <BarChart
                  data={[
                    { label: 'Groceries', value: monthlySpending[monthlySpending.length - 1].g, color: '#0a8ebc' },
                    { label: 'Dining', value: monthlySpending[monthlySpending.length - 1].d, color: '#d4a843' },
                    { label: 'Shopping', value: monthlySpending[monthlySpending.length - 1].s, color: '#c0392b' },
                    { label: 'Entertain', value: monthlySpending[monthlySpending.length - 1].e, color: '#2d8f5e' },
                    { label: 'Transport', value: monthlySpending[monthlySpending.length - 1].t, color: '#5b7ba5' },
                  ]}
                  horizontal={false}
                />
              </Card>
            </ScrollReveal>
          )}
        </div>
      </div>

      {/* Bills + Subscriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bills */}
        <ScrollReveal>
          <MobileSection title="Bills">
            <Card padding={false}>
              <ShowMore
                items={bills}
                mobileLimit={3}
                className="divide-y divide-[var(--border-color)]"
                renderItem={(bill) => (
                  <button
                    key={bill.name}
                    type="button"
                    className="w-full flex items-center justify-between px-4 md:px-5 py-3 min-h-[44px] hover:bg-[var(--bg-card-hover)] transition-colors text-left active:scale-[0.98]"
                    onClick={() =>
                      openSheet(
                        bill.name,
                        `Amount: ${fmtCurrency(bill.amount)}\nDue: ${bill.dueLabel}\n${bill.autopay ? 'Autopay enabled' : 'Manual payment required'}\n${bill.paid ? 'Status: Paid' : 'Status: Unpaid'}`
                      )
                    }
                  >
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{bill.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        Due {bill.dueLabel} {bill.autopay ? '- Autopay' : '- Manual'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">
                        {fmtCurrency(bill.amount)}
                      </span>
                      {bill.paid ? (
                        <Badge variant="success">Paid</Badge>
                      ) : bill.autopay ? (
                        <Badge variant="info">Auto</Badge>
                      ) : (
                        <Badge variant="warning">Due</Badge>
                      )}
                    </div>
                  </button>
                )}
              />
            </Card>
          </MobileSection>
        </ScrollReveal>

        {/* Subscriptions */}
        <ScrollReveal delay={100}>
          <MobileSection title="Subscriptions" defaultCollapsed={isMobile}>
            <Card padding={false}>
              <div className="px-4 md:px-5 pt-3 pb-2">
                <span className="text-xs text-[var(--text-muted)]">
                  {fmtCurrency(subscriptions.reduce((a, s) => a + s.amount, 0))}/mo total
                </span>
              </div>
              <ShowMore
                items={subscriptions}
                mobileLimit={3}
                className="divide-y divide-[var(--border-color)]"
                renderItem={(sub) => (
                  <button
                    key={sub.name}
                    type="button"
                    className="w-full flex items-center justify-between px-4 md:px-5 py-3 min-h-[44px] hover:bg-[var(--bg-card-hover)] transition-colors text-left active:scale-[0.98]"
                    onClick={() =>
                      openSheet(
                        sub.name,
                        `Amount: ${fmtCurrency(sub.amount)}/mo\nOwner: ${sub.owner}\nCategory: ${sub.category}\nUsage Score: ${sub.usageScore}/10${sub.issue ? `\n\nIssue: ${sub.issue}` : ''}${sub.ok ? '\n\nStatus: Active & healthy' : ''}`
                      )
                    }
                  >
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2">
                        {sub.name}
                        {sub.issue && <Badge variant="danger">{sub.issue}</Badge>}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {sub.owner} - {sub.category}
                      </p>
                    </div>
                    <span className="text-sm tabular-nums font-medium text-[var(--text-primary)]">
                      {fmtCurrency(sub.amount)}
                    </span>
                  </button>
                )}
              />
            </Card>
          </MobileSection>
        </ScrollReveal>
      </div>

      {/* SPENDING HEATMAP + DAY OF WEEK - collapse on mobile */}
      {!isMobile && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScrollReveal>
            <SpendingHeatmap />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <SpendByDayOfWeek />
          </ScrollReveal>
        </div>
      )}

      {isMobile && (
        <MobileSection title="Spending Patterns" defaultCollapsed>
          <div className="space-y-4">
            <SpendingHeatmap />
            <SpendByDayOfWeek />
          </div>
        </MobileSection>
      )}

      {/* BUDGET SIMULATOR */}
      <MobileSection title="Budget Simulator" defaultCollapsed={isMobile}>
        <BudgetSimulator />
      </MobileSection>

      <QuickTip page="spend" />
    </div>
  );
}
