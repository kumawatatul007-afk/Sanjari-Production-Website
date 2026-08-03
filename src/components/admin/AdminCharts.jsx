import React from 'react';
import { motion } from 'framer-motion';

// ─── Radial Progress Ring ──────────────────────────────────────────────────
export const RadialProgressRing = ({ percentage = 75, size = 120, strokeWidth = 10, color = '#d4af37', label = 'Progress' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth={strokeWidth}
          />
          {/* Glowing Animated circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
          />
        </svg>
        {/* Center Text */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}
          >
            {percentage}%
          </motion.span>
        </div>
      </div>
      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  );
};


// ─── Donut Chart (Spinning & Rotating Slices) ──────────────────────────────
export const LuxuryDonutChart = ({ data = [] }) => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const radius = 55;
  const strokeWidth = 14;
  const size = 160;
  const circumference = radius * 2 * Math.PI;

  let currentOffset = 0;

  // Render list of segments
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const strokeLength = (percentage / 100) * circumference;
    const strokeOffset = circumference - strokeLength;
    const rotation = (currentOffset / circumference) * 360 - 90;
    
    currentOffset += strokeLength;

    return {
      ...item,
      strokeLength,
      strokeOffset,
      rotation,
      percentage
    };
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        {/* Base rotating SVG group */}
        <motion.svg
          width={size}
          height={size}
          initial={{ rotate: -240, scale: 0.6, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'center' }}
        >
          {segments.map((segment, index) => (
            <motion.circle
              key={segment.name}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              // Set starting state with full offset (empty circle)
              initial={{ strokeDashoffset: circumference }}
              // Animate to target state
              animate={{ strokeDashoffset: segment.strokeOffset }}
              transition={{ delay: index * 0.1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `rotate(${segment.rotation}deg)`,
                transformOrigin: 'center',
                filter: `drop-shadow(0 0 5px ${segment.color}40)`
              }}
            />
          ))}
        </motion.svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
        >
          <span style={{ fontSize: '0.65rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}>{total}</span>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', minWidth: '150px' }}>
        {segments.map((item) => (
          <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifySelf: 'start', gap: '0.75rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#e5e7eb' }}>{item.name}</span>
              <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{item.value} bookings ({item.percentage.toFixed(0)}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// ─── Area/Line Trend Chart ─────────────────────────────────────────────────
export const LuxuryLineChart = ({ data = [], height = 180 }) => {
  if (data.length === 0) return null;

  const padding = 35;
  const chartHeight = height;
  const chartWidth = 500;

  // Max value calculation for scaling
  const maxVal = Math.max(...data.map(d => d.value), 4) * 1.15;
  const pointsCount = data.length;

  const getX = (index) => {
    return padding + (index * (chartWidth - padding * 2)) / (pointsCount - 1);
  };

  const getY = (value) => {
    return chartHeight - padding - (value * (chartHeight - padding * 2)) / maxVal;
  };

  // Generate SVG Path
  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`);
  
  // Renders beautiful cubic curves instead of sharp angles
  let pathD = `M ${points[0]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const x1 = getX(i);
    const y1 = getY(data[i].value);
    const x2 = getX(i + 1);
    const y2 = getY(data[i + 1].value);
    // Control points
    const cpX1 = x1 + (x2 - x1) / 2;
    const cpY1 = y1;
    const cpX2 = x1 + (x2 - x1) / 2;
    const cpY2 = y2;
    pathD += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${x2},${y2}`;
  }

  // Renders the solid area gradient matching the path
  const areaD = `${pathD} L ${getX(pointsCount - 1)},${chartHeight - padding} L ${getX(0)},${chartHeight - padding} Z`;

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg 
        viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
        width="100%" 
        height={height}
        style={{ minWidth: '400px', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--admin-gold)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--admin-gold)" stopOpacity="0.00" />
          </linearGradient>
          <linearGradient id="lineGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--admin-accent-blue)" />
            <stop offset="50%" stopColor="var(--admin-gold)" />
            <stop offset="100%" stopColor="var(--admin-accent-purple)" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
          const yVal = chartHeight - padding - ratio * (chartHeight - padding * 2);
          return (
            <line
              key={ratio}
              x1={padding}
              y1={yVal}
              x2={chartWidth - padding}
              y2={yVal}
              stroke="rgba(255, 255, 255, 0.03)"
              strokeDasharray="4 4"
            />
          );
        })}

        {/* Area fill */}
        <motion.path
          d={areaD}
          fill="url(#chartGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />

        {/* The animated trend line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#lineGlow)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Data points */}
        {data.map((d, i) => (
          <g key={i}>
            {/* Outer halo */}
            <motion.circle
              cx={getX(i)}
              cy={getY(d.value)}
              r="7"
              fill="rgba(212, 175, 55, 0.15)"
              stroke="var(--admin-gold)"
              strokeWidth="1.5"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * i + 0.5, type: 'spring', stiffness: 100 }}
              style={{ cursor: 'pointer' }}
            />
            {/* Center dot */}
            <circle
              cx={getX(i)}
              cy={getY(d.value)}
              r="3.5"
              fill="#ffffff"
            />
            {/* Text labels */}
            <motion.text
              x={getX(i)}
              y={getY(d.value) - 12}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10px"
              fontWeight="bold"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.8 }}
            >
              {d.value}
            </motion.text>
          </g>
        ))}

        {/* X Axis Labels */}
        {data.map((d, i) => (
          <text
            key={d.label}
            x={getX(i)}
            y={chartHeight - 8}
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.4)"
            fontSize="10px"
            fontWeight="bold"
            fontFamily="var(--font-body)"
          >
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
};
