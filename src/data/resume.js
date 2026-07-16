export const profile = {
  name: 'Harini Thirunavukkarasan',
  tagline: 'Software Engineer & MS CS Student at Northeastern',
  subTagline: 'Building distributed systems, AI-powered tooling, and things that actually work in production.',
  location: 'Boston, Massachusetts',
  email: 'harinipri2001@gmail.com',
  github: 'https://github.com/harini0-0',
  linkedin: 'https://linkedin.com/in/harini-thirunavukkarasan',
  availability: 'Open to Fall 2026 Co-op & Full-time Roles',
  splineScene: 'https://prod.spline.design/DC5UbE5a9xhNKGFj/scene.splinecode',
};

export const about = {
  bio: `I'm a software engineer with 2.5 years at Wells Fargo shipping production backend systems, AI tooling, and CI/CD pipelines. Currently a Software Engineer at Proplr and Graduate TA for Algorithms at Northeastern, while pursuing my MS in Computer Science. I've built concurrent DNS resolvers, real-time deepfake detection systems, on-device privacy tools, and LLM pipelines — mostly in hackathons or on weekends. I pick up things on my own timeline; that's how I close gaps.`,
  shortBio: `Software engineer with production experience at Wells Fargo and Proplr, currently pursuing MS CS at Northeastern — building at the intersection of distributed systems, AI tooling, and applied ML.`,
  highlights: [
    'Software Engineer at Proplr — May 2026',
    '2.5 years at Wells Fargo — Senior SWE',
    'Graduate TA for Algorithms — Northeastern',
    'MS CS — Northeastern University (Jan 2026)',
    'Best Technical Innovation — SheHack 2026',
    'IEEE Published Researcher',
    'Azure Developer Associate certified',
    'Manager & Team Spotlight Award — Wells Fargo',
  ],
};

export const experience = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'Proplr',
    duration: 'May 2026 – Present',
    location: 'Dubai, UAE (Remote)',
    bullets: [
      'Refactored a Next.js + Supabase platform into a layered modular monolith, separating routes, services, repositories, and PII handling into predictable layers.',
      'Closed 14 correctness and authorization defects including PII leaks, a signup foreign key failure, missing ownership checks, and non-idempotent Stripe webhooks.',
      'Grew the test suite from 62 to 154 tests across 21 suites, including a route-level integration harness covering the full auth, rate limit, and PII regression path.',
    ],
    stack: ['Next.js', 'Supabase', 'TypeScript', 'PostgreSQL', 'Jest'],
  },
  {
    id: 2,
    role: 'Graduate Teaching Assistant — Algorithms',
    company: 'Northeastern University',
    duration: 'May 2026 – Present',
    location: 'Boston, Massachusetts',
    bullets: [
      'Supporting students on data structures, algorithmic complexity, and problem solving through office hours, assignment guidance, and assessments.',
    ],
    stack: ['Algorithms', 'Data Structures', 'Complexity Analysis'],
  },
  {
    id: 3,
    role: 'Senior Software Engineer',
    company: 'Wells Fargo',
    duration: 'July 2023 – December 2025',
    location: 'India',
    bullets: [
      'Designed and shipped production backend microservices in Java and Spring Boot for consumer lending, owning 20+ deployments end-to-end with 99% SLA compliance.',
      'Built Codon: Prodgard — an AI VS Code extension using LangGraph and GitHub Copilot API that generates plain-language codebase reports on a single command.',
      'Built a full-stack release dashboard (ReactJS, Spring Boot, MongoDB) consolidating Jenkins, GitHub, Jira, and Harness into a single view, cutting validation from 90 minutes to under 5.',
    ],
    stack: ['Java', 'Spring Boot', 'LangGraph', 'GitHub Copilot API', 'ReactJS', 'MongoDB', 'Jenkins', 'Splunk'],
  },
  {
    id: 4,
    role: 'Program Associate Intern',
    company: 'Wells Fargo',
    duration: 'May 2022 – July 2022',
    location: 'India',
    bullets: [
      'Built a two-model NLP chatbot for customer support: a BERT-based sentiment model for empathetic tone and a classification model to route conversations to the right bank segment, reducing friction by 80%.',
    ],
    stack: ['Python', 'BERT', 'NLP', 'React', 'Firebase'],
  },
];

