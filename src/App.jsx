import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/wedding" element={<WeddingPage />} />
        <Route path="/services/videography" element={<VideographyPage />} />
        <Route path="/services/portrait" element={<PortraitPage />} />
        <Route path="/services/corporate" element={<CorporatePage />} />
        <Route path="/services/fashion" element={<FashionPage />} />
        <Route path="/services/aerial" element={<AerialPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
