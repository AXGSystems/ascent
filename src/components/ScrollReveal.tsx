'use client';

import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  const { ref, inView } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-600 ease-out',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: '600ms',
      }}
    >
      {children}
    </div>
  );
}
