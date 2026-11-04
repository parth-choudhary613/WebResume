import React, { useEffect, useState } from 'react'
import {
  Sun,
  Moon,
  ArrowUpRight,
  Menu,
  X,
} from 'lucide-react'

import { personalData } from '../data/portfolioData'


export default function Header({ dark, setDark, onOpenResume }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('work')

  // Header scroll effect with rAF throttling
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev))
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!mobileOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [mobileOpen])

  // Active navigation section observer
  useEffect(() => {
    const sections = [
      'work',
      'about',
      'stack',
      'experience',
      'contact',
    ]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -55% 0px',
      }
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const navLinks = [
    {
      id: 'work',
      label: 'Work',
    },
    {
      id: 'about',
      label: 'About',
    },
    {
      id: 'stack',
      label: 'Stack',
    },
    {
      id: 'experience',
      label: 'Experience',
    },
    {
      id: 'contact',
      label: 'Contact',
    },
  ]

  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/85 backdrop-blur-md border-b border-border/60 py-3 shadow-xs'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">

        {/* Left: Logo */}
        <a
          href="#top"
          onClick={closeMobileMenu}
          className="group flex items-center gap-3 text-text-primary focus:outline-none"
          aria-label={`${personalData.name} - Home`}
        >
          {/* Custom Logo */}
          <div className="flex items-center justify-center shrink-0 w-10 h-10 sm:w-16 sm:h-16 transition-colors">
            <img
              src="/assets/TechLogo.png"
              alt={`${personalData.name} logo`}
              width="1254"
              height="1254"
              decoding="async"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(220,38,38,0.3)]"
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-sm font-medium"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative py-1 transition-colors duration-150 ${
                  isActive
                    ? 'text-accent font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}

                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">

          {/* Dark / Light mode toggle */}
          <button
            type="button"
            onClick={() => setDark(!dark)}
            className="
              group relative
              w-10 h-10
              rounded-xl
              flex items-center justify-center
              cursor-pointer
              transition-all duration-300 ease-out
              bg-surface/90 hover:bg-surface
              border border-border hover:border-accent/60
              backdrop-blur-md
              shadow-xs
              hover:shadow-[0_0_20px_rgba(220,38,38,0.25)]
              active:scale-95
              hover:-translate-y-0.5
              overflow-hidden
            "
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {/* Ambient Red Glow Layer Behind Icon */}
            <div 
              className="
                absolute inset-0 
                bg-gradient-to-tr from-red-600/0 via-red-600/10 to-red-500/20 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 ease-in-out
              " 
            />

            {/* Active Theme Icon with Smooth Spin & Scale Transitions */}
            <div className="relative z-10 transition-transform duration-500 ease-out group-hover:scale-110">
              {dark ? (
                <Sun
                  size={18}
                  className="
                    text-red-400 
                    drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]
                    transition-all duration-500 ease-in-out
                    group-hover:rotate-90 group-hover:text-red-300
                  "
                />
              ) : (
                <Moon
                  size={18}
                  className="
                    text-red-600 
                    drop-shadow-[0_0_6px_rgba(220,38,38,0.4)]
                    transition-all duration-500 ease-in-out
                    group-hover:-rotate-45 group-hover:text-red-500
                  "
                />
              )}
            </div>
          </button>

          {/* Resume button */}
          {onOpenResume && (
            <button
              type="button"
              onClick={onOpenResume}
              className="
                group relative
                hidden sm:inline-flex items-center gap-2
                px-4 py-2
                rounded-xl
                text-xs font-semibold tracking-wide
                cursor-pointer
                transition-all duration-300 ease-out
                bg-surface/90 hover:bg-surface
                text-text-primary hover:text-accent
                border border-border hover:border-accent/60
                backdrop-blur-md
                shadow-xs
                hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]
                active:scale-95
                hover:-translate-y-0.5
                overflow-hidden
              "
            >
              {/* Subtle Red Top Accent Highlight Line */}
              <div 
                className="
                  absolute top-0 left-1/4 right-1/4 h-[1px]
                  bg-gradient-to-r from-transparent via-red-500/60 to-transparent
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                " 
              />

              {/* Document Icon with Crimson Accent */}
              <svg
                className="
                  w-3.5 h-3.5 
                  text-accent
                  transition-transform duration-300 ease-out
                  group-hover:scale-110 group-hover:rotate-3
                  relative z-10
                "
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 2 2 0 01-2-2V5a2 2 2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 2 2 0 01-2 2z"
                />
              </svg>

              {/* Button Label */}
              <span className="relative z-10 transition-colors duration-200">
                CV / Résumé
              </span>

              {/* Small External Link Arrow */}
              <svg
                className="
                  w-3 h-3
                  text-text-muted group-hover:text-accent
                  transition-all duration-300 ease-out
                  group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                  relative z-10
                "
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>
          )}

          {/* Contact button */}
          <a
            href="#contact"
            className="
              hidden
              sm:inline-flex
              items-center
              gap-1.5
              px-4
              py-2
              rounded-xl
              text-xs
              font-semibold
              bg-accent
              hover:bg-accent-hover
              text-white
              transition-all
              shadow-xs
              hover:shadow-[0_0_20px_rgba(220,38,38,0.35)]
              hover:-translate-y-0.5
              active:translate-y-0
              cursor-pointer
            "
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="
              md:hidden
              w-10
              h-10
              rounded-xl
              border
              border-border
              bg-surface
              text-text-secondary
              hover:text-text-primary
              hover:border-accent/40
              flex
              items-center
              justify-center
              transition-colors
              cursor-pointer
            "
            aria-label={
              mobileOpen
                ? 'Close menu'
                : 'Open menu'
            }
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-b border-border bg-surface/98 backdrop-blur-xl px-6 py-6 shadow-xl animate-in fade-in duration-200">
          <nav
            className="flex flex-col gap-3 font-sans text-base font-medium"
            aria-label="Mobile Navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={closeMobileMenu}
                  className={`
                    flex
                    items-center
                    justify-between
                    py-2.5
                    border-b
                    border-border-subtle
                    transition-colors
                    ${
                      isActive
                        ? 'text-accent font-semibold'
                        : 'text-text-secondary hover:text-text-primary'
                    }
                  `}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-text-muted">
                    ↗
                  </span>
                </a>
              )
            })}

            <div className="pt-3 flex flex-col gap-2">
              {onOpenResume && (
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu()
                    onOpenResume()
                  }}
                  className="
                    w-full
                    py-2.5
                    text-center
                    text-sm
                    font-medium
                    border
                    border-border
                    bg-surface
                    text-text-primary
                    hover:border-accent/40
                    rounded-xl
                    block
                    shadow-2xs
                    transition-colors
                    cursor-pointer
                  "
                >
                  View Curriculum Vitae (PDF)
                </button>
              )}

              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="
                  w-full
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  bg-accent
                  hover:bg-accent-hover
                  text-white
                  rounded-xl
                  block
                  shadow-xs
                  transition-colors
                "
              >
                Let's Talk ↗
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}