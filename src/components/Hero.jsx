import React from 'react';
import { motion } from 'framer-motion';
import HeroScene from './HeroScene3D';
import './Hero.css';

export default function Hero() {
  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const lineVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="hero-wrapper">
      {/* 3D WebGL Background */}
      <HeroScene />
      
      {/* Minimal UI Overlay */}
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.header className="hero-header" variants={itemVariants}>
          <div>FRONT-END REACT DEVELOPER</div>
          <div className="hero-status">
            <span className="status-dot"></span>
            AVAILABLE FOR SELECT PROJECTS
          </div>
        </motion.header>

        <main className="hero-main">
          <h1 className="hero-title">
            <span className="hero-title-line">
              <motion.span style={{ display: 'inline-block' }} variants={lineVariants}>I craft interfaces</motion.span>
            </span>
            <span className="hero-title-line">
              <motion.span style={{ display: 'inline-block' }} variants={lineVariants}>that feel alive.</motion.span>
            </span>
          </h1>
          
          <motion.p className="hero-description" variants={itemVariants}>
            I build fast, expressive, and interactive digital experiences blending React, fluid motion, and modern web technologies.
          </motion.p>
          
          <motion.div className="hero-actions" variants={itemVariants}>
            <a href="#work" className="btn btn-primary">
              View My Work
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#about" className="btn btn-secondary">
              About Me
            </a>
          </motion.div>
        </main>

        <motion.footer className="hero-footer" variants={itemVariants}>
          <div>BASED IN INDIA <br/> REACT / MOTION / WEBGL</div>
          <div className="scroll-indicator">
            SCROLL TO EXPLORE
            <div className="scroll-line"></div>
          </div>
        </motion.footer>
      </motion.div>
    </section>
  );
}