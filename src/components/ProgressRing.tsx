'use client';

import { useState, useEffect, useRef } from 'react';
import CountUp from './CountUp';

interface ProgressRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

export default function ProgressRing({
  value,
  size = 140,
  strokeWidth = 10,
  color = '#0a8ebc',
  label,
  sublabel,
}: ProgressRingProps) {
  const [animatedPct, setAnimatedPct] = useState(0);
  const hasRun = useRef(false);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    // Trigger CSS transition after mount
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimatedPct(value);
      });
    });
  }, [value]);

  const offset = circumference - (animatedPct / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="progress-ring-svg"
          aria-label={`Progress: ${value}%`}
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="var(--border-color)"
            strokeWidth={strokeWidth}
          />
          {/* Progress arc */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${center} ${center})`}
            style={{
              transition: 'stroke-dashoffset 1.5s ease-out',
              filter: `drop-shadow(0 0 6px ${color}40)`,
            }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black text-[var(--text-primary)]">
            <CountUp value={value} decimals={1} duration={1500} />
          </span>
          {label && (
            <span className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
              {label}
            </span>
          )}
        </div>
      </div>
      {sublabel && (
        <span className="text-xs text-[var(--text-secondary)] text-center">{sublabel}</span>
      )}
    </div>
  );
}
