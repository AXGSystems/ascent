'use client';

import { useState } from 'react';
import { transactions } from '@/lib/data';
import { fmtCurrency, cn, whoLabel, whoBadgeColor } from '@/lib/utils';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { useStore } from '@/lib/store';

export default function TransactionsPage() {
  const openSheet = useStore((s) => s.openSheet);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [whoFilter, setWhoFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(transactions.map((t) => t.category)))];
  const whos = ['All', 'C', 'Ch', 'J'];

  const filtered = transactions.filter((tx) => {
    const matchSearch =
      search === '' ||
      tx.name.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'All' || tx.category === catFilter;
    const matchWho = whoFilter === 'All' || tx.who === whoFilter;
    return matchSearch && matchCat && matchWho;
  });

  const totalIn = filtered.filter((t) => t.amount > 0).reduce((a, t) => a + t.amount, 0);
  const totalOut = Math.abs(filtered.filter((t) => t.amount < 0).reduce((a, t) => a + t.amount, 0));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="sr-only">Transactions</h1>
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">
                Transactions
              </p>
              <p className="text-2xl font-bold text-white">
                {filtered.length} transactions
              </p>
              <p className="mt-1 text-sm text-white/50">
                All activity across your accounts
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <div className="text-right">
                <p className="text-xs text-white/50">Income</p>
                <p className="text-lg font-bold tabular-nums text-emerald-300">+{fmtCurrency(totalIn)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/50">Expenses</p>
                <p className="text-lg font-bold tabular-nums text-red-300">-{fmtCurrency(totalOut)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="sr-only" htmlFor="tx-page-search">Search</label>
            <input
              id="tx-page-search"
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              maxLength={200}
              className="w-full px-4 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-teal/30 min-h-[44px]"
            />
          </div>
          <div className="flex gap-2">
            <label className="sr-only" htmlFor="tx-page-cat">Category</label>
            <select
              id="tx-page-cat"
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-brand-teal/30 min-h-[44px]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <label className="sr-only" htmlFor="tx-page-who">Who</label>
            <select
              id="tx-page-who"
              value={whoFilter}
              onChange={(e) => setWhoFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-brand-teal/30 min-h-[44px]"
            >
              {whos.map((w) => (
                <option key={w} value={w}>{w === 'All' ? 'All' : whoLabel(w)}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Transaction list */}
      <Card padding={false}>
        <div className="divide-y divide-[var(--border-color)]">
          {filtered.map((tx) => (
            <button
              key={`${tx.name}-${tx.date}-${tx.amount}`}
              type="button"
              className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-[var(--bg-card-hover)] transition-colors text-left min-h-[44px]"
              onClick={() =>
                openSheet(
                  tx.name,
                  `Category: ${tx.category}\nAmount: ${fmtCurrency(tx.amount)}\nDate: ${tx.date}\nWho: ${whoLabel(tx.who)}${tx.flagged ? '\n\nFLAGGED: Unusual amount detected' : ''}${tx.refund ? '\n\nRefund applied to account' : ''}${tx.income ? '\n\nIncome deposit' : ''}`
                )
              }
            >
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0',
                  whoBadgeColor(tx.who)
                )}
              >
                {tx.who}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate flex items-center gap-2">
                  {tx.name}
                  {tx.flagged && <Badge variant="danger">Flagged</Badge>}
                  {tx.refund && <Badge variant="success">Refund</Badge>}
                  {tx.income && <Badge variant="info">Income</Badge>}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                  {tx.category} - {tx.date}
                </p>
              </div>
              <span
                className={cn(
                  'text-sm font-semibold tabular-nums whitespace-nowrap',
                  tx.amount >= 0 ? 'text-brand-green' : 'text-[var(--text-primary)]'
                )}
              >
                {tx.amount >= 0 ? '+' : ''}{fmtCurrency(tx.amount)}
              </span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-sm text-[var(--text-muted)]">
              No transactions match your filters. Try adjusting your search, category, or who filter.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
