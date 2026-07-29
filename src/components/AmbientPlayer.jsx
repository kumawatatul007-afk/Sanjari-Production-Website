import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';
import './AmbientPlayer.css';

const PLAYLIST = [
  { id: 1, name: "Kesariya - Arijit Singh", url: "https://raw.githubusercontent.com/m-developer-22/Music/main/Kesariya.mp3" },
  { id: 2, name: "Raabta - Arijit Singh", url: "https://raw.githubusercontent.com/m-developer-22/Music/main/Raabta.mp3" },
  { id: 3, name: "Ranjha - Jasleen Royal & B Praak", url: "https://raw.githubusercontent.com/m-developer-22/Music/main/Ranjha.mp3" },
  { id: 4, name: "Tera Fitoor - Arijit Singh", url: "https://raw.githubusercontent.com/m-developer-22/Music/main/Tera%20Fitoor.mp3" },
  { id: 5, name: "Nikamma - Dev Negi & Payal Dev", url: "https://raw.githubusercontent.com/m-developer-22/Music/main/Nikamma.mp3" },
  { id: 6, name: "Tum Hi Aana - Jubin Nautiyal", url: "https://raw.githubusercontent.com/pushkarlaulkar/Music/main/tum_hi_aana_marjaavaan_riteish_dsidharth_mtara_s_jubin_nautiyal_payal_dkunaal.mp3" },
  { id: 7, name: "Saibo - Shreya Ghoshal & Tochi Raina", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/564%20Saibo.mp3" },
  { id: 8, name: "Teri Meri - Rahat Fateh Ali Khan & Shreya Ghoshal", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/571%20Teri%20Meri.mp3" },
  { id: 9, name: "Ooh La La - Bappi Lahiri & Shreya Ghoshal", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/555%20Ooh%20La%20La.mp3" },
  { id: 10, name: "Achha Lagta Hai - Shreya Ghoshal & Mohit Chauhan", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/530%20Achha%20Lagta%20Hai.mp3" },
  { id: 11, name: "Lagan Lagi - Shreya Ghoshal", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/545%20Lagan%20Lagi.mp3" },
  { id: 12, name: "Main Chali - Shreya Ghoshal", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/546%20Main%20Chali.mp3" },
  { id: 13, name: "Deewanagi - Shreya Ghoshal", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/536%20Deewanagi.mp3" },
  { id: 14, name: "Dil Ne Mere - Shreya Ghoshal", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/538%20Dil%20Ne%20Mere%20Dil%20Ne.mp3" },
  { id: 15, name: "Rab Rakha - Shreya Ghoshal", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/557%20Rab%20Rakha.mp3" },
  { id: 16, name: "Saajana - Shreya Ghoshal", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/558%20Saajana.mp3" },
  { id: 17, name: "Sau Baar - Shreya Ghoshal", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/566%20Sau%20Baar.mp3" },
  { id: 18, name: "Tu Hi Tu - Shreya Ghoshal", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/573%20Tu%20Hi%20Tu.mp3" },
  { id: 19, name: "Zara Sa Ansuna - Shreya Ghoshal", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/581%20Zara%20Sa%20Ansuna.mp3" },
  { id: 20, name: "Haan Yahi Pyaar Hai - Shreya Ghoshal", url: "https://archive.org/download/ShreyaGhoshal2011CompleteHindiSongsCollection/541%20Haan%20Yahi%20Pyaar%20Hai.mp3" }
];

const AmbientPlayer = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-hide initial tooltip after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Listen for Cinema Theater video modal events to pause/resume background audio
  useEffect(() => {
    let playedBefore = false;

    const handleModalOpen = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
        playedBefore = true;
      }
    };

    const handleModalClose = () => {
      if (playedBefore && audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log("Ambient resume error:", err));
        playedBefore = false;
      }
    };

    window.addEventListener('cinema-modal-open', handleModalOpen);
    window.addEventListener('cinema-modal-close', handleModalClose);

    return () => {
      window.removeEventListener('cinema-modal-open', handleModalOpen);
      window.removeEventListener('cinema-modal-close', handleModalClose);
    };
  }, []);

  // When track changes, load and play if it was already playing
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play()
        .catch(err => console.log("Audio play error on skip:", err));
    }
  }, [currentTrackIndex]);

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

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
    setShowTooltip(false);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + PLAYLIST.length) % PLAYLIST.length);
    setShowTooltip(false);
  };

  const activeTrack = PLAYLIST[currentTrackIndex];

  return (
    <div 
      className={`ambient-player-wrap ${isHovered ? 'expanded' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      {(showTooltip || isHovered) && (
        <div className="ambient-tooltip">
          <span className="tooltip-tag">🎵 Now Playing</span>
          <span className="track-title">{activeTrack.name}</span>
          <div className="tooltip-arrow" />
        </div>
      )}

      {/* Audio Node */}
      <audio
        ref={audioRef}
        src={activeTrack.url}
        preload="auto"
        onEnded={() => handleNext(null)}
      />

      {/* Control Pill Wrapper */}
      <div className="ambient-control-pill">
        {isHovered && (
          <button 
            className="control-sub-btn prev-btn hover-target" 
            onClick={handlePrev}
            aria-label="Previous track"
          >
            <SkipBack size={13} />
          </button>
        )}

        <button 
          className={`ambient-btn ${isPlaying ? 'playing' : ''} hover-target`}
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

        {isHovered && (
          <button 
            className="control-sub-btn next-btn hover-target" 
            onClick={handleNext}
            aria-label="Next track"
          >
            <SkipForward size={13} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AmbientPlayer;
