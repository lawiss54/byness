'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useUnifiedCart } from '../shared/UnifiedCartContext';
import { useRouter } from 'next/navigation';

export default function CartHeader() {
  const { itemCount } = useUnifiedCart();
  const router = useRouter();
  const goShop = () => {
    router.push('/boutique')
  }

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
        onClick={goShop}
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-semibold">Continuer mes achats</span>
      </motion.button>

      {/* Header Badge */}
      <motion.div
        className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6"
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ShoppingBag className="w-6 h-6 text-brand-camel-500" />
        </motion.div>
        <span className="text-brand-darkGreen-600 font-semibold">
          {itemCount} article{itemCount > 1 ? 's' : ''} dans votre panier
        </span>
      </motion.div>

      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-brand-darkGreen-500 mb-4">
        Mon Panier
      </h1>
      <p className="text-xl text-brand-darkGreen-400 font-secondary">
        Finalisez votre sélection avant de passer commande
      </p>
    </motion.div>
  );
}