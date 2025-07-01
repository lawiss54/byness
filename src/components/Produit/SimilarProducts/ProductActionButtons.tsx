import { memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart } from 'lucide-react';

export const AddToCartButtons: React.FC = memo(() => {
  const handleQuickView = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    // Add quick view logic here
    console.log('Quick view clicked');
  }, []);

  const handleAddToWishlist = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    // Add wishlist logic here
    console.log('Add to wishlist clicked');
  }, []);

  return (
    <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
      <motion.button
        className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleQuickView}
        aria-label="Aperçu rapide"
      >
        <Eye className="w-4 h-4 text-brand-camel-600" />
      </motion.button>
      <motion.button
        className="p-3 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleAddToWishlist}
        aria-label="Ajouter aux favoris"
      >
        <Heart className="w-4 h-4 text-brand-camel-600" />
      </motion.button>
    </div>
  );
});

AddToCartButtons.displayName = 'AddToCartButtons';

