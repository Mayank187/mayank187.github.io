import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { profile } from '../data/profile';

export function About() {
  return (
    <section id="about" className="relative px-4 py-24 md:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading prefix="01" title="About" id="about-heading" />

        <div className="grid gap-8 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-4"
          >
            {profile.about.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed text-slate-400">
                {p}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
          >
            <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-brand-400">
              system.profile
            </h3>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-slate-500">role:</span>{' '}
                <span className="text-slate-300">{profile.title}</span>
              </div>
              <div>
                <span className="text-slate-500">location:</span>{' '}
                <span className="text-slate-300">{profile.location}</span>
              </div>
              <div>
                <span className="text-slate-500">focus:</span>{' '}
                <span className="text-slate-300">LLMs, RAG, NLP, MLOps</span>
              </div>
              <div>
                <span className="text-slate-500">status:</span>{' '}
                <span className="text-green-400">● available for impact</span>
              </div>
              <div>
                <span className="text-slate-500">education:</span>{' '}
                <span className="text-slate-300">B.Tech CSE, SRM (2015-2019)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
