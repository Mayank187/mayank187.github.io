import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, GraduationCap, Trophy } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { certifications, awards } from '../data/certifications';
import { cn } from '../utils/cn';
import { tabContent, scaleIn, hover, tap } from '../data/animations';

export function Certifications() {
  const [tab, setTab] = useState<'certs' | 'awards'>('certs');

  return (
    <section id="certifications" className="relative px-4 py-24 md:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading prefix="06" title="Recognitions" id="certifications-heading" />

        {/* Tabs */}
        <div className="mb-8 flex gap-2">
          <motion.button
            onClick={() => setTab('certs')}
            whileHover={hover.scale}
            whileTap={tap.press}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-colors',
              tab === 'certs'
                ? 'bg-brand-400/10 text-brand-400 border border-brand-400/30'
                : 'text-slate-500 border border-slate-800 hover:text-slate-300',
            )}
          >
            <GraduationCap size={14} /> Certifications
          </motion.button>
          <motion.button
            onClick={() => setTab('awards')}
            whileHover={hover.scale}
            whileTap={tap.press}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-xs transition-colors',
              tab === 'awards'
                ? 'bg-brand-400/10 text-brand-400 border border-brand-400/30'
                : 'text-slate-500 border border-slate-800 hover:text-slate-300',
            )}
          >
            <Trophy size={14} /> Awards
          </motion.button>
        </div>

        {/* Content with crossfade */}
        <AnimatePresence mode="wait">
          {tab === 'certs' && (
            <motion.div
              key="certs"
              variants={tabContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-slate-700"
                >
                  <GraduationCap size={18} className="mb-2 text-brand-400" />
                  <h4 className="mb-1 text-sm font-medium text-slate-200">{cert.title}</h4>
                  <p className="font-mono text-xs text-slate-500">{cert.issuer}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {tab === 'awards' && (
            <motion.div
              key="awards"
              variants={tabContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid gap-3 sm:grid-cols-2"
            >
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-slate-700"
                >
                  <div className="flex items-start gap-3">
                    <Award size={18} className="mt-0.5 flex-shrink-0 text-amber-400" />
                    <div>
                      <h4 className="mb-1 text-sm font-medium text-slate-200">{award.title}</h4>
                      <p className="font-mono text-xs text-slate-500">{award.org} · {award.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
