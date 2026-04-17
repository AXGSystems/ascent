'use client';

import { accounts } from '@/lib/data';
import { fmtCurrency, cn, statusColor } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import { useStore } from '@/lib/store';

const byType = (type: string) => accounts.filter((a) => a.type === type);
const totalVal = (accts: typeof accounts) => accts.reduce((a, c) => a + c.value, 0);

export default function AccountsPage() {
  const openSheet = useStore((s) => s.openSheet);

  const types = Array.from(new Set(accounts.map((a) => a.type)));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">Accounts</h1>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Assets" value={fmtCurrency(totalVal(accounts.filter((a) => a.value > 0)))} accent="text-brand-green" />
        <StatCard label="Total Debt" value={fmtCurrency(Math.abs(totalVal(accounts.filter((a) => a.value < 0))))} accent="text-brand-red" />
        <StatCard label="Synced" value={`${accounts.filter((a) => a.status === 'ok').length}/${accounts.length}`} sub="Accounts connected" />
        <StatCard label="Issues" value={`${accounts.filter((a) => a.status !== 'ok').length}`} accent="text-brand-gold" sub="Need attention" />
      </section>

      {/* By Type */}
      {types.map((type) => {
        const accts = byType(type);
        return (
          <section key={type}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                {type}
              </h2>
              <span className="text-sm tabular-nums font-medium text-[var(--text-secondary)]">
                {fmtCurrency(totalVal(accts))}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {accts.map((acct, i) => (
                <Card
                  key={i}
                  onClick={() =>
                    openSheet(
                      acct.name,
                      `Type: ${acct.type}\nBalance: ${fmtCurrency(acct.value)}\nOwner: ${acct.owner}\nLast Sync: ${acct.lastSync} ago\nStatus: ${acct.status.toUpperCase()}\n\n${acct.status === 'stale' ? 'This account needs to be reconnected. Last synced 47 days ago.' : acct.status === 'warn' ? 'Sync delayed. Last update 3 days ago.' : 'Account is syncing normally.'}`
                    )
                  }
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)]">{acct.name}</h3>
                    <div className="flex items-center gap-1.5">
                      <span className={cn('w-2 h-2 rounded-full', statusColor(acct.status))} />
                      <span className="text-xs text-[var(--text-muted)]">{acct.lastSync}</span>
                    </div>
                  </div>
                  <p
                    className={cn(
                      'text-2xl font-bold tabular-nums',
                      acct.value >= 0 ? 'text-[var(--text-primary)]' : 'text-brand-red'
                    )}
                  >
                    {fmtCurrency(acct.value)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={acct.owner === 'Joint' ? 'info' : 'default'}>{acct.owner}</Badge>
                    {acct.status === 'stale' && <Badge variant="danger">Stale</Badge>}
                    {acct.status === 'warn' && <Badge variant="warning">Delayed</Badge>}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
