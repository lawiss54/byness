'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { Heart, Sparkles } from 'lucide-react';
import { useCartItems, useCartActions, useIsCartInitialized } from '../store/cart';
import { Loader } from '@/components/shared';
import EmptyCart from './EmptyCart';
import CartContent from './CartContent';
import CartHeader from './CartHeader';

export default function CartPage() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  // Zustand store hooks
  const cartItems = useCartItems();
  const { initializeCart } = useCartActions();
  const isInitialized = useIsCartInitialized();

  // Initialize cart from backend on component mount
  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  const handleGoToCheckout = () => {
    setIsNavigating(true);
    router.push('/checkout');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  if (!isInitialized) {
    return <Loader type="fashion" size="lg" text="Chargement du panier..." />;
  }

  const PageWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen bg-gradient-to-br from-brand-darkGreen-50 via-white to-brand-sage-50">
      <div className="w-full max-w-[95rem] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 py-10 md:py-12">
        <CartHeader />
        {children}
      </div>
    </div>
  );

  if (cartItems.length === 0) {
    return (
      <PageWrapper>
        <EmptyCart />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <motion.div
        className="flex flex-col gap-8 lg:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="">
          <CartContent />
        </div>

        <div className="flex justify-center">
          <motion.button
            className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-darkGreen-500 to-brand-darkGreen-600 hover:from-brand-darkGreen-600 hover:to-brand-darkGreen-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-brand-camel-300 disabled:opacity-50"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoToCheckout}
            disabled={isNavigating}
          >
            <Heart className="w-5 h-5" />
            <span>Acheter maintenant</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </PageWrapper>
  );
}
