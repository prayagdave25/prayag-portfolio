'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 2,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // If user prefers reduced motion, skip animation and show final value immediately
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    const controls = animate(count, target, {
      duration,
      ease: 'easeOut',
    });

    return controls.stop;
  }, [count, target, duration, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return () => unsubscribe();
  }, [rounded, prefersReducedMotion]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.5 }}
    >
      {displayValue.toLocaleString()}
    </motion.span>
  );
};
