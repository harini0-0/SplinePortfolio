import { motion } from 'framer-motion';
import { profile, stats } from '../data/resume';
import StarBackground from './StarBackground';

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center
                        pt-24 pb-16 px-6 overflow-hidden">

      {/* ── Starry night sky canvas ── */}
      <StarBackground />

      {/* Very faint halftone — stays for comic texture, doesn't block stars */}
      <div className="pointer-events-none absolute inset-0 halftone opacity-25" style={{ zIndex: 1 }} />

      {/* Subtle warm glow blobs */}
      <div className="pointer-events-none absolute top-[-10%] right-[-5%]
                      w-[500px] h-[500px] rounded-full blur-[120px]
                      bg-comic-orange/8" style={{ zIndex: 1 }} />
      <div className="pointer-events-none absolute bottom-[-5%] left-[-5%]
                      w-[380px] h-[380px] rounded-full blur-[100px]
                      bg-comic-yellow/6" style={{ zIndex: 1 }} />

      {/* Bottom gradient — stars fade into the next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48"
           style={{ zIndex: 1, background: 'linear-gradient(to top, #080400 0%, transparent 100%)' }} />

      {/* ── Main content ── */}
      <div className="relative max-w-4xl mx-auto w-full flex flex-col items-center
                      text-center gap-7" style={{ zIndex: 10 }}>

        {/* Availability badge */}
        <motion.div {...fadeUp(0)}>
          <span className="inline-flex items-center gap-2 comic-tag-outline text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-comic-orange animate-pulse" />
            {profile.availability}
          </span>
        </motion.div>

        {/* "HI, I'M" */}
        <motion.p {...fadeUp(0.07)}
          className="font-comic text-comic-cream/55 text-2xl tracking-comic -mb-4">
          HI, I'M
        </motion.p>

        {/* Giant name */}
        <motion.div {...fadeUp(0.13)}>
          <h1 className="font-comic leading-none tracking-comic"
              style={{ fontSize: 'clamp(4rem, 11vw, 8rem)', color: '#ff6500',
                       textShadow: '5px 5px 0 #000, 8px 8px 0 rgba(255,101,0,0.25)' }}>
            HARINI
          </h1>
          <h1 className="font-comic leading-none tracking-comic"
              style={{ fontSize: 'clamp(1.5rem, 4.5vw, 3.5rem)', color: '#f5ede0',
                       textShadow: '3px 3px 0 #000' }}>
            THIRUNAVUKKARASAN
          </h1>
        </motion.div>

        {/* Role badges */}
        <motion.div {...fadeUp(0.2)} className="flex flex-wrap justify-center gap-2">
          <span className="comic-tag">Senior SWE</span>
          <span className="comic-tag-yellow">MS CS @ Northeastern</span>
          <span className="comic-tag-outline">Distributed Systems</span>
        </motion.div>

        {/* Tagline */}
        <motion.p {...fadeUp(0.26)}
          className="text-[#f5ede0]/65 text-base leading-relaxed max-w-xl
                     border-l-4 border-comic-orange pl-4 italic text-left">
          {profile.subTagline}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.31)} className="flex flex-wrap justify-center gap-3">
          <a href="#projects" className="btn-comic">
            ⚡ See My Work
          </a>
          <a href="#chat" className="btn-comic-outline">
            💬 Chat With My AI
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div {...fadeUp(0.37)}
          className="grid grid-cols-3 gap-4 w-full max-w-lg mt-2 pt-6
                     border-t-2 border-dashed border-comic-orange/30">
          {stats.map(s => (
            <div key={s.label}
              className="panel p-4 text-center"
              style={{ boxShadow: '3px 3px 0 #ff6500' }}>
              <p className="font-comic text-3xl text-comic-orange tracking-comic">
                {s.value}
              </p>
              <p className="text-[10px] text-[#f5ede0]/50 mt-1 uppercase tracking-widest">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Social icons */}
        <motion.div {...fadeUp(0.42)} className="flex items-center gap-2">
          <a href={profile.github} target="_blank" rel="noreferrer" className="btn-icon-comic">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-icon-comic">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href={`mailto:${profile.email}`} className="btn-icon-comic">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
