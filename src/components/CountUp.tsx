'use client';

import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
}

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function formatWithCommas(n: number, decimals: number): string {
  const parts = n.toFixed(decimals).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 1500,
  decimals = 0,
}: CountUpProps) {
  const [display, setDisplay] = useState('0');
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = eased * value;
      setDisplay(formatWithCommas(current, decimals));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(formatWithCommas(value, decimals));
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration, decimals]);

  return (
    <span className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  );
}
