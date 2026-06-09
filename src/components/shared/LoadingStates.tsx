'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Skeleton Loader for Product Cards
export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
    <div className="aspect-[3/4] bg-brand-sage-100" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-brand-sage-200 rounded w-3/4" />
      <div className="h-4 bg-brand-sage-200 rounded w-1/2" />
      <div className="flex items-center gap-2">
        <div className="h-6 bg-brand-camel-200 rounded w-20" />
        <div className="h-4 bg-brand-sage-200 rounded w-16" />
      </div>
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-4 h-4 bg-brand-sage-200 rounded-full" />
        ))}
      </div>
    </div>
  </div>
);

// Skeleton Loader for Text Content
export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className = '' 
}) => (
  <div className={`space-y-3 animate-pulse ${className}`}>
    {[...Array(lines)].map((_, i) => (
      <div
        key={i}
        className={`h-4 bg-brand-sage-200 rounded ${
          i === lines - 1 ? 'w-2/3' : 'w-full'
        }`}
      />
    ))}
  </div>
);

// Skeleton Loader for Image
export const ImageSkeleton: React.FC<{ className?: string; aspectRatio?: string }> = ({ 
  className = '', 
  aspectRatio = 'aspect-square' 
}) => (
  <div className={`${aspectRatio} bg-brand-sage-100 rounded-lg animate-pulse ${className}`}>
    <div className="w-full h-full flex items-center justify-center">
      <motion.div
        className="w-12 h-12 border-4 border-brand-sage-300 border-t-brand-camel-400 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  </div>
);

// Button Loading State
export const ButtonLoader: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <motion.div
      className={`${sizes[size]} border-2 border-white/30 border-t-white rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
};

// Page Loading Skeleton
export const PageSkeleton: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-brand-darkGreen-50 via-white to-brand-sage-50 animate-pulse">
    {/* Header Skeleton */}
    <div className="h-16 bg-brand-greenBlack-500" />
    
    {/* Hero Section Skeleton */}
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="h-8 bg-brand-sage-200 rounded w-1/2" />
            <div className="h-16 bg-brand-sage-200 rounded w-3/4" />
            <div className="h-6 bg-brand-sage-200 rounded w-full" />
            <div className="h-6 bg-brand-sage-200 rounded w-2/3" />
            <div className="flex gap-4">
              <div className="h-12 bg-brand-camel-200 rounded-xl w-32" />
              <div className="h-12 bg-brand-sage-200 rounded-xl w-32" />
            </div>
          </div>
          <div className="h-96 bg-brand-sage-100 rounded-3xl" />
        </div>
      </div>
    </div>
    
    {/* Products Grid Skeleton */}
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Search Loading State
export const SearchLoader: React.FC = () => (
  <div className="flex items-center justify-center py-12">
    <div className="text-center">
      <motion.div
        className="w-8 h-8 border-3 border-brand-sage-300 border-t-brand-camel-500 rounded-full mx-auto mb-4"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="text-brand-darkGreen-400 font-secondary">
        Recherche en cours...
      </p>
    </div>
  </div>
);

// Cart Loading State
export const CartLoader: React.FC = () => (
  <div className="space-y-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl shadow-lg animate-pulse">
        <div className="w-20 h-20 bg-brand-sage-100 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-brand-sage-200 rounded w-3/4" />
          <div className="h-4 bg-brand-sage-200 rounded w-1/2" />
          <div className="flex justify-between items-center">
            <div className="h-6 bg-brand-camel-200 rounded w-20" />
            <div className="h-8 bg-brand-sage-200 rounded w-24" />
          </div>
        </div>
      </div>
    ))}
  </div>
);