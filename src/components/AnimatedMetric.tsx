import { useEffect, useRef, useState } from 'react';

interface Props {
  label: string;
}

export function AnimatedMetric({ label }: Props) {
  // Parse leading number (e.g. "6.5+ Years" → 6.5, suffix "+ Years")
  const match = label.match(/^(\d+\.?\d*)(.*)/);
  if (!match) return <>{label}</>;

  const target = parseFloat(match[1]);
  const suffix = match[2]; // e.g. "+ Years" or ""
  const isDecimal = match[1].includes('.');

  return <Counter target={target} suffix={suffix} decimal={isDecimal} />;
}

function Counter({ target, suffix, decimal }: { target: number; suffix: string; decimal: boolean }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1800;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, target]);

  const display = decimal ? count.toFixed(1) : Math.round(count).toString();

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}
