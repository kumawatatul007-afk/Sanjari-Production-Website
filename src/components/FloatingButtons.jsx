import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';
import './FloatingButtons.css';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show "Scroll to Top" button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openWhatsApp = () => {
    // Replace with your client's actual WhatsApp number
    const phoneNumber = '+919876543210'; 
    const message = 'Hello Sanjari Production! I would like to book a shoot.';
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="floating-buttons-container">
      {/* WhatsApp Button (Left Side) */}
      <motion.button
        className="float-btn whatsapp-btn hover-target"
        onClick={openWhatsApp}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </motion.button>

      {/* Scroll To Top Button (Right Side) */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            className="float-btn scroll-top-btn hover-target"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Scroll to Top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingButtons;
