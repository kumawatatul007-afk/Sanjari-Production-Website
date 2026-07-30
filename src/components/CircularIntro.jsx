import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import './CircularIntro.css';

const INTRO_IMAGES = [
  { id: 1, title: 'Wedding Showcase', img: '/images/gallery_wedding_1.png', category: 'Wedding' },
  { id: 2, title: 'Fine Portrait', img: '/images/gallery_portrait_1.png', category: 'Portrait' },
  { id: 3, title: 'Cinematic Reel', img: '/images/gallery_cinematic_1.png', category: 'Cinematic' },
  { id: 4, title: 'Haute Fashion', img: '/images/gallery_fashion_1.png', category: 'Fashion' },
  { id: 5, title: 'Brand Identity', img: '/images/gallery_corporate_1.png', category: 'Corporate' },
  { id: 6, title: 'Behind the Lens', img: '/images/about_photographer.png', category: 'Creative' }
];

const CircularIntro = ({ onComplete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  // Simulated focus scanning progress
  useEffect(() => {
    const duration = 2000; // 2s focus simulation
    const interval = 20;
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, interval);

    // Expand the circle of images after 500ms
    const expandTimer = setTimeout(() => {
      setIsExpanded(true);
    }, 500);

    return () => {
      clearInterval(timer);
      clearTimeout(expandTimer);
    };
  }, []);

  // Ambient Star particles moving in an orbit
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class OrbitParticle {
      constructor() {
        this.reset();
      }

      reset() {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 250 + 80; // distance from center
        this.x = window.innerWidth / 2 + Math.cos(angle) * radius;
        this.y = window.innerHeight / 2 + Math.sin(angle) * radius;
        this.angle = angle;
        this.radius = radius;
        this.speed = (Math.random() * 0.003 + 0.0015) * (Math.random() > 0.5 ? 1 : -1);
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.color = Math.random() > 0.7 ? 'var(--gold)' : '#ffffff';
      }

      update() {
        this.angle += this.speed;
        this.x = window.innerWidth / 2 + Math.cos(this.angle) * this.radius;
        this.y = window.innerHeight / 2 + Math.sin(this.angle) * this.radius;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particles = Array.from({ length: 60 }, () => new OrbitParticle());

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);
    // Delay unmounting to allow exit animations (1.2 seconds for full epic expand & dissolve)
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className={`circular-intro-overlay ${isExiting ? 'exit-active' : ''}`}>
        {/* Background stars */}
        <canvas ref={canvasRef} className="intro-stars-canvas" />

        {/* Cinematic grid overlay */}
        <div className="camera-grid-overlay">
          <div className="camera-corner top-left" />
          <div className="camera-corner top-right" />
          <div className="camera-corner bottom-left" />
          <div className="camera-corner bottom-right" />
          <div className="camera-lens-crosshair" />
        </div>

        {/* Center Scanner and Button */}
        <div className="intro-center-hub">
          <motion.div 
            className="hub-scanner-ring"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          />
          <motion.div 
            className="hub-scanner-ring-reverse"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
          />
          
          <div className="hub-content">
            <h3 className="hub-brand-name">SANJARI</h3>
            <span className="hub-brand-tag">PRODUCTION</span>
            
            <div className="hub-interactive-box">
              {progress < 100 ? (
                <div className="hub-loading-status">
                  <div className="scan-bar" />
                  <span className="scan-percent">FOCUS LOCK: {Math.floor(progress)}%</span>
                </div>
              ) : (
                <motion.button 
                  className="hub-enter-btn hover-target"
                  onClick={handleEnter}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={14} fill="currentColor" style={{ marginRight: '6px' }} />
                  <span>ENTER EXPERIENCE</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Rotating orbit ring containing the images */}
        <div className="orbit-ring-wrapper">
          <div className={`orbit-ring-container ${isExiting ? 'burst' : ''}`}>
            {INTRO_IMAGES.map((img, idx) => {
              const angle = (idx * 360) / INTRO_IMAGES.length;
              return (
                <div
                  key={img.id}
                  className="orbit-card-wrapper"
                  style={{
                    '--card-angle': `${angle}deg`,
                    '--card-radius': isExiting 
                      ? '120vw' 
                      : (isExpanded 
                        ? (window.innerWidth < 768 ? '140px' : '26vw') 
                        : '0px')
                  }}
                >
                  <div className="orbit-card-inner">
                    <div className="orbit-img-card hover-target" onClick={handleEnter}>
                      <img src={img.img} alt={img.title} className="orbit-card-photo" />
                      <div className="orbit-card-glow" />
                      <div className="orbit-card-overlay">
                        <span className="orbit-card-cat">{img.category}</span>
                        <span className="orbit-card-title">{img.title}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skip button top right */}
        <button className="intro-skip-btn hover-target" onClick={handleEnter}>
          <span>SKIP EXPERIENCE</span>
        </button>

        {/* Ambient background light orbs */}
        <div className="intro-glow-orb orb-gold" />
        <div className="intro-glow-orb orb-theme" />
      </div>
    </AnimatePresence>
  );
};

export default CircularIntro;
