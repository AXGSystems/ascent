'use client';

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

const variants: Record<string, string> = {
  default: 'bg-[var(--border-color)] text-[var(--text-secondary)]',
  success: 'bg-brand-green/15 text-brand-green',
  warning: 'bg-brand-gold/15 text-brand-gold',
  danger: 'bg-brand-red/15 text-brand-red',
  info: 'bg-brand-teal/15 text-brand-teal',
};

export default function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold leading-tight',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
