import React, { useState, useEffect } from 'react'
import { ArrowUp, Github, Linkedin, Mail, Phone } from 'lucide-react'
import { personalData } from '../data/portfolioData'

export default function Footer() {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-surface border-t border-border py-14 sm:py-16 text-text-secondary">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Top Tier: Identity, Technical Specs, Return to Top */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-border-subtle items-start">
          
          {/* Identity (4 cols) */}
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-xs bg-accent inline-block" />
              <span className="font-mono text-sm font-semibold tracking-tight text-text-primary uppercase">
                {personalData.name}
              </span>
            </div>
            <p className="font-mono text-xs text-text-muted leading-relaxed">
              Frontend Engineer specialized in React, TypeScript, and interface architecture.
            </p>
            <div className="font-mono text-[11px] text-text-muted">
              LOC: {personalData.location} // {personalData.coordinates}
            </div>
          </div>

          {/* Architecture Spec (5 cols) */}
          <div className="md:col-span-5 space-y-2 font-mono text-xs">
            <span className="text-text-primary uppercase tracking-wider block text-[11px] font-medium">
              System Architecture
            </span>
            <p className="text-text-secondary leading-relaxed text-[11px]">
              Engineered with React 19, TypeScript, Three.js spatial modeling, Tailwind CSS token architecture, and Framer Motion. Built with zero gratuitous animations and strict performance benchmarks.
            </p>
          </div>

          {/* Back to top (3 cols) */}
          <div className="md:col-span-3 flex md:justify-end">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-bg hover:border-text-secondary hover:text-text-primary text-text-secondary font-mono text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp size={13} />
            </button>
          </div>

        </div>

        {/* Bottom Tier: Clock, Social Links, Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
          
          <div className="flex items-center gap-4 text-text-muted text-[11px]">
            <span>© {new Date().getFullYear()} PARTH CHOUDHARY</span>
            <span>•</span>
            <span className="text-text-primary">
              TIME_SYNC (IST): {time || '00:00:00'}
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-5 text-text-secondary">
            <a
              href={personalData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
            <a
              href={personalData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href={personalData.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-primary transition-colors"
              aria-label="WhatsApp"
            >
              <Phone size={15} />
            </a>
            <a
              href={`mailto:${personalData.email}`}
              className="hover:text-text-primary transition-colors"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
          </div>

        </div>

      </div>
    </footer>
  )
}