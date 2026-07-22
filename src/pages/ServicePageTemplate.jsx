import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ServicePageTemplate.css';

const ServicePageTemplate = ({ service }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              el.style.transitionDelay = `${i * 0.1}s`;
              el.classList.add('revealed');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (contentRef.current) {
      contentRef.current.querySelectorAll('section').forEach(sec => observer.observe(sec));
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="service-page" ref={contentRef}>

      {/* ─── HERO ─── */}
      <section className="sp-hero" style={{ '--hero-color-1': service.color1, '--hero-color-2': service.color2 }}>
        {service.heroImage && (
          <img src={service.heroImage} alt={service.title} className="sp-hero-img" />
        )}
        <div className="sp-hero-overlay" />
        <div className="sp-hero-grid" />

        {/* Back button */}
        <Link to="/" className="sp-back-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back to Home</span>
        </Link>

        <div className="sp-hero-content">
          <div className="sp-hero-badge">
            <span className="sp-badge-dot" />
            <span>{service.category}</span>
          </div>
          <h1 className="sp-hero-title">{service.title}</h1>
          <p className="sp-hero-tagline">{service.tagline}</p>
          <div className="sp-hero-cta">
            <Link to="/#contact" className="btn-primary sp-cta-btn" id="sp-book-btn">
              <span>Book This Service</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <a href="tel:+919876543210" className="btn-outline sp-call-btn" id="sp-call-btn">
              <span>Call Us</span>
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="sp-hero-stats">
          {service.stats.map(stat => (
            <div className="sp-stat" key={stat.label}>
              <span className="sp-stat-num">{stat.value}</span>
              <span className="sp-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── OVERVIEW ─── */}
      <section className="sp-overview">
        <div className="sp-container">
          <div className="sp-overview-grid">
            <div className="sp-overview-left">
              <p className="section-tag reveal">{service.category}</p>
              <h2 className="section-title reveal">{service.overviewTitle}</h2>
              <div className="sp-divider reveal">
                <div className="sp-divider-line" />
                <div className="sp-divider-diamond" />
                <div className="sp-divider-line" />
              </div>
              {service.overviewDesc.map((para, i) => (
                <p key={i} className="section-desc reveal" style={{ marginTop: i > 0 ? '1rem' : '0' }}>{para}</p>
              ))}
            </div>
            <div className="sp-overview-right reveal">
              <div className="sp-features-card">
                <h3 className="sp-features-title">What's Included</h3>
                <ul className="sp-features-list">
                  {service.includes.map(item => (
                    <li key={item.label} className="sp-feature-item">
                      <div className="sp-feature-icon">{item.icon}</div>
                      <div>
                        <span className="sp-feature-name">{item.label}</span>
                        <span className="sp-feature-desc">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section className="sp-process">
        <div className="sp-container">
          <div className="sp-process-header reveal">
            <p className="section-tag">How It Works</p>
            <h2 className="section-title">Our <span>Process</span></h2>
          </div>
          <div className="sp-process-steps">
            {service.process.map((step, i) => (
              <div className="sp-step reveal" key={step.title}>
                <div className="sp-step-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="sp-step-icon">{step.icon}</div>
                <h4 className="sp-step-title">{step.title}</h4>
                <p className="sp-step-desc">{step.desc}</p>
                {i < service.process.length - 1 && <div className="sp-step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY PREVIEW ─── */}
      {service.galleryImages && service.galleryImages.length > 0 && (
        <section className="sp-gallery-preview">
          <div className="sp-container">
            <div className="sp-gallery-header reveal">
              <p className="section-tag">Our Work</p>
              <h2 className="section-title">Recent <span>{service.category}</span> Work</h2>
            </div>
            <div className="sp-gallery-grid">
              {service.galleryImages.map((img, i) => (
                <div
                  key={i}
                  className={`sp-gallery-item reveal ${i === 0 ? 'sp-gallery-featured' : ''}`}
                  style={{ background: `linear-gradient(135deg, ${service.color1} 0%, ${service.color2}60 100%)` }}
                >
                  <img src={img} alt={`${service.title} ${i + 1}`} className="sp-gallery-img" loading="lazy" onError={e => e.target.style.display='none'} />
                  <div className="sp-gallery-overlay">
                    <div className="sp-gallery-label">{service.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── PACKAGES ─── */}
      <section className="sp-packages">
        <div className="sp-container">
          <div className="sp-packages-header reveal">
            <p className="section-tag">Pricing</p>
            <h2 className="section-title">Choose Your <span>Package</span></h2>
            <p className="section-desc reveal" style={{ textAlign: 'center', margin: '1rem auto 0' }}>
              Transparent pricing with no hidden costs. Every package is fully customizable to your needs.
            </p>
          </div>
          <div className="sp-packages-grid">
            {service.packages.map((pkg, i) => (
              <div className={`sp-package-card reveal ${pkg.featured ? 'featured' : ''}`} key={pkg.name} id={`pkg-${pkg.name.toLowerCase()}`}>
                {pkg.featured && <div className="sp-package-badge">Most Popular</div>}
                <div className="sp-package-name">{pkg.name}</div>
                <div className="sp-package-price">
                  <span className="sp-price-currency">₹</span>
                  <span className="sp-price-amount">{pkg.price}</span>
                  <span className="sp-price-unit">{pkg.unit}</span>
                </div>
                <ul className="sp-package-features">
                  {pkg.features.map(f => (
                    <li key={f}>
                      <span className="sp-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/#contact" className={pkg.featured ? 'btn-primary sp-pkg-btn' : 'btn-outline sp-pkg-btn'} id={`pkg-book-${i}`}>
                  <span>Book Now</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="sp-cta-banner">
        <div className="sp-cta-content">
          <h2 className="sp-cta-title reveal">Ready to Create <span>Magic?</span></h2>
          <p className="sp-cta-desc reveal">Let's discuss your vision and bring it to life with our expertise.</p>
          <div className="sp-cta-btns reveal">
            <Link to="/#contact" className="btn-primary" id="sp-cta-contact">
              <span>Get In Touch</span>
            </Link>
            <Link to="/" className="btn-outline" id="sp-cta-home">
              <span>View All Services</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default ServicePageTemplate;
