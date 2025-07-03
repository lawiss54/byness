'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { ExclusiveProductsProps } from './NouvelleCollectionSection/types';
import { useCountdownTimer, useProductHover } from './NouvelleCollectionSection/hooks';
import { containerVariants, itemVariants, backgroundVariants } from './NouvelleCollectionSection/animations';
import dynamic from 'next/dynamic';

// Dynamic imports مع loading states أفضل
const FloatingElements = dynamic(() => import('./NouvelleCollectionSection/FloatingElements'), {
  loading: () => null,
  ssr: false
});

const ProductCard = dynamic(() => import('./NouvelleCollectionSection/ProductCard'), {
  loading: () => null,
  ssr: false
});

const SectionHeader = dynamic(() => import('./NouvelleCollectionSection/SectionHeader'), {
  loading: () => null,
  ssr: false
});

const VipCTA = dynamic(() => import('./NouvelleCollectionSection/VipCTA'), {
  loading: null,
  ssr: false
});

export default function NouvelleCollectionSection({ products }: ExclusiveProductsProps) {
  const { timeLeft, formatTime } = useCountdownTimer(380);
  const { hoveredProduct, handleHoverStart, handleHoverEnd } = useProductHover();
 

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20"
        variants={backgroundVariants}
        animate="animate"
      />
      
      {/* Dynamic overlay with subtle animation */}
      <motion.div 
        className="absolute inset-0 bg-black/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      
      <FloatingElements />
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        
          <SectionHeader timeLeft={timeLeft} formatTime={formatTime} />
        

        {/* Products Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ 
            once: true,
            margin: "-100px",
            amount: 0.3
          }}
        >
          {products.map((product, index) => (

            <motion.div
              key={product.id || index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              
                <ProductCard
                  product={product}
                  index={index}
                  isHovered={hoveredProduct === product.id}
                  onHoverStart={() => handleHoverStart(product.id)}
                  onHoverEnd={handleHoverEnd}
                />
             
            </motion.div>
          ))}
        </motion.div>

        {/* VIP Access CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.8, 
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }
          }}
          viewport={{ once: true }}
        >
          <React.Suspense fallback={
            <div className="text-center mt-16 animate-pulse">
              <div className="h-16 bg-white/10 rounded-xl max-w-md mx-auto"></div>
            </div>
          }>
            <VipCTA />
          </React.Suspense>
        </motion.div>
      </div>

      {/* Enhanced background decorations */}
      <motion.div 
        className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </section>
  );
}