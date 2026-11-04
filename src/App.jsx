
import React, { useState, useEffect, lazy, Suspense } from "react";

import Loader from "./components/Loader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectShowcase from "./components/ProjectShowcase";
import About from "./components/About";
import SkillsMatrix from "./components/SkillsMatrix";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
const ResumeModal = lazy(() => import("./components/ResumeModal"));
import Reactbitsbackground from "./components/Reactbitsbackground";

export default function App() {
  // Theme state
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;

    const stored = window.localStorage.getItem("theme");

    if (stored) {
      return stored === "dark";
    }

    return window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false;
  });

  // Resume modal state
  const [resumeOpen, setResumeOpen] = useState(false);

  // Real loader state
  const [loading, setLoading] = useState(true);

  // Synchronize dark/light theme state with document element, localStorage, and meta tag
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      root.classList.remove("light");
      root.style.colorScheme = "dark";
      try {
        localStorage.setItem("theme", "dark");
      } catch {
        // Storage access error handling in restricted environments
      }
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", "#0A0A0C");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.style.colorScheme = "light";
      try {
        localStorage.setItem("theme", "light");
      } catch {
        // Storage access error handling in restricted environments
      }
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", "#FCFAF6");
    }
  }, [dark]);

  return (
    <div className="relative min-h-screen overflow-x-hidden isolate bg-bg text-text-primary transition-colors duration-250">
      {/* Accessible skip navigation link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-surface focus:text-text-primary focus:border focus:border-border focus:font-mono focus:text-xs focus:rounded-md focus:shadow-xl focus:ring-2 focus:ring-accent"
      >
        Skip to main content
      </a>

      {/* =========================================
          FULLSCREEN REAL ASSET LOADER
      ========================================= */}
      {loading && (
        <Loader onComplete={() => setLoading(false)} />
      )}

      {/* =========================================
          GLOBAL REACT BITS BACKGROUND
      ========================================= */}
      <div
        className="
          fixed
          inset-0
          z-0
          w-full
          h-full
          pointer-events-none
        "
        aria-hidden="true"
      >
        <Reactbitsbackground lightMode={!dark} glowColor={dark ? "#4f46e5" : "#6366f1"} />
      </div>


      {/* =========================================
          WEBSITE CONTENT
      ========================================= */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* Primary Sticky Header */}
        <Header
          dark={dark}
          setDark={setDark}
          onOpenResume={() => setResumeOpen(true)}
        />

        {/* Main Editorial Flow */}
        <main
          id="main-content"
          className="relative flex-1"
        >
          <Hero
            dark={dark}
            onOpenResume={() => setResumeOpen(true)}
          />

          <ProjectShowcase />

          <About />

          <SkillsMatrix />

          <Experience />

          <Contact />
        </main>

        {/* Editorial Footer */}
        <Footer />
      </div>

      {/* =========================================
          RESUME MODAL
      ========================================= */}
      {resumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal
            isOpen={resumeOpen}
            onClose={() => setResumeOpen(false)}
          />
        </Suspense>
      )}

    </div>
  );
}
