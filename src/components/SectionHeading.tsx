import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  prefix: string;
  title: string;
  id: string;
}

/**
 * Section heading, animates as a single unit (short fade + small rise), never
 * per-letter, never blurred. The complete title is readable almost immediately,
 * and reduced-motion users see the final heading with no animation.
 */
export function SectionHeading({ prefix, title, id }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      id={id}
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="mb-12 flex items-center gap-4"
    >
      <span className="font-mono text-sm text-brand-400">{prefix}.</span>
      <h2 className="text-2xl font-bold text-slate-100 md:text-3xl">{title}</h2>
      <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent" />
    </motion.div>
  );
}
