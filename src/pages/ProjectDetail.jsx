import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/resume';

/* ── Full detail content per project ── */
const details = {
  1: {
    category: 'Systems / ML',
    overview: `A concurrent UDP DNS resolver in Go on Linux, built with a bounded worker pool for capped predictable concurrency and a hand-implemented thread-safe TTL-aware LRU cache (hash map + doubly linked list, O(1) lookup and eviction — no external cache library). Every subsystem is instrumented with Prometheus counters, gauges, and latency histograms surfaced through a Dockerized Grafana stack.`,
    contribution: `Engineered features from historical telemetry (access frequency, recency, time-of-day, burst score) and trained an XGBoost model to predict cache retention and prefetch high-demand records. Built an offline retraining and promotion pipeline with a versioned model registry and a deterministic LRU fallback so correctness never depends on the model.`,
    metrics: [
      { value: 'O(1)', label: 'Cache Ops' },
      { value: 'p50/p95/p99', label: 'Latency Tracked' },
      { value: 'XGBoost', label: 'Prefetch Model' },
    ],
  },
  2: {
    category: 'ML / Computer Vision',
    overview: `A real-time deepfake detection system designed for non-technical users — particularly older adults, women, and children targeted by AI-generated scams. Built to be as automatic as a spam filter. Uses PyTorch for model training and inference, OpenCV for real-time video frame processing, and WebRTC for live stream ingestion.`,
    contribution: `Engineered the full ML inference pipeline and designed scalable backend infrastructure (FastAPI, Docker, AWS) supporting high-throughput parallel inference. Made deliberate latency vs. accuracy tradeoffs to keep the system usable in real time. Won Best Technical Innovation at SheHack 2026.`,
    metrics: [
      { value: 'Real-time', label: 'Inference' },
      { value: 'WebRTC', label: 'Live Stream' },
      { value: '🏆 Best', label: 'Technical Innovation' },
    ],
  },
  3: {
    category: 'ML / Privacy',
    overview: `A Chrome MV3 extension that audits websites in real time and quantifies the economic value of the data a user gives away — with zero data leaving the device. Trained two custom PyTorch models: a regression network (17 features, IAB CPM benchmarks) for per-tracker dollar valuation, and a multi-label classifier trained on 1.27 million URL samples for audience segment reconstruction.`,
    contribution: `Both models were exported to ONNX and run inside the Chrome service worker via WebAssembly — solving a hard MV3 constraint that blocks WebAssembly by default. Integrated the Claude API for privacy policy analysis returning structured JSON with plain-English summaries, contradiction detection, and dark pattern scoring.`,
    metrics: [
      { value: '1.27M', label: 'Training Samples' },
      { value: 'On-device', label: 'Zero Data Leak' },
      { value: 'ONNX + WASM', label: 'Runtime' },
    ],
  },
  4: {
    category: 'AI Tooling',
    overview: `A VS Code extension and LangGraph agent workflow that reads a codebase and generates plain-language implementation reports on a single command. Removed a recurring organizational bottleneck where engineers and managers were pulled into repeated meetings to explain code to business teams who could not read it.`,
    contribution: `Architected the full LangGraph state machine for multi-step code analysis, integrated GitHub Copilot API for contextual code understanding, and built the complete VS Code extension infrastructure. Iterated with the Wells Fargo engineering team to validate real-world workflows before shipping to production.`,
    metrics: [
      { value: 'LangGraph', label: 'Orchestration' },
      { value: '1 command', label: 'To Report' },
      { value: '0 meetings', label: 'Needed' },
    ],
  },
  5: {
    category: 'LLM / MLOps',
    overview: `A Python pipeline that ingests raw multi-format production logs (Linux syslog, HDFS, Apache, OpenSSH) and routes noise-reduced chunks through Google's Gemma model via the Gemini API to emit schema-validated JSON anomaly reports. Built with a grounding-based anti-hallucination layer requiring every cited log line to appear verbatim in the source chunk.`,
    contribution: `Engineered best-of-N self-consistency voting to reject fabricated detections, wrote a defensive JSON parser that recovers clean anomaly arrays from chain-of-thought output, and built a severity scoring engine (0–100 scale) with a webhook dispatcher (Slack, PagerDuty) and queue-file fallback on delivery failure.`,
    metrics: [
      { value: 'Best-of-N', label: 'Anti-Hallucination' },
      { value: '4 formats', label: 'Log Sources' },
      { value: 'Schema-valid', label: 'JSON Output' },
    ],
  },
  6: {
    category: 'Full-Stack AI / RAG',
    overview: `A RAG-powered conversational AI trained on personal work history. Uses OpenAI embeddings combined with Firestore vector search to retrieve relevant context from a curated knowledge base, then generates accurate, grounded responses via the Claude API through a Firebase Cloud Function — embedded directly in this portfolio.`,
    contribution: `Built the full system: Firebase backend, OpenAI embedding ingestion pipeline, Firestore vector store, Claude API integration, and the React chat UI. Designed the retrieval strategy to balance precision with conversational tone — making the system feel like talking to a person rather than querying a search engine.`,
    metrics: [
      { value: 'RAG', label: 'Architecture' },
      { value: 'Claude API', label: 'Generation' },
      { value: 'Firestore', label: 'Vector Store' },
    ],
  },
  7: {
    category: 'IEEE Research',
    overview: `A research project published in IEEE Xplore focused on dynamic urban traffic flow optimization. Uses GPS-based vehicle crowd tracking combined with multithreaded C++ processing and inter-process communication to analyze real-time traffic density and reroute vehicles proactively.`,
    contribution: `Designed the full system architecture, implemented the multithreaded C++ core, and built the GPS-based crowd tracking and optimization algorithm. Authored and published the research paper in IEEE Xplore independently.`,
    metrics: [
      { value: 'IEEE', label: 'Published' },
      { value: 'C++', label: 'Core Language' },
      { value: 'Real-time', label: 'GPS Tracking' },
    ],
  },
  8: {
    category: 'Mobile',
    overview: `Two Flutter apps built independently. A money management app with custom categories, transaction tracking, and monthly expense dashboards — using Provider for state management and Flutter Hive for local storage. And a music player with a neumorphic UI/UX design system, full playback controls, and a dynamic song list.`,
    contribution: `Owned full UI/UX design and engineering on both apps from scratch. The music player's neumorphic design system was a deliberate study in soft-shadow depth and tactile interface patterns.`,
    metrics: [
      { value: 'Flutter', label: 'Framework' },
      { value: 'Neumorphic', label: 'UI Design' },
      { value: 'On-device', label: 'Local Storage' },
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
