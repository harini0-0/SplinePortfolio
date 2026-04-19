import { useState } from 'react';
import { motion } from 'framer-motion';
import { techStack } from '../data/resume';

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

function SkillPill({ skill }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 12,
        fontWeight: 500,
        padding: '4px 12px',
        border: hovered ? '1px solid rgba(79,155,147,0.4)' : '1px solid rgba(255,255,255,0.1)',
        color: hovered ? '#4F9B93' : 'rgba(224,237,244,0.5)',
        background: hovered ? 'rgba(79,155,147,0.08)' : 'transparent',
        borderRadius: 20,
        cursor: 'default',
        transition: 'all 0.15s ease',
      }}
    >
      {skill}
    </span>
  );
}

export default function TechStack() {
  return (
    <section
      id="stack"
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
            04 / Skills
          </p>
          <h2 style={{
            fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            color: '#E0EDF4', letterSpacing: '-0.03em', lineHeight: 1,
          }}>
            What I build with
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(224,237,244,0.5)', marginTop: 10 }}>
            Tools and technologies used in production.
          </p>
        </motion.div>

        {/* Category cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {techStack.map((group, i) => (
            <motion.div
              key={group.category}
              {...fadeUp(i * 0.07)}
              style={{ ...cardStyle, padding: '20px 20px 20px' }}
            >
              {/* Category label */}
              <p style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#4F9B93',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 14,
              }}>
                {group.category}
              </p>

              {/* Skill pills */}
              <div className="flex flex-wrap" style={{ gap: 8 }}>
                {group.skills.map(skill => (
                  <SkillPill key={skill} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
