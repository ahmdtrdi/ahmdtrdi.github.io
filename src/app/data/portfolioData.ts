export interface Metric {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  organization: string;
  period: string;
  badge?: string;
  category: "internship" | "research" | "competition";
  description: string;
  bullets: string[];
  tags: string[];
  metrics?: Metric[];
  // Image slot — replace with your own image path in /public (e.g. "/my-photo.jpg")
  image?: string;
  imageCaption?: string;
  imageAlt?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "certificate" | "competition" | "architecture" | "moment";
  categoryLabel: string;
  issuerOrEvent: string;
  year: string;
  description: string;
  // Image slot — replace with your own image path in /public
  image: string;
  tags?: string[];
}

/* ─────────────────────────────────────────────────────────────
   1. INTERNSHIPS
   ───────────────────────────────────────────────────────────── */
export const internshipsData: ProjectItem[] = [
  {
    id: "ps-global",
    title: "AI & Automation / NetSuite ERP Systems",
    role: "Developer Intern",
    organization: "PS Global Consulting",
    period: "Internship",
    badge: "AI & Automation",
    category: "internship",
    description:
      "Spearheaded core memory architectures and hybrid retrieval systems for enterprise AI agent products (BRD AgentAI, QA AgentAI) and NetSuite ERP integrations.",
    bullets: [
      "Worked under Product Team conducting AI & Automation initiatives (BRD AgentAI, QA AgentAI) and NetSuite ERP product integrations regularly.",
      "Initialized early system design with developing memory layers (hierarchical memory), context builder, and privacy safety layer.",
      "Developed extractor layer via STT Groq Whisper and optimized pre-retrieval pipelines with advanced chunking strategies.",
      "Orchestrated complex agent workflows via LangGraph and Contextual Hybrid Retriever (Lexical & Semantic search) for robust multi-turn retrieval.",
    ],
    tags: [
      "LangGraph",
      "Groq Whisper",
      "Next.js",
      "Supabase",
      "Docker",
      "TypeScript",
      "NetSuite ERP",
      "9Router",
    ],
    metrics: [
      { label: "Core Layer", value: "HLO Memory" },
      { label: "Retrieval", value: "Hybrid Lexical + Semantic" },
      { label: "Pipeline", value: "STT Whisper + Chunking" },
    ],
    // Replace with your photo (e.g. "/internships/ps-global.jpg")
    image: "/portfolio-pages/page-3.png",
    imageCaption: "HLO Memory Layer Architecture & On-Site Product Team",
    imageAlt: "State of the art HLO Memory Layer and PS Global Team",
  },
  {
    id: "bank-sulut-go",
    title: "CRM Loan Monitoring Platform & Real-Time SSE Infrastructure",
    role: "Software Engineer Intern",
    organization: "Bank Sulut Go (BSG)",
    period: "Internship",
    badge: "Core Banking & ISO 27001",
    category: "internship",
    description:
      "Engineered real-time branch loan activity monitoring infrastructure across 26 branches in strict compliance with ISO 27001 banking security standards.",
    bullets: [
      "Worked under Credit Consumer Team managing loan systems (Retiree Loans, Installment Loans) regularly.",
      "Created system design for CRM platform to monitor 26 branch loan activities and initialized early infrastructure in compliance with ISO 27001.",
      "Developed real-time dashboard service using Server-Sent Events (SSE) protocol to stream live status reporting across all branches.",
      "Leveraged Apache Kafka for high-throughput stream processing and handled massive multi-region traffic via Redis caching, multithreading, and Django task queues.",
    ],
    tags: [
      "Apache Kafka",
      "Redis",
      "SSE Protocol",
      "Django",
      "Supabase",
      "TypeScript",
      "ISO 27001",
    ],
    metrics: [
      { label: "Network Scope", value: "26 Branches" },
      { label: "Security", value: "ISO 27001 Standard" },
      { label: "Streaming", value: "SSE + Apache Kafka" },
    ],
    // Replace with your photo (e.g. "/internships/bsg.jpg")
    image: "/portfolio-pages/page-4.png",
    imageCaption: "CRM Loan Dashboard Presentation & Team Deployment",
    imageAlt: "Bank Sulut Go CRM Dashboard and Engineering Team",
  },
  {
    id: "metrodata-academy",
    title: "Data Analytics & Reseller Retail Business Intelligence",
    role: "Data Analytics Intern",
    organization: "MetroData Academy (SIBKM Batch 7)",
    period: "Internship",
    badge: "Business Intelligence",
    category: "internship",
    description:
      "Transformed multi-source commercial data into actionable BI dashboards and automated ETL pipelines across 1000+ disparate sources.",
    bullets: [
      "Transformed raw datasets into dynamic pivot tables and multidimensional models to identify sales trends for rapid business decisions.",
      "Designed interactive dashboards in Power BI to visualize organizational KPIs, significantly reducing reporting turn-around time.",
      "Executed scalable ETL (Extract, Transform, Load) pipelines to cleanse and consolidate raw data from 1,000+ sources into cloud data warehouses.",
    ],
    tags: [
      "Power BI",
      "BigQuery",
      "SQL",
      "ETL Pipelines",
      "Data Warehousing",
      "Excel",
    ],
    metrics: [
      { label: "Data Scale", value: "1,000+ Sources" },
      { label: "Platform", value: "Power BI + BigQuery" },
      { label: "Focus", value: "KPI Visibility" },
    ],
    // Replace with your photo (e.g. "/internships/metrodata.jpg")
    image: "/portfolio-pages/page-5.png",
    imageCaption: "Interactive Retail KPI & Medical Risk Analysis Dashboards",
    imageAlt: "Power BI dashboards for business intelligence analysis",
  },
];

