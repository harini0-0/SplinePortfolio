import { motion } from 'framer-motion';
import { about, awards, publications } from '../data/resume';

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport:   { once: true },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
});

export default function About() {
  return (
    <section id="about" className="py-24 max-w-6xl mx-auto px-6">

      {/* Heading */}
      <motion.div {...fadeUp(0)} className="mb-14">
        <h2 className="section-heading text-gray-800 dark:text-gray-100">
          <span className="accent-underline">About me</span>
        </h2>
        <p className="section-subheading mt-4">The story behind the resume.</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">

        {/* Left — bio */}
        <motion.div {...fadeUp(0.1)} className="flex flex-col gap-6">
          <div className="neu-card">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base">
              {about.bio}
            </p>
          </div>

          {/* Awards */}
          <div className="neu-card flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Awards
            </h3>
            {awards.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{a}</span>
              </div>
            ))}
          </div>

          {/* Publication */}
          <div className="neu-card flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Publication
            </h3>
            {publications.map((p, i) => (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 group"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-indigo-500 transition-colors">
                  {p.title}
                  <span className="block text-xs text-indigo-400 mt-0.5">{p.publisher}</span>
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right — highlights */}
        <motion.div {...fadeUp(0.2)} className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Highlights
          </h3>
          <div className="flex flex-wrap gap-3">
            {about.highlights.map((h, i) => (
              <motion.span
                key={i}
                className="neu-pill text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.07 }}
              >
                {h}
              </motion.span>
            ))}
          </div>

          {/* Quick facts */}
          <div className="neu-card mt-4 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Quick facts
            </h3>
            {[
              { label: 'Current',    value: 'MS CS @ Northeastern University' },
              { label: 'Previously', value: 'Senior SWE @ Wells Fargo (2.5 yrs)' },
              { label: 'Interests',  value: 'Distributed systems, AI tooling, Mobile dev' },
              { label: 'Location',   value: 'Boston, Massachusetts' },
            ].map(f => (
              <div key={f.label} className="flex items-start gap-3">
                <span className="text-xs font-semibold text-indigo-400 uppercase w-24 shrink-0 pt-0.5">
                  {f.label}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">{f.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}