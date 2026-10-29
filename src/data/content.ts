/**
 * All site copy lives here. Edit this file to update the portfolio.
 *
 * Inline emphasis: wrap text in **double asterisks** to render it bold/white.
 * Timing tones follow the F1 timing screen: purple = best, green = personal best, yellow = neutral.
 */

export type Tone = 'purple' | 'green' | 'yellow';

export interface Stat {
  value: string;
  unit?: string;
  label: string;
  tone: Tone;
}

export const site = {
  title: 'Avinash Kalamati — Software Development Engineer',
  description:
    'Avinash Kalamati — Software Development Engineer, Backend & AI Infrastructure. I build RAG agents and backend systems that run in production, and contribute to the open-source tools behind them.',
  locale: 'en_US',
};

export const driver = {
  name: 'Avinash Kalamati',
  firstName: 'Avinash',
  lastName: 'Kalamati',
  initials: 'AK',
  number: '01',
  role: 'Software Development Engineer',
  specialty: 'Backend & AI Infrastructure',
  location: 'Redmond, WA',
  timezone: 'UTC−07:00',
  tagline:
    'I build RAG agents and backend systems that run in production — and contribute to the open-source tools behind them.',
  currentTeam: 'Quadrant Technologies',
  currentClient: 'Microsoft',
  status: 'Open to software engineering roles',
  email: 'avinashkalamati@gmail.com',
  github: 'https://github.com/AvinashKalamati',
  linkedin: 'https://www.linkedin.com/in/avinashkalamati',
};

export const heroStats: Stat[] = [
  { value: '70', unit: '+', label: 'Production workflows owned', tone: 'green' },
  { value: '100K', unit: '+', label: 'API requests / day — Doppular', tone: 'green' },
  { value: '<200', unit: 'ms', label: 'Vector search latency', tone: 'purple' },
  { value: '1M', unit: '+', label: 'Telemetry records / day', tone: 'yellow' },
];

export const about = {
  headline: 'Fast systems. Built to finish.',
  paragraphs: [
    '**Backend and AI infrastructure is my home circuit.** At Quadrant Technologies, working for Microsoft, I build RAG agents on Azure AI Foundry with LangGraph and MCP, and own a Python / Airflow framework that keeps 70+ production workflows running.',
    'Before that I co-founded **Doppular** — a social app that matches you with people around the world who look like you — and built its distributed backend to handle 100K+ API requests a day, with vector search answering in under 200ms.',
    'My style is root-cause over patches: reproduce it first, fix where it actually breaks, and ship the regression test with the fix. Same discipline as a race weekend — preparation wins, guesswork loses.',
  ],
  /** Rendered as the F1 TV-style "driver data" sheet. */
  profile: [
    { key: 'Base', value: 'Redmond, WA' },
    { key: 'Current drive', value: 'SDE — Quadrant Technologies (client: Microsoft)' },
    { key: 'Focus', value: 'Backend · RAG · AI Agents · Data Pipelines' },
    { key: 'Stack', value: 'Python · C# · TypeScript · Azure · AWS' },
    { key: 'Open source', value: 'testcontainers · llama-agents · Azure samples' },
    { key: 'Education', value: 'M.S. Data Science, Clarkson University — GPA 3.8' },
    { key: 'Also', value: 'B.Tech Computer Science, JNTUK' },
    { key: 'Off track', value: 'Bikes · Cars · Anything with a throttle' },
  ],
};

export interface Round {
  id: string;
  round: string;
  tag: string;
  role: string;
  company: string;
  client?: string;
  dates: string;
  current?: boolean;
  summary?: string;
  quote?: string;
  bullets: string[];
  stats: Stat[];
  chips: string[];
}

