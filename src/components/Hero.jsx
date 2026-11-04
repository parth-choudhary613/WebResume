/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';

const HERO_PROMPT =
  'I build fast, expressive, and interactive digital experiences blending React, fluid motion, and modern web';

function useTypewriter(text, speed = 36, startDelay = 500) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    let timer;

    const initialTimer = window.setTimeout(() => {
      setDisplayed('');
      setDone(false);

      function typeNext() {
        index += 1;
        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          setDone(true);
        } else {
          timer = window.setTimeout(typeNext, speed);
        }
      }

      typeNext();
    }, startDelay);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearTimeout(timer);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function useVideoScrub(videoRef) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sensitivity = 0.85;
    const smoothingMs = 45;
    const settleSeconds = 0.002;

    let pointerId = null;
    let previousX = null;
    let target = video.currentTime || 0;
    let smoothed = target;
    let lastRequested = target;
    let lastTick = null;
    let frame = null;

    function schedule() {
      if (frame === null) {
        frame = window.requestAnimationFrame(tick);
      }
    }

    function tick(now) {
      frame = null;

      const elapsed = lastTick === null ? 0 : Math.max(0, now - lastTick);
      lastTick = now;

      // Time-based easing feels consistent across 60Hz/120Hz/144Hz displays
      const weight = 1 - Math.exp(-elapsed / smoothingMs);
      smoothed += (target - smoothed) * weight;

      const settled = Math.abs(target - smoothed) <= settleSeconds;
      if (settled) smoothed = target;

      if (!video.seeking && smoothed !== lastRequested) {
        lastRequested = smoothed;
        try {
          video.currentTime = smoothed;
        } catch {
          // Ignore seeking edge cases during decoder reset
        }
      }

      if (settled) {
        lastTick = null;
      } else {
        schedule();
      }
    }

    function onSeeked() {
      if (smoothed !== lastRequested) schedule();
    }

    function onPointerDown(event) {
      pointerId = event.pointerId;
      previousX = event.clientX;
    }

    function onPointerMove(event) {
      const x = event.clientX;
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      // If active drag or primary pointer movement
      if (pointerId !== null && previousX !== null) {
        const delta = x - previousX;
        previousX = x;
        const offset = (delta / Math.max(320, window.innerWidth)) * sensitivity * duration;
        const next = Math.max(0, Math.min(duration, target + offset));
        if (next !== target) {
          target = next;
          if (lastTick === null) lastTick = performance.now();
          schedule();
        }
      } else if (event.pointerType === 'mouse') {
        // Desktop mouse hover scrubbing: subtle motion tracking mouse position
        const relX = Math.max(0, Math.min(1, x / window.innerWidth));
        const hoverTarget = relX * duration;
        target = hoverTarget;
        if (lastTick === null) lastTick = performance.now();
        schedule();
      }
    }

    function resetPointer() {
      pointerId = null;
      previousX = null;
    }

    function onPointerUp() {
      resetPointer();
    }

    const heroEl = video.closest('.hero') || window;

    video.addEventListener('seeked', onSeeked);
    heroEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', resetPointer);
    window.addEventListener('blur', resetPointer);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      video.removeEventListener('seeked', onSeeked);
      heroEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', resetPointer);
      window.removeEventListener('blur', resetPointer);
    };
  }, [videoRef]);
}

export default function Hero() {
  const videoRef = useRef(null);
  const { displayed, done } = useTypewriter(HERO_PROMPT);

  useVideoScrub(videoRef);

  return (
    <section className="hero" id="top" aria-label="Hero Introduction">
      {/* Background Interactive Video */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        className="hero__video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Atmospheric Contrast Scrim for Universal Legibility */}
      <div className="hero__scrim" aria-hidden="true" />

      {/* Main Responsive Editorial Content Container */}
      <div className="hero__content">
        <div className="hero__column">
          <h1 className="hero__headline">
            <span className="hero__sr-only">
              I craft interfaces that feel alive.
            </span>

            <span className="hero__headline-art" aria-hidden="true">
              <span className="hero__craft">I craft</span>
              <span className="hero__interfaces">interfaces</span>

              <span className="hero__last-line">
                <span className="hero__connector">
                  <span>that</span>
                  <span>feel</span>
                </span>
                <span className="hero__alive">alive.</span>
              </span>
            </span>
          </h1>

          <p className="hero__prompt">
            <span className="hero__sr-only">{HERO_PROMPT}</span>
            <span aria-hidden="true">
              {displayed}
              {!done && <span className="hero__cursor" />}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}