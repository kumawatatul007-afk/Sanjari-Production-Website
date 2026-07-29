import React, { useState, useEffect } from 'react';
import { Play, X, Film, Sparkles, Tv } from 'lucide-react';
import { ScrollReveal, SplitText } from './ScrollReveal';
import './CinemaTheater.css';

const filmsList = [
  {
    id: 1,
    title: "The Golden Hour Vows",
    category: "Wedding Cinematic",
    duration: "03:45",
    aspect: "2.39:1 Anamorphic",
    desc: "A breathtaking wedding film captured in the soft light of sunset, color-graded to emphasize romantic golden tones.",
    videoUrl: "/videos/wedding.mp4",
    poster: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Deep Ocean Drone Reel",
    category: "Landscape Cinematic",
    duration: "02:10",
    aspect: "16:9 Cinema",
    desc: "Aerial footage tracking shoreline breakers and deep sea currents, utilizing custom LUTs for rich ocean teal saturation.",
    videoUrl: "/videos/ocean.mp4",
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Solitude in the Meadows",
    category: "Portrait Cinematic",
    duration: "01:55",
    aspect: "4:3 Classic",
    desc: "A stylized portrait film exploring lighting, shadows, and natural wind movements in open fields.",
    videoUrl: "/videos/meadows.mp4",
    poster: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800"
  }
];

const CinemaTheater = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('cinema-modal-open'));
    } else {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('cinema-modal-close'));
    }
    return () => {
      document.body.style.overflow = '';
      window.dispatchEvent(new CustomEvent('cinema-modal-close'));
    };
  }, [activeVideo]);

  return (
    <section id="cinema" className="cinema-section">
      <div className="cinema-container">
        {/* Title */}
        <div className="cinema-header">
          <ScrollReveal variant="fadeIn" delay={0.1}>
            <p className="section-tag">Cinematography</p>
          </ScrollReveal>
          <h2 className="section-title">
            <SplitText text="Sanjari" /> <span><SplitText text="Cinema" /></span> <SplitText text="Theater" />
          </h2>
          <ScrollReveal variant="slideUp" delay={0.3}>
            <p className="section-desc" style={{ margin: '1rem auto 0', textAlign: 'center' }}>
              Experience our high-definition videography and post-production color-grading.
            </p>
          </ScrollReveal>
        </div>

        {/* Film Cards Grid */}
        <div className="cinema-grid">
          {filmsList.map((film, index) => (
            <ScrollReveal 
              key={film.id} 
              variant="slideUp" 
              delay={0.15 * index}
              className="film-card-wrap"
            >
              <div 
                className="film-card"
                onClick={() => setActiveVideo(film)}
              >
                {/* Poster Image */}
                <div className="film-poster-container">
                  <img 
                    src={film.poster} 
                    alt={film.title} 
                    className="film-poster"
                  />
                  <div className="film-poster-overlay" />
                  
                  {/* Decorative Film Grain inside Card */}
                  <div className="film-card-grain" />

                  {/* Play Button Indicator */}
                  <div className="film-play-trigger">
                    <div className="play-trigger-circle">
                      <Play size={20} fill="var(--dark)" stroke="none" />
                    </div>
                  </div>
                </div>

                {/* Metadata & Description */}
                <div className="film-card-content">
                  <div className="film-meta">
                    <span className="film-cat">{film.category}</span>
                    <span className="film-duration">{film.duration}</span>
                  </div>
                  <h3 className="film-card-title">{film.title}</h3>
                  <p className="film-card-desc">{film.desc}</p>
                  
                  <div className="film-card-footer">
                    <span className="film-aspect">
                      <Film size={12} className="gold-text" />
                      {film.aspect}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Cinematic Modal Player Overlay */}
      {activeVideo && (
        <div className="cinema-modal-overlay" onClick={() => setActiveVideo(null)}>
          {/* Ambient blur lighting */}
          <div className="cinema-ambient-light" style={{ backgroundImage: `url(${activeVideo.poster})` }} />
          
          <div className="cinema-modal-inner" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className="cinema-modal-close" 
              onClick={() => setActiveVideo(null)}
              aria-label="Close theater"
            >
              <X size={20} />
            </button>

            <div className="cinema-modal-grid">
              {/* Left Column: Video Player */}
              <div className="cinema-modal-video-wrap">
                <div className="cinema-video-frame">
                  <div className="cinema-lights-dim" />
                  <video 
                    src={activeVideo.videoUrl} 
                    autoPlay
                    playsInline
                    controls 
                    loop 
                    className="cinema-real-video"
                  />
                  <div className="cinema-scan-lines" />
                </div>
              </div>

              {/* Right Column: Video Details & Inquire */}
              <div className="cinema-modal-details-wrap">
                <span className="modal-film-cat">{activeVideo.category}</span>
                <h4 className="modal-film-title">{activeVideo.title}</h4>
                
                <div className="modal-film-meta-grid">
                  <div className="modal-meta-item">
                    <span className="meta-label">Duration</span>
                    <span className="meta-val">{activeVideo.duration}</span>
                  </div>
                  <div className="modal-meta-item">
                    <span className="meta-label">Aspect Ratio</span>
                    <span className="meta-val">{activeVideo.aspect}</span>
                  </div>
                  <div className="modal-meta-item">
                    <span className="meta-label">Resolution</span>
                    <span className="meta-val">4K UHD</span>
                  </div>
                  <div className="modal-meta-item">
                    <span className="meta-label">Frame Rate</span>
                    <span className="meta-val">24 fps</span>
                  </div>
                </div>

                <div className="modal-film-desc-wrap">
                  <h5 className="modal-sub-title">Overview</h5>
                  <p className="modal-film-desc">{activeVideo.desc}</p>
                </div>

                <div className="modal-film-specs">
                  <h5 className="modal-sub-title">Production Gear</h5>
                  <ul className="modal-specs-list">
                    <li>
                      <span className="spec-label">Camera:</span>
                      <span className="spec-val">Sony FX6 / Venice II Master</span>
                    </li>
                    <li>
                      <span className="spec-label">Optics:</span>
                      <span className="spec-val">G-Master Cine Prime Lenses</span>
                    </li>
                    <li>
                      <span className="spec-label">Grading:</span>
                      <span className="spec-val">DaVinci Resolve Studio (HDR)</span>
                    </li>
                  </ul>
                </div>

                <div className="modal-film-features">
                  <span className="feature-badge"><Sparkles size={11} /> Color Graded</span>
                  <span className="feature-badge">Dolby Atmos</span>
                  <span className="feature-badge">Agile Gimbal</span>
                </div>

                <div className="modal-action-wrap">
                  <a 
                    href="#contact" 
                    className="modal-cta-btn hover-target"
                    onClick={() => setActiveVideo(null)}
                  >
                    <span>Book This Cinema Style</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CinemaTheater;
