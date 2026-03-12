export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  summary: string;
  bullets: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    id: 'springer',
    company: 'Springer Nature AI Labs',
    role: 'Senior AI/ML Engineer',
    duration: 'Oct 2025 – Present',
    location: 'Pune',
    summary: 'Designing and shipping LLM-based production systems for academic publishing.',
    bullets: [
      'Building LLM-powered production systems for research content workflows',
      'Architecting RAG pipelines for intelligent retrieval and content understanding',
      'Developing NLP services including the API for academic content search',
      'Driving research-adjacent AI applications in large-scale publishing infrastructure',
    ],
    tags: ['LLM', 'RAG', 'NLP', 'Production Systems', 'FastAPI', 'MLOps', 'AI Evaluation', 'Agentic AI', 'Langchain','LangGraph', 'Langfuse'],
  },
  {
    id: 'samsung',
    company: 'Samsung Research India(OS: Tech Mahindra)',
    role: 'Senior Machine Learning Engineer',
    duration: 'Jul 2024 – Oct 2025',
    location: 'India',
    summary: 'Built query understanding and LLM solutions for e-commerce search.',
    bullets: [
      'Engineered query understanding systems to improve e-commerce search relevance',
      'Developed LLM-based solutions for customer search behavior analysis',
      'Improved search engagement and conversion rates through ML-driven ranking',
      'Built end-to-end pipelines from data ingestion to model serving',
    ],
    tags: ['LLM', 'Search', 'Query Understanding', 'E-Commerce', 'Ranking','FastAPI', 'MLOps', 'NLP', 'Query Classification', 'Search Relevance','OOD Detection','MLFlow'],
  },
  {
    id: 'camcom',
    company: 'Camcom',
    role: 'Senior Machine Learning Engineer',
    duration: 'Apr 2023 – Jul 2024',
    location: 'India',
    summary: 'Scaled computer vision systems with transformer models and MLOps.',
    bullets: [
      'Built transformer-based visual pollution detection achieving high accuracy at scale',
      'Designed large-scale image analysis pipelines processing millions of frames',
      'Implemented MLOps workflows with MLflow, Docker, and CI/CD for model lifecycle',
      'Optimized GPU-accelerated inference reducing processing time significantly',
    ],
    tags: ['Computer Vision', 'Transformers', 'MLOps', 'Docker', 'MLflow', 'YOLO', 'Object Detection', 'Image Segmentation'],
  },
  {
    id: 'tcs',
    company: 'Tata Consultancy Services',
    role: 'Data Scientist',
    duration: 'Jun 2019 – Mar 2023',
    location: 'India',
    summary: 'Delivered NLP, CV, BI, and data engineering solutions across domains.',
    bullets: [
      'Built NLP systems for email classification and text analytics across business units',
      'Developed computer vision models for document processing and image analysis',
      'Created BI dashboards and risk analysis frameworks for enterprise clients',
      'Designed data pipelines for automated experimentation workflows',
    ],
    tags: ['NLP', 'Computer Vision', 'Business Intelligence', 'Machine Learning', 'Data Science'],
  },
];
