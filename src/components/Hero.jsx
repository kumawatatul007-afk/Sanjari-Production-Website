import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, PlayCircle, Camera } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleParallax = (e) => {
      const orbs = heroRef.current?.querySelectorAll('.orb');
      if (!orbs) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      orbs.forEach((orb, i) => {
        const factor = (i + 1) * 0.4;
        orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    };
    window.addEventListener('mousemove', handleParallax);
    return () => window.removeEventListener('mousemove', handleParallax);
  }, []);

  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Background Layers */}
      <motion.div className="hero-bg" style={{ y: yBg }}>
        <div className="hero-overlay" />
        <div className="hero-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </motion.div>

      {/* Cinematic Bars */}
      <div className="cinematic-bar top" />
      <div className="cinematic-bar bottom" />

      {/* Content */}
      <motion.div className="hero-content" style={{ opacity: opacityText }}>
        <motion.div 
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="badge-dot" />
          <span>Premium Photography &amp; Videography</span>
        </motion.div>

        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="hero-title-line">Capturing</span>
          <span className="hero-title-gold">Timeless</span>
          <span className="hero-title-line">Moments</span>
        </motion.h1>

        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Every frame tells a story. We craft visual masterpieces that transcend time —
          from intimate portraits to grand cinematic productions.
        </motion.p>

        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button className="btn-primary" id="hero-explore-btn" onClick={() => scrollToSection('gallery')}>
            <span>Explore Work</span>
            <ChevronRight size={18} />
          </button>
          <button className="btn-outline" id="hero-contact-btn" onClick={() => scrollToSection('contact')}>
            <Camera size={18} className="gold-text" style={{ marginRight: '6px' }} />
            <span>Book a Shoot</span>
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { num: '500+', label: 'Projects Done' },
            { num: '8+', label: 'Years Experience' },
            { num: '200+', label: 'Happy Clients' },
            { num: '15+', label: 'Awards Won' },
          ].map((stat, idx) => (
            <div className="stat-item" key={stat.label}>
              <span className="stat-num">{stat.num}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" onClick={() => scrollToSection('about')}>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll</span>
      </div>

      {/* Decorative Film Strip */}
      <div className="film-strip">
        {[...Array(8)].map((_, i) => (
          <div className="film-frame" key={i} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
