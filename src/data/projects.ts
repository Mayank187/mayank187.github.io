export type ProjectTier = 'flagship' | 'project' | 'archive';

export interface Project {
  id: string;
  title: string;
  /** Organisation or context the work happened in. */
  org: string;
  role: string;
  timeframe?: string;
  tier: ProjectTier;
  featured: boolean;
  icon?: string;

  /** One-line summary for cards. */
  summary: string;

  // ── Case-study narrative (flagships) ──────────────────────────────
  problem?: string;
  whyItMattered?: string;
  scale?: string;
  constraints?: string[];
  ownership?: string;
  approach: string;
  /** Ordered pipeline stages, rendered as a lightweight accessible flow. */
  architecture?: string[];
  decisions?: string[];
  evaluation?: string;
  outcome: string;
  lessons?: string;

  stack: string[];
  tags: string[];
  github?: string;
  demo?: string;

  /** Shown to visitors so proprietary work is framed honestly. */
  confidentiality?: string;
}

// HONESTY POLICY: No fabricated metrics, scale, architecture, ownership, or
// outcomes. Personal ownership, personal contribution, and wider-team/system
// outcomes are stated distinctly. Employer/client systems are described at a
// general level; verification tracking lives ONLY in docs/PORTFOLIO_CONTENT_GAPS.md
// (never in this shipped data, so internal notes never reach the public bundle).

