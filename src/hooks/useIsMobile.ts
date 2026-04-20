'use client';

import { useState, useEffect } from 'react';

/**
 * Returns true when the viewport is below the md breakpoint (768px).
 * Uses matchMedia for performance and avoids layout thrashing.
 * On the server (SSR), defaults to false (desktop) to avoid hydration mismatch
 * for above-the-fold content.
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mql.matches);

    function onChange(e: MediaQueryListEvent) {
      setIsMobile(e.matches);
    }

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [breakpoint]);

  return isMobile;
}
