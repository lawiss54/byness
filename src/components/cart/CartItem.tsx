'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, Tag } from 'lucide-react';
import Image from 'next/image';
import { useCartCheckout } from '@/lib/CartCheckoutContext';
import { CartItem } from '@/lib/CartCheckoutContextType';

interface CartItemProps {
  item: CartItem;
  index: number;
}

export default function CartItem({ item, index }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartCheckout();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeItem(item.id);
    }, 300);
  };

  console.log(item)

 
  

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.1,
      },
    },
    exit: {
      x: -100,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  const savings = item.originalPrice ? item.originalPrice - item.price : 0;
  const discountPercentage = item.originalPrice 
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  return (
    <AnimatePresence>
      {!isRemoving && (
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="group relative bg-gradient-to-r from-brand-sage-50 to-brand-camel-50 rounded-2xl p-4 sm:p-6 border-2 border-transparent hover:border-brand-camel-200 transition-all duration-300"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
            {/* Product Image */}
            <div className="relative w-full sm:w-32 sm:h-32 aspect-square sm:aspect-auto flex-shrink-0 rounded-xl overflow-hidden bg-white shadow-lg">
              <Image
                src={item.images[0] || '/placeholder.png'}
                alt={item.name}
                width={640}
                height={640}
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 128px"
              />

              {discountPercentage > 0 && (
                <motion.div
                  className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                >
                  -{discountPercentage}%
                </motion.div>
              )}

              <motion.div
                className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                
              </motion.div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col gap-3 flex-1 min-w-0 overflow-hidden">
              <div className="flex flex-wrap justify-between gap-4 items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg md:text-xl font-playfair font-semibold text-brand-darkGreen-500 mb-1 line-clamp-2">
                    {item.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-sm text-brand-darkGreen-400">
                    <span className="flex items-center gap-1">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: item?.color?.toLowerCase() }}
                      />
                      {item.colorName}
                    </span>
                    <span>Taille: {item.size}</span>
                    <span className="bg-brand-camel-100 text-brand-camel-600 px-2 py-1 rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    onClick={handleRemove}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Pricing and Quantity */}
              <div className="flex flex-col lg:flex-row justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg sm:text-xl font-bold text-brand-camel-500">
                      {item.price.toLocaleString()} DA
                    </span>
                    {item.originalPrice > 0 || item.originalPrice === undefined && (
                      <span className="text-sm sm:text-lg text-brand-sage-400 line-through">
                        {item.originalPrice.toLocaleString()} DA
                      </span>
                    )}
                  </div>

                  {savings > 0 && (
                    <motion.div
                      className="flex items-center gap-2 text-green-600"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Tag className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        Économisez {savings.toLocaleString()} DA
                      </span>
                    </motion.div>
                  )}
                </div>

                {/* Quantity & Total */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center bg-white rounded-2xl border-2 border-brand-sage-200 shadow-lg overflow-hidden">
                    <motion.button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-3 text-brand-darkGreen-500 hover:bg-brand-sage-50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>

                    <span className="px-4 py-2 font-semibold text-brand-darkGreen-500 bg-white min-w-[48px] text-center">
                      {item.quantity}
                    </span>

                    <motion.button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-3 text-brand-darkGreen-500 hover:bg-brand-sage-50 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="text-right min-w-[100px]">
                    <div className="text-base sm:text-xl font-bold text-brand-darkGreen-500">
                      {(item.price * item.quantity).toLocaleString()} DA
                    </div>
                    {item.originalPrice > 0 || item.originalPrice === undefined && (
                      <div className="text-sm text-brand-sage-400 line-through">
                        {(item.originalPrice * item.quantity).toLocaleString()} DA
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
