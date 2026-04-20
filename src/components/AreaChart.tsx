'use client';

import { useState, useRef } from 'react';
import { fmtCurrency } from '@/lib/utils';
import ChartTooltip from './ChartTooltip';

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
  const [hovered, setHovered] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const ratioX = mouseX / rect.width;
    const svgX = ratioX * svgW;
    let closest = 0;
    let closestDist = Infinity;
    for (let i = 0; i < labels.length; i++) {
      const dist = Math.abs(getX(i) - svgX);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    }
    setHovered(closest);
    const topSeriesY = Math.min(...series.map((s) => getY(s.data[closest])));
    setTooltipPos({
      x: (getX(closest) / svgW) * rect.width,
      y: (topSeriesY / svgH) * rect.height,
    });
  }

  // Compute gap between first two series for highlight
  const gapPath =
    series.length >= 2
      ? (() => {
          const s0 = series[0].data;
          const s1 = series[1].data;
          const top = s0.map((_, i) => `${getX(i)},${getY(Math.max(s0[i], s1[i]))}`);
          const bot = s0.map((_, i) => `${getX(i)},${getY(Math.min(s0[i], s1[i]))}`).reverse();
          return `M ${top.join(' L ')} L ${bot.join(' L ')} Z`;
        })()
      : null;

  return (
    <div className="w-full">
      <div style={{ height }} className="relative" ref={containerRef}>
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
          role="img"
          aria-label="Area chart"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHovered(null)}
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

          {/* Gap highlight */}
          {gapPath && (
            <path d={gapPath} fill="var(--brand-gold)" opacity={hovered !== null ? 0.08 : 0.04} />
          )}

          {/* Crosshair */}
          {hovered !== null && (
            <line
              x1={getX(hovered)}
              y1={padTop}
              x2={getX(hovered)}
              y2={padTop + innerH}
              stroke="var(--text-muted)"
              strokeWidth={1}
              strokeDasharray="4 4"
              opacity={0.5}
            />
          )}

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
                {/* Hover dots */}
                {hovered !== null && (
                  <circle
                    cx={getX(hovered)}
                    cy={getY(s.data[hovered])}
                    r={5}
                    fill={s.color}
                    stroke="white"
                    strokeWidth={2}
                  />
                )}
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
              fontWeight={hovered === i ? 700 : 500}
              fill={hovered === i ? 'var(--text-primary)' : 'var(--text-muted)'}
            >
              {lbl}
            </text>
          ))}
        </svg>
        <ChartTooltip x={tooltipPos.x} y={tooltipPos.y} visible={hovered !== null}>
          {hovered !== null && (
            <div className="text-center space-y-0.5">
              <div className="font-semibold">{labels[hovered]}</div>
              {series.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <span>{s.label}:</span>
                  <span className="tabular-nums font-medium">{formatValue(s.data[hovered])}</span>
                </div>
              ))}
            </div>
          )}
        </ChartTooltip>
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
