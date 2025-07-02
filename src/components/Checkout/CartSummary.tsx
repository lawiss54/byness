'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Minus, X, Percent, Shield, Truck, Package } from 'lucide-react';
import Image from 'next/image';

import { useCart } from "@/components/cart/CartContext";

export default function CartSummary() {
  const {
    cartItems,
    updateQuantity,
    promoCode,
    setPromoCode,
    appliedPromo,
    applyPromoCode,
    removePromo,
    subtotal,
    savings,
    shippingCost,
    promoDiscount,
    total
  } = useCart();

  

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-3xl shadow-2xl p-4 sticky top-8"
      variants={itemVariants}
    >
      <div className="flex items-center gap-3 mb-8">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ShoppingBag className="w-6 h-6 text-brand-camel-500" />
        </motion.div>
        <h3 className="text-2xl font-playfair font-bold text-brand-darkGreen-500">
          Résumé de commande
        </h3>
      </div>

      {/* Cart Items */}
      <div className="space-y-6 mb-8">
        {cartItems?.map((item) => (
          <motion.div
            key={item?.id}
            className="flex gap-4 p-4 bg-gradient-to-r from-brand-sage-50 to-brand-camel-50 rounded-2xl"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-20 h-20 relative rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={item?.images[0]}
                alt={item?.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-brand-darkGreen-500 mb-1 line-clamp-1">
                {item?.name}
              </h4>
              <p className="text-sm text-brand-darkGreen-400 mb-2">
                {item?.color} • Taille {item?.size && (
                  <>Taille {item?.size}</>
                )}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={() => updateQuantity(item?.id, item?.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-brand-darkGreen-500 hover:bg-brand-sage-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="font-semibold text-brand-darkGreen-500 w-8 text-center">
                    {item?.quantity}
                  </span>
                  <motion.button
                    onClick={() => updateQuantity(item?.id, item?.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-brand-darkGreen-500 hover:bg-brand-sage-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
                <div className="text-right">
                  <div className="font-bold text-brand-camel-500">
                    {(item?.price * item?.quantity).toLocaleString()} DA
                  </div>
                  {item?.originalPrice > 0 && (
                    <div className="text-sm text-brand-sage-400 line-through">
                      {(item?.originalPrice * item?.quantity).toLocaleString()} DA
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Promo Code */}
      <div className="mb-8 flex">
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Code promo"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="flex-1 p-2 border-2 border-brand-sage-200 rounded-xl focus:border-brand-camel-500 focus:outline-none transition-colors"
          />
          <motion.button
            onClick={applyPromoCode}
            className="bg-brand-darkGreen-500 text-white rounded-xl text-sm px-2 font-semibold hover:bg-brand-darkGreen-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Appliquer
          </motion.button>
        </div>
        
        {appliedPromo && (
          <motion.div
            className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-semibold">{appliedPromo}</span>
            </div>
            <motion.button
              onClick={removePromo}
              className="text-green-600 hover:text-green-700"
              whileHover={{ scale: 1.1 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-8 p-6 bg-gradient-to-r from-brand-sage-50 to-brand-camel-50 rounded-2xl">
        <div className="flex justify-between text-brand-darkGreen-500">
          <span>Sous-total</span>
          <span>{subtotal?.toLocaleString()} DA</span>
        </div>
        
        {savings > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Économies</span>
            <span>-{savings?.toLocaleString()} DA</span>
          </div>
        )}
        
        <div className="flex justify-between text-brand-darkGreen-500">
          <span>Livraison</span>
          <span>{shippingCost === 0 ? 'Gratuite' : `${shippingCost} DA`}</span>
        </div>
        
        {promoDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Réduction promo</span>
            <span>-{promoDiscount?.toLocaleString()} DA</span>
          </div>
        )}
        
        <div className="border-t border-brand-sage-200 pt-3">
          <div className="flex justify-between text-xl font-bold text-brand-camel-500">
            <span>Total</span>
            <span>{total?.toLocaleString()} DA</span>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="grid grid-cols-3 gap-4 text-center">
        {[
          { icon: Shield, text: 'Paiement à la livraison' },
          { icon: Truck, text: 'Livraison rapide' },
          { icon: Package, text: 'Retour gratuit' }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="p-3 bg-white rounded-xl shadow-md"
            whileHover={{ y: -2 }}
          >
            <item.icon className="w-5 h-5 text-brand-camel-500 mx-auto mb-1" />
            <p className="text-xs text-brand-darkGreen-500 font-medium">
              {item?.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}