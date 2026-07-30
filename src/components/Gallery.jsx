import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ChevronRight } from 'lucide-react';
import { ScrollReveal, SplitText, TiltCard } from './ScrollReveal';
import './Gallery.css';

const categories = ['All', 'Wedding', 'Portrait', 'Cinematic', 'Corporate', 'Fashion'];

// Gallery items with image paths and fallback gradient colors
const galleryItems = [
  { id: 1, cat: 'Wedding', title: 'Golden Hour Romance', aspect: 'tall', img: '/images/gallery_wedding_1.png', colors: ['#1B3A6B', '#C9A84C'] },
  { id: 2, cat: 'Portrait', title: 'Ethereal Portraits', aspect: 'wide', img: '/images/gallery_portrait_1.png', colors: ['#0D2744', '#8B9DC3'] },
  { id: 3, cat: 'Cinematic', title: 'Epic Landscape Film', aspect: 'square', img: '/images/gallery_cinematic_1.png', colors: ['#1a1a2e', '#4A90D9'] },
  { id: 4, cat: 'Fashion', title: 'Haute Couture Editorial', aspect: 'tall', img: '/images/gallery_fashion_1.png', colors: ['#2D1B69', '#C9A84C'] },
  { id: 5, cat: 'Wedding', title: 'Twilight Ceremony', aspect: 'wide', img: '/images/gallery_wedding_2.png', colors: ['#0D2744', '#F0C040'] },
  { id: 6, cat: 'Corporate', title: 'Brand Identity Shoot', aspect: 'square', img: '/images/gallery_corporate_1.png', colors: ['#0f1624', '#2A5298'] },
  { id: 7, cat: 'Portrait', title: 'Dramatic Chiaroscuro', aspect: 'tall', img: '/images/gallery_portrait_2.png', colors: ['#1a0a0a', '#C9A84C'] },
  { id: 8, cat: 'Cinematic', title: 'City Lights Reel', aspect: 'wide', img: '/images/gallery_cinematic_2.png', colors: ['#0D1F3C', '#6BA3BE'] },
  { id: 9, cat: 'Fashion', title: 'Urban Street Style', aspect: 'square', img: '/images/gallery_fashion_2.png', colors: ['#1B2838', '#C9A84C'] },
  { id: 10, cat: 'Wedding', title: 'Vows in the Woods', aspect: 'wide', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800', colors: ['#1c2920', '#C9A84C'] },
  { id: 11, cat: 'Corporate', title: 'Executive Summit', aspect: 'square', img: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80&w=800', colors: ['#0A1118', '#385A82'] },
  { id: 12, cat: 'Portrait', title: 'Neon Nights', aspect: 'tall', img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800', colors: ['#290B3B', '#1FB2C4'] },
  { id: 13, cat: 'Cinematic', title: 'Desert Mirage', aspect: 'wide', img: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80&w=800', colors: ['#291A0A', '#D4863A'] },
  { id: 14, cat: 'Fashion', title: 'Avant-Garde Studio', aspect: 'tall', img: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=800', colors: ['#292828', '#A93838'] },
  { id: 15, cat: 'Wedding', title: 'Vintage Elegance', aspect: 'square', img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800', colors: ['#3A3026', '#E2D1A7'] },
];

const GalleryCard = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <TiltCard
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className={`gallery-card aspect-${item.aspect}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      id={`gallery-item-${item.id}`}
      maxRotation={6}
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
          <Eye size={20} className="gold-text" />
        </div>
      </div>
    </TiltCard>
  );
};

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const sectionRef = useRef(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.cat === activeCategory);

  const displayedItems = filtered.slice(0, visibleCount);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(6);
  }, [activeCategory]);

  return (
    <section id="gallery" className="gallery-section" ref={sectionRef}>
      <div className="gallery-container">
        {/* Header */}
        <div className="gallery-header">
          <ScrollReveal variant="fadeIn" delay={0.1}>
            <p className="section-tag">Portfolio</p>
          </ScrollReveal>
          <h2 className="section-title">
            <SplitText text="Our" /> <span><SplitText text="Visual" /></span> <SplitText text="Stories" />
          </h2>
          <ScrollReveal variant="slideUp" delay={0.3}>
            <p className="section-desc" style={{ margin: '1rem auto 0', textAlign: 'center' }}>
              A curated selection of our finest work across photography and videography.
            </p>
          </ScrollReveal>
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
        <motion.div layout className="gallery-grid">
          <AnimatePresence>
            {displayedItems.map(item => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="gallery-more">
            <button
              className="btn-outline"
              id="gallery-load-more"
              onClick={() => setVisibleCount(prev => prev + 6)}
            >
              <span>View Full Portfolio</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

