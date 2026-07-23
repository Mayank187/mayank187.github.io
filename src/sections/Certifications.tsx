import { motion } from 'framer-motion';
import { Award as AwardIcon, GraduationCap, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { certifications, awards } from '../data/certifications';
import { fadeUp, stagger, viewport } from '../data/animations';

export function Certifications() {
  return (
    <section id="certifications" className="relative px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeading prefix="05" title="Recognition" id="certifications-heading" />

        <div className="grid gap-8 md:grid-cols-2">
          {/* Awards ,  kept prominent, each with organisation + year */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-400">
              <AwardIcon aria-hidden="true" size={14} /> Awards
            </h3>
            <motion.ul
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="space-y-2.5"
            >
              {awards.map((award) => (
                <motion.li
                  key={`${award.title}-${award.org}`}
                  variants={fadeUp}
                  className="flex items-baseline justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900/40 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-200">{award.title}</p>
                    <p className="text-xs text-slate-500">{award.org}</p>
                  </div>
                  <span className="whitespace-nowrap font-mono text-xs text-slate-500">{award.year}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Certifications ,  compact, no boilerplate */}
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-400">
              <GraduationCap aria-hidden="true" size={14} /> Certifications
            </h3>
            <motion.ul
              variants={stagger(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="space-y-2.5"
            >
              {certifications.map((cert) => (
                <motion.li
                  key={cert.title}
                  variants={fadeUp}
                  className="flex items-baseline justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900/40 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-200">{cert.title}</p>
                    <p className="text-xs text-slate-500">{cert.issuer}</p>
                  </div>
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 whitespace-nowrap font-mono text-xs text-slate-400 transition-colors hover:text-brand-400"
                    >
                      Verify <ExternalLink aria-hidden="true" size={11} />
                    </a>
                  ) : (
                    cert.year && <span className="whitespace-nowrap font-mono text-xs text-slate-500">{cert.year}</span>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
