'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from './CartContext';

export default function CartHeader() {
  const { itemCount } = useCart();

  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Back Button */}
      <motion.button
        className="inline-flex items-center gap-2 text-brand-darkGreen-500 hover:text-brand-camel-500 mb-6 transition-colors duration-300"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Continuer mes achats</span>
      </motion.button>

   

      <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-darkGreen-500 mb-4">
        Mon Panier
      </h2>
      <p className="text-xl text-brand-darkGreen-400 font-secondary">
        Finalisez votre sélection avant de passer commande
      </p>
    </motion.div>
  );
}