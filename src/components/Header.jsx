import React, { useEffect, useState } from 'react'
import {
  Sun,
  Moon,
  ArrowUpRight,
  Menu,
  X,
} from 'lucide-react'

import { personalData } from '../data/portfolioData'


export default function Header({ dark, setDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('work')

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Active navigation section observer
  useEffect(() => {
    const sections = [
      'work',
      'about',
      'stack',
      'experience',
      'philosophy',
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-bg/85 backdrop-blur-md border-b border-border/80 py-3.5 shadow-xs'
          : 'bg-transparent py-5 sm:py-7'
      }`}
    >
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">

        {/* Left: Logo + Name + Status */}
        <a
          href="#top"
          onClick={closeMobileMenu}
          className="group flex items-center gap-3 text-text-primary focus:outline-none"
          aria-label={`${personalData.name} - Home`}
        >
          {/* Custom Logo */}
          <div className="flex items-center justify-center shrink-0">
          <img
  src="/assets/TechLogo.webp"
  alt={`${personalData.name} logo`}
  width="1254"
  height="1254"
  decoding="async"
  className="w-20 h-20 sm:w-15 sm:h-15 object-contain transition-transform duration-300 group-hover:scale-105"
/>
          </div>

          {/* Name + availability */}
          <div className="hidden xs:flex flex-col">
            <span className="font-display font-bold text-sm tracking-tight text-text-primary group-hover:text-brand-blue transition-colors">
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
                    ? 'text-brand-blue font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}

                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-blue rounded-full" />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">

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
              hover:border-text-secondary
              flex
              items-center
              justify-center
              transition-colors
              cursor-pointer
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
                className="text-brand-yellow transition-transform duration-300 hover:rotate-45"
              />
            ) : (
              <Moon
                size={16}
                className="text-text-secondary transition-transform duration-300 hover:-rotate-12"
              />
            )}
          </button>

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
              bg-brand-blue
              hover:bg-brand-blue-hover
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
        <div className="md:hidden border-b border-border bg-bg/95 backdrop-blur-lg px-6 py-6 shadow-lg">
          <nav
            className="flex flex-col gap-4 font-sans text-base font-medium"
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
                    py-2
                    border-b
                    border-border-subtle
                    transition-colors
                    ${
                      isActive
                        ? 'text-brand-blue'
                        : 'text-text-secondary hover:text-brand-blue'
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

            <div className="pt-2">
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="
                  w-full
                  py-3
                  text-center
                  text-sm
                  font-semibold
                  bg-brand-blue
                  hover:bg-brand-blue-hover
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