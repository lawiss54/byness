'use client';;
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useUnifiedCart } from '../shared/UnifiedCartContext';

export default function CartActions() {
  const { clearCart, cartItems } = useUnifiedCart();

  const handleClearCart = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      clearCart();
    }
  };

  const handleMoveAllToWishlist = () => {
    if (window.confirm('Déplacer tous les articles vers la liste de souhaits ?')) {
      // Logic to move all items to wishlist
      clearCart();
    }
  };

  return (
    <div className="flex items-center gap-3">
      

      <motion.button
        onClick={handleClearCart}
        disabled={cartItems.length === 0}
        className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: cartItems.length > 0 ? 1.05 : 1 }}
        whileTap={{ scale: cartItems.length > 0 ? 0.95 : 1 }}
        title="Vider le panier"
      >
        <Trash2 className="w-4 h-4" />
        <span className="hidden sm:inline">Vider</span>
      </motion.button>
    </div>
  );
}