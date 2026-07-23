import React, { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              el.style.transitionDelay = `${i * 0.12}s`;
              el.classList.add('revealed');
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const highlights = [
    { icon: '/images/icons/cinema.png', title: 'Cinematic Vision', desc: 'Every project is approached as a cinematic piece, crafted with narrative depth and visual artistry.' },
    { icon: '/images/icons/camera.png', title: 'Expert Photography', desc: 'From weddings to corporate events, our lens captures the authentic essence of every moment.' },
    { icon: '/images/icons/magic.png', title: 'Premium Quality', desc: 'State-of-the-art equipment combined with years of expertise delivers exceptional results every time.' },
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        {/* Left: Visual */}
        <div className="about-visual reveal">
          <div className="about-image-wrap">
            <div className="about-image-main">
              <img
                src="/images/about_photographer.png"
                alt="Sanjari Production Photographer"
                className="about-photo"
              />
            </div>

            {/* Floating badges */}
            <div className="about-badge-1">
              <span className="badge-number">8+</span>
              <span className="badge-text">Years of Excellence</span>
            </div>
            <div className="about-badge-2">
              <span className="badge-icon">🏆</span>
              <span className="badge-text">Award Winning</span>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="about-content">
          <p className="section-tag reveal">Our Story</p>
          <h2 className="section-title reveal">
            We Are More Than<br />Just <span>Photographers</span>
          </h2>

          <div className="divider reveal">
            <div className="divider-line" />
            <div className="divider-diamond" />
            <div className="divider-line" />
          </div>

          <p className="section-desc reveal">
            Sanjari Production was born from a passion for visual storytelling. We believe that
            every photograph and every frame of film holds the power to transport viewers into
            another world — a world of emotion, beauty, and authentic human connection.
          </p>
          <p className="section-desc reveal" style={{ marginTop: '1rem' }}>
            From grand wedding celebrations to intimate family portraits, corporate campaigns to
            fashion editorials — we pour our creative soul into every project we undertake.
          </p>

          {/* Highlights */}
          <div className="about-highlights reveal">
            {highlights.map((h) => (
              <div className="highlight-card" key={h.title}>
                <div className="highlight-icon">
                  <img src={h.icon} alt={h.title} className="highlight-img-icon" />
                </div>
                <div>
                  <h4 className="highlight-title">{h.title}</h4>
                  <p className="highlight-desc">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="about-cta reveal">
            <button
              className="btn-primary"
              id="about-services-btn"
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Our Services</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
