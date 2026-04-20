'use client';

import { useState, useRef } from 'react';
import { fmtCurrency } from '@/lib/utils';
import ChartTooltip from './ChartTooltip';

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
  const [hovered, setHovered] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

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

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const ratioX = mouseX / rect.width;
    const svgX = ratioX * svgW;
    let closest = 0;
    let closestDist = Infinity;
    for (let i = 0; i < points.length; i++) {
      const dist = Math.abs(points[i].x - svgX);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    }
    setHovered(closest);
    setTooltipPos({
      x: (points[closest].x / svgW) * rect.width,
      y: (points[closest].y / svgH) * rect.height,
    });
  }

  const hp = hovered !== null ? points[hovered] : null;
  const prev = hovered !== null && hovered > 0 ? data[hovered - 1].value : null;
  const change = hp && prev !== null ? hp.value - prev : null;

  return (
    <div className="w-full relative" style={{ height }} ref={containerRef}>
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        role="img"
        aria-label="Line chart"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHovered(null)}
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

        {/* Crosshair */}
        {hp && (
          <line
            x1={hp.x}
            y1={padTop}
            x2={hp.x}
            y2={padTop + innerH}
            stroke={color}
            strokeWidth={1}
            strokeDasharray="4 4"
            opacity={0.5}
          />
        )}

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
          <circle
            key={`dot-${p.label}-${i}`}
            cx={p.x}
            cy={p.y}
            r={hovered === i ? 6 : 4}
            fill={color}
            stroke="white"
            strokeWidth={2}
            style={{ transition: 'r 0.15s ease' }}
          />
        ))}

        {/* X-axis month labels */}
        {points.map((p, i) => (
          <text
            key={`lbl-${p.label}-${i}`}
            x={p.x}
            y={svgH - 8}
            textAnchor="middle"
            fontSize={12}
            fontWeight={hovered === i ? 700 : 500}
            fill={hovered === i ? color : 'var(--text-muted)'}
          >
            {p.label}
          </text>
        ))}
      </svg>
      <ChartTooltip x={tooltipPos.x} y={tooltipPos.y} visible={hovered !== null}>
        {hp && (
          <div className="text-center space-y-0.5">
            <div className="font-semibold">{hp.label}</div>
            <div className="tabular-nums">{formatValue(hp.value)}</div>
            {change !== null && (
              <div className={change >= 0 ? 'text-brand-green' : 'text-brand-red'}>
                {change >= 0 ? '+' : ''}{formatValue(change)}
              </div>
            )}
          </div>
        )}
      </ChartTooltip>
    </div>
  );
}
