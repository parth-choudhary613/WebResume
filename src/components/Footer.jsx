import React, { useState, useEffect } from 'react'
import { ArrowUp, Github, Linkedin, Mail, Phone } from 'lucide-react'
import { personalData } from '../data/portfolioData'

function TimeDisplay() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const istString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      setTime(istString)
    }

    updateTime()
    const onVisible = () => {
      if (!document.hidden) updateTime()
    }
    document.addEventListener('visibilitychange', onVisible)
    const timer = setInterval(onVisible, 1000)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  return <span>TIME_SYNC (IST): {time || '00:00:00'}</span>
}

export default function Footer() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-surface border-t border-border py-12 sm:py-16 text-text-secondary">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Top Tier: Identity, Technical Specs, Return to Top */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-border items-start">
          
          {/* Identity (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              <span className="font-mono text-sm font-bold tracking-tight text-text-primary uppercase">
                {personalData.name}
              </span>
            </div>
            <p className="font-mono text-xs text-text-muted leading-relaxed">
              Frontend Engineer specialized in React, fluid motion, and interface architecture.
            </p>
            <div className="font-mono text-[11px] text-text-muted">
              LOC: {personalData.location} // {personalData.coordinates}
            </div>
          </div>

          {/* Architecture Spec (5 cols) */}
          <div className="md:col-span-5 space-y-2 font-mono text-xs">
            <span className="text-text-primary uppercase tracking-wider block text-[11px] font-semibold">
              System Architecture
            </span>
            <p className="text-text-secondary leading-relaxed text-[11px]">
              Engineered with React 19, JavaScript (ESNext), Three.js WebGL spatial modeling, Tailwind CSS v4 design token architecture, and Framer Motion spring physics.
            </p>
          </div>

          {/* Back to top (3 cols) */}
          <div className="md:col-span-3 flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-surface-subtle hover:border-accent hover:text-accent text-text-secondary font-mono text-xs uppercase tracking-wider rounded-xl transition-all duration-200 cursor-pointer shadow-2xs hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>

        </div>

        {/* Bottom Tier: Clock, Social Links, Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          
          <div className="flex items-center gap-3 text-text-muted text-[11px]">
            <span>© {new Date().getFullYear()} PARTH CHOUDHARY</span>
            <span>•</span>
            <span className="text-text-primary font-medium">
              <TimeDisplay />
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-text-secondary">
            <a
              href={personalData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-accent hover:bg-surface-subtle transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href={personalData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-accent hover:bg-surface-subtle transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href={personalData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-accent hover:bg-surface-subtle transition-colors"
              aria-label="WhatsApp"
            >
              <Phone size={16} />
            </a>
            <a
              href={`mailto:${personalData.email}`}
              className="p-1.5 rounded-lg hover:text-accent hover:bg-surface-subtle transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>

        </div>

      </div>
    </footer>
  )
}