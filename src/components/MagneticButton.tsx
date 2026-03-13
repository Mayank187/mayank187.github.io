import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  strength?: number;
  'data-cursor'?: string;
  'data-cursor-label'?: string;
}

export function MagneticButton({
  children,
  className = '',
  href,
  strength = 0.3,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const Tag = href ? 'a' : 'div';

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.div
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.5 }}
      >
        {href ? (
          <Tag href={href} className={className} {...rest}>
            {children}
          </Tag>
        ) : (
          <div className={className} {...rest}>
            {children}
          </div>
        )}
      </motion.div>
    </div>
  );
}
