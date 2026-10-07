import React from 'react'

export default function SectionHeader({
  number = "01",
  label = "SECTION",
  description = null,
  meta = null,
  className = "",
}) {
  return (
    <div className={`mb-12 md:mb-16 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b border-border">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs font-semibold text-accent tracking-wider">
            {number}
          </span>
          <span className="text-border-strong text-xs font-mono">/</span>
          <h2 className="font-mono text-xs tracking-[0.22em] uppercase font-medium text-text-primary">
            {label}
          </h2>
        </div>

        {meta && (
          <span className="font-mono text-[11px] tracking-wider text-text-muted uppercase">
            {meta}
          </span>
        )}
      </div>

      {description && (
        <p className="mt-4 text-sm sm:text-base text-text-secondary max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
