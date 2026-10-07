import React, { useRef, useMemo, Suspense, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Abstract Frontend Interface Architecture Object
function InterfaceSystemModel({ dark, prefersReducedMotion }) {
  const rootRef = useRef()
  const topLayerRef = useRef()
  const midLayerRef = useRef()
  const btmLayerRef = useRef()
  const ringRef = useRef()

  // Theme-reactive color tokens
  const colors = useMemo(() => {
    return dark
      ? {
          slab: '#1F211D',
          slabWire: '#3E4239',
          accent: '#4E876A',
          accentMuted: '#2D4436',
          node: '#',
          wire: '#52564C',
          ring: '#4E876A',
        }
      : {
          slab: '#E5E2D8',
          slabWire: '#C2BEB2',
          accent: '#254F3A',
          accentMuted: '#C8D5CD',
          node: '#151515',
          wire: '#7D7A72',
          ring: '#254F3A',
        }
  }, [dark])

  // Component tree connecting line geometry
  const treeLines = useMemo(() => {
    const points = [
      // Root to left child
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-0.6, 0, -0.3),
      // Root to right child
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.6, 0, -0.2),
      // Root to front child
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.1, 0, 0.4),
    ]
    const geom = new THREE.BufferGeometry().setFromPoints(points)
    return geom
  }, [])

  // Viewport wireframe lines on top layer
  const viewportWire = useMemo(() => {
    const pts = [
      // Nav bar
      new THREE.Vector3(-0.8, 0.02, -0.5),
      new THREE.Vector3(0.8, 0.02, -0.5),
      // Divider
      new THREE.Vector3(-0.8, 0.02, -0.3),
      new THREE.Vector3(0.8, 0.02, -0.3),
      // Left rail
      new THREE.Vector3(-0.3, 0.02, -0.3),
      new THREE.Vector3(-0.3, 0.02, 0.5),
    ]
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [])

  useFrame((state, delta) => {
    if (prefersReducedMotion || !rootRef.current) return

    // Extremely slow, elegant idle rotation
    rootRef.current.rotation.y += delta * 0.12

    // Restrained pointer parallax (dampened)
    const targetRotX = (state.pointer.y * -0.15) + 0.35 // slight default downward tilt
    const targetRotZ = state.pointer.x * 0.12

    rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, targetRotX, 0.04)
    rootRef.current.rotation.z = THREE.MathUtils.lerp(rootRef.current.rotation.z, targetRotZ, 0.04)

    // Micro plane levitation (breathing effect < 2px equivalent)
    const t = state.clock.getElapsedTime()
    if (topLayerRef.current) {
      topLayerRef.current.position.y = 0.55 + Math.sin(t * 0.8) * 0.02
    }
    if (btmLayerRef.current) {
      btmLayerRef.current.position.y = -0.55 - Math.sin(t * 0.8) * 0.015
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.08
    }
  })

  return (
    <group ref={rootRef} position={[0, 0, 0]} rotation={[0.35, -0.4, 0]}>
      {/* ================= LAYER 1 (TOP): DOM VIEWPORT LAYER ================= */}
      <group ref={topLayerRef} position={[0, 0.55, 0]}>
        {/* Main translucent viewport plane */}
        <mesh>
          <boxGeometry args={[1.9, 0.03, 1.3]} />
          <meshStandardMaterial
            color={colors.slab}
            transparent
            opacity={0.85}
            roughness={0.4}
            metalness={0.1}
          />
        </mesh>

        {/* Viewport perimeter edges */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.9, 0.03, 1.3)]} />
          <lineBasicMaterial color={colors.slabWire} linewidth={1} />
        </lineSegments>

        {/* Wireframe UI structure */}
        <lineSegments geometry={viewportWire}>
          <lineBasicMaterial color={colors.wire} transparent opacity={0.6} />
        </lineSegments>

        {/* Interactive UI Action Node (Button / Focal interaction) */}
        <mesh position={[0.4, 0.035, 0.2]}>
          <boxGeometry args={[0.4, 0.02, 0.18]} />
          <meshStandardMaterial color={colors.accent} roughness={0.3} />
        </mesh>

        {/* Header avatar node */}
        <mesh position={[-0.65, 0.035, -0.4]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
          <meshStandardMaterial color={colors.node} />
        </mesh>
      </group>

      {/* ================= LAYER 2 (MIDDLE): VIRTUAL COMPONENT TREE ================= */}
      <group ref={midLayerRef} position={[0, 0, 0]}>
        {/* Semi-transparent component lattice plane */}
        <mesh>
          <boxGeometry args={[1.7, 0.02, 1.1]} />
          <meshStandardMaterial
            color={colors.slab}
            transparent
            opacity={0.45}
            roughness={0.5}
            wireframe={false}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.7, 0.02, 1.1)]} />
          <lineBasicMaterial color={colors.slabWire} transparent opacity={0.4} />
        </lineSegments>

        {/* Root Node: Central Interface Component */}
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.16, 0.16, 0.16]} />
          <meshStandardMaterial color={colors.accent} roughness={0.2} metalness={0.3} />
        </mesh>

        {/* Component Tree Branches */}
        <lineSegments geometry={treeLines}>
          <lineBasicMaterial color={colors.wire} />
        </lineSegments>

        {/* Child Component Nodes */}
        <mesh position={[-0.6, 0.06, -0.3]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color={colors.node} roughness={0.4} />
        </mesh>
        <mesh position={[0.6, 0.06, -0.2]}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color={colors.node} roughness={0.4} />
        </mesh>
        <mesh position={[0.1, 0.06, 0.4]}>
          <boxGeometry args={[0.09, 0.09, 0.09]} />
          <meshStandardMaterial color={colors.accent} roughness={0.4} />
        </mesh>

        {/* Floating JSX Bracket accents */}
        <mesh position={[-0.78, 0.04, 0.35]} rotation={[0, 0.4, 0]}>
          <boxGeometry args={[0.02, 0.12, 0.08]} />
          <meshStandardMaterial color={colors.wire} />
        </mesh>
        <mesh position={[0.78, 0.04, 0.35]} rotation={[0, -0.4, 0]}>
          <boxGeometry args={[0.02, 0.12, 0.08]} />
          <meshStandardMaterial color={colors.wire} />
        </mesh>
      </group>

      {/* ================= LAYER 3 (BOTTOM): STATE & DATA STORE ================= */}
      <group ref={btmLayerRef} position={[0, -0.55, 0]}>
        <mesh>
          <boxGeometry args={[2.0, 0.03, 1.4]} />
          <meshStandardMaterial
            color={colors.slab}
            transparent
            opacity={0.7}
            roughness={0.6}
          />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.0, 0.03, 1.4)]} />
          <lineBasicMaterial color={colors.slabWire} />
        </lineSegments>

        {/* Atomic Store Slices / State tokens */}
        {[-0.5, 0, 0.5].map((x, i) => (
          <mesh key={i} position={[x, 0.04, -0.2]}>
            <cylinderGeometry args={[0.07, 0.07, 0.03, 12]} />
            <meshStandardMaterial color={i === 1 ? colors.accent : colors.node} roughness={0.3} />
          </mesh>
        ))}
        {[-0.25, 0.25].map((x, i) => (
          <mesh key={`b-${i}`} position={[x, 0.04, 0.3]}>
            <boxGeometry args={[0.12, 0.02, 0.12]} />
            <meshStandardMaterial color={colors.node} roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* ================= ORBIT: ATOMIC RECONCILIATION CYCLE ================= */}
      <mesh
        ref={ringRef}
        rotation={[Math.PI / 3, 0.2, 0]}
        position={[0, 0, 0]}
      >
        <torusGeometry args={[1.5, 0.007, 16, 80]} />
        <meshStandardMaterial
          color={colors.ring}
          transparent
          opacity={0.5}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
    </group>
  )
}

