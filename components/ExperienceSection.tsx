'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { fadeInUp, fadeInUpReduced, staggerContainer, staggerContainerReduced } from '@/lib/animations';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';

interface Experience {
  title: string;
  company: string;
  location?: string;
  period: string;
  highlights: string[];
  isAI?: boolean;
}

const experiences: Experience[] = [
  {
    title: 'Senior Technical Lead',
    company: 'Montran Corporation India Pvt Ltd',
    location: 'Mumbai',
    period: 'June 2016 - Present',
    highlights: [
      '2025: CSD Ghana - Orchestrated end-to-end delivery of national Central Securities Depository system processing 1.5M+ transactions daily, architected for 100K concurrent operations with 150K peak capacity',
      '2024: Central Bank of Qatar - Spearheaded CSD platform implementation and live deployment with full regulatory compliance',
      '2023: Central Bank of Solomon Islands - Managed complete project lifecycle and customized CSD product for central bank requirements',
      '2022: Central Bank of Mauritania - Led technical customization and production deployment of CSD system',
      '2021: Kotak PFMS - Deployed cloud-native platform on AWS with Kubernetes, SQS, EC2, and Docker for enterprise scalability',
      '2016-2020: NACH Integration - Built electronic clearing modules for SBI, Standard Chartered, and PayTm',
    ],
  },
  {
    title: 'AI Engineer & Innovator',
    company: 'Personal Skill Development',
    period: '2023 - Present',
    highlights: [
      '2024-2025: VectorLoom - Built full-stack RAG application with 3D vector visualization and hybrid search',
      'Integrated multiple LLM providers: Ollama, Groq, OpenAI, Anthropic',
      'Implemented multi-modal data ingestion pipeline (PDF, DOCX, CSV, GitHub, web scraping)',
      'Actively developing multi-agent systems and reasoning model applications',
      'Self-directed learning to stay ahead of AI/ML trends and emerging technologies',
    ],
    isAI: true,
  },
  {
    title: 'Core Developer',
    company: 'Immortal Computer Lab (ICL)',
    location: 'Mumbai',
    period: 'December 2014 - June 2016',
    highlights: [
      'Designed and implemented core modules for EMSS™ (ERP) and ICLIGM (Shipping/Logistics) software',
      'Managed multi-project lifecycles for international importers and exporters',
      'Designed and administered Software Version Control processes',
    ],
  },
];

export function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const fadeVariant = prefersReducedMotion ? fadeInUpReduced : fadeInUp;
  const containerVariant = prefersReducedMotion ? staggerContainerReduced : staggerContainer;

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        variants={containerVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="space-y-8"
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={fadeVariant}
            className="bg-background-secondary border-2 border-accent-primary/20 rounded-lg p-6 md:p-8 relative overflow-hidden group hover:border-accent-primary/60 transition-all duration-300"
            style={{
              boxShadow: exp.isAI ? '0 4px 20px rgba(0, 217, 255, 0.15)' : '0 4px 20px rgba(0, 217, 255, 0.1)',
            }}
          >
            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-accent-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-accent-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-accent-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-accent-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            {/* Tech grid overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
              style={{
                backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.2) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            ></div>

            <div className="flex items-start gap-4 mb-4 relative z-10">
              <div className="text-accent-primary mt-1 bg-accent-primary/10 p-2 rounded border border-accent-primary/30">
                <FaBriefcase className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-text-primary mb-1 font-mono">
                  <span className="text-accent-primary">&lt;</span>
                  {exp.title}
                  <span className="text-accent-primary">/&gt;</span>
                </h3>
                <p className="text-accent-primary font-semibold mb-1 font-mono">
                  {exp.company}
                  {exp.location && <span className="text-text-secondary"> • {exp.location}</span>}
                </p>
                <p className="text-sm text-text-secondary font-mono">
                  <span className="text-accent-primary">{'// '}</span>
                  {exp.period}
                </p>
              </div>
            </div>
            
            <ul className="space-y-3 ml-10 relative z-10">
              {exp.highlights.map((highlight, idx) => (
                <li key={idx} className="text-text-secondary flex items-start gap-3 group/item">
                  <span className="text-accent-primary font-mono text-sm mt-0.5 opacity-50 group-hover/item:opacity-100 transition-opacity">
                    [{idx + 1}]
                  </span>
                  <span className="font-mono text-sm leading-relaxed group-hover/item:text-text-primary transition-colors">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