export const experience: { lede: string; rounds: Round[] } = {
  lede: 'Four drives, real numbers. Every result below shipped to production or publication.',
  rounds: [
    {
      id: 'quadrant',
      round: '01',
      tag: 'Current',
      role: 'Software Development Engineer',
      company: 'Quadrant Technologies',
      client: 'Microsoft',
      dates: 'Jun 2025 — Present',
      current: true,
      bullets: [
        'RAG agents on **Azure AI Foundry with LangGraph & MCP** — manual lookup time **down 30%**.',
        'Owns a **Python / Airflow framework running 70+ production workflows**.',
        'C# / .NET compatibility tooling cut Windows runtime issues **27% (300 → 219/month)** across 23 device configs.',
        'Environment-drift automation cut drift defects **40%**; SonarQube / Bandit gates + Grafana alerts cut deployment errors **25%**.',
      ],
      stats: [
        { value: '−40', unit: '%', label: 'Drift defects', tone: 'purple' },
        { value: '−30', unit: '%', label: 'Manual lookup time', tone: 'green' },
        { value: '−27', unit: '%', label: 'Windows runtime issues', tone: 'green' },
        { value: '−25', unit: '%', label: 'Deployment errors', tone: 'green' },
        { value: '70', unit: '+', label: 'Production workflows', tone: 'yellow' },
      ],
      chips: ['Azure AI Foundry', 'LangGraph', 'MCP', 'Airflow', 'C# / .NET'],
    },
    {
      id: 'doppular',
      round: '02',
      tag: 'Founder',
      role: 'Co-Founder',
      company: 'Doppular',
      dates: 'Social · Matching',
      summary:
        'A social app that matches you with people around the world who have similar faces —',
      quote: 'alike in looks, unique in life.',
      bullets: [
        'Multi-tier distributed backend sustaining **100K+ API requests/day** — Node.js, TypeScript, Express, MongoDB, Redis, BullMQ.',
        'Python **FastAPI + Milvus** HNSW vector-search microservice at **sub-200ms** latency.',
        'AWS (EC2, S3, CloudFront, KMS) with Docker and Kubernetes.',
      ],
      stats: [
        { value: '<200', unit: 'ms', label: 'Vector search', tone: 'purple' },
        { value: '100K', unit: '+', label: 'API requests / day', tone: 'green' },
        { value: 'HNSW', label: 'Milvus index', tone: 'yellow' },
      ],
      chips: ['Node.js', 'FastAPI', 'Milvus', 'Redis', 'Kubernetes'],
    },
    {
      id: 'skipline',
      round: '03',
      tag: 'Intern',
      role: 'Software Engineer Intern',
      company: 'Skipline',
      dates: 'May 2024 — May 2025',
      bullets: [
        'Telemetry ingestion at **1M+ records/day**, with ingestion failures **down 30%**.',
        'PySpark / SQL pipelines made **20% faster**.',
      ],
      stats: [
        { value: '1M', unit: '+', label: 'Records / day', tone: 'purple' },
        { value: '−30', unit: '%', label: 'Ingestion failures', tone: 'green' },
        { value: '+20', unit: '%', label: 'Pipeline speed', tone: 'green' },
      ],
      chips: ['PySpark', 'SQL', 'Telemetry'],
    },
    {
      id: 'clarkson',
      round: '04',
      tag: 'Research',
      role: 'Research Assistant',
      company: 'Clarkson University',
      dates: 'Sep 2023 — May 2024',
      bullets: [
        'PyTorch / scikit-learn pipelines reaching up to **98.4% balanced accuracy**.',
        'Published in **Machine Learning with Applications**.',
      ],
      stats: [
        { value: '98.4', unit: '%', label: 'Balanced accuracy', tone: 'purple' },
        { value: '1', label: 'Journal publication', tone: 'yellow' },
      ],
      chips: ['PyTorch', 'scikit-learn', 'Published'],
    },
  ],
};

export interface SkillGroup {
  id: string;
  part: string;
  name: string;
  note: string;
  items: { name: string; core?: boolean }[];
}

export const skills: { lede: string; groups: SkillGroup[] } = {
  lede: "Read it like a car setup sheet — what's under the bodywork, grouped the way I'd actually reach for it on a build.",
  groups: [
    {
      id: 'power-unit',
      part: 'Power Unit',
      name: 'Languages',
      note: 'The engine',
      items: [
        { name: 'Python', core: true },
        { name: 'Java' },
        { name: 'C#', core: true },
        { name: 'C++' },
        { name: 'TypeScript', core: true },
        { name: 'SQL' },
      ],
    },
    {
      id: 'chassis',
      part: 'Chassis',
      name: 'Backend & Data',
      note: 'Structure & handling',
      items: [
        { name: 'REST APIs' },
        { name: 'Microservices' },
        { name: 'Kafka' },
        { name: 'Redis' },
        { name: 'PostgreSQL' },
        { name: 'MongoDB' },
        { name: 'Apache Airflow', core: true },
        { name: 'Node.js' },
        { name: 'FastAPI' },
      ],
    },
    {
      id: 'aero',
      part: 'Aero',
      name: 'Cloud & DevOps',
      note: 'Downforce & delivery',
      items: [
        { name: 'AWS' },
        { name: 'Azure DevOps' },
        { name: 'Docker' },
        { name: 'Kubernetes' },
        { name: 'Grafana' },
        { name: 'CI/CD' },
        { name: 'Git' },
      ],
    },
    {
      id: 'electronics',
      part: 'Electronics',
      name: 'AI & Agents',
      note: 'Telemetry & brain',
      items: [
        { name: 'RAG', core: true },
        { name: 'AI Agents', core: true },
        { name: 'MCP', core: true },
        { name: 'LangGraph', core: true },
        { name: 'Azure AI Foundry' },
        { name: 'Azure AI Search' },
        { name: 'GenAI' },
      ],
    },
  ],
};

export interface Contribution {
  position: string;
  label: string;
  title: string;
  repo: string;
  ref: string;
  href: string;
  linkLabel: string;
  description: string;
  status: string;
  statusTone: Tone;
}

