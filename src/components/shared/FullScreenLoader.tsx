'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './Loader';

interface FullScreenLoaderProps {
  isVisible: boolean;
  text?: string;
  type?: 'default' | 'dots' | 'pulse' | 'wave' | 'brand' | 'fashion';
  showProgress?: boolean;
  progress?: number;
  overlay?: boolean;
  onComplete?: () => void;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  isVisible,
  text = 'Chargement en cours...',
  type = 'brand',
  showProgress = false,
  progress = 0,
  overlay = true,
  onComplete
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            overlay 
              ? 'bg-gradient-to-br from-brand-darkGreen-50/95 via-white/95 to-brand-sage-50/95 backdrop-blur-sm' 
              : 'bg-gradient-to-br from-brand-darkGreen-50 via-white to-brand-sage-50'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_theme(colors.brand.darkGreen.400)_1px,_transparent_0)] bg-[length:24px_24px]" />
          </div>

          {/* Floating Background Elements */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-brand-camel-300/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Main Loader Content */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Brand Logo/Name */}
            <motion.div
              className="mb-8"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-brand-darkGreen-500 mb-2">
                ByNess
              </h1>
              <p className="text-brand-sage-500 font-secondary">
                Mode Féminine Moderne
              </p>
            </motion.div>

            {/* Loader Component */}
            <Loader
              type={type}
              size="lg"
              text={text}
              showProgress={showProgress}
              progress={progress}
            />

            {/* Additional Info */}
            <motion.div
              className="mt-8 text-sm text-brand-darkGreen-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Préparation de votre expérience shopping...
            </motion.div>
          </motion.div>

          {/* Decorative Corner Elements */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-brand-camel-500/30 rounded-tl-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />
          <motion.div
            className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-brand-sage-500/30 rounded-tr-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          />
          <motion.div
            className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-brand-darkGreen-500/30 rounded-bl-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-brand-camel-500/30 rounded-br-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullScreenLoader;