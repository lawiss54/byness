
"use client";

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductsSectionProps, ViewMode, SortType } from './ProductsSection/types/product.types';
import { ANIMATIONS } from './ProductsSection/constants/animations';
import { sortProducts, filterProducts } from './ProductsSection/utils/productUtils';
import { ProductCard } from './ProductsSection/ProductCard';
import { FilterSection } from './ProductsSection/FilterSection';
import { SectionHeader } from './ProductsSection/SectionHeader';
import { EmptyState } from './ProductsSection/components/ui/EmptyState';

export default function ProductsSection({ 
  products, 
  categories 
}: ProductsSectionProps) {
  // STATE MANAGEMENT
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortType>('default');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // OPTIMIZED CALLBACKS
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleSortChange = useCallback((sort: SortType) => {
    setSortBy(sort);
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  // MEMOIZED FILTERED PRODUCTS
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = filterProducts(products, selectedCategory);
    return sortProducts(filtered, sortBy);
  }, [products, selectedCategory, sortBy]);

  // MEMOIZED GRID CLASSES
  const gridClasses = useMemo(() => 
    viewMode === 'grid'
      ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-6"
      : "flex flex-col gap-4"
  , [viewMode]);

  return (
    <section className="py-16 bg-gradient-to-br from-brand-ivory-50 via-white to-brand-sage-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader productCount={filteredAndSortedProducts.length} />

        <FilterSection
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${sortBy}`}
            variants={ANIMATIONS.container}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={gridClasses}
          >
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredAndSortedProducts.length === 0 && <EmptyState />}

        {filteredAndSortedProducts.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <button className="bg-brand-camel-500 hover:bg-brand-camel-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 hover:shadow-lg">
              عرض المزيد من المنتجات
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
