'use client';

import { useState } from 'react';
import { chargeIQDemoCharges } from '@/lib/data';
import { cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import ProgressBar from '@/components/ProgressBar';
import DonutChart from '@/components/DonutChart';
import QuickTip from '@/components/QuickTip';
import { useStore } from '@/lib/store';
import AdvisorTip from '@/components/AdvisorTip';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';

const avgConfidence = Math.round(
  chargeIQDemoCharges.reduce((a, c) => a + c.confidence, 0) / chargeIQDemoCharges.length
);
const highConf = chargeIQDemoCharges.filter((c) => c.confidence >= 90).length;
const medConf = chargeIQDemoCharges.filter((c) => c.confidence >= 80 && c.confidence < 90).length;
const lowConf = chargeIQDemoCharges.filter((c) => c.confidence < 80).length;

const categoryBreakdown = chargeIQDemoCharges.reduce<Record<string, number>>((acc, c) => {
  acc[c.category] = (acc[c.category] || 0) + 1;
  return acc;
}, {});

const categoryColors: Record<string, string> = {
  Software: '#0a8ebc',
  Dining: '#d4a843',
  Entertainment: '#2d8f5e',
  Shopping: '#c0392b',
  Bills: '#5b7ba5',
};

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
      <h1 className="sr-only">ChargeIQ</h1>
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-navy to-brand-teal-dark p-4 md:p-6 lg:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">
              ChargeIQ
            </p>
            <p className="text-2xl md:text-3xl font-bold text-white">
              Identify Mystery Charges
            </p>
            <p className="mt-2 text-sm text-white/50">
              Paste a raw charge description from your bank statement to identify the merchant
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Lookups" value={`${chargeIQDemoCharges.length}`} sub="Charges identified" />
        <StatCard label="Avg Confidence" value={`${avgConfidence}%`} accent="text-brand-green" sub="Identification accuracy" />
        <StatCard label="High Confidence" value={`${highConf}`} accent="text-brand-green" sub="90%+ match rate" />
        <StatCard label="Needs Review" value={`${medConf + lowConf}`} accent="text-brand-gold" sub="Below 90% confidence" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="tip">
            Run ChargeIQ monthly &mdash; the average household has 2-3 mystery charges. Catching one fraudulent charge can save you hundreds.
          </AdvisorTip>
          <AdvisorTip type="insight">
            {highConf} of {chargeIQDemoCharges.length} charges identified with high confidence. Review the lower-confidence matches manually.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Search */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Identify a Charge</h2>
        <div className="flex gap-2">
          <label className="sr-only" htmlFor="chargeiq-search">Search charge description</label>
          <input
            id="chargeiq-search"
            type="text"
            placeholder="Paste charge (e.g. APCR*DIGITALRVRM)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            maxLength={200}
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
        <p className="text-xs text-[var(--text-muted)] mt-2">
          Tip: Copy the exact charge description from your bank statement for best results
        </p>
      </Card>

      {/* Confidence Breakdown + Category Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Confidence Breakdown</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                  High (90%+) <Badge variant="success">{highConf}</Badge>
                </span>
                <span className="text-sm tabular-nums font-semibold text-brand-green">{Math.round((highConf / chargeIQDemoCharges.length) * 100)}%</span>
              </div>
              <ProgressBar value={highConf} max={chargeIQDemoCharges.length} color="bg-brand-green" height="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                  Medium (80-89%) <Badge variant="warning">{medConf}</Badge>
                </span>
                <span className="text-sm tabular-nums font-semibold text-brand-gold">{Math.round((medConf / chargeIQDemoCharges.length) * 100)}%</span>
              </div>
              <ProgressBar value={medConf} max={chargeIQDemoCharges.length} color="bg-brand-gold" height="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                  Low (&lt;80%) <Badge variant="danger">{lowConf}</Badge>
                </span>
                <span className="text-sm tabular-nums font-semibold text-brand-red">{chargeIQDemoCharges.length > 0 ? Math.round((lowConf / chargeIQDemoCharges.length) * 100) : 0}%</span>
              </div>
              <ProgressBar value={lowConf} max={chargeIQDemoCharges.length} color="bg-brand-red" height="h-2" />
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Categories Identified</h2>
          <DonutChart
            segments={Object.entries(categoryBreakdown).map(([cat, count]) => ({
              label: cat,
              value: count,
              color: categoryColors[cat] || '#888',
            }))}
            size={140}
            centerLabel="Total"
            centerValue={`${chargeIQDemoCharges.length}`}
          />
        </Card>
      </div>

      {/* Results */}
      <section>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">
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
                No matches found. Try a different charge description or paste the exact text from your statement.
              </p>
            </Card>
          )}
        </div>
      </section>

      {/* QUICK TIP */}
      <QuickTip page="chargeiq" />
    </div>
  );
}
