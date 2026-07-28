import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * ScrollReveal component reveals its child element on scroll with different transition effects.
 */
export const ScrollReveal = ({
  children,
  variant = 'slideUp', // 'slideUp' | 'fadeIn' | 'scaleIn' | 'blurFade' | 'slideLeft' | 'slideRight'
  delay = 0,
  duration = 0.8,
  threshold = 0.01,
  className = '',
  style = {},
  whileHover
}) => {

  const variants = {
    slideUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.94 },
      visible: { opacity: 1, scale: 1 }
    },
    blurFade: {
      hidden: { opacity: 0, filter: 'blur(10px)', y: 25 },
      visible: { opacity: 1, filter: 'blur(0px)', y: 0 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 }
    },
    slideRight: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={variants[variant] || variants.slideUp}
      transition={{ duration, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
      style={style}
      whileHover={whileHover}
    >
      {children}
    </motion.div>
  );
};

/**
 * SplitText splits text into words and stagger-animates them sequentially on entering viewport.
 */
export const SplitText = ({ text, className = '', delay = 0, style = {} }) => {
  if (!text) return null;
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      }
    }
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: '30%',
      filter: 'blur(5px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1], // Cubic-bezier for slick snap reveal
      }
    }
  };

  return (
    <motion.span
      className={`split-text-container ${className}`}
      style={{ display: 'inline-block', ...style }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.25em' }}>
          <motion.span
            variants={childVariants}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

/**
 * TiltCard adds a responsive 3D card tilt parallax effect driven by mouse position.
 */
export const TiltCard = ({ children, className = '', style = {}, maxRotation = 8, whileHover, ...rest }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft springs for clean cinematic return to center
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxRotation}deg`, `-${maxRotation}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${maxRotation}deg`, `${maxRotation}deg`]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Center coordinates at 0, 0 and normalize to [-0.5, 0.5]
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={whileHover}
      {...rest}
      style={{
        ...style,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerContainer orchestrates staggering effects on its StaggerItem children.
 */
export const StaggerContainer = ({ children, delay = 0, staggerChildren = 0.12, threshold = 0.01, className = '', style = {} }) => {

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay
          }
        }
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerItem represents a child element within a StaggerContainer.
 */
export const StaggerItem = ({ children, variant = 'slideUp', duration = 0.6, className = '', style = {}, whileHover }) => {
  const variants = {
    slideUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 }
    },
    blurFade: {
      hidden: { opacity: 0, filter: 'blur(8px)', y: 15 },
      visible: { opacity: 1, filter: 'blur(0px)', y: 0 }
    }
  };

  return (
    <motion.div
      variants={variants[variant] || variants.slideUp}
      transition={{ duration, ease: [0.25, 1, 0.5, 1] }}
      className={className}
      style={style}
      whileHover={whileHover}
    >
      {children}
    </motion.div>
  );
};