/* ─────────────────────────────────────────────────────────────
   2. RESEARCH PROJECTS
   ───────────────────────────────────────────────────────────── */
export const researchData: ProjectItem[] = [
  {
    id: "spark-chatbot",
    title: "Spark Chatbot — Fine-Tuning & Low-Latency Streaming",
    role: "Machine Learning Engineer",
    organization: "TECHOFEST / Spark Teams",
    period: "Research Project",
    badge: "LLM & RAG Systems",
    category: "research",
    description:
      "Developed custom generative AI service by fine-tuning open-source LLMs with parameter-efficient adapters and ultra low-latency gRPC microservice streaming.",
    bullets: [
      "Fine-tuned Llama 3.1 8B via Quantized LoRA (QLoRA) using LangChain and Unsloth for peak parameter efficiency under constrained compute.",
      "Engineered and debugged pre-retrieval pipeline exploring vector databases with semantic chunking and BM25 lexical indexing for hybrid RAG retrieval.",
      "Architected low-latency streaming protocol via gRPC and Protocol Buffers through Flask backend to maximize throughput between microservices.",
    ],
    tags: [
      "Llama 3.1 8B",
      "QLoRA",
      "Unsloth",
      "LangChain",
      "ChromaDB",
      "gRPC",
      "Protobuf",
      "Flask",
    ],
    metrics: [
      { label: "Base LLM", value: "Llama 3.1 8B" },
      { label: "Method", value: "QLoRA via Unsloth" },
      { label: "Streaming", value: "gRPC + Protobuf" },
    ],
    // Replace with your photo (e.g. "/research/spark.jpg")
    image: "/portfolio-pages/page-6.png",
    imageCaption: "Llama 3.1 Fine-Tuning Pipeline, gRPC Streaming & Team Review",
    imageAlt: "Spark chatbot model fine-tuning and development team",
  },
  {
    id: "elderly-ergonomics",
    title: "Ergonomics in Public Facilities for Elderly Mobility",
    role: "Data Scientist / Data Mining Researcher",
    organization: "National Finalist GEMASTIK 2024",
    period: "Research Project",
    badge: "National Finalist",
    category: "research",
    description:
      "Applied association rule mining on Indonesian elderly anthropometric records to scientifically derive ergonomic facility guidelines.",
    bullets: [
      "Developed data mining workflow using Apriori and Eclat algorithms on 182 Indonesian elderly anthropometry records, reducing 38 dimensions into 18 critical mobility variables.",
      "Generated high-conviction association rules with up to 0.94 confidence and 6.60 conviction for facility sizing recommendations (chairs, handrails, counters).",
      "Achieved national recognition as a National Data Mining Finalist at GEMASTIK 2024.",
    ],
    tags: [
      "Data Mining",
      "Apriori & Eclat",
      "Python",
      "Jupyter",
      "Anthropometry",
      "Dataverse",
      "Gemastik 2024",
    ],
    metrics: [
      { label: "Confidence", value: "Up to 0.94" },
      { label: "Conviction", value: "6.60" },
      { label: "Dimension Reduction", value: "38 → 18 Vars" },
    ],
    // Replace with your photo (e.g. "/research/ergonomics.jpg")
    image: "/portfolio-pages/page-7.png",
    imageCaption: "Anthropometric Dimension Modeling & Association Rule Mining Pipeline",
    imageAlt: "Elderly ergonomics data mining workflow and presentation",
  },
  {
    id: "fish-freshness",
    title: "Fish Freshness Classification via Multimodal Parallel Fusion Transformer",
    role: "AI Research Engineer",
    organization: "Independent AI Research",
    period: "Research Project",
    badge: "Computer Vision & Sensors",
    category: "research",
    description:
      "Pioneered multimodal fusion architecture combining ViT-S vision backbones with multi-gas sensor arrays for high-accuracy food quality assurance.",
    bullets: [
      "Worked with multimodal dataset (837 fish images and 9,401 gas sensor records) from Mendeley Data.",
      "Developed semantic feature extraction pipeline in embedding space using Contrastive Learning: ViT-S with DINOv2 weights for imagery, and MLP encoder for sensor signals.",
      "Trained model via contrastive CLIP loss and parallel cross-attention transformer fusion.",
      "Evaluated using Focal Tversky Loss, achieving 92.7% F1-score for Marginal freshness and 98.4% recall for Spoiled fish.",
      "Delivered interpretability results with Grad-CAM heatmaps to analyze freshness-related visual regions.",
    ],
    tags: [
      "ViT-S (DINOv2)",
      "Multimodal Transformer",
      "CLIP Loss",
      "TensorFlow",
      "Grad-CAM",
      "Cross-Attention",
    ],
    metrics: [
      { label: "Spoiled Recall", value: "98.4%" },
      { label: "Marginal F1", value: "92.7%" },
      { label: "Dataset", value: "837 Img / 9.4k Gas" },
    ],
    // Replace with your photo (e.g. "/research/fish-freshness.jpg")
    image: "/portfolio-pages/page-8.png",
    imageCaption: "Multimodal Parallel Fusion Architecture & Grad-CAM Heatmaps",
    imageAlt: "Fish freshness multimodal transformer architecture and Grad-CAM",
  },
];

