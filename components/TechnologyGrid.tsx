'use client';

import { motion } from 'framer-motion';
import { TechnologyCategory } from '@/lib/constants';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { fadeInUp, fadeInUpReduced, staggerContainer, staggerContainerReduced } from '@/lib/animations';
import { FaServer, FaCloud, FaBrain, FaMobile, FaDatabase } from 'react-icons/fa';

interface TechnologyGridProps {
  categories: TechnologyCategory[];
}

const iconMap: Record<string, React.ReactNode> = {
  server: <FaServer className="w-6 h-6" />,
  cloud: <FaCloud className="w-6 h-6" />,
  brain: <FaBrain className="w-6 h-6" />,
  mobile: <FaMobile className="w-6 h-6" />,
  database: <FaDatabase className="w-6 h-6" />,
};

const proficiencyColors = {
  expert: '#00D9FF',
  advanced: '#00B8D4',
  intermediate: '#0891B2',
};

export function TechnologyGrid({ categories }: TechnologyGridProps) {
  const prefersReducedMotion = useReducedMotion();
  const fadeVariant = prefersReducedMotion ? fadeInUpReduced : fadeInUp;
  const containerVariant = prefersReducedMotion ? staggerContainerReduced : staggerContainer;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <motion.div
          key={category.title}
          variants={fadeVariant}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={index}
          className="bg-background-secondary border-2 border-accent-primary/20 rounded-lg p-6 hover:border-accent-primary transition-all duration-300 relative overflow-hidden group hover:shadow-2xl"
          style={{
            boxShadow: '0 4px 20px rgba(0, 217, 255, 0.1)',
          }}
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.2) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          ></div>

          {/* Corner brackets */}
          <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-accent-primary/50"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-accent-primary/50"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-accent-primary/50"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-accent-primary/50"></div>

          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="text-accent-primary bg-accent-primary/10 p-2 rounded border border-accent-primary/30">
              {iconMap[category.icon]}
            </div>
            <h3 className="text-xl font-bold text-text-primary font-mono">
              <span className="text-accent-primary text-sm">{'# '}</span>
              {category.title}
            </h3>
          </div>
          
          <motion.div
            variants={containerVariant}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 relative z-10"
          >
            {category.technologies.map((tech) => (
              <motion.span
                key={tech.name}
                variants={fadeVariant}
                className="px-3 py-1.5 rounded text-sm font-mono font-medium hover:scale-105 transition-transform cursor-default"
                style={{
                  backgroundColor: `${proficiencyColors[tech.proficiency || 'intermediate']}15`,
                  color: proficiencyColors[tech.proficiency || 'intermediate'],
                  border: `1px solid ${proficiencyColors[tech.proficiency || 'intermediate']}60`,
                }}
              >
                {tech.name}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
