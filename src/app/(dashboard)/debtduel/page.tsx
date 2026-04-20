'use client';

import { debtDuelMoves, debtDuelBadges, debtAccounts } from '@/lib/data';
import { fmtCurrency, cn } from '@/lib/utils';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import Badge from '@/components/Badge';

const christianPoints = debtDuelMoves.filter((m) => m.who === 'Christian').reduce((a, m) => a + m.points, 0);
const channellePoints = debtDuelMoves.filter((m) => m.who === 'Channelle').reduce((a, m) => a + m.points, 0);
const totalDebt = debtAccounts.reduce((a, d) => a + d.balance, 0);
const originalDebt = 32000;
const debtPaid = originalDebt - totalDebt;
const debtPercent = Math.round((debtPaid / originalDebt) * 100);
const totalSavedInterest = 847;

export default function DebtDuelPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Hero */}
      <section>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-600 via-orange-600 to-brand-navy p-6 md:p-8 shadow-lg shadow-red-600/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="absolute inset-0 hero-pattern" />
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/5 hero-shimmer" />
          <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-white/5" />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/60 mb-1">DebtDuel</p>
              <h1 className="sr-only">DebtDuel — Gamified Debt Destruction</h1>
              <p className="text-3xl md:text-4xl font-black text-white">Gamified Debt Destruction</p>
              <p className="mt-2 text-sm text-white/70">Compete together to crush debt. Race to the summit!</p>
            </div>
            <div className="shrink-0 text-center">
              <p className="text-xs text-white/50 mb-1">Debt Remaining</p>
              <p className="text-4xl font-black tabular-nums text-white">{fmtCurrency(totalDebt)}</p>
              <p className="text-sm text-emerald-300 font-medium mt-1">{debtPercent}% conquered</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Christian Points" value={`${christianPoints}`} sub="pts earned" accent="text-brand-teal" />
        <StatCard label="Channelle Points" value={`${channellePoints}`} sub="pts earned" accent="text-brand-gold" />
        <StatCard label="Interest Saved" value={fmtCurrency(totalSavedInterest)} sub="By paying extra" accent="text-brand-green" />
        <StatCard label="Progress" value={`${debtPercent}%`} sub="Debt conquered" trend="up" trendLabel="On track" />
      </section>

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
        <div className="space-y-6">
          {/* Mountain Visualization */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Mountain to Debt Free</h2>
            <div className="relative py-4">
              <svg viewBox="0 0 500 200" className="w-full h-auto" aria-label="Debt mountain progress">
                {/* Mountain shape */}
                <polygon points="250,20 50,180 450,180" fill="var(--border-color)" opacity="0.3" />
                <polygon points="250,20 50,180 450,180" fill="none" stroke="var(--border-color)" strokeWidth="2" />
                {/* Progress fill */}
                <clipPath id="mountain-clip">
                  <polygon points="250,20 50,180 450,180" />
                </clipPath>
                <rect x="0" y={180 - (debtPercent / 100) * 160} width="500" height={200} fill="#2d8f5e" opacity="0.2" clipPath="url(#mountain-clip)" />
                {/* Progress line */}
                <line x1="50" y1={180 - (debtPercent / 100) * 160} x2="450" y2={180 - (debtPercent / 100) * 160} stroke="#2d8f5e" strokeWidth="2" strokeDasharray="6 4" />
                {/* Summit flag */}
                <text x="250" y="15" textAnchor="middle" fontSize="12" fill="var(--text-muted)">{'\u26F3'} Debt Free</text>
                {/* Climbers */}
                <circle cx={180} cy={180 - (debtPercent / 100) * 160 + 5} r="6" fill="#0a8ebc" />
                <text x={180} y={180 - (debtPercent / 100) * 160 - 10} textAnchor="middle" fontSize="9" fill="var(--text-muted)">C</text>
                <circle cx={200} cy={180 - (debtPercent / 100) * 160 + 5} r="6" fill="#d4a843" />
                <text x={200} y={180 - (debtPercent / 100) * 160 - 10} textAnchor="middle" fontSize="9" fill="var(--text-muted)">Ch</text>
                {/* Progress label */}
                <text x="400" y={180 - (debtPercent / 100) * 160 + 4} textAnchor="start" fontSize="11" fontWeight="bold" fill="#2d8f5e">{debtPercent}%</text>
              </svg>
            </div>
            <div className="mt-2">
              <ProgressBar value={debtPercent} max={100} color="bg-brand-green" height="h-3" showLabel />
            </div>
          </Card>

          {/* Recent Moves */}
          <Card padding={false}>
            <div className="px-5 pt-5 pb-3">
              <h2 className="text-base font-bold text-[var(--text-primary)]">Recent Moves</h2>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {debtDuelMoves.map((move, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3 min-h-[44px]">
                  <div className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-semibold shrink-0',
                    move.who === 'Christian' ? 'bg-brand-teal/15 text-brand-teal' : 'bg-brand-gold/15 text-brand-gold'
                  )}>
                    {move.who === 'Christian' ? 'C' : 'Ch'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)] truncate">{move.action}</p>
                    <p className="text-xs text-[var(--text-muted)]">{move.debt} - {move.date}</p>
                  </div>
                  <span className="text-sm font-bold tabular-nums text-brand-green">+{move.points} pts</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Partner Scores */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Score Board</h2>
            <div className="space-y-4">
              <div className="p-3 rounded-xl border border-brand-teal/20 bg-brand-teal/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Christian</span>
                  <span className="text-lg font-black tabular-nums text-brand-teal">{christianPoints} pts</span>
                </div>
                <ProgressBar value={christianPoints} max={christianPoints + channellePoints} color="bg-brand-teal" height="h-2" />
              </div>
              <div className="p-3 rounded-xl border border-brand-gold/20 bg-brand-gold/5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Channelle</span>
                  <span className="text-lg font-black tabular-nums text-brand-gold">{channellePoints} pts</span>
                </div>
                <ProgressBar value={channellePoints} max={christianPoints + channellePoints} color="bg-brand-gold" height="h-2" />
              </div>
            </div>
          </Card>

          {/* Weekly Challenge */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Weekly Challenge</h2>
            <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
              <p className="text-sm font-bold text-[var(--text-primary)] mb-1">No-Spend Weekend Challenge</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Spend $0 on non-essentials this weekend. First to break loses 25 points. Both succeed? +50 pts each!
              </p>
              <div className="flex gap-2 mt-3">
                <Badge variant="info">+50 pts possible</Badge>
                <Badge variant="warning">Ends Sunday</Badge>
              </div>
            </div>
          </Card>

          {/* Achievement Badges */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-4">Badges</h2>
            <div className="grid grid-cols-2 gap-3">
              {debtDuelBadges.map((badge) => (
                <div
                  key={badge.name}
                  className={cn(
                    'p-3 rounded-xl border text-center transition-colors',
                    badge.earned ? 'border-brand-gold/30 bg-brand-gold/5' : 'border-[var(--border-color)] opacity-40'
                  )}
                >
                  <p className="text-2xl mb-1">
                    {badge.icon === 'sword' ? '\u2694\uFE0F' : badge.icon === 'flame' ? '\uD83D\uDD25' : badge.icon === 'rocket' ? '\uD83D\uDE80' : badge.icon === 'crown' ? '\uD83D\uDC51' : badge.icon === 'trophy' ? '\uD83C\uDFC6' : '\u26F0\uFE0F'}
                  </p>
                  <p className="text-xs font-semibold text-[var(--text-primary)]">{badge.name}</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{badge.description}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Interest Saved */}
          <Card>
            <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">Interest Saved</h2>
            <div className="text-center py-2">
              <p className="text-3xl font-black tabular-nums text-brand-green">{fmtCurrency(totalSavedInterest)}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Total interest saved by paying extra</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
