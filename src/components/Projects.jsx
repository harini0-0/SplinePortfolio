import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/resume';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

const panelColors = ['#4F9B93', '#3E6F85', '#4F9B93', '#3E6F85', '#4F9B93'];

function ProjectCard({ project, index }) {
  const borderColor = panelColors[index % panelColors.length];

  return (
    <motion.div {...fadeUp(index * 0.07)} className="flex flex-col">
      <div style={{
        background: '#0D1F2E',
        border: `2px solid ${borderColor}55`,
        boxShadow: `-2px -2px 8px rgba(79,155,147,0.05), 4px 4px 0 ${borderColor}, 6px 6px 16px rgba(0,0,0,0.28)`,
        borderRadius: 10,
        display: 'flex', flexDirection: 'column', flex: 1,
      }}>

        {/* Header */}
        <div style={{
          padding: '12px 18px',
          borderBottom: `1px solid ${borderColor}30`,
          background: `${borderColor}10`,
          borderRadius: '8px 8px 0 0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 28, height: 28, background: borderColor, color: '#000',
              fontWeight: 700, fontSize: 13, borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {index + 1}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {project.nda && (
              <span style={{
                fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 3,
                background: '#3E6F85', color: '#000', textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>NDA</span>
            )}
            {project.isPublication && (
              <span style={{
                fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 3,
                background: '#4F9B93', color: '#000', textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>IEEE</span>
            )}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '18px 18px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700, fontSize: '1.05rem',
            color: '#E0EDF4', letterSpacing: '-0.01em',
          }}>
            {project.name}
          </h3>
          <p style={{ fontSize: 13, color: 'rgba(224,237,244,0.6)', lineHeight: 1.6 }}>
            {project.description}
          </p>

          {/* Stack tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 4 }}>
            {project.stack.map(s => (
              <span key={s} style={{
                fontSize: 10, fontWeight: 600, padding: '2px 8px',
                border: `1.5px solid ${borderColor}50`,
                color: borderColor, borderRadius: 4,
                textTransform: 'uppercase', letterSpacing: '0.03em',
              }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '12px 18px',
          borderTop: `1px dashed ${borderColor}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {project.nda ? (
            <span style={{ fontSize: 11, color: 'rgba(224,237,244,0.3)' }}>NDA — Discussable in detail</span>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer"
                   onClick={e => e.stopPropagation()}
                   style={{
                     fontSize: 11, fontWeight: 600, padding: '4px 12px',
                     border: `2px solid ${borderColor}`, color: borderColor,
                     borderRadius: 5, textDecoration: 'none',
                     transition: 'all 0.15s',
                   }}>
                  GitHub
                </a>
              )}
              {project.live && project.live !== '#' && (
                <a href={project.live} target="_blank" rel="noreferrer"
                   onClick={e => e.stopPropagation()}
                   style={{
                     fontSize: 11, fontWeight: 600, padding: '4px 12px',
                     background: borderColor, color: '#000',
                     borderRadius: 5, textDecoration: 'none',
                   }}>
                  {project.isPublication ? 'IEEE' : 'Live'}
                </a>
              )}
            </div>
          )}

          <Link
            to={`/project/${project.id}`}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600, fontSize: 12,
              color: borderColor, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 4,
              transition: 'gap 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.gap = '8px'}
            onMouseLeave={e => e.currentTarget.style.gap = '4px'}>
            View Project
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
             style={{ background: '#00010bff' }}>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-14 flex items-center gap-5">
          <div className="panel-number">P</div>
          <div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              color: '#4F9B93', letterSpacing: '-0.02em', lineHeight: 1,
            }}>
              THE PROJECTS
            </h2>
            <p className="section-subheading mt-1">
              Things I've built — some under NDA, all worth talking about.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        <motion.p className="text-xs text-center mt-10 font-comic tracking-comic"
          style={{ color: 'rgba(224,237,244,0.35)' }}
          {...fadeUp(0.4)}>
          NDA projects discussable in detail — ask via the{' '}
          <a href="#chat" style={{ color: '#4F9B93' }}>AI CHAT</a>
        </motion.p>
      </div>
    </section>
  );
}
