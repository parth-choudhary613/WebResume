import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, SoftShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useMediaQuery } from './useHeroActivity';
import SceneBoundary from './SceneBoundary';

const objects = [
  { type: 'panel', position: [-2.5, 1.5, -2], rotation: [0.2, 0.4, -0.1], scale: [2.5, 1.5, 1], color: '#F0EFEA' },
  { type: 'panel', position: [3, -1, -3], rotation: [-0.1, -0.3, 0.2], scale: [2, 2.5, 1], color: '#D1C4E9' },
  { type: 'panel', position: [1.8, 1, 0], rotation: [-0.2, -0.1, 0.1], scale: [1.5, 0.6, 1], color: '#FF8E7C' },
  { type: 'capsule', position: [-1.5, -1.2, 1], rotation: [0.4, 0, -0.6], scale: [0.8, 0.8, 0.8], color: '#FF8E7C' },
  { type: 'capsule', position: [3, 2, 0.5], rotation: [0, 0, 0.8], scale: [1, 1, 1], color: '#C5E1A5' },
  { type: 'sphere', position: [0.5, 2, 1.5], scale: [0.6, 0.6, 0.6], color: '#D1C4E9' },
  { type: 'sphere', position: [-2.8, 0, 0.5], scale: [0.4, 0.4, 0.4], color: '#C5E1A5' },
];
const motionSettings = { panel: [1.5, 0.5, 1], capsule: [2, 0.8, 1.2], sphere: [1.2, 0.2, 0.8] };

function ClayObject({ object }) {
  const { type, ...props } = object;
  const { color, ...transform } = props;
  const material = <meshStandardMaterial color={color} metalness={0.1}
    roughness={type === 'panel' ? 0.8 : type === 'capsule' ? 0.85 : 0.7} />;
  if (type === 'panel') return (
    <RoundedBox args={[1, 1, 0.15]} radius={0.05} smoothness={4} {...transform} castShadow receiveShadow>
      {material}
    </RoundedBox>
  );
  return (
    <mesh {...transform} castShadow receiveShadow>
      {type === 'capsule' ? <capsuleGeometry args={[0.25, 1, 4, 16]} /> : <sphereGeometry args={[0.5, 32, 32]} />}
      {material}
    </mesh>
  );
}

function Scene({ pointer, active, reduced, onReady, onSlow }) {
  const group = useRef();
  const floats = useRef([]);
  const time = useRef(0);
  const warmFrames = useRef(0);
  const skipDelta = useRef(true);
  const samples = useRef({ count: 0, total: 0, best: 1 / 60, windows: 0 });
  const invalidate = useThree(state => state.invalidate);
  useEffect(() => {
    skipDelta.current = true;
    samples.current.count = 0;
    samples.current.total = 0;
    if (active) invalidate();
  }, [active, reduced, invalidate]);

  useFrame((_, delta) => {
    if (!active) return;
    // Ignore the first delta after resume; never advance by time spent offscreen.
    const dt = skipDelta.current ? 0 : Math.min(delta, 1 / 30);
    skipDelta.current = false;
    if (!reduced) time.current += dt;
    const alpha = 1 - Math.exp(-3.0776 * dt); // Same feel as 0.05 at 60 Hz.
    const x = reduced ? 0 : pointer.current.x * Math.PI / 8;
    const y = reduced ? 0 : pointer.current.y * Math.PI / 8;
    group.current.rotation.y = reduced ? 0 : THREE.MathUtils.lerp(group.current.rotation.y, x, alpha);
    group.current.rotation.x = reduced ? 0 : THREE.MathUtils.lerp(group.current.rotation.x, y, alpha);
    floats.current.forEach((node, i) => {
      if (!node) return;
      const [speed, rotation, intensity] = motionSettings[objects[i].type];
      const t = (time.current + i * 1.73) * speed / 4;
      node.rotation.set(reduced ? 0 : Math.cos(t) / 8 * rotation,
        reduced ? 0 : Math.sin(t) / 8 * rotation,
        reduced ? 0 : Math.sin(t) / 20 * rotation);
      node.position.y = reduced ? 0 : Math.sin(t) / 10 * intensity;
    });
    // A following animation frame fires after this frame's actual render.
    if (warmFrames.current < 2) {
      warmFrames.current += 1;
      if (warmFrames.current === 2) onReady();
      else invalidate(); // Also warms the static reduced-motion scene.
    }
    // Drop only resolution after sustained missed frames. No shader rebuilds,
    // no per-frame React state, and no quality oscillation while scrolling.
    if (!reduced && time.current > 2 && delta > 0 && delta < 0.1) {
      const s = samples.current;
      s.best = Math.max(1 / 144, Math.min(s.best, delta));
      s.total += delta;
      if (++s.count === 120) {
        s.windows = s.total / s.count > s.best * 1.35 ? s.windows + 1 : 0;
        if (s.windows >= 2) { onSlow(); s.windows = 0; }
        s.count = 0;
        s.total = 0;
      }
    }
  });
  return <group ref={group}>{objects.map((object, i) => (
    <group key={i} ref={node => { floats.current[i] = node; }}><ClayObject object={object} /></group>
  ))}</group>;
}

