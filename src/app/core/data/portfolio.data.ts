// Single source of truth for all portfolio content.
// Edit this file to update the site — components only render what is here.

export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  highlights: string[];
  stack: string[];
}

export interface ProjectFeature {
  icon: string;
  title: string;
  text: string;
}

export interface Project {
  name: string;
  tagline: string;
  category: string;
  status: 'Live' | 'In development' | 'Shipped';
  company?: string;
  /** My own product (shown with a founder badge). */
  ownProduct?: boolean;
  /** Built for a client (shown with a client badge). */
  client?: boolean;
  link?: string;
  accent: string;
  accent2: string;
  icon: string;
  description: string;
  contribution: string[];
  features: ProjectFeature[];
  stack: string[];
}

export interface SkillGroup {
  title: string;
  icon: string;
  items: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
  score: string;
}

export const PROFILE = {
  name: 'Nitesh Kaushik',
  firstName: 'Nitesh',
  title: 'Full Stack Engineer',
  roles: [
    'Full Stack Engineer',
    'MERN & MEAN Stack Developer',
    'Scalable Systems Builder',
    'Android & iOS App Developer',
  ],
  summary:
    'Full Stack Developer with 3+ years of experience building scalable web apps, POS systems, admin portals, and social platforms. Proficient in Angular, React.js, Node.js, and MongoDB. Experienced in real-time systems (WebRTC, WebSockets), containerization (Docker), and caching (Redis), BullMQ.',
  about: [
    'I build products end to end — from the database schema and REST APIs to pixel-perfect interfaces on web and mobile. Over the last three years I have shipped a restaurant POS used in live service, an AI form builder, a project-management SaaS for a client, an on-demand staffing marketplace and a live-streaming social platform.',
    'I enjoy the hard parts: real-time order and chat pipelines, low-latency video with WebRTC and mediasoup, role-based security, payments, and keeping systems fast with Redis and background queues. I care about clean architecture and shipping software teams can rely on — and I work directly with clients, from gathering requirements and running demos to turning feedback into releases.',
  ],
  location: 'Samastipur, Bihar, India',
  email: 'nitesh2kaushik@gmail.com',
  phone: '+91 6203716045',
  phoneHref: 'tel:+916203716045',
  resume: 'assets/Nitesh_Kaushik_Resume.pdf',
  photo: 'assets/images/picc.jpg',
  socials: [
    {
      label: 'LinkedIn',
      icon: 'fab fa-linkedin-in',
      url: 'https://www.linkedin.com/in/nitesh-kaushik-06a236234/',
    },
    {
      label: 'GitHub',
      icon: 'fab fa-github',
      url: 'https://github.com/Nitesh0210kaushik',
    },
    {
      label: 'Email',
      icon: 'fas fa-envelope',
      url: 'mailto:nitesh2kaushik@gmail.com',
    },
  ],
  stats: [
    { value: '3+', label: 'Years experience' },
    { value: '7+', label: 'Products built' },
    { value: '3', label: 'Companies' },
  ],
};

