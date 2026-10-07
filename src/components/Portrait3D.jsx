import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'

import { Canvas, useFrame } from '@react-three/fiber'
import {
  useAnimations,
  useGLTF,
  useTexture,
} from '@react-three/drei'

import * as THREE from 'three'

// ------------------------------------------------------------
// Automatic animation sequence
// ------------------------------------------------------------

const AUTO_SEQUENCE = [
  'Breathing',
  'Walking',
  'Breathing',
  'Sitting',
  'Breathing',
  'Running',
]

// ------------------------------------------------------------
// Remove forward/backward root movement from walking/running.
//
// This helps keep the character inside the portrait card
// instead of physically walking out of the frame.
// ------------------------------------------------------------

function removeRootMotion(clip) {
  const cloned = clip.clone()

  cloned.tracks.forEach((track) => {
    const name = track.name.toLowerCase()

    const isRootPosition =
      name.endsWith('.position') &&
      (
        name.includes('hips') ||
        name.includes('root') ||
        name.includes('armature')
      )

    if (!isRootPosition) return

    const values = track.values

    if (!values || values.length < 3) return

    const startX = values[0]
    const startZ = values[2]

    // Position tracks contain:
    // x, y, z, x, y, z...
    //
    // Keep Y animation so body bounce still works,
    // but lock X/Z.
    for (let i = 0; i < values.length; i += 3) {
      values[i] = startX
      values[i + 2] = startZ
    }
  })

  return cloned
}

// ------------------------------------------------------------
// 3D Character
// ------------------------------------------------------------

