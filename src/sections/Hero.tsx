import { motion } from 'framer-motion';
import { ArrowDown, Download, Terminal } from 'lucide-react';
import { profile } from '../data/profile';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 pt-16">
      <div className="mx-auto max-w-4xl">
        {/* Terminal greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-4 py-2 font-mono text-sm"
        >
          <Terminal size={14} className="text-brand-400" />
          <span className="text-slate-500">$</span>
          <span className="text-slate-300">whoami</span>
          <span className="text-slate-600">—</span>
          <span className="text-green-400">Senior AI/ML Engineer</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-4 text-4xl font-bold tracking-tight text-slate-100 md:text-6xl lg:text-7xl"
        >
          {profile.name}
          <span className="text-brand-400">.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-6 max-w-2xl text-lg text-slate-400 md:text-xl"
        >
          {profile.tagline}
        </motion.p>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-8 max-w-xl text-sm leading-relaxed text-slate-500"
        >
          I architect, build, and ship production-grade AI systems across the full stack, from LLM APIs, RAG pipelines, and intelligent retrieval to scalable NLP services, model deployment, and ML infrastructure that delivers measurable business impact.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-12 flex flex-wrap gap-3"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition-all hover:bg-brand-300 hover:shadow-lg hover:shadow-brand-400/20"
          >
            View Projects <ArrowDown size={16} />
          </a>
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-5 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-slate-600 hover:bg-slate-800"
          >
            <Download size={16} /> Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-5 py-2.5 text-sm text-slate-400 transition-all hover:border-slate-700 hover:text-slate-300"
          >
            Contact
          </a>
        </motion.div>

        {/* Metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="flex flex-wrap gap-6 border-t border-slate-800/50 pt-8"
        >
          {profile.metrics.map((m, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-mono text-lg font-bold text-slate-100">{m.label}</span>
              <span className="font-mono text-xs text-slate-500">{m.sublabel}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
