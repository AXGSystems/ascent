'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';

export default function Providers({ children }: { children: React.ReactNode }) {
  const dark = useStore((s) => s.dark);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  return <>{children}</>;
}
