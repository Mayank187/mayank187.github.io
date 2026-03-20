import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { profile } from '../data/profile';
import { fadeUpWithStagger, fadeUp, tagPop, stagger, viewport } from '../data/animations';

export function CurrentFocus() {
  return (
    <section className="relative flex min-h-screen items-center px-4 py-16 md:px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={fadeUpWithStagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
        >
          <motion.div variants={fadeUp} className="mb-4 flex items-center gap-2">
            <Zap size={16} className="text-brand-400" />
            <h3 className="font-mono text-xs uppercase tracking-wider text-brand-400">
              current_focus
            </h3>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 font-mono text-xs text-green-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              active
            </span>
          </motion.div>
          <motion.div variants={stagger(0.05)} className="flex flex-wrap gap-2">
            {profile.currentFocus.map((item) => (
              <motion.span
                key={item}
                variants={tagPop}
                className="rounded-lg border border-slate-700/50 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-brand-400/30 hover:text-brand-400"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
