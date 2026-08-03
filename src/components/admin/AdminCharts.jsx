import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ─── Radial Progress Ring (Rotating & Fluctuation) ──────────────────────────
export const RadialProgressRing = ({ percentage = 75, size = 120, strokeWidth = 10, color = '#d4af37', label = 'Progress' }) => {
  const [livePercentage, setLivePercentage] = useState(percentage);

  useEffect(() => {
    setLivePercentage(percentage);
  }, [percentage]);

  useEffect(() => {
    const interval = setInterval(() => {
      const deviation = Math.round((Math.random() - 0.5) * 4); // +/- 2%
      setLivePercentage(prev => {
        const target = prev + deviation;
        // Keep within 5% of original percentage and in bounds [10, 100]
        if (Math.abs(target - percentage) > 6) return percentage;
        return Math.max(10, Math.min(100, target));
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (livePercentage / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <motion.svg 
          width={size} 
          height={size} 
          animate={{ rotate: [-90, 270] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          style={{ transformOrigin: 'center' }}
        >
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
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
          />
        </motion.svg>
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
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.6 }}
            key={livePercentage}
            style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}
          >
            {livePercentage}%
          </motion.span>
        </div>
      </div>
      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  );
};


// ─── Donut Chart (Spinning & Rotating Slices with Live Updates) ─────────────
export const LuxuryDonutChart = ({ data = [] }) => {
  const [liveData, setLiveData] = useState(data);

  useEffect(() => {
    setLiveData(data);
  }, [data]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const interval = setInterval(() => {
      setLiveData(prevData => {
        return prevData.map(item => {
          // Fluctuate each category slightly occasionally
          if (Math.random() > 0.6) {
            const deviation = Math.random() > 0.5 ? 1 : -1;
            // Bound so it stays realistic and doesn't drop to negative
            const val = Math.max(1, item.value + deviation);
            return { ...item, value: val };
          }
          return item;
        });
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [data]);

  const total = liveData.reduce((acc, curr) => acc + curr.value, 0);
  const radius = 55;
  const strokeWidth = 14;
  const size = 160;
  const circumference = radius * 2 * Math.PI;

  let currentOffset = 0;

  // Render list of segments
  const segments = liveData.map((item, index) => {
    const percentage = total > 0 ? (item.value / total) * 100 : 0;
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
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'center' }}
        >
          {/* Continuous spinning group */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
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
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{
                  transform: `rotate(${segment.rotation}deg)`,
                  transformOrigin: 'center',
                  filter: `drop-shadow(0 0 5px ${segment.color}40)`
                }}
              />
            ))}
          </motion.g>
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
          <motion.span 
            key={total}
            animate={{ scale: [1, 1.08, 1] }}
            style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-heading)' }}
          >
            {total}
          </motion.span>
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


// ─── Area/Line Trend Chart (Morphing Lines & Real-Time updates) ──────────────
export const LuxuryLineChart = ({ data = [], height = 180 }) => {
  if (data.length === 0) return null;

  const [liveData, setLiveData] = useState(data);

  useEffect(() => {
    setLiveData(data);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prevData => {
        return prevData.map((item, idx) => {
          // Fluctuate values slightly up/down (+/- 1 or 2)
          const original = data[idx]?.value || 5;
          const deviation = Math.round((Math.random() - 0.5) * 3);
          const val = Math.max(1, Math.min(original + 4, item.value + deviation));
          return { ...item, value: val };
        });
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [data]);

  const padding = 35;
  const chartHeight = height;
  const chartWidth = 500;

  // Max value calculation for scaling based on live data
  const maxVal = Math.max(...liveData.map(d => d.value), 4) * 1.15;
  const pointsCount = liveData.length;

  const getX = (index) => {
    return padding + (index * (chartWidth - padding * 2)) / (pointsCount - 1);
  };

  const getY = (value) => {
    return chartHeight - padding - (value * (chartHeight - padding * 2)) / maxVal;
  };

  // Generate SVG Path
  const points = liveData.map((d, i) => `${getX(i)},${getY(d.value)}`);
  
  // Renders beautiful cubic curves instead of sharp angles
  let pathD = `M ${points[0]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const x1 = getX(i);
    const y1 = getY(liveData[i].value);
    const x2 = getX(i + 1);
    const y2 = getY(liveData[i + 1].value);
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
          animate={{ d: areaD }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* The animated trend line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#lineGlow)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1, d: pathD }}
          transition={{ 
            pathLength: { duration: 2, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 1 },
            d: { duration: 0.8, ease: "easeInOut" }
          }}
        />

        {/* Data points */}
        {liveData.map((d, i) => (
          <g key={i}>
            {/* Outer halo */}
            <motion.circle
              cx={getX(i)}
              animate={{ cy: getY(d.value) }}
              r="7"
              fill="rgba(212, 175, 55, 0.15)"
              stroke="var(--admin-gold)"
              strokeWidth="1.5"
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ cursor: 'pointer' }}
            />
            {/* Center dot */}
            <motion.circle
              cx={getX(i)}
              animate={{ cy: getY(d.value) }}
              r="3.5"
              fill="#ffffff"
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            {/* Text labels */}
            <motion.text
              x={getX(i)}
              animate={{ y: getY(d.value) - 12 }}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10px"
              fontWeight="bold"
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {d.value}
            </motion.text>
          </g>
        ))}

        {/* X Axis Labels */}
        {liveData.map((d, i) => (
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

