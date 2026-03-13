import { useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Menu, X, Github, Linkedin, FileText } from 'lucide-react';
import { navItems } from '../data/navigation';
import { profile } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { cn } from '../utils/cn';
import { mobileMenu, navItem, fadeUp } from '../data/animations';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(navItems.map((n) => n.id));
  const scrolled = useScrollDirection();

  return (
    <nav
      className={cn(
        'fixed top-0 z-40 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-slate-800/80 bg-slate-950/90 backdrop-blur-lg'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.pushState(null, '', window.location.pathname);
          }}
          className="flex items-center gap-2"
        >
          <span className="font-mono text-sm text-brand-400">~/</span>
          <span className="font-semibold text-slate-100">mayank</span>
        </a>

        {/* Desktop */}
        <LayoutGroup>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(
                  'relative rounded-md px-3 py-1.5 font-mono text-xs transition-colors',
                  active === item.id
                    ? 'text-brand-400'
                    : 'text-slate-400 hover:text-slate-200',
                )}
              >
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md bg-brand-400/10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  <span className="text-slate-600">{item.prefix}.</span>
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </LayoutGroup>

        <div className="hidden items-center gap-2 md:flex">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200">
            <Github size={18} />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200">
            <Linkedin size={18} />
          </a>
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-brand-400/30 bg-brand-400/10 px-3 py-1.5 font-mono text-xs text-brand-400 transition-colors hover:bg-brand-400/20"
          >
            <FileText size={14} /> resume.pdf
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-slate-400 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={mobileMenu}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  variants={navItem}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileOpen(false);
                    setTimeout(() => {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                  }}
                  className={cn(
                    'rounded-md px-3 py-2 font-mono text-sm transition-colors',
                    active === item.id
                      ? 'bg-brand-400/10 text-brand-400'
                      : 'text-slate-400 hover:text-slate-200',
                  )}
                >
                  <span className="text-slate-600">{item.prefix}.</span> {item.label}
                </motion.a>
              ))}
              <motion.div
                variants={fadeUp}
                className="mt-3 flex items-center gap-3 border-t border-slate-800 pt-3"
              >
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200"><Github size={18} /></a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200"><Linkedin size={18} /></a>
                <a href={profile.resumePath} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-brand-400/30 bg-brand-400/10 px-3 py-1.5 font-mono text-xs text-brand-400"><FileText size={14} /> resume.pdf</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
