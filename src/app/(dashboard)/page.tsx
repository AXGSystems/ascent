'use client';

import { useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useIsMobile } from '@/hooks/useIsMobile';
import {
  nwHistory,
  monthlySpending,
  cashFlow,
  transactions,
  bills,
  achievements,
  budgetCategories,
  nests,
} from '@/lib/data';
import { fmtCurrency, whoLabel, whoBadgeColor, cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Sparkline from '@/components/Sparkline';
import LineChart from '@/components/LineChart';
import DonutChart from '@/components/DonutChart';
import AreaChart from '@/components/AreaChart';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';
import Typewriter from '@/components/Typewriter';
import ExpandableCard from '@/components/ExpandableCard';
import AdvisorTip from '@/components/AdvisorTip';
import CountUp from '@/components/CountUp';
import StaggeredList from '@/components/StaggeredList';
import ProgressRing from '@/components/ProgressRing';
import ScrollReveal from '@/components/ScrollReveal';
import AchievementToast from '@/components/AchievementToast';
import LearnTooltip from '@/components/LearnTooltip';
import SmartAlertBanner from '@/components/SmartAlertBanner';
import GuidedActions from '@/components/GuidedActions';
import DailySpendTracker from '@/components/DailySpendTracker';
import WelcomeTour from '@/components/WelcomeTour';
import QuickTip from '@/components/QuickTip';
import WeeklyDigest from '@/components/WeeklyDigest';
import MobileSection from '@/components/MobileSection';
import ShowMore from '@/components/ShowMore';
import Link from 'next/link';

const currentNW = nwHistory[nwHistory.length - 1].v;
const prevNW = nwHistory[nwHistory.length - 2].v;
const nwDelta = currentNW - prevNW;
const nwPct = ((nwDelta / prevNW) * 100).toFixed(1);

const totalBudget = 4600;
const totalSpentBudget = budgetCategories.reduce((a, c) => a + c.spent, 0);
const safeToSpend = totalBudget - totalSpentBudget;
const daysLeft = 12;
const dailySafe = Math.round(safeToSpend / daysLeft);
const budgetPct = Math.round((totalSpentBudget / totalBudget) * 100);

const hawaiiNest = nests.find((n) => n.name === 'Hawaii');
const hawaiiPct = hawaiiNest ? Math.round((hawaiiNest.current / hawaiiNest.goal) * 100) : 0;

const ascentScore = 742;
const ascentScorePct = (ascentScore / 1000) * 100;

// Shopping is over budget - this is the most important alert
const shoppingCat = budgetCategories.find((c) => c.name === 'Shopping');
const shoppingOver = shoppingCat ? shoppingCat.spent - shoppingCat.allocated : 0;

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/* ------------------------------------------------------------------ */
/*  MOBILE HOME                                                        */
/* ------------------------------------------------------------------ */
function MobileHome() {
  const openSheet = useStore((s) => s.openSheet);
  const router = useRouter();
  const [typewriterDone, setTypewriterDone] = useState(false);

  const recentTx = transactions.slice(0, 3);
  const upcomingBills = bills.filter((b) => !b.paid).slice(0, 2);
  const doneAchievements = achievements.filter((a) => a.done).length;
  const totalAchievements = achievements.length;

  const greetingText = useMemo(() => {
    const g = getGreeting();
    return `${g}, Christian. ${fmtCurrency(safeToSpend)} safe to spend \u2014 ${fmtCurrency(dailySafe)}/day.`;
  }, []);

  const handleTypewriterComplete = useCallback(() => {
    setTypewriterDone(true);
  }, []);

  // Latest spending
  const latest = monthlySpending[monthlySpending.length - 1];
  const totalSpent = latest.g + latest.d + latest.s + latest.e + latest.t;

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="sr-only">A$cent Dashboard</h1>

      <WelcomeTour />
      <AchievementToast
        message="14-day budget streak! You're on fire, Christian."
        delay={2500}
        duration={5000}
      />

      {/* COMPACT GREETING */}
      <section>
        <Card className="bg-gradient-to-r from-[var(--bg-card)] to-[var(--bg-card-hover)]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-teal" aria-hidden="true">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                <path d="M18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75L18 15z" />
              </svg>
            </div>
            <div className="flex-1">
              <Typewriter
                text={greetingText}
                speed={22}
                className="text-sm leading-relaxed text-[var(--text-secondary)]"
                onComplete={handleTypewriterComplete}
              />
              {typewriterDone && (
                <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-hide -mr-4 pr-4">
                  {[
                    { label: 'Spending', href: '/spend' },
                    { label: 'Goals', href: '/save' },
                    { label: 'Coach', href: '/coach' },
                  ].map((action, i) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="animate-quick-action shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 transition-colors action-link min-h-[32px] flex items-center"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {action.label} &rarr;
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      </section>

      {/* COMPACT NET WORTH HERO */}
      <section>
        <button
          type="button"
          onClick={() => router.push('/money')}
          className="w-full text-left"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-4 shadow-lg shadow-brand-teal/10 hero-sweep">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
            <div className="absolute inset-0 hero-pattern" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/60 mb-0.5">
                  Net Worth
                </p>
                <p className="text-2xl font-black text-white">
                  <CountUp value={currentNW} prefix="$" duration={1800} />
                </p>
                <p className="mt-1 text-xs flex items-center gap-1">
                  <span className="text-emerald-300 font-semibold">
                    {'\u25B2'} +{fmtCurrency(nwDelta)} ({nwPct}%)
                  </span>
                </p>
              </div>
              <Sparkline
                data={nwHistory.map((p) => p.v)}
                width={120}
                height={40}
                color="rgba(255,255,255,0.85)"
              />
            </div>
          </div>
        </button>
      </section>

      {/* 4 STAT CARDS - 2x2 grid, ALL clickable */}
      <section>
        <StaggeredList className="grid grid-cols-2 gap-3" delay={60}>
          <StatCard
            label="Safe to Spend"
            value={fmtCurrency(safeToSpend)}
            sub={`${fmtCurrency(dailySafe)}/day`}
            accent="text-brand-green"
            href="/spend"
            tooltip="Safe to Spend: Your remaining discretionary budget after bills and savings are covered."
          />
          <StatCard
            label="Budget Spent"
            value={fmtCurrency(totalSpent)}
            trendLabel={`${budgetPct}%`}
            trend="flat"
            href="/spend"
            tooltip="Budget Spent: Total spending against your monthly budget allocation."
          />
          <StatCard
            label="Savings Rate"
            value="39%"
            trendLabel="+1%"
            trend="up"
            accent="text-brand-teal"
            href="/save"
            tooltip="Savings Rate: The percentage of income directed to savings."
          />
          <StatCard
            label="Achievements"
            value={`${doneAchievements}/${totalAchievements}`}
            sub="Tap to view"
            href="/achievements"
            tooltip="Achievements: Financial milestones you've hit."
          />
        </StaggeredList>
      </section>

      {/* SMART ALERTS - horizontal scroll, top 3 */}
      <SmartAlertBanner count={3} />

      {/* QUICK ACTIONS - horizontal scroll row */}
      <section>
        <h2 className="text-sm font-bold text-[var(--text-primary)] mb-2">Quick Actions</h2>
        <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 pb-1">
          {[
            { label: 'Budget', href: '/spend', icon: 'credit-card' },
            { label: 'Goals', href: '/save', icon: 'piggy-bank' },
            { label: 'Coach', href: '/coach', icon: 'sparkles' },
            { label: 'ChargeIQ', href: '/chargeiq', icon: 'search' },
            { label: 'Credit', href: '/credit', icon: 'shield' },
            { label: 'Forecast', href: '/forecast', icon: 'trending-up' },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="snap-start shrink-0 flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] glass-blur ring-1 ring-[var(--border-glass)] ring-inset min-w-[72px] min-h-[72px] hover:bg-[var(--bg-card-hover)] active:scale-[0.95] transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {action.icon === 'credit-card' && <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>}
                  {action.icon === 'piggy-bank' && <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.3-11-.5-11 5 0 4.3 2.7 7 7 8v2h4v-2c1 0 2-.5 3-1l2 1V14l-1-1c.7-2 .2-4-1-5z" />}
                  {action.icon === 'sparkles' && <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75L18 15z" /></>}
                  {action.icon === 'search' && <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>}
                  {action.icon === 'shield' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                  {action.icon === 'trending-up' && <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>}
                </svg>
              </div>
              <span className="text-[10px] font-medium text-[var(--text-secondary)]">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* YOUR WEEK - tap to expand */}
      <MobileSection title="Your Week">
        <WeeklyDigest />
      </MobileSection>

      {/* RECENT TRANSACTIONS - 3 items + See all */}
      <MobileSection
        title="Recent Transactions"
        trailing={
          <Link href="/transactions" className="text-xs font-medium text-brand-teal hover:underline action-link md:hidden">
            See all &rarr;
          </Link>
        }
      >
        <Card padding={false}>
          <div className="divide-y divide-[var(--border-color)]">
            {recentTx.map((tx) => (
              <button
                key={`${tx.name}-${tx.date}`}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-card-hover)] transition-colors text-left min-h-[44px] active:scale-[0.98]"
                type="button"
                onClick={() =>
                  openSheet(
                    tx.name,
                    `Category: ${tx.category}\nAmount: ${fmtCurrency(tx.amount)}\nDate: ${tx.date}\nWho: ${whoLabel(tx.who)}${tx.flagged ? '\n\nFLAGGED: Unusual amount' : ''}`
                  )
                }
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0',
                    whoBadgeColor(tx.who)
                  )}
                >
                  {tx.who}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate flex items-center gap-1.5">
                    {tx.name}
                    {tx.flagged && (
                      <span className="text-brand-red text-[10px]" aria-label="Flagged transaction">{'\u26A0'}</span>
                    )}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {tx.category} - {tx.date}
                  </p>
                </div>
                <span
                  className={cn(
                    'text-sm font-semibold tabular-nums',
                    tx.amount >= 0 ? 'text-brand-green' : 'text-[var(--text-primary)]'
                  )}
                >
                  {tx.amount >= 0 ? '+' : ''}{fmtCurrency(tx.amount)}
                </span>
              </button>
            ))}
          </div>
          <Link
            href="/transactions"
            className="flex items-center justify-center py-3 text-sm font-semibold text-brand-teal hover:text-brand-teal-dark transition-colors border-t border-[var(--border-color)] min-h-[44px]"
          >
            See all transactions &rarr;
          </Link>
        </Card>
      </MobileSection>

      {/* UPCOMING BILLS - 2 items + See all */}
      <MobileSection
        title="Upcoming Bills"
        trailing={
          <Link href="/bills" className="text-xs font-medium text-brand-teal hover:underline action-link md:hidden">
            See all &rarr;
          </Link>
        }
      >
        <Card padding={false}>
          <div className="divide-y divide-[var(--border-color)]">
            {upcomingBills.map((bill) => (
              <button
                key={bill.name}
                type="button"
                className="w-full flex items-center justify-between px-4 py-3 min-h-[44px] hover:bg-[var(--bg-card-hover)] transition-colors text-left active:scale-[0.98]"
                onClick={() =>
                  openSheet(
                    bill.name,
                    `Amount: ${fmtCurrency(bill.amount)}\nDue: ${bill.dueLabel}\n${bill.autopay ? 'Autopay enabled' : 'Manual payment required'}`
                  )
                }
              >
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{bill.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Due {bill.dueLabel}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold tabular-nums text-[var(--text-primary)]">
                    {fmtCurrency(bill.amount)}
                  </span>
                  {bill.autopay ? (
                    <Badge variant="success">Auto</Badge>
                  ) : (
                    <Badge variant="warning">Due</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
          <Link
            href="/bills"
            className="flex items-center justify-center py-3 text-sm font-semibold text-brand-teal hover:text-brand-teal-dark transition-colors border-t border-[var(--border-color)] min-h-[44px]"
          >
            See all bills &rarr;
          </Link>
        </Card>
      </MobileSection>

      {/* DAILY SPEND TRACKER */}
      <MobileSection title="Today" defaultCollapsed>
        <DailySpendTracker />
      </MobileSection>

      <QuickTip page="home" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  DESKTOP HOME (original layout, preserved)                          */
/* ------------------------------------------------------------------ */
function DesktopHome() {
  const openSheet = useStore((s) => s.openSheet);
  const router = useRouter();
  const [typewriterDone, setTypewriterDone] = useState(false);

  const recentTx = transactions.slice(0, 8);
  const upcomingBills = bills.filter((b) => !b.paid).slice(0, 4);
  const doneAchievements = achievements.filter((a) => a.done).length;
  const totalAchievements = achievements.length;

  // Latest spending for donut
  const latest = monthlySpending[monthlySpending.length - 1];
  const spendingSegments = [
    { label: 'Groceries', value: latest.g, color: '#0a8ebc' },
    { label: 'Dining', value: latest.d, color: '#d4a843' },
    { label: 'Shopping', value: latest.s, color: '#c0392b' },
    { label: 'Entertainment', value: latest.e, color: '#2d8f5e' },
    { label: 'Transport', value: latest.t, color: '#5b7ba5' },
  ];
  const totalSpent = latest.g + latest.d + latest.s + latest.e + latest.t;

  // Cash flow surplus
  const latestCF = cashFlow[cashFlow.length - 1];
  const surplus = latestCF.inc - latestCF.exp;
  const prevCF = cashFlow[cashFlow.length - 2];
  const prevSurplus = prevCF.inc - prevCF.exp;

  // Greeting text
  const greetingText = useMemo(() => {
    const g = getGreeting();
    if (shoppingOver > 0) {
      return `${g}, Christian. \u26A0\uFE0F Shopping is $${shoppingOver} over budget \u2014 heads up! \uD83D\uDCC8 Your net worth is up ${fmtCurrency(nwDelta)} this month. \uD83D\uDCB0 You have ${fmtCurrency(safeToSpend)} safe to spend \u2014 that\u2019s ${fmtCurrency(dailySafe)}/day for ${daysLeft} days. \uD83C\uDFAF Hawaii trip is ${hawaiiPct}% funded!`;
    }
    return `${g}, Christian. \uD83D\uDCC8 Your net worth is up ${fmtCurrency(nwDelta)} this month \u2014 nice! \uD83D\uDCB0 You have ${fmtCurrency(safeToSpend)} safe to spend \u2014 that\u2019s ${fmtCurrency(dailySafe)}/day for the next ${daysLeft} days. \uD83C\uDFAF Hawaii trip fund is ${hawaiiPct}% funded!`;
  }, []);

  const handleTypewriterComplete = useCallback(() => {
    setTypewriterDone(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">A$cent Dashboard</h1>

      <WelcomeTour />
      <AchievementToast
        message="14-day budget streak! You're on fire, Christian."
        delay={2500}
        duration={5000}
      />

      {/* TYPEWRITER GREETING */}
      <section>
        <Card className="bg-gradient-to-r from-[var(--bg-card)] to-[var(--bg-card-hover)]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-teal/10 flex items-center justify-center shrink-0 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-teal" aria-hidden="true">
                <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
                <path d="M18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75L18 15z" />
              </svg>
            </div>
            <div className="flex-1">
              <Typewriter
                text={greetingText}
                speed={22}
                className="text-sm leading-relaxed text-[var(--text-secondary)]"
                onComplete={handleTypewriterComplete}
              />
              {typewriterDone && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    { label: 'Review spending \u2192', href: '/spend', delay: 0 },
                    { label: 'Check goals \u2192', href: '/save', delay: 100 },
                    { label: 'Talk to Coach \u2192', href: '/coach', delay: 200 },
                  ].map((action) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className="animate-quick-action px-3 py-1.5 rounded-full text-xs font-medium bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 transition-colors action-link"
                      style={{ animationDelay: `${action.delay}ms` }}
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Card>
      </section>

      <SmartAlertBanner count={3} />

      {/* HERO: Net Worth */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-brand-teal/10 hero-sweep">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">
                <LearnTooltip term="Net Worth">
                  <span>Net Worth</span>
                </LearnTooltip>
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
                <CountUp value={currentNW} prefix="$" duration={1800} />
              </p>
              <p className="mt-2 text-sm flex items-center gap-1.5">
                <span className="text-emerald-300 font-semibold">
                  {'\u25B2'} +{fmtCurrency(nwDelta)} ({nwPct}%)
                </span>
                <span className="text-white/50">vs last month</span>
              </p>
            </div>
            <div className="shrink-0">
              <Sparkline
                data={nwHistory.map((p) => p.v)}
                width={200}
                height={56}
                color="rgba(255,255,255,0.85)"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STAT CARDS ROW + A$CENT SCORE */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-5 gap-4" delay={80}>
          <StatCard
            label="Safe to Spend"
            value={fmtCurrency(safeToSpend)}
            sub={`${fmtCurrency(dailySafe)}/day for ${daysLeft} days`}
            accent="text-brand-green"
            href="/spend"
            tooltip="Safe to Spend: Your remaining discretionary budget after bills and savings are covered."
          />
          <StatCard
            label="Budget Spent"
            value={fmtCurrency(totalSpent)}
            trendLabel={`${budgetPct}% of ${fmtCurrency(totalBudget)}`}
            trend="flat"
            href="/spend"
            tooltip="Budget Spent: Total spending against your monthly budget allocation across all categories."
          />
          <StatCard
            label="Savings Rate"
            value="39%"
            trendLabel="+1% vs Feb"
            trend="up"
            accent="text-brand-teal"
            href="/save"
            tooltip="Savings Rate: The percentage of income directed to savings and debt payoff. 20%+ is excellent."
          />
          <StatCard
            label="Achievements"
            value={`${doneAchievements}/${totalAchievements}`}
            href="/achievements"
            sub="Tap to view all"
            tooltip="Achievements: Financial milestones you have completed or are working toward."
          />
          {/* A$cent Score Ring */}
          <Card onClick={() => router.push('/score')} className="flex items-center justify-center min-h-[100px]">
            <LearnTooltip term="A$cent Score">
              <ProgressRing
                value={ascentScorePct}
                size={100}
                strokeWidth={8}
                color="#0a8ebc"
                label="A$cent"
                sublabel={`${ascentScore} / 1,000`}
              />
            </LearnTooltip>
          </Card>
        </StaggeredList>
      </section>

      {/* GUIDED ACTIONS */}
      <ScrollReveal>
        <GuidedActions />
      </ScrollReveal>

      {/* NET WORTH CHART */}
      <ScrollReveal>
        <section>
          <ExpandableCard
            title="Net Worth Chart"
            expandedContent={
              <div className="space-y-3">
                <AdvisorTip type="insight">
                  Your net worth has grown {fmtCurrency(currentNW - nwHistory[0].v)} over the past 12 months &mdash; a {((currentNW - nwHistory[0].v) / nwHistory[0].v * 100).toFixed(1)}% increase. You are on track to reach $100k within the next 18 months at this rate.
                </AdvisorTip>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">12-Mo Low</p>
                    <p className="text-sm font-bold tabular-nums">{fmtCurrency(Math.min(...nwHistory.map(p => p.v)))}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">12-Mo High</p>
                    <p className="text-sm font-bold tabular-nums">{fmtCurrency(Math.max(...nwHistory.map(p => p.v)))}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">Avg Growth</p>
                    <p className="text-sm font-bold tabular-nums text-brand-green">{fmtCurrency(Math.round((currentNW - nwHistory[0].v) / 12))}/mo</p>
                  </div>
                </div>
              </div>
            }
          >
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
              <LearnTooltip term="Net Worth">
                <span>Net Worth</span>
              </LearnTooltip>{' '}
              - 12 Months
            </h2>
            <LineChart
              data={nwHistory.map((p) => ({ label: p.m, value: p.v }))}
              height={220}
              color="#0a8ebc"
            />
          </ExpandableCard>
        </section>
      </ScrollReveal>

      {/* TWO COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Spending Donut + Budget Progress */}
          <ScrollReveal>
            <ExpandableCard
              title="April Spending"
              expandedContent={
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">Per-Person Breakdown</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-brand-teal/5 p-3">
                      <p className="text-xs text-[var(--text-muted)]">Christian</p>
                      <p className="text-lg font-bold tabular-nums">$1,540</p>
                      <p className="text-xs text-[var(--text-muted)]">53% of household</p>
                    </div>
                    <div className="rounded-lg bg-brand-gold/5 p-3">
                      <p className="text-xs text-[var(--text-muted)]">Channelle</p>
                      <p className="text-lg font-bold tabular-nums">$1,380</p>
                      <p className="text-xs text-[var(--text-muted)]">47% of household</p>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">
                    vs March: total spending is down 6%. Groceries dropped $50, but Shopping is up $25.
                  </p>
                  <AdvisorTip type="tip">
                    Shopping is $35 over budget this month. Consider pausing non-essential purchases for the remaining {daysLeft} days to stay on track.
                  </AdvisorTip>
                </div>
              }
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  April Spending
                </h2>
                <Link
                  href="/spend"
                  className="text-xs font-medium text-brand-teal hover:underline action-link"
                >
                  View all &rarr;
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <DonutChart
                  segments={spendingSegments}
                  size={140}
                  centerLabel="Total"
                  centerValue={fmtCurrency(totalSpent)}
                />
                <div className="flex-1 w-full space-y-3">
                  {budgetCategories.slice(0, 5).map((cat) => (
                    <div key={cat.name}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
                          {cat.name}
                          {cat.over && <span className="text-brand-red text-[10px]">Over</span>}
                        </span>
                        <span className="text-xs tabular-nums text-[var(--text-muted)]">
                          {fmtCurrency(cat.spent)} / {fmtCurrency(cat.allocated)}
                        </span>
                      </div>
                      <ProgressBar
                        value={cat.spent}
                        max={cat.allocated}
                        height="h-1.5"
                        over={cat.over}
                        warning={cat.warning}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </ExpandableCard>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <AdvisorTip type="warning">
              Shopping is 17% over budget. Your largest single purchase was $650 at TreatYoSelf &mdash; consider whether this fits your monthly plan.
            </AdvisorTip>
          </ScrollReveal>

          {/* Recent Transactions */}
          <ScrollReveal>
            <ExpandableCard
              title="Recent Transactions"
              expandedContent={
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">Category Totals (This Month)</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between"><span className="text-[var(--text-muted)]">Groceries</span><span className="font-medium tabular-nums">{fmtCurrency(latest.g)}</span></div>
                    <div className="flex justify-between"><span className="text-[var(--text-muted)]">Dining</span><span className="font-medium tabular-nums">{fmtCurrency(latest.d)}</span></div>
                    <div className="flex justify-between"><span className="text-[var(--text-muted)]">Shopping</span><span className="font-medium tabular-nums text-brand-red">{fmtCurrency(latest.s)}</span></div>
                    <div className="flex justify-between"><span className="text-[var(--text-muted)]">Entertainment</span><span className="font-medium tabular-nums">{fmtCurrency(latest.e)}</span></div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">1 flagged transaction: TreatYoSelf ($650) &mdash; unusual amount for Clothing.</p>
                  <AdvisorTip type="insight">
                    You have 8 transactions this week. Your average daily spend is {fmtCurrency(Math.round(totalSpent / 18))} &mdash; keeping this under {fmtCurrency(dailySafe)} will protect your budget.
                  </AdvisorTip>
                </div>
              }
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  Recent Transactions
                </h2>
                <Link
                  href="/transactions"
                  className="text-xs font-medium text-brand-teal hover:underline action-link"
                >
                  View all &rarr;
                </Link>
              </div>
              <div className="divide-y divide-[var(--border-color)] -mx-4 md:-mx-5">
                {recentTx.map((tx) => (
                  <button
                    key={`${tx.name}-${tx.date}`}
                    className="w-full flex items-center gap-3 px-4 md:px-5 py-3 hover:bg-[var(--bg-card-hover)] transition-colors text-left min-h-[44px] active:scale-[0.98]"
                    type="button"
                    onClick={() =>
                      openSheet(
                        tx.name,
                        `Category: ${tx.category}\nAmount: ${fmtCurrency(tx.amount)}\nDate: ${tx.date}\nWho: ${whoLabel(tx.who)}${tx.flagged ? '\n\nFLAGGED: Unusual amount' : ''}`
                      )
                    }
                  >
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0',
                        whoBadgeColor(tx.who)
                      )}
                    >
                      {tx.who}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate flex items-center gap-1.5">
                        {tx.name}
                        {tx.flagged && (
                          <span className="text-brand-red text-[10px]" aria-label="Flagged transaction">{'\u26A0'}</span>
                        )}
                      </p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {tx.category} - {tx.date}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'text-sm font-semibold tabular-nums',
                        tx.amount >= 0 ? 'text-brand-green' : 'text-[var(--text-primary)]'
                      )}
                    >
                      {tx.amount >= 0 ? '+' : ''}{fmtCurrency(tx.amount)}
                    </span>
                  </button>
                ))}
              </div>
            </ExpandableCard>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <AdvisorTip type="insight">
              Your most frequent spending category is Groceries with 4 transactions this month. Whole Foods and Costco account for 60% of grocery spend.
            </AdvisorTip>
          </ScrollReveal>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          <ScrollReveal>
            <DailySpendTracker />
          </ScrollReveal>

          {/* Cash Flow */}
          <ScrollReveal>
            <ExpandableCard
              title="Cash Flow"
              expandedContent={
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Income</p>
                      <p className="text-sm font-bold tabular-nums text-brand-green">{fmtCurrency(latestCF.inc)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Expenses</p>
                      <p className="text-sm font-bold tabular-nums text-brand-red">{fmtCurrency(latestCF.exp)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">
                        <LearnTooltip term="Surplus">
                          <span>Surplus</span>
                        </LearnTooltip>
                      </p>
                      <p className="text-sm font-bold tabular-nums text-brand-teal">{fmtCurrency(surplus)}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">
                    Surplus is {surplus > prevSurplus ? 'up' : 'down'} {fmtCurrency(Math.abs(surplus - prevSurplus))} vs last month.
                    At this rate, you could save an additional {fmtCurrency(surplus * 12)} per year.
                  </p>
                  <AdvisorTip type="tip">
                    Your monthly surplus of {fmtCurrency(surplus)} is strong. Directing even {fmtCurrency(200)} more toward your Emergency Fund would reach 1 full month of coverage by June.
                  </AdvisorTip>
                </div>
              }
            >
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">
                <LearnTooltip term="Cash Flow">
                  <span>Cash Flow</span>
                </LearnTooltip>
              </h2>
              <AreaChart
                labels={cashFlow.map((c) => c.m)}
                series={[
                  { label: 'Income', color: '#2d8f5e', data: cashFlow.map((c) => c.inc) },
                  { label: 'Expenses', color: '#c0392b', data: cashFlow.map((c) => c.exp) },
                ]}
                height={180}
              />
            </ExpandableCard>
          </ScrollReveal>

          {/* Upcoming Bills */}
          <ScrollReveal>
            <ExpandableCard
              title="Upcoming Bills"
              expandedContent={
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">
                        <LearnTooltip term="Autopay">
                          <span>On Autopay</span>
                        </LearnTooltip>
                      </p>
                      <p className="text-sm font-bold">{bills.filter(b => b.autopay).length}/{bills.length}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)]">Total Due</p>
                      <p className="text-sm font-bold tabular-nums">{fmtCurrency(upcomingBills.reduce((a, b) => a + b.amount, 0))}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">
                    2 bills are manual pay (Electric and Water). Setting these to autopay could prevent late fees.
                  </p>
                  <AdvisorTip type="tip">
                    Switching Electric and Water to autopay would save you an estimated $15-25/year in potential late fees and give you one less thing to track.
                  </AdvisorTip>
                </div>
              }
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  Upcoming Bills
                </h2>
                <Link
                  href="/bills"
                  className="text-xs font-medium text-brand-teal hover:underline action-link"
                >
                  View all &rarr;
                </Link>
              </div>
              <div className="divide-y divide-[var(--border-color)] -mx-4 md:-mx-5">
                {upcomingBills.map((bill) => (
                  <div key={bill.name} className="flex items-center justify-between px-4 md:px-5 py-3 min-h-[44px]">
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
                      {bill.autopay ? (
                        <Badge variant="success">Auto</Badge>
                      ) : (
                        <Badge variant="warning">Due</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ExpandableCard>
          </ScrollReveal>

          {/* Quick Actions */}
          <ScrollReveal>
            <Card>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
                Quick Actions
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Budget', href: '/spend', icon: 'credit-card' },
                  { label: 'Goals', href: '/save', icon: 'piggy-bank' },
                  { label: 'Coach', href: '/coach', icon: 'sparkles' },
                  { label: 'ChargeIQ', href: '/chargeiq', icon: 'search' },
                  { label: 'Credit', href: '/credit', icon: 'shield' },
                  { label: 'Forecast', href: '/forecast', icon: 'trending-up' },
                ].map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-[var(--border-color)] transition-all min-h-[44px] active:scale-[0.95] action-link group"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center text-brand-teal transition-transform group-hover:scale-110">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        {action.icon === 'credit-card' && <><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></>}
                        {action.icon === 'piggy-bank' && <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.3-11-.5-11 5 0 4.3 2.7 7 7 8v2h4v-2c1 0 2-.5 3-1l2 1V14l-1-1c.7-2 .2-4-1-5z" />}
                        {action.icon === 'sparkles' && <><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" /><path d="M18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75L18 15z" /></>}
                        {action.icon === 'search' && <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>}
                        {action.icon === 'shield' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                        {action.icon === 'trending-up' && <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>}
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-[var(--text-secondary)]">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>

      <QuickTip page="home" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN EXPORT — switches between mobile and desktop                  */
/* ------------------------------------------------------------------ */
export default function HomePage() {
  const isMobile = useIsMobile();

  return isMobile ? <MobileHome /> : <DesktopHome />;
}