function Character({ pointer, interactionRef }) {
  const characterRef = useRef()

  // ----------------------------------------------------------
  // Main visible model
  // ----------------------------------------------------------

  const idleGLB = useGLTF(
    '/models/Breathing Idle.glb'
  )

  // ----------------------------------------------------------
  // Your PNG texture
  //
  // public/testure/Texture.png
  // becomes:
  // /testure/Texture.png
  // ----------------------------------------------------------

  const texture = useTexture(
    '/texture/Texture.png'
  )

  // ----------------------------------------------------------
  // Other animation GLBs
  // ----------------------------------------------------------

  const walkingGLB = useGLTF(
    '/models/Walking.glb'
  )

 

  const sittingGLB = useGLTF(
    '/models/Sitting.glb'
  )

  // ----------------------------------------------------------
  // Configure PNG texture
  // ----------------------------------------------------------

  useEffect(() => {
    texture.flipY = false

    // Correct color interpretation for normal PNG color maps
    texture.colorSpace = THREE.SRGBColorSpace

    // Improve texture sharpness
    texture.anisotropy = 8

    texture.needsUpdate = true
  }, [texture])

  // ----------------------------------------------------------
  // Apply Texture.png to every mesh of the visible character
  // ----------------------------------------------------------

  useEffect(() => {
    idleGLB.scene.traverse((child) => {
      if (!child.isMesh && !child.isSkinnedMesh) {
        return
      }

      child.castShadow = true
      child.receiveShadow = true

      // Avoid continuously cloning materials during
      // React development / Strict Mode.
      if (child.userData.portfolioTextureApplied) {
        return
      }

      const applyTexture = (originalMaterial) => {
        if (!originalMaterial) return originalMaterial

        const material = originalMaterial.clone()

        // Main PNG color texture
        material.map = texture

        // Prevent the base material color from tinting
        // the PNG.
        if (material.color) {
          material.color.set(0xffffff)
        }

        material.needsUpdate = true

        return material
      }

      if (Array.isArray(child.material)) {
        child.material =
          child.material.map(applyTexture)
      } else {
        child.material =
          applyTexture(child.material)
      }

      child.userData.portfolioTextureApplied = true
    })
  }, [idleGLB.scene, texture])

  
  const animationClips = useMemo(() => {
    const clips = []

    if (idleGLB.animations[0]) {
      const breathing =
        idleGLB.animations[0].clone()

      breathing.name = 'Breathing'

      clips.push(breathing)
    }

    if (walkingGLB.animations[0]) {
      const walking =
        removeRootMotion(
          walkingGLB.animations[0]
        )

      walking.name = 'Walking'

      clips.push(walking)
    }

    

    if (sittingGLB.animations[0]) {
      const sitting =
        removeRootMotion(
          sittingGLB.animations[0]
        )

      sitting.name = 'Sitting'

      clips.push(sitting)
    }

    return clips
  }, [
    idleGLB.animations,
    walkingGLB.animations,
    sittingGLB.animations,
  ])

  // ----------------------------------------------------------
  // Animation mixer
  // ----------------------------------------------------------

  const { actions } = useAnimations(
    animationClips,
    characterRef
  )

  const currentAnimation = useRef(null)
  const autoIndex = useRef(0)

  // ----------------------------------------------------------
  // Smooth animation switching
  // ----------------------------------------------------------

  const playAnimation = useCallback(
    (name, fadeDuration = 0.45) => {
      const nextAction = actions[name]

      if (!nextAction) return

      // Don't restart the same animation repeatedly.
      if (
        currentAnimation.current === name
      ) {
        return
      }

      const previousName =
        currentAnimation.current

      const previousAction =
        previousName
          ? actions[previousName]
          : null

      nextAction
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(fadeDuration)
        .play()

      if (previousAction) {
        previousAction.fadeOut(
          fadeDuration
        )
      }

      currentAnimation.current = name
    },
    [actions]
  )

  // ----------------------------------------------------------
  // Let Portrait3D mouse events control animations
  // ----------------------------------------------------------

  useEffect(() => {
    interactionRef.current.play =
      playAnimation

    return () => {
      interactionRef.current.play = null
    }
  }, [
    interactionRef,
    playAnimation,
  ])

  // ----------------------------------------------------------
  // Initial animation
  // ----------------------------------------------------------

  useEffect(() => {
    if (!actions.Breathing) return

    playAnimation(
      'Breathing',
      0.25
    )
  }, [
    actions,
    playAnimation,
  ])

  // ----------------------------------------------------------
  // Automatic animations
  //
  // If the visitor isn't using the mouse over the model,
  // the character performs animations by itself.
  // ----------------------------------------------------------

  useEffect(() => {
    const interval =
      setInterval(() => {
        if (
          interactionRef.current
            .isInteracting
        ) {
          return
        }

        autoIndex.current =
          (
            autoIndex.current + 1
          ) %
          AUTO_SEQUENCE.length

        const nextAnimation =
          AUTO_SEQUENCE[
            autoIndex.current
          ]

        playAnimation(
          nextAnimation,
          0.5
        )
      }, 6500)

    return () => {
      clearInterval(interval)
    }
  }, [
    interactionRef,
    playAnimation,
  ])

  // ----------------------------------------------------------
  // Mouse-follow rotation
  // ----------------------------------------------------------

  useFrame(() => {
    if (!characterRef.current) {
      return
    }

    // Left/right mouse movement
    const targetRotationY =
      pointer.current.x * 0.32

    // Very small up/down movement
    const targetRotationX =
      -pointer.current.y * 0.035

    characterRef.current.rotation.y =
      THREE.MathUtils.lerp(
        characterRef.current.rotation.y,
        targetRotationY,
        0.055
      )

    characterRef.current.rotation.x =
      THREE.MathUtils.lerp(
        characterRef.current.rotation.x,
        targetRotationX,
        0.035
      )
  })

  return (
    <group
      ref={characterRef}

      // Adjust these if necessary
      position={[0, -1.15, 0]}
      scale={1.65}
    >
      <primitive
        object={idleGLB.scene}
      />
    </group>
  )
}

// ------------------------------------------------------------
// Main Portrait component
// ------------------------------------------------------------

