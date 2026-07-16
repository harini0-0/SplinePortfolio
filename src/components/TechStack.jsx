import { useState } from 'react';
import { motion } from 'framer-motion';
import { techStack } from '../data/resume';
import AmbientParticles from './AmbientParticles';

const BG   = '#040D12';
const CARD = 'rgba(8, 22, 30, 0.82)';
const TEAL = '#4F9B93';
const TEXT = '#E0EDF4';
const DIM  = 'rgba(224,237,244,0.52)';

const card = {
  background: CARD, borderRadius: 14,
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 48px rgba(0,0,0,0.5)',
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }, transition: { duration: 0.45, delay, ease: [0.22,1,0.36,1] },
});

function SkillPill({ skill }) {
  const [h, setH] = useState(false);
  return (
    <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontSize: 13.5, fontWeight: 500, padding: '5px 14px', borderRadius: 20,
        cursor: 'default', transition: 'all 0.15s',
        border: h ? '1px solid rgba(79,155,147,0.4)' : '1px solid rgba(255,255,255,0.08)',
        color:      h ? TEAL : DIM,
        background: h ? 'rgba(79,155,147,0.08)' : 'transparent',
      }}>{skill}</span>
  );
}

export default function TechStack() {
  return (
    <section id="stack" className="relative py-24 px-6 overflow-hidden" style={{ background: BG }}>
      <AmbientParticles />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div {...fadeUp(0)} style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>04 / Skills</p>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: TEXT, letterSpacing: '-0.03em', lineHeight: 1 }}>What I build with</h2>
          <p style={{ fontSize: 15, color: DIM, marginTop: 10 }}>Tools and technologies used in production.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techStack.map((group, i) => (
            <motion.div key={group.category} {...fadeUp(i * 0.06)}>
              <div style={{ ...card, padding: '20px 22px', height: '100%' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: TEAL, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(s => <SkillPill key={s} skill={s} />)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}