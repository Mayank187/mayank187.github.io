import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { experiences } from '../data/experience';
import {
  stagger, fadeLeft, fadeUp, fadeLeftWithStagger, tagPop, viewport,
} from '../data/animations';

export function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 60%'],
  });

  // Timeline line draws from scaleY 0 → 1 as you scroll through the section
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Opacity fades in quickly at the start
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <section id="experience" className="relative px-4 py-24 md:px-6">
      <div className="mx-auto max-w-4xl">
        <SectionHeading prefix="02" title="Experience" id="experience-heading" />

        <div ref={sectionRef} className="relative">
          {/* Scroll-linked timeline line */}
          <motion.div
            className="absolute left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-brand-400 via-brand-400/50 to-brand-400/20 md:left-6 md:block"
            style={{ scaleY: lineScaleY, opacity: lineOpacity }}
          />

          <motion.div
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="space-y-8"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={fadeLeftWithStagger(0.04)}
                className="relative md:pl-16"
              >
                {/* Timeline dot — springs in when scroll reaches it */}
                <TimelineDot index={index} total={experiences.length} scrollProgress={scrollYProgress} />

                <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-slate-700">
                  <motion.div variants={fadeLeft} className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-slate-100">{exp.role}</h3>
                      <p className="font-mono text-sm text-brand-400">{exp.company}</p>
                    </div>
                    <span className="rounded bg-slate-800 px-2 py-1 font-mono text-xs text-slate-400">
                      {exp.duration}
                    </span>
                  </motion.div>

                  <motion.p variants={fadeUp} className="mb-3 text-sm text-slate-400">
                    {exp.summary}
                  </motion.p>

                  <motion.ul variants={fadeUp} className="mb-4 space-y-1.5">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-brand-400/60" />
                        {b}
                      </li>
                    ))}
                  </motion.ul>

                  <motion.div variants={stagger(0.03)} className="flex flex-wrap gap-1.5">
                    {exp.tags.map((t) => (
                      <motion.span
                        key={t}
                        variants={tagPop}
                        className="rounded border border-slate-700/50 bg-slate-800/50 px-2 py-0.5 font-mono text-xs text-slate-500"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/** Dot that pulses into view when the scroll-linked line reaches its position */
function TimelineDot({
  index,
  total,
  scrollProgress,
}: {
  index: number;
  total: number;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  // Each dot appears when the line has progressed past its relative position
  const threshold = total > 1 ? index / (total - 1) : 0;
  const dotScale = useTransform(scrollProgress, [Math.max(0, threshold - 0.05), threshold], [0, 1]);
  const dotOpacity = useTransform(scrollProgress, [Math.max(0, threshold - 0.05), threshold], [0, 1]);

  return (
    <motion.div
      className="absolute left-2.5 top-2 hidden h-3 w-3 rounded-full border-2 border-brand-400 bg-slate-950 md:left-4.5 md:block"
      style={{ scale: dotScale, opacity: dotOpacity }}
    />
  );
}
