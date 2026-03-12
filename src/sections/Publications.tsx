import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { publications, publicationsIntro } from '../data/publications';

export function Publications() {
  return (
    <section id="publications" className="relative px-4 py-24 md:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading prefix="05" title="Research & Publications" id="publications-heading" />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 max-w-2xl text-sm text-slate-400"
        >
          {publicationsIntro}
        </motion.p>

        <div className="space-y-4">
          {publications.map((pub, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5"
            >
              <div className="flex items-start gap-3">
                <BookOpen size={18} className="mt-0.5 flex-shrink-0 text-brand-400" />
                <div className="flex-1">
                  <h3 className="mb-1 text-base font-semibold text-slate-100">{pub.title}</h3>
                  <p className="mb-2 font-mono text-xs text-slate-500">
                    {pub.venue} · {pub.year}
                  </p>
                  <p className="text-sm text-slate-400">{pub.summary}</p>
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs text-brand-400 hover:underline"
                    >
                      Read <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
