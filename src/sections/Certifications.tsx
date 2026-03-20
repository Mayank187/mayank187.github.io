import { GraduationCap, Award } from 'lucide-react';
import { StickyScroll } from '../components/ui/sticky-scroll-reveal';
import { certifications, awards } from '../data/certifications';

const content = [
  ...certifications.map((cert) => ({
    title: cert.title,
    description: `Certified by ${cert.issuer}. Validates deep expertise in the subject area through rigorous coursework and assessment.`,
    content: (
      <div className="flex h-full w-full flex-col justify-between p-5">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <GraduationCap size={16} className="text-brand-400" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-400">
              Certification
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-100">{cert.title}</p>
          <p className="mt-1 text-xs text-slate-500">{cert.issuer}</p>
        </div>
      </div>
    ),
  })),
  ...awards.map((award) => ({
    title: award.title,
    description: `Awarded by ${award.org} in ${award.year} for outstanding performance and contributions.`,
    content: (
      <div className="flex h-full w-full flex-col justify-between p-5">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Award size={16} className="text-amber-400" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-400">
              Award · {award.year}
            </span>
          </div>
          <p className="text-sm font-semibold text-slate-100">{award.title}</p>
          <p className="mt-1 text-xs text-slate-500">{award.org}</p>
        </div>
      </div>
    ),
  })),
];

export function Certifications() {
  return (
    <section id="certifications" className="relative">
      <StickyScroll heading="06 — Recognitions" content={content} />
    </section>
  );
}
