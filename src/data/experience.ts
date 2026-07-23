export interface Experience {
  id: string;
  /** Legal employer. */
  company: string;
  /** End client, when the role was delivered through a services/staffing employer. */
  client?: string;
  role: string;
  duration: string;
  location: string;
  domain: string;
  summary: string;
  bullets: string[];
  tags: string[];
}

// Honesty note: bullets state personal ownership, personal contribution, and
// wider-team/system outcomes distinctly. No invented scale, tools, or metrics.
export const experiences: Experience[] = [
  {
    id: 'springer',
    company: 'Springer Nature',
    role: 'Senior AI/ML Engineer',
    duration: 'Oct 2025 – Present',
    location: 'Pune, India',
    domain: 'Researcher-facing AI assistant (beta) + production APIs',
    summary: 'Core AI/ML contributor on a researcher-facing AI assistant (beta); own the multi-paper chat evaluation framework and a separate production academic-question API.',
    bullets: [
      'Core AI/ML contributor across a researcher-facing beta assistant — technical review, multi-paper chat, related-paper discovery, and question generation (owned).',
      'Implemented and own end to end the multi-paper chat evaluation framework, decomposing answer quality into retrieval, grounding, relevance, and citation dimensions.',
      'Separately own a production academic-question API (~1.5M PostgreSQL records; 100–150 RPS target, ~600 ms P90).',
    ],
    tags: ['LLM', 'RAG', 'HyDE', 'Dense Retrieval', 'Evaluation', 'Multi-paper Chat', 'Technical Review', 'FastAPI', 'PostgreSQL', 'Kubernetes'],
  },
  {
    id: 'samsung',
    company: 'Tech Mahindra',
    client: 'Samsung Research India',
    role: 'Senior Machine Learning Engineer',
    duration: 'Jul 2024 – Oct 2025',
    location: 'India',
    domain: 'E-commerce search & query understanding',
    summary: 'Owned the out-of-domain query classifier end to end; contributed query-understanding signals to the wider e-commerce search ranking system.',
    bullets: [
      'Owned the out-of-domain query classifier and its CPU inference end to end, >0.90 F1, 0.99 precision, ~10 ms inference (ONNX) against a 20 ms target.',
      'Contributed query-understanding signals, embeddings, and retrieval components used by the wider ranking system.',
      'Broader search-improvement work delivered ~35% relevance, ~25% engagement, and ~20% conversion gains in A/B testing.',
    ],
    tags: ['Search', 'Query Understanding', 'OOD Detection', 'ONNX', 'CPU Inference', 'Ranking', 'FastAPI', 'MLflow', 'NLP'],
  },
  {
    id: 'camcom',
    company: 'Camcom Technologies',
    role: 'Senior Machine Learning Engineer',
    duration: 'Apr 2023 – Jul 2024',
    location: 'India',
    domain: 'Computer vision at scale',
    summary: 'Owned detection and segmentation models and their evaluation for a system processing 2M+ street-view images.',
    bullets: [
      'Owned the detection and segmentation models and their evaluation for visual-pollution detection over 2M+ street-view images.',
      'Built the annotation strategy; contributed to dataset preparation and ONNX export.',
      'Models reached detection mAP > 0.60 and segmentation mAP50–95 ~0.27; the wider production system cut inference latency ~60% and manual inspection effort >70%.',
    ],
    tags: ['Computer Vision', 'Object Detection', 'Image Segmentation', 'Annotation', 'ONNX', 'Evaluation', 'PyTorch'],
  },
  {
    id: 'tcs',
    company: 'Tata Consultancy Services',
    role: 'Data Scientist',
    duration: 'Jun 2019 – Mar 2023',
    location: 'India',
    domain: 'Applied NLP, CV & analytics',
    summary: 'NLP, computer vision, BI, and data-engineering solutions across enterprise clients.',
    bullets: [
      'Built NLP systems for email classification and text analytics across business units.',
      'Developed computer vision models for document processing and image analysis.',
      'Created BI dashboards and risk-analysis frameworks, and designed data pipelines for experimentation workflows.',
    ],
    tags: ['NLP', 'Computer Vision', 'Business Intelligence', 'Machine Learning', 'Data Engineering'],
  },
];
