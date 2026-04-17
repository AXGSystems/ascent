'use client';

import { useState } from 'react';
import { chargeIQDemoCharges } from '@/lib/data';
import { cn } from '@/lib/utils';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import ProgressBar from '@/components/ProgressBar';
import { useStore } from '@/lib/store';

export default function ChargeIQPage() {
  const openSheet = useStore((s) => s.openSheet);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(chargeIQDemoCharges);
  const [searched, setSearched] = useState(false);

  function handleSearch() {
    if (!query.trim()) {
      setResults(chargeIQDemoCharges);
      setSearched(false);
      return;
    }
    const q = query.toLowerCase();
    const found = chargeIQDemoCharges.filter(
      (c) =>
        c.raw.toLowerCase().includes(q) ||
        c.merchant.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
    setResults(found);
    setSearched(true);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">ChargeIQ</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Identify mystery charges on your statement. Paste the raw charge description below.
        </p>
      </div>

      {/* Search */}
      <Card>
        <div className="flex gap-2">
          <label className="sr-only" htmlFor="chargeiq-search">Search charge description</label>
          <input
            id="chargeiq-search"
            type="text"
            placeholder="Paste charge (e.g. APCR*DIGITALRVRM)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:ring-2 focus:ring-brand-teal/30 min-h-[48px] font-mono"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="min-h-[48px] px-6 rounded-xl bg-brand-teal text-white font-medium text-sm hover:bg-brand-teal-dark transition-colors"
          >
            Identify
          </button>
        </div>
      </Card>

      {/* Results */}
      <section>
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
          {searched ? `Results (${results.length})` : 'Recent Lookups'}
        </h2>
        <div className="space-y-3">
          {results.map((charge, i) => (
            <Card
              key={i}
              onClick={() =>
                openSheet(
                  charge.merchant,
                  `Raw Charge: ${charge.raw}\nMerchant: ${charge.merchant}\n\n${charge.description}\n\nCategory: ${charge.category}\nConfidence: ${charge.confidence}%\nPhone: ${charge.phone}\nWebsite: ${charge.website}`
                )
              }
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-mono text-xs text-[var(--text-muted)] mb-1">{charge.raw}</p>
                  <h3 className="text-base font-semibold text-[var(--text-primary)]">{charge.merchant}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mt-0.5">{charge.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="info">{charge.category}</Badge>
                    <span className="text-xs text-[var(--text-muted)]">{charge.phone}</span>
                  </div>
                </div>
                <div className="shrink-0 w-24">
                  <p className="text-xs text-[var(--text-muted)] mb-1">Confidence</p>
                  <p className={cn(
                    'text-lg font-bold tabular-nums',
                    charge.confidence >= 90 ? 'text-brand-green' : 'text-brand-gold'
                  )}>
                    {charge.confidence}%
                  </p>
                  <ProgressBar
                    value={charge.confidence}
                    max={100}
                    color={charge.confidence >= 90 ? 'bg-brand-green' : 'bg-brand-gold'}
                    height="h-1.5"
                  />
                </div>
              </div>
            </Card>
          ))}
          {results.length === 0 && (
            <Card>
              <p className="text-center text-sm text-[var(--text-muted)] py-8">
                No matches found. Try a different charge description.
              </p>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
