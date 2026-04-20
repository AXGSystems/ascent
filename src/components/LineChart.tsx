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
  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center text-sm text-[var(--text-muted)]" style={{ height }}>
        No data available
      </div>
    );
  }

  const svgW = 600;
  const svgH = 280;
  const padTop = 20;
  const padBottom = 40;
  const padLeft = 10;
  const padRight = 10;
  const innerW = svgW - padLeft - padRight;
  const innerH = svgH - padTop - padBottom;

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
        viewBox={`0 0 ${svgW} ${svgH}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        role="img"
        aria-label="Line chart"
      >
        <defs>
          <linearGradient id={`fill-${color.replace(/[^a-z0-9]/gi, '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.2} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>

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
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Area fill */}
        <path d={fillPath} fill={`url(#fill-${color.replace(/[^a-z0-9]/gi, '')})`} />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dots */}
        {points.map((p, i) => (
          <g key={`dot-${p.label}-${i}`}>
            <circle cx={p.x} cy={p.y} r={4} fill={color} stroke="white" strokeWidth={2} />
            <title>{`${p.label}: ${formatValue(p.value)}`}</title>
          </g>
        ))}

        {/* X-axis month labels */}
        {points.map((p, i) => (
          <text
            key={`lbl-${p.label}-${i}`}
            x={p.x}
            y={svgH - 8}
            textAnchor="middle"
            fontSize={12}
            fontWeight={500}
            fill="var(--text-muted)"
          >
            {p.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
