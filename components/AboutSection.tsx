'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { fadeInUp, fadeInUpReduced } from '@/lib/animations';
import { FaRocket, FaCode, FaLightbulb } from 'react-icons/fa';

const highlights = [
  {
    icon: <FaRocket className="w-6 h-6" />,
    title: '10+ Years in FinTech',
    description: 'Building enterprise-scale financial systems for central banks and national institutions across the globe',
  },
  {
    icon: <FaCode className="w-6 h-6" />,
    title: 'Full-Stack Expertise',
    description: 'From Java/Spring Boot backends to Next.js frontends and cloud-native AWS deployments',
  },
  {
    icon: <FaLightbulb className="w-6 h-6" />,
    title: 'AI Innovation',
    description: 'Pioneering RAG applications, multi-agent systems, and reasoning models with cutting-edge LLMs',
  },
];

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  const fadeVariant = prefersReducedMotion ? fadeInUpReduced : fadeInUp;

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        variants={fadeVariant}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
          About Me
        </h2>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
          I'm a Senior Technical Lead at Montran Corporation with over a decade of experience 
          architecting national-scale financial infrastructure for central banks worldwide. 
          From CSD Ghana processing 1.5M+ daily transactions to Qatar's regulatory-compliant platform, 
          I've delivered systems that power entire economies. Now, I'm channeling that expertise 
          into the AI revolution, building intelligent RAG systems like VectorLoom that transform 
          how we interact with data. My unique blend of enterprise reliability and AI innovation 
          means I don't just build systems—I build systems that scale, perform, and push boundaries.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((highlight, index) => (
          <motion.div
            key={highlight.title}
            variants={fadeVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={index}
            className="bg-background-secondary border border-border rounded-lg p-6 text-center hover:border-accent-primary transition-colors"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-primary/20 text-accent-primary mb-4">
              {highlight.icon}
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">
              {highlight.title}
            </h3>
            <p className="text-text-secondary">
              {highlight.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
