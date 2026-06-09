import { motion } from "framer-motion";
import { memo } from "react";

export const SectionHeader: React.FC = memo(() => {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          className="w-3 h-3 bg-brand-camel-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-brand-darkGreen-600 font-semibold">
          Produits Similaires
        </span>
      </motion.div>

      <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-darkGreen-500 mb-4">
        Vous Aimerez
        <motion.span
          className="block text-brand-camel-500"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Aussi
        </motion.span>
      </h2>

      <p className="text-xl text-brand-darkGreen-400 font-secondary max-w-2xl mx-auto">
        Découvrez notre sélection de produits dans le même esprit, choisis spécialement pour vous
      </p>
    </motion.div>
  );
});

SectionHeader.displayName = 'SectionHeader';