/* ─────────────────────────────────────────────────────────────
   3. COMPETITIONS & HACKATHONS
   ───────────────────────────────────────────────────────────── */
export const competitionData: ProjectItem[] = [
  {
    id: "digdaya-hackathon",
    title: "Digdaya x Hackathon @ Digitalent Expo FEKDI x IFSA",
    role: "Lead Full-Stack / AI Engineer",
    organization: "PIDI Bank Indonesia",
    period: "Competition",
    badge: "Juara 2 Nasional",
    category: "competition",
    description:
      "Awarded 2nd Winner nationwide at Digitalent Expo FEKDI x IFSA presented by Bank Indonesia for developing Project YUDHA.",
    bullets: [
      "Won 2nd place in national hackathon competition presented by Bank Indonesia (PIDI).",
      "Engineered Project YUDHA: an end-to-end digital intelligence platform empowering digital economy talent and MSMEs.",
      "Presented technical prototype and architecture live before an executive judging panel of industry leaders and central bank officials.",
    ],
    tags: [
      "Bank Indonesia",
      "PIDI Digdaya",
      "FEKDI x IFSA",
      "Hackathon",
      "Fintech AI",
      "Juara 2",
    ],
    metrics: [
      { label: "National Rank", value: "2nd Winner" },
      { label: "Presented By", value: "Bank Indonesia" },
      { label: "Category", value: "Mahasiswa" },
    ],
    // Replace with your photo (e.g. "/competitions/digdaya.jpg")
    image: "/portfolio-pages/page-9.png",
    imageCaption: "Juara 2 Trophy, Pitch Presentation & Winner Ceremony Stage",
    imageAlt: "Bank Indonesia Digdaya Hackathon 2nd Winner ceremony",
  },
  {
    id: "pimnas-38",
    title: "Pekan Ilmiah Mahasiswa Nasional 38 (PIMNAS 38)",
    role: "Hardware & AI Developer",
    organization: "BPTI / Kemendikbudristek",
    period: "Competition",
    badge: "Medali Perunggu (Juara 3)",
    category: "competition",
    description:
      "Secured Bronze Medal (3rd place) in the prestigious Karsa Cipta category at Indonesia's highest student scientific olympiad.",
    bullets: [
      "Won Bronze Medalist 3rd place in Scheme Karsa Cipta (PKM-KC) at Pekan Ilmiah Mahasiswa Nasional (PIMNAS 38).",
      "Engineered Neurokit Prototype: dynamic toolkit based on multimodal neurotherapeutic intervention integrating gamification and Generative AI for ADHD attention enhancement.",
      "Showcased both physical hardware interactive device and companion mobile application at the national expo hall.",
    ],
    tags: [
      "PIMNAS 38",
      "Kemendikbudristek",
      "PKM-KC",
      "Neurokit",
      "Generative AI",
      "Hardware IoT",
      "Bronze Medal",
    ],
    metrics: [
      { label: "Award", value: "Bronze Medal (3rd)" },
      { label: "Scheme", value: "PKM-KC" },
      { label: "Innovation", value: "Neurokit IoT + AI" },
    ],
    // Replace with your photo (e.g. "/competitions/pimnas.jpg")
    image: "/portfolio-pages/page-10.png",
    imageCaption: "PIMNAS 38 Medalist Ceremony, Exhibition Booth & Neurokit Prototype",
    imageAlt: "PIMNAS 38 Bronze Medal award and Neurokit device",
  },
  {
    id: "gemastik-18",
    title: "GEMASTIK XVIII — National ICT Competition",
    role: "Team Lead & ML Researcher",
    organization: "Puspresnas / Kemendikbudristek & Telkom University",
    period: "Competition",
    badge: "The Most Inspiring & Top 10",
    category: "competition",
    description:
      "Recognized as The Most Inspiring Team and clinched Top 10th position on the Data Mining competitive leaderboard.",
    bullets: [
      "Honorable Mention as 'The Most Inspiring Team' and Top 10th place on leaderboard Data Mining at GEMASTIK XVIII.",
      "Engineered novel Co-Scale Conv-Attentional Image Transformers model for visual classification and fine-tuning challenges.",
      "Competed against top universities nationwide in rapid data modeling, validation, and defense before expert academic juries.",
    ],
    tags: [
      "GEMASTIK XVIII",
      "Data Mining",
      "Conv-Attentional ViT",
      "Puspresnas",
      "Top 10 National",
    ],
    metrics: [
      { label: "Leaderboard", value: "Top 10 Finalist" },
      { label: "Special Award", value: "Most Inspiring Team" },
      { label: "Host", value: "Telkom University" },
    ],
    // Replace with your photo (e.g. "/competitions/gemastik.jpg")
    image: "/portfolio-pages/page-11.png",
    imageCaption: "GEMASTIK XVIII Podium Award, Defense Stage & Transformer Pipeline",
    imageAlt: "GEMASTIK 18 team and award ceremony",
  },
  {
    id: "solana-hackathon",
    title: "100xDevs Frontier Solana Hackathon",
    role: "Full-Stack Web3 Engineer",
    organization: "100xDevs & Solana Foundation",
    period: "Competition",
    badge: "Top 9 / 480+ Teams",
    category: "competition",
    description:
      "Awarded 9th place globally among 480+ international submissions for CORA, a real-time decentralized Web3 gaming application.",
    bullets: [
      "Awarded Top 9th place among 480+ global project submissions in the 100xDevs Frontier Solana Hackathon track.",
      "Won $500 USDC Ninth Prize for building CORA: an interactive multiplayer decentralized battle platform.",
      "Integrated Solana smart contracts, on-chain state synchronization, and low-latency client rendering.",
    ],
    tags: [
      "Solana Blockchain",
      "Web3 GameFi",
      "Rust Smart Contracts",
      "TypeScript",
      "100xDevs",
      "Global Track",
    ],
    metrics: [
      { label: "Rank", value: "Top 9 / 480+ Teams" },
      { label: "Cash Prize", value: "500 USDC" },
      { label: "Ecosystem", value: "Solana Network" },
    ],
    // Replace with your photo (e.g. "/competitions/solana.jpg")
    image: "/portfolio-pages/page-12.png",
    imageCaption: "100xDevs Frontier Winner Announcement & CORA Web3 Arena",
    imageAlt: "100xDevs Solana Hackathon winner prize and CORA app",
  },
];

