// Six capability groups, evidence-based. Each carries a short description, a
// small set of selected technologies, an honest proficiency level, and proof
// points linking to case studies / experience. No progress bars, no % ratings,
// no arbitrary "expert/advanced" labels.

export type Proficiency = 'production' | 'professional' | 'current-focus' | 'working';

export interface ProofPoint {
  text: string;
  href?: string;
}

export interface Capability {
  id: string;
  label: string;
  /** lucide-react icon name */
  icon: string;
  proficiency: Proficiency;
  description: string;
  technologies: string[];
  proof: ProofPoint[];
}

export const proficiencyLabel: Record<Proficiency, string> = {
  production: 'Production experience',
  professional: 'Professional experience',
  'current-focus': 'Current focus',
  working: 'Working knowledge',
};

export const capabilities: Capability[] = [
  {
    id: 'search-query',
    label: 'Search & Query Understanding',
    icon: 'Search',
    proficiency: 'production',
    description:
      'Understanding the query before ranking, classification and out-of-distribution detection, plus the retrieval that feeds results.',
    technologies: ['Query Classification', 'OOD Detection', 'Dense Retrieval', 'Metadata Filtering', 'Vector Search', 'Ranking Signals'],
    proof: [
      { text: 'OOD classifier for e-commerce search (Samsung / Tech Mahindra)', href: '#projects' },
      { text: 'Dense retrieval + metadata filtering in multi-paper chat (Springer Nature)', href: '#projects' },
    ],
  },
  {
    id: 'llm-retrieval',
    label: 'LLM & Retrieval Systems',
    icon: 'Sparkles',
    proficiency: 'production',
    description:
      'Retrieval-augmented generation with grounding, citations, and agentic flows, built around evaluation rather than vibes.',
    technologies: ['RAG', 'HyDE', 'Dense Retrieval', 'Grounding', 'LangGraph', 'Agentic Workflows'],
    proof: [{ text: 'Multi-paper chat & evaluation on a researcher-facing AI assistant (Springer Nature)', href: '#projects' }],
  },
  {
    id: 'nlp-ml',
    label: 'NLP & Applied ML',
    icon: 'MessageSquare',
    proficiency: 'production',
    description:
      'Turning messy text into usable signals, classification, multi-label, and the applied ML around it.',
    technologies: ['Transformers', 'Text Classification', 'Multi-label Classification', 'Embeddings', 'scikit-learn'],
    proof: [{ text: 'Query understanding (Samsung); NLP & text analytics (TCS)', href: '#experience' }],
  },
  {
    id: 'cv',
    label: 'Computer Vision',
    icon: 'Eye',
    proficiency: 'production',
    description:
      'Detection and segmentation models and their evaluation, over large image volumes.',
    technologies: ['PyTorch', 'Object Detection', 'Image Segmentation', 'ONNX', 'Annotation'],
    proof: [{ text: 'Detection & segmentation for visual-pollution detection (Camcom)', href: '#projects' }],
  },
  {
    id: 'ml-apis',
    label: 'Production ML APIs',
    icon: 'Server',
    proficiency: 'production',
    description:
      'Clean services other teams build on, with caching, concurrency, and load behaviour that hold up at scale.',
    technologies: ['FastAPI', 'Uvicorn', 'REST', 'Async Python', 'Caching'],
    proof: [{ text: 'Academic question-delivery API (Springer Nature)', href: '#projects' }],
  },
  {
    id: 'deploy-eval',
    label: 'Deployment, Evaluation & Observability',
    icon: 'Container',
    proficiency: 'production',
    description:
      'Shipping to production and knowing whether it holds up, Kubernetes, load testing, monitoring, and LLM evaluation.',
    technologies: ['Docker', 'Kubernetes', 'Load Testing', 'Monitoring', 'LLM Evaluation'],
    proof: [{ text: 'Owned deployment & reliability for the question-delivery API; evaluation framework for multi-paper chat (Springer Nature)', href: '#projects' }],
  },
];
