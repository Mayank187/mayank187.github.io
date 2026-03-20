import React, { useRef, useState } from 'react';
import { useMotionValueEvent, useScroll, motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export interface StickyScrollItem {
  title: string;
  description: string;
  content?: React.ReactNode;
}

export function StickyScroll({
  heading,
  content,
  contentClassName,
}: {
  heading?: string;
  content: StickyScrollItem[];
  contentClassName?: string;
}) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  const linearGradients = [
    'linear-gradient(135deg, var(--color-surface-800), var(--color-surface-900))',
    'linear-gradient(135deg, var(--color-surface-900), var(--color-surface-800))',
    'linear-gradient(135deg, var(--color-surface-800), var(--color-surface-950))',
    'linear-gradient(135deg, var(--color-surface-950), var(--color-surface-800))',
  ];

  // Scroll height: enough room per item but not excessive
  const scrollHeight = `${Math.max(content.length * 50, 100)}vh`;

  return (
    <div ref={ref} style={{ height: scrollHeight }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center px-4 md:px-6">
        <div className="mx-auto w-full max-w-5xl">
          {heading && (
            <p className="mb-8 font-mono text-xs uppercase tracking-widest text-brand-400">
              {heading}
            </p>
          )}
          <div className="flex items-start gap-10">
            {/* Left — text content, crossfade */}
            <div className="min-w-0 flex-1">
              <div className="relative">
                {content.map((item, index) => (
                  <motion.div
                    key={item.title + index}
                    initial={false}
                    animate={{
                      opacity: activeCard === index ? 1 : 0,
                      y: activeCard === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className={activeCard === index ? 'relative' : 'pointer-events-none absolute inset-0'}
                  >
                    <h2 className="mb-4 text-2xl font-bold text-slate-100 md:text-3xl">
                      {item.title}
                    </h2>
                    <p className="max-w-lg text-sm leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Progress dots */}
              <div className="mt-8 flex gap-2">
                {content.map((_, index) => (
                  <div
                    key={index}
                    className={cn(
                      'h-1.5 rounded-full transition-all duration-300',
                      activeCard === index
                        ? 'w-6 bg-brand-400'
                        : 'w-1.5 bg-slate-700',
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Right — sticky gradient card */}
            <motion.div
              animate={{ background: linearGradients[activeCard % linearGradients.length] }}
              transition={{ duration: 0.5 }}
              className={cn(
                'relative hidden h-72 w-80 flex-shrink-0 overflow-hidden rounded-xl border border-slate-700/50 lg:block',
                contentClassName,
              )}
            >
              {content.map((item, index) => (
                <motion.div
                  key={item.title + index}
                  initial={false}
                  animate={{ opacity: activeCard === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                  style={{ pointerEvents: activeCard === index ? 'auto' : 'none' }}
                >
                  {item.content ?? null}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