export const EXPERIENCE: Experience[] = [
  {
    company: 'VelocionTech Pvt. Ltd',
    role: 'Software Development Engineer - I',
    period: 'Jul 2025 – Jun 2026',
    highlights: [
      'Developing scalable web and mobile apps using React.js, Nest.js, and MongoDB.',
      'Worked on the Ovoform product (AI form builder) using React, Node.js, Express, and PostgreSQL.',
      'Built SpectC, a client project-management SaaS, in React with Supabase — and handled the client directly: requirements, demos and feedback.',
      'Implementing authentication, authorization, secure API handling, and live streaming features.',
      'Contributing to React Native mobile app development for Android and iOS platforms.',
    ],
    stack: ['React.js', 'Nest.js', 'Node.js', 'Supabase', 'PostgreSQL', 'MongoDB', 'React Native'],
  },
  {
    company: 'DemenewTech Pvt. Ltd',
    role: 'MEAN Stack Developer',
    period: 'Sep 2023 – May 2025',
    highlights: [
      'Developed and maintained MenewConnect — a robust restaurant POS and Admin Portal.',
      'Built real-time features like live order tracking and cart updates using Angular 16.',
      'Designed scalable REST APIs using Node.js, Express.js, and MongoDB.',
      'Integrated payment gateways and implemented role-based authentication.',
    ],
    stack: ['Angular 16', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
  },
  {
    company: 'Korecent Solutions Pvt. Ltd',
    role: 'Full Stack Developer Intern — ERPNext / Frappe',
    period: 'Apr 2023 – Aug 2023',
    highlights: [
      'Customized ERPNext modules using the Frappe framework — built DocTypes, server scripts, and client-side hooks.',
      'Developed frontend UI in HTML/JS and backend logic in Python (Frappe ORM) for business ERP workflows.',
      'Automated business processes, reducing manual data entry effort for clients.',
    ],
    stack: ['Python', 'Frappe', 'ERPNext', 'JavaScript'],
  },
];

export const PROJECTS: Project[] = [
  {
    name: 'CD4 AI',
    tagline: 'AI + human care flow for smarter patient care.',
    category: 'HealthTech · Android & iOS App',
    status: 'In development',
    ownProduct: true,
    link: 'https://cd4.co.in',
    accent: '#10b981',
    accent2: '#06b6d4',
    icon: 'fas fa-heart-pulse',
    description:
      'My own product — an India-wide AI healthcare platform, shipping as native Android & iOS apps. Patients describe symptoms by voice in Hindi or English, book doctor appointments by voice, and share an AI-structured symptom history so doctors walk into every visit with full context.',
    contribution: [
      'Building the Android & iOS apps end to end — patient and doctor experiences.',
      'Voice-first appointment booking and AI-generated symptom snapshots.',
      'Report & prescription intelligence, follow-up care chat and hospital onboarding.',
    ],
    features: [
      { icon: 'fas fa-microphone', title: 'Voice booking', text: 'Book appointments by speaking — Hindi & English.' },
      { icon: 'fas fa-notes-medical', title: 'AI history snapshot', text: 'Structured symptom summary before the visit.' },
      { icon: 'fas fa-mobile-screen', title: 'Android & iOS', text: 'Native mobile apps for patients and doctors.' },
    ],
    stack: ['React Native', 'Android', 'iOS', 'Node.js', 'AI / Voice'],
  },
  {
    name: 'Ovoform',
    tagline: 'Type it. AI builds your form.',
    category: 'AI SaaS · Form Builder',
    status: 'Live',
    company: 'VelocionTech',
    link: 'https://ovoform.com',
    accent: '#8b5cf6',
    accent2: '#ec4899',
    icon: 'fas fa-wand-magic-sparkles',
    description:
      'An AI-powered form builder that turns a plain-language prompt into high-converting forms, surveys and quizzes in seconds — with workflow automation, real-time analytics and integrations with 5,000+ apps.',
    contribution: [
      'Built product features across the React frontend and Node.js / Express backend.',
      'Worked with PostgreSQL data models for forms, responses and workspaces.',
      'Implemented authentication, authorization and secure API handling.',
      'Built 3rd-party integrations so form responses flow straight into the apps teams already use.',
      'Built web scraping with OpenAI and Tesseract OCR to turn web pages, images and scans into structured data.',
    ],
    features: [
      { icon: 'fas fa-bolt', title: 'Prompt to form', text: 'Generate a complete form from natural language in ~8 seconds.' },
      { icon: 'fas fa-diagram-project', title: 'Automations', text: 'Trigger emails, CRM updates and notifications on submit.' },
      { icon: 'fas fa-chart-line', title: 'Analytics', text: 'Completion rates, drop-off and response insights in real time.' },
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'OpenAI', 'Tesseract OCR', 'Webhooks'],
  },
  {
    name: 'SpectC',
    tagline: 'Execution intelligence for project management.',
    category: 'Project Management SaaS · AI',
    status: 'Live',
    client: true,
    company: 'VelocionTech',
    link: 'https://www.spectc.app',
    accent: '#6366f1',
    accent2: '#0ea5e9',
    icon: 'fas fa-diagram-project',
    description:
      'A multi-tenant project-management SaaS where teams run workspaces, projects, tasks and releases — with budgets, risk management, PMO templates, daily priority digests and Ace, an AI co-pilot that summarizes updates and suggests task improvements.',
    contribution: [
      'Built product features in React on Supabase — auth, realtime updates and Postgres.',
      'Worked across workspaces & roles, projects, tasks and release planning modules.',
      'Handled the client directly — requirements, progress demos and turning feedback into releases.',
    ],
    features: [
      { icon: 'fas fa-robot', title: 'Ace AI co-pilot', text: 'Summaries and task suggestions inside the app.' },
      { icon: 'fas fa-rocket', title: 'Releases & PMO', text: 'Release windows, managers and PMO templates.' },
      { icon: 'fas fa-shield-halved', title: 'Risk & budget', text: 'On Track / At Risk status, estimated vs actual spend.' },
    ],
    stack: ['React.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    name: 'ShiftPunch',
    tagline: 'Last-minute restaurant shifts, filled in seconds.',
    category: 'Marketplace · Mobile App',
    status: 'Live',
    company: 'VelocionTech',
    link: 'https://shiftpunch.com',
    accent: '#f97316',
    accent2: '#facc15',
    icon: 'fas fa-business-time',
    description:
      'A staffing marketplace that connects restaurants with servers looking for short-term and last-minute shifts. Restaurants post open shifts, review applicants and pay in-app; workers pick up shifts from their phone on Android and iOS.',
    contribution: [
      'Built the cross-platform (Android & iOS) app in React Native for real-time shift posting and tracking.',
      'Integrated Firebase for authentication and real-time updates.',
      'Integrated Stripe for in-app payment processing when a worker is accepted.',
    ],
    features: [
      { icon: 'fas fa-calendar-plus', title: 'Post a shift', text: 'Roles, quantities, timeframe and dress code in one flow.' },
      { icon: 'fas fa-user-check', title: 'Review & hire', text: 'Browse available staff and accept applications live.' },
      { icon: 'fas fa-credit-card', title: 'Stripe payments', text: 'Secure payment the moment a worker is confirmed.' },
    ],
    stack: ['React Native', 'Firebase', 'Stripe', 'Node.js'],
  },
  {
    name: 'MenewConnect',
    tagline: 'Restaurant POS & Admin Portal.',
    category: 'Restaurant POS · SaaS',
    status: 'Shipped',
    company: 'DemenewTech',
    link: 'https://hub-staging.menew.in/?rid=5fce26e7e1d68a177425b007',
    accent: '#3b82f6',
    accent2: '#22d3ee',
    icon: 'fas fa-utensils',
    description:
      'A full-featured restaurant POS with menu management, QR-based ordering, cart, waiter tracking and an admin dashboard with analytics for day-to-day restaurant operations.',
    contribution: [
      'Built real-time order updates using Angular 16, Node.js, Express.js and MongoDB.',
      'Implemented role-based access control across POS and admin users.',
      'Integrated the payment gateway and the admin analytics panel.',
    ],
    features: [
      { icon: 'fas fa-qrcode', title: 'QR ordering', text: 'Guests scan, browse the menu and order from their phone.' },
      { icon: 'fas fa-receipt', title: 'Live POS', text: 'Real-time billing, kitchen tickets and payments.' },
      { icon: 'fas fa-gauge-high', title: 'Admin portal', text: 'Analytics, menu control and role-based access.' },
    ],
    stack: ['Angular 16', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
  },
  {
    name: 'Social',
    tagline: 'Social media & live streaming platform (MERN).',
    category: 'Social · Real-time · Streaming',
    status: 'Shipped',
    accent: '#ef4444',
    accent2: '#a855f7',
    icon: 'fas fa-tower-broadcast',
    description:
      'A full-featured social platform with posts, likes, comments, a friend system, messaging, live streaming and payments — built for scalable, low-latency multi-user broadcasts.',
    contribution: [
      'Implemented live video streaming using WebRTC + mediasoup (SFU).',
      'Built real-time chat over WebSockets — instant messaging, typing indicators and online presence.',
      'Added Redis caching for feeds and session tokens; containerized services with Docker & Docker Compose.',
    ],
    features: [
      { icon: 'fas fa-video', title: 'Live streaming', text: 'WebRTC + mediasoup SFU for multi-user broadcasts.' },
      { icon: 'fas fa-comments', title: 'Real-time chat', text: 'Typing indicators and online presence over WebSockets.' },
      { icon: 'fab fa-docker', title: 'Dockerized', text: 'Separate services for frontend, backend and database.' },
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebRTC', 'mediasoup', 'WebSockets', 'Redis', 'Docker', 'JWT'],
  },
];

export const SIDE_PROJECTS = [
  {
    name: 'E web — E-Commerce Website',
    text: 'MERN e-commerce store with authentication, Redux cart and a responsive UI.',
    link: 'https://transcendent-klepon-0a22e6.netlify.app/',
    stack: ['React.js', 'Redux', 'Node.js', 'MongoDB'],
  },
  {
    name: 'Automatic Certificate Generator',
    text: 'Python tool that bulk-generates personalised certificates with PIL and SQL.',
    stack: ['Python', 'PIL', 'SQLite'],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Frontend',
    icon: 'fas fa-display',
    items: ['Angular', 'React.js', 'React Native', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    icon: 'fas fa-server',
    items: ['Node.js', 'Express.js', 'Nest.js', 'RESTful APIs', 'Firebase', 'Supabase'],
  },
  { title: 'Database', icon: 'fas fa-database', items: ['MongoDB', 'SQL', 'PostgreSQL'] },
  {
    title: 'Real-time',
    icon: 'fas fa-satellite-dish',
    items: ['WebRTC', 'mediasoup', 'WebSockets', 'Redis', 'BullMQ'],
  },
  {
    title: 'AI & Integrations',
    icon: 'fas fa-plug-circle-bolt',
    items: ['OpenAI', 'Claude API', 'Google Sheets', 'Excel', 'HubSpot', 'Airtable', 'Zapier', 'Web Scraping', 'Tesseract OCR'],
  },
  { title: 'Web3', icon: 'fab fa-ethereum', items: ['Ethereum', 'Solidity', 'Ethers.js', 'Web3.js', 'IPFS'] },
  { title: 'DevOps & Tools', icon: 'fas fa-cubes', items: ['Docker', 'Docker Compose', 'Git', 'GitHub', 'Postman'] },
  {
    title: 'Other',
    icon: 'fas fa-brain',
    items: ['Data Structures & Algorithms', 'Software Engineering', 'Python', 'Frappe / ERPNext'],
  },
];

export const EDUCATION: Education[] = [
  { degree: 'MCA', school: 'Invertis University', year: '2023', score: '76%' },
  { degree: 'B.Sc. — Mathematics (Hons)', school: 'LNMU University', year: '2020', score: '75%' },
  { degree: '12th', school: 'BSEB Board', year: '2017', score: '67.6%' },
  { degree: '10th', school: 'CBSE Board', year: '2015', score: '9.8 CGPA' },
];

export interface TerminalLine {
  kind: 'info' | 'ok';
  text: string;
}

export interface Service {
  title: string;
  short: string;
  icon: string;
  accent: string;
  accent2: string;
  points: string[];
  stack: string[];
  /** Which tool the terminal demo shows. */
  tool: string;
  prompt: string;
  lines: TerminalLine[];
  result: string;
}

/** "What I build" — shown as an interactive terminal that builds each capability live. */
export const SERVICES: Service[] = [
  {
    title: 'Android & iOS Apps',
    short: 'Cross-platform mobile apps with React Native — one codebase, native feel on both stores.',
    icon: 'fas fa-mobile-screen-button',
    accent: '#22d3ee',
    accent2: '#3ddc84',
    points: [
      'React Native apps for Android & iOS, from first screen to store release',
      'Firebase & Supabase — auth, realtime data, storage and push notifications',
      'Stripe in-app payments, offline-friendly flows and smooth animations',
    ],
    stack: ['React Native', 'Android', 'iOS', 'Firebase', 'Supabase', 'Stripe'],
    tool: 'claude-code',
    prompt: 'claude "add Supabase auth + push notifications to the app"',
    lines: [
      { kind: 'info', text: 'Reading app/navigation and screens…' },
      { kind: 'ok', text: 'supabase.auth wired into LoginScreen.tsx' },
      { kind: 'ok', text: 'Firebase Cloud Messaging registered (Android + iOS)' },
      { kind: 'ok', text: 'Protected routes via <AuthProvider />' },
    ],
    result: 'Builds ready → Android .aab · iOS .ipa',
  },
  {
    title: 'MERN & MEAN Products',
    short: 'Complete products from schema to UI — React or Angular on Node.js, Express & MongoDB.',
    icon: 'fas fa-layer-group',
    accent: '#4db33d',
    accent2: '#61dafb',
    points: [
      'SaaS dashboards, POS systems, admin portals and marketplaces',
      'Secure REST APIs with JWT, role-based access and validation',
      'Real-time updates over WebSockets — live orders, chat, presence',
    ],
    stack: ['MongoDB', 'Express.js', 'React.js', 'Angular', 'Node.js', 'JWT'],
    tool: 'codex',
    prompt: 'codex "scaffold orders module: schema, REST API, admin table"',
    lines: [
      { kind: 'info', text: 'Planning module structure…' },
      { kind: 'ok', text: 'models/order.model.ts — Mongoose schema + indexes' },
      { kind: 'ok', text: 'routes/orders.ts — CRUD + role-based guard' },
      { kind: 'ok', text: 'admin/orders.component.ts — live table via WebSocket' },
    ],
    result: 'Tests passing · deployed to staging',
  },
  {
    title: 'Scalable Backends',
    short: 'Nest.js & Node.js services designed to stay fast and reliable as traffic grows.',
    icon: 'fas fa-server',
    accent: '#e0234e',
    accent2: '#ff4438',
    points: [
      'Modular Nest.js APIs with clean architecture and typed contracts',
      'Redis caching, BullMQ background queues and PostgreSQL / MongoDB modelling',
      'Dockerized services, WebSockets and WebRTC for real-time features',
    ],
    stack: ['Nest.js', 'Node.js', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker'],
    tool: 'zsh',
    prompt: 'docker compose up --scale api=4',
    lines: [
      { kind: 'ok', text: 'api (Nest.js) × 4 — healthy' },
      { kind: 'ok', text: 'redis — cache warmed' },
      { kind: 'ok', text: 'bullmq workers — 3 queues processing' },
      { kind: 'ok', text: 'postgres — migrations applied' },
    ],
    result: 'Load test passed · zero downtime',
  },
  {
    title: 'AI Integration',
    short: 'Real AI features inside your product with the OpenAI and Claude APIs.',
    icon: 'fas fa-brain',
    accent: '#d97757',
    accent2: '#a78bfa',
    points: [
      'Assistants, chatbots and smart search grounded in your data',
      'Voice to structured data — like CD4’s AI symptom snapshots',
      'Summaries, extraction and AI generation — like Ovoform’s prompt-to-form',
    ],
    stack: ['OpenAI', 'Claude API', 'Nest.js', 'Node.js', 'React Native'],
    tool: 'claude-code',
    prompt: 'claude "add a streaming AI summary endpoint to the API"',
    lines: [
      { kind: 'info', text: 'Inspecting src/modules…' },
      { kind: 'ok', text: 'POST /ai/summarize — Nest.js controller + service' },
      { kind: 'ok', text: 'Streams tokens to the app in real time' },
      { kind: 'ok', text: 'Output validated against a JSON schema' },
    ],
    result: 'AI feature live in the app',
  },
  {
    title: 'AI-Powered Development',
    short: 'I pair with AI coding agents to ship faster — while I own the architecture and every line.',
    icon: 'fas fa-wand-magic-sparkles',
    accent: '#7c5cff',
    accent2: '#d97757',
    points: [
      'Claude Code & Codex for scaffolding, refactors, tests and reviews',
      'I design the system, review every change and keep quality high',
      'Faster delivery — features in days, not weeks',
    ],
    stack: ['Claude Code', 'Codex', 'Git', 'GitHub'],
    tool: 'claude-code',
    prompt: 'claude "refactor the checkout flow, add tests, open a PR"',
    lines: [
      { kind: 'info', text: 'Analyzing the codebase…' },
      { kind: 'ok', text: 'CheckoutService split into smaller units' },
      { kind: 'ok', text: 'Unit tests added — all green' },
      { kind: 'ok', text: 'Pull request opened for review' },
    ],
    result: 'Reviewed & merged by Nitesh',
  },
];

export interface Capability {
  title: string;
  icon: string;
  accent: string;
  text: string;
  stack: string[];
}

/** "AI & Web3" — apps that think, connect to the tools a business already uses, and run on-chain. */
export const INTEGRATIONS = {
  /** Apps orbiting the AI core in the integration hub (label = tech-logo name). */
  hub: [
    { label: 'Google Sheets', color: '#34a853' },
    { label: 'HubSpot', color: '#ff7a59' },
    { label: 'Airtable', color: '#18bfff' },
    { label: 'Zapier', color: '#ff4f00' },
    { label: 'Excel', color: '#21a366' },
    { label: 'Gmail', color: '#ea4335' },
    { label: 'n8n', color: '#ea4b71' },
    { label: 'Make', color: '#a35cff' },
  ],
  /** Example automations cycled under the hub. */
  flows: [
    { from: 'New form response', to: 'Google Sheets row added' },
    { from: 'Lead scored by OpenAI', to: 'HubSpot contact created' },
    { from: 'Airtable record updated', to: 'Zapier → team notified' },
    { from: 'Weekly report built', to: 'Excel file emailed' },
  ],
  capabilities: [
    {
      title: 'AI-powered apps',
      icon: 'fas fa-brain',
      accent: '#a78bfa',
      text: 'Chatbots, assistants, smart search and AI agents built on OpenAI and Claude, using your own data to answer and act.',
      stack: ['OpenAI', 'Claude API', 'Node.js', 'React.js'],
    },
    {
      title: '3rd-party integrations & automation',
      icon: 'fas fa-plug-circle-bolt',
      accent: '#ff7a59',
      text: 'I connect your app or AI workflow to Excel, Google Sheets, HubSpot, Airtable and Zapier, so leads, responses and reports sync automatically with no copy-paste.',
      stack: ['Google Sheets', 'Excel', 'HubSpot', 'Airtable', 'Zapier', 'Webhooks'],
    },
    {
      title: 'Web scraping & OCR',
      icon: 'fas fa-spider',
      accent: '#22d3ee',
      text: 'Scrapers collect data from the web and Tesseract OCR reads images and scanned documents. OpenAI then turns the raw text into clean, structured data.',
      stack: ['Web Scraping', 'Tesseract OCR', 'OpenAI', 'Node.js'],
    },
  ] as Capability[],
  blockchain: {
    title: 'Blockchain & decentralised systems',
    text: 'Smart contracts and dApps for products that need trust without a middleman: transparent, tamper-proof records on-chain, wallet-based login and files stored on IPFS.',
    points: [
      'Smart contracts in Solidity: tested, secure and gas-efficient',
      'dApp frontends with wallet connect through Ethers.js / Web3.js',
      'On-chain records with decentralised file storage on IPFS',
    ],
    stack: ['Ethereum', 'Solidity', 'Ethers.js', 'Web3.js', 'Polygon', 'IPFS'],
  },
  /** Real work this section is backed by. */
  caseStudy: {
    name: 'Ovoform',
    items: [
      { icon: 'fas fa-plug', title: '3rd-party integrations', text: 'Form responses flow straight into the apps teams already use.' },
      { icon: 'fas fa-spider', title: 'Web scraping + OpenAI', text: 'Pulled content from the web and used OpenAI to structure it.' },
      { icon: 'fas fa-file-image', title: 'Tesseract OCR', text: 'Extracted text from images and scanned documents.' },
    ],
  },
};
