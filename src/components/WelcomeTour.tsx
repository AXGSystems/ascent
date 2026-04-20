'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TourStep {
  title: string;
  description: string;
  target: string; // description for screen readers
}

const steps: TourStep[] = [
  {
    title: 'Welcome to A$cent!',
    description:
      "I'm your financial co-pilot. I'll help you track, learn, save, and grow — all in one place. Let me show you around.",
    target: 'greeting',
  },
  {
    title: 'Your Net Worth',
    description:
      'This is the most important number in personal finance — total assets minus total debts. Watch it grow over time.',
    target: 'hero',
  },
  {
    title: 'Financial Vital Signs',
    description:
      'These cards show your key metrics at a glance: safe-to-spend, budget progress, savings rate, and your A$cent Score.',
    target: 'stat cards',
  },
  {
    title: 'Smart Alerts',
    description:
      'I analyze your data and flag what needs attention — overspending, stale accounts, upcoming bills, and opportunities to save.',
    target: 'alerts',
  },
  {
    title: 'Guided Actions',
    description:
      'Your top 5 highest-impact moves, ranked. Each one tells you exactly what to do and how much it helps.',
    target: 'guided actions',
  },
  {
    title: 'Explore Everything',
    description:
      'Use the sidebar to explore 45+ features — spending analysis, savings goals, bill audit, credit score, AI coach, and more. Click any card to expand it.',
    target: 'sidebar',
  },
];

const STORAGE_KEY = 'ascent-tour-complete';

export default function WelcomeTour() {
  const [active, setActive] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    try {
      const done = localStorage.getItem(STORAGE_KEY);
      if (!done) {
        // Small delay so the page loads first
        const timer = setTimeout(() => setActive(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  function dismiss() {
    setActive(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // ignore
    }
  }

  function next() {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      dismiss();
    }
  }

  function prev() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  if (!active) return null;

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-label="Welcome tour">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 glass-blur" onClick={dismiss} />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-2xl glass-blur ring-1 ring-[var(--border-glass)] ring-inset p-6 animate-fade-in">
        {/* Step indicator */}
        <div className="flex items-center gap-1.5 mb-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300',
                i === step ? 'w-6 bg-brand-teal' : 'w-1.5 bg-[var(--border-color)]',
                i < step && 'bg-brand-teal/40'
              )}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center mb-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-teal" aria-hidden="true">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
            <path d="M18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75L18 15z" />
          </svg>
        </div>

        {/* Content */}
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
          {current.title}
        </h2>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
          {current.description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={dismiss}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors min-h-[44px] px-2"
          >
            Skip tour
          </button>
          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                type="button"
                onClick={prev}
                className="px-4 py-2 rounded-xl text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--border-color)] transition-colors min-h-[44px]"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={next}
              className="px-5 py-2 rounded-xl text-sm font-medium bg-brand-teal text-white hover:bg-brand-teal-dark transition-colors min-h-[44px] active:scale-[0.95]"
            >
              {step < steps.length - 1 ? 'Next' : 'Got it!'}
            </button>
          </div>
        </div>

        {/* Step count */}
        <p className="text-center text-[10px] text-[var(--text-muted)] mt-3">
          Step {step + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}
