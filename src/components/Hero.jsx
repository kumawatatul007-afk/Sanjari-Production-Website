import React, { useEffect, useRef } from 'react';
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

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      {/* Background Layers */}
      <div className="hero-bg">
        <div className="hero-overlay" />
        <div className="hero-grid" />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Cinematic Bars */}
      <div className="cinematic-bar top" />
      <div className="cinematic-bar bottom" />

      {/* Content */}
      <div className="hero-content">
        <div className="hero-badge animate-fadeInUp delay-1">
          <span className="badge-dot" />
          <span>Premium Photography &amp; Videography</span>
        </div>

        <h1 className="hero-title animate-fadeInUp delay-2">
          <span className="hero-title-line">Capturing</span>
          <span className="hero-title-gold">Timeless</span>
          <span className="hero-title-line">Moments</span>
        </h1>

        <p className="hero-subtitle animate-fadeInUp delay-3">
          Every frame tells a story. We craft visual masterpieces that transcend time —
          from intimate portraits to grand cinematic productions.
        </p>

        <div className="hero-cta animate-fadeInUp delay-4">
          <button className="btn-primary" id="hero-explore-btn" onClick={() => scrollToSection('gallery')}>
            <span>Explore Work</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="btn-outline" id="hero-contact-btn" onClick={() => scrollToSection('contact')}>
            <span>Book a Shoot</span>
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats animate-fadeInUp delay-5">
          {[
            { num: '500+', label: 'Projects Done' },
            { num: '8+', label: 'Years Experience' },
            { num: '200+', label: 'Happy Clients' },
            { num: '15+', label: 'Awards Won' },
          ].map((stat) => (
            <div className="stat-item" key={stat.label}>
              <span className="stat-num">{stat.num}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

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
