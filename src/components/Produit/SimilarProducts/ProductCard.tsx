import { memo, useMemo, useCallback } from "react";
import { motion, Variants } from "framer-motion";
import { ProductImage } from "./ProductImage";
import { ProductContent } from "./ProductContent";
import { SimilarProduct } from "./types";

interface ProductCardProps {
  product: SimilarProduct;
  index: number;
  itemVariants: Variants;
  onProductClick: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = memo(({ 
  product, 
  index, 
  itemVariants, 
  onProductClick 
}) => {
  // Memoize discount calculation to avoid recalculation on every render
  const discountPercentage = useMemo(() => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  }, [product.originalPrice, product.price]);

  // Memoize savings calculation
  const savings = useMemo(() => {
    if (!product.originalPrice) return 0;
    return product.originalPrice - product.price;
  }, [product.originalPrice, product.price]);

  // Handle product click with useCallback to maintain referential equality
  const handleClick = useCallback(() => {
    onProductClick(product.id);
  }, [product.id, onProductClick]);

  return (
    <motion.div
      variants={itemVariants}
      className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 overflow-hidden h-[520px] flex flex-col cursor-pointer"
      whileHover={{
        y: -12,
        rotateY: 3,
        rotateX: 3,
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Voir le produit ${product.name}`}
    >
      {/* Product Image Section */}
      <ProductImage 
        product={product} 
        discountPercentage={discountPercentage}
        index={index}
      />

      {/* Product Content Section */}
      <ProductContent 
        product={product}
        savings={savings}
      />

      {/* Hover Effect Overlay */}
    
    </motion.div>
  );
});

ProductCard.displayName = 'ProductCard';
