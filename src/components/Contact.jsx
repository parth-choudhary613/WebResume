import React, { useEffect, useRef, useState } from 'react'
import { Mail, Linkedin, Github, Phone, ArrowUpRight, Copy, Check, Send, MessageSquare } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { personalData } from '../data/portfolioData'

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success'
  const pendingTimers = useRef(new Set())
  useEffect(() => () => {
    pendingTimers.current.forEach(clearTimeout)
    pendingTimers.current.clear()
  }, [])
  const schedule = (callback, delay) => {
    const timer = setTimeout(() => {
      pendingTimers.current.delete(timer)
      callback()
    }, delay)
    pendingTimers.current.add(timer)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(personalData.email)
    setCopiedEmail(true)
    schedule(() => setCopiedEmail(false), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')
    // Simulate reliable dispatch
    schedule(() => {
      setStatus('success')
      setFormState({ name: '', email: '', message: '' })
      schedule(() => setStatus('idle'), 4000)
    }, 800)
  }

  return (
    <section id="contact" className="py-20 sm:py-28 bg-bg border-b border-border">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <SectionHeader
          number="07"
          label="INITIATE CONTACT"
          meta="OPEN FOR OPPORTUNITIES"
        />

        {/* Editorial Headline */}
        <div className="mb-14 sm:mb-18 max-w-3xl">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-text-primary leading-[1.12]">
            Have something worth building? <br />
            <span className="text-text-secondary">Let's make it real.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-text-secondary leading-relaxed">
            I am currently open to full-time frontend engineering roles, high-impact contract collaborations, and technical discussions around modern React architecture.
          </p>
        </div>

        {/* Split Grid: Direct Channels & Direct Message Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* LEFT: Direct Communication Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card with Copy Trigger */}
            <div className="p-6 border border-border bg-surface rounded-xs">
              <div className="flex items-center justify-between font-mono text-[10px] text-text-muted uppercase tracking-wider mb-2">
                <span>PRIMARY TRANSMISSION</span>
                <span className="text-accent font-semibold">EMAIL</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${personalData.email}`}
                  className="font-mono text-sm sm:text-base font-medium text-text-primary hover:text-accent transition-colors truncate"
                >
                  {personalData.email}
                </a>

                <button
                  onClick={copyEmail}
                  className="p-2 border border-border rounded-xs hover:border-text-secondary text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Social Network Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <a
                href={personalData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-border bg-surface rounded-xs hover:border-text-secondary transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin size={15} className="text-text-muted group-hover:text-accent transition-colors" />
                  <span className="text-text-primary font-medium">LinkedIn</span>
                </div>
                <ArrowUpRight size={13} className="text-text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={personalData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-border bg-surface rounded-xs hover:border-text-secondary transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Github size={15} className="text-text-muted group-hover:text-accent transition-colors" />
                  <span className="text-text-primary font-medium">GitHub</span>
                </div>
                <ArrowUpRight size={13} className="text-text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={personalData.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-border bg-surface rounded-xs hover:border-text-secondary transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-text-muted group-hover:text-accent transition-colors" />
                  <span className="text-text-primary font-medium">WhatsApp</span>
                </div>
                <ArrowUpRight size={13} className="text-text-muted group-hover:text-text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <div className="p-4 border border-border bg-surface rounded-xs flex flex-col justify-center">
                <span className="text-[10px] text-text-muted uppercase">LOCAL TIME</span>
                <span className="text-text-primary font-medium mt-0.5">IST (UTC+5:30)</span>
              </div>
            </div>

            {/* Availability Callout Box */}
            <div className="p-5 border border-border-subtle bg-surface-subtle rounded-xs font-mono text-xs">
              <div className="flex items-center gap-2 text-accent font-semibold mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
                <span>CURRENT CAPACITY</span>
              </div>
              <p className="text-text-secondary leading-relaxed text-[11px]">
                Available immediately for remote engineering positions, high-standard UI systems development, or technical consults.
              </p>
            </div>

          </div>

          {/* RIGHT: Direct Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="border border-border bg-surface p-6 sm:p-8 rounded-xs">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-border font-mono text-xs">
                <div className="flex items-center gap-2 text-text-primary font-semibold uppercase tracking-wider">
                  <MessageSquare size={14} className="text-accent" />
                  <span>Send a Direct Message</span>
                </div>
                <span className="text-[10px] text-text-muted">RESPONSE // &lt; 24H</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="sender-name"
                      className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      id="sender-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-3.5 py-2.5 border border-border bg-surface-subtle text-text-primary rounded-xs font-sans text-sm focus:border-accent focus:bg-surface focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="sender-email"
                      className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      id="sender-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 border border-border bg-surface-subtle text-text-primary rounded-xs font-sans text-sm focus:border-accent focus:bg-surface focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="sender-message"
                    className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-2"
                  >
                    Project Context or Message
                  </label>
                  <textarea
                    id="sender-message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about the role, project architecture, or timeline..."
                    className="w-full px-3.5 py-2.5 border border-border bg-surface-subtle text-text-primary rounded-xs font-sans text-sm focus:border-accent focus:bg-surface focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-text-primary text-bg font-mono text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-accent transition-colors duration-150 cursor-pointer disabled:opacity-50"
                  >
                    {status === 'idle' && (
                      <>
                        <span>Transmit Message</span>
                        <Send size={13} />
                      </>
                    )}
                    {status === 'submitting' && (
                      <span>Dispatching...</span>
                    )}
                    {status === 'success' && (
                      <>
                        <span>Message Dispatched</span>
                        <Check size={14} />
                      </>
                    )}
                  </button>

                  {status === 'success' && (
                    <span className="font-mono text-xs text-accent">
                      Thank you. I will reply promptly.
                    </span>
                  )}
                </div>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}