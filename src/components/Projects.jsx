import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/resume';
import AmbientParticles from './AmbientParticles';

const BG   = '#040D12';
const CARD = 'rgba(8, 22, 30, 0.82)';
const TEAL = '#4F9B93';
const TEXT = '#E0EDF4';
const DIM  = 'rgba(224,237,244,0.52)';
const FAINT= 'rgba(224,237,244,0.28)';

const card = {
  background:  CARD,
  borderRadius: 14,
  boxShadow:   'inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 48px rgba(0,0,0,0.5)',
};

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

function ProjectCard({ project, index }) {
  return (
    <motion.div {...fadeUp(index * 0.07)} className="flex flex-col">
      <div style={{ ...card, display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>

        {/* Top teal accent line */}
        <div style={{
          height: 2,
          background: `linear-gradient(to right, ${TEAL}, rgba(79,155,147,0.1))`,
        }} />

        {/* Body */}
        <div style={{ flex: 1, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Badges */}
          <div className="flex items-center gap-2 mb-1">
            {project.nda && (
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                background: 'rgba(79,155,147,0.1)', color: TEAL,
                border: '1px solid rgba(79,155,147,0.2)',
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>NDA</span>
            )}
            {project.isPublication && (
              <span style={{
                fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                background: 'rgba(79,155,147,0.1)', color: TEAL,
                border: '1px solid rgba(79,155,147,0.2)',
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>IEEE</span>
            )}
          </div>

          <h3 style={{ fontWeight: 700, fontSize: '1.15rem',
                       color: TEXT, letterSpacing: '-0.01em' }}>
            {project.name}
          </h3>

          <p style={{ fontSize: 14, color: DIM, lineHeight: 1.65 }}>
            {project.description}
          </p>

          {/* Stack pills */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-3"
               style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            {project.stack.map(s => (
              <span key={s} style={{
                fontSize: 11, fontWeight: 500, padding: '3px 10px',
                border: '1px solid rgba(79,155,147,0.16)',
                color: 'rgba(224,237,244,0.45)', borderRadius: 20,
              }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 22px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {project.nda ? (
            <span style={{ fontSize: 11, color: FAINT }}>Discussable under interview context</span>
          ) : (
            <div className="flex gap-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer"
                   onClick={e => e.stopPropagation()}
                   style={{
                     fontSize: 12, fontWeight: 500, padding: '4px 12px',
                     border: `1px solid rgba(79,155,147,0.3)`, color: TEAL,
                     borderRadius: 20, textDecoration: 'none',
                   }}>GitHub</a>
              )}
              {project.live && project.live !== '#' && (
                <a href={project.live} target="_blank" rel="noreferrer"
                   onClick={e => e.stopPropagation()}
                   style={{
                     fontSize: 12, fontWeight: 500, padding: '4px 12px',
                     background: 'rgba(79,155,147,0.15)', color: TEAL,
                     border: '1px solid rgba(79,155,147,0.25)',
                     borderRadius: 20, textDecoration: 'none',
                   }}>{project.isPublication ? 'IEEE' : 'Live'}</a>
              )}
            </div>
          )}

          <Link
            to={`/project/${project.id}`}
            style={{
              fontSize: 12, fontWeight: 600, color: TEAL,
              textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5,
            }}>
            View details
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden"
             style={{ background: BG }}>
      <AmbientParticles />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 500, color: TEAL,
                      textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>
            03 / Projects
          </p>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                       color: TEXT, letterSpacing: '-0.03em', lineHeight: 1 }}>
            Things I've built
          </h2>
          <p style={{ fontSize: 15, color: DIM, marginTop: 10 }}>
            Some under NDA, all worth talking about.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <motion.p {...fadeUp(0.4)}
          style={{ fontSize: 12, textAlign: 'center', marginTop: 36, color: FAINT }}>
          NDA projects discussable in detail —{' '}
          <a href="#chat" style={{ color: TEAL, textDecoration: 'none' }}>ask the AI</a>
        </motion.p>
      </div>
    </section>
  );
}
