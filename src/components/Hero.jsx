import { lazy, Suspense, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import './Hero.css';

// Content and the CSS sculpture stay visible while the 3D chunk loads.
const ClayScene = lazy(() => import('./hero/ClayScene').catch(() => ({ default: () => null })));
const motionPreference = '(prefers-reduced-motion: reduce)';
function subscribeToMotion(callback) {
  const media = window.matchMedia(motionPreference);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function ClayFallback() {
  return (
    <div className="hero-clay-fallback">
      <div className="clay-shadow" />
      <div className="clay-panel clay-panel-back" />
      <div className="clay-panel clay-panel-front">
        <div className="clay-toolbar"><i /><i /><i /></div>
        <div className="clay-layout">
          <div className="clay-layout-sidebar"><i /><i /><i /></div>
          <div className="clay-layout-body"><i /><i /><i /></div>
        </div>
      </div>
      <div className="clay-ring" />
      <div className="clay-tile"><i /><i /></div>
      <div className="clay-node" />
    </div>
  );
}

export default function Hero() {
  const interactionRef = useRef(null);
  const [sceneReady, setSceneReady] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia(motionPreference).matches,
    () => true,
  );

  return (
    <div className="portfolio-hero" ref={interactionRef}>
      <div className="hero-inner">
        <div className="hero-content">
          <p className="hero-eyebrow hero-reveal" style={{ '--reveal-delay': '0ms' }}>
            <span className="hero-eyebrow-line" />A portfolio by Parth Choudhary
          </p>
          <h1 id="hero-heading" tabIndex={-1} className="hero-heading">
            <span className="hero-reveal" style={{ '--reveal-delay': '90ms' }}>Frontend /</span>
            <span className="hero-reveal" style={{ '--reveal-delay': '170ms' }}>React <span className="hero-heading-soft">developer.</span></span>
          </h1>
          <p className="hero-description hero-reveal" style={{ '--reveal-delay': '260ms' }}>
            Thoughtful interfaces. Seamless interactions.<br className="hero-desktop-break" />
            {' '}I turn ideas into web experiences that feel right.
          </p>
          <div className="hero-actions hero-reveal" style={{ '--reveal-delay': '340ms' }}>
            <a className="hero-button hero-button-primary" href="#projects">
              Explore my work <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
            </a>
            <a className="hero-button hero-button-secondary" href="#contact">
              Let’s talk <ArrowUpRight size={18} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-skills hero-reveal" style={{ '--reveal-delay': '420ms' }} aria-label="Core technologies">
            <span>React</span><span>JavaScript</span><span>Tailwind CSS</span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true" data-ready={sceneReady}>
          <ClayFallback />
          <Suspense fallback={null}>
            <ClayScene interactionRef={interactionRef} reducedMotion={reducedMotion} onReady={setSceneReady} />
          </Suspense>
          <div className="hero-art-caption">
            <span className="hero-art-index">01 /</span>
            <span>Small components.<br />Considered experiences.</span>
          </div>
        </div>
        <div className="hero-bottom hero-reveal" style={{ '--reveal-delay': '500ms' }}>
          <a className="hero-scroll" href="#about">
            <span className="hero-scroll-icon"><ArrowDown size={15} strokeWidth={1.5} aria-hidden="true" /></span>
            Scroll to discover
          </a>
          <span className="hero-bottom-note">Built with intention, down to the last detail.</span>
        </div>
      </div>
    </div>
  );
}
