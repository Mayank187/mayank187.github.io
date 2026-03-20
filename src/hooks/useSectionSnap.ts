import { useEffect } from 'react';

/**
 * Lightweight section-snap: when a user finishes scrolling and lands
 * within the top/bottom threshold of a section boundary, nudge them
 * to the nearest section start. Disabled on touch devices to avoid
 * fighting mobile momentum scrolling.
 */
export function useSectionSnap() {
  useEffect(() => {
    // Disable on touch devices — mobile momentum scroll is better UX
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let timeout: ReturnType<typeof setTimeout>;
    let isSnapping = false;

    const THRESHOLD = 120;
    const DEBOUNCE = 150;

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
