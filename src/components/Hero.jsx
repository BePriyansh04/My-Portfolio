// src/components/Hero.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import bgSrc from '../assets/hero.bg.jpeg';   // or .mp4

const Hero = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  /* ---- CV download ---- */
  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/cv.pdf'; // place file in public/cv.pdf
    link.download = 'Priyansh_Burman_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* text reveal variants */
  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } } };

  return (
    <section id="home" className="hero">
      {/* background parallax + fade */}
      <div className="hero-bg" style={{ transform: `translateY(${offset * 0.3}px)`, opacity: 1 - offset / 800 }}>
        {bgSrc.endsWith('mp4') ? (
          <video src={bgSrc} autoPlay muted loop playsInline className="hero-bg-media" />
        ) : (
          <img src={bgSrc} alt="" className="hero-bg-media" />
        )}
        <div className="hero-bg-overlay" />
      </div>

      {/* glass card */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="hero-glass"
      >
        <motion.h1 variants={item} className="hero-title">
          Hi, I'm <span className="gradient-text">Priyansh Burman</span>
        </motion.h1>

        <motion.p variants={item} className="hero-sub">
          Full Stack MERN Developer
        </motion.p>

        <motion.p variants={item} className="hero-tag">
          I build intelligent, secure, and scalable web solutions with AI integration.
        </motion.p>

        {/* ===== BUTTON ROW ===== */}
        <motion.div variants={item} className="hero-actions">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-glow"
            onClick={() => scrollTo('projects')}
          >
            View My Work
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline"
            onClick={downloadCV}
          >
            Download CV
          </motion.button>
        </motion.div>
      </motion.div>

      {/* mouse hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mouse-hint"
      >
        <div className="mouse" />
      </motion.div>
    </section>
  );
};

export default Hero;