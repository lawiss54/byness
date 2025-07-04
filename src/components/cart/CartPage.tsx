'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UnifiedCartProvider, useUnifiedCart } from '../shared/UnifiedCartContext';
import CartHeader from './CartHeader';
import CartContent from './CartContent';
import OrderSummary from '../shared/OrderSummary';
import EmptyCart from './EmptyCart';

function CartPageContent() {
  const { cartItems } = useUnifiedCart();

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
        <div className="w-full max-w-[95rem] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 py-10 md:py-12">
          <CartHeader />
          <EmptyCart />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-darkGreen-50 via-white to-brand-sage-50">
      <div className="w-full max-w-[95rem] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-20 py-10 md:py-12">
        <CartHeader />

        <motion.div
          className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <CartContent />
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <OrderSummary />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <UnifiedCartProvider>
      <CartPageContent />
    </UnifiedCartProvider>
  );
}