export const openSource: { lede: string; podium: Contribution[]; pitLane: Contribution[] } = {
  lede: 'Open-source results — called exactly as they stand. None of these are merged yet; the approvals, green CI, and downstream validation below are the real scoreboard.',
  podium: [
    {
      position: 'P1',
      label: 'Flagship build',
      title: 'New GcsContainer module',
      repo: 'testcontainers-python',
      ref: 'PR #1145',
      href: 'https://github.com/testcontainers/testcontainers-python/pull/1145',
      linkLabel: 'View PR',
      description:
        'A brand-new fake-gcs-server container module for the testcontainers ecosystem — my first open-source PR. Approved by a maintainer and validated downstream in the panodata/omniload suite, where all 3 GCS integration cases passed unchanged as a drop-in replacement.',
      status: 'Review approved · Downstream validated',
      statusTone: 'green',
    },
    {
      position: 'P2',
      label: 'All green',
      title: 'Reranker-score filtering fix',
      repo: 'Azure-Samples/azure-search-openai-demo',
      ref: 'PR #3250',
      href: 'https://github.com/Azure-Samples/azure-search-openai-demo/pull/3250',
      linkLabel: 'View PR',
      description:
        'On the free Azure AI Search tier, results without a reranker score were treated as 0 and filtered out — so search returned nothing. This fix keeps those results. Microsoft CLA signed.',
      status: 'All 21 CI checks green',
      statusTone: 'green',
    },
    {
      position: 'P3',
      label: 'Root-cause fix',
      title: 'PickleSerializer round-trip fix',
      repo: 'run-llama/llama-agents',
      ref: 'PR #838',
      href: 'https://github.com/run-llama/llama-agents/pull/838',
      linkLabel: 'View PR',
      description:
        '“SwEu” was deserializing to 1 — deserialization tried pickle before JSON and base64 decoding lacked validation. My fix addresses the root cause, not just the symptom, and ships with regression tests. The most complete of three competing fixes.',
      status: 'Open · Fix + regression tests',
      statusTone: 'yellow',
    },
  ],
  pitLane: [
    {
      position: 'WIP',
      label: 'On the surrounds',
      title: 'Functional API resume / task replay',
      repo: 'langchain-ai/langgraph',
      ref: 'Issue #9475',
      href: 'https://github.com/langchain-ai/langgraph/issues/9475',
      linkLabel: 'View issue',
      description:
        'Claimed and in progress: on resume, the Functional API re-runs a @task whose exception the entrypoint already caught, instead of replaying its recorded outcome. Checkpoint / task-replay semantics, with a self-contained repro using InMemorySaver.',
      status: 'Claimed · Fix in progress',
      statusTone: 'yellow',
    },
  ],
};

export const paddock = {
  headline: 'Bikes, cars & anything with a throttle',
  body: "Off the clock I'm an autophile through and through — superbikes, race liveries, carbon everything. Sport is the mindset I bring to code too: train, measure, shave the lap time, repeat.",
  target: 'Current target — first motorcycle · saving in progress',
  imageAlt: 'Illustration of a rider on a sport motorcycle leaning into a racetrack corner',
};

export const contact = {
  headline: 'Radio check. I’m listening.',
  message:
    'Open to software engineering roles — backend, AI infrastructure, and platform work. Fastest way to reach me is email or LinkedIn; my code is all on GitHub.',
  channels: [
    {
      kind: 'Email',
      label: 'Team radio',
      value: 'avinashkalamati@gmail.com',
      href: 'mailto:avinashkalamati@gmail.com',
      note: 'Best for roles & referrals',
      external: false,
    },
    {
      kind: 'LinkedIn',
      label: 'Pit wall',
      value: 'linkedin.com/in/avinashkalamati',
      href: 'https://www.linkedin.com/in/avinashkalamati',
      note: 'Greater Seattle Area',
      external: true,
    },
    {
      kind: 'GitHub',
      label: 'Garage',
      value: 'github.com/AvinashKalamati',
      href: 'https://github.com/AvinashKalamati',
      note: 'PRs, forks & the full build log',
      external: true,
    },
  ],
};

/** Slide order. `kicker` is the F1 label; `title` is the plain section name recruiters scan for. */
export const slides = [
  { id: 'home', kicker: 'Lights Out', title: 'Home', code: 'HOME' },
  { id: 'driver', kicker: 'Driver Profile', title: 'About', code: 'DRIVER' },
  { id: 'experience', kicker: 'Race Calendar', title: 'Experience', code: 'CALENDAR' },
  { id: 'skills', kicker: 'Car Setup', title: 'Skills', code: 'SETUP' },
  { id: 'open-source', kicker: 'Podium', title: 'Open Source', code: 'PODIUM' },
  { id: 'paddock', kicker: 'Paddock', title: 'Off Track', code: 'PADDOCK' },
  { id: 'contact', kicker: 'Team Radio', title: 'Contact', code: 'RADIO' },
] as const;

export type SlideId = (typeof slides)[number]['id'];

export const liveries = [
  { id: 'red', name: 'Race red', accent: '#E10600', ink: '#FFFFFF' },
  { id: 'orange', name: 'Orange', accent: '#FF8000', ink: '#0B0B0C' },
  { id: 'teal', name: 'Teal', accent: '#00D2BE', ink: '#0B0B0C' },
  { id: 'silver', name: 'Silver', accent: '#C8CCD0', ink: '#0B0B0C' },
] as const;

export type LiveryId = (typeof liveries)[number]['id'];
