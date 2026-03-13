import { motion, type Variants } from 'framer-motion';
import { fadeUp, lineReveal, viewportEarly } from '../data/animations';

interface Props {
  prefix: string;
  title: string;
  id: string;
}

const headingContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const charReveal: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
};

export function SectionHeading({ prefix, title, id }: Props) {
  return (
    <motion.div
      variants={headingContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportEarly}
      className="mb-12 flex items-center gap-4"
      id={id}
    >
      <motion.span variants={fadeUp} className="font-mono text-sm text-brand-400">
        {prefix}.
      </motion.span>
      <motion.h2
        variants={headingContainer}
        className="flex text-2xl font-bold text-slate-100 md:text-3xl"
      >
        {title.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={charReveal}
            className={char === ' ' ? 'w-2' : undefined}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.h2>
      <motion.div
        variants={lineReveal}
        className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent"
      />
    </motion.div>
  );
}
