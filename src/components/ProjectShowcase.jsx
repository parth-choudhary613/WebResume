
import React, { useEffect, useRef, useState } from "react";
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

import Humflow from "../components/assets/humflow.webp";
import Personal from "../components/assets/PersonalPortfolio.webp";
import Agrovision from "../components/assets/AgroVision.webp";
import Vendorprofile from "../components/assets/vendorprofile.webp";

// =====================================
// PROJECT DETAILS
// =====================================

const PROJECTS = {
  humflow: {
    name: "HumFlow",
    url: "https://parth-choudhary613.github.io/HumFlow/",
    tech: ["React", "Tailwind CSS", "GSAP", "Three.js", "Vite"],
  },
  personal: {
    name: "Personal Portfolio",
    url: "https://webresume-bzt.pages.dev/",
    tech: ["React", "Tailwind CSS", "Framer Motion", "JavaScript"],
  },
  agrovision: {
    name: "AgroVision",
    url: "https://agrovision-sand.vercel.app/",
    tech: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Firebase"],
  },
  vendor: {
    name: "VendorProfile",
    url: "https://vandorprofile.parthchoudhary4372.workers.dev/",
    tech: ["React", "Tailwind CSS", "React Router", "Framer Motion", "Google Maps"],
  },
};

// =====================================
// SOFTWARE ROWS
// =====================================

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

// =====================================
// CONTACT FORM DEFAULT VALUES
// =====================================

const INITIAL_FORM = {
  name: "",
  email: "",
  scope: "Web Product Design",
  timeline: "Flexible / Exploration",
  message: "",
};

// =====================================
// REUSABLE TECH STACK COMPONENT
// =====================================

