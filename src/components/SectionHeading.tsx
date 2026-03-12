import { motion } from 'framer-motion';

interface Props {
  prefix: string;
  title: string;
  id: string;
}

export function SectionHeading({ prefix, title, id }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="mb-12 flex items-center gap-4"
      id={id}
    >
      <span className="font-mono text-sm text-brand-400">{prefix}.</span>
      <h2 className="text-2xl font-bold text-slate-100 md:text-3xl">{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent" />
    </motion.div>
  );
}
