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
  height = 200,
  formatValue = (v) => fmtCurrency(v, true),
}: AreaChartProps) {
  if (labels.length < 2 || series.length === 0) {
    return (
      <div className="flex items-center justify-center text-sm text-[var(--text-muted)]" style={{ height }}>
        No data available
      </div>
    );
  }

  const svgW = 600;
  const svgH = 260;
  const padTop = 16;
  const padBottom = 36;
  const padLeft = 10;
  const padRight = 10;
  const innerW = svgW - padLeft - padRight;
  const innerH = svgH - padTop - padBottom;

  const allValues = series.flatMap((s) => s.data);
  const maxVal = Math.max(...allValues) * 1.1;

  function getY(v: number) {
    return padTop + innerH - (v / maxVal) * innerH;
  }
  function getX(i: number) {
    return padLeft + (i / (labels.length - 1)) * innerW;
  }

  return (
    <div className="w-full">
      <div style={{ height }}>
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
          role="img"
          aria-label="Area chart"
        >
          {/* Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <line
              key={pct}
              x1={padLeft}
              y1={padTop + innerH * (1 - pct)}
              x2={padLeft + innerW}
              y2={padTop + innerH * (1 - pct)}
              stroke="var(--border-color)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          ))}

          {/* Series */}
          {series.map((s, si) => {
            const pts = s.data.map((v, i) => `${getX(i)},${getY(v)}`);
            const linePath = `M ${pts.join(' L ')}`;
            const fillPath = `${linePath} L ${getX(labels.length - 1)},${padTop + innerH} L ${getX(0)},${padTop + innerH} Z`;
            return (
              <g key={s.label}>
                <defs>
                  <linearGradient id={`area-fill-${si}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={s.color} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <path d={fillPath} fill={`url(#area-fill-${si})`} />
                <path d={linePath} fill="none" stroke={s.color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            );
          })}

          {/* X-axis labels */}
          {labels.map((lbl, i) => (
            <text
              key={`lbl-${lbl}-${i}`}
              x={getX(i)}
              y={svgH - 8}
              textAnchor="middle"
              fontSize={12}
              fontWeight={500}
              fill="var(--text-muted)"
            >
              {lbl}
            </text>
          ))}
        </svg>
      </div>
      {/* Legend */}
      <div className="flex gap-4 mt-2 justify-center">
        {series.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 text-xs">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-[var(--text-secondary)]">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
