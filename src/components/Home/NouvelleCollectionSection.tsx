'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {SectionHeader } from '@/components/shared';
import ProductCard from './NouvelleCollectionSection/ProductCard'
import { useCountdownTimer, useProductHover } from './NouvelleCollectionSection/hooks';
import { containerVariants, itemVariants, backgroundVariants } from './NouvelleCollectionSection/animations';
import dynamic from 'next/dynamic';
import type { ExclusiveProductsProps } from './NouvelleCollectionSection/types';

// Dynamic imports with loading states
const FloatingElements = dynamic(() => import('./NouvelleCollectionSection/FloatingElements'), {
  loading: () => null,
  ssr: false
});

const VipCTA = dynamic(() => import('./NouvelleCollectionSection/VipCTA'), {
  loading: () => null,
  ssr: false
});

export default function NouvelleCollectionSection({ products }: ExclusiveProductsProps) {
  const { timeLeft, formatTime } = useCountdownTimer(3600);
  const { hoveredProduct, handleHoverStart, handleHoverEnd } = useProductHover();

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20"
        variants={backgroundVariants}
        animate="animate"
      />
      
      <motion.div 
        className="absolute inset-0 bg-black/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <FloatingElements />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <SectionHeader
          badge="Collection Exclusive"
          title={
            <>
              Édition
              <motion.span
                className="block text-yellow-400"
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Limitée
              </motion.span>
            </>
          }
          subtitle="Des pièces uniques et exclusives, créées en quantité limitée pour les connaisseurs d'exception"
          className="text-white"
        />

        {/* Products Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {products?.slice(0, 4).map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
              onHoverStart={() => handleHoverStart(product.id)}
              onHoverEnd={handleHoverEnd}
            >
              <ProductCard
                product={product}
                index={index}
                
                className="h-[700px] bg-white/95 backdrop-blur-sm"
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
          <VipCTA />
        </motion.div>
      </div>
    </section>
  );
}