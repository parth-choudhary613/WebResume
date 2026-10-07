import React from 'react'

// Lightweight, instant-rendering architectural technical blueprint
export default function ArchitecturalFallback({ dark }) {
  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-6 font-mono text-xs text-text-muted select-none">
      <div className="w-full max-w-[280px] p-5 border border-border bg-surface/60 rounded-xs space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-border pb-2 text-[10px] tracking-wider text-text-secondary uppercase">
          <span>INTERFACE ARCHITECTURE</span>
          <span className="text-accent font-semibold">REACT 19</span>
        </div>
        
        {/* Layer 1: Viewport */}
        <div className="p-2.5 border border-border-strong bg-surface rounded-xs">
          <div className="flex justify-between items-center text-[10px] text-text-primary font-medium">
            <span>01 / RENDERED VIEWPORT</span>
            <span className="text-accent">DOM</span>
          </div>
        </div>

        {/* Connector */}
        <div className="h-3 border-l border-dashed border-border-strong ml-6" />

        {/* Layer 2: Reconciler */}
        <div className="p-2.5 border border-accent/40 bg-accent-subtle/30 rounded-xs">
          <div className="flex justify-between items-center text-[10px] text-text-primary font-medium">
            <span>02 / COMPONENT RECONCILER</span>
            <span className="text-accent">FIBER</span>
          </div>
        </div>

        {/* Connector */}
        <div className="h-3 border-l border-dashed border-border-strong ml-6" />

        {/* Layer 3: State */}
        <div className="p-2.5 border border-border-strong bg-surface rounded-xs">
          <div className="flex justify-between items-center text-[10px] text-text-primary font-medium">
            <span>03 / ATOMIC STATE STORE</span>
            <span className="text-text-muted">DATA</span>
          </div>
        </div>
      </div>
    </div>
  )
}
