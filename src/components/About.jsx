import React from 'react'
import { GraduationCap, MapPin, Heart, Compass, Mountain, Music, Car } from 'lucide-react'
import { educationData } from '../data/portfolioData'
import NearViewportPortrait from './NearViewportPortrait'
import Text from './Text/Text'

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-surface-subtle/30 border-b border-border relative overflow-hidden">
      <Text />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 mt-12 sm:mt-16">
        
        {/* Asymmetrical 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* ================= LEFT: 3D PORTRAIT STAGE ================= */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] p-3 sm:p-4 ">
              
              {/* Natural Color Portrait with Studio Stage Frame */}
              <div className="relative overflow-hidden">
                <NearViewportPortrait />
              </div>

              {/* Identity & Location Details Footer Badge */}
              <div className="mt-3 px-3 py-2 flex items-center justify-between font-mono text-[11px] text-text-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-accent" />
                  Himachal Pradesh, IN
                </span>
                <span className="text-[10px] uppercase tracking-wider text-text-secondary font-medium">
                  3D Viewport
                </span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT: STATEMENT + CONCISE COPY ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
     
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block mb-3">
              About & Background
            </span>
            
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-text-primary leading-snug mb-6">
              Engineering web interfaces with tactile precision and expressive fluid motion.
            </h2>

            <div className="space-y-4 font-sans text-base sm:text-lg text-text-secondary leading-relaxed font-normal mb-8">
              <p>
                I am a frontend developer based in the scenic foothills of <strong className="text-text-primary font-semibold">Himachal Pradesh, India</strong>. I believe great software isn't just fast and robust under the hood—it must feel delightful, responsive, and tactile to touch.
              </p>
              <p>
                Having engineered client-facing vendor platforms at <strong className="text-text-primary font-semibold">Omnicassion</strong> and optimized full-stack applications at <strong className="text-text-primary font-semibold">Excellence Technologies</strong> (boosting app speeds by 40%), I prioritize smooth rendering pipelines, modular component architectures, and responsive precision.
              </p>
              <p className="text-sm sm:text-base text-text-muted">
                Off-screen, you'll find me on late-night cruiser drives, hiking Himalayan trails, and listening to timeless 90s tracks.
              </p>
            </div>

            {/* Verified Education & Qualifications */}
            <div className="pt-6 border-t border-border">
              <div className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
                <GraduationCap size={15} className="text-accent" />
                <span>Verified Academic Credentials</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {educationData.slice(0, 2).map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-border bg-surface shadow-2xs hover:border-accent/40 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="font-semibold text-sm text-text-primary">
                        {edu.degree}
                      </span>
                      <span className="font-mono text-[11px] text-accent font-medium">
                        {edu.period.split(' ')[0]}
                      </span>
                    </div>
                    <span className="text-xs text-text-secondary block font-normal">
                      {edu.institution}
                    </span>
                    <span className="font-mono text-[11px] text-text-muted mt-1.5 block">
                      {edu.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
