// Design system constants and content data for Prayag Portfolio

export interface Technology {
  name: string;
  icon?: string;
  proficiency?: 'expert' | 'advanced' | 'intermediate';
}

export interface TechnologyCategory {
  title: string;
  icon: string;
  technologies: Technology[];
}

export interface ProjectFeature {
  title: string;
  description: string;
  icon: string;
}

export interface TechStack {
  name: string;
  icon: string;
  color: string;
}

export interface VectorLoomProject {
  title: string;
  tagline: string;
  description: string;
  features: ProjectFeature[];
  techStack: TechStack[];
  githubUrl: string;
  demoUrl: string | null;
}

export interface SkillPillar {
  title: string;
  subtitle: string;
  icon: string;
  skills: string[];
  color: string;
}

// Hero Section Content
export const heroContent = {
  headline: "Senior Technical Lead | FinTech Architect | AI Engineer",
  subHeadline: "From architecting financial systems that process millions of transactions daily to building AI applications that unlock data intelligence at scale.",
};

// Chat Interface Configuration
export const chatConfig = {
  placeholderText: "Ask me about Prayag's experience with CSD Ghana or his work with RAG",
  sampleQuestions: [
    "Tell me about the CSD Ghana project",
    "What is VectorLoom?",
    "What's your experience with Spring Boot?",
    "How do you use RAG in your projects?",
  ],
};

// Technology Categories
export const technologyCategories: TechnologyCategory[] = [
  {
    title: "Backend & Architecture",
    icon: "server",
    technologies: [
      { name: "Java", proficiency: "expert" },
      { name: "Spring Boot", proficiency: "expert" },
      { name: "EJB", proficiency: "expert" },
      { name: "Struts", proficiency: "advanced" },
      { name: "Hibernate", proficiency: "expert" },
      { name: "Microservices", proficiency: "advanced" },
      { name: "Python", proficiency: "advanced" },
      { name: "FastAPI", proficiency: "advanced" },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "cloud",
    technologies: [
      { name: "AWS EC2", proficiency: "advanced" },
      { name: "AWS SQS", proficiency: "advanced" },
      { name: "Kubernetes", proficiency: "advanced" },
      { name: "Docker", proficiency: "expert" },
      { name: "CI/CD", proficiency: "advanced" },
    ],
  },
  {
    title: "AI & Data Science",
    icon: "brain",
    technologies: [
      { name: "RAG", proficiency: "expert" },
      { name: "Weaviate", proficiency: "expert" },
      { name: "Vector Databases", proficiency: "expert" },
      { name: "NLP", proficiency: "advanced" },
      { name: "LangChain", proficiency: "expert" },
      { name: "Groq", proficiency: "advanced" },
      { name: "Ollama", proficiency: "advanced" },
    ],
  },
  {
    title: "Frontend & Mobile",
    icon: "mobile",
    technologies: [
      { name: "Next.js", proficiency: "expert" },
      { name: "React", proficiency: "expert" },
      { name: "TailwindCSS", proficiency: "expert" },
      { name: "Flutter", proficiency: "advanced" },
      { name: "Android", proficiency: "advanced" },
      { name: "JavaScript", proficiency: "expert" },
    ],
  },
  {
    title: "Databases",
    icon: "database",
    technologies: [
      { name: "Oracle 12c", proficiency: "expert" },
      { name: "MySQL", proficiency: "expert" },
      { name: "MS SQL Server", proficiency: "advanced" },
      { name: "PL/SQL", proficiency: "expert" },
    ],
  },
];

// VectorLoom Project Showcase
export const vectorLoomProject: VectorLoomProject = {
  title: "VectorLoom",
  tagline: "Modular & Customizable RAG Platform",
  description: "A personal skill development project showcasing a highly modular full-stack Retrieval-Augmented Generation (RAG) platform. VectorLoom demonstrates advanced AI capabilities with pluggable vector database support, combining FastAPI backend with Next.js frontend. Built to explore and master modern AI/ML technologies through hands-on implementation.",
  features: [
    {
      title: "3D Vector Visualization",
      description: "Interactive visualization of vector embeddings in 3D space",
      icon: "cube",
    },
    {
      title: "Hybrid Search",
      description: "Combines semantic and keyword search for optimal retrieval",
      icon: "search",
    },
    {
      title: "Multi-modal Ingestion",
      description: "Support for PDF, DOCX, CSV, GitHub repos, and web scraping",
      icon: "upload",
    },
    {
      title: "Pluggable Architecture",
      description: "Modular design supporting Weaviate, Qdrant, and more vector databases",
      icon: "brain",
    },
  ],
  techStack: [
    { name: "Weaviate", icon: "weaviate-icon", color: "#00C853" },
    { name: "Qdrant", icon: "qdrant-icon", color: "#DC395F" },
    { name: "FastAPI", icon: "fastapi-icon", color: "#009688" },
    { name: "Next.js", icon: "nextjs-icon", color: "#00D9FF" },
    { name: "LangChain", icon: "langchain-icon", color: "#1C3C3C" },
  ],
  githubUrl: "https://github.com/prayagdave25/vectorloom",
  demoUrl: null,
};

// Skills Pillars
export const skillsPillars: SkillPillar[] = [
  {
    title: "Enterprise Lead",
    subtitle: "10 years building national-scale financial systems",
    icon: "building",
    skills: [
      "Java & Spring Boot",
      "EJB & Struts",
      "Oracle 12c",
      "Microservices Architecture",
      "High-Availability Systems",
    ],
    color: "#A78BFA",
  },
  {
    title: "AI Innovator",
    subtitle: "Pioneering intelligent systems with VectorLoom and beyond",
    icon: "sparkles",
    skills: [
      "Python & FastAPI",
      "LLM Orchestration",
      "Vector Databases",
      "RAG Applications",
      "Multi-Agent Systems (Coming Soon)",
      "Reasoning Models (Coming Soon)",
    ],
    color: "#00D9FF",
  },
];
