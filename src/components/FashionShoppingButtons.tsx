'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Package, CreditCard, LogIn } from "lucide-react";
import { Product } from "@/components/Boutique/types/product.types";
import { useUnifiedCart as useCart } from "@/components/shared/UnifiedCartContext";
import { useRouter } from "next/navigation";

interface AddToCartButtonsProps {
  product: Product;
}

export const AddToCartButtons: React.FC<AddToCartButtonsProps> = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  const {addToCart} = useCart();

  const handleAddToCart = () => {
    addToCart(product)
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
interface LoginButtonsProps {
  data: {
    phone: number;
    password: string;
  };
}

export const BuyNowButtons: React.FC<BuyNowButtonsProps> = ({ product }) => {
  const {addToCart, isProductInCart} = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    if(isProductInCart(product)){
        router.push('/checkout')
    }else{
      addToCart(product);
      router.push('/checkout')
    }

  };

  return (
    <motion.button
      onClick={handleBuyNow}
      className="px-8 py-3 w-full bg-brand-camel-500 hover:bg-brand-camel-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="flex items-center gap-2"
        transition={{ duration: 0.2 }}
      >
        <CreditCard className="w-4 h-4" />
        <span className="whitespace-nowrap">Acheter maintenant</span>
      </motion.div>
    </motion.button>
  );
};
export const LoginButtons: React.FC<LoginButtonsProps> = ({ data }) => {
  

  const handleBuyNow = () => {
    console.log(data)

  };

  return (
    <motion.button
      onClick={handleBuyNow}
      className="px-8 py-3 w-full bg-brand-camel-500 hover:bg-brand-camel-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="flex items-center gap-2"
        transition={{ duration: 0.2 }}
      >
        <LogIn className="w-4 h-4" />
        <span className="whitespace-nowrap">login</span>
      </motion.div>
    </motion.button>
  );
};

