import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { profile } from '../data/profile';
import { stagger, fadeUp, fadeUpWithStagger, viewport } from '../data/animations';

export function About() {
  return (
    <section id="about" className="relative px-4 py-24 md:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading prefix="01" title="About" id="about-heading" />

        <motion.div
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid gap-8 md:grid-cols-3"
        >
          <motion.div variants={fadeUp} className="md:col-span-2 space-y-4">
            {profile.about.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-slate-400">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUpWithStagger(0.06)}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
          >
            <motion.h3
              variants={fadeUp}
              className="mb-3 font-mono text-xs uppercase tracking-wider text-brand-400"
            >
              system.profile
            </motion.h3>
            <div className="space-y-3 font-mono text-xs">
              {[
                { key: 'role', value: profile.title },
                { key: 'location', value: profile.location },
                { key: 'focus', value: 'LLMs, RAG, NLP, MLOps' },
                { key: 'status', value: '● available for impact', color: 'text-green-400' },
                { key: 'education', value: 'B.Tech CSE, SRM (2015-2019)' },
              ].map((item) => (
                <motion.div key={item.key} variants={fadeUp}>
                  <span className="text-slate-500">{item.key}:</span>{' '}
                  <span className={item.color ?? 'text-slate-300'}>{item.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
