'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import NavIcon from './NavIcon';

const tabs = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'Spend', href: '/spend', icon: 'credit-card' },
  { label: 'Save', href: '/save', icon: 'piggy-bank' },
  { label: 'Money', href: '/money', icon: 'wallet' },
  { label: 'Coach', href: '/coach', icon: 'sparkles' },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-30 bg-[var(--bg-primary)] border-t border-[var(--border-color)] lg:hidden"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive = tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] rounded-lg transition-colors',
                isActive ? 'text-brand-teal' : 'text-[var(--text-muted)]'
              )}
            >
              <NavIcon name={tab.icon} className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
      {/* Safe area for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
