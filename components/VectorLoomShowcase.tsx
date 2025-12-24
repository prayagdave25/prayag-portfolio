'use client';

import { motion } from 'framer-motion';
import { ProjectFeature, TechStack } from '@/lib/constants';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { fadeInUp, fadeInUpReduced, staggerContainer, staggerContainerReduced, hoverLift, hoverLiftReduced } from '@/lib/animations';
import { FaCube, FaSearch, FaUpload, FaBrain, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface VectorLoomShowcaseProps {
  title: string;
  tagline: string;
  description: string;
  features: ProjectFeature[];
  techStack: TechStack[];
  githubUrl: string;
  demoUrl: string | null;
}

const featureIconMap: Record<string, React.ReactNode> = {
  cube: <FaCube className="w-6 h-6" />,
  search: <FaSearch className="w-6 h-6" />,
  upload: <FaUpload className="w-6 h-6" />,
  brain: <FaBrain className="w-6 h-6" />,
};

export function VectorLoomShowcase({
  title,
  tagline,
  description,
  features,
  techStack,
  githubUrl,
  demoUrl,
}: VectorLoomShowcaseProps) {
  const prefersReducedMotion = useReducedMotion();
  const fadeVariant = prefersReducedMotion ? fadeInUpReduced : fadeInUp;
  const containerVariant = prefersReducedMotion ? staggerContainerReduced : staggerContainer;
  const liftVariant = prefersReducedMotion ? hoverLiftReduced : hoverLift;

  return (
    <motion.div
      variants={fadeVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="max-w-5xl mx-auto"
    >
      <div className="bg-gradient-to-br from-background-secondary to-background-primary border-2 border-accent-primary/30 rounded-2xl p-8 md:p-12 relative overflow-hidden group hover:border-accent-primary/60 transition-all duration-300"
        style={{
          boxShadow: '0 8px 32px rgba(255, 211, 0, 0.2)',
        }}
      >
        {/* Tech grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 211, 0, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 211, 0, 0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>

        {/* Corner brackets */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-accent-primary/60"></div>
        <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-accent-primary/60"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-accent-primary/60"></div>
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-accent-primary/60"></div>

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h3 className="text-4xl font-bold text-text-primary mb-2 font-mono">
            <span className="text-accent-primary">&lt;</span>
            {title}
            <span className="text-accent-primary">/&gt;</span>
          </h3>
          <p className="text-xl text-accent-primary font-semibold mb-4 font-mono">
            // {tagline}
          </p>
          <p className="text-text-secondary max-w-2xl mx-auto font-mono text-sm">
            {description}
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariant}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 relative z-10"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              variants={fadeVariant}
              {...liftVariant}
              className="bg-background-primary border-2 border-accent-primary/20 rounded-lg p-6 hover:border-accent-primary/60 transition-all duration-300 relative overflow-hidden group/item"
            >
              {/* Mini corner brackets */}
              <div className="absolute top-1 left-1 w-3 h-3 border-l border-t border-accent-primary/40 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
              <div className="absolute top-1 right-1 w-3 h-3 border-r border-t border-accent-primary/40 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-accent-primary/40 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-accent-primary/40 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>

              <div className="flex items-start gap-4 relative z-10">
                <div className="text-accent-primary mt-1 bg-accent-primary/10 p-2 rounded border border-accent-primary/30">
                  {featureIconMap[feature.icon]}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-text-primary mb-1 font-mono">
                    <span className="text-accent-primary text-xs">[{idx + 1}] </span>
                    {feature.title}
                  </h4>
                  <p className="text-sm text-text-secondary font-mono">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack */}
        <div className="mb-8 relative z-10">
          <h4 className="text-lg font-semibold text-text-primary mb-4 text-center font-mono">
            <span className="text-accent-primary"># </span>
            Built With
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="px-4 py-2 rounded font-medium font-mono border-2 hover:scale-105 transition-transform cursor-default"
                style={{
                  backgroundColor: `${tech.color}15`,
                  color: tech.color,
                  borderColor: `${tech.color}60`,
                }}
              >
                {tech.name}
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-accent-primary text-background-primary rounded-lg font-semibold font-mono hover:bg-accent-hover transition-all duration-300 border-2 border-accent-primary hover:shadow-lg hover:shadow-accent-primary/50"
          >
            <FaGithub className="w-5 h-5" />
            View on GitHub
          </a>
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border-2 border-accent-primary text-accent-primary rounded-lg font-semibold font-mono hover:bg-accent-primary hover:text-background-primary transition-all duration-300"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
