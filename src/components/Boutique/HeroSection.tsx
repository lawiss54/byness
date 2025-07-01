"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import HeroHeading from "./HeroSection/HeroHeading";
import HeroBackground from "./HeroSection/HeroBackground";
import HeroProductCard from "./HeroSection/HeroProductCard";
import QuickViewModal from "./HeroSection/QuickViewModal";
import { containerVariants } from "./HeroSection/animations/variants";
import type { Product } from "./HeroSection/types";

interface HeroSectionProps {
  heroProducts?: Product[];
}

export default function HeroSection({ heroProducts = [] }: HeroSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const products = heroProducts.length > 0 ? heroProducts : [];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-darkGreen-50 via-brand-sage-50 to-brand-camel-50 py-24 min-h-full">
        <HeroBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <HeroHeading />

          {/* Products Grid */}
          <motion.div
            className="grid md:grid-cols-2 sm:grid-cols-2 gap-12 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {products.map((product, index) => (
              <HeroProductCard
                key={product.id}
                product={product}
                index={index}
                onQuickView={() => setSelectedProduct(product)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      <QuickViewModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </>
  );
}
