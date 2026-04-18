import { motion } from 'framer-motion';
import { about, awards } from '../data/resume';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">

      <div className="pointer-events-none absolute inset-0 halftone opacity-40" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header — comic strip style */}
        <motion.div {...fadeUp(0)} className="mb-14 flex items-center gap-5">
          <div className="panel-number text-3xl" style={{ width: 52, height: 52, fontSize: 28 }}>
            ★
          </div>
          <div>
            <h2 className="font-comic text-5xl text-comic-orange tracking-comic"
                style={{ textShadow: '3px 3px 0 #000' }}>
              ABOUT ME
            </h2>
            <p className="section-subheading">The person behind the commits.</p>
          </div>
        </motion.div>

        {/* ── Comic panel layout ── */}
        <div className="grid lg:grid-cols-5 gap-6 items-start">

          {/* Photo panel */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-2">
            <div className="relative">
              {/* Main photo panel */}
              <div className="w-full rounded-sm overflow-hidden
                              bg-gradient-to-br from-[#1a0a00] to-[#2d1200]
                              flex items-center justify-center halftone"
                   style={{
                     height: 320,
                     border: '4px solid #ff6500',
                     boxShadow: '7px 7px 0 #ff6500',
                   }}>
                {/* Replace with <img src="/photo.jpg" className="w-full h-full object-cover" /> */}
                <span className="font-comic text-7xl text-comic-orange/30 select-none"
                      style={{ textShadow: '4px 4px 0 #000' }}>
                  HT
                </span>
              </div>

              {/* Awards floating panel */}
              <motion.div
                {...fadeUp(0.2)}
                className="absolute -bottom-5 -right-5 panel-yellow p-4 max-w-[170px]"
                style={{ boxShadow: '4px 4px 0 #ffd600' }}>
                <p className="font-comic text-comic-yellow text-sm tracking-comic mb-2">
                  🏆 AWARDS
                </p>
                {awards.map((a, i) => (
                  <p key={i} className="text-[11px] text-[#f5ede0]/70 leading-snug">
                    {a}
                  </p>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Bio + highlights panel */}
          <div className="lg:col-span-3 flex flex-col gap-5">

            {/* Speech-bubble style bio */}
            <motion.div {...fadeUp(0.15)}>
              <div className="panel p-6 relative" style={{ borderRadius: '4px 4px 4px 0' }}>
                {/* "HELLO!" starburst */}
                <div className="absolute -top-5 -right-4 starburst text-sm z-10"
                     style={{ width: 60, height: 60 }}>
                  HELLO!
                </div>
                <p className="text-[#f5ede0]/80 leading-relaxed text-sm">
                  {about.bio}
                </p>
              </div>
              {/* Bubble tail */}
              <div className="ml-8"
                   style={{
                     width: 0, height: 0,
                     borderLeft: '20px solid transparent',
                     borderRight: '20px solid transparent',
                     borderTop: '18px solid #ff6500',
                   }} />
            </motion.div>

            {/* Highlights as comic tags */}
            <motion.div {...fadeUp(0.2)} className="flex flex-wrap gap-2 pl-2">
              {about.highlights.map((h, i) => (
                <span key={i}
                  className={i % 2 === 0 ? 'comic-tag' : 'comic-tag-outline'}>
                  {h}
                </span>
              ))}
            </motion.div>

            {/* Stats strip — comic panels */}
            <motion.div {...fadeUp(0.25)} className="grid grid-cols-3 gap-3">
              {[
                { value: '2.5+', label: 'Yrs at Wells Fargo' },
                { value: '99%',  label: 'SLA Compliance'     },
                { value: '20+',  label: 'Prod Deployments'   },
              ].map((s, i) => (
                <div key={i} className="panel p-4 text-center"
                     style={{ boxShadow: `${3 + i}px ${3 + i}px 0 #ff6500` }}>
                  <p className="font-comic text-2xl text-comic-yellow tracking-comic">
                    {s.value}
                  </p>
                  <p className="text-[10px] text-[#f5ede0]/50 mt-1 uppercase tracking-widest">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
