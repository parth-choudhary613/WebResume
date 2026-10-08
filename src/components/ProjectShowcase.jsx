import React, { useState } from "react";
import {
  Sparkle,
  ArrowUpRight,
  Figma,
  Framer,
  Palette,
  PenTool,
  Layers,
  Type,
  Aperture,
  Chrome,
  Camera,
  Brush,
  Box,
  Wand2,
  Copy,
  Check,
  X,
  Cat,
  Phone,
  Calendar,
  MessageSquare,
} from "lucide-react";
import Humflow from "../components/assets/humflow.png";
import Personal from "../components/assets/PersonalPortfolio.png";
import Agrovision from "../components/assets/AgroVision.png";
import Vendorprofile from "../components/assets/vendorprofile.png";


const SOFTWARE_ROW_1 = [
  { id: "figma-1", name: "Figma", Icon: Figma },
  { id: "framer-1", name: "Framer", Icon: Framer },
  { id: "palette-1", name: "Color Palette", Icon: Palette },
  { id: "pentool-1", name: "Vector Pen", Icon: PenTool },
  { id: "layers-1", name: "Layer Comps", Icon: Layers },
  { id: "type-1", name: "Typography", Icon: Type },
  { id: "aperture-1", name: "Optics & Lens", Icon: Aperture },
  { id: "chrome-1", name: "Web DevTools", Icon: Chrome },
];

const SOFTWARE_ROW_2 = [
  { id: "camera-2", name: "Photography", Icon: Camera },
  { id: "brush-2", name: "Digital Art", Icon: Brush },
  { id: "box-2", name: "3D Spatial Box", Icon: Box },
  { id: "wand-2", name: "Procedural VFX", Icon: Wand2 },
  { id: "figma-2", name: "Figma Pro", Icon: Figma },
  { id: "framer-2", name: "Framer Code", Icon: Framer },
  { id: "type-2", name: "Typeface Design", Icon: Type },
  { id: "layers-2", name: "Design Systems", Icon: Layers },
];

