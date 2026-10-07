import React, { useState } from 'react'
import { ExternalLink, Github, ArrowUpRight, Lock, Sparkles } from 'lucide-react'
import { projectsData } from '../data/portfolioData'

export default function ProjectShowcase() {
  const [hoveredCard, setHoveredCard] = useState(null)

  // Surface tint mappings for rhythm (Section 23)
  const surfaceStyles = [
    {
      cardBg: 'bg-surface-blue border-brand-blue/20',
      badgeBg: 'bg-brand-blue text-white',
      accentColor: 'text-brand-blue',
      btnBg: 'bg-brand-blue hover:bg-brand-blue-hover text-white',
    },
    {
      cardBg: 'bg-surface-coral border-brand-coral/20',
      badgeBg: 'bg-brand-coral text-white',
      accentColor: 'text-brand-coral',
      btnBg: 'bg-brand-coral hover:bg-brand-coral-hover text-white',
    },
    {
      cardBg: 'bg-surface-sage border-brand-sage/20',
      badgeBg: 'bg-brand-sage text-white',
      accentColor: 'text-emerald-700 dark:text-brand-sage',
      btnBg: 'bg-brand-sage hover:opacity-90 text-white',
    },
    {
      cardBg: 'bg-surface border-border',
      badgeBg: 'bg-text-primary text-bg',
      accentColor: 'text-brand-blue',
      btnBg: 'bg-brand-blue hover:bg-brand-blue-hover text-white',
    },
  ]

  return (
    <section id="work" className="py-24 sm:py-32 bg-bg relative">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header with Creative Hierarchy */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <span className="font-mono text-xs uppercase tracking-widest text-brand-blue font-semibold block mb-3">
            Selected Work
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-tight">
            Crafted for performance, interaction & visual detail.
          </h2>
        </div>

        {/* Large Alternating Product Showcases (Section 23 & 24) */}
        <div className="space-y-16 sm:space-y-24">
          {projectsData.map((project, idx) => {
            const isReversed = idx % 2 === 1
            const style = surfaceStyles[idx % surfaceStyles.length]
            const isHovered = hoveredCard === project.id

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`p-6 sm:p-10 lg:p-12 rounded-3xl border transition-all duration-300 ${style.cardBg} shadow-xs hover:shadow-md`}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center ${
                    isReversed ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  
                  {/* Visual Column (~60%) */}
                  <div
                    className={`lg:col-span-7 ${
                      isReversed ? 'lg:col-start-6' : 'lg:col-start-1'
                    }`}
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group/preview cursor-pointer"
                      aria-label={`View ${project.title}`}
                    >
                      {/* Minimal Browser Frame (Section 24) */}
                      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-surface shadow-md overflow-hidden transition-all duration-300 group-hover/preview:-translate-y-1.5 group-hover/preview:shadow-xl">
                        
                        {/* Browser Header Bar */}
                        <div className="h-9 px-4 bg-surface-subtle/80 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
                          </div>

                          <div className="px-3 py-0.5 rounded-md bg-surface text-[11px] font-mono text-text-muted truncate max-w-[220px]">
                            {project.title.toLowerCase()}.parth.dev
                          </div>

                          <ArrowUpRight
                            size={14}
                            className="text-text-muted group-hover/preview:text-brand-blue group-hover/preview:translate-x-0.5 group-hover/preview:-translate-y-0.5 transition-all"
                          />
                        </div>

                        {/* Project Screenshot with Subtle Scale */}
                        <div className="aspect-16/10 sm:aspect-16/9 bg-surface overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/preview:scale-[1.015]"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </a>
                  </div>

                  {/* Project Details Column (~40%) */}
                  <div
                    className={`lg:col-span-5 ${
                      isReversed ? 'lg:col-start-1' : 'lg:col-start-8'
                    } flex flex-col justify-center`}
                  >
                    {/* Badge & Year */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${style.badgeBg}`}>
                        {project.badge}
                      </span>
                      <span className="font-mono text-xs text-text-muted">
                        {project.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-text-primary mb-2">
                      {project.title}
                    </h3>

                    {/* Subtitle / Strong one-liner (Section 25) */}
                    <p className="font-sans text-base text-text-secondary leading-relaxed mb-6 font-normal">
                      {project.tagline}
                    </p>

                    {/* Role & Problem Context */}
                    <div className="space-y-3 py-4 border-y border-black/10 dark:border-white/10 mb-6 text-sm text-text-secondary">
                      <div className="flex items-baseline justify-between font-mono text-xs">
                        <span className="text-text-muted uppercase">ROLE</span>
                        <span className="text-text-primary font-medium">{project.role}</span>
                      </div>
                      <div className="font-sans text-xs sm:text-sm text-text-secondary">
                        <strong className="text-text-primary font-medium">Challenge: </strong>
                        {project.problem}
                      </div>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 bg-surface/90 border border-border/70 rounded-lg font-mono text-xs text-text-primary font-medium shadow-2xs"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-sans text-xs font-semibold shadow-xs hover:-translate-y-0.5 transition-all ${style.btnBg}`}
                      >
                        <span>Live Experience</span>
                        <ExternalLink size={13} />
                      </a>

                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-sans text-xs font-semibold bg-surface border border-border text-text-primary hover:border-text-secondary transition-colors"
                        >
                          <Github size={14} />
                          <span>Code</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-2 text-text-muted text-xs font-mono">
                          <Lock size={12} />
                          <span>Proprietary</span>
                        </span>
                      )}
                    </div>

                  </div>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
