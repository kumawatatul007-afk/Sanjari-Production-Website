import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      if (!isHome) return;
      const sections = ['home', 'about', 'services', 'gallery', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const navLinks = [
    { label: 'Home',     href: '#home' },
    { label: 'About',    href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery',  href: '#gallery' },
    { label: 'Contact',  href: '#contact' },
  ];

  const scrollTo = (href) => {
    setMenuOpen(false);
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-img-wrap">
            <img src="/images/sanjari_logo.jpg" alt="Sanjari Production Logo" className="logo-img" />
          </div>
        </Link>



        {/* Desktop Links */}
        <ul className="navbar-links">
          {navLinks.map(link => (
            <li key={link.label}>
              <a
                href={link.href}
                className={activeSection === link.href.slice(1) ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="navbar-cta"
          onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
        >
          <span>Book Now</span>
        </a>

        {/* Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="hamburger-btn"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map(link => (
            <li key={link.label}>
              <a href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="mobile-cta" onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}>
              Book Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
