'use client';

import { useState, useMemo } from 'react';
import { financialTerms } from '@/lib/education';
import Card from '@/components/Card';
import AdvisorTip from '@/components/AdvisorTip';
import ScrollReveal from '@/components/ScrollReveal';
import QuickTip from '@/components/QuickTip';

// Extended definitions with examples and related terms
const termExtras: Record<string, { example?: string; related?: string[] }> = {
  'Net Worth': { example: 'If you have $100K in assets and $20K in debt, your net worth is $80K.', related: ['Liquidity', 'Financial Independence'] },
  'Savings Rate': { example: 'Earning $7,000/mo and saving $2,800 = 40% savings rate.', related: ['Pay Yourself First', 'Compound Interest'] },
  'Safe to Spend': { example: '$4,600 budget - $2,920 spent = $1,680 safe to spend.', related: ['Flex Budget', 'Budget', 'Variable Spending'] },
  'Flex Budget': { example: 'After bills and savings, you have $1,445 for discretionary use.', related: ['Safe to Spend', 'Variable Spending'] },
  'Emergency Fund': { example: 'Monthly expenses of $4,500 x 3 months = $13,500 target.', related: ['HYSA', 'Liquidity', 'Sinking Fund'] },
  'Debt-to-Income': { example: '$705 monthly debt / $7,080 income = 10% DTI ratio.', related: ['Credit Score', 'Refinancing'] },
  'APR': { example: 'A $1,000 balance at 22.99% APR costs ~$230/year in interest.', related: ['Compound Interest', 'Refinancing'] },
  'Compound Interest': { example: '$10,000 at 8% for 30 years becomes $100,627 without adding a penny.', related: ['Rule of 72', 'Index Fund', 'Dollar Cost Averaging'] },
  'Asset Allocation': { example: 'Age 28: 80% stocks, 15% bonds, 5% cash.', related: ['Diversification', 'Index Fund', 'ETF'] },
  'Dollar Cost Averaging': { example: 'Investing $500/mo regardless of whether the market is up or down.', related: ['Index Fund', 'ETF', 'Compound Interest'] },
  'Sinking Fund': { example: 'Saving $100/mo for 12 months = $1,200 for car insurance renewal.', related: ['Emergency Fund', 'Budget'] },
  'Budget': { example: '50% needs ($2,300), 30% wants ($1,380), 20% savings ($920).', related: ['Zero-Based Budget', 'Safe to Spend', 'Cash Flow'] },
  'Cash Flow': { example: '$7,080 income - $4,320 expenses = $2,760 positive cash flow.', related: ['Surplus', 'Budget', 'Net Worth'] },
  'Surplus': { example: 'This month you had $2,760 surplus — extra money to save or invest.', related: ['Cash Flow', 'Savings Rate'] },
  'Fixed Costs': { example: 'Mortgage $2,000, Insurance $184, Car Payment $385 = $2,569 fixed.', related: ['Variable Spending', 'Budget'] },
  'Variable Spending': { example: 'Groceries, dining, shopping — these are controllable expenses.', related: ['Fixed Costs', 'Budget'] },
  'Autopay': { example: 'Setting Chase to auto-pay your electric bill on the 10th each month.', related: ['Budget', 'Credit Score'] },
  'Credit Score': { example: 'Your 756 score qualifies you for a 6.5% mortgage rate vs 7.2% at 680.', related: ['Credit Utilization', 'APR'] },
  'Credit Utilization': { example: '$1,200 balance on $15,000 credit limit = 8% utilization.', related: ['Credit Score'] },
  'Debt Snowball': { example: 'Pay off Chase Visa ($1,800) first, then Student Loan, then Car.', related: ['Debt Avalanche'] },
  'Debt Avalanche': { example: 'Pay off Chase Visa (22.99% APR) first, then Student Loan (5.5%).', related: ['Debt Snowball'] },
  'Liquidity': { example: 'Checking account = instant access. 401(k) = penalties for early withdrawal.', related: ['Emergency Fund', 'HYSA'] },
  'Inflation': { example: 'A $5 coffee today cost $3.50 ten years ago at 3.5% annual inflation.', related: ['HYSA', 'Index Fund'] },
  'HYSA': { example: 'Marcus by Goldman Sachs offers 4.5% APY vs Chase Savings at 0.01%.', related: ['Emergency Fund', 'Compound Interest'] },
  'Index Fund': { example: 'Vanguard VTSAX tracks the entire US stock market for 0.04% fee.', related: ['ETF', 'Expense Ratio', 'Diversification'] },
  'ETF': { example: 'VTI (Vanguard Total Stock Market ETF) — same as VTSAX but trades like a stock.', related: ['Index Fund', 'Expense Ratio'] },
  'Expense Ratio': { example: 'A 0.85% ER on $26,500 = $225/yr. A 0.03% ER = $8/yr.', related: ['Index Fund', 'ETF'] },
  'Subscription': { example: 'Netflix $15.49 + Spotify $16.99 + Gym $50 = $82.48/mo recurring.', related: ['Recurring Expense', 'Budget'] },
  'A$cent Score': { example: 'Your 742 score factors in 8 sub-scores from savings to sync health.', related: ['Net Worth', 'Savings Rate', 'Credit Score'] },
  'Overdraft': { example: 'Spending $5 more than your balance can cost a $35 overdraft fee.', related: ['Budget', 'Safe to Spend'] },
  'Amortization': { example: 'Year 1 of mortgage: 70% goes to interest. Year 25: 90% goes to principal.', related: ['Refinancing', 'APR'] },
  'Refinancing': { example: 'Refinancing a 7% mortgage to 5.5% on $200K saves $60K+ in interest.', related: ['APR', 'Amortization'] },
  'Tax Deduction': { example: '$480/mo mortgage interest deduction reduces taxable income by $5,760/yr.', related: ['Tax Credit'] },
  'Tax Credit': { example: 'A $2,000 child tax credit reduces your tax bill by exactly $2,000.', related: ['Tax Deduction'] },
  'Passive Income': { example: 'Your $1,200/mo rental income and $185/quarter dividends.', related: ['Financial Independence', 'Diversification'] },
  'Diversification': { example: 'Stocks + Bonds + Real Estate + Cash = diversified portfolio.', related: ['Asset Allocation', 'Index Fund'] },
  'Bull Market': { example: 'S&P 500 rose 26% in 2024 — a classic bull market year.', related: ['Bear Market', 'Index Fund'] },
  'Bear Market': { example: 'COVID crash of March 2020: S&P 500 dropped 34% in 5 weeks.', related: ['Bull Market', 'Dollar Cost Averaging'] },
  'Recurring Expense': { example: 'Subscriptions, bills, insurance — anything that charges on a schedule.', related: ['Subscription', 'Fixed Costs'] },
  'Financial Independence': { example: '$4,500/mo expenses x 25 = $1.35M needed for FI.', related: ['Passive Income', 'Savings Rate', 'Rule of 72'] },
  'Rule of 72': { example: '72 / 8% return = 9 years to double. $50K becomes $100K by age 37.', related: ['Compound Interest', 'Index Fund'] },
  'Zero-Based Budget': { example: '$7,080 income - $4,320 expenses - $2,760 savings = $0 unallocated.', related: ['Budget', 'Pay Yourself First'] },
  'Pay Yourself First': { example: 'Auto-transfer $2,760 to savings on payday before spending anything.', related: ['Savings Rate', 'Dollar Cost Averaging'] },
};

