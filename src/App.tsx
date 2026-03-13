import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/Navbar';
import { GridBackground } from './components/GridBackground';
import { SpotlightCursor } from './components/SpotlightCursor';
import { Footer } from './components/Footer';
import { SectionDivider } from './components/SectionDivider';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Publications } from './sections/Publications';
import { Certifications } from './sections/Certifications';
import { CurrentFocus } from './sections/CurrentFocus';
import { Resume } from './sections/Resume';
import { Contact } from './sections/Contact';

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen">
        <GridBackground />
        <SpotlightCursor />
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <SectionDivider />
          <About />
          <SectionDivider />
          <Experience />
          <SectionDivider />
          <Skills />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Publications />
          <Certifications />
          <CurrentFocus />
          <SectionDivider />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
