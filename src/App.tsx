import { Component, Suspense, lazy, useEffect, useState, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Footer } from './components/Footer';
import Hero from './components/ui/modern-animated-hero-section';
import { About } from './sections/About';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Certifications } from './sections/Certifications';
import { ContactResume } from './sections/ContactResume';

// three.js background is heavy and purely decorative, load it lazily so it
// never blocks first paint or the core content bundle.
const DottedSurface = lazy(() =>
  import('./components/ui/dotted-surface').then((m) => ({ default: m.DottedSurface })),
);

/**
 * Boundary for decorative-only children. Logs in development and renders a
 * safe fallback (nothing) so the core page keeps rendering if a visual effect
 * fails, it never blanks the whole site.
 */
class DecorativeBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    if (import.meta.env.DEV) {
      console.warn('[DecorativeBoundary] a decorative component failed to render:', error);
    }
  }
  render() {
    return this.state.hasError ? this.props.fallback ?? null : this.props.children;
  }
}

/**
 * Decides whether the three.js background is worth loading. It is purely
 * decorative, so we only fetch the chunk (~725 kB) when it will actually be
 * seen and won't get in the way:
 *  - never under prefers-reduced-motion,
 *  - never on touch-first / small screens (so mobile never downloads three.js),
 *  - and only after the browser goes idle, so it never competes with the hero.
 * Returns null until then, the fixed background mounts with no layout shift.
 */
function BackgroundFX() {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const capable = window.matchMedia('(min-width: 768px) and (pointer: fine)').matches;
    if (!capable) return;

    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback;
    const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
    let id: number;
    if (ric) {
      id = ric(() => setShow(true), { timeout: 3000 });
      return () => cic?.(id);
    }
    id = window.setTimeout(() => setShow(true), 1500);
    return () => clearTimeout(id);
  }, [reduceMotion]);

  if (!show) return null;
  return (
    <DecorativeBoundary>
      <Suspense fallback={null}>
        <DottedSurface />
      </Suspense>
    </DecorativeBoundary>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="relative min-h-screen">
        <ScrollProgressBar />
        <BackgroundFX />
        <Navbar />
        <main id="main" className="relative z-10">
          <Hero />
          <Projects />
          <About />
          <Experience />
          <Skills />
          <Certifications />
          <ContactResume />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
