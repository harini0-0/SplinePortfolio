import { motion } from 'framer-motion';
import { experience, education } from '../data/resume';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});


export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6 overflow-hidden">

      <div className="pointer-events-none absolute inset-0 scene-experience" />
      <div className="pointer-events-none absolute inset-0 halftone opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-16 flex items-center gap-5">
          <div className="panel-number text-2xl">EX</div>
          <div>
            <h2 className="font-comic text-5xl text-comic-orange tracking-comic"
                style={{ textShadow: '3px 3px 0 #000' }}>
              THE STORY SO FAR
            </h2>
            <p className="section-subheading">Work experience — panel by panel.</p>
          </div>
        </motion.div>

        {/* ── Comic strip timeline ── */}
        <div className="flex flex-col gap-8 mb-20">
          {experience.map((exp, i) => (
            <motion.div key={exp.id} {...fadeUp(i * 0.12)}>

              {/* Panel connector line */}
              {i > 0 && (
                <div className="flex justify-center mb-8">
                  <div className="flex flex-col items-center gap-1">
                    {[0,1,2].map(d => (
                      <div key={d} className="w-1 h-3 bg-comic-orange/40 rounded-full" />
                    ))}
                    <div className="font-comic text-comic-orange/40 text-xs tracking-comic">
                      NEXT SCENE
                    </div>
                    {[0,1,2].map(d => (
                      <div key={d} className="w-1 h-3 bg-comic-orange/40 rounded-full" />
                    ))}
                  </div>
                </div>
              )}

              {/* Experience panel */}
              <div className="relative panel"
                   style={{ boxShadow: '6px 6px 0 #ff6500' }}>

                {/* Panel number badge */}
                <div className="absolute -top-4 -left-4 z-10">
                  <div className="panel-number"
                       style={{ width: 44, height: 44, fontSize: 24 }}>
                    {i + 1}
                  </div>
                </div>

                {/* Orange header bar */}
                <div className="px-6 py-4 flex flex-col sm:flex-row sm:items-center
                                justify-between gap-3 border-b-2 border-comic-orange/40"
                     style={{ background: 'rgba(255,101,0,0.08)' }}>
                  <div>
                    <h3 className="font-comic text-2xl text-comic-cream tracking-comic">
                      {exp.role}
                    </h3>
                    <p className="font-comic text-comic-orange text-xl tracking-comic">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                    <span className="comic-tag-outline text-[11px]">{exp.duration}</span>
                    <span className="text-xs text-[#f5ede0]/40">{exp.location}</span>
                  </div>
                </div>

                {/* Bullet points — action items */}
                <div className="p-6 flex flex-col gap-3">
                  {exp.bullets.map((b, j) => (
                    <div key={j} className="flex items-start gap-3 text-sm
                                            text-[#f5ede0]/75 leading-relaxed">
                      <span className="font-comic text-comic-orange text-base mt-0.5 shrink-0">
                        ▶
                      </span>
                      {b}
                    </div>
                  ))}
                </div>

                {/* Stack tags */}
                <div className="px-6 pb-5 flex flex-wrap gap-2 pt-3
                                border-t-2 border-dashed border-comic-orange/20">
                  {exp.stack.map(s => (
                    <span key={s} className="comic-tag text-[10px]">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Education strip ── */}
        <motion.div {...fadeUp(0.1)}>
          <div className="mb-8 flex items-center gap-4">
            <div className="panel-number">EDU</div>
            <h3 className="font-comic text-3xl text-comic-yellow tracking-comic"
                style={{ textShadow: '2px 2px 0 #000' }}>
              ORIGIN STORY
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                className="panel-interactive"
                style={{ boxShadow: '5px 5px 0 #ffd600', borderColor: '#ffd600' }}
                {...fadeUp(0.12 + i * 0.1)}>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h4 className="font-comic text-xl text-comic-cream tracking-comic leading-snug">
                        {edu.degree}
                      </h4>
                      <p className="font-comic text-comic-yellow text-lg tracking-comic mt-0.5">
                        {edu.school}
                      </p>
                      <p className="text-xs text-[#f5ede0]/40 mt-1">{edu.location}</p>
                    </div>
                    <span className="comic-tag-yellow text-[10px] shrink-0">{edu.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3
                                  border-t border-dashed border-comic-yellow/20">
                    {edu.courses.map(c => (
                      <span key={c} className="text-[10px] border border-comic-yellow/40
                                               text-comic-yellow/70 px-2 py-0.5 rounded-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
