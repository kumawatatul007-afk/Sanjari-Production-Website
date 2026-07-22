import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Services.css';

const serviceRoutes = {
  wedding:     '/services/wedding',
  videography: '/services/videography',
  portrait:    '/services/portrait',
  corporate:   '/services/corporate',
  fashion:     '/services/fashion',
  aerial:      '/services/aerial',
};

const services = [
  {
    id: 'wedding',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 8C20 8 10 14 10 22C10 27.52 14.48 32 20 32C25.52 32 30 27.52 30 22C30 14 20 8 20 8Z" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
        <path d="M20 8V32M14 15L26 29M26 15L14 29" stroke="rgba(201,168,76,0.3)" strokeWidth="1"/>
      </svg>
    ),
    title: 'Wedding Photography',
    desc: 'Capturing the magic of your special day with cinematic elegance. Every emotion, every glance — immortalized forever.',
    features: ['Pre-Wedding Shoot', 'Ceremony Coverage', 'Reception Highlights', 'Album Design'],
  },
  {
    id: 'videography',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="12" width="24" height="16" rx="3" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
        <path d="M28 17L36 13V27L28 23V17Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Cinematic Videography',
    desc: 'Transform your events into stunning cinematic films. Professional editing, color grading, and soundtrack included.',
    features: ['4K Film Production', 'Drone Aerial Shots', 'Color Grading', 'Cinematic Edit'],
  },
  {
    id: 'portrait',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="15" r="6" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
        <path d="M8 34C8 27.37 13.37 22 20 22C26.63 22 32 27.37 32 34" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    title: 'Portrait Sessions',
    desc: 'Professional portrait photography that brings out your authentic self. Perfect for professionals, models, and families.',
    features: ['Studio Lighting', 'Outdoor Sessions', 'Professional Retouching', 'Same-Day Previews'],
  },
  {
    id: 'corporate',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="10" width="24" height="20" rx="2" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
        <path d="M15 10V8C15 7.45 15.45 7 16 7H24C24.55 7 25 7.45 25 8V10" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
        <path d="M8 20H32" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2 2"/>
        <circle cx="20" cy="20" r="3" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    title: 'Corporate Events',
    desc: 'Elevate your brand with professional corporate photography and videography that tells your company story.',
    features: ['Product Photography', 'Event Coverage', 'Brand Videos', 'Executive Portraits'],
  },
  {
    id: 'fashion',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M14 8L10 16H30L26 8H14Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <path d="M10 16V32H30V16" stroke="#C9A84C" strokeWidth="1.5" fill="none"/>
        <path d="M20 8V16" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2 2"/>
      </svg>
    ),
    title: 'Fashion & Editorial',
    desc: 'High-fashion photography that makes a statement. Creative direction, styling guidance, and magazine-worthy results.',
    features: ['Lookbook Production', 'Magazine Editorials', 'E-Commerce Shoots', 'Creative Direction'],
  },
  {
    id: 'aerial',
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 8L14 18H10L14 22V30H18V26H22V30H26V22L30 18H26L20 8Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
        <circle cx="20" cy="19" r="2" fill="#C9A84C"/>
      </svg>
    ),
    title: 'Aerial Drone Shots',
    desc: 'Breathtaking aerial perspectives that add a cinematic grandeur to your events, real estate, and promotional content.',
    features: ['4K Drone Footage', 'Real Estate Aerials', 'Event Overviews', 'Landscape Photography'],
  },
];

const Services = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.service-card').forEach((card, i) => {
              card.style.transitionDelay = `${i * 0.1}s`;
              card.classList.add('visible');
            });
            entry.target.querySelector('.services-header')?.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      {/* Decorative BG */}
      <div className="services-bg">
        <div className="services-bg-orb" />
      </div>

      <div className="services-container">
        <div className="services-header reveal">
          <p className="section-tag">What We Do</p>
          <h2 className="section-title">
            Our Premium <span>Services</span>
          </h2>
          <p className="section-desc" style={{ margin: '1rem auto 0', textAlign: 'center', maxWidth: '600px' }}>
            We offer a full spectrum of visual storytelling services, each crafted with precision,
            creativity, and an unwavering commitment to excellence.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, i) => (
            <div className="service-card" key={service.id} id={`service-${service.id}`}>
              <div className="service-card-inner">
                <div className="service-number">0{i + 1}</div>
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
                <ul className="service-features">
                  {service.features.map(f => (
                    <li key={f}>
                      <span className="feature-dot" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={serviceRoutes[service.id]}
                  className="service-explore-btn"
                  id={`explore-${service.id}`}
                >
                  <span>Explore Service</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <div className="service-hover-line" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
