'use client';

import { motion } from 'framer-motion';
import { 
  fadeInUp, 
  fadeInUpReduced, 
  staggerContainer, 
  staggerContainerReduced 
} from '@/lib/animations';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useEffect, useState } from 'react';

interface HeroSectionProps {
  headline: string;
  subHeadline: string;
}

export function HeroSection({ headline, subHeadline }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [text, setText] = useState('');
  const [mounted, setMounted] = useState(false);
  const fullText = '> Initializing portfolio...';
  
  // Select appropriate animation variants based on user preference
  const fadeVariant = prefersReducedMotion ? fadeInUpReduced : fadeInUp;
  const containerVariant = prefersReducedMotion ? staggerContainerReduced : staggerContainer;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setText(fullText);
      return;
    }
    
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-background-primary px-4 sm:px-6 lg:px-8 relative overflow-hidden tech-grid"
      aria-label="Hero section"
    >
      {/* Animated corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-accent-primary opacity-50"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-accent-primary opacity-50"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-accent-primary opacity-50"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-accent-primary opacity-50"></div>

      {/* Floating particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent-primary rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0.2
              }}
              animate={{ 
                y: [null, Math.random() * window.innerHeight],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        variants={containerVariant}
        initial="initial"
        animate="animate"
        className="max-w-5xl mx-auto text-center relative z-10"
      >
        {/* Terminal-style intro */}
        <motion.div
          variants={fadeVariant}
          className="font-mono text-accent-primary text-sm mb-8 text-left max-w-md mx-auto"
        >
          {text}<span className="animate-pulse">_</span>
        </motion.div>

        {/* Headline with glowing effect */}
        <motion.h1
          variants={fadeVariant}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight relative"
        >
          <span className="relative inline-block">
            {headline.split('|').map((part, index) => (
              <span key={index}>
                {index > 0 && <span className="text-accent-primary mx-2">|</span>}
                <span className="hover:text-accent-primary transition-colors duration-300">
                  {part.trim()}
                </span>
              </span>
            ))}
          </span>
        </motion.h1>

        {/* Sub-headline with border accent */}
        <motion.div
          variants={fadeVariant}
          className="relative"
        >
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-accent-primary via-accent-secondary to-transparent"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto leading-relaxed pl-8 border-l-2 border-accent-primary/30">
            {subHeadline}
          </p>
        </motion.div>

        {/* Tech stats bar */}
        <motion.div
          variants={fadeVariant}
          className="mt-12 flex flex-wrap justify-center gap-6 text-sm font-mono"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-background-secondary/50 border border-accent-primary/30 rounded">
            <span className="text-accent-primary">●</span>
            <span className="text-text-secondary">10+ Years Experience</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-background-secondary/50 border border-accent-primary/30 rounded">
            <span className="text-accent-primary">●</span>
            <span className="text-text-secondary">National-Scale Systems</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-background-secondary/50 border border-accent-primary/30 rounded">
            <span className="text-accent-primary">●</span>
            <span className="text-text-secondary">AI Innovation</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
