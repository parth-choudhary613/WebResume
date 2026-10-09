
import React, { useState, useEffect } from "react";

import Loader from "./components/Loader";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ProjectShowcase from "./components/ProjectShowcase";
import About from "./components/About";
import SkillsMatrix from "./components/SkillsMatrix";
import Experience from "./components/Experience";
import Principles from "./components/Principles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
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

  // Loader states
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Sync theme with HTML root
  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Initial website loading animation
  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2000);

    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden isolate">

      {/* =========================================
          FULLSCREEN LOADER
      ========================================= */}
      {loading && (
        <div
          className={`
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-[#080808]
            transition-opacity duration-500 ease-in-out
            ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}
          `}
          role="status"
          aria-label="Loading portfolio"
        >
          <Loader />
        </div>
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
        "
        aria-hidden="true"
      >
        <Reactbitsbackground dark={dark} />
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

          <Principles />

          <Contact />
        </main>

        {/* Editorial Footer */}
        <Footer />
      </div>

      {/* =========================================
          RESUME MODAL
      ========================================= */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

    </div>
  );
}
