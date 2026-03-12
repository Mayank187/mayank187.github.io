import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';
import type { Project } from '../data/projects';
import { Badge } from './Badge';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-slate-700/50 bg-slate-900 p-6 shadow-2xl md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          >
            <X size={20} />
          </button>

          <div className="mb-4 flex flex-wrap gap-2">
            {project.badges.map((b) => (
              <Badge key={b} label={b} />
            ))}
          </div>

          <h3 className="mb-2 text-xl font-bold text-slate-100">{project.title}</h3>
          <p className="mb-6 text-slate-400">{project.summary}</p>

          <div className="space-y-4">
            <div>
              <h4 className="mb-1 font-mono text-xs uppercase tracking-wider text-brand-400">Problem</h4>
              <p className="text-sm text-slate-300">{project.problem}</p>
            </div>
            <div>
              <h4 className="mb-1 font-mono text-xs uppercase tracking-wider text-brand-400">Approach</h4>
              <p className="text-sm text-slate-300">{project.approach}</p>
            </div>
            <div>
              <h4 className="mb-1 font-mono text-xs uppercase tracking-wider text-brand-400">Impact</h4>
              <p className="text-sm text-slate-300">{project.impact}</p>
            </div>
            <div>
              <h4 className="mb-1 font-mono text-xs uppercase tracking-wider text-brand-400">Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="rounded bg-slate-800 px-2 py-1 font-mono text-xs text-slate-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-brand-400/50 hover:text-brand-400"
              >
                <Github size={16} /> Source
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-brand-400/30 bg-brand-400/10 px-4 py-2 text-sm text-brand-400 transition-colors hover:bg-brand-400/20"
              >
                <ExternalLink size={16} /> Demo
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
