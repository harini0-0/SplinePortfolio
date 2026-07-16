import { motion } from 'framer-motion';
import { experience, education } from '../data/resume';
import AmbientParticles from './AmbientParticles';

const BG   = '#040D12';
const CARD = 'rgba(8, 22, 30, 0.82)';
const TEAL = '#4F9B93';
const TEXT = '#E0EDF4';
const DIM  = 'rgba(224,237,244,0.52)';
const FAINT= 'rgba(224,237,244,0.28)';

const card = {
  background:  CARD,
  borderRadius: 14,
  boxShadow:   'inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 48px rgba(0,0,0,0.5)',
  overflow:    'hidden',
};

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6 overflow-hidden"
             style={{ background: BG }}>
      <AmbientParticles />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: TEAL,
                      textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>
            02 / Experience
          </p>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                       color: TEXT, letterSpacing: '-0.03em', lineHeight: 1 }}>
            Where I've worked
          </h2>
          <p style={{ fontSize: 15, color: DIM, marginTop: 10 }}>
            A timeline of roles, projects, and things shipped in production.
          </p>
        </motion.div>

        {/* Experience cards */}
        <div className="flex flex-col gap-5 mb-20">
          {experience.map((exp, i) => (
            <motion.div key={exp.id} {...fadeUp(i * 0.1)}>
              <div style={card}>
                <div className="flex">
                  {/* Teal left accent bar */}
                  <div style={{
                    width: 3, flexShrink: 0,
                    background: i === 0
                      ? `linear-gradient(to bottom, ${TEAL}, rgba(79,155,147,0.15))`
                      : 'rgba(79,155,147,0.22)',
                  }} />

                  <div style={{ flex: 1, padding: '24px 28px' }}>
                    {/* Role + meta row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                      <div>
                        <h3 style={{ fontWeight: 700, fontSize: '1.25rem',
                                     color: TEXT, letterSpacing: '-0.01em', marginBottom: 4 }}>
                          {exp.role}
                        </h3>
                        <p style={{ fontWeight: 500, fontSize: 15, color: TEAL }}>{exp.company}</p>
                      </div>
                      <div className="shrink-0 sm:text-right">
                        <p style={{ fontSize: 12, color: DIM, fontWeight: 500 }}>{exp.duration}</p>
                        <p style={{ fontSize: 11, color: FAINT, marginTop: 3 }}>{exp.location}</p>
                      </div>
                    </div>

                    {/* Bullets */}
                    <div className="flex flex-col gap-2.5 mb-5">
                      {exp.bullets.map((b, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <div style={{
                            width: 4, height: 4, borderRadius: '50%',
                            background: TEAL, opacity: 0.6, flexShrink: 0, marginTop: 7,
                          }} />
                          <p style={{ fontSize: 14.5, color: DIM, lineHeight: 1.7 }}>{b}</p>
                        </div>
                      ))}
                    </div>

                    {/* Stack pills */}
                    <div className="flex flex-wrap gap-1.5"
                         style={{ paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      {exp.stack.map(s => (
                        <span key={s} style={{
                          fontSize: 11, fontWeight: 500, padding: '3px 10px',
                          border: '1px solid rgba(79,155,147,0.18)',
                          color: 'rgba(224,237,244,0.45)', borderRadius: 20,
                        }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div {...fadeUp(0.1)}>
          <p style={{ fontSize: 11, fontWeight: 500, color: TEAL,
                      textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>
            Education
          </p>
          <h3 style={{ fontWeight: 700, fontSize: '2rem',
                       color: TEXT, letterSpacing: '-0.02em', marginBottom: 28 }}>
            Academic background
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {education.map((edu, i) => (
              <motion.div key={edu.id} {...fadeUp(0.12 + i * 0.08)}>
                <div style={{ ...card, padding: '22px 24px' }}>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '0.95rem',
                                   color: TEXT, letterSpacing: '-0.01em', marginBottom: 4 }}>
                        {edu.degree}
                      </h4>
                      <p style={{ fontSize: 13, color: TEAL, fontWeight: 500 }}>{edu.school}</p>
                      <p style={{ fontSize: 11, color: FAINT, marginTop: 3 }}>{edu.location}</p>
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 500, padding: '3px 10px',
                      background: 'rgba(79,155,147,0.08)',
                      border: '1px solid rgba(79,155,147,0.2)',
                      color: TEAL, borderRadius: 20, flexShrink: 0, whiteSpace: 'nowrap',
                    }}>{edu.duration}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5"
                       style={{ paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {edu.courses.map(c => (
                      <span key={c} style={{
                        fontSize: 11, color: FAINT, padding: '2px 10px',
                        border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20,
                      }}>{c}</span>
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
