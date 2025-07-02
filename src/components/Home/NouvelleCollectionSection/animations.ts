// animations.ts
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const itemVariants = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const backgroundVariants = {
  animate: {
    background: [
      "linear-gradient(45deg, #2d433a, #4a7c6a, #da944a)",
      "linear-gradient(45deg, #4a7c6a, #da944a, #2d433a)",
      "linear-gradient(45deg, #da944a, #2d433a, #4a7c6a)",
      "linear-gradient(45deg, #2d433a, #4a7c6a, #da944a)",
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const floatingElementsConfig = {
  count: 6,
  animate: {
    y: [0, -30, 0],
    opacity: [0.2, 0.8, 0.2],
    scale: [1, 1.5, 1],
  },
  transition: {
    baseDuration: 3,
    randomRange: 2,
  },
};