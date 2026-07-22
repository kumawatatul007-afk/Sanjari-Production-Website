import React, { useEffect, useRef, useState } from 'react';
import './Gallery.css';

const categories = ['All', 'Wedding', 'Portrait', 'Cinematic', 'Corporate', 'Fashion'];

// Gallery items with image paths and fallback gradient colors
const galleryItems = [
  { id: 1, cat: 'Wedding',   title: 'Golden Hour Romance',     aspect: 'tall',   img: '/images/gallery_wedding_1.png',   colors: ['#1B3A6B', '#C9A84C'] },
  { id: 2, cat: 'Portrait',  title: 'Ethereal Portraits',      aspect: 'wide',   img: '/images/gallery_portrait_1.png',  colors: ['#0D2744', '#8B9DC3'] },
  { id: 3, cat: 'Cinematic', title: 'Epic Landscape Film',     aspect: 'square', img: '/images/gallery_cinematic_1.png', colors: ['#1a1a2e', '#4A90D9'] },
  { id: 4, cat: 'Fashion',   title: 'Haute Couture Editorial', aspect: 'tall',   img: '/images/gallery_fashion_1.png',   colors: ['#2D1B69', '#C9A84C'] },
  { id: 5, cat: 'Wedding',   title: 'Twilight Ceremony',       aspect: 'wide',   img: '/images/gallery_wedding_2.png',   colors: ['#0D2744', '#F0C040'] },
  { id: 6, cat: 'Corporate', title: 'Brand Identity Shoot',    aspect: 'square', img: '/images/gallery_corporate_1.png', colors: ['#0f1624', '#2A5298'] },
  { id: 7, cat: 'Portrait',  title: 'Dramatic Chiaroscuro',    aspect: 'tall',   img: '/images/gallery_portrait_2.png',  colors: ['#1a0a0a', '#C9A84C'] },
  { id: 8, cat: 'Cinematic', title: 'City Lights Reel',        aspect: 'wide',   img: '/images/gallery_cinematic_2.png', colors: ['#0D1F3C', '#6BA3BE'] },
  { id: 9, cat: 'Fashion',   title: 'Urban Street Style',      aspect: 'square', img: '/images/gallery_fashion_2.png',   colors: ['#1B2838', '#C9A84C'] },
];

const GalleryCard = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`gallery-card aspect-${item.aspect}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      id={`gallery-item-${item.id}`}
    >
      {/* Real photo with gradient fallback */}
      <div
        className="gallery-img"
        style={{
          background: `linear-gradient(135deg, ${item.colors[0]} 0%, ${item.colors[1]}40 50%, ${item.colors[0]} 100%)`,
        }}
      >
        {item.img && (
          <img
            src={item.img}
            alt={item.title}
            className="gallery-real-img"
            loading="lazy"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        )}
        <div className="gallery-noise" />
        <div className="gallery-light" />
      </div>

      {/* Overlay */}
      <div className={`gallery-overlay ${hovered ? 'active' : ''}`}>
        <div className="gallery-info">
          <span className="gallery-cat">{item.cat}</span>
          <h4 className="gallery-title">{item.title}</h4>
        </div>
        <div className="gallery-zoom">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.cat === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.gallery-card').forEach((card, i) => {
              card.style.transitionDelay = `${i * 0.08}s`;
              card.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [filtered]);

  return (
    <section id="gallery" className="gallery-section" ref={sectionRef}>
      <div className="gallery-container">
        {/* Header */}
        <div className="gallery-header">
          <p className="section-tag">Portfolio</p>
          <h2 className="section-title">
            Our <span>Visual</span> Stories
          </h2>
          <p className="section-desc" style={{ margin: '1rem auto 0', textAlign: 'center' }}>
            A curated selection of our finest work across photography and videography.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="gallery-filters" role="tablist">
          {categories.map(cat => (
            <button
              key={cat}
              role="tab"
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              id={`filter-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="gallery-grid">
          {filtered.map(item => (
            <GalleryCard key={item.id} item={item} />
          ))}
        </div>

        {/* Load More */}
        <div className="gallery-more">
          <button className="btn-outline" id="gallery-load-more">
            <span>View Full Portfolio</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
