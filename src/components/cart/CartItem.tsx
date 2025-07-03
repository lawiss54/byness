'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, Tag, ChevronDown, Palette, Ruler } from 'lucide-react';
import Image from 'next/image';
import { useCart } from './CartContext';
import { Product } from '../Boutique/types/product.types';

interface CartItemProps {
  item: Product;
  index: number;
}

export default function CartItem({ item, index }: CartItemProps) {
  const { updateQuantity, removeItem, updateItemVariant } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  const [showColorSelector, setShowColorSelector] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeItem(item.id);
    }, 300);
  };

  const handleSizeChange = (newSize: string) => {
    updateItemVariant(item.id, { size: newSize });
    setShowSizeSelector(false);
  };

  const handleColorChange = (newColor: string, colorName?: string) => {
    updateItemVariant(item.id, { color: newColor, colorName });
    setShowColorSelector(false);
  };

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
          className="w-full group relative bg-gradient-to-r from-brand-sage-50 to-brand-camel-50 rounded-lg sm:rounded-xl lg:rounded-2xl p-2 sm:p-4 lg:p-6 border-2 border-transparent hover:border-brand-camel-200 transition-all duration-300"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          {/* Mobile Layout */}
          <div className="flex flex-col sm:hidden">
            {/* Top Row - Image and Remove Button */}
            <div className="flex gap-2 mb-3">
              <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0 bg-white shadow-lg">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="64px"
                />
                
                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <motion.div
                    className="absolute top-0.5 left-0.5 bg-red-500 text-white px-1 py-0.5 rounded-full text-xs font-semibold shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    -{discountPercentage}%
                  </motion.div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-playfair font-semibold text-brand-darkGreen-500 mb-1 line-clamp-1 leading-tight">
                  {item.name}
                </h3>
                
                {/* Color and Size Selectors - Mobile */}
                <div className="flex flex-col gap-2 mb-2">
                  {/* Color Selector */}
                  {item.colors && item.colors.length > 0 && (
                    <div className="relative">
                      <motion.button
                        onClick={() => setShowColorSelector(!showColorSelector)}
                        className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 border border-brand-sage-200 text-xs w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div 
                          className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0"
                          style={{ backgroundColor: item.color || item.colors[0] }}
                        />
                        <span className="flex-1 text-left truncate">{item.colorName || 'Choisir couleur'}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform ${showColorSelector ? 'rotate-180' : ''}`} />
                      </motion.button>
                      
                      <AnimatePresence>
                        {showColorSelector && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 bg-white border border-brand-sage-200 rounded-lg shadow-lg z-10 mt-1 p-2"
                          >
                            <div className="grid grid-cols-4 gap-2">
                              {item.colors.map((color, idx) => (
                                <motion.button
                                  key={`${color}-${idx}`}
                                  onClick={() => handleColorChange(color)}
                                  className={`flex flex-col items-center gap-1 p-1 rounded-md hover:bg-brand-sage-50 ${
                                    item.color === color ? 'bg-brand-sage-100 ring-2 ring-brand-camel-300' : ''
                                  }`}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <div 
                                    className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                                    style={{ backgroundColor: color }}
                                  />
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Size Selector */}
                  {item.sizes && item.sizes.length > 0 && (
                    <div className="relative">
                      <motion.button
                        onClick={() => setShowSizeSelector(!showSizeSelector)}
                        className="flex items-center gap-2 bg-white rounded-lg px-2 py-1 border border-brand-sage-200 text-xs w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Ruler className="w-3 h-3 text-brand-darkGreen-400" />
                        <span className="flex-1 text-left">{item.size || 'Choisir taille'}</span>
                        <ChevronDown className={`w-3 h-3 transition-transform ${showSizeSelector ? 'rotate-180' : ''}`} />
                      </motion.button>
                      
                      <AnimatePresence>
                        {showSizeSelector && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full left-0 right-0 bg-white border border-brand-sage-200 rounded-lg shadow-lg z-10 mt-1 p-2"
                          >
                            <div className="grid grid-cols-3 gap-2">
                              {item.sizes.map((size, idx) => (
                                <motion.button
                                  key={`${size}-${idx}`}
                                  onClick={() => handleSizeChange(size)}
                                  className={`px-2 py-2 rounded-md border text-sm font-bold transition-colors min-h-[36px] flex items-center justify-center ${
                                    item.size === size 
                                      ? 'bg-brand-camel-100 border-brand-camel-300 text-brand-camel-700' 
                                      : 'bg-white border-brand-sage-200 text-brand-darkGreen-500 hover:bg-brand-sage-50'
                                  }`}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {size}
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
                
                <span className="bg-brand-camel-100 text-brand-camel-600 px-1.5 py-0.5 rounded-full text-xs font-semibold inline-block">
                  {item.category}
                </span>
              </div>

              <motion.button
                onClick={handleRemove}
                className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-300 self-start flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                title="Supprimer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Price Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-base font-bold text-brand-camel-500">
                    {item.price.toLocaleString()} DA
                  </span>
                  {item.originalPrice > 0 && (
                    <span className="text-xs text-brand-sage-400 line-through">
                      {item.originalPrice.toLocaleString()} DA
                    </span>
                  )}
                </div>
                
                {savings > 0 && (
                  <motion.div
                    className="flex items-center gap-1 text-green-600"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Tag className="w-2.5 h-2.5" />
                    <span className="text-xs font-semibold">
                      -{savings.toLocaleString()} DA
                    </span>
                  </motion.div>
                )}
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-brand-darkGreen-500">
                  Total: {(item.price * item.quantity).toLocaleString()} DA
                </div>
                {item.originalPrice > 0 && (
                  <div className="text-xs text-brand-sage-400 line-through">
                    {(item.originalPrice * item.quantity).toLocaleString()} DA
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Controls - Full Width */}
            <div className="flex items-center justify-center">
              <div className="flex items-center bg-white rounded-lg border border-brand-sage-200 shadow-sm">
                <motion.button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 text-brand-darkGreen-500 hover:bg-brand-sage-50 rounded-l-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-3 h-3" />
                </motion.button>
                
                <span className="px-4 py-2 font-semibold text-brand-darkGreen-500 bg-white min-w-[50px] text-center text-sm">
                  {item.quantity}
                </span>
                
                <motion.button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 text-brand-darkGreen-500 hover:bg-brand-sage-50 rounded-r-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className="w-3 h-3" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Tablet and Desktop Layout */}
          <div className="hidden sm:flex gap-4 lg:gap-6">
            {/* Product Image */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 relative rounded-lg lg:rounded-xl overflow-hidden flex-shrink-0 bg-white shadow-lg">
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 112px, 128px"
              />
              
              {/* Discount Badge */}
              {discountPercentage > 0 && (
                <motion.div
                  className="absolute top-1 left-1 lg:top-2 lg:left-2 bg-red-500 text-white px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-full text-xs font-semibold shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  -{discountPercentage}%
                </motion.div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start mb-2 lg:mb-4">
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className="text-lg lg:text-xl font-playfair font-semibold text-brand-darkGreen-500 mb-1 lg:mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  
                  {/* Color and Size Selectors - Desktop */}
                  <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-2 lg:mb-3">
                    {/* Color Selector */}
                    {item.colors && item.colors.length > 0 && (
                      <div className="relative">
                        <motion.button
                          onClick={() => setShowColorSelector(!showColorSelector)}
                          className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 border border-brand-sage-200 text-sm hover:bg-brand-sage-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Palette className="w-4 h-4 text-brand-darkGreen-400" />
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-gray-300 shadow-sm"
                            style={{ backgroundColor: item.color || item.colors[0] }}
                          />
                          <span>{item.colorName || 'Choisir couleur'}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${showColorSelector ? 'rotate-180' : ''}`} />
                        </motion.button>
                        
                        <AnimatePresence>
                          {showColorSelector && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 bg-white border border-brand-sage-200 rounded-lg shadow-lg z-10 mt-1 p-3 min-w-[200px]"
                            >
                              <div className="grid grid-cols-4 gap-2">
                                {item.colors.map((color, idx) => (
                                  <motion.button
                                    key={`${color}-${idx}`}
                                    onClick={() => handleColorChange(color)}
                                    className={`flex flex-col items-center gap-1 p-2 rounded-md hover:bg-brand-sage-50 ${
                                      item.color === color ? 'bg-brand-sage-100 ring-2 ring-brand-camel-300' : ''
                                    }`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <div 
                                      className="w-6 h-6 rounded-full border-2 border-gray-300 shadow-sm"
                                      style={{ backgroundColor: color }}
                                    />
                                  </motion.button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Size Selector */}
                    {item.sizes && item.sizes.length > 0 && (
                      <div className="relative">
                        <motion.button
                          onClick={() => setShowSizeSelector(!showSizeSelector)}
                          className="flex items-center gap-2 bg-white rounded-lg px-3 py-1.5 border border-brand-sage-200 text-sm hover:bg-brand-sage-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Ruler className="w-4 h-4 text-brand-darkGreen-400" />
                          <span>Taille: {item.size || 'Choisir'}</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${showSizeSelector ? 'rotate-180' : ''}`} />
                        </motion.button>
                        
                        <AnimatePresence>
                          {showSizeSelector && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute top-full left-0 bg-white border border-brand-sage-200 rounded-lg shadow-lg z-10 mt-1 p-3"
                            >
                              <div className="grid grid-cols-3 gap-2">
                                {item.sizes.map((size, idx) => (
                                  <motion.button
                                    key={`${size}-${idx}`}
                                    onClick={() => handleSizeChange(size)}
                                    className={`px-3 py-3 rounded-md border text-lg font-bold transition-colors min-h-[44px] flex items-center justify-center ${
                                      item.size === size 
                                        ? 'bg-brand-camel-100 border-brand-camel-300 text-brand-camel-700' 
                                        : 'bg-white border-brand-sage-200 text-brand-darkGreen-500 hover:bg-brand-sage-50'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    {size}
                                  </motion.button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    <span className="bg-brand-camel-100 text-brand-camel-600 px-2 py-1 rounded-full text-xs font-semibold">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Remove Button */}
                <motion.button
                  onClick={handleRemove}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-300 flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
                </motion.button>
              </div>

              {/* Pricing and Quantity */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 lg:gap-3 mb-1">
                    <span className="text-xl lg:text-2xl font-bold text-brand-camel-500">
                      {item.price.toLocaleString()} DA
                    </span>
                    {item.originalPrice > 0 && item.originalPrice > 0 && (
                      <span className="text-base lg:text-lg text-brand-sage-400 line-through">
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

                {/* Quantity Controls */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white rounded-xl lg:rounded-2xl border-2 border-brand-sage-200 shadow-lg">
                    <motion.button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 lg:p-3 text-brand-darkGreen-500 hover:bg-brand-sage-50 rounded-l-xl lg:rounded-l-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    
                    <span className="px-4 py-2 lg:px-6 lg:py-3 font-semibold text-brand-darkGreen-500 bg-white min-w-[50px] lg:min-w-[60px] text-center">
                      {item.quantity}
                    </span>
                    
                    <motion.button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 lg:p-3 text-brand-darkGreen-500 hover:bg-brand-sage-50 rounded-r-xl lg:rounded-r-2xl transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>

                  <div className="text-right">
                    <div className="text-lg lg:text-xl font-bold text-brand-darkGreen-500">
                      {(item.price * item.quantity).toLocaleString()} DA
                    </div>
                    {item.originalPrice > 0 && item.originalPrice > 0 && (
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