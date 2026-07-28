import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Video, User, Briefcase, Sparkles, Aperture, ArrowRight } from 'lucide-react';
import { ScrollReveal, SplitText, TiltCard, StaggerContainer, StaggerItem } from './ScrollReveal';
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
    icon: <Heart size={32} className="gold-text" />,
    title: 'Wedding Photography',
    desc: 'Capturing the magic of your special day with cinematic elegance. Every emotion, every glance — immortalized forever.',
    features: ['Pre-Wedding Shoot', 'Ceremony Coverage', 'Reception Highlights', 'Album Design'],
  },
  {
    id: 'videography',
    icon: <Video size={32} className="gold-text" />,
    title: 'Cinematic Videography',
    desc: 'Transform your events into stunning cinematic films. Professional editing, color grading, and soundtrack included.',
    features: ['4K Film Production', 'Drone Aerial Shots', 'Color Grading', 'Cinematic Edit'],
  },
  {
    id: 'portrait',
    icon: <User size={32} className="gold-text" />,
    title: 'Portrait Sessions',
    desc: 'Professional portrait photography that brings out your authentic self. Perfect for professionals, models, and families.',
    features: ['Studio Lighting', 'Outdoor Sessions', 'Professional Retouching', 'Same-Day Previews'],
  },
  {
    id: 'corporate',
    icon: <Briefcase size={32} className="gold-text" />,
    title: 'Corporate Events',
    desc: 'Elevate your brand with professional corporate photography and videography that tells your company story.',
    features: ['Product Photography', 'Event Coverage', 'Brand Videos', 'Executive Portraits'],
  },
  {
    id: 'fashion',
    icon: <Sparkles size={32} className="gold-text" />,
    title: 'Fashion & Editorial',
    desc: 'High-fashion photography that makes a statement. Creative direction, styling guidance, and magazine-worthy results.',
    features: ['Lookbook Production', 'Magazine Editorials', 'E-Commerce Shoots', 'Creative Direction'],
  },
  {
    id: 'aerial',
    icon: <Aperture size={32} className="gold-text" />,
    title: 'Aerial Drone Shots',
    desc: 'Breathtaking aerial perspectives that add a cinematic grandeur to your events, real estate, and promotional content.',
    features: ['4K Drone Footage', 'Real Estate Aerials', 'Event Overviews', 'Landscape Photography'],
  },
];

const ServiceCard = ({ service, index }) => {
  return (
    <StaggerItem className="service-card-wrapper" style={{ height: '100%' }}>
      <TiltCard 
        className="service-card" 
        id={`service-${service.id}`}
        maxRotation={8}
        whileHover={{ y: -6, boxShadow: '0 15px 35px rgba(0, 0, 0, 0.4)' }}
        style={{ height: '100%' }}
      >
        <div className="service-card-inner">
          <div className="service-number">0{index + 1}</div>
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
            className="service-explore-btn hover-target"
            id={`explore-${service.id}`}
          >
            <span>Explore Service</span>
            <ArrowRight size={16} />
          </Link>
          <div className="service-hover-line" />
        </div>
      </TiltCard>
    </StaggerItem>
  );
};

const Services = () => {
  return (
    <section id="services" className="services-section">
      {/* Decorative BG */}
      <div className="services-bg">
        <div className="services-bg-orb" />
      </div>

      <div className="services-container">
        <div className="services-header">
          <ScrollReveal variant="fadeIn" delay={0.1}>
            <p className="section-tag">What We Do</p>
          </ScrollReveal>
          <h2 className="section-title">
            <SplitText text="Our Premium" /> <span><SplitText text="Services" /></span>
          </h2>
          <ScrollReveal variant="slideUp" delay={0.3}>
            <p className="section-desc" style={{ margin: '1rem auto 0', textAlign: 'center', maxWidth: '600px' }}>
              We offer a full spectrum of visual storytelling services, each crafted with precision,
              creativity, and an unwavering commitment to excellence.
            </p>
          </ScrollReveal>
        </div>

        <StaggerContainer className="services-grid" threshold={0.05}>
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Services;

