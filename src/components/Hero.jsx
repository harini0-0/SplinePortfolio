import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { profile, stats } from '../data/resume';

const Spline = lazy(() => import('@splinetool/react-spline'));

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

// Decorative sparkle
const Star = ({ size = 20, color = '#ffd600', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={style}>
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 px-6 overflow-hidden">

      {/* ── Halftone + action-lines background ── */}
      <div className="pointer-events-none absolute inset-0 halftone opacity-70" />
      <div className="pointer-events-none absolute inset-0 action-lines opacity-60" />

      {/* Glow blobs */}
      <div className="pointer-events-none absolute top-[-10%] right-[-5%]
                      w-[500px] h-[500px] rounded-full blur-[100px]
                      bg-comic-orange/10" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[-5%]
                      w-[380px] h-[380px] rounded-full blur-[100px]
                      bg-comic-yellow/8" />

      {/* Floating sparkles */}
      <Star size={28} color="#ffd600" style={{ position:'absolute', top:'18%', left:'8%',  opacity:0.7 }} />
      <Star size={18} color="#ff6500" style={{ position:'absolute', top:'30%', left:'45%', opacity:0.5 }} />
      <Star size={22} color="#ffd600" style={{ position:'absolute', bottom:'22%', right:'6%', opacity:0.6 }} />
      <Star size={14} color="#ff6500" style={{ position:'absolute', bottom:'35%', left:'55%', opacity:0.4 }} />

      <div className="relative z-10 max-w-6xl mx-auto w-full
                      grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">

        {/* ── LEFT — Comic cover text (3 cols) ── */}
        <div className="lg:col-span-3 flex flex-col gap-6">

          {/* Availability — styled as a small speech bubble tag */}
          <motion.div {...fadeUp(0)}>
            <span className="inline-flex items-center gap-2 comic-tag-outline text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-comic-orange animate-pulse" />
              {profile.availability}
            </span>
          </motion.div>

          {/* "HI, I'M" in small Bangers */}
          <motion.div {...fadeUp(0.07)}>
            <p className="font-comic text-comic-cream/60 text-2xl tracking-comic">
              HI, I'M
            </p>
          </motion.div>

          {/* Giant name — comic book cover style */}
          <motion.div {...fadeUp(0.12)}>
            <h1 className="font-comic leading-none tracking-comic"
                style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)', color: '#ff6500',
                         textShadow: '4px 4px 0 #000, 6px 6px 0 rgba(255,101,0,0.3)' }}>
              HARINI
            </h1>
            <h1 className="font-comic leading-none tracking-comic"
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#f5ede0',
                         textShadow: '3px 3px 0 #000' }}>
              THIRUNAVUKKARASAN
            </h1>
          </motion.div>

          {/* Role badge */}
          <motion.div {...fadeUp(0.18)} className="flex flex-wrap gap-2">
            <span className="comic-tag">Senior SWE</span>
            <span className="comic-tag-yellow">MS CS @ Northeastern</span>
          </motion.div>

          {/* Tagline in italic body text */}
          <motion.p {...fadeUp(0.22)}
            className="text-[#f5ede0]/70 text-base leading-relaxed max-w-md
                       border-l-4 border-comic-orange pl-4 italic">
            {profile.subTagline}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.27)} className="flex flex-wrap gap-3 mt-2">
            <a href="#projects" className="btn-comic">
              ⚡ See My Work
            </a>
            <a href="#chat" className="btn-comic-outline">
              💬 Chat With My AI
            </a>
          </motion.div>

          {/* Stats — comic panel strip */}
          <motion.div {...fadeUp(0.32)}
            className="grid grid-cols-3 gap-3 mt-2 pt-6
                       border-t-2 border-dashed border-comic-orange/30">
            {stats.map(s => (
              <div key={s.label}
                className="panel p-4 text-center"
                style={{ boxShadow: '3px 3px 0 #ff6500' }}>
                <p className="font-comic text-3xl text-comic-orange tracking-comic">
                  {s.value}
                </p>
                <p className="text-[10px] text-[#f5ede0]/55 mt-1 uppercase tracking-widest">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT — Comic panel with Spline (2 cols) ── */}
        <motion.div
          className="lg:col-span-2 flex flex-col items-center gap-3"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>

          {/* Spline panel — thick orange comic border */}
          <div className="relative w-full">

            {/* "ISSUE #1" tag on top */}
            <div className="absolute -top-4 left-4 z-20">
              <span className="font-comic tracking-comic text-sm bg-comic-yellow text-black
                               px-3 py-0.5 border-2 border-black"
                    style={{ boxShadow: '2px 2px 0 #000' }}>
                ISSUE #1
              </span>
            </div>

            <div className="relative w-full rounded-sm overflow-hidden"
                 style={{
                   height: 380,
                   border: '4px solid #ff6500',
                   boxShadow: '8px 8px 0 #ff6500, 12px 12px 0 rgba(255,101,0,0.2)',
                   background: '#120700',
                 }}>
              <Suspense fallback={
                <div className="w-full h-full flex flex-col items-center justify-center
                                bg-comic-panel halftone gap-3">
                  <div className="font-comic text-comic-orange text-xl tracking-comic">
                    LOADING...
                  </div>
                  <div className="w-8 h-8 rounded-full border-3 border-comic-orange
                                  border-t-transparent animate-spin" />
                </div>
              }>
                <Spline
                  scene={profile.splineScene}
                  style={{ width: '100%', height: '380px', display: 'block' }}
                />
              </Suspense>

              {/* Photo inset — bottom right corner */}
              <div className="absolute bottom-3 right-3 z-10
                              w-[80px] h-[100px] overflow-hidden
                              bg-gradient-to-br from-[#1a0900] to-[#2a0e00]
                              flex items-center justify-center"
                   style={{ border: '3px solid #ffd600', boxShadow: '3px 3px 0 #000' }}>
                {/* Replace with: <img src="/photo.jpg" className="w-full h-full object-cover" /> */}
                <span className="font-comic text-xl text-comic-yellow select-none">HT</span>
              </div>
            </div>

            {/* Panel caption bar */}
            <div className="w-full py-2 px-4 flex items-center justify-between"
                 style={{ background: '#ff6500', border: '4px solid #ff6500',
                          borderTop: 'none', boxShadow: '8px 4px 0 rgba(255,101,0,0.3)' }}>
              <span className="font-comic text-black text-base tracking-comic">
                SENIOR SOFTWARE ENGINEER
              </span>
              <span className="font-comic text-black/70 text-sm tracking-comic">
                2025
              </span>
            </div>
          </div>

          {/* Social icons row */}
          <div className="flex gap-2 self-end mt-1">
            {[
              { href: profile.github, icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              )},
              { href: profile.linkedin, icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              )},
              { href: `mailto:${profile.email}`, icon: (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              )},
            ].map((s, i) => (
              <a key={i} href={s.href} target={i < 2 ? '_blank' : undefined}
                rel="noreferrer" className="btn-icon-comic">
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
