'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { accounts } from '@/lib/data';
import { cn, statusColor } from '@/lib/utils';
import Card from '@/components/Card';
import Avatar from '@/components/Avatar';
import Badge from '@/components/Badge';
import AdvisorTip from '@/components/AdvisorTip';
import ScrollReveal from '@/components/ScrollReveal';
import QuickTip from '@/components/QuickTip';

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
        on ? 'bg-brand-teal' : 'bg-[var(--text-muted)]'
      }`}
      role="switch"
      aria-checked={on}
      aria-label={label}
    >
      <span
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
          on ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const dark = useStore((s) => s.dark);
  const toggleDark = useStore((s) => s.toggleDark);

  const [notifications, setNotifications] = useState({
    overspending: true,
    bills: true,
    goals: true,
    sync: true,
    weekly: false,
  });

  function toggleNotif(key: keyof typeof notifications) {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="sr-only">Settings</h1>
      {/* Profile Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-brand-teal-dark to-brand-teal p-6 md:p-8 shadow-lg shadow-brand-navy/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="relative flex items-center gap-4">
            <Avatar name="Christian" size="lg" className="ring-2 ring-white/30" />
            <div>
              <p className="text-xl font-bold text-white">Christian & Channelle</p>
              <p className="text-sm text-white/50">Household Account</p>
              <p className="text-xs text-brand-gold font-medium mt-0.5">A$cent Premium</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advisor Tips */}
      <ScrollReveal>
        <section className="space-y-3">
          <AdvisorTip type="tip">
            Review your connected accounts and notification preferences monthly to make sure everything is current.
          </AdvisorTip>
          <AdvisorTip type="insight">
            Enabling the weekly summary notification keeps you informed without daily noise &mdash; the best balance of awareness and peace.
          </AdvisorTip>
        </section>
      </ScrollReveal>

      {/* Profile Details */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Profile</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Primary User</label>
            <p className="text-sm text-[var(--text-primary)]">Christian</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Partner</label>
            <p className="text-sm text-[var(--text-primary)]">Channelle</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Email</label>
            <p className="text-sm text-[var(--text-primary)]">christian@example.com</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Plan</label>
            <p className="text-sm text-brand-gold font-medium">A$cent Premium</p>
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Appearance</h2>
        <div className="flex items-center justify-between min-h-[44px]">
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">Dark Mode</p>
            <p className="text-xs text-[var(--text-muted)]">Toggle between light and dark theme</p>
          </div>
          <Toggle on={dark} onToggle={toggleDark} label="Toggle dark mode" />
        </div>
      </Card>

      {/* Connected Accounts */}
      <Card padding={false}>
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Connected Accounts</h2>
            <p className="text-sm text-[var(--text-secondary)]">{accounts.filter((a) => a.status === 'ok').length} of {accounts.length} syncing</p>
          </div>
          <Badge variant="info">PENDING</Badge>
        </div>
        <div className="divide-y divide-[var(--border-color)]">
          {accounts.map((acct) => (
            <div key={acct.name} className="flex items-center justify-between px-5 py-3 min-h-[44px]">
              <div className="flex items-center gap-3">
                <span className={cn('w-2.5 h-2.5 rounded-full shrink-0', statusColor(acct.status))} />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{acct.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{acct.type} - {acct.owner}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-muted)]">Synced {acct.lastSync} ago</span>
                {acct.status === 'ok' && <Badge variant="success">Active</Badge>}
                {acct.status === 'warn' && <Badge variant="warning">Delayed</Badge>}
                {acct.status === 'stale' && <Badge variant="danger">Stale</Badge>}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Notifications</h2>
        <div className="space-y-4">
          {([
            { key: 'overspending' as const, label: 'Overspending Alerts', desc: 'When a category goes over budget' },
            { key: 'bills' as const, label: 'Bill Reminders', desc: 'Before bills are due' },
            { key: 'goals' as const, label: 'Goal Milestones', desc: 'When you hit savings targets' },
            { key: 'sync' as const, label: 'Account Sync Issues', desc: 'When an account connection is stale' },
            { key: 'weekly' as const, label: 'Weekly Summary', desc: 'Weekly spending & savings recap' },
          ]).map((notif) => (
            <div key={notif.key} className="flex items-center justify-between min-h-[44px]">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{notif.label}</p>
                <p className="text-xs text-[var(--text-muted)]">{notif.desc}</p>
              </div>
              <Toggle
                on={notifications[notif.key]}
                onToggle={() => toggleNotif(notif.key)}
                label={`Toggle ${notif.label}`}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Budget Preferences */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Budget Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between min-h-[44px]">
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">Budget Period</p>
              <p className="text-xs text-[var(--text-muted)]">Monthly budget cycle</p>
            </div>
            <span className="text-sm text-[var(--text-secondary)]">1st - 30th</span>
          </div>
          <div className="flex items-center justify-between min-h-[44px] border-t border-[var(--border-color)] pt-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">Currency</p>
              <p className="text-xs text-[var(--text-muted)]">Display currency for all amounts</p>
            </div>
            <span className="text-sm text-[var(--text-secondary)]">USD ($)</span>
          </div>
          <div className="flex items-center justify-between min-h-[44px] border-t border-[var(--border-color)] pt-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">Savings Rate Target</p>
              <p className="text-xs text-[var(--text-muted)]">Your goal savings rate per month</p>
            </div>
            <span className="text-sm font-semibold tabular-nums text-brand-teal">40%</span>
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Security</h2>
          <Badge variant="info">PENDING</Badge>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between min-h-[44px]">
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">Two-Factor Authentication</p>
              <p className="text-xs text-[var(--text-muted)]">Add an extra layer of security</p>
            </div>
            <Badge variant="success">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between min-h-[44px] border-t border-[var(--border-color)] pt-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">Biometric Login</p>
              <p className="text-xs text-[var(--text-muted)]">Use Face ID or fingerprint</p>
            </div>
            <Badge variant="success">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between min-h-[44px] border-t border-[var(--border-color)] pt-4">
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">Session Timeout</p>
              <p className="text-xs text-[var(--text-muted)]">Auto-lock after inactivity</p>
            </div>
            <span className="text-sm text-[var(--text-secondary)]">15 minutes</span>
          </div>
        </div>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Data & Privacy</h2>
        <div className="space-y-3">
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[var(--border-color)] transition-colors min-h-[44px]"
          >
            <span className="text-sm text-[var(--text-primary)]">Export Data (CSV)</span>
            <span className="text-xs text-[var(--text-muted)]">Download all transactions</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[var(--border-color)] transition-colors min-h-[44px]"
          >
            <span className="text-sm text-[var(--text-primary)]">Privacy Policy</span>
            <span className="text-xs text-[var(--text-muted)]">View terms</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-brand-red/10 transition-colors min-h-[44px]"
          >
            <span className="text-sm text-brand-red">Delete All Data</span>
            <span className="text-xs text-brand-red/60">This cannot be undone</span>
          </button>
        </div>
      </Card>

      {/* Version info is in the global dashboard footer */}
    
      {/* QUICK TIP */}
      <QuickTip page="settings" />
    </div>
  );
}
