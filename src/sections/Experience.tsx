import { motion } from 'framer-motion';
import { experiences } from '../data/experience';
import { SectionHeading } from '../components/SectionHeading';
import { stagger, fadeUp, viewport } from '../data/animations';

export function Experience() {
  return (
    <section id="experience" className="relative px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading prefix="03" title="Experience" id="experience-heading" />

        <motion.ol
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative space-y-6 border-l border-slate-800 pl-6 md:space-y-8 md:pl-8"
        >
          {experiences.map((exp) => (
            <motion.li key={exp.id} variants={fadeUp} className="relative">
              {/* Timeline dot */}
              <span
                aria-hidden="true"
                className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full border border-brand-400/60 bg-slate-950 md:-left-[35px]"
              />

              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-slate-700 md:p-6">
                <div className="mb-3 flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div>
                    <h3 className="text-base font-semibold text-slate-100 md:text-lg">
                      {exp.role}
                    </h3>
                    <p className="mt-0.5 text-sm text-slate-300">
                      <span className="font-medium">{exp.company}</span>
                      {exp.client && (
                        <span className="text-slate-400">
                          {' '}· Client: <span className="text-slate-300">{exp.client}</span>
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="whitespace-nowrap rounded bg-slate-800 px-2 py-1 font-mono text-[10px] text-slate-400 md:text-xs">
                    {exp.duration}
                  </span>
                </div>

                <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-brand-400/90 md:text-xs">
                  {exp.domain}
                </p>

                <ul className="mb-4 space-y-2">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <span aria-hidden="true" className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brand-400/60" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <ul className="flex flex-wrap gap-1.5">
                  {exp.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded border border-slate-700/50 bg-slate-800/50 px-2 py-0.5 font-mono text-[10px] text-slate-500 md:text-xs"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
