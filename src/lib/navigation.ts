// A$cent — Navigation configuration

import type { NavSection } from './types';

export const navigation: NavSection[] = [
  {
    title: 'MAIN',
    items: [
      { label: 'Home', href: '/', icon: 'home' },
      { label: 'Spend', href: '/spend', icon: 'credit-card' },
      { label: 'Save', href: '/save', icon: 'piggy-bank' },
      { label: 'Money', href: '/money', icon: 'wallet' },
      { label: 'Coach', href: '/coach', icon: 'sparkles' },
    ],
  },
  {
    title: 'MONEY',
    items: [
      { label: 'Accounts', href: '/accounts', icon: 'building' },
      { label: 'Transactions', href: '/transactions', icon: 'list' },
      { label: 'Subscriptions', href: '/subscriptions', icon: 'refresh' },
      { label: 'Bills', href: '/bills', icon: 'calendar' },
      { label: 'Income', href: '/income', icon: 'dollar' },
    ],
  },
  {
    title: 'INSIGHTS',
    items: [
      { label: 'ChargeIQ', href: '/chargeiq', icon: 'search' },
      { label: 'A$cent Score', href: '/score', icon: 'award' },
      { label: 'Credit', href: '/credit', icon: 'shield' },
      { label: 'Forecast', href: '/forecast', icon: 'trending-up' },
      { label: 'Fee Analyzer', href: '/fees', icon: 'percent' },
    ],
  },
  {
    title: 'PLANNING',
    items: [
      { label: 'Nests', href: '/nests', icon: 'target' },
      { label: 'Emergency Fund', href: '/emergency', icon: 'umbrella' },
      { label: 'Debt Plan', href: '/debt', icon: 'trending-down' },
      { label: 'Tax', href: '/tax', icon: 'file-text' },
    ],
  },
  {
    title: 'HOUSEHOLD',
    items: [
      { label: 'Messages', href: '/messages', icon: 'message-circle' },
      { label: 'Partner', href: '/partner', icon: 'users' },
      { label: 'Money Date', href: '/moneydate', icon: 'heart' },
      { label: 'Achievements', href: '/achievements', icon: 'award' },
      { label: 'Alerts', href: '/alerts', icon: 'bell' },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { label: 'Settings', href: '/settings', icon: 'settings' },
      { label: 'Export', href: '/export', icon: 'download' },
      { label: 'Feedback', href: '/feedback', icon: 'message-square' },
    ],
  },
];
