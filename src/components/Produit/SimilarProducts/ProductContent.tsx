
import { memo } from 'react';
import { motion } from 'framer-motion';
import { PricingSection } from './PricingSection';
import { AddToCartButtons } from './ProductActionButtons';

interface ProductContentProps {
  product: SimilarProduct;
  savings: number;
}


export const ProductContent: React.FC<ProductContentProps> = memo(({ product, savings }) => {
  return (
    <div className="p-6 flex-1 flex flex-col justify-between">
      <div>
        <motion.h3
          className="text-xl font-playfair font-semibold text-brand-darkGreen-500 mb-3 line-clamp-2"
          whileHover={{ x: 5, color: "#da944a" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {product.name}
        </motion.h3>
      </div>

      {/* Pricing and Actions */}
      <div className="space-y-4">
        <PricingSection product={product} savings={savings} />
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AddToCartButtons />
        </motion.div>
      </div>
    </div>
  );
});

ProductContent.displayName = 'ProductContent';