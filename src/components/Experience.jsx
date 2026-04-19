import { motion } from 'framer-motion';
import { experience, education } from '../data/resume';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

const cardStyle = {
  background:     'rgba(18, 6, 30, 0.7)',
  border:         '1px solid rgba(255,255,255,0.07)',
  borderRadius:   16,
  backdropFilter: 'blur(8px)',
  boxShadow:      '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)',
};

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 px-6"
      style={{ background: '#0C0016' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 56 }}>
          <p style={{
            fontSize: 11, fontWeight: 500, color: '#4F9B93',
            textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10,
          }}>
            02 / Experience
          </p>
          <h2 style={{
            fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            color: '#E0EDF4', letterSpacing: '-0.03em', lineHeight: 1,
          }}>
            Where I've worked
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(224,237,244,0.5)', marginTop: 10 }}>
            A timeline of roles, projects, and things shipped in production.
          </p>
        </motion.div>

        {/* Experience cards */}
        <div className="flex flex-col gap-6 mb-20">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              {...fadeUp(i * 0.12)}
              style={{ ...cardStyle, overflow: 'hidden' }}
            >
              <div className="flex">
                {/* Left accent bar */}
                <div style={{
                  width: 3,
                  background: i === 0 ? 'rgba(79,155,147,0.7)' : 'rgba(79,155,147,0.3)',
                  flexShrink: 0,
                }} />

                <div style={{ flex: 1, padding: '24px 24px 20px' }}>
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#E0EDF4', marginBottom: 4 }}>
                        {exp.role}
                      </h3>
                      <p style={{ fontWeight: 500, fontSize: 14, color: '#4F9B93' }}>
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                      <span style={{ fontSize: 12, color: 'rgba(224,237,244,0.5)' }}>
                        {exp.duration}
                      </span>
                      <span style={{ fontSize: 11, color: 'rgba(224,237,244,0.26)' }}>
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="flex flex-col" style={{ gap: 10, marginBottom: 20 }}>
                    {exp.bullets.map((b, j) => (
                      <div key={j} className="flex items-start" style={{ gap: 10 }}>
                        <div style={{
                          width: 4, height: 4, borderRadius: '50%',
                          background: '#4F9B93', flexShrink: 0, marginTop: 7,
                        }} />
                        <span style={{ fontSize: 13, color: 'rgba(224,237,244,0.5)', lineHeight: 1.6 }}>
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Stack chips */}
                  <div className="flex flex-wrap" style={{ gap: 6 }}>
                    {exp.stack.map(s => (
                      <span key={s} style={{
                        fontSize: 11,
                        padding: '3px 10px',
                        border: '1px solid rgba(79,155,147,0.2)',
                        color: 'rgba(224,237,244,0.45)',
                        borderRadius: 20,
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education sub-section */}
        <motion.div {...fadeUp(0.1)}>
          <div style={{ marginBottom: 32 }}>
            <p style={{
              fontSize: 11, fontWeight: 500, color: '#4F9B93',
              textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10,
            }}>
              Education
            </p>
            <h3 style={{
              fontWeight: 700, fontSize: '2rem',
              color: '#E0EDF4', letterSpacing: '-0.03em', lineHeight: 1,
            }}>
              Academic background
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                {...fadeUp(0.12 + i * 0.1)}
                style={cardStyle}
              >
                <div style={{ padding: '24px' }}>
                  <div className="flex items-start justify-between gap-3" style={{ marginBottom: 16 }}>
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '1rem', color: '#E0EDF4', lineHeight: 1.3, marginBottom: 6 }}>
                        {edu.degree}
                      </h4>
                      <p style={{ fontWeight: 500, fontSize: 14, color: '#4F9B93', marginBottom: 4 }}>
                        {edu.school}
                      </p>
                      <p style={{ fontSize: 12, color: 'rgba(224,237,244,0.26)' }}>
                        {edu.location}
                      </p>
                    </div>
                    <span style={{
                      fontSize: 11,
                      padding: '4px 10px',
                      border: '1px solid rgba(79,155,147,0.2)',
                      color: 'rgba(224,237,244,0.45)',
                      borderRadius: 20,
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                    }}>
                      {edu.duration}
                    </span>
                  </div>

                  <div className="flex flex-wrap" style={{ gap: 6, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {edu.courses.map(c => (
                      <span key={c} style={{
                        fontSize: 11,
                        padding: '3px 10px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(224,237,244,0.35)',
                        borderRadius: 20,
                      }}>
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
