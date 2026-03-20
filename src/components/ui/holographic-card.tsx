import { useRef, type ReactNode } from 'react';

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
}

export function HolographicCard({ children, className = '' }: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const applyTransform = (x: number, y: number, rect: DOMRect) => {
    const card = cardRef.current;
    if (!card) return;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    card.style.setProperty('--holo-x', `${x}px`);
    card.style.setProperty('--holo-y', `${y}px`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetTransform = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    card.style.setProperty('--holo-x', '50%');
    card.style.setProperty('--holo-y', '50%');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    applyTransform(e.clientX - rect.left, e.clientY - rect.top, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const touch = e.touches[0];
    const rect = card.getBoundingClientRect();
    applyTransform(touch.clientX - rect.left, touch.clientY - rect.top, rect);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
      onTouchMove={handleTouchMove}
      onTouchEnd={resetTransform}
      className={`holo-card ${className}`}
      style={
        {
          '--holo-x': '50%',
          '--holo-y': '50%',
        } as React.CSSProperties
      }
    >
      <div className="relative z-10">{children}</div>
      <div className="holo-glow" />
    </div>
  );
}
