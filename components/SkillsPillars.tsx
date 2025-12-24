'use client';

import { motion } from 'framer-motion';
import { 
  slideInLeft, 
  slideInLeftReduced,
  slideInRight, 
  slideInRightReduced,
  staggerContainer, 
  staggerContainerReduced,
  fadeInUp, 
  fadeInUpReduced,
  hoverLift,
  hoverLiftReduced
} from '@/lib/animations';
import { SkillPillar } from '@/lib/constants';
import { FaBuilding, FaCheckCircle } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface SkillsPillarsProps {
  pillars: SkillPillar[];
}

// Icon mapping for pillar types
const iconMap: Record<string, React.ReactNode> = {
  building: <FaBuilding className="w-8 h-8" aria-hidden="true" />,
  sparkles: <HiSparkles className="w-8 h-8" aria-hidden="true" />,
};

export function SkillsPillars({ pillars }: SkillsPillarsProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Select appropriate animation variants based on user preference
  const slideLeftVariant = prefersReducedMotion ? slideInLeftReduced : slideInLeft;
  const slideRightVariant = prefersReducedMotion ? slideInRightReduced : slideInRight;
  const containerVariant = prefersReducedMotion ? staggerContainerReduced : staggerContainer;
  const fadeVariant = prefersReducedMotion ? fadeInUpReduced : fadeInUp;
  const liftVariant = prefersReducedMotion ? hoverLiftReduced : hoverLift;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-primary">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Dual Expertise
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Bridging enterprise-scale systems with cutting-edge AI innovation
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          role="list"
          aria-label="Professional expertise areas"
        >
          {pillars.map((pillar, index) => {
            // Alternate slide-in direction: left for first, right for second
            const slideVariant = index === 0 ? slideLeftVariant : slideRightVariant;
            
            return (
              <motion.div
                key={pillar.title}
                variants={slideVariant}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                {...liftVariant}
                className="h-full"
                role="listitem"
              >
                <article
                  className="h-full bg-background-secondary border-2 border-accent-primary/20 rounded-lg p-8 transition-all duration-300 hover:border-accent-primary/60 hover:shadow-2xl relative overflow-hidden group"
                  style={{
                    boxShadow: `0 4px 20px ${pillar.color}20`,
                  }}
                  aria-labelledby={`pillar-${index}-title`}
                >
                  {/* Animated corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Tech grid overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}
                  ></div>

                  {/* Pillar Header */}
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div
                      className="p-3 rounded-lg border-2 border-accent-primary/30 relative overflow-hidden"
                      style={{ backgroundColor: `${pillar.color}10` }}
                      aria-hidden="true"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-transparent"></div>
                      <div style={{ color: pillar.color }} className="relative z-10">
                        {iconMap[pillar.icon] || <FaBuilding className="w-8 h-8" aria-hidden="true" />}
                      </div>
                    </div>
                    <div>
                      <h3 
                        id={`pillar-${index}-title`}
                        className="text-2xl font-bold text-text-primary font-mono"
                      >
                        <span className="text-accent-primary">&lt;</span>
                        {pillar.title}
                        <span className="text-accent-primary">/&gt;</span>
                      </h3>
                      <p className="text-sm text-text-secondary mt-1 font-mono">
                        // {pillar.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <motion.ul
                    variants={containerVariant}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="space-y-4 relative z-10"
                    aria-label={`${pillar.title} skills`}
                  >
                    {pillar.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skill}
                        variants={fadeVariant}
                        className="flex items-start gap-3 group/item"
                      >
                        <span className="text-accent-primary font-mono text-sm mt-0.5 opacity-50 group-hover/item:opacity-100 transition-opacity">
                          [{skillIndex + 1}]
                        </span>
                        <span className="text-text-primary text-lg font-mono group-hover/item:text-accent-primary transition-colors">
                          {skill}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
