import { useEffect } from 'react';

/**
 * Lightweight section-snap: when a user finishes scrolling and lands
 * within the top/bottom threshold of a section boundary, nudge them
 * to the nearest section start. Works with variable-height sections
 * and doesn't fight internal scroll animations.
 */
export function useSectionSnap() {
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let isSnapping = false;

    const THRESHOLD = 120; // px proximity to snap
    const DEBOUNCE = 150; // ms after scroll stops

    const getSections = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));

    const snapToNearest = () => {
      if (isSnapping) return;
      const sections = getSections();
      if (!sections.length) return;

      const scrollY = window.scrollY;
      let closest: HTMLElement | null = null;
      let closestDist = Infinity;

      for (const section of sections) {
        const top = section.offsetTop;
        const dist = Math.abs(scrollY - top);
        if (dist < closestDist) {
          closestDist = dist;
          closest = section;
        }
      }

      // Only snap if we're close to a boundary but not already there
      if (closest && closestDist > 2 && closestDist < THRESHOLD) {
        isSnapping = true;
        closest.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          isSnapping = false;
        }, 600);
      }
    };

    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(snapToNearest, DEBOUNCE);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);
}
