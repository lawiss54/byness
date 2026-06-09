'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Gift, Truck, Star, Heart, Zap } from 'lucide-react';

export default function LoginFeatures() {
  const features = [
    {
        icon: Shield,
        title: 'Sécurité renforcée',
        description: 'Accès protégé avec authentification et surveillance continue'
    },
    {
        icon: Gift,
        title: 'Accès restreint',
        description: 'Fonctionnalités réservées aux administrateurs autorisés'
    },
    {
        icon: Truck,
        title: 'Suivi logistique',
        description: 'Gérez les livraisons, stocks et commandes en temps réel'
    },
    {
        icon: Star,
        title: 'Statistiques avancées',
        description: 'Visualisez les performances et rapports détaillés en un clic'
    }
    ];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex items-center gap-3 mb-8"
        variants={itemVariants}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Heart className="w-6 h-6 text-brand-camel-500" />
        </motion.div>
        <h3 className="text-2xl font-playfair font-bold text-brand-darkGreen-500">
          Gestion puissante. Contrôle total
        </h3>
      </motion.div>

      <div className="grid gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group flex items-start gap-4 p-4 bg-white/40 backdrop-blur-sm rounded-2xl hover:bg-white/60 transition-all duration-300"
            whileHover={{ x: 10, scale: 1.02 }}
          >
            <motion.div
              className="p-3 bg-brand-camel-100 rounded-xl group-hover:bg-brand-camel-200 transition-colors duration-300"
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              <feature.icon className="w-6 h-6 text-brand-camel-600" />
            </motion.div>
            <div className="flex-1">
              <h4 className="font-semibold text-brand-darkGreen-500 mb-1 group-hover:text-brand-camel-600 transition-colors">
                {feature.title}
              </h4>
              <p className="text-brand-darkGreen-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      
    </motion.div>
  );
}