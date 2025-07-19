import React, { memo, useMemo, useCallback, useState } from 'react';
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
  
  // حالة لتتبع عدد المنتجات المعروضة
  const [displayedCount, setDisplayedCount] = useState(4);
  
  // عدد المنتجات لكل مجموعة
  const PRODUCTS_PER_LOAD = 4;

  const handleProductClick = useCallback((productId: string) => {
    onProductClick?.(productId);
  }, [onProductClick]);

  const handleShowMore = useCallback(() => {
    setDisplayedCount(prev => Math.min(prev + PRODUCTS_PER_LOAD, memoizedProducts.length));
  }, [memoizedProducts.length]);

  const handleViewAllClick = useCallback(() => {
    onViewAllClick?.();
  }, [onViewAllClick]);

  // حساب المنتجات المعروضة حالياً
  const displayedProducts = useMemo(() => 
    memoizedProducts.slice(0, displayedCount), 
    [memoizedProducts, displayedCount]
  );

  // تحديد ما إذا كان هناك منتجات أكثر لعرضها
  const hasMoreProducts = displayedCount < memoizedProducts.length;

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
          className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ 
            once: true, 
            margin: "-10% 0px -10% 0px"
          }}
        >
          {displayedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              showAddToCart={true}
              className="h-[700px] backdrop-blur-sm"
            />
          ))}
        </motion.div>

        {/* زر إظهار المزيد - يظهر فقط إذا كان هناك منتجات أكثر */}
        {hasMoreProducts && (
          <div className="text-center mt-12">
            <motion.button
              onClick={handleShowMore}
              className="inline-flex items-center px-8 py-3 bg-brand-camel-500 text-white font-medium rounded-lg hover:bg-brand-camel-600 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              إظهار المزيد ({Math.min(PRODUCTS_PER_LOAD, memoizedProducts.length - displayedCount)} منتجات)
            </motion.button>
          </div>
        )}

        {/* زر عرض الكل - يظهر إذا تم عرض جميع المنتجات */}
        {!hasMoreProducts && memoizedProducts.length > PRODUCTS_PER_LOAD && (
          <ViewAllButton onClick={handleViewAllClick} />
        )}
      </div>
    </section>
  );
});

SimilarProducts.displayName = 'SimilarProducts';

export default SimilarProducts;