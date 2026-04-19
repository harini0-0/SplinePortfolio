import { motion } from 'framer-motion';
import { about } from '../data/resume';
import ForestFireflies from './ForestFireflies';

const G = {
  accent:  '#4F9B93',
  light:   '#7EC8C0',
  text:    '#E0EDF4',
  textDim: 'rgba(224,237,244,0.6)',
};

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden">

      {/* ── Forest background image — exactly like the reference ── */}
      <img
        src="/forest-bg.jpeg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Dark overlay for text legibility */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'rgba(12,23,35,0.65)',
      }} />

      {/* Fireflies canvas */}
      <ForestFireflies />

      {/* Content */}
      <div className="relative max-w-5xl mx-auto" style={{ zIndex: 10 }}>

        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-14 flex items-center gap-5">
          <div style={{
            width: 48, height: 48,
            background: G.accent, color: '#000',
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: 22,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #000', boxShadow: '3px 3px 0 #000',
            borderRadius: 4, flexShrink: 0,
          }}>AB</div>
          <div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: G.light,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              ABOUT ME
            </h2>
            <p style={{ color: G.textDim, fontSize: 14, marginTop: 6 }}>
              The person behind the commits.
            </p>
          </div>
        </motion.div>

        {/* ── Content ── */}
        <div className="max-w-3xl flex flex-col gap-8">

          {/* Bio card */}
          <motion.div {...fadeUp(0.1)}>
            <div style={{
              background: 'rgba(12,23,35,0.72)',
              border: `1px solid rgba(79,155,147,0.28)`,
              borderRadius: 12,
              padding: '28px 32px',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 32px rgba(0,0,0,0.25)',
            }}>
              <div style={{ width: 32, height: 2, background: G.accent,
                            borderRadius: 2, marginBottom: 16 }} />
              <p style={{ color: G.text, fontSize: 16, lineHeight: 1.8, fontWeight: 400 }}>
                {about.shortBio}
              </p>
            </div>
          </motion.div>

          {/* Highlights — clean list style */}
          <motion.div {...fadeUp(0.2)}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0',
            }}>
              {about.highlights.map((h, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 0',
                  borderBottom: `1px solid rgba(79,155,147,0.1)`,
                  paddingRight: 16,
                }}>
                  <span style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: G.accent, flexShrink: 0,
                  }} />
                  <span style={{
                    fontSize: 13, color: G.textDim, lineHeight: 1.4,
                  }}>
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Top gradient — continues Hero's green fade seamlessly */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 200, zIndex: 3, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #0C1723, rgba(12,23,35,0))',
      }} />

      {/* Bottom gradient — fades forest green into Experience's reddish dark */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 240, zIndex: 3, pointerEvents: 'none',
        background: 'linear-gradient(to top, #0D1F2E, rgba(12,23,35,0))',
      }} />
    </section>
  );
}
