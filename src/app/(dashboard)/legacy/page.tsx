'use client';

import { legacyMilestones, vaultDocuments } from '@/lib/data';
import { fmtCurrency } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import LineChart from '@/components/LineChart';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';

const legacyScore = 42;
const generationalImpact = 1650000;
const uploadedDocs = vaultDocuments.filter((d) => d.uploaded).length;

export default function LegacyPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-slate-700 to-amber-900 p-6 md:p-8 shadow-lg shadow-brand-navy/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">AncestorMode</p>
              <h1 className="sr-only">AncestorMode — Generational Wealth Tracker</h1>
              <p className="text-3xl md:text-4xl font-black text-white">Generational Wealth Tracker</p>
              <p className="mt-2 text-sm text-white/70">Building a legacy that outlasts a lifetime.</p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-xs text-white/50 mb-1">Legacy Score</p>
              <p className="text-5xl font-black tabular-nums text-white">{legacyScore}</p>
              <p className="text-sm text-white/60 mt-1">out of 100</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Legacy Score" value={`${legacyScore}/100`} sub="Building momentum" accent="text-brand-gold" />
        <StatCard label="Projected NW" value={fmtCurrency(generationalImpact, true)} sub="By retirement (age 65)" accent="text-brand-green" />
        <StatCard label="Vault Documents" value={`${uploadedDocs}/${vaultDocuments.length}`} sub="Documents secured" />
        <StatCard label="Years to Retire" value="37" sub="Target age 65" />
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Wealth Trajectory Chart */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Wealth Trajectory</h2>
            <LineChart
              data={legacyMilestones.map((m) => ({ label: m.label, value: m.projectedNW }))}
              height={240}
              color="#d4a843"
              formatValue={(v) => fmtCurrency(v, true)}
            />
          </Card>

          {/* Milestones */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Generational Milestones</h2>
            <div className="relative pl-6">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-teal via-brand-gold to-brand-green" />
              {legacyMilestones.map((milestone, i) => (
                <div key={milestone.age} className="relative pb-6 last:pb-0">
                  <div className={`absolute left-[-18px] w-3 h-3 rounded-full border-2 border-[var(--bg-card)] ${i === 0 ? 'bg-brand-teal' : 'bg-brand-gold'}`} />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{milestone.label}</p>
                      <p className="text-xs text-[var(--text-muted)]">Age {milestone.age}</p>
                    </div>
                    <span className="text-sm font-bold tabular-nums text-[var(--text-primary)]">{fmtCurrency(milestone.projectedNW, true)}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Generational Impact */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Generational Impact Estimate</h2>
            <div className="p-4 rounded-xl bg-gradient-to-br from-brand-gold/10 to-brand-navy/10 border border-brand-gold/20">
              <p className="text-sm text-[var(--text-primary)] mb-3">
                If you maintain your current savings rate and investment returns:
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Your Lifetime Wealth</p>
                  <p className="text-xl font-black tabular-nums text-brand-gold">{fmtCurrency(generationalImpact, true)}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-muted)]">Next Generation Start</p>
                  <p className="text-xl font-black tabular-nums text-brand-green">{fmtCurrency(generationalImpact * 0.4, true)}</p>
                </div>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-3 leading-relaxed">
                Your children could start with {fmtCurrency(generationalImpact * 0.4, true)} in inherited wealth,
                compounding to {fmtCurrency(generationalImpact * 0.4 * 4, true)} by their retirement. That is generational change.
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Legacy Score Breakdown */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Legacy Score Breakdown</h2>
            <div className="space-y-4">
              {[
                { factor: 'Estate Planning', score: 30, max: 100, desc: 'Will + insurance uploaded' },
                { factor: 'Investment Growth', score: 65, max: 100, desc: 'Consistent contributions' },
                { factor: 'Debt Freedom', score: 35, max: 100, desc: '$24k remaining' },
                { factor: 'Document Vault', score: 50, max: 100, desc: `${uploadedDocs} of ${vaultDocuments.length} secured` },
                { factor: 'Savings Habits', score: 82, max: 100, desc: '39% savings rate' },
              ].map((factor) => (
                <div key={factor.factor}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-[var(--text-secondary)]">{factor.factor}</span>
                    <span className="text-xs tabular-nums font-semibold text-[var(--text-primary)]">{factor.score}/100</span>
                  </div>
                  <ProgressBar value={factor.score} max={factor.max} height="h-1.5" color={factor.score >= 60 ? 'bg-brand-green' : undefined} warning={factor.score >= 30 && factor.score < 60} over={factor.score < 30} />
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{factor.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Financial Vault */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Financial Vault</h2>
            <div className="space-y-2">
              {vaultDocuments.map((doc) => (
                <div
                  key={doc.name}
                  className={`p-3 rounded-xl border ${doc.uploaded ? 'border-brand-green/20 bg-brand-green/5' : 'border-dashed border-[var(--border-color)]'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-[var(--text-primary)]">{doc.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{doc.type}{doc.date ? ` - ${doc.date}` : ''}</p>
                    </div>
                    {doc.uploaded ? (
                      <Badge variant="success">Secured</Badge>
                    ) : (
                      <button
                        type="button"
                        className="text-xs font-medium text-brand-teal hover:underline"
                      >
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Letter to the Future */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Letter to the Future</h2>
            <p className="text-xs text-[var(--text-muted)] mb-3">
              Write a letter to your future self or your children about your financial journey and values.
            </p>
            <div className="p-3 rounded-xl border border-dashed border-[var(--border-color)] min-h-[100px] flex items-center justify-center">
              <span className="text-xs text-[var(--text-muted)]">Tap to start writing...</span>
            </div>
            <button
              type="button"
              className="w-full mt-3 py-2.5 rounded-xl bg-brand-gold/10 text-brand-gold font-semibold text-sm hover:bg-brand-gold/20 transition-colors"
            >
              Save to Vault
            </button>
          </Card>
        </div>
      </section>
    </div>
  );
}
