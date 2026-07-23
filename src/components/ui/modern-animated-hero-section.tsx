import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, FileText, ChevronDown } from 'lucide-react';
import { profile } from '../../data/profile';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]=+*';
const SCRAMBLE = '01<>-_/\\[]{}=+*^?#$%&';

/**
 * One-time "matrix decode" reveal for the hero name. The real name is rendered
 * as the H1 text (with an aria-label) so it is stable for screen readers, SEO,
 * no-JS, and reduced-motion; the per-letter spans are aria-hidden and, when
 * motion is allowed, scramble through glyphs and settle to the final letters
 * left-to-right. Runs once, then stops ,  no continuous scrambling. DOM is
 * updated directly via refs, so there is no per-frame React re-render.
 */
function MatrixName({ text, className }: { text: string; className?: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (reduceMotion || !ref.current) return;
    const spans = Array.from(ref.current.querySelectorAll<HTMLSpanElement>('[data-final]'));
    const perChar = 55; // stagger between characters
    const settle = 420; // scramble time per character
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = now - start;
      let done = true;
      for (let i = 0; i < spans.length; i++) {
        const s = spans[i];
        const final = s.dataset.final ?? '';
        if (final === ' ') { s.textContent = ' '; continue; }
        const begin = i * perChar;
        if (t >= begin + settle) {
          if (s.dataset.locked !== '1') { s.textContent = final; s.dataset.locked = '1'; s.classList.remove('matrix-ch--on'); }
        } else {
          done = false;
          s.textContent = SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
          s.classList.add('matrix-ch--on');
        }
      }
      if (!done) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, text]);

  return (
    <h1 ref={ref} aria-label={text} className={className}>
      {text.split('').map((c, i) => (
        <span key={i} data-final={c} aria-hidden="true" className="matrix-ch">
          {c === ' ' ? ' ' : c}
        </span>
      ))}
    </h1>
  );
}

interface RainChar {
  char: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
  highlight: boolean;
}

/**
 * Ambient falling glyphs ,  decorative only. The pool is generated ONCE at
 * module load (not during render, so it is stable and lint-clean). Animation
 * is pure CSS (see `.hero-rain-char` in index.css): no per-frame React state,
 * no rAF, no setInterval. The layer is aria-hidden and is not rendered at all
 * when the visitor prefers reduced motion.
 */
const RAIN_POOL: RainChar[] = Array.from({ length: 40 }, () => ({
  char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
  left: Math.random() * 100,
  duration: 8 + Math.random() * 9,
  delay: -Math.random() * 17,
  size: 0.85 + Math.random() * 0.5,
  highlight: Math.random() < 0.16,
}));

export default function Hero() {
  const reduceMotion = useReducedMotion();
  // Lighter on small screens; nothing at all for reduced-motion users.
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
  const chars = reduceMotion ? [] : RAIN_POOL.slice(0, isMobile ? 14 : 40);

  const fade = (delay: number) =>
    reduceMotion
      ? { initial: false as const, animate: { opacity: 1, y: 0 } }
      : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.5 } };

  return (
    <section
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden px-4"
      style={{ background: 'var(--color-surface-950)' }}
    >
      {/* Ambient falling glyphs ,  decorative */}
      <div aria-hidden="true" className="hero-rain pointer-events-none absolute inset-0 overflow-hidden">
        {chars.map((c, i) => (
          <span
            key={i}
            className={`hero-rain-char${c.highlight ? ' is-highlight' : ''}`}
            style={{
              left: `${c.left}%`,
              fontSize: `${c.size}rem`,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          >
            {c.char}
          </span>
        ))}
      </div>

      {/* Vignette keeps text readable over the ambient layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.9) 72%)' }}
      />
      {/* Bottom fade blends into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
        style={{ background: 'linear-gradient(to top, var(--color-surface-950) 0%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.p {...fade(0)} className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-brand-400">
          {profile.location} · {profile.title}
        </motion.p>

        <MatrixName
          text={profile.name}
          className="font-display text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl md:text-6xl"
        />

        <motion.p
          {...fade(0.12)}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg"
        >
          {profile.positioning}
        </motion.p>

        <motion.p {...fade(0.18)} className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
          {profile.tagline}
        </motion.p>

        <motion.div {...fade(0.26)} className="mt-9 flex flex-wrap justify-center gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-brand-300"
          >
            View Case Studies <ArrowRight aria-hidden="true" size={16} />
          </a>
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/70 px-5 py-2.5 text-sm font-medium text-slate-200 backdrop-blur-sm transition-colors hover:border-slate-600 hover:bg-slate-800"
          >
            <FileText aria-hidden="true" size={16} /> View Résumé
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        {...fade(0.5)}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-slate-500 transition-colors hover:text-brand-400"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown aria-hidden="true" size={18} className={reduceMotion ? undefined : 'hero-bounce'} />
      </motion.a>
    </section>
  );
}
