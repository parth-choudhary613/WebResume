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
          ? 'bg-surface/85 backdrop-blur-md border-b border-border py-3 shadow-xs'
          : 'bg-transparent py-4 sm:py-6'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">

        {/* Left: Logo + Name + Status */}
        <a
          href="#top"
          onClick={closeMobileMenu}
          className="group flex items-center gap-3 text-text-primary focus:outline-none"
          aria-label={`${personalData.name} - Home`}
        >
          {/* Custom Logo */}
          <div className="flex items-center justify-center shrink-0 w-10 h-10 sm:w-20 sm:h-20  shadow-2xs group-hover:border-accent/40 transition-colors">
            <img
              src="/assets/TechLogo.webp"
              alt={`${personalData.name} logo`}
              width="1254"
              height="1254"
              decoding="async"
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Name + availability */}
          <div className="hidden xs:flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-text-primary group-hover:text-accent transition-colors">
              {personalData.name}
            </span>

            <span className="font-sans text-[11px] text-text-muted flex items-center gap-1.5 font-medium">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </span>
              Available for opportunities
            </span>
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
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full" />
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
              w-9
              h-9
              rounded-xl
              border
              border-border
              bg-surface
              text-text-secondary
              hover:text-text-primary
              hover:border-border-strong
              hover:bg-surface-subtle
              flex
              items-center
              justify-center
              transition-all
              duration-200
              cursor-pointer
              shadow-2xs
            "
            aria-label={
              dark
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
            title={
              dark
                ? 'Switch to light mode'
                : 'Switch to dark mode'
            }
          >
            {dark ? (
              <Sun
                size={16}
                className="text-amber-400 transition-transform duration-300 hover:rotate-45"
              />
            ) : (
              <Moon
                size={16}
                className="text-slate-700 transition-transform duration-300 hover:-rotate-12"
              />
            )}
          </button>

          {/* Resume button */}
          {onOpenResume && (
            <button
              type="button"
              onClick={onOpenResume}
              className="
                hidden
                sm:inline-flex
                items-center
                px-3.5
                py-1.5
                rounded-xl
                text-xs
                font-medium
                border
                border-border
                bg-surface
                text-text-secondary
                hover:text-text-primary
                hover:border-border-strong
                hover:bg-surface-subtle
                transition-all
                cursor-pointer
              "
            >
              CV / Résumé
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
              hover:-translate-y-0.5
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
              w-9
              h-9
              rounded-xl
              border
              border-border
              bg-surface
              text-text-secondary
              hover:text-text-primary
              flex
              items-center
              justify-center
              transition-colors
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
        <div className="md:hidden border-b border-border bg-surface/98 backdrop-blur-xl px-6 py-6 shadow-xl">
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