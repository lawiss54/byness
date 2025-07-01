
import { memo } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ProductRatingProps {
  product: SimilarProduct;
  index: number;
}

/**
 * ProductRating Component
 * 
 * Displays product rating and review count.
 * Appears on hover with animation.
 */
export const ProductRating: React.FC<ProductRatingProps> = memo(({ product, index }) => {
  return (
    <motion.div
      className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
      initial={{ scale: 0.8 }}
      whileInView={{ scale: 1 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
        <Star className="w-4 h-4 text-yellow-400 fill-current" />
        <span className="text-sm font-semibold text-brand-darkGreen-600">
          {product.rating}
        </span>
        <span className="text-xs text-brand-darkGreen-400">
          ({product.reviews})
        </span>
      </div>
    </motion.div>
  );
});

ProductRating.displayName = 'ProductRating';
