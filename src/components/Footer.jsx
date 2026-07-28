import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import './Footer.css';

const serviceLinks = [
  { label: 'Wedding Photography',  to: '/services/wedding' },
  { label: 'Cinematic Videography', to: '/services/videography' },
  { label: 'Portrait Sessions',    to: '/services/portrait' },
  { label: 'Corporate Events',     to: '/services/corporate' },
  { label: 'Fashion Editorial',    to: '/services/fashion' },
  { label: 'Aerial Drone',         to: '/services/aerial' },
];

const Footer = () => {
  return (

    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          {/* Brand */}
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="footer-logo">
              <Link to="/" className="hover-target">
                <img
                  src="/images/sanjari_logo.jpg"
                  alt="Sanjari Production Logo"
                  className="footer-logo-img"
                />
              </Link>
            </div>

            <p className="footer-tagline">
              Capturing the essence of life's most precious moments through the art
              of photography and cinematic storytelling.
            </p>
            <div className="footer-social">
              {['Instagram', 'Facebook', 'YouTube', 'LinkedIn'].map(s => (
                <a key={s} href="#" className="footer-social-link hover-target" id={`footer-${s.toLowerCase()}`}>
                  {s[0]}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="footer-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              {['home', 'about', 'services', 'gallery', 'contact'].map(id => (
                <li key={id}>
                  <Link 
                    to={id === 'home' ? '/' : `/${id}`} 
                    className="footer-service-link hover-target"
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            className="footer-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links">
              {serviceLinks.map(s => (
                <li key={s.label}>
                  <Link to={s.to} className="footer-service-link hover-target">{s.label}</Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div 
            className="footer-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact">
              <p><MapPin size={14} className="gold-text" style={{marginRight:'8px', display:'inline-block', verticalAlign:'middle'}}/> Jaipur, Rajasthan, India</p>
              <p><Mail size={14} className="gold-text" style={{marginRight:'8px', display:'inline-block', verticalAlign:'middle'}}/> sanjariproduction@gmail.com</p>
              <p><Phone size={14} className="gold-text" style={{marginRight:'8px', display:'inline-block', verticalAlign:'middle'}}/> +91 98765 43210</p>
              <p><Clock size={14} className="gold-text" style={{marginRight:'8px', display:'inline-block', verticalAlign:'middle'}}/> Mon–Sat: 9 AM – 7 PM</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <div className="footer-container footer-bottom-inner">
          <p>© {new Date().getFullYear()} Sanjari Production. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span className="footer-dot" />
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
