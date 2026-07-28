import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Video, MonitorPlay, Focus, Sparkles, Zap, Globe, Mic } from 'lucide-react';

import { ScrollReveal, SplitText, TiltCard, StaggerContainer, StaggerItem } from '../components/ScrollReveal';
import './ServicePageTemplate.css';

const iconMap = {
  camera: <Camera size={24} />,
  lens: <Focus size={24} />,
  drone: <Globe size={24} />,
  lighting: <Zap size={24} />,
  video: <Video size={24} />,
  stabilizer: <Sparkles size={24} />,
  audio: <Mic size={24} />,
  monitor: <MonitorPlay size={24} />
};

const ServicePageTemplate = ({ service }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="service-page">

      {/* ─── HERO ─── */}
      <section className="sp-hero" style={{ '--hero-color-1': service.color1, '--hero-color-2': service.color2 }}>
        {service.heroImage && (
          <img src={service.heroImage} alt={service.title} className="sp-hero-img" />
        )}
        <div className="sp-hero-overlay" />
        <div className="sp-hero-grid" />

        {/* Back button */}
        <Link to="/" className="sp-back-btn hover-target">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back to Home</span>
        </Link>

        <div className="sp-hero-content">
          <ScrollReveal variant="fadeIn" delay={0.1}>
            <div className="sp-hero-badge">
              <span className="sp-badge-dot" />
              <span>{service.category}</span>
            </div>
          </ScrollReveal>
          <h1 className="sp-hero-title">
            {service.title}
          </h1>
          <ScrollReveal variant="slideUp" delay={0.4}>
            <p className="sp-hero-tagline">{service.tagline}</p>
          </ScrollReveal>
          <ScrollReveal variant="scaleIn" delay={0.6}>
            <div className="sp-hero-cta">
              <Link to="/#contact" className="btn-primary sp-cta-btn hover-target" id="sp-book-btn">
                <span>Book This Service</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats bar */}
        <StaggerContainer className="sp-hero-stats" delay={0.8}>
          {service.stats.map((stat) => (
            <StaggerItem className="sp-stat" key={stat.label}>
              <span className="sp-stat-num">{stat.value}</span>
              <span className="sp-stat-label">{stat.label}</span>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ─── OVERVIEW ─── */}
      <section className="sp-overview">
        <div className="sp-container">
          <div className="sp-overview-grid">
            <div className="sp-overview-left">
              <ScrollReveal variant="fadeIn" delay={0.1}>
                <p className="section-tag">{service.category}</p>
              </ScrollReveal>
              <h2 className="section-title">
                {service.overviewTitle}
              </h2>
              <ScrollReveal variant="fadeIn" delay={0.3}>
                <div className="sp-divider">
                  <div className="sp-divider-line" />
                  <div className="sp-divider-diamond" />
                  <div className="sp-divider-line" />
                </div>
              </ScrollReveal>
              {service.overviewDesc.map((para, i) => (
                <ScrollReveal key={i} variant="slideUp" delay={0.4 + i * 0.1}>
                  <p className="section-desc" style={{ marginTop: i > 0 ? '1rem' : '0' }}>{para}</p>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal 
              className="sp-overview-right"
              variant="slideLeft"
            >
              <TiltCard className="sp-features-card" maxRotation={4}>
                <h3 className="sp-features-title">What's Included</h3>
                <ul className="sp-features-list">
                  {service.includes.map(item => (
                    <li key={item.label} className="sp-feature-item">
                      <div className="sp-feature-icon">
                        <img src={item.icon} alt={item.label} className="sp-feature-img-icon" />
                      </div>
                      <div>
                        <span className="sp-feature-name">{item.label}</span>
                        <span className="sp-feature-desc">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── EQUIPMENT ARSENAL ─── */}
      {service.equipment && (
        <section className="sp-equipment">
          <div className="sp-container">
            <ScrollReveal 
              className="sp-equipment-header"
              variant="slideUp"
            >
              <p className="section-tag">Our Gear</p>
              <h2 className="section-title">The <span>Arsenal</span></h2>
              <p className="section-desc" style={{textAlign: 'center', margin: '0 auto', maxWidth: '600px'}}>
                We shoot with industry-leading equipment to ensure your content meets international standards of quality.
              </p>
            </ScrollReveal>
            
            <StaggerContainer className="sp-equipment-grid" threshold={0.05}>
              {service.equipment.map((eq, i) => (
                <StaggerItem key={i}>
                  <TiltCard className="sp-equipment-card" maxRotation={6}>
                    <div className="sp-equipment-icon">
                      {iconMap[eq.icon] || <Camera size={24} />}
                    </div>
                    <h4 className="sp-equipment-name">{eq.name}</h4>
                    <p className="sp-equipment-desc">{eq.desc}</p>
                  </TiltCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* ─── PROCESS ─── */}
      <section className="sp-process">
        <div className="sp-container">
          <ScrollReveal 
            className="sp-process-header"
            variant="slideUp"
          >
            <p className="section-tag">How It Works</p>
            <h2 className="section-title">Our <span>Process</span></h2>
          </ScrollReveal>
          
          <StaggerContainer className="sp-process-steps" threshold={0.05}>
            {service.process.map((step, i) => (
              <StaggerItem className="sp-step" key={step.title} style={{ position: 'relative' }}>
                <div className="sp-step-num">{String(i + 1).padStart(2, '0')}</div>
                <div className="sp-step-icon">
                  <img src={step.icon} alt={step.title} className="sp-step-img-icon" />
                </div>
                <h4 className="sp-step-title">{step.title}</h4>
                <p className="sp-step-desc">{step.desc}</p>
                {i < service.process.length - 1 && <div className="sp-step-arrow">→</div>}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── GALLERY PREVIEW ─── */}
      {service.galleryImages && service.galleryImages.length > 0 && (
        <section className="sp-gallery-preview">
          <div className="sp-container">
            <ScrollReveal className="sp-gallery-header" variant="slideUp">
              <p className="section-tag">Showcase</p>
              <h2 className="section-title">Selected <span>Works</span></h2>
            </ScrollReveal>
            <div className="sp-gallery-grid">
              {service.galleryImages.map((imgUrl, i) => (
                <div key={i} className={`sp-gallery-item ${i === 0 ? 'sp-gallery-featured' : ''}`}>
                  <img src={imgUrl} alt={`${service.category} capture`} className="sp-gallery-img" />
                  <div className="sp-gallery-overlay">
                    <span className="sp-gallery-label">{service.category} #{i + 1}</span>
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
          <ScrollReveal 
            className="sp-packages-header"
            variant="slideUp"
          >
            <p className="section-tag">Pricing</p>
            <h2 className="section-title">Choose Your <span>Package</span></h2>
            <p className="section-desc" style={{ textAlign: 'center', margin: '1rem auto 0' }}>
              Transparent pricing with no hidden costs. Every package is fully customizable to your needs.
            </p>
          </ScrollReveal>
          
          <StaggerContainer className="sp-packages-grid" threshold={0.05}>
            {service.packages.map((pkg) => (
              <StaggerItem key={pkg.name}>
                <TiltCard 
                  className={`sp-package-card ${pkg.featured ? 'featured' : ''}`}
                  maxRotation={5}
                  whileHover={{ y: -10, boxShadow: pkg.featured ? 'var(--shadow-gold-lg)' : '0 20px 40px rgba(0,0,0,0.4)' }}
                  style={{ height: '100%' }}
                >

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
                  <Link to="/#contact" className={`${pkg.featured ? 'btn-primary' : 'btn-outline'} sp-pkg-btn hover-target`}>
                    <span>Book Now</span>
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

    </div>
  );
};

export default ServicePageTemplate;

