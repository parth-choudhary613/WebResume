import { useEffect, useRef } from 'react'

// The scene is decorative. Hero content and its CSS sculpture remain usable while
// Three.js loads, or when this device cannot create a WebGL context.
export default function ClayScene({ interactionRef, reducedMotion = false, onReady }) {
  const containerRef = useRef(null)
  const readyCallbackRef = useRef(onReady)

  useEffect(() => {
    readyCallbackRef.current = onReady
  }, [onReady])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    let cancelled = false
    let disposeScene = () => {}

    const setReady = (ready) => {
      if (cancelled) return
      container.dataset.ready = String(ready)
      readyCallbackRef.current?.(ready)
    }
    setReady(false)

    const initialize = async () => {
      const [THREE, { RoundedBoxGeometry }] = await Promise.all([
        import('three'),
        import('three/examples/jsm/geometries/RoundedBoxGeometry.js'),
      ])
      if (cancelled) return

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('webgl2', {
        alpha: true,
        antialias: true,
        powerPreference: 'low-power',
      })
      if (!context) return

      const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true })
      renderer.setClearColor(0x000000, 0)
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.05
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.VSMShadowMap
      // Lighting is fixed and motion is deliberately tiny. Cache the softened
      // studio shadow instead of repeating its depth/blur passes every frame.
      renderer.shadowMap.autoUpdate = false
      renderer.shadowMap.needsUpdate = true
      container.appendChild(canvas)
      disposeScene = () => {
        renderer.dispose()
        renderer.forceContextLoss()
        canvas.remove()
      }

      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-3.5, 3.5, 3.5, -3.5, 0.1, 40)
      camera.position.set(4.9, 3.7, 8.5)
      camera.lookAt(0, -0.08, 0)

      const geometries = new Set()
      const materials = new Set()
      const textures = new Set()
      const disposeRenderer = disposeScene
      disposeScene = () => {
        geometries.forEach((value) => value.dispose())
        materials.forEach((value) => value.dispose())
        textures.forEach((value) => value.dispose())
        disposeRenderer()
      }
      const geometry = (value) => {
        geometries.add(value)
        return value
      }
      const material = (color, extra = {}) => {
        const value = new THREE.MeshStandardMaterial({ color, roughness: 0.86, metalness: 0, ...extra })
        materials.add(value)
        return value
      }
      const clay = material('#b48268')
      const cream = material('#ebdeca')
      const sand = material('#cbb298')
      const darkSand = material('#a99277')
      const taupe = material('#8e7d68')

      const sculpture = new THREE.Group()
      scene.add(sculpture)
      const assembly = new THREE.Group()
      assembly.rotation.set(-0.04, -0.14, 0.065)
      sculpture.add(assembly)

      const roundedBox = (width, height, depth, radius, surface, x, y, z, parent = assembly) => {
        const mesh = new THREE.Mesh(
          geometry(new RoundedBoxGeometry(width, height, depth, 4, radius)),
          surface,
        )
        mesh.position.set(x, y, z)
        mesh.castShadow = true
        mesh.receiveShadow = true
        parent.add(mesh)
        return mesh
      }
      const torus = (radius, thickness, surface, x, y, z, parent = assembly) => {
        const mesh = new THREE.Mesh(geometry(new THREE.TorusGeometry(radius, thickness, 14, 64)), surface)
        mesh.position.set(x, y, z)
        mesh.castShadow = true
        mesh.receiveShadow = true
        parent.add(mesh)
        return mesh
      }
      const sphere = (radius, surface, x, y, z, parent = assembly) => {
        const mesh = new THREE.Mesh(geometry(new THREE.SphereGeometry(radius, 20, 16)), surface)
        mesh.position.set(x, y, z)
        mesh.castShadow = true
        mesh.receiveShadow = true
        parent.add(mesh)
        return mesh
      }

      // A single assembled interface, built as physical, sculpted components.
      roundedBox(3.52, 3.22, 0.38, 0.24, sand, -0.18, 0.14, -0.14)
      roundedBox(3.25, 2.94, 0.16, 0.2, cream, -0.18, 0.14, 0.09)

      // Recessed toolbar and the quiet rhythm of its controls.
      roundedBox(2.74, 0.06, 0.05, 0.025, darkSand, -0.18, 1.24, 0.203)
      sphere(0.057, clay, -1.45, 1.48, 0.195)
      sphere(0.057, darkSand, -1.23, 1.48, 0.195)
      sphere(0.057, sand, -1.01, 1.48, 0.195)
      roundedBox(0.69, 0.065, 0.04, 0.024, darkSand, 0.86, 1.48, 0.193)

      // Main component: an inset ring, a tangible analogue of a UI control.
      roundedBox(1.42, 1.46, 0.22, 0.16, clay, -0.84, 0.34, 0.28)
      torus(0.38, 0.105, cream, -0.84, 0.39, 0.53)
      sphere(0.105, sand, -0.84, 0.39, 0.525)
      roundedBox(0.61, 0.055, 0.055, 0.025, cream, -0.84, -0.175, 0.423)

      // Small stacked modules make the object read as an interface at a glance.
      roundedBox(1.06, 0.62, 0.2, 0.13, sand, 0.58, 0.76, 0.3)
      roundedBox(0.57, 0.07, 0.06, 0.029, cream, 0.57, 0.87, 0.43)
      roundedBox(0.38, 0.07, 0.06, 0.029, cream, 0.475, 0.66, 0.43)
      roundedBox(1.06, 0.58, 0.21, 0.13, sand, 0.58, 0.035, 0.3)
      for (let index = 0; index < 3; index += 1) {
        roundedBox(0.14, 0.15 + index * 0.105, 0.065, 0.048, cream, 0.3 + index * 0.27, 0.005 + index * 0.053, 0.443)
      }

      roundedBox(2.72, 0.56, 0.22, 0.14, sand, -0.18, -0.795, 0.295)
      roundedBox(0.76, 0.085, 0.06, 0.04, cream, -0.91, -0.705, 0.439)
      roundedBox(1.1, 0.06, 0.05, 0.025, cream, -0.74, -0.9, 0.435)
      roundedBox(0.53, 0.22, 0.095, 0.075, clay, 0.72, -0.805, 0.454)

      // Detached components give the arrangement depth without visual noise.
      const floatingTile = new THREE.Group()
      floatingTile.position.set(1.62, -0.62, 0.7)
      floatingTile.rotation.set(0.07, -0.18, -0.15)
      assembly.add(floatingTile)
      roundedBox(1.06, 1.06, 0.33, 0.2, clay, 0, 0, 0, floatingTile)
      torus(0.245, 0.07, cream, 0, 0.04, 0.225, floatingTile)

      const node = new THREE.Group()
      node.position.set(-1.78, -1.14, 0.74)
      node.rotation.set(0.16, 0.24, -0.08)
      assembly.add(node)
      roundedBox(0.78, 0.78, 0.42, 0.2, cream, 0, 0, 0, node)
      roundedBox(0.24, 0.24, 0.07, 0.07, taupe, 0, 0, 0.237, node)
      const connection = roundedBox(0.46, 0.095, 0.09, 0.041, sand, -1.47, -1.02, 0.45)
      connection.rotation.z = 0.34

      // Broad light sources, softly shaded edges, and a real ground shadow.
      scene.add(new THREE.HemisphereLight('#fff8ed', '#9a8673', 1.7))
      const key = new THREE.DirectionalLight('#fff5df', 3.2)
      key.position.set(-3.2, 10, 5)
      key.castShadow = true
      key.shadow.mapSize.set(512, 512)
      Object.assign(key.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4, near: 0.5, far: 24 })
      key.shadow.bias = -0.0005
      key.shadow.normalBias = 0.025
      key.shadow.radius = 5
      key.shadow.blurSamples = 8
      scene.add(key)
      const fill = new THREE.DirectionalLight('#eee4d5', 0.8)
      fill.position.set(4, 1, 2)
      scene.add(fill)

      const shadowMaterial = new THREE.ShadowMaterial({ opacity: 0.075 })
      materials.add(shadowMaterial)
      const ground = new THREE.Mesh(geometry(new THREE.PlaneGeometry(20, 20)), shadowMaterial)
      ground.rotation.x = -Math.PI / 2
      ground.position.y = -1.95
      ground.receiveShadow = true
      scene.add(ground)

      // A low-resolution radial contact shadow softens the directional shadow.
      const shadowCanvas = document.createElement('canvas')
      shadowCanvas.width = 128
      shadowCanvas.height = 128
      const shadowContext = shadowCanvas.getContext('2d')
      if (shadowContext) {
        const gradient = shadowContext.createRadialGradient(64, 64, 5, 64, 64, 64)
        gradient.addColorStop(0, 'rgba(75, 52, 33, 0.2)')
        gradient.addColorStop(0.45, 'rgba(75, 52, 33, 0.09)')
        gradient.addColorStop(1, 'rgba(75, 52, 33, 0)')
        shadowContext.fillStyle = gradient
        shadowContext.fillRect(0, 0, 128, 128)
        const texture = new THREE.CanvasTexture(shadowCanvas)
        textures.add(texture)
        const contactMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false })
        materials.add(contactMaterial)
        const contact = new THREE.Mesh(geometry(new THREE.PlaneGeometry(6, 4.5)), contactMaterial)
        contact.rotation.x = -Math.PI / 2
        contact.position.set(0, -1.94, 0.1)
        scene.add(contact)
      }

      let frame = 0
      let lastFrame = 0
      let elapsed = 0
      let active = true
      let contextLost = false
      let firstFrame = true
      let width = 0
      let height = 0
      const pointer = { x: 0, y: 0 }

      const render = () => {
        if (cancelled || contextLost || !width || !height) return
        renderer.render(scene, camera)
        if (firstFrame) {
          firstFrame = false
          setReady(true)
        }
      }
      const tick = (time) => {
        if (cancelled || contextLost || !active || document.hidden || reducedMotion) return
        frame = requestAnimationFrame(tick)
        const delta = time - lastFrame
        if (delta < 1000 / 30) return
        lastFrame = time
        elapsed += Math.min(delta, 50) / 1000
        sculpture.rotation.y += ((pointer.x * 0.085 + Math.sin(elapsed * 0.21) * 0.022) - sculpture.rotation.y) * 0.055
        sculpture.rotation.x += ((pointer.y * 0.045) - sculpture.rotation.x) * 0.055
        sculpture.position.y = Math.sin(elapsed * 0.45) * 0.035
        floatingTile.position.y = -0.62 + Math.sin(elapsed * 0.55 + 0.8) * 0.045
        node.position.y = -1.14 + Math.sin(elapsed * 0.48 + 2) * 0.035
        render()
      }
      const resume = () => {
        cancelAnimationFrame(frame)
        if (active && !document.hidden && !contextLost) {
          render()
          if (!reducedMotion) {
            lastFrame = performance.now()
            frame = requestAnimationFrame(tick)
          }
        }
      }
      const resize = () => {
        const bounds = container.getBoundingClientRect()
        width = Math.round(bounds.width)
        height = Math.round(bounds.height)
        if (!width || !height) return
        const aspect = width / height
        const mobile = window.innerWidth < 768
        const frustumHeight = mobile
          ? Math.max(4.7, 5.0 / aspect)
          : Math.max(5.6, 5.7 / aspect)
        camera.left = -frustumHeight * aspect / 2
        camera.right = frustumHeight * aspect / 2
        camera.top = frustumHeight / 2
        camera.bottom = -frustumHeight / 2
        camera.updateProjectionMatrix()
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 1.5))
        renderer.setSize(width, height, false)
        if (active && !document.hidden) render()
      }
      const handlePointer = (event) => {
        if (reducedMotion || event.pointerType === 'touch') return
        const bounds = (interactionRef?.current || container).getBoundingClientRect()
        pointer.x = THREE.MathUtils.clamp((event.clientX - bounds.left) / bounds.width * 2 - 1, -1, 1)
        pointer.y = THREE.MathUtils.clamp((event.clientY - bounds.top) / bounds.height * 2 - 1, -1, 1)
      }
      const resetPointer = () => {
        pointer.x = 0
        pointer.y = 0
      }
      const handleContextLost = (event) => {
        event.preventDefault()
        contextLost = true
        firstFrame = true
        cancelAnimationFrame(frame)
        setReady(false)
      }
      const handleContextRestored = () => {
        contextLost = false
        renderer.shadowMap.needsUpdate = true
        resume()
      }
      const interactionElement = interactionRef?.current || container
      interactionElement.addEventListener('pointermove', handlePointer, { passive: true })
      interactionElement.addEventListener('pointerleave', resetPointer)
      document.addEventListener('visibilitychange', resume)
      canvas.addEventListener('webglcontextlost', handleContextLost)
      canvas.addEventListener('webglcontextrestored', handleContextRestored)

      const resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(container)
      const intersectionObserver = new IntersectionObserver(([entry]) => {
        active = entry.isIntersecting
        resume()
      }, { rootMargin: '60px' })
      intersectionObserver.observe(container)

      const disposeResources = disposeScene
      disposeScene = () => {
        cancelAnimationFrame(frame)
        resizeObserver.disconnect()
        intersectionObserver.disconnect()
        interactionElement.removeEventListener('pointermove', handlePointer)
        interactionElement.removeEventListener('pointerleave', resetPointer)
        document.removeEventListener('visibilitychange', resume)
        canvas.removeEventListener('webglcontextlost', handleContextLost)
        canvas.removeEventListener('webglcontextrestored', handleContextRestored)
        key.shadow.dispose()
        disposeResources()
      }
      resize()
      resume()
    }

    initialize().catch(() => {
      // The CSS composition stays visible if loading or WebGL initialization fails.
      disposeScene()
      setReady(false)
    })

    return () => {
      cancelled = true
      disposeScene()
      container.dataset.ready = 'false'
    }
  }, [interactionRef, reducedMotion])

  return <div ref={containerRef} className="hero-clay-canvas" data-ready="false" aria-hidden="true" />
}
