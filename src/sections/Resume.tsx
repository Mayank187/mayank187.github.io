import { motion } from 'framer-motion';
import { Download, Eye } from 'lucide-react';
import { profile } from '../data/profile';
import { fadeUp, hover, tap, viewport } from '../data/animations';

export function Resume() {
  return (
    <section className="relative px-4 py-16 md:px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center"
        >
          <h3 className="mb-2 font-mono text-xs uppercase tracking-wider text-brand-400">
            resume
          </h3>
          <p className="mb-4 text-sm text-slate-400">
            Full career details, skills, and experience in a downloadable format.
          </p>
          <div className="flex justify-center gap-3">
            <motion.a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={hover.scale}
              whileTap={tap.press}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-brand-300"
            >
              <Download size={16} /> Download PDF
            </motion.a>
            <motion.a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={hover.scale}
              whileTap={tap.press}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm text-slate-300 transition-colors hover:border-slate-600"
            >
              <Eye size={16} /> View Resume
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
