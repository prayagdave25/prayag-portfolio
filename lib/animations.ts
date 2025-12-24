// Framer Motion animation variants for Prayag Portfolio
// All animations use GPU-accelerated properties (transform, opacity) only

import { Variants } from 'framer-motion';

// Fade in with upward slide animation
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

// Reduced motion variant for fadeInUp
export const fadeInUpReduced: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
};

// Simple fade in animation
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.6 }
  },
};

// Reduced motion variant for fadeIn (same as regular since it's already minimal)
export const fadeInReduced: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
};

// Scale in with fade animation
export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  },
};

// Reduced motion variant for scaleIn
export const scaleInReduced: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
};

// Container for staggered children animations
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Reduced motion variant for staggerContainer
export const staggerContainerReduced: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

// Slide in from left animation
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

// Reduced motion variant for slideInLeft
export const slideInLeftReduced: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
};

// Slide in from right animation
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  },
};

// Reduced motion variant for slideInRight
export const slideInRightReduced: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.2 }
  },
};

// Hover lift effect (moves element up slightly)
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.2 } },
};

// Reduced motion variant for hoverLift (no movement)
export const hoverLiftReduced = {
  whileHover: { transition: { duration: 0 } },
};

// Hover scale effect (slightly enlarges element)
export const hoverScale = {
  whileHover: { scale: 1.02, transition: { duration: 0.2 } },
};

// Reduced motion variant for hoverScale (no scaling)
export const hoverScaleReduced = {
  whileHover: { transition: { duration: 0 } },
};

/**
 * Helper function to get the appropriate animation variant based on reduced motion preference
 */
export function getAnimationVariant(
  normalVariant: Variants,
  reducedVariant: Variants,
  prefersReducedMotion: boolean
): Variants {
  return prefersReducedMotion ? reducedVariant : normalVariant;
}

