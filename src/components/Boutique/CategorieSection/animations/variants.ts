
import { Easing } from "framer-motion";

export const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as Easing },
  },
};

export const categoryButtonVariants = {
  inactive: {
    scale: 1,
    y: 0,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  },
  active: {
    scale: 1.05,
    y: -5,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
  hover: {
    scale: 1.02,
    y: -3,
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.12)",
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 25,
    },
  },
};
