import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Professional Real-Asset Loader
 * Features:
 * - Listens to THREE.DefaultLoadingManager progress for real 3D assets/textures
 * - Preloads critical images & fonts
 * - Monitors document ready state
 * - Silky smooth rAF lerp interpolation (no abrupt jumps)
 * - Calibrated luxury Red, Black, White, and Cream aesthetic
 * - Telemetry stage messages and precision progress counter
 */
export default function Loader({ onComplete }) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [stageText, setStageText] = useState("INITIALIZING CORE SYSTEMS");
  const [isFinishing, setIsFinishing] = useState(false);

  // Target progress accumulated from real loading milestones
  const targetProgressRef = useRef(10);
  const currentProgressRef = useRef(0);
  const startTimeRef = useRef(null);
  const rafIdRef = useRef(null);
  const completedRef = useRef(false);

  useEffect(() => {
    let mounted = true;
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }
    const minDisplayMs = 1800; // Calibrated minimum time for smooth cinematic entry

    // 1. Monitor Three.js Asset Loading Manager
    const prevOnProgress = THREE.DefaultLoadingManager.onProgress;
    const prevOnLoad = THREE.DefaultLoadingManager.onLoad;

    THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      if (!mounted) return;
      if (itemsTotal > 0) {
        const ratio = itemsLoaded / itemsTotal;
        // Three.js assets drive 35% to 85% of target progress
        targetProgressRef.current = Math.max(
          targetProgressRef.current,
          Math.min(85, Math.floor(35 + ratio * 50))
        );
      }
    };

    THREE.DefaultLoadingManager.onLoad = () => {
      if (!mounted) return;
      targetProgressRef.current = Math.max(targetProgressRef.current, 90);
    };

    // 2. Preload Critical Images
    const criticalImages = [
      "/assets/TechLogo.png",
      "/texture/Texture.webp",
    ];

    let loadedCount = 0;
    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      const onDone = () => {
        if (!mounted) return;
        loadedCount += 1;
        const imgRatio = loadedCount / criticalImages.length;
        targetProgressRef.current = Math.max(
          targetProgressRef.current,
          Math.floor(20 + imgRatio * 30)
        );
      };
      img.onload = onDone;
      img.onerror = onDone;
    });

    // 3. Monitor Web Fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!mounted) return;
        targetProgressRef.current = Math.max(targetProgressRef.current, 35);
      });
    }

    // 4. Monitor Window / DOM Complete
    const handleWindowLoad = () => {
      if (!mounted) return;
      targetProgressRef.current = Math.max(targetProgressRef.current, 85);
    };

    if (document.readyState === "complete") {
      handleWindowLoad();
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    // 5. Smooth Interpolation Animation Loop (60/120fps)
    const updateProgress = () => {
      if (!mounted) return;

      const elapsed = Date.now() - startTimeRef.current;
      const timeRatio = Math.min(1, elapsed / minDisplayMs);

      // Natural progressive curve based on elapsed time
      const timeTarget = Math.floor(timeRatio * 100);

      // The active target is governed by both real assets and smooth pacing
      const effectiveTarget = Math.min(
        100,
        Math.max(timeTarget, targetProgressRef.current)
      );

      // Lerp current towards target with responsive ease
      const diff = effectiveTarget - currentProgressRef.current;
      const step = Math.max(0.4, diff * 0.12);

      if (currentProgressRef.current < effectiveTarget) {
        currentProgressRef.current = Math.min(
          effectiveTarget,
          currentProgressRef.current + step
        );
      }

      const rounded = Math.floor(currentProgressRef.current);
      setDisplayProgress(rounded);

      // Stage status feedback
      if (rounded < 25) {
        setStageText("INITIALIZING ENGINE & SHADERS");
      } else if (rounded < 55) {
        setStageText("STREAMING SPATIAL 3D ASSETS");
      } else if (rounded < 80) {
        setStageText("CALIBRATING VIEWPORT RENDERING");
      } else if (rounded < 98) {
        setStageText("SYNCHRONIZING INTERFACE");
      } else {
        setStageText("EXPERIENCE READY");
      }

      // Check for completion
      if (
        rounded >= 100 &&
        elapsed >= minDisplayMs &&
        !completedRef.current
      ) {
        completedRef.current = true;
        setIsFinishing(true);

        // Allow 350ms for the final state transition, then call onComplete
        setTimeout(() => {
          if (mounted && onComplete) {
            onComplete();
          }
        }, 400);
        return;
      }

      rafIdRef.current = requestAnimationFrame(updateProgress);
    };

    rafIdRef.current = requestAnimationFrame(updateProgress);

    return () => {
      mounted = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("load", handleWindowLoad);
      THREE.DefaultLoadingManager.onProgress = prevOnProgress;
      THREE.DefaultLoadingManager.onLoad = prevOnLoad;
    };
  }, [onComplete]);

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex flex-col items-center justify-between
        bg-[#070709] text-white
        px-6 py-8 sm:py-12
        select-none overflow-hidden
        transition-opacity duration-700 ease-in-out
        ${isFinishing ? "opacity-0 pointer-events-none scale-102" : "opacity-100"}
      `}
      role="status"
      aria-live="polite"
      aria-label={`Loading portfolio, ${displayProgress}% complete`}
    >
      {/* Ambient Red & Cream Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(220, 38, 38, 0.12) 0%, rgba(221, 192, 138, 0.04) 40%, transparent 80%)",
        }}
      />

      {/* Subtle Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Header Telemetry */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between font-mono text-[11px] tracking-widest text-[#d8d3cc]/60 uppercase">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
          </span>
          <span className="font-semibold text-white/90">PARTH CHOUDHARY</span>
          <span className="hidden sm:inline text-white/30">//</span>
          <span className="hidden sm:inline">PORTFOLIO '26</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#ddc08a] font-medium">SYS_INIT</span>
          <span className="text-white/30">•</span>
          <span className="text-white/80">V19.2</span>
        </div>
      </header>

      {/* Center Stage: Monogram, Counter & Progress Bar */}
      <main className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-md text-center">
        {/* Brand Monogram Mark with Crimson Halo */}
        <div className="relative mb-8 group">
          {/* Subtle breathing glow */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-red-600/30 to-[#ddc08a]/20 blur-xl opacity-75 animate-pulse" />
          
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/80 border border-red-900/40 p-3 shadow-[0_8px_32px_rgba(220,38,38,0.3)] backdrop-blur-md flex items-center justify-center">
            <img
              src="/assets/TechLogo.png"
              alt="Parth Choudhary Brand Mark"
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(220,38,38,0.7)]"
            />
          </div>
        </div>

        {/* Big Precision Digital Counter */}
        <div className="flex items-baseline justify-center font-mono font-bold tracking-tight mb-4">
          <span className="text-5xl sm:text-7xl lg:text-8xl text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            {String(displayProgress).padStart(2, "0")}
          </span>
          <span className="text-xl sm:text-3xl text-red-500 ml-1.5 font-sans font-light">
            %
          </span>
        </div>

        {/* Dynamic Telemetry Stage Message */}
        <div className="h-6 flex items-center justify-center mb-6">
          <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-[#ddc08a] font-medium transition-all duration-300">
            {stageText}
          </span>
        </div>

        {/* Sleek Hairline Progress Track */}
        <div className="w-64 sm:w-80 h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5 relative p-[0.5px]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-[#ddc08a] transition-all duration-150 ease-out relative"
            style={{ width: `${displayProgress}%` }}
          >
            {/* Glowing Tip */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,1),0_0_20px_rgba(239,68,68,0.9)]" />
          </div>
        </div>

        {/* Precision Sub-counter bar */}
        <div className="w-64 sm:w-80 mt-2.5 flex justify-between font-mono text-[10px] text-white/40 tracking-wider">
          <span>000</span>
          <span>STAGE: {displayProgress >= 100 ? "READY" : "LOAD"}</span>
          <span>100</span>
        </div>
      </main>

      {/* Bottom Telemetry Footer */}
      <footer className="relative z-10 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] text-[#d8d3cc]/50 tracking-wider">
        <div className="flex items-center gap-2">
          <span>LOC: HIMACHAL PRADESH, IN</span>
          <span className="text-white/20">•</span>
          <span>31.1048° N, 77.1734° E</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ddc08a]" />
          <span className="text-[#ddc08a]">REACT 19 // THREE.JS // WEBGL</span>
        </div>
      </footer>
    </div>
  );
}
