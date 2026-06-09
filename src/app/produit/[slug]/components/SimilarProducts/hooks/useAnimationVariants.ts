
import { useMemo } from 'react';
import type { AnimationVariants } from '../types';

/**
 * Custom hook for animation variants
 * 
 * Benefits:
 * - Reduces bundle size through code splitting
 * - Memoizes variants to prevent unnecessary re-creation
 * - Centralized animation configuration
 * - Easier to maintain and modify animations
 * 
 * @returns Memoized animation variants for container and items
 */
export const useAnimationVariants = (): AnimationVariants => {
  return useMemo(() => ({
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    },
    itemVariants: {
      hidden: { y: 30, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth animation
        },
      },
    },
  }), []);
};

