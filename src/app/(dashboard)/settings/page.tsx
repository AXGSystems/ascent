'use client';

import { useStore } from '@/lib/store';
import Card from '@/components/Card';
import Avatar from '@/components/Avatar';

export default function SettingsPage() {
  const dark = useStore((s) => s.dark);
  const toggleDark = useStore((s) => s.toggleDark);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h1>

      {/* Profile */}
      <Card>
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Profile</h2>
        <div className="flex items-center gap-4">
          <Avatar name="Christian" size="lg" />
          <div>
            <p className="text-lg font-semibold text-[var(--text-primary)]">Christian & Channelle</p>
            <p className="text-sm text-[var(--text-secondary)]">Household Account</p>
          </div>
        </div>
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
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Appearance</h2>
        <div className="flex items-center justify-between min-h-[44px]">
          <div>
            <p className="text-sm font-medium text-[var(--text-primary)]">Dark Mode</p>
            <p className="text-xs text-[var(--text-muted)]">Toggle between light and dark theme</p>
          </div>
          <button
            type="button"
            onClick={toggleDark}
            className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${
              dark ? 'bg-brand-teal' : 'bg-[var(--text-muted)]'
            }`}
            role="switch"
            aria-checked={dark}
            aria-label="Toggle dark mode"
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                dark ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </Card>

      {/* Notifications */}
      <Card>
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Notifications</h2>
        <div className="space-y-4">
          {[
            { label: 'Overspending Alerts', desc: 'When a category goes over budget', default: true },
            { label: 'Bill Reminders', desc: 'Before bills are due', default: true },
            { label: 'Goal Milestones', desc: 'When you hit savings targets', default: true },
            { label: 'Account Sync Issues', desc: 'When an account connection is stale', default: true },
            { label: 'Weekly Summary', desc: 'Weekly spending & savings recap', default: false },
          ].map((notif, i) => (
            <div key={i} className="flex items-center justify-between min-h-[44px]">
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">{notif.label}</p>
                <p className="text-xs text-[var(--text-muted)]">{notif.desc}</p>
              </div>
              <div
                className={`w-10 h-6 rounded-full ${notif.default ? 'bg-brand-teal' : 'bg-[var(--text-muted)]'} relative`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm ${
                    notif.default ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Data & Privacy</h2>
        <div className="space-y-3">
          <button
            type="button"
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-[var(--border-color)] transition-colors min-h-[44px] text-sm text-[var(--text-primary)]"
          >
            Export Data (CSV)
          </button>
          <button
            type="button"
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-[var(--border-color)] transition-colors min-h-[44px] text-sm text-[var(--text-primary)]"
          >
            Connected Accounts ({6})
          </button>
          <button
            type="button"
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-brand-red/10 transition-colors min-h-[44px] text-sm text-brand-red"
          >
            Delete All Data
          </button>
        </div>
      </Card>

      {/* Version */}
      <div className="text-center py-4">
        <p className="text-xs text-[var(--text-muted)]">A$cent v1.0.0</p>
        <p className="text-xs text-[var(--text-muted)]">Built for Christian & Channelle</p>
      </div>
    </div>
  );
}
