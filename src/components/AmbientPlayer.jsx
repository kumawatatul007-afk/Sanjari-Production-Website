import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import './AmbientPlayer.css';

const AmbientPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Auto-hide tooltip after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio playback user permission block:", err));
      setShowTooltip(false);
    }
  };

  return (
    <div className="ambient-player-wrap">
      {/* Tooltip */}
      {showTooltip && (
        <div className="ambient-tooltip">
          <span>🔊 Cinematic Soundscape</span>
          <div className="tooltip-arrow" />
        </div>
      )}

      {/* Audio Node */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
        loop
        preload="auto"
      />

      {/* Toggle Button */}
      <button 
        className={`ambient-btn ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlayback}
        aria-label="Toggle ambient music"
      >
        <div className="visualizer-bars">
          <span className="v-bar bar-1"></span>
          <span className="v-bar bar-2"></span>
          <span className="v-bar bar-3"></span>
          <span className="v-bar bar-4"></span>
          <span className="v-bar bar-5"></span>
        </div>
        <div className="ambient-icon-wrap">
          {isPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </div>
      </button>
    </div>
  );
};

export default AmbientPlayer;
