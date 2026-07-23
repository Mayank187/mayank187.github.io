import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Lock, ChevronRight, ChevronDown } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { flagshipProjects, secondaryProjects, type Project } from '../data/projects';
import { fadeUp, stagger, viewport } from '../data/animations';

const isDesktop = () =>
  typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches;

/** Lightweight, accessible pipeline flow (no images). Wraps/stacks on mobile. */
function ArchFlow({ stages }: { stages: string[] }) {
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-500">System flow</p>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
        {stages.map((stage, i) => (
          <li key={stage} className="flex items-center gap-1.5">
            <span className="rounded border border-slate-700/60 bg-slate-800/60 px-2 py-1 font-mono text-[10px] text-slate-300 md:text-[11px]">
              {stage}
            </span>
            {i < stages.length - 1 && <ChevronRight aria-hidden="true" size={12} className="text-slate-600" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  if (!children) return null;
  return (
    <div>
      <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-brand-400/90">{label}</p>
      <div className="text-sm leading-relaxed text-slate-400">{children}</div>
    </div>
  );
}

function CaseStudy({ project, defaultOpen }: { project: Project; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.article variants={fadeUp} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40">
      {/* Header */}
      <div className="border-b border-slate-800 p-5 md:p-7">
        <div className="flex items-start gap-3">
          {project.icon && <span aria-hidden="true" className="text-2xl leading-none">{project.icon}</span>}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-lg font-bold text-slate-100 md:text-xl">{project.title}</h3>
              {project.status && (
                <span className="inline-flex items-center rounded-full border border-brand-400/30 bg-brand-400/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-brand-400">
                  {project.status}
                </span>
              )}
            </div>
            <p className="mt-1 font-mono text-xs text-slate-400">
              {project.org} · {project.role}
              {project.timeframe && <> · {project.timeframe}</>}
            </p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-slate-300">{project.summary}</p>
      </div>

      {/* Scannable summary */}
      <div className="grid gap-6 p-5 md:grid-cols-2 md:p-7">
        <div className="space-y-5">
          <Block label="Problem">{project.problem}</Block>
          <Block label="My ownership">{project.ownership}</Block>
        </div>
        <div className="space-y-5">
          {project.scale && <Block label="Scale">{project.scale}</Block>}
          {project.decisions?.[0] && <Block label="Key decision">{project.decisions[0]}</Block>}
          <Block label="Evaluation">{project.evaluation}</Block>
        </div>
      </div>

      {/* Outcome — most prominent */}
      <div className="px-5 pb-5 md:px-7 md:pb-7">
        <div className="rounded-lg border-l-2 border-brand-400/60 bg-slate-900/60 py-3 pl-4 pr-3">
          <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-brand-400">Outcome</p>
          <p className="text-sm leading-relaxed text-slate-200">{project.outcome}</p>
        </div>
      </div>

      {/* Technical deep dive — collapsible */}
      {(project.approach || project.architecture || project.decisions || project.constraints || project.lessons) && (
        <details
          open={open}
          onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}
          className="group border-t border-slate-800"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-5 font-mono text-xs uppercase tracking-wider text-slate-400 transition-colors hover:text-brand-400 md:px-7 [&::-webkit-details-marker]:hidden">
            <span>Technical details</span>
            <ChevronDown aria-hidden="true" size={15} className="transition-transform group-open:rotate-180" />
          </summary>
          <div className="grid gap-6 px-5 pb-6 md:grid-cols-2 md:px-7">
            <div className="space-y-5">
              {project.whyItMattered && <Block label="Why it mattered">{project.whyItMattered}</Block>}
              <Block label="Approach">{project.approach}</Block>
              {project.architecture && <ArchFlow stages={project.architecture} />}
            </div>
            <div className="space-y-5">
              {project.decisions && (
                <Block label="Engineering decisions">
                  <ul className="space-y-1">
                    {project.decisions.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brand-400/60" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </Block>
              )}
              {project.constraints && (
                <Block label="Constraints">
                  <ul className="space-y-1">
                    {project.constraints.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <span aria-hidden="true" className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-slate-600" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </Block>
              )}
              {project.lessons && <Block label="Lesson">{project.lessons}</Block>}
            </div>
          </div>
        </details>
      )}

      {/* Footer — tags, confidentiality, links */}
      <div className="flex flex-col gap-3 border-t border-slate-800 bg-slate-900/40 p-5 md:p-7">
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <li key={s} className="rounded border border-slate-700/50 bg-slate-800/50 px-2 py-0.5 font-mono text-[10px] text-slate-500">
              {s}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {project.confidentiality && (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
              <Lock aria-hidden="true" size={12} /> {project.confidentiality}
            </span>
          )}
          <div className="ml-auto flex gap-2">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded border border-slate-700/50 bg-slate-800/60 px-2.5 py-1 text-xs text-slate-300 transition-colors hover:border-brand-400/30 hover:text-brand-400">
                <Github aria-hidden="true" size={13} /> Source
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded border border-slate-700/50 bg-slate-800/60 px-2.5 py-1 text-xs text-slate-300 transition-colors hover:border-brand-400/30 hover:text-brand-400">
                <ExternalLink aria-hidden="true" size={13} /> Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const desktop = isDesktop();
  return (
    <section id="projects" className="relative px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading prefix="01" title="Case Studies" id="projects-heading" />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="space-y-8"
        >
          {flagshipProjects.map((project, i) => (
            <CaseStudy key={project.id} project={project} defaultOpen={i === 0 && desktop} />
          ))}
        </motion.div>

        {/* Secondary / personal work — compact, clearly lower weight */}
        <div className="mt-14">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-slate-500">Also / earlier work</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {secondaryProjects.map((project) => (
              <motion.article
                key={project.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-5"
              >
                <div className="mb-2 flex items-center gap-2">
                  {project.icon && <span aria-hidden="true">{project.icon}</span>}
                  <h4 className="text-sm font-semibold text-slate-200">{project.title}</h4>
                </div>
                <p className="mb-3 text-xs text-slate-400">{project.summary}</p>
                <ul className="mb-3 flex flex-wrap gap-1">
                  {project.stack.slice(0, 4).map((s) => (
                    <li key={s} className="rounded border border-slate-700/50 bg-slate-800/50 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                      {s}
                    </li>
                  ))}
                </ul>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-brand-400">
                    <Github aria-hidden="true" size={12} /> Source
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