const INITIAL_FORM = {
  name: "",
  eCat: "",
  scope: "Brand & Visual Systems",
  timeline: "Q2 2026",
  message: "",
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [activeSoftware, setActiveSoftware] = useState(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState(INITIAL_FORM);

  const handleCopy = (text, fieldName, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Demo-only success state. Connect a backend or eCat service to send data.
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setIsModalOpen(false);
      setInquiryForm(INITIAL_FORM);
    }, 2400);
  };

  return (
    <main className="min-h-screen lg:h-screen w-full bg- text-white flex flex-col justify-between px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 md:py-10 antialiased overflow-y-auto lg:overflow-hidden font-sans">
      {/* Top header row */}
      <header className="w-full flex flex-col md:flex-row md:items-start justify-between gap-6 shrink-0 mb-6 md:mb-7">
        <div className="max-w-3xl">
          <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.15] font-normal tracking-tight text-white mb-3">
            Here's my work
          </h1>
          <p className="text-sm md:text-[15px] leading-[1.6] text-white/60">
            A collection of ideas brought to life through creativity, clean
            design, and thoughtful development. Explore what I’ve built, one
            project at a time.{" "}
          </p>
        </div>

        <div className="shrink-0 flex items-center">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            aria-label="Open contact and collaboration modal"
            className="liquid-glass group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap shadow-lg shadow-black/40"
          >
            <Sparkle
              className="h-3.5 w-3.5 text-white/60 group-hover:text-white transition-colors"
              strokeWidth={1.5}
            />
            <span>Let's Team Up Today</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              strokeWidth={1.5}
            />
          </button>
        </div>
      </header>

      {/* Three-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 flex-1 min-h-0 w-full">
        {/* Column 1: Background */}
        <section
          aria-label="Career Background"
          className="relative rounded-2xl bg-black overflow-hidden flex flex-col justify-between h-full min-h-[400px] md:min-h-[460px] lg:min-h-0 border border-white/[0.08]"
        >
          <img
            src={Humflow}
            alt="Humflow project showcase"
            className=" absolute inset-0
    w-full h-full
    object-cover
    brightness-[0.65]
    saturate-[0.70]
    transition-transform
    duration-700
    group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90 pointer-events-none" />

          <div className="relative z-10 pt-5 md:pt-6 px-5 md:px-6 flex items-center justify-center gap-2">
            <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/70 font-medium select-none">
              HumFlow
            </span>
            <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
          </div>

          <div className="relative z-10 p-5 md:p-6 lg:p-7">
            <div className="liquid-glass rounded-xl p-4 sm:p-4.5 bg-black/40 backdrop-blur-md border border-white/[0.08]">
          
            </div>
          </div>
        </section>

        {/* Column 2: Testimonial and impact */}
        <div className="grid grid-rows-[auto_1fr] gap-4 md:gap-5 h-full min-h-[460px] lg:min-h-0">
          <section
            aria-label="Featured Project"
            className="group relative rounded-2xl bg-[#172626]
    min-h-[220px] overflow-hidden flex flex-col
    justify-between border border-white/[0.08]"
          >
            {/* Project Background Image */}
            <img
              src={Personal}
              alt="My project preview"
              className="absolute inset-0 w-full h-full
      object-cover brightness-[0.60] saturate-[0.70]
      transition-transform duration-700
      group-hover:scale-[1.02]"
            />

            {/* Dark Gradient Overlay */}
            <div
              className="absolute inset-0
      bg-gradient-to-t
      from-black/90 via-black/50 to-black/30
      pointer-events-none"
            />

            {/* Top Label */}
            <div className="relative z-10 flex items-center gap-2 p-5 md:p-6">
              <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
              <span className="text-[11px] uppercase tracking-[0.22em] text-white/70">
                FEATURED PROJECT
              </span>
              <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
            </div>

            {/* Project Details */}
            <div className="relative z-10 p-5 md:p-6">
              <h3 className="text-lg font-medium text-white mb-1">
                Personal Portfolio
              </h3>

              <div className="flex items-center justify-between border-t border-white/15 pt-3">
                <span className="text-xs text-white/60">
                  React • Tailwind CSS • JavaScript
                </span>

                <a
                  href="https://webresume-bzt.pages.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View project on GitHub"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </section>

          <section
            aria-label="Impact Metric"
            className="relative rounded-2xl bg-black overflow-hidden flex flex-col items-center justify-center p-5 md:p-6 border border-white/[0.08] min-h-[200px]"
          >
            <img
              src={Agrovision}
              alt="AI AgroVision project preview"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.65] saturate-[0.70] transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/50 pointer-events-none" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-light tracking-tight text-white drop-shadow-lg leading-none select-none">
                AI
              </span>
              <p className="mt-2 text-sm sm:text-base text-white/85 tracking-normal font-normal">
                AgroVision
              </p>
            </div>
          </section>
        </div>

        {/* Column 3: Software and contact */}
        <div className="grid grid-rows-[1fr_auto] md:col-span-2 lg:col-span-1 gap-4 md:gap-5 h-full min-h-[460px] lg:min-h-0">
          <section
            aria-label="Daily Software"
            className="relative rounded-2xl bg-black overflow-hidden flex flex-col justify-between py-5 md:py-6 border border-white/[0.08] min-h-[260px] lg:min-h-0"
          >
            <img
              src={Vendorprofile}
              alt="Daily software showcase background"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.65] saturate-[0.70] transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-center gap-2 px-5">
              <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
              <span className="text-[11px] uppercase tracking-[0.22em] text-white/70 font-medium select-none">
                VendorProfile
              </span>
              <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
            </div>
            <div className="relative z-10 px-5 text-center h-4">
              <span className="text-[11px] text-white/60 transition-opacity duration-200">
                {activeSoftware ? `Toolkit item: ${activeSoftware}` : ""}
              </span>
            </div>

            <div className="relative z-10 flex flex-col gap-3 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
              <div className="flex w-max animate-marquee-left gap-3">
                {[...SOFTWARE_ROW_1, ...SOFTWARE_ROW_1].map((item, idx) => {
                  const Icon = item.Icon;
                  return (
                    <div
                      key={`r1-${idx}`}
                      onMouseEnter={() => setActiveSoftware(item.name)}
                      onMouseLeave={() => setActiveSoftware(null)}
                      title={item.name}
                      className="liquid-glass h-14 w-14 md:h-16 md:w-16 rounded-xl flex items-center justify-center text-white/85 hover:text-white transition-all duration-200 hover:scale-105 cursor-pointer shrink-0"
                    >
                      <Icon
                        className="h-6 w-6 md:h-7 md:w-7"
                        strokeWidth={1.5}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex w-max animate-marquee-right gap-3">
                {[...SOFTWARE_ROW_2, ...SOFTWARE_ROW_2].map((item, idx) => {
                  const Icon = item.Icon;
                  return (
                    <div
                      key={`r2-${idx}`}
                      onMouseEnter={() => setActiveSoftware(item.name)}
                      onMouseLeave={() => setActiveSoftware(null)}
                      title={item.name}
                      className="liquid-glass h-14 w-14 md:h-16 md:w-16 rounded-xl flex items-center justify-center text-white/85 hover:text-white transition-all duration-200 hover:scale-105 cursor-pointer shrink-0"
                    >
                      <Icon
                        className="h-6 w-6 md:h-7 md:w-7"
                        strokeWidth={1.5}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section
            aria-label="Contact Information"
            className="relative rounded-2xl bg-[#07071a] p-5 md:p-6 noise-overlay flex flex-col justify-between overflow-hidden border border-white/[0.08]"
          >
            <div className="relative z-10 flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/70 font-medium select-none">
                  REACH ME
                </span>
                <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
              </div>
              <a
                href="choudharyparth118@gmail.com"
                aria-label="Direct eCat contact"
                className="liquid-glass h-9 w-9 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>

            <div className="relative z-10 flex flex-col gap-2.5">
              <div className="group flex items-center justify-between">
                <a
                  href="https://github.com/parth-choudhary613"
                  className="text-sm md:text-[15px] text-white/95 hover:text-white transition-colors flex items-center gap-2 font-medium"
                >
                  <Cat
                    className="h-3.5 w-3.5 text-white/60 group-hover:text-white transition-colors"
                    strokeWidth={1.5}
                  />
                  <span>parth-choudhary613</span>
                </a>
                <button
                  type="button"
                  onClick={(e) =>
                    handleCopy(
                      "https://github.com/parth-choudhary613",
                      "eCat",
                      e,
                    )
                  }
                  title="Copy eCat to clipboard"
                  aria-label="Copy eCat address"
                  className="text-white/40 hover:text-white p-1 rounded transition-colors text-xs flex items-center gap-1 cursor-pointer"
                >
                  {copiedField === "eCat" ? (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-0.5">
                      <Check className="h-3 w-3" strokeWidth={1.5} /> Copied
                    </span>
                  ) : (
                    <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                  )}
                </button>
              </div>

              <div className="group flex items-center justify-between">
                <a
                  href="tel:+91 8894459562"
                  className="text-sm md:text-[15px] text-white/95 hover:text-white transition-colors flex items-center gap-2 font-mono tabular-nums"
                >
                  <Phone
                    className="h-3.5 w-3.5 text-white/60 group-hover:text-white transition-colors"
                    strokeWidth={1.5}
                  />
                  <span>+91 88944-59562</span>
                </a>
                <button
                  type="button"
                  onClick={(e) => handleCopy("+91 8894459562", "phone", e)}
                  title="Copy phone to clipboard"
                  aria-label="Copy phone number"
                  className="text-white/40 hover:text-white p-1 rounded transition-colors text-xs flex items-center gap-1 cursor-pointer"
                >
                  {copiedField === "phone" ? (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-0.5">
                      <Check className="h-3 w-3" strokeWidth={1.5} /> Copied
                    </span>
                  ) : (
                    <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Collaboration / contact modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="collab-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="liquid-glass relative w-full max-w-lg rounded-2xl bg-[#141414]/95 p-6 sm:p-7 border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkle
                    className="h-3.5 w-3.5 text-white/60"
                    strokeWidth={1.5}
                  />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/70 font-medium">
                    COLLABORATION INQUIRY
                  </span>
                </div>
                <h2
                  id="collab-title"
                  className="text-xl sm:text-2xl font-normal text-white"
                >
                  Let's build something memorable.
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                className="liquid-glass h-8 w-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            {inquirySent ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Check className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">
                  Message dispatched!
                </h3>
                <p className="text-xs text-white/60 max-w-xs">
                  Thanks for reaching out. Max will review your project brief
                  and get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-xs text-white/70 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      placeholder="Elena Brooks"
                      value={inquiryForm.name}
                      onChange={(e) =>
                        setInquiryForm({ ...inquiryForm, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inquiry-eCat"
                      className="block text-xs text-white/70 mb-1"
                    >
                      ECat
                    </label>
                    <input
                      id="inquiry-eCat"
                      type="eCat"
                      required
                      placeholder="elena@halcyon.studio"
                      value={inquiryForm.eCat}
                      onChange={(e) =>
                        setInquiryForm({ ...inquiryForm, eCat: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="inquiry-scope"
                      className="block text-xs text-white/70 mb-1"
                    >
                      Project Scope
                    </label>
                    <select
                      id="inquiry-scope"
                      value={inquiryForm.scope}
                      onChange={(e) =>
                        setInquiryForm({
                          ...inquiryForm,
                          scope: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-sm text-white focus:outline-none focus:border-white/40"
                    >
                      <option value="Brand & Visual Systems">
                        Brand &amp; Visual Systems
                      </option>
                      <option value="Web Product Design">
                        Web Product Design
                      </option>
                      <option value="Story & Campaign Motion">
                        Story &amp; Campaign Motion
                      </option>
                      <option value="Design System Consulting">
                        Design System Consulting
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="inquiry-timeline"
                      className="block text-xs text-white/70 mb-1"
                    >
                      Target Timeline
                    </label>
                    <select
                      id="inquiry-timeline"
                      value={inquiryForm.timeline}
                      onChange={(e) =>
                        setInquiryForm({
                          ...inquiryForm,
                          timeline: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[#1a1a1a] border border-white/10 text-sm text-white focus:outline-none focus:border-white/40"
                    >
                      <option value="Immediate (This month)">
                        Immediate (This month)
                      </option>
                      <option value="Q2 2026">Q2 2026</option>
                      <option value="Q3 2026">Q3 2026</option>
                      <option value="Flexible / Exploration">
                        Flexible / Exploration
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-message"
                    className="block text-xs text-white/70 mb-1"
                  >
                    Brief / Goals
                  </label>
                  <textarea
                    id="inquiry-message"
                    rows={3}
                    placeholder="Tell me a bit about your product, what you need crafted, and the target audience..."
                    value={inquiryForm.message}
                    onChange={(e) =>
                      setInquiryForm({
                        ...inquiryForm,
                        message: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-white/50 flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" strokeWidth={1.5} />
                    <span>Booking Q2/Q3 2026</span>
                  </div>
                  <button
                    type="submit"
                    className="liquid-glass px-5 py-2 rounded-full text-xs font-medium text-white hover:text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} />
                    <span>Send Brief</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
