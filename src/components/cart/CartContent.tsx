'use client';

import React from 'react';
import { motion } from 'framer-motion';
import CartItem from './CartItem';
import CartActions from './CartActions';
import { useCart } from './CartContext';
import { ArrowRight, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';


export default function CartContent() {
  const { cartItems } = useCart();
  const router = useRouter();

  const goCheckout = () => {
    router.push('/checkout')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <>
    <motion.div
      className="bg-white rounded-3xl shadow-2xl p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-playfair font-bold text-brand-darkGreen-500">
          Articles sélectionnés
        </h2>
        <CartActions />
      </div>

      <div className="space-y-6">
        {cartItems.map((item, index) => (
          <CartItem key={item.id} item={item} index={index} />
        ))}
      </div>
      
    </motion.div>
      <motion.button
        className="mt-6 mx-auto mb-6 px-8 py-4 bg-brand-camel-500 hover:bg-brand-camel-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
        whileHover={{ scale: 1.5, y: -2 }}
        whileTap={{ scale: 0.7, x: 3 }}
        onClick={goCheckout}
      >
        <CreditCard className="w-5 h-5" />
        <span >Passer commande</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>
      </>
    
                       
  );
}