const allTerms = Object.entries(financialTerms).sort(([a], [b]) => a.localeCompare(b));

export default function GlossaryPage() {
  const [search, setSearch] = useState('');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return allTerms;
    const q = search.toLowerCase();
    return allTerms.filter(
      ([term, def]) =>
        term.toLowerCase().includes(q) || def.toLowerCase().includes(q)
    );
  }, [search]);

  // Group by first letter
  const grouped = useMemo(() => {
    const groups: Record<string, [string, string][]> = {};
    for (const entry of filtered) {
      const letter = entry[0][0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(entry);
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Financial Glossary</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-brand-teal-dark to-brand-teal p-6 md:p-8 shadow-lg shadow-brand-navy/10 hero-sweep">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">
              Financial Education
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
              Financial Glossary
            </h2>
            <p className="text-sm text-white/60 mb-4 max-w-lg">
              {allTerms.length} financial terms explained in plain English. Search, browse, and learn at your own pace.
            </p>
            {/* Search */}
            <div className="relative max-w-md">
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search terms..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="tip">
            Financial literacy is your greatest investment. Understanding these terms helps you make confident decisions with your money.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Results count */}
      <p className="text-xs text-[var(--text-muted)]">
        Showing {filtered.length} of {allTerms.length} terms
        {search && ` matching "${search}"`}
      </p>

      {/* Alphabetical sections */}
      {grouped.map(([letter, terms]) => (
        <ScrollReveal key={letter}>
          <section>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl font-black text-brand-teal">{letter}</span>
              <div className="flex-1 h-px bg-[var(--border-color)]" />
              <span className="text-xs text-[var(--text-muted)]">{terms.length} term{terms.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {terms.map(([term, definition]) => {
                const isExpanded = expandedTerm === term;
                const extras = termExtras[term];
                return (
                  <button
                    key={term}
                    type="button"
                    className="w-full text-left"
                    onClick={() => setExpandedTerm(isExpanded ? null : term)}
                  >
                    <Card className={isExpanded ? 'ring-2 ring-brand-teal/30' : ''}>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                        {term}
                        <svg
                          width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className={`text-[var(--text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                        {definition}
                      </p>
                      {isExpanded && extras && (
                        <div className="mt-3 pt-3 border-t border-[var(--border-color)] space-y-2 animate-card-in">
                          {extras.example && (
                            <div className="rounded-lg bg-brand-teal/5 p-2">
                              <p className="text-[10px] font-semibold text-brand-teal uppercase tracking-wider mb-0.5">Example</p>
                              <p className="text-xs text-[var(--text-secondary)]">{extras.example}</p>
                            </div>
                          )}
                          {extras.related && extras.related.length > 0 && (
                            <div>
                              <p className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Related Terms</p>
                              <div className="flex flex-wrap gap-1">
                                {extras.related.map((r) => (
                                  <button
                                    key={r}
                                    type="button"
                                    className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-brand-teal/10 text-brand-teal hover:bg-brand-teal/20 transition-colors"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedTerm(r);
                                      setSearch('');
                                    }}
                                  >
                                    {r}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  </button>
                );
              })}
            </div>
          </section>
        </ScrollReveal>
      ))}

      {filtered.length === 0 && (
        <Card>
          <div className="text-center py-8">
            <p className="text-lg font-semibold text-[var(--text-primary)] mb-1">No terms found</p>
            <p className="text-sm text-[var(--text-muted)]">Try a different search term</p>
          </div>
        </Card>
      )}

      <QuickTip page="settings" />
    </div>
  );
}
