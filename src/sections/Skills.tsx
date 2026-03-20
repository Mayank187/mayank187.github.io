import { StickyScroll } from '../components/ui/sticky-scroll-reveal';
import { skillCategories } from '../data/skills';

const iconMap: Record<string, string> = {
  Code2: '💻',
  Server: '🖥️',
  Brain: '🧠',
  Sparkles: '✨',
  Search: '🔍',
  Container: '📦',
  Activity: '📊',
  Cloud: '☁️',
  GitBranch: '🔀',
};

const content = skillCategories.map((cat) => ({
  title: cat.label,
  description: `Core technologies and tools I use across ${cat.label.toLowerCase()} workflows.`,
  content: (
    <div className="flex h-full w-full flex-col p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="text-xl">{iconMap[cat.icon] || '⚡'}</span>
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand-400">
          {cat.label}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {cat.skills.map((s) => (
          <span
            key={s}
            className="rounded border border-slate-700/50 bg-slate-800/60 px-2 py-0.5 text-[11px] text-slate-300"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  ),
}));

export function Skills() {
  return (
    <section id="skills" className="relative">
      <StickyScroll heading="03 — Stack" content={content} />
    </section>
  );
}
