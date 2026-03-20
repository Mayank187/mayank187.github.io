import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  glowColor?: string;
  'data-cursor'?: string;
  'data-cursor-label'?: string;
}

export function TiltCard({ children, className = '', onClick, glowColor = 'rgba(245, 158, 11, 0.15)', ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTransform({
      rotateX: (0.5 - y) * 12,
      rotateY: (x - 0.5) * 12,
    });
    setGlowPos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
    setHovering(false);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onClick={onClick}
      {...rest}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{
        perspective: 800,
        transformStyle: 'preserve-3d',
        background: hovering
          ? `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 60%)`
          : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}
