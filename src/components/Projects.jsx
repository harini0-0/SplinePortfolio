import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/resume';

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

const projectDetail = {
  1: {
    category: 'AI TOOLING',
    overview: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
    contribution: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    metrics: [{ value: '90%', label: 'Automated' }, { value: '5min', label: 'Validation' }, { value: '3x', label: 'Faster' }],
  },
  2: {
    category: 'PLATFORM ENG',
    overview: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`,
    contribution: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.`,
    metrics: [{ value: '1.5h→5m', label: 'Time saved' }, { value: '20+', label: 'Deployments' }, { value: '99%', label: 'SLA' }],
  },
  3: {
    category: 'NLP / ML',
    overview: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.`,
    contribution: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa.`,
    metrics: [{ value: '80%', label: 'Friction ↓' }, { value: 'BERT', label: 'Model' }, { value: '10', label: 'Team size' }],
  },
  4: {
    category: 'IEEE RESEARCH',
    overview: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.`,
    contribution: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident deserunt.`,
    metrics: [{ value: 'IEEE', label: 'Published' }, { value: 'C++', label: 'Core' }, { value: 'GPS', label: 'Real-time' }],
  },
  5: {
    category: 'FULL-STACK AI',
    overview: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.`,
    contribution: `Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa officia.`,
    metrics: [{ value: 'RAG', label: 'Architecture' }, { value: 'Claude', label: 'API' }, { value: 'Firebase', label: 'Backend' }],
  },
};

// Alternating panel border colors for variety
const panelColors = ['#ff6500', '#ffd600', '#ff6500', '#ffd600', '#ff6500'];

function ProjectPanel({ project, index }) {
  const [open, setOpen] = useState(false);
  const detail = projectDetail[project.id] || {};
  const borderColor = panelColors[index % panelColors.length];

  return (
    <motion.div {...fadeUp(index * 0.07)} className="flex flex-col">

      {/* Comic panel */}
      <div
        className="flex flex-col flex-1 cursor-pointer transition-transform duration-150"
        style={{
          background: '#120700',
          border: `3px solid ${borderColor}`,
          boxShadow: open
            ? `8px 8px 0 ${borderColor}`
            : `5px 5px 0 ${borderColor}`,
          transform: open ? 'translate(-3px,-3px)' : undefined,
          borderRadius: 4,
        }}>

        {/* Panel number + category header */}
        <div className="flex items-center justify-between px-4 py-3 border-b-2"
             style={{ borderColor: `${borderColor}40`, background: `${borderColor}12` }}>
          <div className="flex items-center gap-3">
            <div className="panel-number" style={{ width: 36, height: 36, fontSize: 20 }}>
              {index + 1}
            </div>
            <span className="font-comic tracking-comic text-sm"
                  style={{ color: borderColor }}>
              {detail.category || 'PROJECT'}
            </span>
          </div>
          <div className="flex gap-1.5">
            {project.nda           && <span className="comic-tag text-[10px]" style={{ background: '#e63000' }}>NDA</span>}
            {project.isPublication && <span className="comic-tag-yellow text-[10px]">IEEE</span>}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h3 className="font-comic text-xl tracking-comic text-comic-cream">
            {project.name}
          </h3>
          <p className="text-sm text-[#f5ede0]/65 leading-relaxed">
            {project.description}
          </p>

          {/* Expandable details */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="detail"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden">

                <div className="flex flex-col gap-4 pt-3 border-t-2 border-dashed"
                     style={{ borderColor: `${borderColor}30` }}>

                  <div>
                    <p className="font-comic text-sm tracking-comic mb-1"
                       style={{ color: borderColor }}>OVERVIEW</p>
                    <p className="text-sm text-[#f5ede0]/60 leading-relaxed">{detail.overview}</p>
                  </div>

                  <div>
                    <p className="font-comic text-sm tracking-comic mb-1"
                       style={{ color: borderColor }}>MY CONTRIBUTION</p>
                    <p className="text-sm text-[#f5ede0]/60 leading-relaxed">{detail.contribution}</p>
                  </div>

                  {detail.metrics && (
                    <div>
                      <p className="font-comic text-sm tracking-comic mb-2"
                         style={{ color: borderColor }}>KEY IMPACT</p>
                      <div className="grid grid-cols-3 gap-2">
                        {detail.metrics.map(m => (
                          <div key={m.label} className="text-center py-2"
                               style={{ border: `2px solid ${borderColor}50`, borderRadius: 2 }}>
                            <p className="font-comic text-base tracking-comic"
                               style={{ color: borderColor }}>{m.value}</p>
                            <p className="text-[10px] text-[#f5ede0]/45 mt-0.5">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t-2 border-dashed"
               style={{ borderColor: `${borderColor}25` }}>
            {project.stack.map(s => (
              <span key={s} className="text-[10px] font-semibold uppercase px-2 py-0.5"
                    style={{ border: `1.5px solid ${borderColor}60`,
                             color: `${borderColor}`, borderRadius: 2 }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Footer — links + expand */}
        <div className="px-5 pb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.nda ? (
              <span className="text-xs text-[#f5ede0]/40 flex items-center gap-1.5">
                🔒 Protected under NDA
              </span>
            ) : (
              <>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer"
                     onClick={e => e.stopPropagation()}
                     className="btn-comic-outline text-xs px-3 py-1"
                     style={{ fontSize: 12 }}>
                    GitHub
                  </a>
                )}
                {project.live && project.live !== '#' && (
                  <a href={project.live} target="_blank" rel="noreferrer"
                     onClick={e => e.stopPropagation()}
                     className="btn-comic text-xs px-3 py-1"
                     style={{ fontSize: 12 }}>
                    {project.isPublication ? 'IEEE' : 'Live'}
                  </a>
                )}
              </>
            )}
          </div>

          <button
            onClick={() => setOpen(o => !o)}
            className="font-comic tracking-comic text-sm transition-colors"
            style={{ color: borderColor }}>
            {open ? '▲ LESS' : '▼ DETAILS'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">

      <div className="pointer-events-none absolute inset-0 scene-projects" />
      <div className="pointer-events-none absolute inset-0 halftone opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-14 flex items-center gap-5">
          <div className="panel-number">P</div>
          <div>
            <h2 className="font-comic text-5xl text-comic-orange tracking-comic"
                style={{ textShadow: '3px 3px 0 #000' }}>
              THE PROJECTS
            </h2>
            <p className="section-subheading mt-1">
              Things I've built — some under NDA, all worth talking about.
            </p>
          </div>
        </motion.div>

        {/* Comic panel grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectPanel key={p.id} project={p} index={i} />
          ))}
        </div>

        <motion.p className="text-xs text-center text-[#f5ede0]/35 mt-10 font-comic tracking-comic"
          {...fadeUp(0.4)}>
          NDA projects discussable in detail — ask via the{' '}
          <a href="#chat" className="text-comic-orange hover:underline">AI CHAT ↓</a>
        </motion.p>
      </div>
    </section>
  );
}
