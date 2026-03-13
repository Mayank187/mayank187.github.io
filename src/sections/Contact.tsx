import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { profile } from '../data/profile';
import { stagger, fadeUp, hover, tap, notification, viewport } from '../data/animations';

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative px-4 py-24 md:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading prefix="07" title="Contact" id="contact-heading" />

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center"
        >
          <motion.p variants={fadeUp} className="mb-6 text-sm text-slate-400">
            Open to discussing production AI systems, engineering challenges, or collaboration opportunities.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={hover.scale}
                whileTap={tap.press}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-400 px-6 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-brand-300"
              >
                <Mail size={16} /> Send Email
              </motion.a>
              <motion.button
                onClick={copyEmail}
                whileHover={hover.scale}
                whileTap={tap.press}
                className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200"
                title="Copy email"
              >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
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
          </motion.div>

          <motion.div variants={stagger(0.08)} className="flex justify-center gap-4">
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              whileHover={hover.scale}
              whileTap={tap.soft}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-4 py-2 text-sm text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200"
            >
              <Github size={16} /> GitHub
            </motion.a>
            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              whileHover={hover.scale}
              whileTap={tap.soft}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-4 py-2 text-sm text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200"
            >
              <Linkedin size={16} /> LinkedIn
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
