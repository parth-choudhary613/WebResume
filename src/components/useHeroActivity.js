import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export default function useHeroActivity(ref) {
  const [visible, setVisible] = useState(() => {
    return typeof window !== 'undefined' && !('IntersectionObserver' in window);
  });
  const [foreground, setForeground] = useState(false);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const element = ref.current;
    const update = () => setForeground(document.visibilityState === 'visible');
    update();
    document.addEventListener('visibilitychange', update);
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
      : null;
    if (observer && element) observer.observe(element);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [ref]);

  useEffect(() => {
    if (!visible || !foreground || load) return;
    let idle, timer, second;
    // Let the text paint before mounting the separately bundled WebGL scene.
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        if ('requestIdleCallback' in window) {
          idle = window.requestIdleCallback(() => setLoad(true), { timeout: 1000 });
        } else timer = window.setTimeout(() => setLoad(true), 100);
      });
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      clearTimeout(timer);
    };
  }, [visible, foreground, load]);
  return { active: visible && foreground, load };
}
