import React, { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './SimilarProducts/SectionHeader';
import { ProductCard } from './SimilarProducts/ProductCard';
import ViewAllButton from './SimilarProducts/ViewAllButton';
import { useAnimationVariants } from './SimilarProducts/hooks/useAnimationVariants';
import type { SimilarProductsProps } from './SimilarProducts/types';

/**
 * SimilarProducts Component
 * 
 * @param products - Array of similar products to display
 * @param onProductClick - Optional callback for product click events
 * @param onViewAllClick - Optional callback for view all button click
 */

const SimilarProducts: React.FC<SimilarProductsProps> = memo(({ 
  products, 
  onProductClick,
  onViewAllClick 
}) => {
  // Custom hook for animation variants - reduces bundle size by code splitting
  const { containerVariants, itemVariants } = useAnimationVariants();

  // Memoize the products to prevent unnecessary re-calculations
  const memoizedProducts = useMemo(() => products, [products]);

  // Callback for handling product interactions
  const handleProductClick = useCallback((productId: string) => {
    onProductClick?.(productId);
  }, [onProductClick]);

  const handleViewAllClick = useCallback(() => {
    onViewAllClick?.();
  }, [onViewAllClick]);

  // Early return if no products
  if (!memoizedProducts?.length) {
    return (
      <section className="py-20 bg-gradient-to-br from-brand-sage-50 to-brand-camel-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-darkGreen-400">Aucun produit similaire disponible</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-brand-sage-50 to-brand-camel-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Separated for better maintainability */}
        <SectionHeader />

        {/* Products Grid - Optimized with proper viewport settings */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ 
            once: true, 
            margin: "-10% 0px -10% 0px" // Start animation earlier for better UX
          }}
        >
          {memoizedProducts.slice(0, 6).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              itemVariants={itemVariants}
              onProductClick={handleProductClick}
            />
          ))}
        </motion.div>

        {/* View All Button - Separated component for reusability */}
        <ViewAllButton onClick={handleViewAllClick} />
      </div>
    </section>
  );
});

// Display name for debugging
SimilarProducts.displayName = 'SimilarProducts';

export default SimilarProducts;