export const projects: Project[] = [
  {
    id: 'ai-research-assistant',
    title: 'AI Research Assistant for Multi-Paper Reasoning and Technical Review',
    org: 'Springer Nature',
    role: 'Senior AI/ML Engineer',
    timeframe: '2025 – Present',
    tier: 'flagship',
    featured: true,
    icon: '🔎',
    summary:
      'Core AI/ML engineer on a researcher-facing AI assistant (beta), contributing across its major AI workflows ,  with an agentic technical-review flow, work on multi-paper chat and question generation, and the multi-paper evaluation framework I own end to end.',
    problem:
      'Researchers need to reason across many papers at once ,  comparing evidence, methods, and conclusions ,  but single-document tools make that fragmented, and multi-document answer quality is hard to measure.',
    whyItMattered:
      'A cross-paper answer is only useful if it stays grounded in the right sources and that quality can actually be measured.',
    scale:
      'A researcher-facing beta assistant; multi-paper chat typically reasons over ~20–25 papers per conversation (max 25).',
    constraints: [
      'Answers must stay grounded across multiple documents, with citations',
      'Multi-document answer quality must be measurable',
      'One product built by a team ,  features shared, ownership focused',
    ],
    ownership:
      "Core AI/ML contributor across the product's major workflows. I own the implementation of the multi-paper chat evaluation framework end to end, built an agentic technical-review flow, own question generation, and contributed to multi-paper chat's conversation and retrieval flow.",
    approach:
      'On multi-paper chat: rewrite the question with HyDE, retrieve with dense vectors plus metadata filtering, build multi-document context, then synthesise an answer with citations. On evaluation: decompose answer quality into retrieval, grounding, relevance, and citation dimensions so regressions are visible.',
    architecture: ['Paper selection', 'HyDE query rewriting', 'Dense retrieval + metadata filtering', 'Multi-document context', 'Synthesised answer', 'Citations'],
    decisions: [
      'Dense retrieval with metadata filtering and HyDE query rewriting (no BM25, no reranker)',
      'Citations and source attribution on every answer',
      'Evaluation decomposed by dimension, guiding chunking, retrieval, and citation-design choices',
    ],
    evaluation:
      'I implemented and own the evaluation framework for multi-paper chat end to end: it measures accuracy, relevance, grounding, and citation correctness across real and synthetic questions over three ten-paper collections, and its results guided chunking, retrieval, and citation design.',
    outcome:
      'Beta product under active development and evaluation; my components sit within a larger platform built by a team.',
    lessons:
      "For multi-paper assistance, the evaluation framework is as much the product as the model ,  you can't improve what you can't measure across documents.",
    stack: ['Python', 'LLMs', 'LangChain', 'LangGraph', 'HyDE', 'Dense Retrieval', 'FastAPI', 'Evaluation'],
    tags: ['LLM', 'RAG', 'Evaluation', 'Multi-paper Chat'],
    confidentiality: 'Employer product (beta) ,  described generally; product name and proprietary details omitted.',
  },
  {
    id: 'samsung-search',
    title: 'Query Understanding for E-commerce Search',
    org: 'Samsung Research India (via Tech Mahindra)',
    role: 'Senior Machine Learning Engineer',
    timeframe: '2024 – 2025',
    tier: 'flagship',
    featured: true,
    icon: '🛒',
    summary:
      'Owned the out-of-domain query classifier (and its CPU inference) end to end, and contributed query-understanding signals used by the wider e-commerce search ranking system.',
    problem:
      "E-commerce search queries are short, noisy, and ambiguous. Until the system knows a query's intent and whether it's even in-domain, ranking optimises the wrong thing.",
    whyItMattered:
      'Query understanding sits upstream of ranking and caps how good results can get.',
    scale: 'Production e-commerce search traffic, upstream of ranking.',
    constraints: [
      'Feeds a latency-sensitive search path (~20 ms budget)',
      'Robustness to noisy, out-of-distribution queries',
      'Consistency between offline metrics and A/B results',
    ],
    ownership:
      'Owned the out-of-domain (OOD) query classifier and its CPU inference pipeline end to end, including ONNX export. Contributed query-understanding signals, embeddings, and retrieval components used by the wider ranking system; did not own ranking.',
    approach:
      'Detect out-of-domain queries so they fail gracefully instead of returning confident nonsense, and produce query-understanding signals the ranking system consumes.',
    architecture: ['Query', 'Query classification', 'OOD detection', 'Query-understanding signals', 'Ranking'],
    decisions: [
      'Explicit OOD detection at a 0.75 threshold ,  0.99 precision so in-domain queries are rarely dropped',
      'Exported to ONNX and ran CPU inference at ~10 ms against a 20 ms target',
      'Query-understanding signals reused by the wider ranking system',
    ],
    evaluation:
      'OOD classifier reached >0.90 F1 and 0.99 precision (0.75 threshold), at ~10 ms CPU inference. The broader initiative was measured with manually tagged queries and online A/B tests.',
    outcome:
      'The broader search-improvement initiative delivered ~35% higher relevance, ~25% stronger engagement, and ~20% higher conversion in A/B testing. Within that work, I owned the OOD classifier: >0.90 F1, 0.99 precision, ~10 ms CPU inference.',
    lessons:
      'Knowing when not to answer confidently ,  OOD detection ,  keeps a search system honest.',
    stack: ['Python', 'ONNX', 'CPU Inference', 'FastAPI', 'MLflow', 'Classification', 'OOD Detection'],
    tags: ['Search', 'Query Understanding', 'OOD Detection', 'ONNX', 'Ranking', 'NLP'],
    confidentiality: 'Client system ,  described at a general level; proprietary details omitted.',
  },
  {
    id: 'academic-question-api',
    title: 'Academic Question Delivery API',
    org: 'Springer Nature',
    role: 'Senior AI/ML Engineer',
    tier: 'flagship',
    featured: true,
    icon: '🧩',
    summary:
      'A production API on the Springer Nature website that serves pre-generated suggested questions for articles ,  owned end to end, from API and PostgreSQL through caching, concurrency, load testing, and Kubernetes deployment. Separate from the AI research assistant.',
    problem:
      'The website needs fast, reliable question suggestions for articles at scale. Generating them per request is too slow, so they are precomputed and served under tight latency and throughput targets.',
    whyItMattered:
      'It sits in a user-facing path on a high-traffic site, so latency, reliability, and room to grow matter more than model cleverness.',
    scale: 'Backed by ~1.5M PostgreSQL records today, designed to grow toward ~22M; targets 100–150 RPS at ~600 ms P90.',
    constraints: [
      'User-facing latency target (~600 ms P90)',
      'Throughput target of 100–150 RPS',
      'Headroom to grow from ~1.5M toward ~22M records',
    ],
    ownership:
      'Owned the service end to end ,  API architecture, FastAPI implementation, PostgreSQL data layer, caching, concurrency control, load testing, containerisation, Kubernetes deployment, monitoring, and reliability fixes.',
    approach:
      'Questions are generated ahead of time and stored, so the live path is a fast lookup: accept a DOI or question ID, return two suggested questions (404 when none exists), with a TTL cache and per-key async locking to hold latency down and avoid duplicate work under load.',
    architecture: ['Request (DOI / question ID)', 'FastAPI + Uvicorn', 'TTL cache', 'PostgreSQL lookup', 'Two questions'],
    decisions: [
      'Pre-generate and store questions so the live path is a lookup, not per-request generation',
      'TTL cache with per-key async locking to cut latency and prevent duplicate work under concurrency',
      'Load-tested and deployed on a private Kubernetes cluster (8 workers, 8 CPU / 8 GiB) with monitoring',
    ],
    evaluation: 'Load-tested against the 100–150 RPS target, holding ~600 ms P90.',
    outcome:
      'A production API serving pre-generated academic questions from ~1.5M PostgreSQL records at a 100–150 RPS target and ~600 ms P90. Endpoints: /health and /questions (DOI or question ID → two suggestions, 404 when none). Distinct from, and not part of, the AI research assistant.',
    lessons:
      'At user-facing scale, the interesting engineering is off the model: caching, concurrency, and load behaviour decide whether it holds up.',
    stack: ['Python', 'FastAPI', 'Uvicorn', 'PostgreSQL', 'Docker', 'Kubernetes'],
    tags: ['API', 'Backend', 'Reliability', 'Kubernetes'],
    confidentiality: 'Springer Nature service ,  described at a general level.',
  },
  {
    id: 'visual-pollution',
    title: 'Visual Pollution Detection at Scale',
    org: 'Camcom Technologies',
    role: 'Senior Machine Learning Engineer',
    timeframe: '2023 – 2024',
    tier: 'flagship',
    featured: true,
    icon: '👁️',
    summary: 'Owned the detection and segmentation models and their evaluation for a computer-vision system processing 2M+ street-view images.',
    problem:
      "Detecting visual pollution ,  illegal signage, structural damage ,  across millions of street-view images is impractical by hand, and naive models don't survive real-world variety.",
    whyItMattered: "Manual inspection doesn't scale to the image volumes involved.",
    scale: 'A computer-vision system processing 2M+ street-view images.',
    constraints: [
      'Detection and segmentation quality across varied real-world imagery',
      'A labelling process that could keep up with the data',
      'Models that fit into the wider production pipeline',
    ],
    ownership:
      'Owned the detection and segmentation models and their evaluation; built the annotation strategy and contributed to dataset preparation and ONNX export. Did not own GPU optimisation, serving, or production deployment.',
    approach:
      'Detection and segmentation models trained on a purpose-built annotation strategy, evaluated on held-out imagery before handing off to the wider serving pipeline.',
    architecture: ['Image ingestion', 'Preprocessing', 'Detection / segmentation', 'Inference', 'Post-processing', 'Review workflow'],
    decisions: [
      'Built the annotation strategy so labelling could keep pace with the data',
      'Owned model design and evaluation for both detection and segmentation',
      'Exported models to ONNX for the wider serving pipeline (contributed)',
    ],
    evaluation: 'Detection mAP above 0.60; segmentation mAP50–95 ~0.27 on held-out imagery.',
    outcome:
      'Models reached detection mAP > 0.60 and segmentation mAP50–95 ~0.27. The wider production system reduced inference latency ~60% and manual inspection effort >70% (system-level results, not solely my components).',
    lessons: 'Good labels and honest evaluation moved the models more than any architecture tweak.',
    stack: ['Python', 'PyTorch', 'Object Detection', 'Image Segmentation', 'ONNX', 'Evaluation'],
    tags: ['Computer Vision', 'Object Detection', 'Image Segmentation', 'Evaluation'],
    confidentiality: 'Employer system ,  described at a general level; proprietary details omitted.',
  },

  // ── Secondary work ,  deliberately lower visual weight ────────────────
  {
    id: 'stackoverflow-tags',
    title: 'Stack Overflow Tag Prediction',
    org: 'Personal project',
    role: 'Author',
    tier: 'project',
    featured: false,
    icon: '🏷️',
    summary: 'Multi-label tag prediction over a large label space, packaged as a containerized inference API.',
    approach:
      'Multi-label classification pipeline over a large tag vocabulary, served through FastAPI in a Docker container.',
    outcome:
      'A demo project exploring multi-label NLP over a large label space and clean API packaging.',
    stack: ['Python', 'NLP', 'Multi-label Classification', 'FastAPI', 'Docker'],
    tags: ['NLP', 'Personal Project'],
    github: 'https://github.com/Mayank187/StackoverflowTags',
  },
  {
    id: 'restaurant-generator',
    title: 'Restaurant Name & Menu Generator',
    org: 'Personal experiment',
    role: 'Author',
    tier: 'archive',
    featured: false,
    icon: '🍽️',
    summary: 'An early hands-on experiment with LLM prompting and quick app delivery.',
    approach:
      'Structured prompting against an LLM API to generate themed restaurant names and menus, wrapped in a Streamlit UI.',
    outcome:
      'Early exploration of LLM prompting and app delivery. Kept as a learning artifact, not representative of current production work.',
    stack: ['Python', 'LLM API', 'Prompt Engineering', 'LangChain', 'Streamlit'],
    tags: ['LLM', 'Experiment'],
    github: 'https://github.com/Mayank187/RestaurantNameGenerator',
  },
];

export const flagshipProjects = projects.filter((p) => p.tier === 'flagship');
export const secondaryProjects = projects.filter((p) => p.tier !== 'flagship');
