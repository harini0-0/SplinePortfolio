import { motion } from 'framer-motion';
import { techStack } from '../data/resume';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

// Cycle through accent colors per category
const accents = ['#ff6500', '#ffd600', '#ff8c00', '#ff6500', '#ffd600', '#ff8c00', '#ff6500'];

export default function TechStack() {
  return (
    <section id="stack" className="relative py-24 px-6 overflow-hidden">

      <div className="pointer-events-none absolute inset-0 scene-techstack" />
      <div className="pointer-events-none absolute inset-0 halftone-yellow opacity-25" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-14 flex items-center gap-5">
          <div className="panel-number">⚡</div>
          <div>
            <h2 className="font-comic text-5xl text-comic-yellow tracking-comic"
                style={{ textShadow: '3px 3px 0 #000' }}>
              SUPER POWERS
            </h2>
            <p className="section-subheading mt-1">
              Tools and technologies used in production.
            </p>
          </div>
        </motion.div>

        {/* Comic category panels */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {techStack.map((group, i) => {
            const accent = accents[i % accents.length];
            return (
              <motion.div
                key={group.category}
                {...fadeUp(i * 0.07)}
                className="flex flex-col"
                style={{
                  background: '#120700',
                  border: `3px solid ${accent}`,
                  boxShadow: `5px 5px 0 ${accent}`,
                  borderRadius: 4,
                }}>

                {/* Category header bar */}
                <div className="px-4 py-2 border-b-2"
                     style={{ borderColor: `${accent}50`, background: `${accent}15` }}>
                  <h3 className="font-comic tracking-comic text-base"
                      style={{ color: accent }}>
                    {group.category.toUpperCase()}
                  </h3>
                </div>

                {/* Skill tags */}
                <div className="p-4 flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: i * 0.04 + j * 0.03 }}
                      className="text-[11px] font-semibold uppercase px-2 py-1 cursor-default
                                 transition-all duration-150 hover:-translate-y-0.5"
                      style={{
                        border: `2px solid ${accent}55`,
                        color: '#f5ede0',
                        borderRadius: 2,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = accent;
                        e.currentTarget.style.color = '#000';
                        e.currentTarget.style.borderColor = accent;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#f5ede0';
                        e.currentTarget.style.borderColor = `${accent}55`;
                      }}>
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
