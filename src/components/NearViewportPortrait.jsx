import { lazy, Suspense, useEffect, useRef, useState } from 'react'

// The model/animations and their loaders are not needed during initial paint.
const Portrait3D = lazy(() => import('./Portrait3D'))

export default function NearViewportPortrait() {
  const containerRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true)
      return
    }

    // Start early, before the portrait scrolls into view. Once mounted, keep
    // the model around so returning to the section never downloads it again.
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true)
        observer.disconnect()
      }
    }, { rootMargin: '900px 0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full">
      {shouldLoad && (
        <Suspense fallback={null}>
          <Portrait3D />
        </Suspense>
      )}
    </div>
  )
}
