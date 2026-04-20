'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  padding?: boolean;
}

export default function Card({ children, onClick, className, padding = true }: CardProps) {
  const base = 'rounded-2xl glass-blur border transition-all duration-200 ease-out animate-card-in';
  const colors = 'bg-[var(--bg-card)] border-[var(--border-color)]';
  const shadow = 'shadow-[var(--shadow-card)]';
  const ring = 'ring-1 ring-[var(--border-glass)] ring-inset';
  const pad = padding ? 'p-5' : '';
  const hoverLift = 'hover:bg-[var(--bg-card-hover)] hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5';
  const press = 'active:scale-[0.98] active:shadow-none';
  const hover = onClick
    ? `cursor-pointer ${hoverLift} ${press}`
    : hoverLift;

  const Tag = onClick ? 'button' : 'div';
  return (
    <Tag
      className={cn(base, colors, shadow, ring, pad, hover, className)}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {children}
    </Tag>
  );
}
