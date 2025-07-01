"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { headerVariants } from "./animations/variants";

export default function HeroHeading() {
  return (
    <motion.div
      className="text-center mb-20"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg mb-8"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.span
          className="w-3 h-3 bg-brand-camel-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-brand-darkGreen-600 font-semibold text-lg">
          Collection Exclusive 2025
        </span>
        <Zap className="w-5 h-5 text-brand-camel-500" />
      </motion.div>

      <motion.h2
        className="text-6xl md:text-8xl font-playfair font-bold text-brand-darkGreen-500 mb-8 leading-tight"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Élégance
        <motion.span
          className="block text-brand-camel-500"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Intemporelle
        </motion.span>
      </motion.h2>

      <motion.p
        className="text-xl text-brand-darkGreen-400 font-secondary max-w-4xl mx-auto"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        Découvrez nos pièces uniques, conçues pour la femme moderne qui allie élégance et authenticité dans chaque détail de sa garde-robe.
      </motion.p>
    </motion.div>
  );
}
