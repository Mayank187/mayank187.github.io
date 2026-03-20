export interface Project {
  id: string;
  title: string;
  summary: string;
  problem: string;
  approach: string;
  stack: string[];
  impact: string;
  badges: string[];
  github?: string;
  demo?: string;
  icon?: string;
  gradient?: [string, string];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'stackoverflow-tags',
    title: 'Stack Overflow Tag Prediction',
    summary: 'Multi-label NLP system for automatic tag prediction on Stack Overflow questions.',
    problem: 'Accurately predicting relevant tags for developer questions requires understanding code context, natural language, and the taxonomy of thousands of possible labels.',
    approach: 'Built a multi-label classification pipeline using transformer-based models with custom tokenization. Implemented end-to-end deployment with FastAPI and Docker for production-ready inference.',
    stack: ['Python', 'Transformers', 'FastAPI', 'Docker', 'NLP', 'Multi-label Classification'],
    impact: 'Achieved high F1 scores across 500+ tag categories with sub-100ms inference latency in containerized deployment.',
    badges: ['NLP', 'DEPLOYED', 'API', 'MULTI-LABEL CLASSIFICATION'],
    github: 'https://github.com/Mayank187/StackoverflowTags',
    icon: '🏷️',
    gradient: ['#f59e0b', '#fbbf24'],
    featured: true,
  },
  {
    id: 'restaurant-generator',
    title: 'Restaurant Name & Menu Generator',
    summary: 'GPT-powered application generating creative restaurant names and curated menus.',
    problem: 'Restaurant entrepreneurs need quick creative ideation for branding and menu design that feels coherent and market-ready.',
    approach: 'Leveraged GPT APIs with structured prompting to generate thematically consistent restaurant names and menus. Built a Streamlit interface for real-time interactive generation.',
    stack: ['Python', 'GPT API', 'Streamlit', 'LLM', 'Prompt Engineering','LangChain'],
    impact: 'Deployed user-facing AI app demonstrating practical LLM application design with intuitive UX.',
    badges: ['LLM', 'DEPLOYED','LangChain', 'Streamlit'],
    github: 'https://github.com/Mayank187/RestaurantNameGenerator',
    icon: '🍽️',
    gradient: ['#d97706', '#fcd34d'],
    featured: true,
  },
  {
    id: 'llm-rag-systems',
    title: 'Production LLM / RAG Systems',
    summary: 'Enterprise-grade retrieval-augmented generation systems for production workloads.',
    problem: 'Large-scale organizations need reliable, evaluated, and scalable LLM systems that go beyond prototype RAG implementations.',
    approach: 'Designed retrieval pipelines with vector databases, reranking layers, and evaluation frameworks. Built with production constraints: latency budgets, cost optimization, and quality monitoring.',
    stack: ['LangChain', 'FAISS', 'Pinecone', 'FastAPI', 'Python', 'Docker', 'Evaluation Frameworks'],
    impact: 'Delivered production-grade RAG systems serving real users with measurable retrieval quality improvements.',
    badges: ['RAG', 'PROD', 'LLM'],
    icon: '🔗',
    gradient: ['#84cc16', '#fbbf24'],
    featured: true,
  },
  {
    id: 'visual-pollution',
    title: 'Visual Pollution Detection System',
    summary: 'Large-scale computer vision system for detecting visual pollution in urban imagery.',
    problem: 'Cities need automated detection of visual pollution (illegal signage, graffiti, structural damage) across millions of street-level images.',
    approach: 'Built transformer-based detection models with GPU-accelerated inference pipelines. Implemented MLOps workflows for continuous model improvement and monitoring.',
    stack: ['PyTorch', 'Transformers', 'MLflow', 'Docker', 'GPU Inference', 'Computer Vision'],
    impact: 'Improved detection accuracy significantly while reducing manual inspection effort by over 70%.',
    badges: ['CV', 'PROD', 'RESEARCH-ADJACENT'],
    icon: '👁️',
    gradient: ['#b45309', '#fde68a'],
    featured: true,
  },
];
