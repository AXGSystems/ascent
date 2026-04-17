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
    title: 'ANALYTICS',
    items: [
      { label: 'Accounts', href: '/accounts', icon: 'building' },
      { label: 'Transactions', href: '/transactions', icon: 'list' },
      { label: 'ChargeIQ', href: '/chargeiq', icon: 'search' },
      { label: 'Credit', href: '/credit', icon: 'shield' },
      { label: 'Forecast', href: '/forecast', icon: 'trending-up' },
    ],
  },
  {
    title: 'MANAGE',
    items: [
      { label: 'Settings', href: '/settings', icon: 'settings' },
    ],
  },
];
