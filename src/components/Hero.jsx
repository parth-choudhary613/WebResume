import React, { Suspense, lazy } from 'react'
import { ArrowRight, ArrowUpRight } from "lucide-react";

const FrontendCore3D = lazy(() => import('./FrontendCore3D'))

export default function Hero({ dark }) {
  return (
    <section
      id="top"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center pt-24 pb-16 sm:pb-20 hero-atmosphere overflow-hidden"
    >
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 w-full">
        
        {/* Asymmetrical 52% / 48% Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-14 items-center">
          
          {/* ================= LEFT: IDENTITY & EXPRESSIVE HEADLINE (52%) ================= */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center z-10">
            
            {/* Top Status Capsule */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-medium text-text-secondary w-fit mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for opportunities</span>
              <span className="text-border-strong">•</span>
              <span className="text-text-muted text-[11px] font-mono">India</span>
            </div>

            {/* Expressive Display Headline with Personality */}
          <div className="relative max-w-3xl">
  {/* Small personal marker */}
  <div className="mb-7 flex items-center gap-3">
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-sage/50" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-sage" />
    </span>

    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
      Frontend Engineer · Building for the web
    </span>
  </div>

  {/* Hero */}
  <h1
    className="
      font-display
      text-[3.25rem]
      sm:text-[4.8rem]
      xl:text-[6.2rem]
      font-bold
      tracking-[-0.055em]
      leading-[0.92]
      text-text-primary
      max-w-[950px]
    "
  >
    I build interfaces
    <span className="block">
      that{" "}
      <span className="relative inline-block text-brand-blue">
        feel alive.

        <svg
          aria-hidden="true"
          viewBox="0 0 260 18"
          className="
            absolute
            -bottom-2
            left-0
            w-full
            h-3
            overflow-visible
            text-brand-coral
          "
          fill="none"
        >
          <path
            d="M3 12C52 3 98 16 145 9C187 3 219 5 257 2"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.8"
          />
        </svg>
      </span>
    </span>
  </h1>

  {/* Positioning */}
  <div className="mt-8 sm:mt-10 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-14">
    <p
      className="
        max-w-xl
        font-sans
        text-base
        sm:text-lg
        leading-[1.75]
        text-text-secondary
      "
    >
      I’m a frontend engineer obsessed with the small details people
      actually feel — motion, responsiveness, hierarchy and speed.
      Currently building with{" "}
      <span className="text-text-primary font-medium">
        React, JavaScript and Three.js
      </span>
      .
    </p>

    {/* Tiny signature detail */}
    <div className="hidden lg:block shrink-0 pb-1">
      <div className="font-mono text-[10px] leading-5 text-text-muted">
        <div>UI / ENGINEERING</div>
        <div>MOTION / SYSTEMS</div>
        <div className="text-brand-blue">DETAILS / ALWAYS</div>
      </div>
    </div>
  </div>

  {/* CTAs */}
  <div className="mt-9 flex flex-wrap items-center gap-3">
    <a
      href="#work"
      className="
        group
        relative
        inline-flex
        items-center
        gap-3
        overflow-hidden
        rounded-full
        bg-text-primary
        px-6
        py-3.5
        font-sans
        text-sm
        font-semibold
        text-surface
        transition-transform
        duration-300
        ease-out
        hover:-translate-y-1
      "
    >
      <span
        className="
          absolute
          inset-0
          translate-y-full
          bg-brand-blue
          transition-transform
          duration-300
          ease-[cubic-bezier(0.22,1,0.36,1)]
          group-hover:translate-y-0
        "
      />

      <span className="relative z-10">See selected work</span>

      <span
        className="
          relative
          z-10
          flex
          h-6
          w-6
          items-center
          justify-center
          rounded-full
          bg-white/10
        "
      >
        <ArrowUpRight
          size={13}
          className="
            transition-transform
            duration-300
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
          "
        />
      </span>
    </a>

    <a
      href="#contact"
      className="
        group
        inline-flex
        items-center
        gap-2.5
        rounded-full
        px-5
        py-3.5
        font-sans
        text-sm
        font-medium
        text-text-secondary
        transition-colors
        duration-300
        hover:text-text-primary
      "
    >
      <span
        className="
          relative
          after:absolute
          after:left-0
          after:-bottom-1
          after:h-px
          after:w-0
          after:bg-brand-coral
          after:transition-all
          after:duration-300
          group-hover:after:w-full
        "
      >
        Start a conversation
      </span>

      <ArrowRight
        size={14}
        className="
          text-text-muted
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
      />
    </a>
  </div>

  {/* Bottom micro-detail */}
  <div
    className="
      mt-14
      sm:mt-16
      flex
      flex-wrap
      items-center
      gap-x-7
      gap-y-3
      border-t
      border-border/60
      pt-5
      font-mono
      text-[10px]
      uppercase
      tracking-[0.14em]
      text-text-muted
    "
  >
    <span className="flex items-center gap-2">
      <span className="h-px w-5 bg-brand-blue" />
      React / JavaScript
    </span>

    <span className="flex items-center gap-2">
      <span className="h-px w-5 bg-brand-coral" />
      Motion & Interaction
    </span>

    <span className="flex items-center gap-2">
      <span className="h-px w-5 bg-brand-sage" />
      Three.js
    </span>

    <span className="ml-auto hidden sm:inline text-text-muted/60">
      © {new Date().getFullYear()}
    </span>
  </div>
  </div>
</div>
          {/* ================= RIGHT: 3D FRONTEND CORE & PORTRAIT INTEGRATION (48%) ================= */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Coral / Blue Backing Glow */}
            <div className="absolute pointer-events-none" />

            <div className="relative w-full max-w-[520px]  p-30 sm:p-4  overflow-hidden">
              
              {/* Top Frame Bar */}
           

              {/* 3D Canvas Container */}
              <div className="relative w-full overflow-hidden">
                <Suspense
                  fallback={
                    <div className="w-full h-[360px] sm:h-[440px] flex items-center justify-center font-mono text-xs text-text-muted">
                      Initializing 3D Core...
                    </div>
                  }
                >
                  <FrontendCore3D dark={dark} />
                </Suspense>
              </div>

              {/* Real Portrait Integrated Beneath 3D Canvas with Warm Editorial Styling */}
             

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
