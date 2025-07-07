import React, { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ProductCard, SectionHeader } from '@/components/shared';
import ViewAllButton from './SimilarProducts/ViewAllButton';
import { useAnimationVariants } from './SimilarProducts/hooks/useAnimationVariants';
import type { SimilarProductsProps } from './SimilarProducts/types';

const SimilarProducts: React.FC<SimilarProductsProps> = memo(({ 
  products, 
  onProductClick,
  onViewAllClick 
}) => {
  const { containerVariants, itemVariants } = useAnimationVariants();
  const memoizedProducts = useMemo(() => products, [products]);

  const handleProductClick = useCallback((productId: string) => {
    onProductClick?.(productId);
  }, [onProductClick]);

  const handleViewAllClick = useCallback(() => {
    onViewAllClick?.();
  }, [onViewAllClick]);

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
        <SectionHeader
          badge="Produits Similaires"
          title={
            <>
              Vous Aimerez
              <motion.span
                className="block text-brand-camel-500"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Aussi
              </motion.span>
            </>
          }
          subtitle="Découvrez notre sélection de produits dans le même esprit, choisis spécialement pour vous"
        />

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ 
            once: true, 
            margin: "-10% 0px -10% 0px"
          }}
        >
          {memoizedProducts.slice(0, 6).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              showAddToCart={true}
              className="h-[520px]"
            />
          ))}
        </motion.div>

        <ViewAllButton onClick={handleViewAllClick} />
      </div>
    </section>
  );
});

SimilarProducts.displayName = 'SimilarProducts';

export default SimilarProducts;