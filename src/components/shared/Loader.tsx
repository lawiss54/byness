'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star } from 'lucide-react';

interface LoaderProps {
  type?: 'default' | 'dots' | 'pulse' | 'wave' | 'brand' | 'fashion';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  showProgress?: boolean;
  progress?: number;
  className?: string;
  centered?: boolean; // خيار جديد للتحكم في الموضع
  overlay?: boolean; // خيار لإضافة طبقة شفافة خلف اللودر
}

const Loader: React.FC<LoaderProps> = ({
  type = 'brand',
  size = 'md',
  text = 'Chargement...',
  showProgress = false,
  progress = 0,
  className = '',
  centered = true,
  overlay = false
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if(typeof window === undefined) return;
    if (showProgress) {
      const timer = setInterval(() => {
        setCurrentProgress(prev => {
          if (prev >= progress) return progress;
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [progress, showProgress]);

  const sizes = {
    sm: { container: 'w-16 h-16', dot: 'w-2 h-2', text: 'text-sm' },
    md: { container: 'w-24 h-24', dot: 'w-3 h-3', text: 'text-base' },
    lg: { container: 'w-32 h-32', dot: 'w-4 h-4', text: 'text-lg' },
    xl: { container: 'w-40 h-40', dot: 'w-5 h-5', text: 'text-xl' }
  };

  const sizeConfig = sizes[size];

  // Default Spinner
  const DefaultLoader = () => (
    <motion.div
      className={`${sizeConfig.container} border-4 border-brand-sage-200 border-t-brand-camel-500 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  // Dots Loader
  const DotsLoader = () => (
    <div className="flex items-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${sizeConfig.dot} bg-brand-camel-500 rounded-full`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );

  // Pulse Loader
  const PulseLoader = () => (
    <motion.div
      className={`${sizeConfig.container} bg-brand-camel-500 rounded-full`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );

  // Wave Loader
  const WaveLoader = () => (
    <div className="flex items-end gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className={`w-2 bg-brand-camel-500 rounded-t-full`}
          animate={{
            height: ['8px', '24px', '8px'],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );

  // Brand Loader (Logo-inspired)
  const BrandLoader = () => (
    <div className="relative">
      <motion.div
        className={`${sizeConfig.container} relative`}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 border-4 border-transparent border-t-brand-camel-500 border-r-brand-sage-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner Ring */}
        <motion.div
          className="absolute inset-2 border-3 border-transparent border-b-brand-darkGreen-500 border-l-brand-camel-300 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center Logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-brand-camel-500 font-bold text-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            B
          </motion.div>
        </div>
      </motion.div>
      
      {/* Floating Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-brand-camel-400 rounded-full"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );

  // Fashion Loader (Fashion-themed)
  const FashionLoader = () => (
    <div className="relative">
      <motion.div
        className={`${sizeConfig.container} relative flex items-center justify-center`}
      >
        {/* Fashion Icons Animation */}
        <motion.div
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-16 h-16">
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            >
              <Sparkles className="w-4 h-4 text-brand-camel-500" />
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-0 transform -translate-y-1/2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
            >
              <Heart className="w-4 h-4 text-brand-sage-500" />
            </motion.div>
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            >
              <Star className="w-4 h-4 text-brand-darkGreen-500" />
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-0 transform -translate-y-1/2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.9 }}
            >
              <Sparkles className="w-4 h-4 text-brand-camel-300" />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Center Element */}
        <motion.div
          className="w-8 h-8 bg-gradient-to-br from-brand-camel-500 to-brand-sage-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case 'dots': return <DotsLoader />;
      case 'pulse': return <PulseLoader />;
      case 'wave': return <WaveLoader />;
      case 'brand': return <BrandLoader />;
      case 'fashion': return <FashionLoader />;
      default: return <DefaultLoader />;
    }
  };

  // محتوى اللودر
  const loaderContent = (
    <div className={`flex flex-col items-center justify-center gap-6 ${className}`}>
      {/* Loader Animation */}
      <div className="relative">
        {renderLoader()}
      </div>

      {/* Loading Text */}
      <AnimatePresence>
        {text && (
          <motion.div
            className={`${sizeConfig.text} font-secondary text-brand-darkGreen-500 font-medium text-center`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            className="w-48 bg-brand-sage-200 rounded-full h-2 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-brand-camel-500 to-brand-sage-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${currentProgress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Percentage */}
      <AnimatePresence>
        {showProgress && (
          <motion.div
            className="text-sm font-medium text-brand-darkGreen-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {currentProgress}%
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // إذا كان في المنتصف، نعيد الـ loader مع positioning
  if (centered) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${overlay ? 'bg-black/20 backdrop-blur-sm' : ''}`}>
        {overlay && (
          <motion.div
            className="absolute inset-0 bg-white/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {loaderContent}
        </motion.div>
      </div>
    );
  }

  // إذا لم يكن في المنتصف، نعيد الـ loader عادي
  return loaderContent;
};

export default Loader;