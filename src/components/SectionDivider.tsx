import { motion } from 'framer-motion';
import { lineReveal, viewport } from '../data/animations';

export function SectionDivider() {
  return (
    <div className="mx-auto max-w-4xl px-4 md:px-6">
      <motion.div
        variants={lineReveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="h-px w-full bg-gradient-to-r from-transparent via-brand-400/30 to-transparent"
      />
    </div>
  );
}
