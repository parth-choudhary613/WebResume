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
