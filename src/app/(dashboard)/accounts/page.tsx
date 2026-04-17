'use client';

import { accounts } from '@/lib/data';
import { fmtCurrency, cn, statusColor, pct } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import BarChart from '@/components/BarChart';
import ProgressBar from '@/components/ProgressBar';
import { useStore } from '@/lib/store';

const byType = (type: string) => accounts.filter((a) => a.type === type);
const totalVal = (accts: typeof accounts) => accts.reduce((a, c) => a + c.value, 0);
const totalAssets = totalVal(accounts.filter((a) => a.value > 0));
const totalDebt = Math.abs(totalVal(accounts.filter((a) => a.value < 0)));
const netWorth = totalAssets - totalDebt;

export default function AccountsPage() {
  const openSheet = useStore((s) => s.openSheet);

  const types = Array.from(new Set(accounts.map((a) => a.type)));
  const okCount = accounts.filter((a) => a.status === 'ok').length;
  const issueCount = accounts.filter((a) => a.status !== 'ok').length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-brand-teal-dark to-brand-teal p-6 md:p-8 shadow-lg shadow-brand-navy/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">
                Accounts Overview
              </p>
              <p className="text-4xl md:text-5xl font-bold tabular-nums text-white">
                {fmtCurrency(netWorth)}
              </p>
              <p className="mt-2 text-sm text-white/50">
                {accounts.length} linked accounts - {okCount} synced
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/50">Issues</p>
              <p className="text-2xl font-bold tabular-nums text-amber-300">{issueCount}</p>
              <p className="text-xs text-white/40">need attention</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Assets" value={fmtCurrency(totalAssets)} accent="text-brand-green" />
        <StatCard label="Total Debt" value={fmtCurrency(totalDebt)} accent="text-brand-red" />
        <StatCard label="Synced" value={`${okCount}/${accounts.length}`} sub="Accounts connected" />
        <StatCard label="Issues" value={`${issueCount}`} accent="text-brand-gold" sub="Need attention" />
      </section>

      {/* Balance Distribution Chart */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Balance Distribution</h2>
        <BarChart
          data={accounts.map((a) => ({
            label: a.name.replace('Chase ', '').replace('Cap One ', 'CO '),
            value: Math.abs(a.value),
            color: a.value >= 0 ? '#2d8f5e' : '#c0392b',
          }))}
          horizontal
        />
      </Card>

      {/* Sync Status Detail */}
      <Card padding={false}>
        <div className="px-5 pt-5 pb-3">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Sync Status</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">
            {okCount} of {accounts.length} accounts syncing normally
          </p>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {accounts.map((acct, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-3 min-h-[44px]">
              <div className="flex items-center gap-3">
                <span className={cn('w-2.5 h-2.5 rounded-full shrink-0', statusColor(acct.status))} />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{acct.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {acct.status === 'ok'
                      ? `Synced ${acct.lastSync} ago`
                      : acct.status === 'warn'
                        ? `Delayed - last sync ${acct.lastSync} ago`
                        : `Stale - last sync ${acct.lastSync} ago`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {acct.status === 'ok' && <Badge variant="success">Connected</Badge>}
                {acct.status === 'warn' && <Badge variant="warning">Delayed</Badge>}
                {acct.status === 'stale' && <Badge variant="danger">Reconnect</Badge>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Net Worth Breakdown */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Net Worth Breakdown</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">Assets</span>
            <span className="text-sm font-semibold tabular-nums text-brand-green">{fmtCurrency(totalAssets)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--text-secondary)]">Liabilities</span>
            <span className="text-sm font-semibold tabular-nums text-brand-red">-{fmtCurrency(totalDebt)}</span>
          </div>
          <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
            <span className="text-sm font-bold text-[var(--text-primary)]">Net Worth (Accounts)</span>
            <span className="text-sm font-bold tabular-nums text-brand-teal">{fmtCurrency(netWorth)}</span>
          </div>
          <div className="pt-2">
            <ProgressBar value={totalAssets} max={totalAssets + totalDebt} color="bg-brand-green" height="h-3" />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-[var(--text-muted)]">{pct(totalDebt, totalAssets + totalDebt)}% debt ratio</span>
              <span className="text-xs text-[var(--text-muted)]">{pct(totalAssets, totalAssets + totalDebt)}% assets</span>
            </div>
          </div>
        </div>
      </Card>

      {/* By Type */}
      {types.map((type) => {
        const accts = byType(type);
        return (
          <section key={type}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-[var(--text-primary)] uppercase tracking-wider">
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
