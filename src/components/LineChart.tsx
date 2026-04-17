'use client';

import { fmtCurrency } from '@/lib/utils';

interface LineChartProps {
  data: Array<{ label: string; value: number }>;
  height?: number;
  color?: string;
  formatValue?: (v: number) => string;
}

export default function LineChart({
  data,
  height = 200,
  color = '#0a8ebc',
  formatValue = (v) => fmtCurrency(v, true),
}: LineChartProps) {
  if (data.length < 2) return null;

  const w = 100;
  const h = 100;
  const padTop = 10;
  const padBottom = 20;
  const padLeft = 2;
  const padRight = 2;
  const innerW = w - padLeft - padRight;
  const innerH = h - padTop - padBottom;

  const values = data.map((d) => d.value);
  const min = Math.min(...values) * 0.98;
  const max = Math.max(...values) * 1.02;
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = padLeft + (i / (data.length - 1)) * innerW;
    const y = padTop + innerH - ((d.value - min) / range) * innerH;
    return { x, y, ...d };
  });

  const linePath = `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}`;
  const fillPath = `${linePath} L ${padLeft + innerW},${padTop + innerH} L ${padLeft},${padTop + innerH} Z`;

  return (
    <div className="w-full" style={{ height }}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="w-full h-full"
        aria-label="Line chart"
      >
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = padTop + innerH * (1 - pct);
          return (
            <line
              key={pct}
              x1={padLeft}
              y1={y}
              x2={padLeft + innerW}
              y2={y}
              stroke="var(--border-color)"
              strokeWidth={0.3}
            />
          );
        })}

        {/* Fill */}
        <path d={fillPath} fill={color} fillOpacity={0.1} />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={0.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={1} fill={color} />
        ))}

        {/* Labels */}
        {points.map((p, i) => (
          <text
            key={`label-${i}`}
            x={p.x}
            y={h - 3}
            textAnchor="middle"
            fontSize={3.5}
            fill="var(--text-muted)"
            fontFamily="var(--font-sans)"
          >
            {p.label}
          </text>
        ))}
      </svg>
      {/* Value labels */}
      <div className="flex justify-between px-1 -mt-2">
        <span className="text-xs tabular-nums text-[var(--text-muted)]">
          {formatValue(values[0])}
        </span>
        <span className="text-xs tabular-nums font-medium text-[var(--text-primary)]">
          {formatValue(values[values.length - 1])}
        </span>
      </div>
    </div>
  );
}
