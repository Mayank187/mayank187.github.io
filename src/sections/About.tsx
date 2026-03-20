import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { HolographicCard } from '../components/ui/holographic-card';
import { profile } from '../data/profile';
import { stagger, fadeUp, viewport } from '../data/animations';

const profileFields = [
  { key: 'role', value: profile.title },
  { key: 'location', value: profile.location },
  { key: 'focus', value: 'LLMs, RAG, NLP, MLOps' },
  { key: 'status', value: '● available for impact', color: 'text-green-400' },
  { key: 'education', value: 'B.Tech CSE, SRM (2015-2019)' },
] as const;

export function About() {
  return (
    <section id="about" className="relative flex h-screen items-center overflow-hidden px-4 py-24 md:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading prefix="01" title="About" id="about-heading" />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="space-y-6"
        >
          {/* Top row: Bio + Terminal card */}
          <div className="grid gap-6 md:grid-cols-5">
            {/* Bio — takes 3 cols */}
            <motion.div variants={fadeUp} className="md:col-span-3">
              <HolographicCard className="h-full p-8">
                <h3 className="mb-4 font-display text-lg font-bold text-slate-100">
                  {profile.name}
                </h3>
                <div className="space-y-3">
                  {profile.about.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-slate-400">
                      {p}
                    </p>
                  ))}
                </div>
              </HolographicCard>
            </motion.div>

            {/* Terminal profile card — takes 2 cols */}
            <motion.div variants={fadeUp} className="md:col-span-2">
              <HolographicCard className="h-full p-6">
                {/* Terminal chrome */}
                <div className="mb-4 flex items-center gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  <span className="ml-2 font-mono text-[10px] text-slate-600">
                    system.profile
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {profileFields.map((item) => (
                    <div key={item.key}>
                      <span className="text-brand-400">{item.key}</span>
                      <span className="text-slate-600">: </span>
                      <span className={'color' in item ? item.color : 'text-slate-300'}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Blinking cursor */}
                <div className="mt-4 font-mono text-xs text-slate-600">
                  <span className="text-brand-400">$</span>{' '}
                  <span className="inline-block w-1.5 animate-pulse bg-brand-400/80">
                    &nbsp;
                  </span>
                </div>
              </HolographicCard>
            </motion.div>
          </div>

          {/* Bottom row: Metrics */}
          <motion.div variants={fadeUp}>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {profile.metrics.map((m) => (
                <HolographicCard key={m.label} className="p-5 text-center">
                  <p className="text-lg font-bold text-slate-100">{m.label}</p>
                  <p className="font-mono text-[11px] text-slate-500">{m.sublabel}</p>
                </HolographicCard>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
