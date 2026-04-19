import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/resume';

/* ── Full detail content per project ── */
const details = {
  1: {
    category: 'AI Tooling',
    overview: `An AI-powered VS Code chat extension that automates production readiness assessments, code reviews, and release workflows. Built using the GitHub Copilot API and LangGraph state machines, it surfaces critical business logic and deployment checks directly in the developer's IDE — eliminating context switching between tools during high-stakes releases.`,
    contribution: `Led end-to-end design and implementation from scratch. Architected the LangGraph state machine for multi-step production readiness reasoning, integrated GitHub Copilot API for contextual code understanding, and built the full VS Code extension infrastructure. Iterated with the Wells Fargo engineering team to validate real-world workflows before shipping to production.`,
    metrics: [
      { value: '90%', label: 'Checks Automated' },
      { value: '<5 min', label: 'Validation Time' },
      { value: '3×', label: 'Release Velocity' },
    ],
  },
  2: {
    category: 'Platform Engineering',
    overview: `A full-stack distributed system giving L3 Tech business leaders real-time visibility into deployment state, environment drift, and configuration discrepancies across live production environments. Replaced a brittle manual validation process that took 1.5 hours per release with an automated dashboard that updates in real time.`,
    contribution: `Designed and built the entire system: Spring Boot backend with integrations for Jira API, Jenkins, Harness, and UCD; a ReactJS dashboard frontend; and a Playwright automated UI test suite. Deployed and maintained in production, supporting 20+ release cycles with zero-downtime delivery.`,
    metrics: [
      { value: '1.5h → 5m', label: 'Time Saved' },
      { value: '20+', label: 'Prod Deployments' },
      { value: '99%', label: 'SLA Maintained' },
    ],
  },
  3: {
    category: 'NLP / ML',
    overview: `An LLM-powered customer support chatbot that uses BERT-based sentiment analysis to detect emotional tone in real time and dynamically adapt its conversational responses. Deployed in production to reduce support friction, handle escalation intelligently, and improve customer satisfaction at scale.`,
    contribution: `Designed and trained the BERT model end-to-end — data preparation, fine-tuning, evaluation, and production integration. Led a cross-functional team of 10 in an Agile environment, translating ambiguous business requirements into a shipped, working system with 100% on-time milestone delivery.`,
    metrics: [
      { value: '80%', label: 'Friction Reduced' },
      { value: 'BERT', label: 'Core Model' },
      { value: '10', label: 'Team Members' },
    ],
  },
  4: {
    category: 'IEEE Research',
    overview: `A research project published in IEEE Xplore focused on dynamic urban traffic flow optimization. Uses GPS-based vehicle crowd tracking combined with multithreaded C++ processing and inter-process communication to analyze real-time traffic density and reroute vehicles proactively — reducing urban congestion in simulation.`,
    contribution: `Designed the full system architecture, implemented the multithreaded C++ core, and built the GPS-based crowd tracking and optimization algorithm. Authored and published the research paper in IEEE Xplore, handling both the engineering implementation and academic writing independently.`,
    metrics: [
      { value: 'IEEE', label: 'Published' },
      { value: 'C++', label: 'Core Language' },
      { value: 'Real-time', label: 'GPS Tracking' },
    ],
  },
  5: {
    category: 'Full-Stack AI',
    overview: `A RAG-powered chatbot trained on my resume and GitHub activity. Uses OpenAI embeddings combined with Firestore vector search to retrieve relevant context from a curated knowledge base, then streams accurate, grounded responses via the Claude API through a Firebase Cloud Function — embedded directly in this portfolio.`,
    contribution: `Built the full system: Firebase backend, OpenAI embedding pipeline, Firestore vector store, Claude API streaming integration, and the React chat UI. Designed the RAG retrieval strategy to ensure responses stay factually grounded and don't hallucinate experience details.`,
    metrics: [
      { value: 'RAG', label: 'Architecture' },
      { value: 'Claude', label: 'API' },
      { value: 'Firebase', label: 'Backend' },
    ],
  },
};

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find(p => p.id === Number(id));
  const detail  = details[Number(id)];

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', background: '#00010bff', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <p style={{ color: 'rgba(224,237,244,0.5)', fontSize: 16 }}>Project not found.</p>
        <Link to="/" style={{ color: '#4F9B93', fontSize: 14 }}>← Back to portfolio</Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #00010bff 0%, #0E2234 100%)',
                  fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* Back nav */}
      <div style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={() => navigate('/#projects')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: 'rgba(224,237,244,0.5)', fontSize: 14, fontWeight: 500,
            background: 'none', border: 'none', cursor: 'pointer',
            transition: 'color 0.15s', padding: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#4F9B93'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(224,237,244,0.5)'}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back to Portfolio
        </button>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px 32px 80px' }}>

        {/* ── Project hero ── */}
        <motion.div {...fadeUp(0)} style={{ marginBottom: 48 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 4,
              background: '#4F9B93', color: '#000', textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>
              {detail?.category || 'Project'}
            </span>
            {project.nda && (
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 4,
                background: 'rgba(62,111,133,0.3)', color: '#3E6F85',
                border: '1px solid #3E6F85', textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>NDA</span>
            )}
            {project.isPublication && (
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 4,
                background: 'rgba(79,155,147,0.15)', color: '#4F9B93',
                border: '1px solid #4F9B93', textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>IEEE Published</span>
            )}
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700, color: '#E0EDF4',
            letterSpacing: '-0.03em', lineHeight: 1.05,
            marginBottom: 16,
          }}>
            {project.name}
          </h1>

          <p style={{ fontSize: 16, color: 'rgba(224,237,244,0.6)', lineHeight: 1.7, maxWidth: 680 }}>
            {project.description}
          </p>
        </motion.div>

        {/* ── Key metrics ── */}
        {detail?.metrics && (
          <motion.div {...fadeUp(0.1)} style={{ marginBottom: 40 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {detail.metrics.map(m => (
                <div key={m.label} style={{
                  background: '#0D1F2E',
                  border: '2px solid rgba(79,155,147,0.3)',
                  boxShadow: '-2px -2px 8px rgba(79,155,147,0.05), 4px 4px 12px rgba(0,0,0,0.25)',
                  borderRadius: 10, padding: '20px 16px', textAlign: 'center',
                }}>
                  <p style={{ fontWeight: 700, fontSize: '1.8rem', color: '#4F9B93',
                               letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 6 }}>
                    {m.value}
                  </p>
                  <p style={{ fontSize: 11, color: 'rgba(224,237,244,0.45)',
                               textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500 }}>
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Overview + Contribution ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>

          {detail?.overview && (
            <motion.div {...fadeUp(0.15)}>
              <div style={{
                background: '#0D1F2E',
                border: '1px solid rgba(79,155,147,0.2)',
                boxShadow: '-2px -2px 8px rgba(79,155,147,0.04), 4px 4px 0 rgba(79,155,147,0.4), 6px 6px 16px rgba(0,0,0,0.25)',
                borderRadius: 12, padding: '24px 28px',
              }}>
                <div style={{ width: 28, height: 2, background: '#4F9B93', borderRadius: 2, marginBottom: 14 }} />
                <h3 style={{ fontWeight: 700, fontSize: '0.8rem', color: '#4F9B93',
                             textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                  Overview
                </h3>
                <p style={{ fontSize: 15, color: 'rgba(224,237,244,0.78)', lineHeight: 1.75 }}>
                  {detail.overview}
                </p>
              </div>
            </motion.div>
          )}

          {detail?.contribution && (
            <motion.div {...fadeUp(0.2)}>
              <div style={{
                background: '#0D1F2E',
                border: '1px solid rgba(62,111,133,0.2)',
                boxShadow: '-2px -2px 8px rgba(62,111,133,0.04), 4px 4px 0 rgba(62,111,133,0.4), 6px 6px 16px rgba(0,0,0,0.25)',
                borderRadius: 12, padding: '24px 28px',
              }}>
                <div style={{ width: 28, height: 2, background: '#3E6F85', borderRadius: 2, marginBottom: 14 }} />
                <h3 style={{ fontWeight: 700, fontSize: '0.8rem', color: '#3E6F85',
                             textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
                  My Contribution
                </h3>
                <p style={{ fontSize: 15, color: 'rgba(224,237,244,0.78)', lineHeight: 1.75 }}>
                  {detail.contribution}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* ── Tech stack ── */}
        <motion.div {...fadeUp(0.25)} style={{ marginBottom: 36 }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.8rem', color: 'rgba(224,237,244,0.35)',
                       textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
            Tech Stack
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.stack.map(s => (
              <span key={s} style={{
                fontSize: 12, fontWeight: 600, padding: '5px 14px',
                border: '2px solid rgba(79,155,147,0.35)',
                color: '#4F9B93', borderRadius: 6,
                textTransform: 'uppercase', letterSpacing: '0.04em',
              }}>
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Links ── */}
        {!project.nda && (project.github || (project.live && project.live !== '#')) && (
          <motion.div {...fadeUp(0.3)} style={{ display: 'flex', gap: 12 }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                 style={{
                   fontWeight: 600, fontSize: 14, padding: '10px 24px', borderRadius: 8,
                   border: '2px solid #4F9B93', color: '#4F9B93',
                   textDecoration: 'none', transition: 'all 0.15s',
                 }}
                 onMouseEnter={e => { e.currentTarget.style.background = 'rgba(79,155,147,0.1)'; }}
                 onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
                GitHub
              </a>
            )}
            {project.live && project.live !== '#' && (
              <a href={project.live} target="_blank" rel="noreferrer"
                 style={{
                   fontWeight: 600, fontSize: 14, padding: '10px 24px', borderRadius: 8,
                   background: '#4F9B93', color: '#000',
                   textDecoration: 'none',
                 }}>
                {project.isPublication ? 'View on IEEE' : 'Live Demo'}
              </a>
            )}
          </motion.div>
        )}

        {/* NDA notice */}
        {project.nda && (
          <motion.div {...fadeUp(0.3)}>
            <div style={{
              background: 'rgba(62,111,133,0.08)',
              border: '1px solid rgba(62,111,133,0.25)',
              borderRadius: 8, padding: '14px 20px',
              fontSize: 13, color: 'rgba(224,237,244,0.5)', lineHeight: 1.6,
            }}>
              This project was built at Wells Fargo and is protected by NDA. The details above reflect what I can publicly share. Happy to discuss the engineering decisions and architecture in a conversation.
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
