import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

type CursorVariant = 'default' | 'hover' | 'action';

export function SpotlightCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [label, setLabel] = useState('');
  const isTouchRef = useRef(false);

  const springX = useSpring(cursorX, { stiffness: 800, damping: 40, mass: 0.3 });
  const springY = useSpring(cursorY, { stiffness: 800, damping: 40, mass: 0.3 });

  const getVariantFromElement = useCallback((el: HTMLElement): { variant: CursorVariant; label: string } => {
    let node: HTMLElement | null = el;
    while (node) {
      const cursorAttr = node.getAttribute('data-cursor');
      if (cursorAttr) {
        const cursorLabel = node.getAttribute('data-cursor-label') ?? '';
        return { variant: cursorAttr as CursorVariant, label: cursorLabel };
      }
      const tag = node.tagName.toLowerCase();
      if (tag === 'a' || tag === 'button') {
        return { variant: 'hover', label: '' };
      }
      if (node.getAttribute('role') === 'button' || node.classList.contains('cursor-pointer')) {
        return { variant: 'hover', label: '' };
      }
      node = node.parentElement;
    }
    return { variant: 'default', label: '' };
  }, []);

  useEffect(() => {
    isTouchRef.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchRef.current) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);

      const { variant: v, label: l } = getVariantFromElement(e.target as HTMLElement);
      setVariant(v);
      setLabel(l);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [visible, cursorX, cursorY, getVariantFromElement]);

  if (isTouchRef.current) return null;

  const isHover = variant === 'hover' || variant === 'action';

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Spotlight glow */}
      <motion.div
        className="absolute h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: springX,
          top: springY,
          background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, rgba(251,191,36,0.03) 40%, transparent 70%)',
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-400"
        style={{ left: springX, top: springY }}
        animate={{
          width: isHover ? 8 : 6,
          height: isHover ? 8 : 6,
          opacity: isHover ? 0.9 : 0.7,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      />

      {/* Outer ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-400/40"
        style={{ left: springX, top: springY }}
        animate={{
          width: isHover ? 48 : 32,
          height: isHover ? 48 : 32,
          borderColor: isHover ? 'rgba(245,158,11,0.6)' : 'rgba(245,158,11,0.25)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />

      {/* Label pill */}
      {label && (
        <motion.div
          className="absolute -translate-x-1/2 rounded-full bg-brand-400 px-2.5 py-0.5 font-mono text-[10px] font-medium text-slate-950"
          style={{ left: springX, top: springY }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 32, scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          key={label}
        >
          {label}
        </motion.div>
      )}
    </div>
  );
}
