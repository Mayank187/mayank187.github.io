import { cn } from '../utils/cn';

const variants: Record<string, string> = {
  PROD: 'border-green-500/30 text-green-400 bg-green-500/5',
  NLP: 'border-brand-400/30 text-brand-400 bg-brand-400/5',
  RAG: 'border-purple-400/30 text-purple-400 bg-purple-400/5',
  LLM: 'border-purple-400/30 text-purple-400 bg-purple-400/5',
  CV: 'border-teal-400/30 text-teal-400 bg-teal-400/5',
  API: 'border-brand-400/30 text-brand-400 bg-brand-400/5',
  DEPLOYED: 'border-green-500/30 text-green-400 bg-green-500/5',
  'RESEARCH-ADJACENT': 'border-amber-400/30 text-amber-400 bg-amber-400/5',
};

interface Props {
  label: string;
  className?: string;
}

export function Badge({ label, className }: Props) {
  const variant = variants[label] || 'border-slate-600 text-slate-400 bg-slate-500/5';
  return (
    <span
      className={cn(
        'inline-block rounded border px-2 py-0.5 font-mono text-xs',
        variant,
        className,
      )}
    >
      {label}
    </span>
  );
}
