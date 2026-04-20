'use client';

import { useState } from 'react';
import { feedbackItems } from '@/lib/data';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import AdvisorTip from '@/components/AdvisorTip';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import QuickTip from '@/components/QuickTip';

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState<'feature' | 'bug'>('feature');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Feedback</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-4 md:p-6 lg:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">Feedback</p>
            <p className="text-3xl md:text-4xl font-bold text-white">Help Us Improve A$cent</p>
            <p className="mt-2 text-sm text-white/60">Submit feature requests and bug reports</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Submitted" value={`${feedbackItems.length}`} sub="Total items" />
        <StatCard label="Open" value={`${feedbackItems.filter((f) => f.status === 'open').length}`} sub="Under review" />
        <StatCard label="Planned" value={`${feedbackItems.filter((f) => f.status === 'planned').length}`} sub="In roadmap" accent="text-brand-teal" />
        <StatCard label="Done" value={`${feedbackItems.filter((f) => f.status === 'done').length}`} sub="Shipped!" accent="text-brand-green" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="tip">
            Feature requests help us build what YOU need &mdash; the most-requested features ship first. Your voice shapes the roadmap.
          </AdvisorTip>
          <AdvisorTip type="insight">
            {feedbackItems.filter((f) => f.status === 'planned').length} of your suggestions are in the roadmap. Community feedback drives real product improvements.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Form + History */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Submission Form */}
        <Card>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Submit Feedback</h2>

          {/* Type Selector */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
                feedbackType === 'feature'
                  ? 'bg-brand-teal text-white'
                  : 'bg-[var(--border-color)] text-[var(--text-secondary)]'
              }`}
              onClick={() => setFeedbackType('feature')}
            >
              Feature Request
            </button>
            <button
              type="button"
              className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
                feedbackType === 'bug'
                  ? 'bg-brand-red text-white'
                  : 'bg-[var(--border-color)] text-[var(--text-secondary)]'
              }`}
              onClick={() => setFeedbackType('bug')}
            >
              Bug Report
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label htmlFor="feedback-title" className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-1 block">
                Title
              </label>
              <input
                id="feedback-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={feedbackType === 'feature' ? 'Describe the feature...' : 'Describe the bug...'}
                maxLength={200}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-brand-teal/50 min-h-[44px]"
              />
            </div>
            <div>
              <label htmlFor="feedback-details" className="text-xs font-semibold text-[var(--text-muted)] uppercase mb-1 block">
                Details
              </label>
              <textarea
                id="feedback-details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide more details..."
                rows={4}
                maxLength={2000}
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-brand-teal/50 resize-none"
              />
            </div>
            <button type="button" className="w-full py-3 rounded-xl bg-brand-teal text-white font-semibold hover:bg-brand-teal-dark transition-colors min-h-[44px]">
              Submit {feedbackType === 'feature' ? 'Feature Request' : 'Bug Report'}
            </button>
          </div>
        </Card>

        {/* Previous Submissions */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Previous Submissions</h2>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {feedbackItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-5 py-3 min-h-[44px]">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-2">
                    {item.title}
                    <Badge variant={item.type === 'feature' ? 'info' : 'danger'}>{item.type}</Badge>
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{item.date}</p>
                </div>
                <Badge variant={item.status === 'done' ? 'success' : item.status === 'planned' ? 'warning' : 'default'}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    
      {/* QUICK TIP */}
      <QuickTip page="feedback" />
    </div>
  );
}
