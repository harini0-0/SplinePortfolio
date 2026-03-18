import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { profile, stats } from '../data/resume';

// Vite + React import — NOT the /next version
const Spline = lazy(() => import('@splinetool/react-spline'));

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col md:flex-row items-center
                 pt-24 pb-16 max-w-6xl mx-auto px-6 gap-8"
    >
      {/* ── Left: text content ── */}
      <div className="flex-1 flex flex-col gap-6 z-10">

        {/* Availability badge */}
        <motion.div {...fadeUp(0)}>
          <span className="neu-pill text-indigo-500 font-semibold inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 inline-block animate-pulse" />
            {profile.availability}
          </span>
        </motion.div>

        {/* Name + tagline */}
        <motion.div {...fadeUp(0.1)}>
          <h1 className="text-5xl font-bold leading-tight text-gray-800 dark:text-gray-100">
            Hi, I'm <br />
            <span className="text-indigo-500">{profile.name}</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 mt-4 max-w-md leading-relaxed">
            {profile.tagline}
          </p>
          <p className="text-base text-gray-400 dark:text-gray-500 mt-2 max-w-md">
            {profile.subTagline}
          </p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap gap-4"
          {...fadeUp(0.2)}
        >
          <a href="#chat"
            className="neu-btn text-indigo-500 font-semibold">
            Chat with me
          </a>
          <a href="#experience"
            className="neu-btn text-gray-500 dark:text-gray-400">
            My work
          </a>
          <a href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="neu-btn text-gray-500 dark:text-gray-400">
            GitHub
          </a>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          className="flex flex-wrap gap-4 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="neu-card flex flex-col items-center px-6 py-4 min-w-[100px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
            >
              <span className="text-2xl font-bold text-indigo-500">{s.value}</span>
              <span className="text-xs text-gray-400 mt-1 text-center">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Right: Spline 3D avatar ── */}
      <motion.div
        className="flex-1 w-full h-[580px] md:h-[650px]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
      >
        <Suspense
          fallback={
            <div className="w-full h-full neu-card flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-indigo-400
                                border-t-transparent animate-spin" />
                <span className="text-sm text-gray-400">Loading 3D scene...</span>
              </div>
            </div>
          }
        >
          <Spline scene={profile.splineScene} />
        </Suspense>
      </motion.div>
    </section>
  );
}