export const projects = [
  {
    id: 1,
    name: 'Project Helix',
    tagline: 'Adaptive Telemetry-Driven DNS Resolver',
    description: 'A concurrent UDP DNS resolver in Go with a hand-implemented TTL-aware LRU cache, full Prometheus/Grafana instrumentation, and an XGBoost model trained on historical telemetry to predict cache retention and prefetch high-demand records.',
    stack: ['Go', 'Python', 'XGBoost', 'Prometheus', 'Grafana', 'Docker', 'Linux'],
    github: null,
    live: null,
    nda: false,
  },
  {
    id: 2,
    name: 'SHEild',
    tagline: 'Real-Time Deepfake Detection Platform',
    description: 'A real-time deepfake detection system for non-technical users, using PyTorch for model inference, OpenCV for video frame processing, and WebRTC for live stream ingestion. Won Best Technical Innovation at SheHack 2026.',
    stack: ['PyTorch', 'OpenCV', 'WebRTC', 'FastAPI', 'Docker', 'AWS'],
    github: null,
    live: null,
    nda: false,
    award: 'Best Technical Innovation — SheHack 2026',
  },
  {
    id: 3,
    name: 'Priceless',
    tagline: 'On-Device Data Economy Transparency',
    description: 'A Chrome MV3 extension that audits websites in real time and quantifies the economic value of user data — with zero data leaving the device. Custom PyTorch models compiled to ONNX and run via WebAssembly inside the service worker.',
    stack: ['PyTorch', 'ONNX', 'WebAssembly', 'React', 'Tailwind', 'Claude API', 'Vite'],
    github: null,
    live: null,
    nda: false,
  },
  {
    id: 4,
    name: 'Codon: Prodgard',
    tagline: 'GenAI Code Explanation Tool',
    description: 'A VS Code extension and LangGraph agent workflow that reads a codebase and generates plain-language implementation reports on a single command, eliminating recurring handoff meetings between engineers and business teams at Wells Fargo.',
    stack: ['TypeScript', 'LangGraph', 'GitHub Copilot API', 'VS Code API', 'GenAI'],
    github: null,
    live: null,
    nda: true,
  },
  {
    id: 5,
    name: 'LLM Log Triage Pipeline',
    tagline: 'Grounded Anomaly Detection',
    description: 'A Python pipeline that ingests raw multi-format production logs and routes noise-reduced chunks through Google Gemma via the Gemini API, with a grounding layer requiring every cited log line to appear verbatim in the source and best-of-N self-consistency voting to reject hallucinated detections.',
    stack: ['Python', 'Gemini API', 'Gemma', 'Prometheus', 'Slack Webhooks'],
    github: null,
    live: null,
    nda: false,
  },
  {
    id: 6,
    name: 'RAG Powered AI Portfolio',
    tagline: 'Conversational AI on Personal Data',
    description: 'A RAG-powered conversational AI trained on personal work history using LangGraph, vector embeddings, and the Claude API — handling retrieval, context ranking, and response generation as backend services in Python and TypeScript.',
    stack: ['React', 'Firebase', 'Claude API', 'OpenAI Embeddings', 'RAG', 'Firestore', 'TypeScript'],
    github: 'https://github.com/harini0-0',
    live: '#',
    nda: false,
  },
  {
    id: 7,
    name: 'Smart Traffic Management System',
    tagline: 'IEEE Published Research',
    description: 'Research on dynamic urban traffic flow optimization using GPS-based vehicle crowd tracking and multithreaded C++ processing with inter-process communication. Published in IEEE Xplore.',
    stack: ['C++', 'Multithreading', 'IPC', 'GPS Systems'],
    github: null,
    live: 'https://ieeexplore.ieee.org',
    nda: false,
    isPublication: true,
  },
  {
    id: 8,
    name: 'Flutter Mobile Applications',
    tagline: 'Money Manager & Music Player',
    description: 'Two Flutter apps: a money management app with custom categories, transaction tracking, and monthly dashboards using Provider state management and Hive; and a music player with a neumorphic UI and full playback controls.',
    stack: ['Flutter', 'Dart', 'Provider', 'Flutter Hive'],
    github: null,
    live: null,
    nda: false,
  },
];

export const techStack = [
  {
    category: 'Languages',
    skills: ['C++', 'Python', 'Java', 'Go', 'JavaScript', 'TypeScript', 'Dart', 'SQL'],
  },
  {
    category: 'Web & Full Stack',
    skills: ['React', 'Next.js', 'Node.js', 'Spring Boot', 'FastAPI', 'REST APIs', 'Tailwind CSS', 'Vite', 'Chrome Extensions (MV3)'],
  },
  {
    category: 'AI, ML & Data',
    skills: ['PyTorch', 'TensorFlow', 'OpenCV', 'BERT / NLP', 'LangGraph', 'RAG', 'Vector Embeddings', 'ONNX', 'XGBoost', 'Claude API', 'Gemini API', 'GitHub Copilot API'],
  },
  {
    category: 'Systems & Core CS',
    skills: ['Distributed Systems', 'Microservices', 'Concurrency', 'Multithreading', 'IPC', 'Low Latency Engineering', 'Caching', 'Linux', 'WebAssembly'],
  },
  {
    category: 'Infrastructure & DevOps',
    skills: ['Docker', 'Prometheus', 'Grafana', 'AWS', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Splunk', 'SonarQube'],
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Firebase', 'Supabase', 'DynamoDB', 'SQLite'],
  },
  {
    category: 'Testing & Quality',
    skills: ['Jest', 'JUnit', 'Karate', 'Playwright', 'TDD', 'JaCoCo', 'PIT Mutation Testing'],
  },
  {
    category: 'Mobile & Certifications',
    skills: ['Flutter', 'Dart', 'Provider', 'Azure Developer Associate', 'Azure AI Fundamentals', 'Google Digital Leader'],
  },
];

export const publications = [
  {
    title: 'Smart Traffic Management System Using Multithreading and Inter-process Communication',
    publisher: 'IEEE Xplore Digital Library',
    link: 'https://ieeexplore.ieee.org',
  },
];

export const awards = [
  'Best Technical Innovation — SheHack 2026 (SHEild)',
  'SharkHack 2026 Participant — Priceless (Off Grid Track)',
  'Manager Spotlight Award — Wells Fargo',
  'Team Spotlight Award — Wells Fargo',
];

export const education = [
  {
    id: 1,
    degree: 'Master of Science in Computer Science',
    school: 'Northeastern University',
    location: 'Boston, Massachusetts',
    duration: 'Jan 2026 – May 2028',
    gpa: '3.67',
    courses: ['Programming Design Paradigms', 'Database Management', 'Algorithms'],
  },
  {
    id: 2,
    degree: 'Bachelor of Technology in Information Technology',
    school: 'National Institute of Technology, Karnataka',
    location: 'Karnataka, India',
    duration: 'July 2019 – May 2023',
    courses: ['Data Structures & Algorithms', 'Computer Networking', 'Object Oriented Programming', 'Operating Systems', 'HCI'],
  },
];

export const stats = [
  { label: 'Years exp.',            value: '2.5+' },
  { label: 'Production deployments', value: '20+' },
  { label: 'MS CS',                 value: 'Northeastern' },
];
