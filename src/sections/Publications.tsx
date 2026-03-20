import { BookOpen, ExternalLink } from 'lucide-react';
import { StickyScroll } from '../components/ui/sticky-scroll-reveal';
import { publications } from '../data/publications';

const content = publications.map((pub) => ({
  title: pub.title,
  description: pub.summary,
  content: (
    <div className="flex h-full w-full flex-col justify-between p-5">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <BookOpen size={16} className="text-brand-400" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-400">
            Publication
          </span>
        </div>
        <p className="mb-1 text-sm font-semibold text-slate-100">{pub.venue}</p>
        <p className="text-xs text-slate-500">{pub.year}</p>
      </div>
      {pub.link && (
        <a
          href={pub.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 self-start rounded border border-slate-700/50 bg-slate-800/60 px-2 py-1 text-xs text-slate-300 transition-colors hover:border-brand-400/30 hover:text-brand-400"
        >
          <ExternalLink size={12} /> Read Paper
        </a>
      )}
    </div>
  ),
}));

export function Publications() {
  return (
    <section id="publications" className="relative">
      <StickyScroll heading="05 — Research" content={content} />
    </section>
  );
}
