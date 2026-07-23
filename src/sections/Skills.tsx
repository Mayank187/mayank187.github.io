import { motion } from 'framer-motion';
import {
  Search, Sparkles, MessageSquare, Eye, Server, Container,
  ArrowUpRight, type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { capabilities, proficiencyLabel, type Proficiency } from '../data/skills';
import { fadeUp, stagger, viewport } from '../data/animations';

const icons: Record<string, LucideIcon> = {
  Search, Sparkles, MessageSquare, Eye, Server, Container,
};

const proficiencyStyle: Record<Proficiency, string> = {
  production: 'border-brand-400/30 bg-brand-400/10 text-brand-400',
  professional: 'border-brand-400/20 bg-brand-400/5 text-brand-300',
  'current-focus': 'border-slate-600 bg-slate-800/60 text-slate-300',
  working: 'border-slate-700 bg-slate-800/40 text-slate-400',
};

export function Skills() {
  return (
    <section id="skills" className="relative px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading prefix="04" title="Capabilities" id="skills-heading" />

        <motion.div
          variants={stagger(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map((cap) => {
            const Icon = icons[cap.icon] ?? Server;
            return (
              <motion.div
                key={cap.id}
                variants={fadeUp}
                className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/40 p-5 transition-colors hover:border-slate-700"
              >
                <div className="mb-2 flex items-center gap-2">
                  <Icon aria-hidden="true" size={16} className="text-brand-400" />
                  <h3 className="text-sm font-semibold text-slate-100">{cap.label}</h3>
                </div>

                <span
                  className={`mb-3 inline-flex w-fit items-center rounded-full border px-2 py-0.5 font-mono text-[10px] ${proficiencyStyle[cap.proficiency]}`}
                >
                  {proficiencyLabel[cap.proficiency]}
                </span>

                <p className="mb-3 text-xs leading-relaxed text-slate-400">{cap.description}</p>

                <ul className="mb-4 flex flex-wrap gap-1">
                  {cap.technologies.map((t) => (
                    <li key={t} className="rounded border border-slate-700/50 bg-slate-800/50 px-1.5 py-0.5 text-[10px] text-slate-300">
                      {t}
                    </li>
                  ))}
                </ul>

                {cap.proof.length > 0 && (
                  <div className="mt-auto space-y-1 border-t border-slate-800 pt-3">
                    <p className="mb-1 font-mono text-[9px] uppercase tracking-wider text-slate-600">Seen in</p>
                    {cap.proof.map((p) => {
                      const inner = (
                        <>
                          <ArrowUpRight aria-hidden="true" size={11} className="mt-0.5 flex-shrink-0 text-brand-400/70" />
                          <span>{p.text}</span>
                        </>
                      );
                      return p.href ? (
                        <a
                          key={p.text}
                          href={p.href}
                          className="flex items-start gap-1.5 text-[11px] text-slate-500 transition-colors hover:text-brand-400"
                        >
                          {inner}
                        </a>
                      ) : (
                        <p key={p.text} className="flex items-start gap-1.5 text-[11px] text-slate-500">
                          {inner}
                        </p>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
