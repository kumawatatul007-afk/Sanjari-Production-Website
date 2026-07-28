import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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

// Service Pages
import WeddingPage from './pages/WeddingPage';
import VideographyPage from './pages/VideographyPage';
import PortraitPage from './pages/PortraitPage';
import CorporatePage from './pages/CorporatePage';
import FashionPage from './pages/FashionPage';
import AerialPage from './pages/AerialPage';

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
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Preloader />
      <Navbar />
      <AnimatedRoutes />
      <FloatingButtons />
      <AmbientPlayer />
      <Footer />
    </BrowserRouter>
  );
}

export default App;


