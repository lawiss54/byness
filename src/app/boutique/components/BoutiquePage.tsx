'use client';

import { useMemo } from 'react';
import { Product, Category } from '../types';
import HeroSection from './HeroSection';
import ProductsSection from './ProductsSection';

interface BoutiquePageProps {
  products: Product[];
  categories: Category[];
}

const BoutiquePage = ({ products, categories }: BoutiquePageProps) => {
  // Memoize the calculation of hero products to avoid re-computing on every render
  const heroProducts = useMemo(() => {
    return products.filter(product => product.heroSection);
  }, [products]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-ivory-50 via-white to-brand-sage-50">
      {/* Hero Section - Enhanced */}
      <HeroSection heroProducts={heroProducts} />

      {/* Enhanced Products Section */}
      <ProductsSection products={products} categories={categories} />
    </div>
  );
};

export default BoutiquePage;