export default function Portrait3D() {
  const pointer = useRef({
    x: 0,
    y: 0,
  })

  const interactionRef = useRef({
    play: null,
    isInteracting: false,
  })

  const previousPointer = useRef({
    x: 0,
    y: 0,
    time: 0,
  })

  const idleTimer = useRef(null)
  const runningTimer = useRef(null)
  const interactionTimer =
    useRef(null)

  const resumeTimer = useRef(null)

  // ----------------------------------------------------------
  // Clear timer helper
  // ----------------------------------------------------------

  const clearTimer = (timer) => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }

  // ----------------------------------------------------------
  // Mouse enters
  // ----------------------------------------------------------

  const handlePointerEnter = () => {
    interactionRef.current
      .isInteracting = true

    interactionRef.current
      .play?.(
        'Walking',
        0.4
      )
  }

  // ----------------------------------------------------------
  // Mouse moves
  // ----------------------------------------------------------

  const handlePointerMove = (
    event
  ) => {
    const rect =
      event.currentTarget
        .getBoundingClientRect()

    const normalizedX =
      (
        (
          event.clientX -
          rect.left
        ) /
        rect.width -
        0.5
      ) *
      2

    const normalizedY =
      (
        (
          event.clientY -
          rect.top
        ) /
        rect.height -
        0.5
      ) *
      2

    pointer.current.x =
      normalizedX

    pointer.current.y =
      normalizedY

    // --------------------------------------------------------
    // Calculate mouse speed
    // --------------------------------------------------------

    const now =
      performance.now()

    const old =
      previousPointer.current

    const distance =
      Math.hypot(
        normalizedX - old.x,
        normalizedY - old.y
      )

    const deltaTime =
      now - old.time || 16

    const speed =
      distance / deltaTime

    previousPointer.current = {
      x: normalizedX,
      y: normalizedY,
      time: now,
    }

    interactionRef.current
      .isInteracting = true

    // --------------------------------------------------------
    // Fast mouse movement = run
    // --------------------------------------------------------

    if (speed > 0.006) {
      interactionRef.current
        .play?.(
          'Running',
          0.25
        )

      clearTimer(runningTimer)

      runningTimer.current =
        setTimeout(() => {
          interactionRef.current
            .play?.(
              'Walking',
              0.4
            )
        }, 1100)
    }

    // --------------------------------------------------------
    // Mouse stops = breathe
    // --------------------------------------------------------

    clearTimer(idleTimer)

    idleTimer.current =
      setTimeout(() => {
        interactionRef.current
          .play?.(
            'Breathing',
            0.5
          )
      }, 1800)

    // --------------------------------------------------------
    // After no activity, allow automatic animation again
    // --------------------------------------------------------

    clearTimer(
      interactionTimer
    )

    interactionTimer.current =
      setTimeout(() => {
        interactionRef.current
          .isInteracting = false
      }, 4500)
  }

  // ----------------------------------------------------------
  // Mouse leaves
  // ----------------------------------------------------------

  const handlePointerLeave =
    () => {
      pointer.current.x = 0
      pointer.current.y = 0

      clearTimer(idleTimer)
      clearTimer(runningTimer)
      clearTimer(
        interactionTimer
      )
      clearTimer(resumeTimer)

      interactionRef.current
        .play?.(
          'Breathing',
          0.5
        )

      resumeTimer.current =
        setTimeout(() => {
          interactionRef.current
            .isInteracting = false
        }, 2500)
    }

  // ----------------------------------------------------------
  // Cleanup timers
  // ----------------------------------------------------------

  useEffect(() => {
    return () => {
      clearTimer(idleTimer)
      clearTimer(runningTimer)
      clearTimer(
        interactionTimer
      )
      clearTimer(resumeTimer)
    }
  }, [])

  return (
    <div
      className="w-full h-full"
      onPointerEnter={
        handlePointerEnter
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        handlePointerLeave
      }
    >
      <Canvas
        camera={{
          position: [0, 1, 7],
          fov: 32,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        dpr={[1, 2]}
      >
        {/* General light */}
        <ambientLight
          intensity={1.7}
        />

        {/* Main/front light */}
        <directionalLight
          position={[4, 6, 5]}
          intensity={2.2}
        />

        {/* Left fill light */}
        <directionalLight
          position={[-4, 3, 4]}
          intensity={1}
        />

        {/* Rim/back light */}
        <directionalLight
          position={[0, 5, -4]}
          intensity={0.7}
        />

        <Character
          pointer={pointer}
          interactionRef={
            interactionRef
          }
        />
      </Canvas>
    </div>
  )
}

// ------------------------------------------------------------
// Preload model + animation files
// ------------------------------------------------------------

useGLTF.preload(
  '/models/Breathing Idle.glb'
)

useGLTF.preload(
  '/models/Walking.glb'
)

useGLTF.preload(
  '/models/Running.glb'
)

useGLTF.preload(
  '/models/Sitting.glb'
)

// Preload texture
useTexture.preload(
  '/texture/Texture.png'
)