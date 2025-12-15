// src/App.jsx
import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // dark-mode state (persist to localStorage)
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
    // optional: follow user preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const html = document.documentElement
    if (dark) html.classList.add('dark')
    else html.classList.remove('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-950 dark:text-slate-100 transition-colors duration-300 playfair">
      <Navbar dark={dark} setDark={setDark} />
      <main className="max-w-screen">
        <Hero />
        {/* <About />
        <Projects />
        <Contact /> */}
      </main>
      <Footer />
    </div>
  )
}
