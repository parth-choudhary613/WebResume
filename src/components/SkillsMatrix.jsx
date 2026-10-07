import React, { useState } from 'react'
import { Layers, Palette, Terminal, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function SkillsMatrix() {
  const [activeStackNode, setActiveStackNode] = useState(0)

  // Central Stack Map Stages (Section 30)
  const stackMap = [
    {
      id: 'core',
      step: '01',
      title: 'Core Engine',
      tech: 'React 19 & Next.js',
      desc: 'Component architecture, Virtual DOM & Server components',
      color: 'border-brand-blue bg-surface-blue text-brand-blue',
    },
    {
      id: 'type',
      step: '02',
      title: 'Type Safety',
      tech: 'TypeScript & ESNext',
      desc: 'Strict contracts, interfaces & predictable data shapes',
      color: 'border-brand-blue bg-surface-blue text-brand-blue',
    },
    {
      id: 'style',
      step: '03',
      title: 'Styling & Tokens',
      tech: 'Tailwind & Modern CSS',
      desc: 'Fluid clamp typography, container queries & layout containment',
      color: 'border-brand-coral bg-surface-coral text-brand-coral',
    },
    {
      id: 'motion',
      step: '04',
      title: 'Interaction',
      tech: 'Framer Motion & WebGL',
      desc: 'Tactile spring dynamics & 3D spatial interface elements',
      color: 'border-brand-sage bg-surface-sage text-emerald-700 dark:text-brand-sage',
    },
    {
      id: 'tooling',
      step: '05',
      title: 'Delivery',
      tech: 'Vite & Cloudflare',
      desc: 'Optimized bundle budgets, edge deploys & Core Web Vitals',
      color: 'border-brand-yellow bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-brand-yellow',
    },
  ]

  // Three Core Skill Columns (Section 29)
  const skillColumns = [
    {
      name: 'BUILD',
      accent: 'border-brand-blue text-brand-blue',
      hoverColor: 'group-hover/skill:text-brand-blue',
      items: [
        { name: 'React 19 / 18', note: 'Hooks, Concurrent Mode, Fiber architecture' },
        { name: 'Next.js', note: 'App Router, SSR, Server actions & optimization' },
        { name: 'TypeScript', note: 'Generics, strict typing, design tokens' },
        { name: 'JavaScript (ESNext)', note: 'Event loop, async/await, closures, DOM' },
        { name: 'Redux Toolkit', note: 'Centralized state slices & RTK Query' },
        { name: 'Semantic HTML5', note: 'Accessible landmarks & microdata' },
      ],
    },
    {
      name: 'STYLE & MOTION',
      accent: 'border-brand-coral text-brand-coral',
      hoverColor: 'group-hover/skill:text-brand-coral',
      items: [
        { name: 'Tailwind CSS', note: 'Custom theme tokens & container queries' },
        { name: 'CSS Architecture', note: 'CSS Variables, Grid, Subgrid & Flexbox' },
        { name: 'Framer Motion', note: 'Physics springs & layout choreography' },
        { name: 'Responsive Systems', note: 'Fluid clamp() scaling across all devices' },
        { name: 'Material UI', note: 'Component composition & headless patterns' },
        { name: 'Web Animations API', note: 'Hardware-accelerated CSS keyframes' },
      ],
    },
    {
      name: 'TOOLS & PIPELINES',
      accent: 'border-brand-sage text-emerald-700 dark:text-brand-sage',
      hoverColor: 'group-hover/skill:text-emerald-600 dark:group-hover/skill:text-brand-sage',
      items: [
        { name: 'Vite', note: 'Instant HMR & Rollup chunk optimization' },
        { name: 'Git & GitHub', note: 'Feature branches, PR workflows & CI actions' },
        { name: 'REST & Web APIs', note: 'Fetch, Axios, resilient caching & polling' },
        { name: 'Web Performance (CWV)', note: 'LCP, CLS, INP optimization & Lighthouse' },
        { name: 'Three.js / WebGL', note: '3D spatial geometry & studio lighting' },
        { name: 'Cloudflare Workers', note: 'Edge deployment & serverless functions' },
      ],
    },
  ]

  return (
    <section id="stack" className="py-24 sm:py-32 bg-bg border-b border-border relative">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-semibold block mb-3">
            Capabilities & Stack
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
            Engineering tools organized by architectural domain.
          </h2>
        </div>

        {/* ================= CENTRAL STACK MAP VISUALIZATION (Section 30) ================= */}
        <div className="mb-20 p-6 sm:p-8 rounded-3xl border border-border bg-surface shadow-xs">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
              <span className="font-display font-bold text-sm tracking-tight text-text-primary uppercase">
                Frontend Architecture Map
              </span>
            </div>
            <span className="font-mono text-xs text-text-muted hidden sm:inline">
              Hover to inspect layer
            </span>
          </div>

          {/* Interactive Flow Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {stackMap.map((node, i) => {
              const isActive = activeStackNode === i

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setActiveStackNode(i)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? `${node.color} shadow-sm -translate-y-1`
                      : 'bg-surface-subtle/50 border-border hover:border-text-secondary/40'
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-2">
                    <span className="font-semibold">{node.step}</span>
                    <span className="text-[10px] opacity-75 uppercase">{node.title}</span>
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

        {/* ================= THREE SKILL COLUMNS (Section 29) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {skillColumns.map((col) => (
            <div
              key={col.name}
              className="p-6 sm:p-8 rounded-2xl border border-border bg-surface shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* Column Title with Brand Accent */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-border">
                  <h3 className="font-display font-bold text-base tracking-tight text-text-primary">
                    {col.name}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold border ${col.accent}`}>
                    6 ITEMS
                  </span>
                </div>

                {/* Skill List with Restrained Hover Feedback */}
                <div className="space-y-4">
                  {col.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/skill flex flex-col py-1 border-b border-border-subtle/60 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className={`font-sans font-semibold text-sm text-text-primary transition-colors ${col.hoverColor}`}>
                          {skill.name}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-border-strong group-hover/skill:bg-brand-blue transition-colors" />
                      </div>
                      <span className="font-sans text-xs text-text-muted mt-0.5">
                        {skill.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="pt-6 mt-6 border-t border-border-subtle flex items-center justify-between font-mono text-[11px] text-text-muted">
                <span>PRODUCTION READY</span>
                <CheckCircle2 size={13} className="text-emerald-500" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
