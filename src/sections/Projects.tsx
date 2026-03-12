import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Badge } from '../components/Badge';
import { ProjectModal } from '../components/ProjectModal';
import { projects, type Project } from '../data/projects';

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="relative px-4 py-24 md:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading prefix="04" title="Projects" id="projects-heading" />

        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group cursor-pointer rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-all hover:border-slate-700 hover:shadow-lg hover:shadow-brand-400/5"
              onClick={() => setSelected(project)}
            >
              <div className="mb-3 flex flex-wrap gap-1.5">
                {project.badges.map((b) => (
                  <Badge key={b} label={b} />
                ))}
              </div>
              <h3 className="mb-2 text-base font-semibold text-slate-100 group-hover:text-brand-400 transition-colors">
                {project.title}
              </h3>
              <p className="mb-4 text-sm text-slate-400">{project.summary}</p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((s) => (
                  <span key={s} className="font-mono text-xs text-slate-500">{s}</span>
                ))}
                {project.stack.length > 4 && (
                  <span className="font-mono text-xs text-slate-600">+{project.stack.length - 4}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-500 transition-colors hover:text-slate-300"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-500 transition-colors hover:text-slate-300"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-500 group-hover:text-brand-400 transition-colors">
                  details <ChevronRight size={12} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
