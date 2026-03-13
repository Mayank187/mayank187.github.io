import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../data/animations';

interface Line {
  command: string;
  output: string;
  outputColor?: string;
}

const introLines: Line[] = [
  { command: 'whoami', output: 'Senior AI/ML Engineer', outputColor: 'text-green-400' },
  { command: 'cat stack.txt', output: 'LLMs · RAG · NLP · MLOps', outputColor: 'text-brand-400' },
  { command: 'uptime', output: '6.5+ years in production AI', outputColor: 'text-slate-300' },
];

const easterEggCommands: Record<string, string | (() => string)> = {
  help: 'Available: help, ls, ls projects, cat about.txt, cat skills.txt, echo <msg>, clear, sudo hire mayank, date, pwd, neofetch',
  ls: 'about.txt  skills.txt  projects/  resume.pdf  .secret',
  'ls projects': 'stack-overflow-tagger/  llm-menu-gen/  rag-pipeline/  visual-pollution/',
  'cat about.txt': 'Mayank — Senior AI/ML Engineer who architects production-grade AI systems.\nPassionate about LLMs, RAG pipelines, and scalable NLP services.',
  'cat skills.txt': 'Languages: Python, TypeScript, Go\nML/DL: PyTorch, TensorFlow, Hugging Face\nLLM/RAG: LangChain, LlamaIndex, OpenAI, Anthropic\nInfra: Docker, K8s, AWS, GCP',
  'cat .secret': '🥚 You found the easter egg! Here\'s a cookie: 🍪',
  'cat resume.pdf': 'Nice try! Click the "Download Resume" button above 😄',
  pwd: '/home/mayank/portfolio',
  date: () => new Date().toLocaleString(),
  neofetch: `   ╔══════════════════╗
   ║   mayank@web     ║
   ╠══════════════════╣
   ║ OS: React 19     ║
   ║ UI: Tailwind v4  ║
   ║ Anim: Framer 12  ║
   ║ Lang: TypeScript  ║
   ║ Deploy: GH Pages ║
   ╚══════════════════╝`,
  'sudo hire mayank': '✅ Excellent choice! Sending offer letter... 📧\n   Redirecting to contact section...',
  whoami: 'A curious visitor exploring my terminal 👀',
  'rm -rf /': '🚫 Permission denied. Nice try though!',
  exit: 'Bye! 👋 (but you can\'t really leave this terminal)',
};

interface HistoryEntry {
  command: string;
  output: string;
  outputColor?: string;
}

export function TerminalBlock() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const introComplete = visibleLines >= introLines.length;

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [userInput, setUserInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIndex, setCmdHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const currentLine = introLines[visibleLines];
  const commandLength = currentLine?.command.length ?? 0;

  // Intro typing animation
  useEffect(() => {
    if (introComplete) return;

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
  }, [visibleLines, typedChars, showOutput, commandLength, introComplete]);

  // Auto-focus when intro completes
  useEffect(() => {
    if (introComplete) {
      const timer = setTimeout(() => inputRef.current?.focus(), 400);
      return () => clearTimeout(timer);
    }
  }, [introComplete]);

  // Scroll to bottom on new content
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, visibleLines]);

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    setCmdHistory((prev) => [...prev, trimmed]);
    setCmdHistoryIndex(-1);

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    if (trimmed === 'sudo hire mayank') {
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 1500);
    }

    const response = easterEggCommands[trimmed];
    let output: string;
    if (response) {
      output = typeof response === 'function' ? response() : response;
    } else if (trimmed.startsWith('echo ')) {
      output = cmd.trim().slice(5);
    } else {
      output = `command not found: ${trimmed}. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { command: cmd.trim(), output, outputColor: 'text-slate-300' }]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(userInput);
      setUserInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const newIndex = cmdHistoryIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdHistoryIndex - 1);
      setCmdHistoryIndex(newIndex);
      setUserInput(cmdHistory[newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistoryIndex === -1) return;
      const newIndex = cmdHistoryIndex + 1;
      if (newIndex >= cmdHistory.length) {
        setCmdHistoryIndex(-1);
        setUserInput('');
      } else {
        setCmdHistoryIndex(newIndex);
        setUserInput(cmdHistory[newIndex]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = userInput.toLowerCase();
      if (!partial) return;
      const match = Object.keys(easterEggCommands).find((c) => c.startsWith(partial));
      if (match) setUserInput(match);
    }
  };

  return (
    <motion.div
      variants={fadeUp}
      className="mb-8 w-full max-w-md overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 font-mono text-sm shadow-lg"
      onClick={() => introComplete && inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-slate-800 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-slate-600">~/mayank</span>
        {introComplete && (
          <span className="ml-auto text-xs text-slate-700">try &apos;help&apos;</span>
        )}
      </div>

      {/* Terminal body */}
      <div ref={bodyRef} className="max-h-64 space-y-2 overflow-y-auto p-4">
        {/* Completed intro lines */}
        {introLines.slice(0, visibleLines).map((line, i) => (
          <div key={`intro-${i}`}>
            <div className="flex items-center gap-2">
              <span className="text-brand-400">$</span>
              <span className="text-slate-300">{line.command}</span>
            </div>
            <div className={`pl-4 ${line.outputColor ?? 'text-slate-400'}`}>
              {line.output}
            </div>
          </div>
        ))}

        {/* Currently typing intro line */}
        {!introComplete && (
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

        {/* User command history */}
        {history.map((entry, i) => (
          <div key={`cmd-${i}`}>
            <div className="flex items-center gap-2">
              <span className="text-brand-400">$</span>
              <span className="text-slate-300">{entry.command}</span>
            </div>
            <div className={`whitespace-pre-wrap pl-4 ${entry.outputColor ?? 'text-slate-400'}`}>
              {entry.output}
            </div>
          </div>
        ))}

        {/* Interactive input */}
        {introComplete && (
          <div className="flex items-center gap-2">
            <span className="text-brand-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-slate-300 caret-brand-400 outline-none placeholder:text-slate-700"
              placeholder="type a command..."
              spellCheck={false}
              autoComplete="off"
            />
            {!userInput && (
              <span className="inline-block h-4 w-1.5 animate-pulse bg-brand-400/80" />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
