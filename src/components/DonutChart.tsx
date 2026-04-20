'use client';

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
  const total = segments.reduce((acc, s) => acc + s.value, 0);
  const radius = 40;
  const strokeWidth = 12;
  const cx = 50;
  const cy = 50;
  const circumference = 2 * Math.PI * radius;

  // Pre-compute cumulative offsets to avoid mutation during render
  const segmentData = segments.map((seg) => {
    const pct = total > 0 ? seg.value / total : 0;
    return { ...seg, pct, dashLen: pct * circumference };
  });
  const cumulativeOffsets = segmentData.reduce<number[]>((acc, _, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + segmentData[i - 1].pct);
    return acc;
  }, []);

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
        {segmentData.map((seg, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${seg.dashLen} ${circumference - seg.dashLen}`}
              strokeDashoffset={-cumulativeOffsets[i] * circumference}
              strokeLinecap="butt"
              transform={`rotate(-90 ${cx} ${cy})`}
            />
          ))}
        {/* Center text */}
        {centerLabel && (
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            fontSize={5}
            fill="var(--text-muted)"
            fontFamily="var(--font-sans)"
          >
            {centerLabel}
          </text>
        )}
        {centerValue && (
          <text
            x={cx}
            y={cy + 7}
            textAnchor="middle"
            fontSize={9}
            fontWeight="bold"
            fill="var(--text-primary)"
            fontFamily="var(--font-sans)"
          >
            {centerValue}
          </text>
        )}
      </svg>
      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
          {segments.map((seg, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs">
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
