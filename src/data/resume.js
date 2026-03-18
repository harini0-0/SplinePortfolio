export const profile = {
  name: 'Harini Thirunavukkarasan',
  tagline: 'Senior Software Engineer & MS CS Student at Northeastern',
  subTagline: 'Building distributed systems, AI-powered tooling, and things that actually work in production.',
  location: 'Boston, Massachusetts',
  email: 'harinipri2001@gmail.com',
  github: 'https://github.com/harini0-0',
  linkedin: 'https://linkedin.com/in/harini-thirunavukkarasan',
  availability: 'Open to Fall 2026 Co-op & Full-time Roles',
  splineScene: 'https://prod.spline.design/DC5UbE5a9xhNKGFj/scene.splinecode',
};

export const stats = [
  { label: 'Years exp.',     value: '2.5+' },
  { label: 'Production deployments', value: '20+' },
  { label: 'MS CS',          value: 'Northeastern' },
];

export const about = {
  bio: `I'm a software engineer who spent 2.5 years at Wells Fargo designing and shipping 
        production backend systems, CI/CD pipelines, and AI-powered developer tooling — 
        the kind of work where reliability isn't optional. I refactored monolithic lending 
        platforms into microservices, built a VS Code extension that surfaces business logic 
        in-IDE using LangGraph and GitHub Copilot API, and kept production stable through 
        20+ deployments with 99% SLA compliance. I'm now pursuing my MS in Computer Science 
        at Northeastern University, deepening my foundation in software design, distributed 
        systems, and applied ML. I pick up things on my own timeline — Flutter and Dart 
        weren't part of any job requirement, I just wanted to understand a different paradigm 
        and built with it until I did. That's how I approach gaps.`,
  highlights: [
    '2.5 years at Wells Fargo — Senior SWE',
    'MS CS — Northeastern University (Jan 2026)',
    'Built & shipped Codon: Prodgard — AI VS Code extension',
    'BERT-based NLP chatbot — reduced friction by 80%',
    'IEEE published researcher',
    'Azure Developer Associate certified',
    'Flutter & Dart — self-taught, production apps',
    'Manager & Team Spotlight Award — Wells Fargo',
  ],
};

export const experience = [
  {
    id: 1,
    role: 'Senior Software Engineer',
    company: 'Wells Fargo',
    duration: 'July 2023 – December 2025',
    location: 'India',
    bullets: [
      'Refactored monolithic lending services into API-based microservices in Java / Spring Boot, correcting customer-specific interest rate inconsistencies and reducing production incidents to fewer than 7 annually while maintaining 99% SLA compliance.',
      'Owned end-to-end lifecycle of 20+ production deployments through ServiceNow-governed CI/CD pipelines — from design and code review through deployment and post-release validation — with zero-downtime release practices.',
      'Diagnosed and resolved production incidents through distributed log analysis in Splunk, reducing mean time to resolution across consumer lending systems.',
      'Increased automated test coverage to 90% using JaCoCo and PIT mutation testing; applied TDD and participated in regular code reviews to maintain high code quality standards.',
      'Built Codon: Prodgard — an AI-powered VS Code chat extension using GitHub Copilot API and LangGraph state machines to automate production readiness assessments, code reviews, and release workflows.',
      'Engineered a Developer Onboarding platform with Playwright UI automation and a Release Version Tool providing real-time visibility into environment/config drift — cutting release validation from 1.5 hours to under 5 minutes.',
    ],
    stack: ['Java', 'Spring Boot', 'LangGraph', 'GitHub Copilot API', 'Playwright', 'Splunk', 'ServiceNow', 'Jenkins', 'ReactJS'],
  },
  {
    id: 2,
    role: 'Program Associate Intern',
    company: 'Wells Fargo',
    duration: 'May 2022 – July 2022',
    location: 'India',
    bullets: [
      'Designed, trained, and deployed an NLP model (BERT-based sentiment analysis) end-to-end — from data preparation and model evaluation to production integration — reducing customer support friction by 80%.',
      'Led a cross-functional team of 10 in an Agile environment; translated ambiguous business requirements into a working shipped solution with 100% on-time milestone delivery.',
      'Built an LLM-powered web chatbot that identified customer sentiment and dynamically adapted conversational responses to enhance user engagement and reduce operational risk.',
    ],
    stack: ['Python', 'BERT', 'NLP', 'Sentiment Analysis', 'Agile'],
  },
];

