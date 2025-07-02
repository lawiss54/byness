"use client";

import { motion } from "framer-motion";
import { categoryButtonVariants } from "./animations/variants";
import type { Category } from "@/components/Boutique/types/product.types";

interface Props {
  category: Category;
  selected: boolean;
  onSelect: (name: string) => void;
}

export const CategoryButton = ({ category, selected, onSelect }: Props) => (
  <motion.button
    onClick={() => onSelect(category.name)}
    className={`
      group relative flex flex-col items-center p-6 rounded-2xl min-h-[140px] min-w-[120px] transition-all duration-500
      ${selected
        ? "bg-gradient-to-br from-brand-darkGreen-500 to-brand-darkGreen-700 text-white shadow-2xl border-brand-darkGreen-400"
        : "bg-white text-brand-darkGreen-600 shadow-lg hover:shadow-xl hover:bg-brand-camel-50 border-transparent hover:border-brand-camel-300"}
    `}
    variants={categoryButtonVariants}
    initial="inactive"
    animate={selected ? "active" : "inactive"}
    whileHover="hover"
    whileTap={{ scale: 0.95 }}
    layout
  >
    {selected && (
      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-brand-camel-500 rounded-full flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="w-3 h-3 bg-white rounded-full" />
      </motion.div>
    )}

    <motion.div className="text-4xl mb-3" animate={{ scale: selected ? 1.1 : 1 }}>
      {category.icon}
    </motion.div>

    <div className="text-center space-y-1">
      <motion.span className="font-secondary font-bold text-lg block">{category.name}</motion.span>
      <motion.div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${selected ? "bg-white/20 text-white/90" : "bg-brand-camel-100 text-brand-camel-700"}`}>
        <span>{category.count}</span>
        <span>Produit</span>
      </motion.div>
    </div>

    <motion.div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-camel-400/10 to-brand-sage-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </motion.button>
);
