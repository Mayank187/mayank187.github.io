import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { skillCategories } from '../data/skills';
import { cn } from '../utils/cn';
import { stagger, fadeUpWithStagger, tagPop, hover, tap } from '../data/animations';

export function Skills() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const filtered = activeFilter
    ? skillCategories.filter((c) => c.id === activeFilter)
    : skillCategories;

  return (
    <section id="skills" className="relative px-4 py-24 md:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading prefix="03" title="Stack" id="skills-heading" />

        {/* Filter bar */}
        <div className="mb-8 flex flex-wrap gap-2">
          <motion.button
            onClick={() => setActiveFilter(null)}
            whileHover={hover.scale}
            whileTap={tap.press}
            className={cn(
              'rounded-lg px-3 py-1.5 font-mono text-xs transition-colors',
              !activeFilter
                ? 'bg-brand-400/10 text-brand-400 border border-brand-400/30'
                : 'text-slate-500 border border-slate-800 hover:text-slate-300',
            )}
          >
            all
          </motion.button>
          {skillCategories.map((cat) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveFilter(activeFilter === cat.id ? null : cat.id)}
              whileHover={hover.scale}
              whileTap={tap.press}
              className={cn(
                'rounded-lg px-3 py-1.5 font-mono text-xs transition-colors',
                activeFilter === cat.id
                  ? 'bg-brand-400/10 text-brand-400 border border-brand-400/30'
                  : 'text-slate-500 border border-slate-800 hover:text-slate-300',
              )}
            >
              {cat.label.toLowerCase()}
            </motion.button>
          ))}
        </div>

        {/* Skill groups */}
        <motion.div
          key={activeFilter ?? 'all'}
          variants={stagger(0.06)}
          initial="hidden"
          animate="visible"
          className="grid gap-4 md:grid-cols-2"
        >
          {filtered.map((cat) => (
            <motion.div
              key={cat.id}
              variants={fadeUpWithStagger(0.025)}
              layout
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
            >
              <motion.h3
                variants={tagPop}
                className="mb-3 font-mono text-xs uppercase tracking-wider text-brand-400"
              >
                {cat.label}
              </motion.h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={tagPop}
                    className="rounded-md border border-slate-700/50 bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300 transition-colors hover:border-brand-400/30 hover:text-brand-400"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
