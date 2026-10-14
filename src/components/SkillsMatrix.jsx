import React, { useState } from 'react'
import { Layers, Palette, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function SkillsMatrix() {
  const [activeStackNode, setActiveStackNode] = useState(0)

  // Central Stack Map Stages
  const stackMap = [
    {
      id: 'core',
      step: '01',
      title: 'Core Engine',
      tech: 'React 19',
      desc: 'Component architecture, Concurrent rendering, Fiber & hooks',
      color: 'border-accent bg-accent/10 text-accent font-medium',
    },
    {
      id: 'type',
      step: '02',
      title: 'Language',
      tech: 'JavaScript / ESNext',
      desc: 'Predictable state machines, async pipelines & DOM performance',
      color: 'border-brand-blue bg-brand-blue/10 text-brand-blue font-medium',
    },
    {
      id: 'style',
      step: '03',
      title: 'Design Systems',
      tech: 'Tailwind & Modern CSS',
      desc: 'Fluid clamp typography, token architectures & layout containment',
      color: 'border-brand-coral bg-brand-coral/10 text-brand-coral font-medium',
    },
    {
      id: 'motion',
      step: '04',
      title: 'Interaction',
      tech: 'Framer Motion & WebGL',
      desc: 'Tactile spring dynamics, shaders & 3D spatial interface elements',
      color: 'border-brand-sage bg-brand-sage/10 text-brand-sage font-medium',
    },
    {
      id: 'tooling',
      step: '05',
      title: 'Delivery',
      tech: 'Vite & Cloudflare',
      desc: 'Optimized bundle budgets, edge deploys & Core Web Vitals',
      color: 'border-brand-yellow bg-brand-yellow/10 text-brand-yellow font-medium',
    },
  ]

  // Three Core Skill Columns
  const skillColumns = [
    {
      name: 'BUILD & ARCHITECTURE',
      accent: 'border-accent/40 text-accent bg-accent/5',
      hoverColor: 'group-hover/skill:text-accent',
      items: [
        { name: 'React 19 / 18', note: 'Hooks, Concurrent Mode, Fiber architecture' },
        { name: 'JavaScript (ESNext)', note: 'Event loop, async/await, closures, DOM' },
        { name: 'Redux Toolkit', note: 'Centralized state slices & RTK Query' },
        { name: 'Semantic HTML5 & ARIA', note: 'Accessible landmarks, keyboard traps & microdata' },
      ],
    },
    {
      name: 'STYLE & MOTION',
      accent: 'border-brand-coral/40 text-brand-coral bg-brand-coral/5',
      hoverColor: 'group-hover/skill:text-brand-coral',
      items: [
        { name: 'Tailwind CSS v4', note: 'Custom theme tokens & container queries' },
        { name: 'Framer Motion', note: 'Physics springs & layout choreography' },
        { name: 'Responsive Systems', note: 'Fluid clamp() scaling across all viewports' },
        { name: 'Material UI / Headless', note: 'Component composition & design tokens' },
      ],
    },
    {
      name: 'TOOLS & PIPELINES',
      accent: 'border-brand-sage/40 text-brand-sage bg-brand-sage/5',
      hoverColor: 'group-hover/skill:text-brand-sage',
      items: [
        { name: 'Vite & Rollup', note: 'Instant HMR & chunk code-splitting' },
        { name: 'Git & GitHub Workflows', note: 'Feature branches, PR workflows & CI actions' },
        { name: 'REST & Web APIs', note: 'Fetch, Axios, resilient caching & polling' },
        { name: 'Web Performance (CWV)', note: 'LCP, CLS, INP optimization & Lighthouse' },
        { name: 'Three.js / WebGL', note: '3D spatial geometry & studio lighting' },
        { name: 'Cloudflare Workers', note: 'Edge deployment & serverless functions' },
      ],
    },
  ]

  return (
    <section id="stack" className="py-20 sm:py-28 bg-bg border-b border-border relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block mb-3">
            Capabilities & Stack
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
            Engineering tools organized by architectural domain.
          </h2>
        </div>

        {/* ================= CENTRAL STACK MAP VISUALIZATION ================= */}
        <div className="mb-16 sm:mb-20 p-5 sm:p-8 rounded-3xl border border-border bg-surface shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <span className="font-display font-bold text-sm tracking-tight text-text-primary uppercase">
                Frontend Architecture Map
              </span>
            </div>
            <span className="font-mono text-xs text-text-muted hidden sm:inline">
              Select layer to inspect details
            </span>
          </div>

          {/* Interactive Flow Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {stackMap.map((node, i) => {
              const isActive = activeStackNode === i

              return (
                <div
                  key={node.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onClick={() => setActiveStackNode(i)}
                  onMouseEnter={() => setActiveStackNode(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActiveStackNode(i)
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent ${
                    isActive
                      ? `${node.color} shadow-sm -translate-y-1`
                      : 'bg-surface-subtle/60 border-border hover:border-border-strong text-text-secondary'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-2">
                    <span className="font-bold">{node.step}</span>
                    <span className="text-[10px] uppercase font-medium">{node.title}</span>
                  </div>

                  <div className="font-display font-bold text-sm text-text-primary mb-1">
                    {node.tech}
                  </div>

                  <p className="font-sans text-xs text-text-secondary leading-snug">
                    {node.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ================= THREE SKILL COLUMNS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {skillColumns.map((col) => (
            <div
              key={col.name}
              className="p-6 sm:p-7 rounded-2xl border border-border bg-surface shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Column Title with Brand Accent */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
                  <h3 className="font-display font-bold text-sm tracking-tight text-text-primary">
                    {col.name}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${col.accent}`}>
                    {col.items.length} ITEMS
                  </span>
                </div>

                {/* Skill List with Restrained Hover Feedback */}
                <div className="space-y-3.5">
                  {col.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/skill flex flex-col py-1 border-b border-border-subtle transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-sans font-semibold text-sm text-text-primary transition-colors ${col.hoverColor}`}>
                          {skill.name}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-border-strong group-hover/skill:bg-accent transition-colors" />
                      </div>
                      <span className="font-sans text-xs text-text-muted mt-0.5">
                        {skill.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="pt-5 mt-6 border-t border-border flex items-center justify-between font-mono text-[11px] text-text-muted">
                <span>PRODUCTION READY</span>
                <CheckCircle2 size={14} className="text-emerald-500" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
