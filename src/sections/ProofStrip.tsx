import { motion } from 'framer-motion';
import { proofSignals } from '../data/proof';
import { fadeUp, stagger, viewport } from '../data/animations';

/**
 * Compact engineering-proof strip directly below the hero. Four defensible,
 * personally-owned signals with attribution labels. Static values (no animated
 * counters, no marquee); wraps cleanly on mobile.
 */
export function ProofStrip() {
  return (
    <section aria-label="Verified engineering proof" className="relative w-full">
      <div className="mx-auto w-full max-w-5xl">
        <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
          Owned &amp; verified
        </p>
        <motion.ul
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {proofSignals.map((s) => (
            <motion.li key={s.caption} variants={fadeUp}>
              <a
                href={s.href}
                className="group block h-full rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm transition-colors hover:border-brand-400/40"
              >
                <span className="inline-flex items-center rounded border border-brand-400/30 bg-brand-400/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-400">
                  {s.attribution}
                </span>
                <p className="mt-2 text-sm font-bold leading-snug text-slate-100 md:text-base">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{s.caption}</p>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
