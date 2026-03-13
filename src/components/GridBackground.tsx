import { motion, useScroll, useTransform } from 'framer-motion';

export function GridBackground() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 3000], [0, -900]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <motion.div className="bg-grid h-[200%] w-full opacity-100" style={{ y }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-950/50 to-surface-950" />
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </motion.div>
  );
}
