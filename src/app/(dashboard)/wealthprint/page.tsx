'use client';

import { wealthPrintSections } from '@/lib/data';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';

const enabledSections = wealthPrintSections.filter((s) => s.enabled).length;

export default function WealthPrintPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-brand-navy p-6 md:p-8 shadow-lg shadow-indigo-600/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">WealthPrint</p>
            <h1 className="sr-only">WealthPrint — Financial Portrait Generator</h1>
            <p className="text-3xl md:text-4xl font-black text-white">Financial Portrait Generator</p>
            <p className="mt-2 text-sm text-white/70">Generate a comprehensive snapshot of your financial life.</p>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Report Sections" value={`${enabledSections}`} sub={`of ${wealthPrintSections.length} available`} accent="text-brand-teal" />
        <StatCard label="Last Generated" value="Apr 14" sub="2 days ago" />
        <StatCard label="Format" value="PDF" sub="Most popular" />
        <StatCard label="Status" value="Ready" sub="All data current" accent="text-brand-green" />
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Report Preview */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Report Preview</h2>
            <div className="space-y-3">
              {wealthPrintSections.map((section) => (
                <div
                  key={section.name}
                  className={`p-4 rounded-xl border transition-colors ${section.enabled ? 'border-brand-teal/20 bg-brand-teal/5' : 'border-[var(--border-color)] opacity-50'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded flex items-center justify-center text-xs ${section.enabled ? 'bg-brand-teal text-white' : 'bg-[var(--border-color)] text-[var(--text-muted)]'}`}>
                        {section.enabled ? '\u2713' : ''}
                      </div>
                      <span className="text-sm font-semibold text-[var(--text-primary)]">{section.name}</span>
                    </div>
                    <span className="text-sm font-bold tabular-nums text-[var(--text-primary)]">{section.value}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] pl-7">{section.summary}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Sample Preview Cards */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Preview Highlights</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Net Worth', value: '$82,450', change: '+$550', positive: true },
                { label: 'Credit Score', value: '756', change: '+4', positive: true },
                { label: 'Savings Rate', value: '39%', change: '+1%', positive: true },
                { label: 'Total Debt', value: '$24,400', change: '-$850', positive: true },
                { label: 'Monthly Spend', value: '$4,320', change: '-$200', positive: true },
                { label: 'A$cent Score', value: '72/100', change: '+3', positive: true },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl border border-[var(--border-color)] text-center">
                  <p className="text-xs text-[var(--text-muted)]">{item.label}</p>
                  <p className="text-lg font-bold tabular-nums text-[var(--text-primary)]">{item.value}</p>
                  <p className={`text-xs font-medium ${item.positive ? 'text-brand-green' : 'text-brand-red'}`}>{item.change}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Format Options */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Export Format</h2>
            <div className="space-y-2">
              {[
                { format: 'PDF', desc: 'Printable document with charts', selected: true },
                { format: 'Print', desc: 'Send directly to printer', selected: false },
                { format: 'CSV', desc: 'Raw data for spreadsheets', selected: false },
                { format: 'Share Link', desc: 'Password-protected web view', selected: false },
              ].map((opt) => (
                <div
                  key={opt.format}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${opt.selected ? 'border-brand-teal bg-brand-teal/5' : 'border-[var(--border-color)] hover:bg-[var(--bg-card-hover)]'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${opt.selected ? 'border-brand-teal' : 'border-[var(--border-color)]'}`}>
                      {opt.selected && <div className="w-2 h-2 rounded-full bg-brand-teal" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{opt.format}</p>
                      <p className="text-xs text-[var(--text-muted)]">{opt.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Date Range */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Date Range</h2>
            <div className="space-y-2">
              {['Last Month', 'Last Quarter', 'Last 6 Months', 'Last Year', 'All Time'].map((range, i) => (
                <div
                  key={range}
                  className={`p-3 rounded-xl border transition-colors cursor-pointer ${i === 2 ? 'border-brand-teal bg-brand-teal/5' : 'border-[var(--border-color)] hover:bg-[var(--bg-card-hover)]'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${i === 2 ? 'border-brand-teal' : 'border-[var(--border-color)]'}`}>
                      {i === 2 && <div className="w-2 h-2 rounded-full bg-brand-teal" />}
                    </div>
                    <span className="text-sm text-[var(--text-primary)]">{range}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Generate Button */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-base font-bold text-[var(--text-primary)]">Generate Report</h2>
              <Badge variant="warning">PENDING</Badge>
            </div>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              {enabledSections} sections selected. Report will cover the last 6 months of financial data.
            </p>
            <button
              type="button"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Generate WealthPrint
            </button>
          </Card>
        </div>
      </section>
    </div>
  );
}
