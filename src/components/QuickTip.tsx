'use client';

import { pageTips } from '@/lib/education';

interface QuickTipProps {
  page: string;
}

export default function QuickTip({ page }: QuickTipProps) {
  const tip = pageTips[page];
  if (!tip) return null;

  return (
    <div className="rounded-xl border border-brand-teal/20 bg-brand-teal/5 p-4 mt-8">
      <div className="flex items-start gap-2.5">
        <span className="text-base shrink-0" aria-hidden="true">
          {'\uD83D\uDCA1'}
        </span>
        <div>
          <p className="text-xs font-semibold text-brand-teal mb-0.5">Quick Tip</p>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{tip}</p>
        </div>
      </div>
    </div>
  );
}
