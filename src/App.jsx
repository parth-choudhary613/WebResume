import React, { useState, useEffect } from 'react'

import Header from './components/Header'
import Hero from './components/Hero'
import ProjectShowcase from './components/ProjectShowcase'
import About from './components/About'
import SkillsMatrix from './components/SkillsMatrix'
import Experience from './components/Experience'
import Principles from './components/Principles'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ResumeModal from './components/ResumeModal'
import Reactbitsbackground from './components/Reactbitsbackground'

export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false

    const stored = localStorage.getItem('theme')

    if (stored) {
      return stored === 'dark'
    }

    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    )
  })

  const [resumeOpen, setResumeOpen] = useState(false)

  // Sync theme with HTML root
  useEffect(() => {
    const root = document.documentElement

    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <div className="relative min-h-screen overflow-x-hidden isolate">

      {/* =====================================================
          GLOBAL REACT BITS BACKGROUND
          Fixed behind the complete website
      ====================================================== */}
      <div
        className="
          fixed
          inset-0
          z-0
          w-full
          h-full
        "
        aria-hidden="true"
      >
        <Reactbitsbackground dark={dark} />
      </div>


      {/* =====================================================
          WEBSITE CONTENT
          Everything stays above the animated background
      ====================================================== */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Primary Sticky Header */}
        <Header
          dark={dark}
          setDark={setDark}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Main Editorial Flow */}
        <main
          id="main-content"
          className="relative flex-1"
        >
          <Hero
            dark={dark}
            onOpenResume={() => setResumeOpen(true)}
          />

          <ProjectShowcase />

          <About />

          <SkillsMatrix />

          <Experience />

          <Principles />

          <Contact />
        </main>

        {/* Editorial Footer */}
        <Footer />

      </div>


      {/* =====================================================
          MODAL
          Keep outside normal site layer
      ====================================================== */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

    </div>
  )
}