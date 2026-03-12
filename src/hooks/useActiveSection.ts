import { useEffect, useState, useRef } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState('');
  const visibleRef = useRef(new Set<string>());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleRef.current.add(entry.target.id);
          } else {
            visibleRef.current.delete(entry.target.id);
          }
        });

        if (visibleRef.current.size === 0) {
          setActive('');
        } else {
          // Pick the first section in document order that's visible
          for (const id of sectionIds) {
            if (visibleRef.current.has(id)) {
              setActive(id);
              break;
            }
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
