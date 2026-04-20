'use client';

import { useState } from 'react';
import { fmtCurrency } from '@/lib/utils';

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  centerLabel?: string;
  centerValue?: string;
  showLegend?: boolean;
}

export default function DonutChart({
  segments,
  size = 160,
  centerLabel,
  centerValue,
  showLegend = true,
}: DonutChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const total = segments.reduce((acc, s) => acc + s.value, 0);
  const radius = 40;
  const strokeWidth = 12;
  const cx = 50;
  const cy = 50;
  const circumference = 2 * Math.PI * radius;

  const segmentData = segments.map((seg) => {
    const pct = total > 0 ? seg.value / total : 0;
    return { ...seg, pct, dashLen: pct * circumference };
  });
  const cumulativeOffsets = segmentData.reduce<number[]>((acc, _, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + segmentData[i - 1].pct);
    return acc;
  }, []);

  // Compute center text for hovered segment
  const hovSeg = hovered !== null ? segmentData[hovered] : null;
  const displayLabel = hovSeg ? hovSeg.label : centerLabel;
  const displayValue = hovSeg ? fmtCurrency(hovSeg.value) : centerValue;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg viewBox="0 0 100 100" width={size} height={size} aria-label="Donut chart">
        {/* Background circle */}
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke="var(--border-color)"
          strokeWidth={strokeWidth}
        />
        {segmentData.map((seg, i) => {
          const isHovered = hovered === i;
          // Compute midpoint angle for pull-out direction
          const midPct = cumulativeOffsets[i] + seg.pct / 2;
          const angle = midPct * 2 * Math.PI - Math.PI / 2;
          const pull = isHovered ? 2.5 : 0;
          const tx = Math.cos(angle) * pull;
          const ty = Math.sin(angle) * pull;

          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={isHovered ? strokeWidth + 2 : strokeWidth}
              strokeDasharray={`${seg.dashLen} ${circumference - seg.dashLen}`}
              strokeDashoffset={-cumulativeOffsets[i] * circumference}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy}) translate(${tx} ${ty})`}
              style={{
                transition: 'stroke-width 0.2s ease, transform 0.2s ease',
                filter: isHovered ? `drop-shadow(0 0 4px ${seg.color}40)` : 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}
        {/* Center text */}
        {displayLabel && (
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            fontSize={5}
            fill="var(--text-muted)"
            fontFamily="var(--font-sans)"
          >
            {displayLabel}
          </text>
        )}
        {displayValue && (
          <text
            x={cx}
            y={cy + 7}
            textAnchor="middle"
            fontSize={9}
            fontWeight="bold"
            fill="var(--text-primary)"
            fontFamily="var(--font-sans)"
          >
            {displayValue}
          </text>
        )}
        {hovSeg && (
          <text
            x={cx}
            y={cy + 15}
            textAnchor="middle"
            fontSize={4}
            fill="var(--text-muted)"
            fontFamily="var(--font-sans)"
          >
            {Math.round(hovSeg.pct * 100)}%
          </text>
        )}
      </svg>
      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
          {segments.map((seg, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 text-xs cursor-pointer"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ opacity: hovered !== null && hovered !== i ? 0.5 : 1, transition: 'opacity 0.15s' }}
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
              <span className="text-[var(--text-secondary)]">{seg.label}</span>
              <span className="tabular-nums font-medium text-[var(--text-primary)]">
                {fmtCurrency(seg.value)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
