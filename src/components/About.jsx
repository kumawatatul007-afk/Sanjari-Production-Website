import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Camera, Focus, Zap, Award, Globe } from 'lucide-react';
import { ScrollReveal, SplitText, TiltCard, StaggerContainer, StaggerItem } from './ScrollReveal';
import BeforeAfterSlider from './BeforeAfterSlider';
import './About.css';


const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const equipmentList = [
    { icon: <Camera size={24} />, name: 'Sony Cinema Line', desc: 'FX3 & A7SIII for breathtaking 4K cinematic clarity.' },
    { icon: <Focus size={24} />, name: 'G-Master Lenses', desc: 'Premium prime lenses for buttery smooth bokeh & sharp focus.' },
    { icon: <Globe size={24} />, name: 'DJI Aerial Systems', desc: 'Mavic 3 Cine for sweeping, cinematic drone landscapes.' },
    { icon: <Zap size={24} />, name: 'Profoto Lighting', desc: 'Studio-grade strobes for perfect portrait illumination.' },
  ];

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        
        {/* Intro Section */}
        <div className="about-intro-grid">
          {/* Left: Visual */}
          <motion.div 
            className="about-visual"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-image-wrap">
              <div className="about-image-main">
                <motion.img
                  src="/images/IMG_20250707_193034.jpg"
                  alt="Sanjari Production Team"
                  className="about-photo"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="about-overlay-gradient"></div>
              </div>

              {/* Floating badges */}
              <motion.div 
                className="about-badge-1"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <motion.div
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <span className="badge-number">10+</span>
                  <span className="badge-text">Years of Excellence</span>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="about-badge-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <motion.div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
                >
                  <Award size={24} className="gold-text" />
                  <span className="badge-text">Award Winning</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="about-content">
            <ScrollReveal variant="fadeIn" delay={0.1}>
              <p className="section-tag">Our Story</p>
            </ScrollReveal>
            <h2 className="section-title">
              <SplitText text="We Are More Than" />
              <br />
              <SplitText text="Just" /> <span><SplitText text="Photographers" /></span>
            </h2>

            <ScrollReveal variant="fadeIn" delay={0.3}>
              <div className="divider">
                <div className="divider-line" />
                <div className="divider-diamond" />
                <div className="divider-line" />
              </div>
            </ScrollReveal>

            <ScrollReveal variant="slideUp" delay={0.4}>
              <p className="section-desc">
                Sanjari Production was born from an obsession with visual perfection. We believe that every frame we capture should not just show a moment, but evoke an emotion. Whether it is a grand wedding, a high-fashion editorial, or a corporate film, our approach remains the same: relentless dedication to the art of storytelling.
              </p>
            </ScrollReveal>
            <ScrollReveal variant="slideUp" delay={0.5}>
              <p className="section-desc" style={{ marginTop: '1.5rem' }}>
                We don't just point and shoot. We direct, we light, and we choreograph reality into cinematic masterpieces. From pre-production mood boards to meticulous post-production color grading, we bring Hollywood-level execution to your personal and brand stories.
              </p>
            </ScrollReveal>

            <ScrollReveal variant="scaleIn" delay={0.6}>
              <div className="about-cta">
                <button
                  className="btn-primary hover-target"
                  id="about-services-btn"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span>Discover Our Services</span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Philosophy & Arsenal Section */}
        <div className="about-arsenal-section">
          <div className="arsenal-header">
            <h3 className="arsenal-title">
              <SplitText text="Our" /> <span><SplitText text="Arsenal" /></span>
            </h3>
            <ScrollReveal variant="slideUp" delay={0.2}>
              <p className="arsenal-subtitle">World-class storytelling requires world-class tools. We invest in the industry's highest standard of equipment to ensure your visuals are nothing short of breathtaking.</p>
            </ScrollReveal>
          </div>

          <StaggerContainer className="arsenal-grid">
            {equipmentList.map((eq) => (
              <StaggerItem key={eq.name}>

                <TiltCard 
                  className="arsenal-card"
                  whileHover={{ y: -5, boxShadow: '0 15px 35px rgba(201, 168, 76, 0.15)' }}
                >
                  <div className="arsenal-icon">{eq.icon}</div>
                  <h4 className="arsenal-card-title">{eq.name}</h4>
                  <p className="arsenal-card-desc">{eq.desc}</p>
                </TiltCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Post-Production Showcase */}
        <div className="about-grading-showcase" style={{ marginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '4rem' }}>
          <div className="arsenal-header" style={{ marginBottom: '2rem' }}>
            <h3 className="arsenal-title">
              <SplitText text="The" /> <span><SplitText text="Art of" /></span> <SplitText text="Grading" />
            </h3>
            <ScrollReveal variant="slideUp" delay={0.2}>
              <p className="arsenal-subtitle">
                RAW sensors capture flat, dynamic-range log files. We sculpt light and color to breathe life, emotion, and premium luxury tones into every pixel.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal variant="fadeIn" delay={0.3}>
            <BeforeAfterSlider />
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export default About;


