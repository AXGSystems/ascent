'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { navigation } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import NavIcon from './NavIcon';

export default function Sidebar() {
  const pathname = usePathname();
  const sidebarOpen = useStore((s) => s.sidebarOpen);
  const setSidebarOpen = useStore((s) => s.setSidebarOpen);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden',
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 flex flex-col',
          'bg-[var(--bg-primary)] border-r border-[var(--border-color)]',
          'transform transition-transform duration-300 ease-out',
          'lg:translate-x-0 lg:static lg:z-auto',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand */}
        <div className="h-16 flex items-center gap-2 px-5 border-b border-[var(--border-color)]">
          <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center">
            <span className="text-white font-bold text-sm">A$</span>
          </div>
          <span className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
            A$cent
          </span>
        </div>

        {/* Nav sections */}
        <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Main navigation">
          {navigation.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px]',
                          isActive
                            ? 'bg-brand-teal/10 text-brand-teal'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--border-color)] hover:text-[var(--text-primary)]'
                        )}
                      >
                        <NavIcon name={item.icon} className="w-5 h-5 shrink-0" />
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center">
              <span className="text-white text-xs font-semibold">C+C</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">Christian & Channelle</p>
              <p className="text-xs text-[var(--text-muted)]">Household</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
