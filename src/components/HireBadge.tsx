import { motion } from 'framer-motion';

export function HireBadge() {
  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-brand-400/30 hover:text-brand-400"
      data-cursor="action"
      data-cursor-label="Hire"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      Available for Hire
    </motion.a>
  );
}
