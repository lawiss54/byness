'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Package } from "lucide-react";
import { Product } from "@/components/Boutique/types/product.types";

interface AddToCartButtonsProps {
  product: Product;
}

export const AddToCartButtons: React.FC<AddToCartButtonsProps> = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    console.log(`Adding to cart: ${product.name} - ${product.price}`);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.button
      onClick={handleAddToCart}
      className={`relative overflow-hidden px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
        isAdded
          ? "bg-green-500 text-white"
          : "bg-brand-darkGreen-500 hover:bg-brand-darkGreen-600 text-white"
      } shadow-lg hover:shadow-xl transform hover:scale-105`}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="flex items-center gap-2"
        animate={isAdded ? { scale: 0 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <ShoppingCart className="w-4 h-4" />
        <span>Ajouter</span>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={isAdded ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.2, delay: isAdded ? 0.1 : 0 }}
      >
        <Package className="w-4 h-4 mr-2" />
        <span>Ajouté!</span>
      </motion.div>
    </motion.button>
  );
};

interface BuyNowButtonsProps {
  product: Product;
}

export const BuyNowButtons: React.FC<BuyNowButtonsProps> = ({ product }) => {
  const handleBuyNow = () => {
    console.log(`Buying now: ${product.name} - ${product.price}`);
  };

  return (
    <motion.button
      onClick={handleBuyNow}
      className="px-8 py-3 bg-brand-camel-500 hover:bg-brand-camel-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Acheter maintenant
    </motion.button>
  );
};

export const WishlistButton: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.button
      onClick={() => setIsLiked(!isLiked)}
      className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
        isLiked
          ? "bg-red-100 text-red-500"
          : "bg-white/90 hover:bg-white text-brand-camel-600"
      } hover:shadow-xl`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
    </motion.button>
  );
};
