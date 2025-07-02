'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CartProvider } from './CartContext';
import CartHeader from './CartHeader';
import CartContent from './CartContent';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';
import { useCart } from './CartContext';

function CartPageContent() {
  const { cartItems } = useCart();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-darkGreen-50 via-white to-brand-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CartHeader />
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-brand-darkGreen-50 via-white to-brand-sage-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CartHeader />
        
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Cart Items */}
          <div className="w-full">
            <CartContent />
          </div>

        </motion.div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    
      <CartPageContent />
    
  );
}