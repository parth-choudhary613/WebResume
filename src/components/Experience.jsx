import React from 'react'
import SectionHeader from './SectionHeader'
import { experienceData } from '../data/portfolioData'

export default function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28 border-b border-border bg-bg">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <SectionHeader
          number="05"
          label="WORK EXPERIENCE"
          meta="PROFESSIONAL CHRONOLOGY"
          description="Track record of engineering production web applications, optimizing data pipelines, and implementing modular frontend architectures."
        />

        {/* Editorial Vertical List with Thin Hairline Rules */}
        <div className="border-t border-border">
          {experienceData.map((exp, idx) => (
            <div
              key={idx}
              className="py-10 sm:py-14 border-b border-border grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12"
            >
              {/* Left Column: Timeline & Metadata (4 cols) */}
              <div className="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-sm font-semibold text-accent tracking-wider mb-1">
                    {exp.period}
                  </div>
                  <div className="font-mono text-xs text-text-muted uppercase tracking-widest flex items-center gap-2">
                    <span>{exp.type}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </div>
                </div>

                <div className="hidden lg:block pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-surface border border-border-subtle rounded-xs font-mono text-[10px] text-text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Role, Company & Contributions (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight">
                    {exp.role}
                  </h3>
                  <p className="font-mono text-xs uppercase tracking-wider text-text-secondary mt-0.5">
                    {exp.company}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-normal">
                  {exp.description}
                </p>

                {/* Specific technical achievements */}
                <ul className="space-y-2 pt-2">
                  {exp.highlights.map((item, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Mobile Tech Tags */}
                <div className="lg:hidden pt-4 flex flex-wrap gap-1.5">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 bg-surface border border-border-subtle rounded-xs font-mono text-[10px] text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
