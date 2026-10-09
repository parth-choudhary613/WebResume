import React from 'react'
import { GraduationCap, MapPin, Heart, Compass, Mountain, Music, Car } from 'lucide-react'
import { educationData } from '../data/portfolioData'
import NearViewportPortrait from './NearViewportPortrait'
import Text from './Text/Text'

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-surface-subtle/40 border-y border-border relative">
           <Text/>
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Asymmetrical 2-Column Layout (Section 27) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ================= LEFT: LARGE PORTRAIT WITH WARM CORAL BACKGROUND ================= */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative h-full max-w-[440px] p-12 sm:p-5 ">
              
              {/* Natural Color Portrait with Warm Tone */}
              <div className="relative aspect-4/5  overflow-hidden ">
                 <NearViewportPortrait />
              </div>

              {/* Identity & Location Details */}
           
  

            </div>
          </div>

          {/* ================= RIGHT: STATEMENT + PLAYFUL SVG ACCENT + CONCISE COPY ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
     
            <span className="font-mono text-xs uppercase tracking-widest text-brand-coral font-semibold block mb-3">
              About & Background
            </span>
            {/* Large Statement with ONE Handcrafted SVG Underline (Section 28) */}
            {/* Concise Human Copy (Section 27) */}
            <div className="space-y-4 font-sans text-base sm:text-lg text-text-secondary leading-relaxed font-normal mb-8">
              <p>
                I am a frontend developer based in the scenic foothills of <strong className="text-text-primary font-semibold">Himachal Pradesh, India</strong>. I believe great software isn't just fast and robust under the hood—it must feel delightful and tactile to touch.
              </p>
              <p>
                Having engineered client-facing vendor platforms at <strong className="text-text-primary font-semibold">Omnicassions</strong> and optimized full-stack applications at <strong className="text-text-primary font-semibold">Excellence Technologies</strong> (boosting app speeds by 40%), I prioritize smooth rendering pipelines, modular component architectures, and responsive precision.
              </p>
              <p className="text-sm sm:text-base text-text-muted">
                Off-screen, I'm captivated by mechanical engineering: following automotive designs, late-night cruiser drives, hiking Himalayan mountain trails, and listening to timeless 90s tracks.
              </p>
            </div>

            {/* Verified Education & Qualifications */}
            <div className="pt-6 border-t border-border/80">
              <div className="font-mono text-xs uppercase tracking-wider text-text-muted mb-4 flex items-center gap-2">
                <GraduationCap size={15} className="text-brand-blue" />
                <span>Verified Academic Credentials</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {educationData.slice(0, 2).map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-border bg-surface shadow-2xs hover:border-brand-blue/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-sm text-text-primary">
                        {edu.degree}
                      </span>
                      <span className="font-mono text-[11px] text-brand-blue font-medium">
                        {edu.period.split(' ')[0]}
                      </span>
                    </div>
                    <span className="text-xs text-text-secondary block">
                      {edu.institution}
                    </span>
                    <span className="font-mono text-[11px] text-text-muted mt-1 block">
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
