import { motion } from 'framer-motion';
import { about } from '../data/resume';
import ForestFireflies from './ForestFireflies';

const G = {
  accent:  '#22c55e',
  light:   '#4ade80',
  text:    '#d1fae5',
  textDim: 'rgba(209,250,233,0.6)',
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
        background: 'rgba(2,8,4,0.62)',
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
          }}>★</div>
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

        {/* ── Content grid ── */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Left — bio + highlights */}
          <div className="lg:col-span-3 flex flex-col gap-6">

            <motion.div {...fadeUp(0.1)}>
              <div style={{
                background: 'rgba(2,10,4,0.75)',
                border: `1.5px solid rgba(34,197,94,0.35)`,
                borderRadius: 12,
                padding: '24px 28px',
                backdropFilter: 'blur(6px)',
                boxShadow: '0 0 28px rgba(34,197,94,0.06)',
              }}>
                <div style={{ width: 36, height: 3, background: G.accent,
                              borderRadius: 2, marginBottom: 14 }} />
                <p style={{ color: G.text, fontSize: 15, lineHeight: 1.75, opacity: 0.9 }}>
                  {about.shortBio}
                </p>
              </div>
            </motion.div>

            <motion.div {...fadeUp(0.18)} className="flex flex-wrap gap-2">
              {about.highlights.map((h, i) => (
                <span key={i} style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600, fontSize: 11,
                  padding: '3px 12px', borderRadius: 3,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  backdropFilter: 'blur(4px)',
                  ...(i % 2 === 0
                    ? { background: G.accent, color: '#000' }
                    : { border: `1.5px solid rgba(34,197,94,0.6)`, color: G.accent, background: 'rgba(34,197,94,0.07)' }
                  ),
                }}>
                  {h}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — stats + awards */}
          <motion.div {...fadeUp(0.22)} className="lg:col-span-2 flex flex-col gap-4">

            {[
              { value: '2.5+', label: 'Years at Wells Fargo' },
              { value: '99%',  label: 'SLA Compliance'       },
              { value: '20+',  label: 'Prod Deployments'     },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'rgba(2,10,4,0.75)',
                border: `1.5px solid rgba(34,197,94,0.28)`,
                borderRadius: 10, padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: 16,
                backdropFilter: 'blur(6px)',
              }}>
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: '2rem',
                  color: G.light, letterSpacing: '-0.02em',
                  lineHeight: 1, flexShrink: 0, minWidth: 60,
                }}>
                  {s.value}
                </span>
                <span style={{
                  fontSize: 11, color: G.textDim,
                  textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500,
                }}>
                  {s.label}
                </span>
              </div>
            ))}

            <div style={{
              background: 'rgba(2,10,4,0.75)',
              border: `1.5px solid rgba(34,197,94,0.28)`,
              borderRadius: 10, padding: '18px 20px',
              backdropFilter: 'blur(6px)',
            }}>
              <p style={{ color: G.light, fontWeight: 600, fontSize: 11,
                          textTransform: 'uppercase', letterSpacing: '0.07em',
                          marginBottom: 10 }}>
                🏆 Recognition
              </p>
              {[
                'Manager & Team Spotlight Award — Wells Fargo',
                'IEEE Published Researcher',
                'Azure Developer Associate Certified',
              ].map((a, i) => (
                <p key={i} style={{ color: G.textDim, fontSize: 12,
                                    lineHeight: 1.6, marginBottom: i < 2 ? 6 : 0 }}>
                  {a}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Top gradient — continues Hero's green fade seamlessly */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 200, zIndex: 3, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, #020c04, rgba(2,12,4,0))',
      }} />

      {/* Bottom gradient — fades forest green into Experience's reddish dark */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 240, zIndex: 3, pointerEvents: 'none',
        background: 'linear-gradient(to top, #0f0400, rgba(2,12,4,0))',
      }} />
    </section>
  );
}
