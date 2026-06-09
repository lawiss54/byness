'use client';

import { motion } from 'framer-motion';
import { useCartItems } from '../store/cart';
import dynamic from 'next/dynamic'


const CartActions = dynamic(
  () => import('./CartActions'),
  { ssr: false }
)
const CartItem = dynamic(
  () => import('./CartItem'),
  { ssr: false }
)

export default function CartContent() {

  const cartItems = useCartItems();
  

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
    <motion.div
      className="bg-white rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 xl:p-10 2xl:p-12 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 md:mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl font-playfair font-bold text-brand-darkGreen-500">
          Articles sélectionnés
        </h2>
        <CartActions />
      </div>

      <div className="space-y-4 sm:space-y-6">
        {cartItems.map((item, index) => (
          <CartItem key={item.id || index} item={item} index={index} />
        ))}
      </div>

      
    </motion.div>
  );
}
