import React, { useState, useRef } from 'react';
import './BeforeAfterSlider.css';

const BeforeAfterSlider = ({ 
  imageSrc = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200", 
  title = "Color Grading Lens" 
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging && e.buttons !== 1) return; // Only move on click drag
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleStart = (e) => {
    setIsDragging(true);
    handleMove(e.clientX || e.touches[0].clientX);
  };

  return (
    <div className="before-after-wrap">
      <div className="slider-header-info">
        <h4 className="slider-header-title">{title}</h4>
        <span className="slider-header-subtitle">Drag the gold bar to grade the RAW sensor data</span>
      </div>

      <div 
        className="slider-container" 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Graded Image (Background) */}
        <div className="image-panel graded-panel">
          <img 
            src={imageSrc} 
            alt="Color Graded Final" 
            className="slider-img"
            draggable="false"
          />
          <span className="badge-label graded-badge">Graded Final</span>
        </div>

        {/* RAW Image (Clipped Overlay) */}
        <div 
          className="image-panel raw-panel" 
          style={{ width: `${sliderPos}%` }}
        >
          <img 
            src={imageSrc} 
            alt="RAW Camera Flat" 
            className="slider-img raw-filtered"
            draggable="false"
          />
          <span className="badge-label raw-badge">RAW LOG Sensor</span>
        </div>

        {/* Golden Slider Handle Bar */}
        <div 
          className="slider-bar" 
          style={{ left: `${sliderPos}%` }}
        >
          <div className="slider-handle">
            <span className="handle-line"></span>
            <div className="handle-center-ring">
              <span className="handle-dot"></span>
            </div>
            <span className="handle-line"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
