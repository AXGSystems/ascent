'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import Sheet from '@/components/Sheet';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20 lg:pb-6">
          {children}
        </main>
      </div>
      <TabBar />
      <Sheet />
    </div>
  );
}
