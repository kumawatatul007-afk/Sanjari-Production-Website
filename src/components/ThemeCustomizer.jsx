import React, { useState, useEffect } from 'react';
import { Settings, X, RefreshCw, Palette, Type, MousePointer, Sparkles } from 'lucide-react';
import './ThemeCustomizer.css';

const THEMES = [
  { id: 'gold', name: 'Midnight Gold', color: '#d4af37' },
  { id: 'teal', name: 'Aurora Teal', color: '#00f2fe' },
  { id: 'purple', name: 'Royal Amethyst', color: '#b388ff' },
  { id: 'bronze', name: 'Rose Bronze', color: '#e0a96d' },
  { id: 'crimson', name: 'Crimson Velvet', color: '#ff4757' }
];

const FONTS = [
  { id: 'cinzel', name: 'Serif Cinzel' },
  { id: 'playfair', name: 'Classic Playfair' },
  { id: 'syne', name: 'Modern Syne' }
];

const ThemeCustomizer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('gold');
  const [activeFont, setActiveFont] = useState('cinzel');
  const [trailEnabled, setTrailEnabled] = useState(true);

  // Load configuration on mount
  useEffect(() => {
    // 1. Theme
    const savedTheme = localStorage.getItem('sanjari-theme') || 'gold';
    applyTheme(savedTheme);

    // 2. Font
    const savedFont = localStorage.getItem('sanjari-font') || 'cinzel';
    applyFont(savedFont);

    // 3. Cursor Trail
    const savedTrail = localStorage.getItem('sanjari-cursor-trail') !== 'false';
    setTrailEnabled(savedTrail);
    // Notify custom cursor immediately
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('sanjari-config-changed', {
        detail: { cursorTrail: savedTrail }
      }));
    }, 500);
  }, []);

  const applyTheme = (themeId) => {
    const body = document.body;
    body.classList.remove('theme-gold', 'theme-teal', 'theme-purple', 'theme-bronze', 'theme-crimson');
    if (themeId !== 'gold') {
      body.classList.add(`theme-${themeId}`);
    }
    setActiveTheme(themeId);
    localStorage.setItem('sanjari-theme', themeId);
  };

  const applyFont = (fontId) => {
    const body = document.body;
    body.classList.remove('font-cinzel', 'font-playfair', 'font-syne');
    body.classList.add(`font-${fontId}`);
    setActiveFont(fontId);
    localStorage.setItem('sanjari-font', fontId);
  };

  const handleTrailToggle = () => {
    const nextVal = !trailEnabled;
    setTrailEnabled(nextVal);
    localStorage.setItem('sanjari-cursor-trail', nextVal ? 'true' : 'false');
    
    // Dispatch event to CustomCursor
    window.dispatchEvent(new CustomEvent('sanjari-config-changed', {
      detail: { cursorTrail: nextVal }
    }));
  };

  const handleReplayIntro = () => {
    setIsOpen(false);
    // Dispatch event to App component to replay intro
    window.dispatchEvent(new CustomEvent('sanjari-trigger-intro'));
  };

  return (
    <>
      {/* Floating Settings Button */}
      <button 
        className={`customizer-toggle hover-target ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Customize theme"
      >
        <Settings size={20} className="cog-icon" />
      </button>

      {/* Side Customizer Drawer */}
      <div className={`customizer-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="header-title">
            <Palette size={18} className="gold-text" />
            <h3>THEME ENGINE</h3>
          </div>
          <button className="drawer-close hover-target" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Theme Colors */}
          <div className="customizer-section">
            <div className="section-label">
              <Sparkles size={14} className="gold-text" />
              <span>Select Color Theme</span>
            </div>
            <div className="theme-options">
              {THEMES.map(theme => (
                <button
                  key={theme.id}
                  className={`theme-btn hover-target ${activeTheme === theme.id ? 'active' : ''}`}
                  onClick={() => applyTheme(theme.id)}
                  style={{ '--theme-color': theme.color }}
                  title={theme.name}
                >
                  <span className="color-dot" />
                  <span className="theme-name">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="customizer-section">
            <div className="section-label">
              <Type size={14} className="gold-text" />
              <span>Header Typography</span>
            </div>
            <div className="font-options">
              {FONTS.map(font => (
                <button
                  key={font.id}
                  className={`font-btn hover-target ${activeFont === font.id ? 'active' : ''}`}
                  onClick={() => applyFont(font.id)}
                >
                  {font.name}
                </button>
              ))}
            </div>
          </div>

          {/* Cursor FX */}
          <div className="customizer-section">
            <div className="section-label">
              <MousePointer size={14} className="gold-text" />
              <span>VFX Cursor Effects</span>
            </div>
            <div className="fx-option">
              <div className="fx-info">
                <span className="fx-title">Cursor Particle Trails</span>
                <span className="fx-desc">Magical sparkle trail in theme colors</span>
              </div>
              <button 
                className={`switch-btn hover-target ${trailEnabled ? 'active' : ''}`}
                onClick={handleTrailToggle}
                aria-label="Toggle cursor particle trail"
              >
                <span className="switch-slider" />
              </button>
            </div>
          </div>

          {/* Cinematic Actions */}
          <div className="customizer-section">
            <button 
              className="replay-intro-btn hover-target"
              onClick={handleReplayIntro}
            >
              <RefreshCw size={14} />
              <span>REPLAY COSMIC INTRO</span>
            </button>
          </div>
        </div>

        <div className="drawer-footer">
          <span>Sanjari Production &copy; 2026</span>
        </div>
      </div>

      {/* Backdrop overlay to close drawer */}
      {isOpen && (
        <div className="customizer-backdrop" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default ThemeCustomizer;
