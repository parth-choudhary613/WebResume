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
    name: "Omnicassion",
    url: "https://omnicassion.com/",
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
    <div className="w-full border-t border-border pt-3 mt-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-[0.18em] text-text-muted font-medium font-mono">
          Tech Stack
        </span>

        <ArrowUpRight
          className="h-3.5 w-3.5 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
          strokeWidth={1.5}
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {tech.map((item) => (
          <span
            key={item}
            className="px-2.5 py-0.5 rounded-md bg-surface-subtle border border-border text-[10px] sm:text-[11px] font-mono text-text-secondary group-hover:border-accent/40 group-hover:text-text-primary transition-colors duration-200"
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
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

      {/* Theme-aware gentle overlay to preserve screenshot clarity while guaranteeing readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent dark:from-bg/95 dark:via-bg/50 dark:to-transparent pointer-events-none transition-opacity duration-300" />
    </>
  );
}

// =====================================
// REUSABLE PROJECT LABEL
// =====================================

function ProjectLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface/90 dark:bg-surface/80 border border-border shadow-xs backdrop-blur-md">
      <Sparkle className="h-3 w-3 text-accent" strokeWidth={1.5} />
      <span className="text-[10px] uppercase tracking-[0.2em] text-text-primary font-mono font-medium select-none">
        {children}
      </span>
      <Sparkle className="h-3 w-3 text-accent" strokeWidth={1.5} />
    </div>
  );
}

// =====================================
// MAIN COMPONENT
// =====================================

export default function ProjectShowcase() {
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
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
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

  return (
    <section
      id="work"
      className="py-20 sm:py-28 w-full bg-bg text-text-primary flex flex-col justify-between px-4 sm:px-8 lg:px-12 antialiased font-sans border-b border-border relative"
    >
      <div className="max-w-[1360px] mx-auto w-full">
        {/* =====================================
            HEADER
        ===================================== */}

        <header className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold block mb-3">
              Selected Work & Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-text-primary leading-[1.15]">
              Here's my work
            </h2>
            <p className="mt-3 text-sm md:text-base leading-relaxed text-text-secondary max-w-2xl font-normal">
              A curated collection of production applications, interactive environments, and interface experiments built with modern frontend engineering discipline.
            </p>
          </div>

          <div className="shrink-0 flex items-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              aria-label="Open contact and collaboration modal"
              className="group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold bg-surface border border-border text-text-primary hover:border-accent hover:text-accent transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-xs"
            >
              <Sparkle
                className="h-3.5 w-3.5 text-accent transition-transform group-hover:rotate-12"
                strokeWidth={1.5}
              />
              <span>Let's Team Up Today</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </header>

        {/* =====================================
            THREE-COLUMN LAYOUT
        ===================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">

          {/* =====================================
              CARD 1 - HUMFLOW / OMNICASSION
              FULL CARD CLICKABLE
          ===================================== */}

          <a
            href={PROJECTS.humflow.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Omnicassion project"
            className="group relative rounded-2xl bg-surface border border-border overflow-hidden flex flex-col justify-between min-h-[480px] md:min-h-[520px] shadow-xs hover:shadow-md hover:border-accent/40 transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent"
          >
            <ProjectImage
              src={Humflow}
              alt="Omnicassion project showcase"
            />

            {/* Top title */}
            <div className="relative z-10 pt-5 px-5">
              <ProjectLabel>Omnicassion</ProjectLabel>
            </div>

            {/* Bottom details */}
            <div className="relative z-10 p-4 sm:p-5">
              <div className="rounded-xl p-4 sm:p-5 bg-surface/90 dark:bg-surface/90 backdrop-blur-md border border-border group-hover:border-accent/30 transition-all duration-300 shadow-xs">
                <h3 className="text-lg md:text-xl font-bold font-display text-text-primary mb-1.5 flex items-center justify-between">
                  <span>Omnicassion</span>
                  <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </h3>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Interactive booking platform engineered for Omnicassion, connecting clients with premier wedding and event planning services.
                </p>

                <TechStack tech={PROJECTS.humflow.tech} />
              </div>
            </div>
          </a>

          {/* =====================================
              COLUMN 2
          ===================================== */}

          <div className="flex flex-col gap-6 h-full">

            {/* =====================================
                CARD 2 - PERSONAL PORTFOLIO
            ===================================== */}

            <a
              href={PROJECTS.personal.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Personal Portfolio project"
              className="group relative rounded-2xl bg-surface border border-border overflow-hidden flex flex-col justify-between min-h-[250px] flex-1 shadow-xs hover:shadow-md hover:border-accent/40 transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ProjectImage
                src={Personal}
                alt="Personal Portfolio project preview"
              />

              <div className="relative z-10 pt-4 px-4 sm:px-5">
                <ProjectLabel>Featured Project</ProjectLabel>
              </div>

              <div className="relative z-10 p-4 sm:p-5">
                <div className="rounded-xl p-4 bg-surface/90 dark:bg-surface/90 backdrop-blur-md border border-border group-hover:border-accent/30 transition-all duration-300 shadow-xs">
                  <h3 className="text-base sm:text-lg font-bold font-display text-text-primary mb-1 flex items-center justify-between">
                    <span>Personal Portfolio</span>
                    <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </h3>
                  <TechStack tech={PROJECTS.personal.tech} />
                </div>
              </div>
            </a>

            {/* =====================================
                CARD 3 - AGROVISION
            ===================================== */}

            <a
              href={PROJECTS.agrovision.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View AI AgroVision project"
              className="group relative rounded-2xl bg-surface border border-border overflow-hidden flex flex-col justify-between min-h-[250px] flex-1 shadow-xs hover:shadow-md hover:border-accent/40 transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent"
            >
              <ProjectImage
                src={Agrovision}
                alt="AI AgroVision project preview"
              />

              <div className="relative z-10 pt-4 px-4 sm:px-5">
                <ProjectLabel>AI System</ProjectLabel>
              </div>

              <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center p-4">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-text-primary drop-shadow-sm leading-none select-none group-hover:scale-105 transition-transform duration-300">
                  AI
                </span>
                <p className="mt-1.5 text-xs sm:text-sm text-text-secondary font-medium">
                  AgroVision
                </p>
              </div>

              <div className="relative z-10 p-4 sm:p-5">
                <div className="rounded-xl p-4 bg-surface/90 dark:bg-surface/90 backdrop-blur-md border border-border group-hover:border-accent/30 transition-all duration-300 shadow-xs">
                  <TechStack tech={PROJECTS.agrovision.tech} />
                </div>
              </div>
            </a>
          </div>

          {/* =====================================
              COLUMN 3
          ===================================== */}

          <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-1 h-full">

            {/* =====================================
                CARD 4 - VENDORPROFILE
            ===================================== */}

            <a
              href={PROJECTS.vendor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View VendorProfile project"
              className="group relative rounded-2xl bg-surface border border-border overflow-hidden flex flex-col justify-between py-5 shadow-xs hover:shadow-md hover:border-accent/40 transition-all duration-300 cursor-pointer focus-visible:ring-2 focus-visible:ring-accent flex-1"
            >
              <ProjectImage
                src={Vendorprofile}
                alt="VendorProfile project preview"
              />

              <div className="relative z-10 px-5 flex items-center justify-between">
                <ProjectLabel>VendorProfile</ProjectLabel>
                <ArrowUpRight className="h-4 w-4 text-text-muted group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              {/* Active software indicator */}
              <div className="relative z-10 px-5 text-center h-4 my-2">
                <span className="text-[11px] font-mono text-accent transition-opacity duration-200">
                  {activeSoftware ? `Toolkit item: ${activeSoftware}` : ""}
                </span>
              </div>

              {/* Animated software marquee */}
              <div className="relative z-10 flex flex-col gap-2.5 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                {/* Row 1 */}
                <div className="flex w-max animate-marquee-left gap-2.5">
                  {[...SOFTWARE_ROW_1, ...SOFTWARE_ROW_1].map((item, idx) => {
                    const Icon = item.Icon;
                    return (
                      <div
                        key={`r1-${idx}`}
                        onMouseEnter={() => setActiveSoftware(item.name)}
                        onMouseLeave={() => setActiveSoftware(null)}
                        title={item.name}
                        className="h-12 w-12 sm:h-13 sm:w-13 rounded-xl flex items-center justify-center bg-surface/85 dark:bg-surface/80 border border-border text-text-secondary hover:text-accent hover:border-accent/40 shadow-2xs backdrop-blur-md transition-all duration-200 hover:scale-105 shrink-0"
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                      </div>
                    );
                  })}
                </div>

                {/* Row 2 */}
                <div className="flex w-max animate-marquee-right gap-2.5">
                  {[...SOFTWARE_ROW_2, ...SOFTWARE_ROW_2].map((item, idx) => {
                    const Icon = item.Icon;
                    return (
                      <div
                        key={`r2-${idx}`}
                        onMouseEnter={() => setActiveSoftware(item.name)}
                        onMouseLeave={() => setActiveSoftware(null)}
                        title={item.name}
                        className="h-12 w-12 sm:h-13 sm:w-13 rounded-xl flex items-center justify-center bg-surface/85 dark:bg-surface/80 border border-border text-text-secondary hover:text-accent hover:border-accent/40 shadow-2xs backdrop-blur-md transition-all duration-200 hover:scale-105 shrink-0"
                      >
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom tech stack */}
              <div className="relative z-10 px-4 sm:px-5 mt-4">
                <div className="rounded-xl p-4 bg-surface/90 dark:bg-surface/90 backdrop-blur-md border border-border group-hover:border-accent/30 transition-all duration-300 shadow-xs">
                  <h3 className="text-base font-bold font-display text-text-primary mb-1">
                    VendorProfile
                  </h3>
                  <TechStack tech={PROJECTS.vendor.tech} />
                </div>
              </div>
            </a>

            {/* =====================================
                CONTACT CARD
            ===================================== */}

            <div
              aria-label="Contact Information"
              className="relative rounded-2xl bg-surface border border-border p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-xs"
            >
              <div className="relative z-10 flex items-center justify-between mb-4">
                <div className="flex items-center gap-1.5">
                  <Sparkle className="h-3 w-3 text-accent" strokeWidth={1.5} />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-mono font-medium">
                    Reach Me Directly
                  </span>
                </div>

                <a
                  href="mailto:choudharyparth118@gmail.com"
                  aria-label="Send email"
                  className="h-8 w-8 rounded-full border border-border bg-surface-subtle flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/40 transition-all duration-200 cursor-pointer shadow-2xs"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </div>

              <div className="relative z-10 flex flex-col gap-3 font-mono text-xs">
                {/* GitHub */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-surface-subtle border border-border-subtle">
                  <a
                    href="https://github.com/parth-choudhary613"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary hover:text-accent transition-colors flex items-center gap-2 font-medium min-w-0"
                  >
                    <Cat className="h-3.5 w-3.5 shrink-0 text-text-muted" strokeWidth={1.5} />
                    <span className="truncate">parth-choudhary613</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy("https://github.com/parth-choudhary613", "github")}
                    title="Copy GitHub URL"
                    aria-label="Copy GitHub URL"
                    className="text-text-muted hover:text-text-primary p-1 rounded transition-colors cursor-pointer shrink-0"
                  >
                    {copiedField === "github" ? (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                        <Check className="h-3 w-3" />
                      </span>
                    ) : (
                      <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                    )}
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-surface-subtle border border-border-subtle">
                  <a
                    href="tel:+918894459562"
                    className="text-text-primary hover:text-accent transition-colors flex items-center gap-2 tabular-nums"
                  >
                    <Phone className="h-3.5 w-3.5 text-text-muted" strokeWidth={1.5} />
                    <span>+91 88944-59562</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy("+91 8894459562", "phone")}
                    title="Copy phone number"
                    aria-label="Copy phone number"
                    className="text-text-muted hover:text-text-primary p-1 rounded transition-colors cursor-pointer shrink-0"
                  >
                    {copiedField === "phone" ? (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                        <Check className="h-3 w-3" />
                      </span>
                    ) : (
                      <Copy className="h-3.5 w-3.5" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          COLLABORATION MODAL
      ===================================== */}

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
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
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-surface p-6 sm:p-8 border border-border shadow-2xl text-text-primary"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-border">
              <div>
                <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-accent uppercase tracking-[0.2em]">
                  <Sparkle className="h-3 w-3" strokeWidth={1.5} />
                  <span>Collaboration Inquiry</span>
                </div>

                <h2
                  id="collab-title"
                  className="text-xl sm:text-2xl font-bold font-display text-text-primary"
                >
                  Let's build something memorable.
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
                className="h-8 w-8 shrink-0 rounded-xl border border-border bg-surface-subtle flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Inquiry form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="inquiry-name"
                    className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="inquiry-name"
                    type="text"
                    required
                    placeholder="Elena Vance"
                    value={inquiryForm.name}
                    onChange={(e) =>
                      setInquiryForm({
                        ...inquiryForm,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:bg-surface transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="inquiry-email"
                    className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    id="inquiry-email"
                    type="email"
                    required
                    placeholder="elena@company.com"
                    value={inquiryForm.email}
                    onChange={(e) =>
                      setInquiryForm({
                        ...inquiryForm,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:bg-surface transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="inquiry-scope"
                    className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1.5"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-border text-sm text-text-primary focus:outline-none focus:border-accent focus:bg-surface transition-colors cursor-pointer"
                  >
                    <option value="Brand & Visual Systems">Brand & Visual Systems</option>
                    <option value="Web Product Design">Web Product Design</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Full Stack Development">Full Stack Development</option>
                    <option value="Design System Consulting">Design System Consulting</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-timeline"
                    className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1.5"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-border text-sm text-text-primary focus:outline-none focus:border-accent focus:bg-surface transition-colors cursor-pointer"
                  >
                    <option value="Immediate (This month)">Immediate (This month)</option>
                    <option value="Within 1-2 months">Within 1–2 months</option>
                    <option value="Within 3 months">Within 3 months</option>
                    <option value="Flexible / Exploration">Flexible / Exploration</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="inquiry-message"
                  className="block font-mono text-[11px] uppercase tracking-wider text-text-secondary mb-1.5"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:bg-surface transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-accent shrink-0" strokeWidth={1.5} />
                  <span>Open for collaboration</span>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-accent hover:bg-accent-hover transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} />
                  <span>Send Brief</span>
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </div>

              <p className="text-[11px] font-mono text-text-muted">
                Pre-fills your email application with the brief details for instant dispatch.
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
