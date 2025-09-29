import React from 'react';

// Lightweight SVG chart placeholder (no external deps)
const AdherenceChart = ({ data = [78, 85, 92, 88, 95, 98] }) => {
  const max = Math.max(...data, 100);
  const width = 300;
  const height = 120;
  const barW = width / data.length - 8;
  return (
    <svg width={width} height={height} role="img" aria-label="Adherence chart">
      {data.map((v, i) => {
        const h = (v / max) * (height - 20);
        const x = i * (barW + 8) + 10;
        const y = height - h - 10;
        const grad = v > 90 ? '#10b981' : '#34d399';
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} rx="6" fill={grad} />
            <text x={x + barW / 2} y={y - 4} fontSize="10" textAnchor="middle" fill="#6b7280">{v}%</text>
          </g>
        );
      })}
    </svg>
  );
};

export default AdherenceChart;