export default function HeroScene({ eventSource, active, reduced }) {
  const compact = useMediaQuery('(max-width: 767px)');
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const pointer = useRef({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const [resolution, setResolution] = useState(1.5);
  // Keep shader sample count fixed for this mount to avoid recompilation on resize.
  const [quality] = useState(() => window.matchMedia('(max-width: 767px)').matches
    ? { samples: 6, mapSize: 512 } : { samples: 10, mapSize: 1024 });
  const revealFrame = useRef();
  const onReady = useCallback(() => {
    revealFrame.current = requestAnimationFrame(() => setReady(true));
  }, []);
  const onSlow = useCallback(() => setResolution(value => Math.max(1, value - 0.25)), []);
  useEffect(() => () => cancelAnimationFrame(revealFrame.current), []);
  useEffect(() => {
    const element = eventSource.current;
    pointer.current.x = pointer.current.y = 0;
    if (!element || !active || reduced || !finePointer) return;
    let rect = element.getBoundingClientRect();
    let dirty = false;
    const measure = () => { rect = element.getBoundingClientRect(); dirty = false; };
    const move = event => {
      if (dirty) measure();
      if (event.pointerType === 'touch' || !rect.width || !rect.height) return;
      pointer.current.x = THREE.MathUtils.clamp((event.clientX - rect.left) / rect.width * 2 - 1, -1, 1);
      pointer.current.y = THREE.MathUtils.clamp(1 - (event.clientY - rect.top) / rect.height * 2, -1, 1);
    };
    const reset = () => { pointer.current.x = pointer.current.y = 0; };
    const resize = new ResizeObserver(measure);
    resize.observe(element);
    element.addEventListener('pointerenter', measure, { passive: true });
    element.addEventListener('pointermove', move, { passive: true });
    element.addEventListener('pointerleave', reset, { passive: true });
    // Scroll only resets the target; no layout reads or React updates per scroll.
    const scroll = () => { dirty = true; reset(); };
    window.addEventListener('scroll', scroll, { passive: true, capture: true });
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      resize.disconnect();
      element.removeEventListener('pointerenter', measure);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerleave', reset);
      window.removeEventListener('scroll', scroll, true);
      window.removeEventListener('resize', measure);
    };
  }, [eventSource, active, reduced, finePointer]);

  const scene = <Scene pointer={pointer} active={active} reduced={reduced} onReady={onReady} onSlow={onSlow} />;
  return (
    <div className="hero-canvas-container" data-ready={ready} aria-hidden="true">
      <Canvas frameloop={active && !reduced ? 'always' : 'demand'} shadows
        camera={{ position: [0, 0, 8], fov: 40 }}
        dpr={[1, Math.min(resolution, compact ? 1.25 : 1.5)]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        resize={{ scroll: false }} fallback={<span />}>
        <SoftShadows size={15} samples={quality.samples} focus={0.5} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow
          shadow-mapSize={quality.mapSize} shadow-bias={-0.0001} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#FF8E7C" />
        <SceneBoundary fallback={scene}>
          <Suspense fallback={null}>
            <Environment preset="city" environmentIntensity={0.2} />
            {scene}
          </Suspense>
        </SceneBoundary>
      </Canvas>
    </div>
  );
}
