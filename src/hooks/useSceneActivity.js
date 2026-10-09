import { useEffect, useRef, useState } from 'react'

/**
 * Pause invisible WebGL render loops without unmounting GPU contexts or
 * changing the rendered scene. When a scene comes back on screen it resumes.
 */
export default function useSceneActivity() {
  const elementRef = useRef(null)
  const [inView, setInView] = useState(true)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)

    let observer
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { rootMargin: '150px 0px', threshold: 0 },
      )
      observer.observe(element)
    }

    return () => {
      observer?.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return { elementRef, active: inView && pageVisible }
}
