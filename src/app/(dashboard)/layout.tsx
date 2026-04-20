'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import Sheet from '@/components/Sheet';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Header />
        <main className="flex-1 overflow-y-auto overscroll-contain p-4 lg:p-6 pb-24 lg:pb-6">
          {children}
          {/* Footer */}
          <footer className="mt-12 pb-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-brand-teal to-brand-navy flex items-center justify-center">
                <span className="text-white font-bold text-[8px]">A$</span>
              </div>
              <span className="text-xs font-semibold text-[var(--text-muted)]">A$cent</span>
            </div>
            <p className="text-[10px] text-[var(--text-muted)]">
              v1.0.0 &middot; Built for Christian & Channelle
            </p>
          </footer>
        </main>
      </div>
      <TabBar />
      <Sheet />
    </div>
  );
}
