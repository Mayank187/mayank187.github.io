import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/Navbar';
import { DottedSurface } from './components/ui/dotted-surface';
import { Component, type ReactNode } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? null : this.props.children; }
}
import { SpotlightCursor } from './components/SpotlightCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { HireBadge } from './components/HireBadge';
import { Footer } from './components/Footer';
import { useSectionSnap } from './hooks/useSectionSnap';
import RainingLetters from './components/ui/modern-animated-hero-section';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Publications } from './sections/Publications';
import { Certifications } from './sections/Certifications';
import { ContactResume } from './sections/ContactResume';

export default function App() {
  useSectionSnap();

  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        <ScrollProgressBar />
        <ErrorBoundary><DottedSurface /></ErrorBoundary>
        <SpotlightCursor />
        <Navbar />
        <main className="relative z-10">
          <div data-section><RainingLetters /></div>
          <div data-section><About /></div>
          <div data-section><Experience /></div>
          <div data-section><Skills /></div>
          <div data-section><Projects /></div>
          <div data-section><Publications /></div>
          <div data-section><Certifications /></div>
          <div data-section><ContactResume /></div>
        </main>
        <HireBadge />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
