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
    icon: <img src="/images/icons/wedding.png" alt="Wedding Photography" className="service-img-icon" />,
    title: 'Wedding Photography',
    desc: 'Capturing the magic of your special day with cinematic elegance. Every emotion, every glance — immortalized forever.',
    features: ['Pre-Wedding Shoot', 'Ceremony Coverage', 'Reception Highlights', 'Album Design'],
  },
  {
    id: 'videography',
    icon: <img src="/images/icons/videography.png" alt="Cinematic Videography" className="service-img-icon" />,
    title: 'Cinematic Videography',
    desc: 'Transform your events into stunning cinematic films. Professional editing, color grading, and soundtrack included.',
    features: ['4K Film Production', 'Drone Aerial Shots', 'Color Grading', 'Cinematic Edit'],
  },
  {
    id: 'portrait',
    icon: <img src="/images/icons/portrait.png" alt="Portrait Sessions" className="service-img-icon" />,
    title: 'Portrait Sessions',
    desc: 'Professional portrait photography that brings out your authentic self. Perfect for professionals, models, and families.',
    features: ['Studio Lighting', 'Outdoor Sessions', 'Professional Retouching', 'Same-Day Previews'],
  },
  {
    id: 'corporate',
    icon: <img src="/images/icons/corporate.png" alt="Corporate Events" className="service-img-icon" />,
    title: 'Corporate Events',
    desc: 'Elevate your brand with professional corporate photography and videography that tells your company story.',
    features: ['Product Photography', 'Event Coverage', 'Brand Videos', 'Executive Portraits'],
  },
  {
    id: 'fashion',
    icon: <img src="/images/icons/fashion.png" alt="Fashion & Editorial" className="service-img-icon" />,
    title: 'Fashion & Editorial',
    desc: 'High-fashion photography that makes a statement. Creative direction, styling guidance, and magazine-worthy results.',
    features: ['Lookbook Production', 'Magazine Editorials', 'E-Commerce Shoots', 'Creative Direction'],
  },
  {
    id: 'aerial',
    icon: <img src="/images/icons/aerial.png" alt="Aerial Drone Shots" className="service-img-icon" />,
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
