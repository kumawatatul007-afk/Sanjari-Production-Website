import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trailEnabled, setTrailEnabled] = useState(true);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const requestRef = useRef(null);

  useEffect(() => {
    // Read initial config from localStorage
    const savedTrail = localStorage.getItem('sanjari-cursor-trail') !== 'false';
    setTrailEnabled(savedTrail);

    const updateMousePosition = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });

      // Spawn particles on movement if trail is enabled
      if (savedTrail && canvasRef.current) {
        // Spawn 2 particles per mousemove for an elegant flow
        for (let i = 0; i < 2; i++) {
          particlesRef.current.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 1.6,
            vy: (Math.random() - 0.5) * 1.6 - 0.6, // drift upward
            alpha: 1,
            size: Math.random() * 3.5 + 1.5,
            decay: Math.random() * 0.02 + 0.015
          });
        }
      }
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.classList.contains('hover-target')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // Configuration change listener
    const handleConfigChange = (e) => {
      if (e.detail && typeof e.detail.cursorTrail !== 'undefined') {
        setTrailEnabled(e.detail.cursorTrail);
        // Sync the local variable used in updateMousePosition
        localStorage.setItem('sanjari-cursor-trail', e.detail.cursorTrail ? 'true' : 'false');
        // We trigger immediate update
        window.location.reload; // or just update variables
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('sanjari-config-changed', handleConfigChange);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('sanjari-config-changed', handleConfigChange);
    };
  }, [trailEnabled]);

  // Handle particle trail loop (Canvas)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (trailEnabled) {
        // Fetch active theme gold color dynamically from computed styles
        const activeThemeColor = getComputedStyle(document.body).getPropertyValue('--gold').trim() || '#d4af37';
        
        particlesRef.current.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;
          p.size *= 0.97;

          // Draw sparkling star/circle
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = activeThemeColor;
          ctx.shadowBlur = 6;
          ctx.shadowColor = activeThemeColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Filter active particles
        particlesRef.current = particlesRef.current.filter(p => p.alpha > 0 && p.size > 0.4);
      }

      requestRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
    };
  }, [trailEnabled]);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      borderColor: 'var(--gold)'
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: 'var(--gold-glow)',
      borderColor: 'var(--gold)'
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 1,
      backgroundColor: 'var(--gold)'
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 0
    }
  };

  return (
    <>
      {/* Sparkle Trail Canvas */}
      {trailEnabled && (
        <canvas ref={canvasRef} className="cursor-trail-canvas" />
      )}
      
      {/* Custom Mouse Cursor */}
      <motion.div
        className="cursor-ring"
        variants={variants}
        animate={isHovering ? 'hover' : 'default'}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
      <motion.div
        className="cursor-dot"
        variants={dotVariants}
        animate={isHovering ? 'hover' : 'default'}
        transition={{ type: 'tween', ease: 'linear', duration: 0 }}
      />
    </>
  );
};

export default CustomCursor;
