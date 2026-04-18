import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { profile, stats } from '../data/resume';
import StarBackground from './StarBackground';

const Spline = lazy(() => import('@splinetool/react-spline'));

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeLeft = (delay = 0) => ({
  initial:    { opacity: 0, x: -32 },
  animate:    { opacity: 1, x: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

/* Neutral icon button — no orange */
const IconBtn = ({ href, target, children }) => (
  <a href={href} target={target} rel="noreferrer"
     style={{
       width: 34, height: 34, borderRadius: 8,
       display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
       border: '1px solid rgba(255,255,255,0.18)',
       color: 'rgba(255,255,255,0.55)',
       transition: 'all 0.15s',
     }}
     onMouseEnter={e => {
       e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
       e.currentTarget.style.color = '#fff';
     }}
     onMouseLeave={e => {
       e.currentTarget.style.background = 'transparent';
       e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
     }}>
    {children}
  </a>
);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center
                        pt-24 pb-16 px-6 overflow-hidden">

      {/* Stars */}
      <StarBackground />

      {/* Very faint halftone — doesn't kill stars */}
      <div className="pointer-events-none absolute inset-0 halftone opacity-15"
           style={{ zIndex: 1 }} />

      {/* ── Bottom gradient — fades hero dark into About's forest green ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0"
           style={{
             zIndex: 2,
             height: 380,
             background: 'linear-gradient(to top, #020c04 0%, rgba(2,12,4,0) 100%)',
           }} />

      {/* ── Main layout ── */}
      <div className="relative max-w-6xl mx-auto w-full
                      grid grid-cols-1 lg:grid-cols-5 gap-10 items-center"
           style={{ zIndex: 10 }}>

        {/* ── LEFT — profile card ── */}
        <motion.div className="lg:col-span-2" {...fadeLeft(0.1)}>
          <div style={{
            background: 'rgba(10,10,12,0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 20,
            boxShadow: '0 8px 48px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            backdropFilter: 'blur(4px)',
          }}>

            {/* Spline scene */}
            <div style={{ height: 300, background: 'rgba(6,6,8,0.8)', position: 'relative' }}>
              <Suspense fallback={
                <div style={{ height: 300 }}
                     className="flex flex-col items-center justify-center gap-3">
                  <div className="w-7 h-7 rounded-full border-2 border-white/30
                                  border-t-white/80 animate-spin" />
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13 }}>Loading...</span>
                </div>
              }>
                <Spline
                  scene={profile.splineScene}
                  style={{ width: '100%', height: '300px', display: 'block' }}
                />
              </Suspense>

              {/* Availability badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5"
                   style={{
                     background: 'rgba(6,6,8,0.8)',
                     border: '1px solid rgba(255,255,255,0.14)',
                     borderRadius: 100,
                     backdropFilter: 'blur(8px)',
                   }}>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>
                  Available
                </span>
              </div>
            </div>

            {/* Card info */}
            <div className="px-6 py-5 flex flex-col gap-3"
                 style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <div>
                <h2 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: '1.15rem',
                  color: 'rgba(255,255,255,0.9)', letterSpacing: '-0.01em',
                }}>
                  {profile.name}
                </h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 3 }}>
                  Senior Software Engineer
                </p>
              </div>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
                MS CS @ Northeastern · Distributed Systems · AI Tooling
              </p>
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
              <div className="flex items-center gap-2 pt-1">
                <IconBtn href={profile.github} target="_blank">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </IconBtn>
                <IconBtn href={profile.linkedin} target="_blank">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </IconBtn>
                <IconBtn href={`mailto:${profile.email}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </IconBtn>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── RIGHT — hero text ── */}
        <div className="lg:col-span-3 flex flex-col gap-6">

          {/* Availability pill — neutral */}
          <motion.div {...fadeUp(0.15)}>
            <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5"
                  style={{
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: 'rgba(255,255,255,0.5)',
                    borderRadius: 100,
                    background: 'rgba(255,255,255,0.04)',
                  }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {profile.availability}
            </span>
          </motion.div>

          {/* Name — white, no colour */}
          <motion.div {...fadeUp(0.2)}>
            <h1 style={{
              fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
            }}>
              HARINI
            </h1>
            <h1 style={{
              fontSize: 'clamp(1.4rem, 3.8vw, 3rem)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              THIRUNAVUKKARASAN
            </h1>
          </motion.div>

          {/* Role — very dim */}
          <motion.div {...fadeUp(0.26)}>
            <h2 style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              color: 'rgba(255,255,255,0.28)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}>
              Software Engineer
            </h2>
          </motion.div>

          {/* Tagline */}
          <motion.p {...fadeUp(0.31)}
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: 15, lineHeight: 1.7, maxWidth: 420,
              borderLeft: '2px solid rgba(255,255,255,0.15)',
              paddingLeft: 16,
            }}>
            {profile.subTagline}
          </motion.p>

          {/* CTAs — neutral */}
          <motion.div {...fadeUp(0.36)} className="flex flex-wrap gap-3">
            <a href="#projects"
               style={{
                 fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                 fontSize: 14, padding: '10px 26px', borderRadius: 6,
                 background: 'rgba(255,255,255,0.92)', color: '#0a0a0a',
                 border: '1px solid transparent',
                 display: 'inline-flex', alignItems: 'center', gap: 6,
                 transition: 'opacity 0.15s',
               }}
               onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
               onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              ⚡ See My Work
            </a>
            <a href="#chat"
               style={{
                 fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600,
                 fontSize: 14, padding: '10px 26px', borderRadius: 6,
                 background: 'transparent',
                 color: 'rgba(255,255,255,0.65)',
                 border: '1px solid rgba(255,255,255,0.22)',
                 display: 'inline-flex', alignItems: 'center', gap: 6,
                 transition: 'all 0.15s',
               }}
               onMouseEnter={e => {
                 e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                 e.currentTarget.style.color = '#fff';
               }}
               onMouseLeave={e => {
                 e.currentTarget.style.background = 'transparent';
                 e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
               }}>
              💬 Chat With My AI
            </a>
          </motion.div>

          {/* Stats — neutral */}
          <motion.div {...fadeUp(0.42)}
            className="grid grid-cols-3 gap-4 pt-6"
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {stats.map(s => (
              <div key={s.label} className="flex flex-col gap-1">
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  color: 'rgba(255,255,255,0.88)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}>
                  {s.value}
                </span>
                <span style={{
                  fontSize: 10, textTransform: 'uppercase',
                  letterSpacing: '0.08em', color: 'rgba(255,255,255,0.3)',
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
