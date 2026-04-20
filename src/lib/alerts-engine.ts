// A$cent — Smart Contextual Alerts Engine
// Analyzes financial data and generates actionable alerts

import {
  budgetCategories,
  accounts,
  subscriptions,
  nests,
  bills,
  transactions,
  cashFlow,
  nwHistory,
} from './data';

export interface SmartAlert {
  id: string;
  type: 'urgent' | 'warning' | 'opportunity' | 'milestone' | 'learning';
  icon: string;
  title: string;
  message: string;
  action?: { label: string; href: string };
  dismissable: boolean;
}

export function generateAlerts(): SmartAlert[] {
  const alerts: SmartAlert[] = [];

  // --- BUDGET ALERTS ---
  budgetCategories.forEach((cat) => {
    const pct = Math.round((cat.spent / cat.allocated) * 100);
    if (cat.over) {
      const overAmount = cat.spent - cat.allocated;
      alerts.push({
        id: `budget-over-${cat.name}`,
        type: 'urgent',
        icon: '\u26A0\uFE0F',
        title: `${cat.name} is ${pct}% of budget`,
        message: `You've overspent by $${overAmount}. Consider pausing ${cat.name.toLowerCase()} spending for the rest of the month.`,
        action: { label: 'Review spending', href: '/spend' },
        dismissable: true,
      });
    } else if (cat.warning || pct >= 85) {
      alerts.push({
        id: `budget-warn-${cat.name}`,
        type: 'warning',
        icon: '\uD83D\uDFE1',
        title: `${cat.name} is at ${pct}% of budget`,
        message: `$${cat.allocated - cat.spent} remaining in ${cat.name}. You have 12 days left this month.`,
        action: { label: 'View budget', href: '/spend' },
        dismissable: true,
      });
    }
  });

  // --- STALE ACCOUNT ALERTS ---
  accounts.forEach((acct) => {
    if (acct.status === 'stale') {
      alerts.push({
        id: `sync-stale-${acct.name}`,
        type: 'urgent',
        icon: '\uD83D\uDD34',
        title: `${acct.name} hasn't synced in ${acct.lastSync}`,
        message: `Stale account data means your net worth and balances may be inaccurate. Reconnect to get up-to-date numbers.`,
        action: { label: 'Reconnect now', href: '/sync' },
        dismissable: false,
      });
    } else if (acct.status === 'warn') {
      alerts.push({
        id: `sync-warn-${acct.name}`,
        type: 'warning',
        icon: '\uD83D\uDFE0',
        title: `${acct.name} sync is delayed`,
        message: `Last synced ${acct.lastSync} ago. This may resolve automatically, but keep an eye on it.`,
        action: { label: 'Check sync', href: '/sync' },
        dismissable: true,
      });
    }
  });

  // --- SUBSCRIPTION ALERTS ---
  subscriptions.forEach((sub) => {
    if (sub.issue && sub.usageScore <= 2) {
      alerts.push({
        id: `sub-unused-${sub.name}`,
        type: 'opportunity',
        icon: '\uD83D\uDCA1',
        title: `${sub.name} may be unused`,
        message: `You're paying $${sub.amount.toFixed(2)}/mo for ${sub.name} — usage score is ${sub.usageScore}/10 (${sub.issue}). That's $${(sub.amount * 12).toFixed(0)}/yr.`,
        action: { label: 'Review subscriptions', href: '/subscriptions' },
        dismissable: true,
      });
    }
  });

  // --- SAVINGS GOAL ALERTS ---
  nests.forEach((nest) => {
    const pct = Math.round((nest.current / nest.goal) * 100);
    if (pct >= 70 && pct < 100) {
      const remaining = nest.goal - nest.current;
      alerts.push({
        id: `goal-close-${nest.name}`,
        type: 'milestone',
        icon: '\uD83C\uDFAF',
        title: `${nest.name} is at ${pct}%!`,
        message: `$${remaining.toLocaleString()} more to reach your $${nest.goal.toLocaleString()} goal. You're in the home stretch!`,
        action: { label: 'View goals', href: '/save' },
        dismissable: true,
      });
    }
  });

  // --- BILL ALERTS ---
  const unpaidManual = bills.filter((b) => !b.paid && !b.autopay);
  unpaidManual.forEach((bill) => {
    alerts.push({
      id: `bill-due-${bill.name}`,
      type: 'warning',
      icon: '\uD83D\uDCC5',
      title: `${bill.name} bill ($${bill.amount}) due ${bill.dueLabel}`,
      message: `This bill is not on autopay. Set up automatic payments to never miss a due date.`,
      action: { label: 'Set up autopay', href: '/bills' },
      dismissable: true,
    });
  });

  // --- SPENDING VELOCITY ---
  const latestCF = cashFlow[cashFlow.length - 1];
  const prevCF = cashFlow[cashFlow.length - 2];
  if (latestCF.exp > prevCF.exp * 1.1) {
    const pctFaster = Math.round(((latestCF.exp - prevCF.exp) / prevCF.exp) * 100);
    alerts.push({
      id: 'velocity-high',
      type: 'warning',
      icon: '\uD83D\uDCCA',
      title: `Spending velocity is elevated`,
      message: `You're on pace to spend ${pctFaster}% more than last month. Review your variable spending to stay on track.`,
      action: { label: 'Review trends', href: '/spend' },
      dismissable: true,
    });
  }

  // --- ACHIEVEMENT ---
  alerts.push({
    id: 'achievement-streak',
    type: 'milestone',
    icon: '\uD83C\uDFC6',
    title: '14-day budget streak!',
    message: `Your longest streak yet. Keep going — consistency is the key to financial success.`,
    dismissable: true,
  });

  // --- FLAGGED TRANSACTION ---
  const flagged = transactions.filter((tx) => tx.flagged);
  flagged.forEach((tx) => {
    alerts.push({
      id: `flagged-${tx.name}-${tx.date}`,
      type: 'urgent',
      icon: '\u26A0\uFE0F',
      title: `Unusual charge: ${tx.name} $${Math.abs(tx.amount)}`,
      message: `This transaction was flagged as unusual for the ${tx.category} category. Review it to confirm it's legitimate.`,
      action: { label: 'Review transaction', href: '/transactions' },
      dismissable: true,
    });
  });

  // --- NET WORTH MILESTONE ---
  const currentNW = nwHistory[nwHistory.length - 1].v;
  if (currentNW > 80000) {
    const toHundred = 100000 - currentNW;
    alerts.push({
      id: 'nw-milestone-100k',
      type: 'milestone',
      icon: '\uD83C\uDF1F',
      title: `$100k net worth within reach`,
      message: `You're $${toHundred.toLocaleString()} away from $100,000. At your current pace, you'll reach it in about 18 months.`,
      action: { label: 'View forecast', href: '/forecast' },
      dismissable: true,
    });
  }

  // --- LEARNING MOMENTS ---
  const learningAlerts: SmartAlert[] = [
    {
      id: 'learn-compound',
      type: 'learning',
      icon: '\uD83D\uDCDA',
      title: 'Did you know?',
      message: `Moving $50/mo more to savings would add $7,200 over 10 years with compound interest at 5%. Small changes, big results.`,
      action: { label: 'Explore savings', href: '/save' },
      dismissable: true,
    },
    {
      id: 'learn-autopay',
      type: 'learning',
      icon: '\uD83D\uDCDA',
      title: 'Pro tip: Autopay everything',
      message: `Missed payments are the #1 cause of credit score drops. You have 2 bills not on autopay. Switching could protect your 756 credit score.`,
      action: { label: 'Review bills', href: '/bills' },
      dismissable: true,
    },
  ];

  // Add one learning alert based on day of month
  const dayIdx = new Date().getDate() % learningAlerts.length;
  alerts.push(learningAlerts[dayIdx]);

  return alerts;
}

// Get the most critical alerts (for banner display)
export function getTopAlerts(count: number = 3): SmartAlert[] {
  const all = generateAlerts();
  // Priority order: urgent > warning > opportunity > milestone > learning
  const priority: Record<SmartAlert['type'], number> = {
    urgent: 0,
    warning: 1,
    opportunity: 2,
    milestone: 3,
    learning: 4,
  };
  return all
    .sort((a, b) => priority[a.type] - priority[b.type])
    .slice(0, count);
}

// Get alert count by type (for sidebar badges)
export function getAlertCounts(): { total: number; urgent: number; warnings: number } {
  const all = generateAlerts();
  return {
    total: all.length,
    urgent: all.filter((a) => a.type === 'urgent').length,
    warnings: all.filter((a) => a.type === 'warning').length,
  };
}
