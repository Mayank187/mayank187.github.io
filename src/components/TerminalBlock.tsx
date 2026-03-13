import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../data/animations';

interface Line {
  command: string;
  output: string;
  outputColor?: string;
}

const lines: Line[] = [
  { command: 'whoami', output: 'Senior AI/ML Engineer', outputColor: 'text-green-400' },
  { command: 'cat stack.txt', output: 'LLMs · RAG · NLP · MLOps', outputColor: 'text-brand-400' },
  { command: 'uptime', output: '6.5+ years in production AI', outputColor: 'text-slate-300' },
];

export function TerminalBlock() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  const currentLine = lines[visibleLines];
  const commandLength = currentLine?.command.length ?? 0;

  useEffect(() => {
    if (visibleLines >= lines.length) return;

    if (typedChars < commandLength) {
      const timer = setTimeout(() => setTypedChars((c) => c + 1), 50 + Math.random() * 40);
      return () => clearTimeout(timer);
    }

    if (!showOutput) {
      const timer = setTimeout(() => setShowOutput(true), 300);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setVisibleLines((v) => v + 1);
      setTypedChars(0);
      setShowOutput(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [visibleLines, typedChars, showOutput, commandLength]);

  return (
    <motion.div
      variants={fadeUp}
      className="mb-8 w-full max-w-md overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 font-mono text-sm shadow-lg"
    >
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-slate-800 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-slate-600">~/mayank</span>
      </div>

      {/* Terminal body */}
      <div className="space-y-2 p-4">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i}>
            <div className="flex items-center gap-2">
              <span className="text-brand-400">$</span>
              <span className="text-slate-300">{line.command}</span>
            </div>
            <div className={`pl-4 ${line.outputColor ?? 'text-slate-400'}`}>
              {line.output}
            </div>
          </div>
        ))}

        {visibleLines < lines.length && (
          <div>
            <div className="flex items-center gap-2">
              <span className="text-brand-400">$</span>
              <span className="text-slate-300">
                {currentLine.command.slice(0, typedChars)}
              </span>
              <span className="inline-block h-4 w-1.5 animate-pulse bg-brand-400/80" />
            </div>
            {showOutput && (
              <div className={`pl-4 ${currentLine.outputColor ?? 'text-slate-400'}`}>
                {currentLine.output}
              </div>
            )}
          </div>
        )}

        {visibleLines >= lines.length && (
          <div className="flex items-center gap-2">
            <span className="text-brand-400">$</span>
            <span className="inline-block h-4 w-1.5 animate-pulse bg-brand-400/80" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
