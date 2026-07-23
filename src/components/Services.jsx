import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { Heart, Video, User, Briefcase, Sparkles, Aperture, ArrowRight } from 'lucide-react';
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
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="service-card-wrapper"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div 
        className="service-card" 
        id={`service-${service.id}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
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
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      {/* Decorative BG */}
      <div className="services-bg">
        <div className="services-bg-orb" />
      </div>

      <div className="services-container">
        <motion.div 
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <p className="section-tag">What We Do</p>
          <h2 className="section-title">
            Our Premium <span>Services</span>
          </h2>
          <p className="section-desc" style={{ margin: '1rem auto 0', textAlign: 'center', maxWidth: '600px' }}>
            We offer a full spectrum of visual storytelling services, each crafted with precision,
            creativity, and an unwavering commitment to excellence.
          </p>
        </motion.div>

        <div className="services-grid">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
