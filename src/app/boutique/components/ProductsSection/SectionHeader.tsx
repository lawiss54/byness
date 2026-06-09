
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { ANIMATIONS } from './constants/animations';

interface SectionHeaderProps {
  productCount: number;
}

export const SectionHeader = memo(({ productCount }: SectionHeaderProps) => (
  <motion.div
    className="text-center mb-12"
    variants={ANIMATIONS.container}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
  >
    <motion.div
      className="inline-flex items-center gap-2 bg-brand-camel-100 px-4 py-2 rounded-full mb-4"
      variants={ANIMATIONS.item}
    >
      <Filter className="w-4 h-4 text-brand-camel-600" />
      <span className="text-sm font-medium text-brand-camel-700">
        {productCount} produits disponibles
      </span>
    </motion.div>

    <motion.h2
      className="text-5xl font-playfair font-bold text-brand-darkGreen-600 mb-4"
      variants={ANIMATIONS.item}
    >
      Notre collection  <span className="text-brand-camel-500">de produits</span>
    </motion.h2>
    <motion.p
      className="text-brand-darkGreen-500 font-secondary text-xl max-w-2xl mx-auto"
      variants={ANIMATIONS.item}
    >
      Soyez à la pointe de la mode féminine avec notre sélection exclusive
    </motion.p>
  </motion.div>
));

SectionHeader.displayName = 'SectionHeader';
