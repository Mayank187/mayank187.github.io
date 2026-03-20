import { Github, ExternalLink } from 'lucide-react';
import { StickyScroll } from '../components/ui/sticky-scroll-reveal';
import { projects } from '../data/projects';

const featured = projects.filter((p) => p.featured);

const content = featured.map((project) => ({
  title: project.title,
  description: project.approach,
  content: (
    <div className="flex h-full w-full flex-col justify-between p-5">
      <div>
        <div className="mb-2 flex items-center gap-2">
          {project.icon && <span className="text-2xl">{project.icon}</span>}
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-400">
            {project.badges[0]}
          </span>
        </div>
        <p className="mb-3 text-xs text-slate-400">{project.impact}</p>
        <div className="flex flex-wrap gap-1">
          {project.stack.slice(0, 5).map((s) => (
            <span
              key={s}
              className="rounded border border-slate-700/50 bg-slate-800/60 px-1.5 py-0.5 text-[10px] text-slate-300"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded border border-slate-700/50 bg-slate-800/60 px-2 py-1 text-xs text-slate-300 transition-colors hover:border-brand-400/30 hover:text-brand-400"
          >
            <Github size={12} /> Source
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded border border-slate-700/50 bg-slate-800/60 px-2 py-1 text-xs text-slate-300 transition-colors hover:border-brand-400/30 hover:text-brand-400"
          >
            <ExternalLink size={12} /> Demo
          </a>
        )}
      </div>
    </div>
  ),
}));

export function Projects() {
  return (
    <section id="projects" className="relative">
      <StickyScroll heading="04 — Projects" content={content} />
    </section>
  );
}
