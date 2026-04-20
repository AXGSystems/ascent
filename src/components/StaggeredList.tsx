'use client';

import React, { Children } from 'react';

interface StaggeredListProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function StaggeredList({ children, delay = 80, className }: StaggeredListProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <div
          className="animate-stagger-in"
          style={{
            animationDelay: `${i * delay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
