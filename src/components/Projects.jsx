import React, { useState, useEffect } from "react";
import {
  Github,
  ExternalLink,
  Code2,
  Layers,
  Cpu,
  ArrowRight,
  Zap,
} from "lucide-react";
import Omnicassion from "./assets/omnicassion.png";
import HumFlow from "./assets/humflow.png";
import Vendor from "./assets/vendorprofile.png";
import Portfolio from "./assets/portfolio.png";
const CyberpunkPortfolio = () => {
  // Mock Data for Projects
  const projects = [
    {
      id: 1,
      title: "HumFlow",
      description:
        "A neon-charged interface where motion & design collide in real time.",
      tags: ["React", "Vite.js", "Tailwind", "Framer Motion", "React Bits"],
      imgUrl: HumFlow, // Cyberpunk city placeholder
      liveLink: "https://parth-choudhary613.github.io/HumFlow/",
      repoLink: "https://github.com/parth-choudhary613/HumFlow",
    },
    {
      id: 2,
      title: "Omnicassion(Live Project)",
      description:
        "A dark, high-speed communication hub built for the future of vendors.",
      tags: ["React", "Next.js", "Tailwind", "Framer Motion"],
      imgUrl: Omnicassion, // Abstract neon placeholder
      liveLink: "https://omnicassion.com/vendors",
      repoLink: "#",
    },
    {
      id: 3,
      title: "Vendor Profile",
      description:
        "A minimal cyber-aesthetic showcasing identity, skill, and precision.",
      tags: ["React", "Tailwind", "Bootstrap", "Material UI", "Framer Motion"],
      imgUrl: Vendor, // Studio placeholder
      liveLink: "https://parth-choudhary613.github.io/vandorProfile/",
      repoLink: "https://github.com/parth-choudhary613/vandorProfile",
    },
    {
      id: 4,
      title: "Personal Profile",
      description:
        "A futuristic dashboard engineered for clarity and performance.",
      tags: ["Wix Studio", "CMF Integration", "Framer"],
      imgUrl: Portfolio, // Studio placeholder
      liveLink: "https://parthchoudhary2003jobapplication.framer.website/",
      repoLink: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-mono overflow-x-hidden selection:bg-fuchsia-500 selection:text-white">
      {/* --- Animated Background Grid & Floating Elements --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        {/* Moving Neon Blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      {/* --- Header Section --- */}
      <header className="relative z-10 flex flex-col items-center justify-center py-20 px-4">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-violet-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <h1 className="relative px-8 py-4 bg-slate-950 rounded-lg text-4xl md:text-6xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400">
            Cyber_Folio<span className="animate-blink">_</span>
          </h1>
        </div>
        <p className="mt-6 text-fuchsia-200/70 max-w-2xl text-center text-lg md:text-xl border-l-2 border-fuchsia-500 pl-4 backdrop-blur-sm">
          Constructing the digital future with{" "}
          <span className="text-fuchsia-400 font-bold">Code</span> &{" "}
          <span className="text-violet-400 font-bold">Chaos</span>.
        </p>
      </header>

      {/* --- Main Projects Grid --- */}
      {/* --- Main Projects Grid --- */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        {/* UPDATED CLASSES:
            grid-cols-1      -> 1 column on mobile
            md:grid-cols-2   -> 2 columns on tablets
            xl:grid-cols-4   -> 4 columns on desktop (All in one row)
            gap-6            -> Reduced gap slightly to fit 4 cards better
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      {/* --- Footer / GIT CTA --- */}
      <footer className="relative z-10 py-24 flex justify-center items-center">
        <a
          href="https://github.com/parth-choudhary613" // REPLACE THIS
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-md bg-slate-950 px-8 font-medium text-neutral-200 transition-all duration-300 hover:bg-slate-950 hover:scale-105 active:scale-95 border border-slate-800 hover:border-fuchsia-500/50"
        >
          {/* Button Glow Effect */}
          <div className="absolute right-0 top-0 -mr-4 -mt-4 h-32 w-32 rounded-full bg-fuchsia-600 blur-2xl opacity-0 group-hover:opacity-40 transition duration-500"></div>

          <span className="relative flex items-center gap-3 text-lg">
            <Github className="w-6 h-6 text-fuchsia-400 group-hover:rotate-12 transition-transform" />
            <span>Explore Full Arsenal</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-violet-400" />
          </span>

          {/* Moving border animation */}
          <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-fuchsia-500 to-violet-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </footer>
    </div>
  );
};

// --- Sub-Component: 3D Project Card ---
const ProjectCard = ({ project }) => {
  return (
    <div className="group relative w-full perspective-1000">
      {/* Card Container with 3D Transform */}
      <div className="relative h-full w-full rounded-xl bg-slate-900/80 border border-white/10 shadow-xl transition-all duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateX(5deg)_rotateY(5deg)_translateZ(20px)] group-hover:shadow-[0_0_30px_-5px_rgba(192,38,211,0.4)]">
        {/* --- Image Section with Overlay --- */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-slate-800">
          {/* Actual Image */}
          <img
            src={project.imgUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Pink/Violet Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-900/90 to-violet-900/90 mix-blend-hard-light transition-opacity duration-500 group-hover:opacity-0" />

          {/* Tech Stack Floating Badge */}
          <div className="absolute top-3 right-3 flex gap-2">
            <div className="p-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,0.3)]">
              <Code2 size={16} />
            </div>
          </div>
        </div>

        {/* --- Content Section --- */}
        <div className="p-6 flex flex-col justify-between h-[calc(100%-12rem)]">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-fuchsia-400 transition-colors flex items-center gap-2">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-fuchsia-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6 pt-4 border-t border-white/5">
            <a
              href={project.liveLink}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-fuchsia-600/20 hover:bg-fuchsia-600/40 text-fuchsia-200 text-sm font-semibold rounded transition-all group-hover:shadow-[0_0_15px_rgba(192,38,211,0.5)] border border-fuchsia-500/30"
            >
              <ExternalLink size={16} />
              Live Preview
            </a>

            <a
              href={project.repoLink}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold rounded transition-all border border-slate-700 hover:border-slate-500"
            >
              <Github size={16} />
              Source Code
            </a>
          </div>
        </div>

        {/* Animated Moving Decorative Lines (SVG) */}
        <svg
          className="absolute bottom-0 left-0 w-full h-1 pointer-events-none"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="0"
            stroke="url(#gradient)"
            strokeWidth="2"
            className="animate-[dash_3s_linear_infinite]"
            strokeDasharray="10,10"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c026d3" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default CyberpunkPortfolio;
