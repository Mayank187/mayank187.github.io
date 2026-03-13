import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Badge } from '../components/Badge';
import { TiltCard } from '../components/TiltCard';
import { ProjectModal } from '../components/ProjectModal';
import { projects, type Project } from '../data/projects';
import { stagger, fadeUp, hover, viewport } from '../data/animations';

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="relative px-4 py-24 md:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading prefix="04" title="Projects" id="projects-heading" />

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4 md:grid-cols-2"
        >
          {featured.map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <TiltCard
                className="group cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 transition-all hover:border-slate-700 hover:shadow-lg hover:shadow-brand-400/5"
                data-cursor="action"
                data-cursor-label="Explore"
                onClick={() => setSelected(project)}
              >
                {project.gradient && (
                  <div
                    className="flex h-28 items-center justify-center transition-transform duration-500 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${project.gradient[0]}15, ${project.gradient[1]}15)`,
                    }}
                  >
                    {project.icon && (
                      <span className="text-4xl opacity-60 transition-opacity group-hover:opacity-90">
                        {project.icon}
                      </span>
                    )}
                  </div>
                )}
                <div className="p-5">
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
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={hover.tilt}
                        className="text-slate-500 transition-colors hover:text-slate-300"
                      >
                        <Github size={16} />
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={hover.tilt}
                        className="text-slate-500 transition-colors hover:text-slate-300"
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-xs text-slate-500 group-hover:text-brand-400 transition-colors">
                    details <ChevronRight size={12} />
                  </span>
                </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
