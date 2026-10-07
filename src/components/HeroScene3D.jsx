import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, SoftShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';

// --- Color Palettes ---
const palettes = {
  light: {
    panelBg: "#F0EFEA",
    accent1: "#FF8E7C", // Coral
    accent2: "#D1C4E9", // Lavender
    accent3: "#C5E1A5", // Lime
    ambient: 0.6,
    directional: 1.2
  },
  dark: {
    panelBg: "#222222",
    accent1: "#D85E4D", // Darker Coral
    accent2: "#8374A0", // Muted Lavender
    accent3: "#6B8550", // Muted Lime
    ambient: 0.3,
    directional: 0.8
  }
};

// Custom Hook to animate material colors smoothly
const useSmoothColor = (color) => {
  const materialRef = useRef();
  const targetColor = new THREE.Color(color);
  
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.color.lerp(targetColor, 0.05);
    }
  });
  return materialRef;
};

// Custom Clay Component - UI Panel
const ClayPanel = ({ position, rotation, scale, color }) => {
  const materialRef = useSmoothColor(color);
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <RoundedBox args={[1, 1, 0.15]} radius={0.05} smoothness={4} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
        <meshStandardMaterial ref={materialRef} roughness={0.8} metalness={0.1} />
      </RoundedBox>
    </Float>
  );
};

// Custom Clay Component - Code/Node Capsule
const ClayCapsule = ({ position, rotation, scale, color }) => {
  const materialRef = useSmoothColor(color);
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
        <capsuleGeometry args={[0.25, 1, 4, 16]} />
        <meshStandardMaterial ref={materialRef} roughness={0.85} metalness={0.1} />
      </mesh>
    </Float>
  );
};

// Custom Clay Component - Node Sphere
const ClaySphere = ({ position, scale, color }) => {
  const materialRef = useSmoothColor(color);
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8}>
      <mesh position={position} scale={scale} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial ref={materialRef} roughness={0.7} metalness={0.1} />
      </mesh>
    </Float>
  );
};

const SceneContainer = ({ colors }) => {
  const groupRef = useRef();

  useFrame((state) => {
    // Smooth mouse parallax interpolation
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
  });

  return (
    <group ref={groupRef}>
      {/* Background large panels */}
      <ClayPanel position={[-2.5, 1.5, -2]} rotation={[0.2, 0.4, -0.1]} scale={[2.5, 1.5, 1]} color={colors.panelBg} />
      <ClayPanel position={[3, -1, -3]} rotation={[-0.1, -0.3, 0.2]} scale={[2, 2.5, 1]} color={colors.accent2} />
      
      {/* Foreground abstract UI elements */}
      <ClayPanel position={[1.8, 1, 0]} rotation={[-0.2, -0.1, 0.1]} scale={[1.5, 0.6, 1]} color={colors.accent1} />
      <ClayCapsule position={[-1.5, -1.2, 1]} rotation={[0.4, 0, -0.6]} scale={[0.8, 0.8, 0.8]} color={colors.accent1} />
      <ClayCapsule position={[3, 2, 0.5]} rotation={[0, 0, 0.8]} scale={[1, 1, 1]} color={colors.accent3} />
      
      {/* Accents */}
      <ClaySphere position={[0.5, 2, 1.5]} scale={[0.6, 0.6, 0.6]} color={colors.accent2} />
      <ClaySphere position={[-2.8, 0, 0.5]} scale={[0.4, 0.4, 0.4]} color={colors.accent3} />
    </group>
  );
};

export default function HeroScene({ theme }) {
  const colors = palettes[theme];

  return (
    <div className="hero-canvas-container">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
        <SoftShadows size={15} samples={10} focus={0.5} />
        
        {/* Soft Studio Lighting setup */}
        <ambientLight intensity={colors.ambient} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={colors.directional} 
          castShadow 
          shadow-mapSize={1024}
          shadow-bias={-0.0001}
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color={colors.accent1} />
        
        <Suspense fallback={null}>
          <Environment preset="city" environmentIntensity={0.2} />
          <SceneContainer colors={colors} />
        </Suspense>
      </Canvas>
    </div>
  );
}