/* ─────────────────────────────────────────────────────────────
   4. SHOWCASE GALLERY ITEMS (Certificates, Proofs & Moments)
   ───────────────────────────────────────────────────────────── */
export const galleryData: GalleryItem[] = [
  // ── Certificates & Honors ──
  {
    id: "cert-pimnas",
    title: "Juara 3 PIMNAS 38 (Pekan Ilmiah Mahasiswa Nasional)",
    category: "certificate",
    categoryLabel: "National Honor",
    issuerOrEvent: "Kemendikbudristek & BPTI",
    year: "2025",
    description:
      "Sertifikat Penghargaan Setara Perunggu Kategori Presentasi PKM-KC atas karya NEUROKIT: Dynamic Toolkit Berbasis Multimodal Neurotherapeutic.",
    image: "/portfolio-pages/page-13.png",
    tags: ["PIMNAS 38", "Kemendikbudristek", "Juara 3"],
  },
  {
    id: "cert-gemastik-18",
    title: "Pemenang GEMASTIK XVIII — The Most Inspiring Team",
    category: "certificate",
    categoryLabel: "National Honor",
    issuerOrEvent: "Kemendikbudristek & Telkom University",
    year: "2025",
    description:
      "Sertifikat Pemenang 'The Most Inspiring Team' pada Pagelaran Mahasiswa Nasional Bidang TIK (GEMASTIK XVIII) di Bandung.",
    image: "/portfolio-pages/page-13.png",
    tags: ["GEMASTIK XVIII", "Data Mining", "Inspiring Team"],
  },
  {
    id: "cert-gemastik-2024",
    title: "Finalis Nasional GEMASTIK 2024 — Divisi Penambangan Data",
    category: "certificate",
    categoryLabel: "National Finalist",
    issuerOrEvent: "Balai Pengembangan Talenta Indonesia (BPTI)",
    year: "2024",
    description:
      "Sertifikat Finalis Divisi Penambangan Data (Data Mining) tingkat nasional yang diselenggarakan di Universitas Negeri Semarang.",
    image: "/portfolio-pages/page-13.png",
    tags: ["GEMASTIK 2024", "BPTI", "Finalist"],
  },
  {
    id: "cert-asean-ai",
    title: "ASEAN AI Hackathon 2026 Certificate of Participation",
    category: "certificate",
    categoryLabel: "International",
    issuerOrEvent: "ASEAN AI Council & Passage to ASEAN",
    year: "2026",
    description:
      "Recognition of active participation in the ASEAN AI Hackathon 2026 organized by P2A and ASEAN AI Council.",
    image: "/portfolio-pages/page-13.png",
    tags: ["ASEAN AI", "Hackathon", "International"],
  },
  {
    id: "cert-ai-ready-asean",
    title: "AI Ready ASEAN Youth Challenge Certificate of Appreciation",
    category: "certificate",
    categoryLabel: "International",
    issuerOrEvent: "AI Singapore & ASEAN Foundation (with Google.org)",
    year: "2026",
    description:
      "Certificate of Appreciation for engagement in developing AI solutions for social good across ASEAN.",
    image: "/portfolio-pages/page-13.png",
    tags: ["AI Singapore", "ASEAN Foundation", "Google.org"],
  },
  {
    id: "cert-compfest-16",
    title: "COMPFEST 16 — AI Innovation Challenge",
    category: "certificate",
    categoryLabel: "National Challenge",
    issuerOrEvent: "Fakultas Ilmu Komputer Universitas Indonesia",
    year: "2024",
    description:
      "Certificate of Participation as Participant of AI Innovation Challenge at COMPFEST 16 Fasilkom UI.",
    image: "/portfolio-pages/page-13.png",
    tags: ["COMPFEST 16", "UI", "AI Challenge"],
  },
  {
    id: "cert-huawei-ai",
    title: "Huawei Certified ICT Associate — HCIA-AI V4.0",
    category: "certificate",
    categoryLabel: "Professional Cert",
    issuerOrEvent: "Huawei ICT Academy",
    year: "2025",
    description:
      "Certificate of Completion for HCIA-AI V4.0 course covering deep learning, computer vision, and neural network engineering.",
    image: "/portfolio-pages/page-14.png",
    tags: ["Huawei", "HCIA-AI", "Deep Learning"],
  },
  {
    id: "cert-comptia-data",
    title: "CompTIA Data+ Certified (DAO-001)",
    category: "certificate",
    categoryLabel: "Global Industry Cert",
    issuerOrEvent: "CompTIA (Computing Technology Industry Association)",
    year: "2024 - 2027",
    description:
      "Global certification validating data mining, data governance, statistical methods, ETL pipelines, and business visualization.",
    image: "/portfolio-pages/page-14.png",
    tags: ["CompTIA", "Data+ Certified", "Governance & Stats"],
  },
  {
    id: "cert-azure-ai",
    title: "Microsoft Azure AI Fundamentals (AI-900)",
    category: "certificate",
    categoryLabel: "Cloud AI Cert",
    issuerOrEvent: "Microsoft & ElevAIte",
    year: "2025",
    description:
      "Certified in Microsoft Azure AI workload fundamentals, machine learning models, and Azure Cognitive Services.",
    image: "/portfolio-pages/page-14.png",
    tags: ["Microsoft", "Azure AI", "AI-900"],
  },
  {
    id: "cert-sibkm-metrodata",
    title: "Studi Independen Bersertifikat — Data Analytic & BI",
    category: "certificate",
    categoryLabel: "MSIB Kampus Merdeka",
    issuerOrEvent: "PT Sinergi Transformasi Digital (Metrodata Academy)",
    year: "2024",
    description:
      "Kelulusan program Studi Independen Bersertifikat (SIBKM Batch 7) jalur Data Analytic with Business Intelligence.",
    image: "/portfolio-pages/page-14.png",
    tags: ["MSIB", "Kampus Merdeka", "Metrodata"],
  },
  {
    id: "cert-google-data",
    title: "Google Data Analytics Professional Certificate",
    category: "certificate",
    categoryLabel: "Professional Cert",
    issuerOrEvent: "Google Career Certificates via Coursera",
    year: "2024",
    description:
      "8-Course rigorous series covering data cleaning, R programming, SQL analytics, Tableau visualization, and case studies.",
    image: "/portfolio-pages/page-14.png",
    tags: ["Google", "Data Analytics", "Coursera"],
  },
  {
    id: "cert-hackerrank-sql",
    title: "HackerRank SQL (Intermediate) Certification",
    category: "certificate",
    categoryLabel: "Technical Assessment",
    issuerOrEvent: "HackerRank Skill Certification",
    year: "2024",
    description:
      "Verified proficiency in complex SQL joins, subqueries, aggregation functions, and window operations.",
    image: "/portfolio-pages/page-14.png",
    tags: ["HackerRank", "SQL", "Verified"],
  },
  {
    id: "cert-dicoding-ml",
    title: "Dicoding — Machine Learning Terapan",
    category: "certificate",
    categoryLabel: "Specialized Training",
    issuerOrEvent: "Dicoding Indonesia (Didukung LPPI & Bank Indonesia)",
    year: "2026",
    description:
      "Sertifikat Kompetensi Kelulusan kelas Machine Learning Terapan, membangun end-to-end predictive and recommendation models.",
    image: "/portfolio-pages/page-15.png",
    tags: ["Dicoding", "Machine Learning", "Bank Indonesia"],
  },
  {
    id: "cert-bi-capstone",
    title: "Bank Indonesia Digdaya — Capstone Project Program",
    category: "certificate",
    categoryLabel: "Central Bank Program",
    issuerOrEvent: "Pusat Inovasi Digital Indonesia (PIDI Bank Indonesia)",
    year: "2026",
    description:
      "Certificate of Completion for Capstone Project Program DIGDAYA x HACKATHON presented by Departemen Kebijakan Sistem Pembayaran BI.",
    image: "/portfolio-pages/page-15.png",
    tags: ["Bank Indonesia", "Capstone", "Digdaya"],
  },
  {
    id: "cert-bi-practitioner",
    title: "Bank Indonesia Digdaya — Practitioner Training Program",
    category: "certificate",
    categoryLabel: "Central Bank Program",
    issuerOrEvent: "PIDI Bank Indonesia & ASPI, Fintech Indonesia",
    year: "2026",
    description:
      "Certificate of Completion Practitioner Training Program DIGDAYA x HACKATHON covering digital payment & fintech systems.",
    image: "/portfolio-pages/page-15.png",
    tags: ["Bank Indonesia", "Practitioner", "Fintech"],
  },
  {
    id: "cert-bi-essential",
    title: "Bank Indonesia Digdaya — Essential Training Program",
    category: "certificate",
    categoryLabel: "Central Bank Program",
    issuerOrEvent: "PIDI Bank Indonesia & LPPI",
    year: "2026",
    description:
      "Certificate of Completion Essential Training Program DIGDAYA x HACKATHON covering foundational digital financial ecosystem.",
    image: "/portfolio-pages/page-15.png",
    tags: ["Bank Indonesia", "Essential", "Digdaya"],
  },

  // ── Architecture & Prototypes ──
  {
    id: "arch-hlo-memory",
    title: "State of the Art HLO Memory Layer",
    category: "architecture",
    categoryLabel: "System Architecture",
    issuerOrEvent: "PS Global Consulting",
    year: "2026",
    description:
      "Hierarchical memory layer architecture combining working memory, episodic memory, and privacy layers for enterprise AI agents.",
    image: "/portfolio-pages/page-3.png",
    tags: ["HLO Memory", "LangGraph", "Architecture"],
  },
  {
    id: "arch-multimodal-transformer",
    title: "Multimodal Parallel Fusion Transformer Pipeline",
    category: "architecture",
    categoryLabel: "Research Architecture",
    issuerOrEvent: "Fish Freshness Research",
    year: "2025",
    description:
      "End-to-end cross-attention parallel fusion combining DINOv2 vision embeddings with gas sensor MLP embeddings.",
    image: "/portfolio-pages/page-8.png",
    tags: ["Vision Transformer", "Sensor Fusion", "DINOv2"],
  },
  {
    id: "arch-neurokit",
    title: "Neurokit IoT Hardware & Companion App Prototype",
    category: "architecture",
    categoryLabel: "Hardware & Prototype",
    issuerOrEvent: "PIMNAS 38 Exhibition",
    year: "2025",
    description:
      "Interactive neurotherapeutic smart physical lamp toolkit paired with mobile gamification app using GenAI for focus therapy.",
    image: "/portfolio-pages/page-10.png",
    tags: ["Neurokit", "Hardware Prototype", "Mobile UI"],
  },

  // ── Competitions & Moments ──
  {
    id: "moment-digdaya-trophy",
    title: "Juara 2 Digdaya Hackathon Trophy & Stage Ceremony",
    category: "competition",
    categoryLabel: "Award Celebration",
    issuerOrEvent: "Digitalent Expo FEKDI x IFSA BI",
    year: "2026",
    description:
      "Piala Juara 2 Kategori Mahasiswa FEKDI x IFSE 2024 presented by Bank Indonesia bersama delegasi tim.",
    image: "/portfolio-pages/page-9.png",
    tags: ["Bank Indonesia", "Juara 2", "FEKDI"],
  },
  {
    id: "moment-pimnas-podium",
    title: "PIMNAS 38 Medali Perunggu Ceremony & Booth",
    category: "moment",
    categoryLabel: "Milestone Moment",
    issuerOrEvent: "Universitas Hasanuddin (PIMNAS 38)",
    year: "2025",
    description:
      "Momen penyerahan medali perunggu dan maskot juara pada panggung utama PIMNAS 38 didampingi tim Karsa Cipta.",
    image: "/portfolio-pages/page-10.png",
    tags: ["PIMNAS 38", "Medali Perunggu", "UNHAS"],
  },
  {
    id: "moment-gemastik-podium",
    title: "GEMASTIK XVIII Podium Ceremony & Team Hacking",
    category: "moment",
    categoryLabel: "Milestone Moment",
    issuerOrEvent: "Telkom University (GEMASTIK XVIII)",
    year: "2025",
    description:
      "Tim UNSRAT meraih penghargaan The Most Inspiring Team dan posisi Top 10 nasional pada divisi Data Mining.",
    image: "/portfolio-pages/page-11.png",
    tags: ["GEMASTIK 18", "UNSRAT Flag", "Bandung"],
  },
  {
    id: "moment-solana-cora",
    title: "100xDevs Solana Hackathon Top 9 Win & CORA Battle Arena",
    category: "competition",
    categoryLabel: "Web3 Showcase",
    issuerOrEvent: "100xDevs Frontier Hackathon",
    year: "2025",
    description:
      "Raihan Top 9 dan $500 USDC prize dari 480+ proyek global untuk CORA Web3 card-battle platform di Solana.",
    image: "/portfolio-pages/page-12.png",
    tags: ["Solana", "CORA Game", "500 USDC"],
  },
];
