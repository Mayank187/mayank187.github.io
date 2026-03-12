import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { profile } from '../data/profile';

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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="mb-6 text-sm text-slate-400">
            Open to discussing production AI systems, engineering challenges, or collaboration opportunities.
          </p>

          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-400 px-6 py-3 text-sm font-medium text-slate-950 transition-all hover:bg-brand-300 hover:shadow-lg hover:shadow-brand-400/20"
              >
                <Mail size={16} /> Send Email
              </a>
              <button
                onClick={copyEmail}
                className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200"
                title="Copy email"
              >
                {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            </div>
            {copied && (
              <span className="font-mono text-xs text-green-400">Email copied to clipboard</span>
            )}
          </div>

          <div className="flex justify-center gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-4 py-2 text-sm text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-800 px-4 py-2 text-sm text-slate-400 transition-colors hover:border-slate-700 hover:text-slate-200"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
