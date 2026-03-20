import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check, Download, Eye, Zap } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { HolographicCard } from '../components/ui/holographic-card';
import { profile } from '../data/profile';
import { stagger, fadeUp, hover, tap, notification, viewport } from '../data/animations';

export function ContactResume() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative flex min-h-screen items-center px-4 py-24 md:px-6">
      <div className="mx-auto w-full max-w-4xl">
        <SectionHeading prefix="07" title="Get in Touch" id="contact-heading" />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="space-y-6"
        >
          {/* Current Focus — full width */}
          <motion.div variants={fadeUp}>
            <HolographicCard className="p-8">
              <div className="mb-4 flex items-center gap-2">
                <Zap size={16} className="text-brand-400" />
                <h3 className="font-mono text-xs uppercase tracking-widest text-brand-400">
                  current_focus
                </h3>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 font-mono text-xs text-green-400">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  active
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.currentFocus.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-700/50 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-brand-400/30 hover:text-brand-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </HolographicCard>
          </motion.div>

          {/* Contact + Resume — side by side */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Contact card */}
            <motion.div variants={fadeUp}>
              <HolographicCard className="h-full p-8">
                <div className="flex h-full flex-col">
                  <div className="mb-1 flex items-center gap-2">
                    <Mail size={16} className="text-brand-400" />
                    <h3 className="font-mono text-xs uppercase tracking-widest text-brand-400">
                      Contact
                    </h3>
                  </div>
                  <p className="mb-6 text-sm text-slate-400">
                    Open to discussing production AI systems, engineering challenges, or collaboration opportunities.
                  </p>

                  <div className="mb-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <motion.a
                        href={`mailto:${profile.email}`}
                        whileHover={hover.scale}
                        whileTap={tap.press}
                        className="inline-flex items-center gap-2 rounded-lg bg-brand-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-brand-300"
                      >
                        <Mail size={14} /> Send Email
                      </motion.a>
                      <motion.button
                        onClick={copyEmail}
                        whileHover={hover.scale}
                        whileTap={tap.press}
                        className="rounded-lg border border-slate-700 bg-slate-800 p-2.5 text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200"
                        title="Copy email"
                      >
                        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                      </motion.button>
                    </div>
                    <AnimatePresence>
                      {copied && (
                        <motion.span
                          variants={notification}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="font-mono text-xs text-green-400"
                        >
                          Email copied to clipboard
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-auto flex gap-3">
                    <motion.a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={hover.scale}
                      whileTap={tap.soft}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-xs text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200"
                    >
                      <Github size={14} /> GitHub
                    </motion.a>
                    <motion.a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={hover.scale}
                      whileTap={tap.soft}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-3 py-2 text-xs text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200"
                    >
                      <Linkedin size={14} /> LinkedIn
                    </motion.a>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>

            {/* Resume card */}
            <motion.div variants={fadeUp}>
              <HolographicCard className="h-full p-8">
                <div className="flex h-full flex-col">
                  <div className="mb-1 flex items-center gap-2">
                    <Download size={16} className="text-brand-400" />
                    <h3 className="font-mono text-xs uppercase tracking-widest text-brand-400">
                      Resume
                    </h3>
                  </div>
                  <p className="mb-6 text-sm text-slate-400">
                    Full career details, skills, and experience in a downloadable format.
                  </p>

                  <div className="mb-6 grid grid-cols-2 gap-3">
                    {profile.metrics.slice(0, 4).map((m) => (
                      <div key={m.label} className="rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2">
                        <p className="text-sm font-semibold text-slate-100">{m.label}</p>
                        <p className="font-mono text-[10px] text-slate-500">{m.sublabel}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-3">
                    <motion.a
                      href={profile.resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={hover.scale}
                      whileTap={tap.press}
                      className="inline-flex items-center gap-2 rounded-lg bg-brand-400 px-5 py-2.5 text-sm font-medium text-slate-950 transition-colors hover:bg-brand-300"
                    >
                      <Download size={14} /> Download PDF
                    </motion.a>
                    <motion.a
                      href={profile.resumePath}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={hover.scale}
                      whileTap={tap.press}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-sm text-slate-300 transition-colors hover:border-slate-600"
                    >
                      <Eye size={14} /> View
                    </motion.a>
                  </div>
                </div>
              </HolographicCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
