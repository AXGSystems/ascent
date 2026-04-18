'use client';

import { syncAccounts } from '@/lib/data';
import { cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import LineChart from '@/components/LineChart';

const connected = syncAccounts.filter((a) => a.status === 'connected').length;
const warning = syncAccounts.filter((a) => a.status === 'warning').length;
const disconnected = syncAccounts.filter((a) => a.status === 'disconnected').length;

const syncTimeline = [
  { label: 'Mon', value: 6 },
  { label: 'Tue', value: 6 },
  { label: 'Wed', value: 5 },
  { label: 'Thu', value: 5 },
  { label: 'Fri', value: 5 },
  { label: 'Sat', value: 5 },
  { label: 'Sun', value: 5 },
];

function statusBadge(status: 'connected' | 'warning' | 'disconnected'): 'success' | 'warning' | 'danger' {
  if (status === 'connected') return 'success';
  if (status === 'warning') return 'warning';
  return 'danger';
}

function statusDot(status: 'connected' | 'warning' | 'disconnected'): string {
  if (status === 'connected') return 'bg-brand-green';
  if (status === 'warning') return 'bg-brand-gold';
  return 'bg-brand-red';
}

export default function SyncPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Account Sync</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 hero-pattern" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">Sync Status</p>
            <p className="text-4xl md:text-5xl font-bold text-white">{connected}<span className="text-lg font-normal text-white/50">/{syncAccounts.length} connected</span></p>
            <p className="mt-2 text-sm text-white/60">{warning} warning, {disconnected} disconnected</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Connected" value={`${connected}`} accent="text-brand-green" sub="Syncing normally" />
        <StatCard label="Warning" value={`${warning}`} accent="text-brand-gold" sub="Needs attention" />
        <StatCard label="Disconnected" value={`${disconnected}`} accent="text-brand-red" sub="Reconnect needed" />
        <StatCard label="Health" value={`${Math.round((connected / syncAccounts.length) * 100)}%`} sub="Overall sync health" />
      </section>

      {/* Accounts + Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Account List */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Accounts</h2>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {syncAccounts.map((account) => (
              <div key={account.name} className="flex items-center justify-between px-5 py-3 min-h-[44px]">
                <div className="flex items-center gap-3">
                  <span className={cn('w-2.5 h-2.5 rounded-full shrink-0', statusDot(account.status))} />
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{account.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{account.institution} - {account.owner}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-[var(--text-secondary)]">Last: {account.lastSync}</p>
                    <p className="text-xs text-[var(--text-muted)]">Next: {account.nextSync}</p>
                  </div>
                  {account.status !== 'connected' && (
                    <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-brand-teal text-white hover:bg-brand-teal-dark transition-colors">
                      {account.status === 'disconnected' ? 'Reconnect' : 'Retry'}
                    </button>
                  )}
                  <Badge variant={statusBadge(account.status)}>{account.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          {/* Sync Timeline */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Weekly Sync Activity</h2>
            <LineChart
              data={syncTimeline}
              height={180}
              color="#0a8ebc"
              formatValue={(v) => `${v} accts`}
            />
          </Card>

          {/* Stale Alerts */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Stale Alerts</h2>
            <div className="space-y-3">
              {syncAccounts.filter((a) => a.status !== 'connected').map((a) => (
                <div key={a.name} className="p-3 rounded-xl bg-brand-red/5 border border-brand-red/10">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{a.name}</p>
                  <p className="text-xs text-brand-red mt-0.5">Last synced {a.lastSync}</p>
                  <p className="text-xs text-[var(--text-muted)]">{a.owner} account at {a.institution}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
