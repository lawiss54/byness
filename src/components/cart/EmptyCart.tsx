'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function EmptyCart() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

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
    <motion.div
      className="text-center py-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Empty Cart Illustration */}
      <motion.div
        className="relative mb-12"
        variants={itemVariants}
      >
        <motion.div
          className="w-32 h-32 mx-auto bg-gradient-to-br from-brand-sage-100 to-brand-camel-100 rounded-full flex items-center justify-center shadow-2xl"
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ShoppingBag className="w-16 h-16 text-brand-camel-500" />
        </motion.div>
        
        {/* Floating Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-brand-camel-200 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Content */}
      <motion.div variants={itemVariants}>
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-brand-darkGreen-500 mb-6">
          Votre panier est vide
        </h2>
        <p className="text-xl text-brand-darkGreen-400 font-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
          Il semble que vous n'ayez pas encore ajouté d'articles à votre panier. 
          Découvrez notre magnifique collection et trouvez vos pièces favorites !
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        variants={itemVariants}
      >
        <motion.button
          className="group flex items-center gap-3 px-8 py-4 bg-brand-camel-500 hover:bg-brand-camel-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Découvrir nos produits</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.button>

        <motion.button
          className="group flex items-center gap-3 px-8 py-4 bg-white border-2 border-brand-darkGreen-500 text-brand-darkGreen-500 hover:bg-brand-darkGreen-500 hover:text-white font-semibold rounded-2xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart className="w-5 h-5" />
          <span>Ma liste de souhaits</span>
        </motion.button>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        className="mt-16 p-8 bg-gradient-to-r from-brand-sage-50 to-brand-camel-50 rounded-3xl max-w-4xl mx-auto"
        variants={itemVariants}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-brand-camel-500" />
          </motion.div>
          <h3 className="text-2xl font-playfair font-bold text-brand-darkGreen-500">
            Suggestions pour vous
          </h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Nouvelles Collections', desc: 'Découvrez nos dernières créations' },
            { title: 'Offres Spéciales', desc: 'Profitez de nos promotions exclusives' },
            { title: 'Tendances Mode', desc: 'Les pièces incontournables de la saison' }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2 }}
            >
              <h4 className="font-semibold text-brand-darkGreen-500 mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-brand-darkGreen-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
