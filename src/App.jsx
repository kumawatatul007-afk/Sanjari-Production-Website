import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import FloatingButtons from './components/FloatingButtons';

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
  <main>
    <Hero />
    <About />
    <Services />
    <Gallery />
    <Contact />
  </main>
);

const PageWrapper = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--dark)' }}>
      {children}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <CustomCursor />
      <Preloader />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/services/wedding" element={<WeddingPage />} />
        <Route path="/services/videography" element={<VideographyPage />} />
        <Route path="/services/portrait" element={<PortraitPage />} />
        <Route path="/services/corporate" element={<CorporatePage />} />
        <Route path="/services/fashion" element={<FashionPage />} />
        <Route path="/services/aerial" element={<AerialPage />} />
      </Routes>
      <FloatingButtons />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
