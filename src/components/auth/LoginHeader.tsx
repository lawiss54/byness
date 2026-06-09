'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, Heart } from 'lucide-react';

export default function LoginHeader() {
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div variants={itemVariants}>
      {/* Brand Badge */}
      <motion.div
        className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-8"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <Crown className="w-5 h-5 text-brand-camel-500" />
        </motion.div>
        <span className="text-brand-darkGreen-600 font-semibold">
          Espace Administrateur
        </span>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-4 h-4 text-brand-camel-500" />
        </motion.div>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        className="text-5xl md:text-7xl font-playfair font-bold text-brand-darkGreen-500 mb-6 leading-tight"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Bienvenue
        <motion.span
          className="block text-brand-camel-500"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          de retour
        </motion.span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="text-xl text-brand-darkGreen-400 font-secondary max-w-2xl leading-relaxed mb-8"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        Espace administrateur uniquement. Trois échecs de connexion entraîneront un blocage temporaire de votre appareil.

      </motion.p>

      {/* Welcome Stats */}
      <motion.div
        className="grid grid-cols-3 gap-6 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        {[
          { number: '99.9%', label: 'Disponibilité du système' },
            { number: '1 200+', label: 'Commandes traitées' },
            { number: '3', label: 'Tentatives autorisées' },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg"
            whileHover={{ y: -5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-2xl font-bold text-brand-camel-500 mb-1">
              {stat.number}
            </div>
            <div className="text-sm text-brand-darkGreen-500 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}