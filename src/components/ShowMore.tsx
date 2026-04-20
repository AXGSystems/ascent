'use client';

import { useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface ShowMoreProps<T> {
  items: T[];
  /** Number of items to show before truncating on mobile (default 3) */
  mobileLimit?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

/**
 * Wraps a list and truncates it on mobile with a "Show more" button.
 * On desktop all items are always shown.
 */
export default function ShowMore<T>({
  items,
  mobileLimit = 3,
  renderItem,
  className,
}: ShowMoreProps<T>) {
  const isMobile = useIsMobile();
  const [showAll, setShowAll] = useState(false);

  const shouldTruncate = isMobile && !showAll && items.length > mobileLimit;
  const displayItems = shouldTruncate ? items.slice(0, mobileLimit) : items;
  const remaining = items.length - mobileLimit;

  return (
    <div className={className}>
      {displayItems.map((item, idx) => renderItem(item, idx))}
      {shouldTruncate && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="w-full py-3 text-sm font-semibold text-brand-teal hover:text-brand-teal-dark transition-colors min-h-[44px] active:scale-[0.98]"
        >
          Show {remaining} more &rarr;
        </button>
      )}
    </div>
  );
}