export const projects = [
  {
    id: 1,
    name: 'Codon: Prodgard',
    description: 'AI-powered VS Code chat extension using GitHub Copilot API and LangGraph state machines to automate production readiness assessments, code reviews, and release workflows — surfacing business logic directly in the IDE.',
    stack: ['TypeScript', 'LangGraph', 'GitHub Copilot API', 'VS Code API', 'GenAI'],
    github: null,
    live: null,
    nda: true,
  },
  {
    id: 2,
    name: 'Release Version Tool',
    description: 'Full-stack distributed system (ReactJS + Spring Boot + Java 17) giving L3 Tech business leaders real-time visibility into deployment state, environment drift, and config discrepancies across live environments. Reduced release validation from 1.5 hours to under 5 minutes.',
    stack: ['ReactJS', 'Spring Boot', 'Java 17', 'Jenkins', 'Harness', 'UCD', 'Jira API', 'JUnit', 'Karate'],
    github: null,
    live: null,
    nda: true,
  },
  {
    id: 3,
    name: 'BERT Sentiment Chatbot',
    description: 'LLM-powered customer support chatbot using BERT-based sentiment analysis to detect emotional tone and dynamically adapt responses — reducing customer–support friction by 80% in production.',
    stack: ['Python', 'BERT', 'NLP', 'Transformer Models', 'REST APIs'],
    github: null,
    live: null,
    nda: true,
  },
  {
    id: 4,
    name: 'Smart Traffic Management System',
    description: 'Research project published in IEEE Xplore — dynamic urban traffic flow optimization using GPS-based vehicle crowd tracking and multithreaded processing with inter-process communication.',
    stack: ['Multithreading', 'IPC', 'GPS Systems', 'C++'],
    github: null,
    live: 'https://ieeexplore.ieee.org',
    nda: false,
    isPublication: true,
  },
  {
    id: 5,
    name: 'AI Portfolio Chatbot',
    description: 'RAG-powered chatbot trained on my resume and GitHub activity. Uses OpenAI embeddings + Firestore vector search to retrieve relevant context, then streams responses via Claude API through a Firebase Cloud Function.',
    stack: ['React', 'Firebase', 'Claude API', 'OpenAI Embeddings', 'RAG', 'Firestore'],
    github: 'https://github.com/harini0-0',
    live: '#',
    nda: false,
  },
];

export const techStack = [
  {
    category: 'Languages',
    skills: ['Java', 'Python', 'TypeScript', 'JavaScript', 'C++', 'Golang', 'Dart', 'SQL'],
  },
  {
    category: 'Backend & Frameworks',
    skills: ['Spring Boot', 'Node.js', 'ReactJS', 'Flutter', 'REST APIs', 'Microservices', 'AngularJS'],
  },
  {
    category: 'DevOps & CI/CD',
    skills: ['Jenkins', 'GitHub Actions', 'Harness', 'Docker', 'UCD', 'SonarQube', 'Splunk', 'ServiceNow'],
  },
  {
    category: 'Databases',
    skills: ['MySQL', 'MongoDB', 'Firebase', 'Hive', 'SQL'],
  },
  {
    category: 'AI & ML',
    skills: ['BERT', 'NLP', 'LangGraph', 'GitHub Copilot API', 'RAG', 'Claude API', 'OpenAI API', 'Sentiment Analysis'],
  },
  {
    category: 'Testing & Quality',
    skills: ['JUnit', 'Karate (AFT)', 'JaCoCo', 'PIT Mutation Testing', 'Playwright', 'TDD'],
  },
  {
    category: 'Certifications',
    skills: ['Azure Developer Associate', 'Azure AI Fundamentals', 'Google Digital Leader'],
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
    courses: ['Programming Design Paradigm', 'Database Management'],
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