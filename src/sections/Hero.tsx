import { motion, type Variants } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { profile } from '../data/profile';
import { AnimatedMetric } from '../components/AnimatedMetric';
import { TerminalBlock } from '../components/TerminalBlock';
import { MagneticButton } from '../components/MagneticButton';
import { numberReveal } from '../data/animations';

// Cinematic stagger — each layer enters sequentially with wider gaps
const cinematicContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.22, delayChildren: 0.3 },
  },
};

const cinematicFadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const cinematicMetrics: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 pt-16">
      <motion.div
        className="mx-auto max-w-4xl"
        variants={cinematicContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Layer 1: Terminal */}
        <TerminalBlock />

        {/* Layer 2: Name */}
        <motion.h1
          variants={cinematicFadeUp}
          className="mb-4 font-display text-5xl font-semibold tracking-[-0.04em] text-slate-100 md:text-7xl lg:text-8xl"
        >
          {profile.name}
          <span className="text-brand-400">.</span>
        </motion.h1>

        {/* Layer 3: Tagline */}
        <motion.p
          variants={cinematicFadeUp}
          className="mb-6 max-w-2xl font-display text-lg font-light tracking-tight text-slate-400 md:text-xl"
        >
          {profile.tagline}
        </motion.p>

        {/* Layer 4: Intro */}
        <motion.p
          variants={cinematicFadeUp}
          className="mb-8 max-w-xl text-sm leading-relaxed text-slate-500"
        >
          I architect, build, and ship production-grade AI systems across the full stack, from LLM APIs, RAG pipelines, and intelligent retrieval to scalable NLP services, model deployment, and ML infrastructure that delivers measurable business impact.
        </motion.p>

        {/* Layer 5: CTAs */}
        <motion.div variants={cinematicFadeUp} className="mb-12 flex flex-wrap gap-3">
          <MagneticButton
            href="#projects"
            data-cursor="action"
            data-cursor-label="View"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-brand-300"
          >
            View Projects <ArrowDown size={16} />
          </MagneticButton>
          <MagneticButton
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="action"
            data-cursor-label="Download"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800"
          >
            <Download size={16} /> Download Resume
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-5 py-2.5 text-sm text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-300"
          >
            Contact
          </MagneticButton>
        </motion.div>

        {/* Layer 6: Metrics cascade */}
        <motion.div
          variants={cinematicMetrics}
          className="flex flex-wrap gap-6 border-t border-slate-800/50 pt-8"
        >
          {profile.metrics.map((m, i) => (
            <motion.div key={i} variants={numberReveal} className="flex flex-col">
              <span className="font-mono text-lg font-bold text-slate-100"><AnimatedMetric label={m.label} /></span>
              <span className="font-mono text-xs text-slate-500">{m.sublabel}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
