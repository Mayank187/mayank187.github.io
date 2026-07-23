import { yearsLabel } from "../utils/experience";

// Computed once at load from June 2019, stays current without manual edits.
const YEARS = yearsLabel();

export const profile = {
  name: "Mayank Khandelwal",
  title: "Senior AI/ML Engineer",
  // Stable one-line positioning statement used by the hero. Keep it concrete.
  positioning:
    "Senior AI/ML Engineer building production search, retrieval, NLP, and LLM systems.",
  tagline: `${YEARS} across academic publishing, e-commerce search, computer vision, and applied ML.`,
  location: "Pune, India",
  email: "mayankkhandelwal187@gmail.com",
  github: "https://github.com/Mayank187",
  linkedin: "https://www.linkedin.com/in/aiwithmayank/",
  resumePath: "/resume.pdf",
  // Softer than "Available for Hire"; advertises openness without a sales pitch.
  availability: "Not actively looking, but open to meaningful conversations",
  about: [
    `I'm a Senior AI/ML Engineer with ${YEARS} of experience building search, retrieval, NLP, and computer vision systems that run in production, not just in notebooks.`,
    "My focus is the engineering around models: retrieval quality, evaluation, clean APIs, serving constraints, and the reliability work that decides whether an ML system holds up once real traffic reaches it.",
    "At Springer Nature I'm a core AI/ML engineer on a researcher-facing AI assistant (beta), technical review, multi-paper chat, and its evaluation framework, and I separately own a production academic-question API. Before that I owned the out-of-domain query classifier for e-commerce search at Samsung Research India (through Tech Mahindra), owned computer vision detection and segmentation models at Camcom, and delivered NLP and analytics across Tata Consultancy Services.",
    "I care most about systems that survive contact with production: measured retrieval, honest evaluation, sensible latency and cost trade-offs, and APIs other teams can build on.",
  ],
  // Kept short and forward-looking; deliberately does not restate the
  // Capabilities section. See src/data/skills.ts.
  currentFocus: [
    "Retrieval quality & evaluation",
    "LLM systems in production",
    "Agentic workflows",
  ],
  // Honest, repo-verifiable highlights in natural language, not marketing
  // category counts. Each is derivable from experience and real credentials.
  metrics: [
    { label: YEARS, sublabel: "Applied AI/ML" },
    { label: "Search · NLP · RAG · CV", sublabel: "Professional domains" },
    { label: "Production APIs · ML deployment", sublabel: "Engineering focus" },
    { label: "2 peer-reviewed papers", sublabel: "Undergraduate research" },
  ],
} as const;