import ArchitecturalFallback from './ArchitecturalFallback'

export { ArchitecturalFallback }

// Main 3D Canvas Container
export default function HeroScene3D({ dark }) {
  const [hasWebGL, setHasWebGL] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check WebGL availability safely
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setHasWebGL(false)
    } catch (e) {
      setHasWebGL(false)
    }

    // Check reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const listener = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  if (!hasWebGL) {
    return <ArchitecturalFallback dark={dark} />
  }

  return (
    <div className="relative w-full h-[340px] sm:h-[400px] lg:h-[440px] flex items-center justify-center">
      <Suspense fallback={<ArchitecturalFallback dark={dark} />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 1.2, 3.8], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Subtle directional and ambient lighting */}
          <ambientLight intensity={dark ? 0.8 : 1.1} />
          <directionalLight
            position={[4, 6, 4]}
            intensity={dark ? 1.2 : 1.4}
            color="#FFFFFF"
          />
          <directionalLight
            position={[-4, -2, -2]}
            intensity={0.4}
            color={dark ? '#4E876A' : '#C8D5CD'}
          />

          <InterfaceSystemModel
            dark={dark}
            prefersReducedMotion={prefersReducedMotion}
          />
        </Canvas>
      </Suspense>

      {/* Discreet interactive metadata annotation */}
      <div className="absolute bottom-2 right-3 pointer-events-none font-mono text-[10px] tracking-wider text-text-muted select-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        <span>REACT_SYSTEM_MODEL // 3D</span>
      </div>
    </div>
  )
}
