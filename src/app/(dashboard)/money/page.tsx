'use client';

import { useState } from 'react';
import { accounts, transactions, incomeSources, incomeHistory } from '@/lib/data';
import { fmtCurrency, cn, whoLabel, whoBadgeColor, statusColor } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import LineChart from '@/components/LineChart';
import AdvisorTip from '@/components/AdvisorTip';
import CountUp from '@/components/CountUp';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';
import MobileSection from '@/components/MobileSection';
import ShowMore from '@/components/ShowMore';
import { useStore } from '@/lib/store';
import { useIsMobile } from '@/hooks/useIsMobile';
import Link from 'next/link';

const totalAssets = accounts.filter((a) => a.value > 0).reduce((acc, a) => acc + a.value, 0);
const totalDebt = Math.abs(accounts.filter((a) => a.value < 0).reduce((acc, a) => acc + a.value, 0));
const netWorth = totalAssets - totalDebt;

export default function MoneyPage() {
  const openSheet = useStore((s) => s.openSheet);
  const isMobile = useIsMobile();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(transactions.map((t) => t.category)))];

  const filtered = transactions.filter((tx) => {
    const matchSearch = search === '' || tx.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || tx.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Money Overview</h1>
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-brand-teal-dark to-brand-teal p-4 md:p-6 lg:p-8 shadow-lg shadow-brand-navy/10 hero-sweep">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-white/60 mb-0.5 md:mb-1">
              <LearnTooltip term="Net Worth">
                <span>Total Net Worth</span>
              </LearnTooltip>
            </p>
            <p className="text-2xl md:text-4xl lg:text-5xl font-black text-white">
              <CountUp value={netWorth} prefix="$" duration={1800} />
            </p>
            <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-white/50">
              {fmtCurrency(totalAssets)} assets - {fmtCurrency(totalDebt)} debt
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" delay={80}>
          <StatCard label="Total Assets" value={fmtCurrency(totalAssets)} accent="text-brand-green" href="/accounts" tooltip="Total Assets: Sum of all accounts with positive balances." />
          <StatCard label="Total Debt" value={fmtCurrency(totalDebt)} accent="text-brand-red" href="/debt" tooltip="Total Debt: Sum of all outstanding balances on credit cards, loans." />
          <StatCard label="Net Worth" value={fmtCurrency(netWorth)} accent="text-brand-teal" tooltip="Net Worth: Assets minus debt." />
          <StatCard label="Accounts" value={`${accounts.length}`} sub="Connected" href="/accounts" tooltip="Accounts: Number of financial accounts linked to A$cent." />
        </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="warning">
            Cap One Savings has not synced in 47 days. Reconnect it to ensure your net worth is accurate.
          </AdvisorTip>
          {!isMobile && (
            <AdvisorTip type="insight">
              Your{' '}
              <LearnTooltip term="Debt-to-Income">
                <span>debt-to-asset ratio</span>
              </LearnTooltip>{' '}
              is {(totalDebt / totalAssets * 100).toFixed(1)}% &mdash; this is healthy. Most financial advisors recommend staying below 30%.
            </AdvisorTip>
          )}
        </section>
      </ScrollReveal>

      {/* Accounts — horizontal scroll on mobile, grid on desktop */}
      <ScrollReveal>
        <MobileSection title="Accounts">
          {isMobile ? (
            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 scrollbar-hide">
              {accounts.map((acct) => (
                <div key={acct.name} className="snap-start shrink-0 w-[260px]">
                  <Card
                    onClick={() =>
                      openSheet(
                        acct.name,
                        `Type: ${acct.type}\nBalance: ${fmtCurrency(acct.value)}\nOwner: ${acct.owner}\nLast Sync: ${acct.lastSync} ago\nStatus: ${acct.status.toUpperCase()}`
                      )
                    }
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate pr-2">{acct.name}</h3>
                      <div className="flex items-center gap-1 shrink-0">
                        <span className={cn(
                          'w-2 h-2 rounded-full',
                          statusColor(acct.status),
                          acct.status === 'ok' && 'breathing-dot'
                        )} style={acct.status === 'ok' ? { width: '8px', height: '8px' } : undefined} />
                        <span className="text-[10px] text-[var(--text-muted)]">{acct.lastSync}</span>
                      </div>
                    </div>
                    <p
                      className={cn(
                        'text-xl font-bold tabular-nums',
                        acct.value >= 0 ? 'text-[var(--text-primary)]' : 'text-brand-red'
                      )}
                    >
                      {fmtCurrency(acct.value)}
                    </p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Badge>{acct.type}</Badge>
                      <Badge variant={acct.owner === 'Joint' ? 'info' : 'default'}>{acct.owner}</Badge>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <StaggeredList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" delay={80}>
              {accounts.map((acct) => (
                <Card
                  key={acct.name}
                  onClick={() =>
                    openSheet(
                      acct.name,
                      `Type: ${acct.type}\nBalance: ${fmtCurrency(acct.value)}\nOwner: ${acct.owner}\nLast Sync: ${acct.lastSync} ago\nStatus: ${acct.status.toUpperCase()}`
                    )
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">{acct.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <span className={cn(
                        'w-2 h-2 rounded-full',
                        statusColor(acct.status),
                        acct.status === 'ok' && 'breathing-dot'
                      )} style={acct.status === 'ok' ? { width: '8px', height: '8px' } : undefined} />
                      <span className="text-xs text-[var(--text-muted)]">{acct.lastSync}</span>
                    </div>
                  </div>
                  <p
                    className={cn(
                      'text-2xl font-bold tabular-nums',
                      acct.value >= 0 ? 'text-[var(--text-primary)]' : 'text-brand-red'
                    )}
                  >
                    {fmtCurrency(acct.value)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge>{acct.type}</Badge>
                    <Badge variant={acct.owner === 'Joint' ? 'info' : 'default'}>{acct.owner}</Badge>
                  </div>
                </Card>
              ))}
            </StaggeredList>
          )}
        </MobileSection>
      </ScrollReveal>

      {/* Income + Transactions side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Income Sources */}
        <div className="space-y-6">
          <ScrollReveal>
            <MobileSection title="Income Sources">
              <Card padding={false}>
                <ShowMore
                  items={incomeSources}
                  mobileLimit={3}
                  className="divide-y divide-[var(--border-color)]"
                  renderItem={(src) => (
                    <button
                      key={src.source}
                      type="button"
                      className="w-full flex items-center justify-between px-4 md:px-5 py-3 min-h-[44px] hover:bg-[var(--bg-card-hover)] transition-colors text-left active:scale-[0.98]"
                      onClick={() =>
                        openSheet(
                          src.source,
                          `Amount: ${src.amount}\nFrequency: ${src.frequency}\nNext Payment: ${src.nextDate}\nStatus: ${src.status}`
                        )
                      }
                    >
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)]">{src.source}</p>
                        <p className="text-xs text-[var(--text-muted)]">
                          {src.frequency} - Next: {src.nextDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold tabular-nums text-brand-green">
                          {src.amount}
                        </span>
                        {src.status === 'due' && <Badge variant="warning">Due</Badge>}
                      </div>
                    </button>
                  )}
                />
              </Card>
            </MobileSection>
          </ScrollReveal>

          <MobileSection title="Income History" defaultCollapsed={isMobile}>
            <Card>
              <LineChart
                data={incomeHistory.map((p) => ({ label: p.m, value: p.v }))}
                height={isMobile ? 140 : 180}
                color="#2d8f5e"
              />
            </Card>
          </MobileSection>
        </div>

        {/* Transactions with search */}
        <ScrollReveal>
          <MobileSection
            title="Transactions"
            trailing={
              <Link href="/transactions" className="text-xs font-medium text-brand-teal hover:underline action-link md:hidden">
                Full list &rarr;
              </Link>
            }
          >
            <Card padding={false}>
              <div className="px-4 md:px-5 pt-4 md:pt-5 pb-3 space-y-3">
                <div className="flex gap-2">
                  <label className="sr-only" htmlFor="tx-search">Search transactions</label>
                  <input
                    id="tx-search"
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    maxLength={200}
                    className="flex-1 px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-teal/30 min-h-[44px]"
                  />
                  <label className="sr-only" htmlFor="tx-filter">Filter by category</label>
                  <select
                    id="tx-filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-brand-teal/30 min-h-[44px]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={cn(
                'divide-y divide-[var(--border-color)]',
                isMobile ? 'max-h-[320px]' : 'max-h-[500px]',
                'overflow-y-auto'
              )}>
                <ShowMore
                  items={filtered}
                  mobileLimit={5}
                  className="divide-y divide-[var(--border-color)]"
                  renderItem={(tx) => (
                    <button
                      key={`${tx.name}-${tx.date}-${tx.amount}`}
                      type="button"
                      className="w-full flex items-center gap-3 px-4 md:px-5 py-3 hover:bg-[var(--bg-card-hover)] transition-colors text-left min-h-[44px] active:scale-[0.98]"
                      onClick={() =>
                        openSheet(
                          tx.name,
                          `Category: ${tx.category}\nAmount: ${fmtCurrency(tx.amount)}\nDate: ${tx.date}\nWho: ${whoLabel(tx.who)}`
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
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {tx.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)]">{tx.category}</p>
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
                  )}
                />
                {filtered.length === 0 && (
                  <div className="px-5 py-8 text-center text-sm text-[var(--text-muted)]">
                    No transactions match your filters.
                  </div>
                )}
              </div>
            </Card>
          </MobileSection>
        </ScrollReveal>
      </div>

      <QuickTip page="money" />
    </div>
  );
}
