import React, { useState, useEffect } from 'react';
import './Preloader.css';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Scroll to top immediately to prevent flashing of scrolled content
    window.scrollTo(0, 0);

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Start fade out after 2.5 seconds (gives enough time for the progress bar)
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      document.body.style.overflow = 'auto'; // restore scrolling
    }, 2500);

    // Completely remove from DOM after fade out completes (3.3s)
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3300);

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`preloader-container ${isFadingOut ? 'fade-out' : ''}`}>
      {/* Decorative cinematic background elements */}
      <div className="preloader-bg-grid" />
      <div className="preloader-orb" />

      <div className="preloader-content">
        <div className="preloader-logo-wrap">
          <img src="/images/sanjari_logo.jpg" alt="Sanjari Production" className="preloader-logo" />
        </div>
        
        <div className="preloader-text">
          <span>SANJARI</span>
          <span className="preloader-text-gold">PRODUCTION</span>
        </div>

        <div className="preloader-loader">
          <div className="preloader-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
