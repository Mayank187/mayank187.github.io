import { motion } from 'framer-motion';
import { stagger, fadeUp, lineReveal, viewportEarly } from '../data/animations';

interface Props {
  prefix: string;
  title: string;
  id: string;
}

export function SectionHeading({ prefix, title, id }: Props) {
  return (
    <motion.div
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportEarly}
      className="mb-12 flex items-center gap-4"
      id={id}
    >
      <motion.span variants={fadeUp} className="font-mono text-sm text-brand-400">
        {prefix}.
      </motion.span>
      <motion.h2 variants={fadeUp} className="text-2xl font-bold text-slate-100 md:text-3xl">
        {title}
      </motion.h2>
      <motion.div
        variants={lineReveal}
        className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent"
      />
    </motion.div>
  );
}
