'use client';

import { exportRecords } from '@/lib/data';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import AdvisorTip from '@/components/AdvisorTip';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';

const formats = [
  { name: 'CSV', desc: 'Spreadsheet-compatible', icon: 'table', ext: '.csv' },
  { name: 'PDF', desc: 'Formatted report', icon: 'file', ext: '.pdf' },
  { name: 'JSON', desc: 'Developer-friendly', icon: 'code', ext: '.json' },
  { name: 'Excel', desc: 'Microsoft Excel', icon: 'grid', ext: '.xlsx' },
];

const dateRanges = [
  'This Month',
  'Last Month',
  'This Quarter',
  'Last Quarter',
  'Year to Date',
  'Full Year 2025',
  'Custom Range',
];

export default function ExportPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Export Data</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1"><LearnTooltip term="Cash Flow"><span>Export</span></LearnTooltip></p>
            <p className="text-3xl md:text-4xl font-bold text-white">Export Your Data</p>
            <p className="mt-2 text-sm text-white/60">Download transactions, budgets, and reports in any format</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Formats" value="4" sub="CSV, PDF, JSON, Excel" />
        <StatCard label="Exports" value={`${exportRecords.length}`} sub="This year" />
        <StatCard label="Last Export" value="Apr 14" sub="Q1 2026 PDF" />
        <StatCard label="Data Range" value="12+ mo" sub="Available history" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="insight">
            Exporting your data quarterly helps with tax prep and financial reviews. PDF for advisors, CSV for spreadsheet analysis.
          </AdvisorTip>
          <AdvisorTip type="tip">
            Keep a backup of your financial data. A quarterly export protects you if anything goes wrong with your accounts.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Export Options */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Format Selection */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Choose Format</h2>
            <div className="grid grid-cols-2 gap-3">
              {formats.map((f) => (
                <button
                  key={f.name}
                  type="button"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-[var(--border-color)] hover:border-brand-teal hover:bg-brand-teal/5 transition-all min-h-[44px]"
                >
                  <span className="text-2xl font-bold text-brand-teal">{f.ext}</span>
                  <span className="text-sm font-medium text-[var(--text-primary)]">{f.name}</span>
                  <span className="text-xs text-[var(--text-muted)]">{f.desc}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Date Range */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Date Range</h2>
            <div className="flex flex-wrap gap-2">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  type="button"
                  className="px-4 py-2 rounded-xl text-sm font-medium border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-brand-teal hover:text-brand-teal hover:bg-brand-teal/5 transition-all min-h-[44px]"
                >
                  {range}
                </button>
              ))}
            </div>
          </Card>

          {/* Export Button */}
          <button type="button" className="w-full py-3 rounded-xl bg-brand-teal text-white font-semibold hover:bg-brand-teal-dark transition-colors min-h-[44px]">
            Generate Export
          </button>
        </div>

        {/* Export History */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Export History</h2>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {exportRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between px-5 py-3 min-h-[44px]">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{record.range}</p>
                  <p className="text-xs text-[var(--text-muted)]">{record.date} - {record.size}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{record.format}</Badge>
                  <button type="button" className="text-xs text-brand-teal hover:underline font-medium">Download</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    
      {/* QUICK TIP */}
      <QuickTip page="export" />
    </div>
  );
}
