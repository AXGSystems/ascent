// A$cent — Guided Actions Engine
// Generates the top 5 most impactful financial actions ranked by impact

import {
  accounts,
  subscriptions,
  bills,
  nests,
  budgetCategories,
  transactions,
} from './data';

export interface GuidedAction {
  priority: number;
  title: string;
  impact: string;
  description: string;
  href: string;
  type: 'save' | 'reduce' | 'protect' | 'grow' | 'fix';
  icon: string;
}

export function generateGuidedActions(): GuidedAction[] {
  const actions: GuidedAction[] = [];

  // 1. Fix stale accounts
  const staleAccounts = accounts.filter((a) => a.status === 'stale');
  staleAccounts.forEach((acct) => {
    actions.push({
      priority: 1,
      title: `Reconnect ${acct.name}`,
      impact: '+15 A$cent Score points',
      description: `This account hasn't synced in ${acct.lastSync}. Your net worth and reports are missing this data. Reconnect for accurate numbers.`,
      href: '/sync',
      type: 'fix',
      icon: '\uD83D\uDD17',
    });
  });

  // 2. Cancel unused subscriptions
  const unusedSubs = subscriptions
    .filter((s) => s.usageScore <= 2 && s.issue)
    .sort((a, b) => b.amount - a.amount);
  unusedSubs.forEach((sub) => {
    actions.push({
      priority: 2,
      title: `Cancel unused ${sub.name}`,
      impact: `Save $${sub.amount.toFixed(2)}/mo ($${(sub.amount * 12).toFixed(0)}/yr)`,
      description: `Usage score: ${sub.usageScore}/10. Last active: ${sub.issue}. That's money going nowhere.`,
      href: '/subscriptions',
      type: 'reduce',
      icon: '\u2702\uFE0F',
    });
  });

  // 3. Set up autopay for manual bills
  const manualBills = bills.filter((b) => !b.autopay && !b.paid);
  if (manualBills.length > 0) {
    actions.push({
      priority: 3,
      title: `Set up autopay for ${manualBills.map((b) => b.name).join(' & ')}`,
      impact: 'Protect credit score + save $15-25/yr',
      description: `${manualBills.length} bills require manual payment. Autopay eliminates late fees and protects your 756 credit score.`,
      href: '/bills',
      type: 'protect',
      icon: '\uD83D\uDEE1\uFE0F',
    });
  }

  // 4. Boost emergency fund
  const emergencyNest = nests.find((n) => n.name === 'Emergency');
  if (emergencyNest) {
    const pct = Math.round((emergencyNest.current / emergencyNest.goal) * 100);
    if (pct < 100) {
      actions.push({
        priority: 4,
        title: 'Boost Emergency Fund by $50/mo',
        impact: `Reach 1-month coverage by June`,
        description: `Currently at $${emergencyNest.current.toLocaleString()} of $${emergencyNest.goal.toLocaleString()} (${pct}%). An extra $50/mo accelerates your safety net.`,
        href: '/save',
        type: 'grow',
        icon: '\uD83D\uDCB0',
      });
    }
  }

  // 5. Review flagged transactions
  const flaggedTx = transactions.filter((tx) => tx.flagged);
  flaggedTx.forEach((tx) => {
    actions.push({
      priority: 5,
      title: `Review ${tx.name} $${Math.abs(tx.amount)} charge`,
      impact: 'Verify legitimacy',
      description: `This ${tx.category} transaction was flagged as unusual. Confirm it's legitimate or dispute it with your bank.`,
      href: '/transactions',
      type: 'protect',
      icon: '\uD83D\uDD0D',
    });
  });

  // 6. Address over-budget categories
  const overBudget = budgetCategories.filter((c) => c.over);
  overBudget.forEach((cat) => {
    const over = cat.spent - cat.allocated;
    actions.push({
      priority: 6,
      title: `Freeze ${cat.name} spending`,
      impact: `Save $${over}+ this month`,
      description: `${cat.name} is $${over} over its $${cat.allocated} budget. A spending pause for the remaining 12 days gets you back on track.`,
      href: '/spend',
      type: 'save',
      icon: '\u26A1',
    });
  });

  // 7. Negotiate bills
  actions.push({
    priority: 7,
    title: 'Negotiate your phone bill',
    impact: 'Save up to $60/mo ($720/yr)',
    description: 'Your $140/mo phone plan is above market rate. Switching to a prepaid plan or calling to negotiate could cut it in half.',
    href: '/billaudit',
    type: 'save',
    icon: '\uD83D\uDCDE',
  });

  // 8. Increase savings rate
  actions.push({
    priority: 8,
    title: 'Bump Hawaii fund to $35/week',
    impact: 'Reach goal by October',
    description: 'Increasing your weekly Hawaii save from $25 to $35 accelerates your trip fund and keeps excitement building.',
    href: '/save',
    type: 'grow',
    icon: '\u2708\uFE0F',
  });

  return actions.sort((a, b) => a.priority - b.priority).slice(0, 5);
}
