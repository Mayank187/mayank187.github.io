import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface ZoomParallaxProps {
  /** Center element (e.g. title text) that zooms the most */
  center: ReactNode;
  /** Surrounding cards — up to 6 */
  children: ReactNode[];
}

export function ZoomParallax({ center, children }: ZoomParallaxProps) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // Center text zooms the most
  const centerScale = useTransform(scrollYProgress, [0, 1], [1, 12]);
  const centerOpacity = useTransform(scrollYProgress, [0, 0.6, 0.8], [1, 1, 0]);

  // Surrounding cards zoom at varied speeds
  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const scales = [scale4, scale5, scale6, scale8, scale9, scale6];

  // Positions for surrounding cards (no index 0 — that's the center text)
  const positions = [
    '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]',
    '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[40vh] [&>div]:!w-[20vw]',
    '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]',
    '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]',
    '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]',
    '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]',
  ];

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Center title */}
        <motion.div
          style={{ scale: centerScale, opacity: centerOpacity }}
          className="absolute top-0 z-10 flex h-full w-full items-center justify-center"
        >
          {center}
        </motion.div>

        {/* Surrounding cards */}
        {children.map((child, index) => {
          const scale = scales[index % scales.length];
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className={`absolute top-0 flex h-full w-full items-center justify-center ${positions[index] || ''}`}
            >
              <div className="relative h-[25vh] w-[25vw]">
                {child}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
