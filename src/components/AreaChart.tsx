'use client';

import { fmtCurrency } from '@/lib/utils';

interface AreaSeries {
  label: string;
  color: string;
  data: number[];
}

interface AreaChartProps {
  labels: string[];
  series: AreaSeries[];
  height?: number;
  formatValue?: (v: number) => string;
}

export default function AreaChart({
  labels,
  series,
  height = 180,
  formatValue = (v) => fmtCurrency(v, true),
}: AreaChartProps) {
  if (labels.length < 2 || series.length === 0) return null;

  const w = 100;
  const h = 100;
  const padTop = 8;
  const padBottom = 18;
  const padLeft = 2;
  const padRight = 2;
  const innerW = w - padLeft - padRight;
  const innerH = h - padTop - padBottom;

  const allValues = series.flatMap((s) => s.data);
  const maxVal = Math.max(...allValues) * 1.1;

  function getY(v: number) {
    return padTop + innerH - (v / maxVal) * innerH;
  }

  function getX(i: number) {
    return padLeft + (i / (labels.length - 1)) * innerW;
  }

  return (
    <div className="w-full" style={{ height }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-full" aria-label="Area chart">
        {/* Grid */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
          <line
            key={pct}
            x1={padLeft}
            y1={padTop + innerH * (1 - pct)}
            x2={padLeft + innerW}
            y2={padTop + innerH * (1 - pct)}
            stroke="var(--border-color)"
            strokeWidth={0.3}
          />
        ))}

        {/* Series */}
        {series.map((s, si) => {
          const pts = s.data.map((v, i) => `${getX(i)},${getY(v)}`);
          const linePath = `M ${pts.join(' L ')}`;
          const fillPath = `${linePath} L ${getX(labels.length - 1)},${padTop + innerH} L ${getX(0)},${padTop + innerH} Z`;
          return (
            <g key={si}>
              <path d={fillPath} fill={s.color} fillOpacity={0.15} />
              <path d={linePath} fill="none" stroke={s.color} strokeWidth={0.7} strokeLinecap="round" />
            </g>
          );
        })}

        {/* Labels */}
        {labels.map((lbl, i) => (
          <text
            key={i}
            x={getX(i)}
            y={h - 3}
            textAnchor="middle"
            fontSize={3.5}
            fill="var(--text-muted)"
            fontFamily="var(--font-sans)"
          >
            {lbl}
          </text>
        ))}
      </svg>
      {/* Legend */}
      <div className="flex gap-4 mt-1 justify-center">
        {series.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-[var(--text-secondary)]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
