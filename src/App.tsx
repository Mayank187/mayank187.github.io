import { ThemeProvider } from './components/ThemeProvider';
import { Navbar } from './components/Navbar';
import { GridBackground } from './components/GridBackground';
import { Footer } from './components/Footer';
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
        <Navbar />
        <main className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Publications />
          <Certifications />
          <CurrentFocus />
          <Resume />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
