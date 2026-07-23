import React from 'react';
import { Link } from 'react-router-dom';
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
  const scrollTo = (id) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Link to="/">
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
                <a key={s} href="#" className="footer-social-link" id={`footer-${s.toLowerCase()}`}>
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              {['home', 'about', 'services', 'gallery', 'contact'].map(id => (
                <li key={id}>
                  <Link 
                    to={id === 'home' ? '/' : `/${id}`} 
                    className="footer-service-link"
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links">
              {serviceLinks.map(s => (
                <li key={s.label}>
                  <Link to={s.to} className="footer-service-link">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact</h4>
            <div className="footer-contact">
              <p>📍 Jaipur, Rajasthan, India</p>
              <p>📧 sanjariproduction@gmail.com</p>
              <p>📞 +91 98765 43210</p>
              <p>🕐 Mon–Sat: 9 AM – 7 PM</p>
            </div>
          </div>
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
