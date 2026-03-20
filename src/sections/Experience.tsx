import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experiences } from '../data/experience';
import { stagger, fadeUp, tagPop } from '../data/animations';

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (timelineRef.current) {
      setHeight(timelineRef.current.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section id="experience" className="relative" ref={containerRef}>
      {/* Sticky heading that stays visible while scrolling through timeline */}
      <div className="sticky top-0 z-20 flex items-center gap-4 bg-gradient-to-b from-slate-950 via-slate-950/95 to-transparent px-4 pb-8 pt-20 md:px-6">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-4">
          <span className="font-mono text-sm text-brand-400">02.</span>
          <h2 className="text-2xl font-bold text-slate-100 md:text-3xl">Experience</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-700 to-transparent" />
        </div>
      </div>

      <div className="px-4 pb-24 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div ref={timelineRef} className="relative">
            {experiences.map((exp) => (
              <div key={exp.id} className="flex justify-start pt-10 md:pt-32 md:gap-10">
                {/* Sticky left column — company + duration */}
                <div className="sticky top-40 z-10 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
                  {/* Dot */}
                  <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950">
                    <div className="h-4 w-4 rounded-full border border-slate-700 bg-slate-800" />
                  </div>
                  {/* Company name — desktop only */}
                  <h3 className="hidden pl-20 text-xl font-bold text-slate-500 md:block md:text-3xl lg:text-4xl">
                    {exp.company.split('(')[0].trim()}
                  </h3>
                </div>

                {/* Right content column */}
                <div className="relative w-full pl-20 pr-4 md:pl-4">
                  {/* Company name — mobile only */}
                  <h3 className="mb-4 block text-2xl font-bold text-slate-500 md:hidden">
                    {exp.company.split('(')[0].trim()}
                  </h3>

                  {/* Card */}
                  <motion.div
                    variants={stagger(0.04)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-slate-700"
                  >
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base font-semibold text-slate-100">{exp.role}</h4>
                        <p className="font-mono text-sm text-brand-400">{exp.company}</p>
                      </div>
                      <span className="rounded bg-slate-800 px-2 py-1 font-mono text-xs text-slate-400">
                        {exp.duration}
                      </span>
                    </div>

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
                  </motion.div>
                </div>
              </div>
            ))}

            {/* Background track line */}
            <div
              style={{ height: height + 'px' }}
              className="absolute left-8 top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-slate-700 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
            >
              {/* Animated fill line */}
              <motion.div
                style={{ height: heightTransform, opacity: opacityTransform }}
                className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-brand-500 via-brand-400 to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