function TechStack({ tech }) {
  return (
    <div className="w-full border-t border-white/15 pt-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/60 font-medium">
          Tech Stack
        </span>

        <ArrowUpRight
          className="h-4 w-4 text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          strokeWidth={1.5}
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tech.map((item) => (
          <span
            key={item}
            className="px-2.5 py-1 rounded-full bg-white/[0.08] border border-white/[0.12] text-[10px] sm:text-[11px] text-white/80 backdrop-blur-md group-hover:bg-white/[0.12] group-hover:text-white transition-all duration-300"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// =====================================
// REUSABLE PROJECT IMAGE
// =====================================

function ProjectImage({ src, alt }) {
  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover brightness-[0.65] saturate-[0.70] transition-transform duration-700 group-hover:scale-[1.06]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/95 pointer-events-none" />
    </>
  );
}

// =====================================
// REUSABLE PROJECT LABEL
// =====================================

function ProjectLabel({ children }) {
  return (
    <div className="relative z-10 flex items-center justify-center gap-2">
      <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />

      <span className="text-[11px] uppercase tracking-[0.22em] text-white/70 font-medium select-none">
        {children}
      </span>

      <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
    </div>
  );
}

// =====================================
// MAIN COMPONENT
// =====================================

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [activeSoftware, setActiveSoftware] = useState(null);
  const [inquiryForm, setInquiryForm] = useState(INITIAL_FORM);
  const copyTimer = useRef(null);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  // =====================================
  // COPY FUNCTION
  // =====================================

  const handleCopy = async (text, fieldName) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);

      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (error) {
      console.error("Clipboard copy failed:", error);
    }
  };

  // =====================================
  // CLOSE MODAL WITH ESC
  // =====================================

  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  // =====================================
  // FORM SUBMIT
  // Opens the user's email application.
  // =====================================

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const subject = `Collaboration Inquiry - ${inquiryForm.scope}`;

    const body = `
Name: ${inquiryForm.name}
Email: ${inquiryForm.email}
Project Scope: ${inquiryForm.scope}
Timeline: ${inquiryForm.timeline}

Project Brief:
${inquiryForm.message}
    `.trim();

    const mailto = `mailto:choudharyparth118@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  };

  // =====================================
  // RENDER
  // =====================================

  return (
    <main className="min-h-screen lg:h-screen lg:min-h-[760px] w-full bg-transparent text-white flex flex-col justify-between px-4 sm:px-6 md:px-10 lg:px-14 py-6 sm:py-8 md:py-10 antialiased overflow-y-auto font-sans">

      {/* =====================================
          ANIMATION + GLASS CSS
      ===================================== */}

      <style>
        {`
          .liquid-glass {
            background: rgba(255, 255, 255, 0.07);
            border: 1px solid rgba(255, 255, 255, 0.12);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          }

          @keyframes marquee-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes marquee-right {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }

          .animate-marquee-left {
            animation: marquee-left 28s linear infinite;
          }

          .animate-marquee-right {
            animation: marquee-right 28s linear infinite;
          }

          .animate-marquee-left:hover,
          .animate-marquee-right:hover {
            animation-play-state: paused;
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-marquee-left,
            .animate-marquee-right {
              animation: none;
            }
          }
        `}
      </style>

      {/* =====================================
          HEADER
      ===================================== */}

      <header className="w-full flex flex-col md:flex-row md:items-start justify-between gap-6 shrink-0 mb-6 md:mb-7">

        <div className="max-w-3xl">
          <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.15] font-normal tracking-tight text-white mb-3">
            Here's my work
          </h1>

          <p className="text-sm md:text-[15px] leading-[1.6] text-white/60">
            A collection of ideas brought to life through creativity,
            clean design, and thoughtful development. Explore what
            I've built, one project at a time.
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

      {/* =====================================
          THREE-COLUMN LAYOUT
      ===================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 flex-1 min-h-0 w-full">

        {/* =====================================
            CARD 1 - HUMFLOW
            FULL CARD CLICKABLE
        ===================================== */}

        <a
          href={PROJECTS.humflow.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View HumFlow project"
          className="group relative rounded-2xl bg-black overflow-hidden flex flex-col justify-between h-full min-h-[440px] md:min-h-[500px] lg:min-h-0 border border-white/[0.08] hover:border-white/25 transition-all duration-500 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <ProjectImage
            src={Humflow}
            alt="HumFlow project showcase"
          />

          {/* Top title */}

          <div className="relative z-10 pt-5 md:pt-6 px-5 md:px-6">
            <ProjectLabel>HumFlow</ProjectLabel>
          </div>

          {/* Bottom details */}

          <div className="relative z-10 p-5 md:p-6 lg:p-7">
            <div className="rounded-xl p-4 bg-black/40 backdrop-blur-md border border-white/[0.08] group-hover:bg-black/50 transition-all duration-300">

              <h3 className="text-lg md:text-xl font-medium text-white mb-1">
                HumFlow
              </h3>

              <p className="text-xs text-white/60 leading-relaxed mb-4">
                An interactive digital experience with creative
                animations and seamless transitions.
              </p>

              <TechStack tech={PROJECTS.humflow.tech} />
            </div>
          </div>
        </a>

        {/* =====================================
            COLUMN 2
        ===================================== */}

        <div className="grid grid-rows-[minmax(260px,1fr)_minmax(260px,1fr)] gap-4 md:gap-5 h-full min-h-[560px] lg:min-h-0">

          {/* =====================================
              CARD 2 - PERSONAL PORTFOLIO
              FULL CARD CLICKABLE
          ===================================== */}

          <a
            href={PROJECTS.personal.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Personal Portfolio project"
            className="group relative rounded-2xl bg-[#172626] min-h-0 overflow-hidden flex flex-col justify-between border border-white/[0.08] hover:border-white/25 transition-all duration-500 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <ProjectImage
              src={Personal}
              alt="Personal Portfolio project preview"
            />

            {/* Top label */}

            <div className="relative z-10 p-5 md:p-6">
              <ProjectLabel>Featured Project</ProjectLabel>
            </div>

            {/* Bottom details */}

            <div className="relative z-10 p-5 md:p-6">

              <h3 className="text-lg font-medium text-white mb-3">
                Personal Portfolio
              </h3>

              <TechStack tech={PROJECTS.personal.tech} />
            </div>
          </a>

          {/* =====================================
              CARD 3 - AGROVISION
              FULL CARD CLICKABLE
          ===================================== */}

          <a
            href={PROJECTS.agrovision.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View AI AgroVision project"
            className="group relative rounded-2xl bg-black overflow-hidden flex flex-col justify-between p-5 md:p-6 border border-white/[0.08] hover:border-white/25 transition-all duration-500 min-h-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <ProjectImage
              src={Agrovision}
              alt="AI AgroVision project preview"
            />

            {/* Main center content */}

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center min-h-0">

              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-light tracking-tight text-white drop-shadow-lg leading-none select-none group-hover:scale-105 transition-transform duration-500">
                AI
              </span>

              <p className="mt-2 text-sm sm:text-base text-white/85 font-normal">
                AgroVision
              </p>
            </div>

            {/* Bottom tech stack */}

            <div className="relative z-10 w-full mt-4">
              <TechStack tech={PROJECTS.agrovision.tech} />
            </div>
          </a>
        </div>

        {/* =====================================
            COLUMN 3
        ===================================== */}

        <div className="grid grid-rows-[minmax(330px,1fr)_auto] md:col-span-2 lg:col-span-1 gap-4 md:gap-5 h-full min-h-[560px] lg:min-h-0">

          {/* =====================================
              CARD 4 - VENDORPROFILE
              FULL CARD CLICKABLE
          ===================================== */}

          <a
            href={PROJECTS.vendor.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View VendorProfile project"
            className="group relative rounded-2xl bg-black overflow-hidden flex flex-col justify-between py-5 md:py-6 border border-white/[0.08] hover:border-white/25 transition-all duration-500 min-h-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <ProjectImage
              src={Vendorprofile}
              alt="VendorProfile project preview"
            />

            {/* Top label */}

            <div className="relative z-10 px-5">
              <ProjectLabel>VendorProfile</ProjectLabel>
            </div>

            {/* Active software name */}

            <div className="relative z-10 px-5 text-center h-4">
              <span className="text-[11px] text-white/60 transition-opacity duration-200">
                {activeSoftware
                  ? `Toolkit item: ${activeSoftware}`
                  : ""}
              </span>
            </div>

            {/* Animated software icons */}

            <div className="relative z-10 flex flex-col gap-3 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">

              {/* Row 1 */}

              <div className="flex w-max animate-marquee-left gap-3">
                {[...SOFTWARE_ROW_1, ...SOFTWARE_ROW_1].map(
                  (item, idx) => {
                    const Icon = item.Icon;

                    return (
                      <div
                        key={`r1-${idx}`}
                        onMouseEnter={() => setActiveSoftware(item.name)}
                        onMouseLeave={() => setActiveSoftware(null)}
                        title={item.name}
                        className="liquid-glass h-14 w-14 md:h-16 md:w-16 rounded-xl flex items-center justify-center text-white/85 hover:text-white transition-all duration-200 hover:scale-105 shrink-0"
                      >
                        <Icon
                          className="h-6 w-6 md:h-7 md:w-7"
                          strokeWidth={1.5}
                        />
                      </div>
                    );
                  }
                )}
              </div>

              {/* Row 2 */}

              <div className="flex w-max animate-marquee-right gap-3">
                {[...SOFTWARE_ROW_2, ...SOFTWARE_ROW_2].map(
                  (item, idx) => {
                    const Icon = item.Icon;

                    return (
                      <div
                        key={`r2-${idx}`}
                        onMouseEnter={() => setActiveSoftware(item.name)}
                        onMouseLeave={() => setActiveSoftware(null)}
                        title={item.name}
                        className="liquid-glass h-14 w-14 md:h-16 md:w-16 rounded-xl flex items-center justify-center text-white/85 hover:text-white transition-all duration-200 hover:scale-105 shrink-0"
                      >
                        <Icon
                          className="h-6 w-6 md:h-7 md:w-7"
                          strokeWidth={1.5}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            {/* Bottom tech stack */}

            <div className="relative z-10 px-5 md:px-6 mt-5">

              <h3 className="text-base font-medium text-white mb-3">
                VendorProfile
              </h3>

              <TechStack tech={PROJECTS.vendor.tech} />
            </div>
          </a>

          {/* =====================================
              CONTACT CARD
          ===================================== */}

          <section
            aria-label="Contact Information"
            className="relative rounded-2xl bg-[#07071a] p-5 md:p-6 flex flex-col justify-between overflow-hidden border border-white/[0.08]"
          >
            {/* Contact heading */}

            <div className="relative z-10 flex items-center justify-between mb-4">

              <div className="flex items-center gap-2">
                <Sparkle
                  className="h-3 w-3 text-white/60"
                  strokeWidth={1.5}
                />

                <span className="text-[11px] uppercase tracking-[0.22em] text-white/70 font-medium select-none">
                  Reach Me
                </span>

                <Sparkle
                  className="h-3 w-3 text-white/60"
                  strokeWidth={1.5}
                />
              </div>

              {/* Email button */}

              <a
                href="mailto:choudharyparth118@gmail.com"
                aria-label="Send email"
                className="liquid-glass h-9 w-9 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <ArrowUpRight
                  className="h-4 w-4"
                  strokeWidth={1.5}
                />
              </a>
            </div>

            {/* Contact details */}

            <div className="relative z-10 flex flex-col gap-2.5">

              {/* GitHub */}

              <div className="group flex items-center justify-between gap-2">

                <a
                  href="https://github.com/parth-choudhary613"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm md:text-[15px] text-white/95 hover:text-white transition-colors flex items-center gap-2 font-medium min-w-0"
                >
                  <Cat
                    className="h-3.5 w-3.5 shrink-0 text-white/60 group-hover:text-white transition-colors"
                    strokeWidth={1.5}
                  />

                  <span className="break-all">
                    parth-choudhary613
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() =>
                    handleCopy(
                      "https://github.com/parth-choudhary613",
                      "github"
                    )
                  }
                  title="Copy GitHub URL"
                  aria-label="Copy GitHub URL"
                  className="text-white/40 hover:text-white p-1 rounded transition-colors text-xs flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copiedField === "github" ? (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-0.5">
                      <Check className="h-3 w-3" />
                      Copied
                    </span>
                  ) : (
                    <Copy
                      className="h-3.5 w-3.5"
                      strokeWidth={1.5}
                    />
                  )}
                </button>
              </div>

              {/* Phone */}

              <div className="group flex items-center justify-between gap-2">

                <a
                  href="tel:+918894459562"
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
                  onClick={() =>
                    handleCopy("+91 8894459562", "phone")
                  }
                  title="Copy phone number"
                  aria-label="Copy phone number"
                  className="text-white/40 hover:text-white p-1 rounded transition-colors text-xs flex items-center gap-1 cursor-pointer shrink-0"
                >
                  {copiedField === "phone" ? (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-0.5">
                      <Check className="h-3 w-3" />
                      Copied
                    </span>
                  ) : (
                    <Copy
                      className="h-3.5 w-3.5"
                      strokeWidth={1.5}
                    />
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* =====================================
          COLLABORATION MODAL
      ===================================== */}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="collab-title"
            className="liquid-glass relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-[#141414]/95 p-6 sm:p-7 border border-white/10 shadow-2xl"
          >
            {/* Modal header */}

            <div className="flex items-start justify-between gap-4 mb-5">

              <div>
                <div className="flex items-center gap-2 mb-1.5">

                  <Sparkle
                    className="h-3.5 w-3.5 text-white/60"
                    strokeWidth={1.5}
                  />

                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/70 font-medium">
                    Collaboration Inquiry
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
                className="liquid-glass h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X
                  className="h-4 w-4"
                  strokeWidth={1.5}
                />
              </button>
            </div>

            {/* =====================================
                INQUIRY FORM
            ===================================== */}

            <form
              onSubmit={handleFormSubmit}
              className="space-y-4"
            >
              {/* Name and email */}

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
                      setInquiryForm({
                        ...inquiryForm,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block text-xs text-white/70 mb-1"
                  >
                    Email
                  </label>

                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    placeholder="elena@example.com"
                    value={inquiryForm.email}
                    onChange={(e) =>
                      setInquiryForm({
                        ...inquiryForm,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              {/* Scope and timeline */}

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

                    <option value="Website Development">
                      Website Development
                    </option>

                    <option value="Full Stack Development">
                      Full Stack Development
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

                    <option value="Within 1-2 months">
                      Within 1–2 months
                    </option>

                    <option value="Within 3 months">
                      Within 3 months
                    </option>

                    <option value="Flexible / Exploration">
                      Flexible / Exploration
                    </option>
                  </select>
                </div>
              </div>

              {/* Project description */}

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
                  placeholder="Tell me about your product, what you need crafted, and your target audience..."
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

              {/* Form footer */}

              <div className="flex items-center justify-between gap-3 pt-2">

                <div className="text-[11px] text-white/50 flex items-center gap-1.5">
                  <Calendar
                    className="h-3 w-3 shrink-0"
                    strokeWidth={1.5}
                  />

                  <span>Open for collaboration</span>
                </div>

                <button
                  type="submit"
                  className="liquid-glass px-5 py-2 rounded-full text-xs font-medium text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <MessageSquare
                    className="h-3.5 w-3.5"
                    strokeWidth={1.5}
                  />

                  <span>Send Brief</span>

                  <ArrowUpRight
                    className="h-3.5 w-3.5"
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              <p className="text-[11px] text-white/40">
                This opens your email application with the brief
                prefilled. Review and send the email to complete
                your inquiry.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
