
import React from 'react';
import { motion } from 'framer-motion';

/**
 * LoadingSkeleton Component
 * 
 * Provides a smooth loading experience while products are being fetched
 * Improves perceived performance and user experience
 */
export const SimilarProductsLoadingSkeleton: React.FC = () => {
  const skeletonItems = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section className="py-20 bg-gradient-to-br from-brand-sage-50 to-brand-camel-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6">
            <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
            <div className="w-32 h-4 bg-gray-300 rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="w-80 h-12 bg-gray-300 rounded mx-auto animate-pulse" />
            <div className="w-96 h-6 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skeletonItems.map((index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl shadow-lg overflow-hidden h-[520px] flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Image Skeleton */}
              <div className="h-[320px] bg-gray-300 animate-pulse flex-shrink-0" />
              
              {/* Content Skeleton */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-full h-6 bg-gray-300 rounded animate-pulse" />
                  <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="w-24 h-8 bg-gray-300 rounded animate-pulse" />
                      <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                  <div className="w-full h-12 bg-gray-300 rounded-xl animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

