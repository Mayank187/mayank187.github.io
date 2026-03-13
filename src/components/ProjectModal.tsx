import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import type { Project } from '../data/projects';
import { Badge } from './Badge';
import { backdrop, modal, fadeUp, tagPop, stagger, hover, tap } from '../data/animations';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-700/50 bg-slate-900 p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={onClose}
              whileHover={hover.scale}
              whileTap={tap.press}
              className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
            >
              <X size={20} />
            </motion.button>

            <motion.div variants={stagger(0.03)} className="mb-4 flex flex-wrap gap-2">
              {project.badges.map((b) => (
                <motion.div key={b} variants={tagPop}>
                  <Badge label={b} />
                </motion.div>
              ))}
            </motion.div>

            <motion.h3 variants={fadeUp} className="mb-2 text-xl font-bold text-slate-100">
              {project.title}
            </motion.h3>
            <motion.p variants={fadeUp} className="mb-6 text-slate-400">
              {project.summary}
            </motion.p>

            <div className="space-y-4">
              {(['problem', 'approach', 'impact'] as const).map((key) => (
                <motion.div key={key} variants={fadeUp}>
                  <h4 className="mb-1 font-mono text-xs uppercase tracking-wider text-brand-400">
                    {key}
                  </h4>
                  <p className="text-sm text-slate-300">{project[key]}</p>
                </motion.div>
              ))}

              <motion.div variants={fadeUp}>
                <h4 className="mb-1 font-mono text-xs uppercase tracking-wider text-brand-400">
                  Stack
                </h4>
                <motion.div variants={stagger(0.02)} className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <motion.span
                      key={s}
                      variants={tagPop}
                      className="rounded bg-slate-800 px-2 py-1 font-mono text-xs text-slate-300"
                    >
                      {s}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            <motion.div variants={fadeUp} className="mt-6 flex gap-3">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={hover.scale}
                  whileTap={tap.soft}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-brand-400/50 hover:text-brand-400"
                >
                  <Github size={16} /> Source
                </motion.a>
              )}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={hover.scale}
                  whileTap={tap.soft}
                  className="inline-flex items-center gap-2 rounded-lg border border-brand-400/30 bg-brand-400/10 px-4 py-2 text-sm text-brand-400 transition-colors hover:bg-brand-400/20"
                >
                  <ExternalLink size={16} /> Demo
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
