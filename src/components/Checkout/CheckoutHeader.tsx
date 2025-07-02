'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function CheckoutHeader() {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
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
          Finaliser votre commande
        </span>
      </motion.div>

      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-brand-darkGreen-500 mb-4">
        Checkout
      </h1>
      <p className="text-xl text-brand-darkGreen-400 font-secondary">
        Quelques étapes simples pour finaliser votre achat
      </p>
    </motion.div>
  );
}