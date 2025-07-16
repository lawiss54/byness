'use client';

import React,{useState} from 'react';
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { Heart, Sparkles  } from 'lucide-react';
import { CartCheckoutProvider, useCartCheckout } from '@/lib/CartCheckoutContext';
import dynamic from 'next/dynamic'


const EmptyCart = dynamic(
  () => import('./EmptyCart'),
  { ssr: false }
)
const CartContent = dynamic(
  () => import('./CartContent'),
  { ssr: false }
)
const CartHeader = dynamic(
  () => import('./CartHeader'),
  { ssr: false }
)

function CartPageContent() {

  const { cartItems } = useCartCheckout();

  const [isPress, setIsPress] = useState(false)
   const router = useRouter();

  const goShop = () => {
    setIsPress(true)
    router.push('/checkout');
  }
  

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
          className="flex flex-col gap-8  lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Cart Items */}
          <div className="">
            <CartContent />
          </div>

          {/* Cart Summary */}
          <div className="flex justify-center">
            <motion.button
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-brand-darkGreen-500 to-brand-darkGreen-600 hover:from-brand-darkGreen-600 hover:to-brand-darkGreen-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-brand-camel-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={goShop}
              disable={isPress}
            >
              <Heart className="w-5 h-5" />
              <span> Acheter maintenant </span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <CartCheckoutProvider>
      <CartPageContent />
    </CartCheckoutProvider>
    
  );
}
