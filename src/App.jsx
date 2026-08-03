import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import CinemaTheater from './components/CinemaTheater';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import FloatingButtons from './components/FloatingButtons';
import AmbientPlayer from './components/AmbientPlayer';
import CircularIntro from './components/CircularIntro';
import ThemeCustomizer from './components/ThemeCustomizer';

// Service Pages
import WeddingPage from './pages/WeddingPage';
import VideographyPage from './pages/VideographyPage';
import PortraitPage from './pages/PortraitPage';
import CorporatePage from './pages/CorporatePage';
import FashionPage from './pages/FashionPage';
import AerialPage from './pages/AerialPage';

// Admin Suite Pages & Storage
import { initStorage } from './utils/storage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminOverview from './pages/admin/AdminOverview';
import AdminBookings from './pages/admin/AdminBookings';
import AdminGallery from './pages/admin/AdminGallery';
import AdminServices from './pages/admin/AdminServices';

import './App.css';

// Home page — all sections together
const HomePage = () => (
  <motion.main
    initial={{ opacity: 0, filter: 'blur(8px)' }}
    animate={{ opacity: 1, filter: 'blur(0px)' }}
    exit={{ opacity: 0, filter: 'blur(8px)' }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
  >
    <Hero />
    <About />
    <Services />
    <CinemaTheater />
    <Gallery />
    <Contact />
  </motion.main>
);

const PageWrapper = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--dark)' }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    const savedTarget = localStorage.getItem('sanjari-scroll-target');
    const hash = window.location.hash;
    const target = savedTarget || hash;

    if (target && location.pathname === '/') {
      localStorage.removeItem('sanjari-scroll-target');
      
      const timer = setTimeout(() => {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Main Website Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/services/wedding" element={<PageWrapper><WeddingPage /></PageWrapper>} />
        <Route path="/services/videography" element={<PageWrapper><VideographyPage /></PageWrapper>} />
        <Route path="/services/portrait" element={<PageWrapper><PortraitPage /></PageWrapper>} />
        <Route path="/services/corporate" element={<PageWrapper><CorporatePage /></PageWrapper>} />
        <Route path="/services/fashion" element={<PageWrapper><FashionPage /></PageWrapper>} />
        <Route path="/services/aerial" element={<PageWrapper><AerialPage /></PageWrapper>} />

        {/* Administrative Backend Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout><AdminOverview /></AdminLayout>} />
        <Route path="/admin/bookings" element={<AdminLayout><AdminBookings /></AdminLayout>} />
        <Route path="/admin/gallery" element={<AdminLayout><AdminGallery /></AdminLayout>} />
        <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
      </Routes>
    </AnimatePresence>
  );
};

const AppContent = ({ showIntro, handleIntroComplete }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) {
      document.body.classList.add('admin-mode');
    } else {
      document.body.classList.remove('admin-mode');
    }
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, [isAdmin]);

  return (
    <>
      {!isAdmin && <CustomCursor />}
      <Preloader />
      {showIntro && !isAdmin && <CircularIntro onComplete={handleIntroComplete} />}
      {!isAdmin && <Navbar />}
      <AnimatedRoutes />
      {!isAdmin && <FloatingButtons />}
      <ThemeCustomizer />
      {!isAdmin && <AmbientPlayer />}
      {!isAdmin && <Footer />}
    </>
  );
};

function App() {
  const [showIntro, setShowIntro] = useState(() => {
    // Check if intro has run in this session
    return !sessionStorage.getItem('sanjari-intro-seen');
  });

  useEffect(() => {
    // Initialize LocalStorage Database Schemas
    initStorage();

    // Load active theme and font globally on mount
    const savedTheme = localStorage.getItem('sanjari-theme') || 'gold';
    const savedFont = localStorage.getItem('sanjari-font') || 'cinzel';
    
    const body = document.body;
    body.classList.remove('theme-gold', 'theme-teal', 'theme-purple', 'theme-bronze', 'theme-crimson');
    if (savedTheme !== 'gold') {
      body.classList.add(`theme-${savedTheme}`);
    }

    body.classList.remove('font-cinzel', 'font-playfair', 'font-syne');
    body.classList.add(`font-${savedFont}`);

    const triggerIntro = () => {
      setShowIntro(true);
    };
    window.addEventListener('sanjari-trigger-intro', triggerIntro);
    return () => window.removeEventListener('sanjari-trigger-intro', triggerIntro);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('sanjari-intro-seen', 'true');
  };

  return (
    <BrowserRouter>
      <AppContent showIntro={showIntro} handleIntroComplete={handleIntroComplete} />
    </BrowserRouter>
  );
}

export default App;
