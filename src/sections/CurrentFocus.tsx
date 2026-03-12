import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { profile } from '../data/profile';

export function CurrentFocus() {
  return (
    <section className="relative px-4 py-16 md:px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-xl border border-slate-800 bg-slate-900/50 p-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <Zap size={16} className="text-brand-400" />
            <h3 className="font-mono text-xs uppercase tracking-wider text-brand-400">
              current_focus
            </h3>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 font-mono text-xs text-green-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              active
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.currentFocus.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-slate-700/50 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-brand-400/30 hover:text-brand-400"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
