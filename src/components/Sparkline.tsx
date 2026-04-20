'use client';

import { useState, useRef } from 'react';
import { fmtCurrency } from '@/lib/utils';
import ChartTooltip from './ChartTooltip';

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  fill?: boolean;
  formatValue?: (v: number) => string;
}

export default function Sparkline({
  data,
  width = 120,
  height = 32,
  color = '#0a8ebc',
  fill = true,
  formatValue = (v) => fmtCurrency(v, true),
}: SparklineProps) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = 2;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * innerW;
    const y = pad + innerH - ((v - min) / range) * innerH;
    return { x, y, v };
  });

  const endPt = points[points.length - 1];
  const linePath = `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}`;
  const fillPath = `${linePath} L ${pad + innerW},${pad + innerH} L ${pad},${pad + innerH} Z`;

  return (
    <div
      className="relative inline-block"
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
        {fill && (
          <path d={fillPath} fill={color} fillOpacity={0.15} />
        )}
        <path d={linePath} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        {hovered && (
          <circle cx={endPt.x} cy={endPt.y} r={3} fill={color} stroke="white" strokeWidth={1.5} />
        )}
      </svg>
      <ChartTooltip x={width - pad} y={0} visible={hovered}>
        <span className="tabular-nums">{formatValue(endPt.v)}</span>
      </ChartTooltip>
    </div>
  );
}
