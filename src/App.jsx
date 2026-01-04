import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // Theme handling
  useEffect(() => {
    const html = document.documentElement
    if (dark) html.classList.add('dark')
    else html.classList.remove('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  // --- NEW LOADER LOGIC ---
  useEffect(() => {
    const loader = document.getElementById('global-loader');
    
    const handleLoad = () => {
      if (loader) {
        // 1. Start fade out
        loader.style.opacity = '0';
        
        // 2. Remove from DOM after fade finishes (0.5s)
        setTimeout(() => {
          loader.remove();
        }, 500);
      }
    };

    // Wait for the complete internet load (images, scripts, etc.)
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    // Cleanup
    return () => window.removeEventListener('load', handleLoad);
  }, []);
  // ------------------------

  // Note: No "if (loading) return..." needed anymore. 
  // The HTML loader covers the screen until we remove it.

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-950 dark:text-slate-100 transition-colors duration-300 playfair relative">
      <div className="fixed inset-0 z-0 pointer-events-none"></div>

      <Navbar dark={dark} setDark={setDark} />

      <main className="max-w-screen relative z-10">
        <section id="home"><Hero /></section>
        <section id="about"><About /></section>
        <section id="projects"><Projects /></section>
        <section id="contact"><Contact /></section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}