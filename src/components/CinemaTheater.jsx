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
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
    poster: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Deep Ocean Drone Reel",
    category: "Landscape Cinematic",
    duration: "02:10",
    aspect: "16:9 Cinema",
    desc: "Aerial footage tracking shoreline breakers and deep sea currents, utilizing custom LUTs for rich ocean teal saturation.",
    videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Solitude in the Meadows",
    category: "Portrait Cinematic",
    duration: "01:55",
    aspect: "4:3 Classic",
    desc: "A stylized portrait film exploring lighting, shadows, and natural wind movements in open fields.",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    poster: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800"
  }
];

const CinemaTheater = () => {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  useEffect(() => {
    if (playingVideoId) {
      window.dispatchEvent(new CustomEvent('cinema-modal-open'));
    } else {
      window.dispatchEvent(new CustomEvent('cinema-modal-close'));
    }
    return () => {
      window.dispatchEvent(new CustomEvent('cinema-modal-close'));
    };
  }, [playingVideoId]);

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
                onClick={() => {
                  if (playingVideoId !== film.id) {
                    setPlayingVideoId(film.id);
                  }
                }}
              >
                {/* Poster Image or Inline Video */}
                <div className="film-poster-container">
                  {playingVideoId === film.id ? (
                    <>
                      <video
                        src={film.videoUrl}
                        autoPlay
                        controls
                        playsInline
                        className="film-poster"
                        style={{ objectFit: 'cover', zIndex: 10 }}
                        onClick={(e) => e.stopPropagation()}
                        onEnded={() => setPlayingVideoId(null)}
                      />
                      <button
                        className="inline-video-close-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlayingVideoId(null);
                        }}
                        title="Stop Video"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
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


    </section>
  );
};

export default CinemaTheater;
