import React, { useEffect, useRef, useState } from 'react'
import { Check, Copy, Code, Terminal, Sparkles } from 'lucide-react'
import SectionHeader from './SectionHeader'
import { philosophyPrinciples } from '../data/portfolioData'

export default function Principles() {
  const [activeId, setActiveId] = useState('performance')
  const [copied, setCopied] = useState(false)
  const copyTimer = useRef(null)
  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const activePrinciple = philosophyPrinciples.find((p) => p.id === activeId) || philosophyPrinciples[0]

  const handleCopy = () => {
    navigator.clipboard.writeText(activePrinciple.codeSnippet)
    setCopied(true)
    clearTimeout(copyTimer.current)
    copyTimer.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="principles" className="py-20 sm:py-28 border-b border-border bg-bg">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <SectionHeader
          number="06"
          label="ENGINEERING PRINCIPLES"
          meta="CORE PHILOSOPHY & REACT SYNTAX"
          description="The mental models and architectural decisions guiding how I construct web systems. Select a principle to inspect its practical React implementation."
        />

        {/* Interactive Split Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT: 4 Editorial Principles (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            {philosophyPrinciples.map((item) => {
              const isActive = activeId === item.id

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
                  className={`p-6 border rounded-xs transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'border-accent bg-surface shadow-xs'
                      : 'border-border bg-surface/50 hover:bg-surface hover:border-border-strong'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline gap-3">
                      <span className={`font-mono text-xs font-semibold ${isActive ? 'text-accent' : 'text-text-muted'}`}>
                        {item.number}
                      </span>
                      <h3 className="font-mono text-xs uppercase tracking-widest text-text-primary font-semibold">
                        {item.title}
                      </h3>
                    </div>

                    {isActive && (
                      <span className="font-mono text-[10px] text-accent uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
                        ACTIVE PRINCIPLE
                      </span>
                    )}
                  </div>

                  <p className="font-medium text-base text-text-primary mb-2">
                    {item.headline}
                  </p>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {item.body}
                  </p>
                </div>
              )
            })}
          </div>

          {/* RIGHT: Interactive React Component Inspector (6 cols) */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="border border-border bg-surface rounded-xs overflow-hidden shadow-xs">
              
              {/* Window Header */}
              <div className="h-10 bg-surface-subtle border-b border-border px-4 flex items-center justify-between font-mono text-xs text-text-secondary">
                <div className="flex items-center gap-2">
                  <Code size={13} className="text-accent" />
                  <span className="text-text-primary font-medium">
                    {activePrinciple.codeLabel}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-text-muted uppercase">
                    {activePrinciple.codeLang}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1 rounded-xs hover:bg-surface hover:text-text-primary text-text-muted transition-colors cursor-pointer"
                    aria-label="Copy code snippet"
                    title="Copy code"
                  >
                    {copied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              {/* Code Pre Block with subtle styling */}
              <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto bg-code-bg/30 text-text-primary max-h-[460px]">
                <pre className="tab-4">
                  <code>{activePrinciple.codeSnippet}</code>
                </pre>
              </div>

              {/* Footer explanation note */}
              <div className="p-3.5 border-t border-border bg-surface-subtle flex items-center justify-between font-mono text-[11px] text-text-muted">
                <span>PARTH CHOUDHARY // COMPONENT INSPECTOR</span>
                <span className="text-accent uppercase">ZERO GIMMICKS</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
