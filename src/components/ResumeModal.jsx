import React, { useEffect } from 'react'
import { X, Printer, Download, ExternalLink, Mail, Phone, MapPin, Globe } from 'lucide-react'
import { personalData, experienceData, educationData, skillsCategories } from '../data/portfolioData'

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs">
      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Parth Choudhary Résumé"
        className="relative w-full max-w-4xl max-h-[90vh] bg-surface border border-border rounded-xs shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Controls Header */}
        <div className="px-6 py-3.5 border-b border-border bg-surface-subtle flex items-center justify-between font-mono text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-xs bg-accent inline-block" />
            <span className="text-text-primary font-medium uppercase tracking-wider">
              CURRICULUM VITAE // PARTH CHOUDHARY
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-border hover:border-text-secondary rounded-xs text-text-primary transition-colors cursor-pointer"
              title="Print / Save as PDF"
            >
              <Printer size={13} />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-xs hover:bg-surface border border-transparent hover:border-border text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto font-sans text-text-primary space-y-8 bg-surface">
          
          {/* Resume Header */}
          <div className="border-b border-border pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                  {personalData.name}
                </h1>
                <p className="font-mono text-xs uppercase tracking-wider text-accent font-medium mt-1">
                  {personalData.role}
                </p>
              </div>

              <div className="font-mono text-xs text-text-muted sm:text-right space-y-0.5">
                <div>{personalData.location}</div>
                <div>{personalData.email}</div>
                <div>{personalData.phoneFormatted}</div>
              </div>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-text-secondary leading-relaxed max-w-2xl">
              Frontend Engineer with extensive experience in React, TypeScript, and modern frontend architecture. Proven record of enhancing web performance (up to 40% speed optimization), architecting responsive vendor portals, and building clean, modular component systems.
            </p>
          </div>

          {/* Experience Section */}
          <div>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent mb-4 border-b border-border-subtle pb-1">
              Work Experience
            </h2>

            <div className="space-y-6">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                    <h3 className="font-semibold text-sm sm:text-base text-text-primary">
                      {exp.role} <span className="font-normal text-text-secondary">— {exp.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-text-muted">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="list-disc list-inside text-xs text-text-secondary space-y-1 pl-1">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>

                  <div className="font-mono text-[11px] text-text-muted pt-1">
                    Tech: {exp.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Qualifications */}
          <div>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent mb-4 border-b border-border-subtle pb-1">
              Education & Formal Qualifications
            </h2>

            <div className="space-y-4">
              {educationData.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs sm:text-sm">
                  <div>
                    <span className="font-semibold text-text-primary">{edu.degree}</span>
                    <span className="text-text-secondary"> — {edu.institution}</span>
                    <div className="font-mono text-[11px] text-text-muted mt-0.5">
                      {edu.grade} • {edu.focus}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-text-muted whitespace-nowrap mt-1 sm:mt-0">
                    {edu.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div>
            <h2 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent mb-4 border-b border-border-subtle pb-1">
              Core Technical Competencies
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              {skillsCategories.map((group) => (
                <div key={group.category} className="p-3 border border-border-subtle bg-surface-subtle rounded-xs">
                  <span className="font-semibold text-text-primary block uppercase mb-1.5">
                    {group.category}
                  </span>
                  <p className="text-text-secondary text-[11px] leading-relaxed">
                    {group.skills.map((s) => s.name).join(' • ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-border bg-surface-subtle flex items-center justify-between font-mono text-[11px] text-text-muted">
          <span>PARTH CHOUDHARY // RESUME_DATA</span>
          <button
            onClick={onClose}
            className="text-text-primary hover:text-accent font-medium cursor-pointer"
          >
            Close View [Esc]
          </button>
        </div>

      </div>
    </div>
  )
}
