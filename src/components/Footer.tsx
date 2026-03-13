import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { fadeIn, viewport } from '../data/animations';

export function Footer() {
  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className="border-t border-slate-800/50 px-4 py-8"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-mono text-xs text-slate-600">
          <span className="text-slate-500">{'>'}</span> built by{' '}
          <span className="text-slate-400">{profile.name}</span>{' '}
          <span className="text-slate-700">·</span>{' '}
          {new Date().getFullYear()}{' '}
          <span className="text-slate-700">·</span>{' '}
          React + TypeScript + Tailwind
        </p>
      </div>
    </motion.footer>
  );
}
