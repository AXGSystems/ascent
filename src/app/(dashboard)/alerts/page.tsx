'use client';

import { useState } from 'react';
import { alertItems } from '@/lib/data';
import { cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import AdvisorTip from '@/components/AdvisorTip';
import StaggeredList from '@/components/StaggeredList';
import ScrollReveal from '@/components/ScrollReveal';
import LearnTooltip from '@/components/LearnTooltip';
import QuickTip from '@/components/QuickTip';

type AlertType = 'overspending' | 'bill' | 'goal' | 'sync' | 'security' | 'insight';

const typeLabels: Record<AlertType, string> = {
  overspending: 'Overspending',
  bill: 'Bills',
  goal: 'Goals',
  sync: 'Sync',
  security: 'Security',
  insight: 'Insights',
};

const typeBadge: Record<AlertType, 'danger' | 'warning' | 'success' | 'info' | 'default'> = {
  overspending: 'danger',
  bill: 'warning',
  goal: 'success',
  sync: 'warning',
  security: 'danger',
  insight: 'info',
};

const defaultPrefs: Record<AlertType, { email: boolean; sms: boolean; push: boolean }> = {
  overspending: { email: true, sms: true, push: true },
  bill: { email: true, sms: false, push: true },
  goal: { email: true, sms: false, push: true },
  sync: { email: true, sms: true, push: true },
  security: { email: true, sms: true, push: true },
  insight: { email: true, sms: false, push: false },
};

export default function AlertsPage() {
  const [prefs, setPrefs] = useState(defaultPrefs);
  const unread = alertItems.filter((a) => !a.read).length;

  const togglePref = (type: AlertType, channel: 'email' | 'sms' | 'push') => {
    setPrefs((prev) => ({
      ...prev,
      [type]: { ...prev[type], [channel]: !prev[type][channel] },
    }));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="sr-only">Alerts</h1>

      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-navy p-6 md:p-8 shadow-lg shadow-brand-teal/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1"><LearnTooltip term="Overdraft"><span>Alerts</span></LearnTooltip></p>
            <p className="text-4xl md:text-5xl font-black text-white tabular-nums">{unread} <span className="text-lg font-normal text-white/50">unread</span></p>
            <p className="mt-2 text-sm text-white/60">{alertItems.length} total alerts</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <StaggeredList className="grid grid-cols-2 lg:grid-cols-4 gap-4" delay={80}>
        <StatCard label="Unread" value={`${unread}`} accent="text-brand-red" sub="Need attention" />
        <StatCard label="Total" value={`${alertItems.length}`} sub="All alerts" />
        <StatCard label="Types" value="6" sub="Alert categories" />
        <StatCard label="Channels" value="3" sub="Email, SMS, Push" />
      </StaggeredList>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="tip">
            Enable SMS alerts for bills over $100 &mdash; never miss a big payment. Addressing overage alerts today prevents bigger problems next month.
          </AdvisorTip>
          <AdvisorTip type="insight">
            You have {unread} unread alerts. Staying on top of alerts is one of the simplest ways to protect your finances.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Alert History + Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        {/* Alert History */}
        <Card padding={false}>
          <div className="px-5 pt-5 pb-3">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Alert History</h2>
          </div>
          <div className="divide-y divide-[var(--border-color)]">
            {alertItems.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  'flex items-start gap-3 px-5 py-3 min-h-[44px]',
                  !alert.read && 'bg-brand-teal/5'
                )}
              >
                <div className="shrink-0 mt-0.5">
                  {!alert.read && <span className="block w-2 h-2 rounded-full bg-brand-teal" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={cn('text-sm', !alert.read ? 'font-bold text-[var(--text-primary)]' : 'font-medium text-[var(--text-primary)]')}>
                      {alert.title}
                    </p>
                    <Badge variant={typeBadge[alert.type]}>{typeLabels[alert.type]}</Badge>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{alert.message}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{alert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Preferences */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Alert Preferences</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="text-left py-2 text-xs font-semibold text-[var(--text-muted)]">Type</th>
                    <th className="text-center py-2 text-xs font-semibold text-[var(--text-muted)]">Email</th>
                    <th className="text-center py-2 text-xs font-semibold text-[var(--text-muted)]">SMS</th>
                    <th className="text-center py-2 text-xs font-semibold text-[var(--text-muted)]">Push</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-color)]">
                  {(Object.keys(prefs) as AlertType[]).map((type) => (
                    <tr key={type}>
                      <td className="py-2 text-[var(--text-primary)] font-medium">{typeLabels[type]}</td>
                      {(['email', 'sms', 'push'] as const).map((ch) => (
                        <td key={ch} className="py-2 text-center">
                          <button
                            type="button"
                            className={cn(
                              'w-8 h-5 rounded-full transition-colors relative',
                              prefs[type][ch] ? 'bg-brand-teal' : 'bg-[var(--border-color)]'
                            )}
                            onClick={() => togglePref(type, ch)}
                            aria-label={`${ch} for ${typeLabels[type]}`}
                          >
                            <span
                              className={cn(
                                'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-sm',
                                prefs[type][ch] ? 'left-3.5' : 'left-0.5'
                              )}
                            />
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Delivery Settings</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--border-color)]/50">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Email</p>
                  <p className="text-xs text-[var(--text-muted)]">vscott@alta.org</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--border-color)]/50">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">SMS</p>
                  <p className="text-xs text-[var(--text-muted)]">***-***-4281</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-[var(--border-color)]/50">
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">Push Notifications</p>
                  <p className="text-xs text-[var(--text-muted)]">Browser + Mobile</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    
      {/* QUICK TIP */}
      <QuickTip page="alerts" />
    </div>
  );
}
