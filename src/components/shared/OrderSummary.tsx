"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Percent,
  Shield,
  Truck,
  Package,
} from "lucide-react";
import { useUnifiedCart } from "./UnifiedCartContext";

export default function OrderSummary() {
  const {
    promoCode,
    setPromoCode,
    appliedPromo,
    applyPromoCode,
    removePromo,
    giftWrap,
    subtotal,
    savings,
    shippingCost,
    giftWrapCost,
    promoDiscount,
    total,
  } = useUnifiedCart();

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
      className="w-full bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl p-4 sm:p-6 lg:p-8 sticky top-4 sm:top-6 lg:top-8"
      variants={itemVariants}
    >
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-brand-camel-500" />
        </motion.div>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-playfair font-bold text-brand-darkGreen-500">
          Résumé de commande
        </h3>
      </div>

      {/* Promo Code */}
      <div className="mb-6 sm:mb-8">
        <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-3 mb-4">
          <input
            type="text"
            placeholder="Code promo"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="w-full sm:flex-1 px-3 sm:px-4 py-2 sm:py-3 border-2 border-brand-sage-200 rounded-lg sm:rounded-xl focus:border-brand-camel-500 focus:outline-none transition-colors text-sm sm:text-base"
          />
          <motion.button
            onClick={applyPromoCode}
            className="w-full sm:w-auto sm:flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 bg-brand-darkGreen-500 text-white rounded-lg sm:rounded-xl font-semibold hover:bg-brand-darkGreen-600 transition-colors text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Appliquer
          </motion.button>
        </div>

        {appliedPromo && (
          <motion.div
            className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg sm:rounded-xl"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-semibold text-sm sm:text-base">
                {appliedPromo}
              </span>
            </div>
            <motion.button
              onClick={removePromo}
              className="text-green-600 hover:text-green-700 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-brand-sage-50 to-brand-camel-50 rounded-xl sm:rounded-2xl">
        <div className="flex justify-between text-brand-darkGreen-500 text-sm sm:text-base">
          <span>Sous-total</span>
          <span>{subtotal.toLocaleString()} DA</span>
        </div>

        {savings > 0 && (
          <div className="flex justify-between text-green-600 text-sm sm:text-base">
            <span>Économies</span>
            <span>-{savings.toLocaleString()} DA</span>
          </div>
        )}

        <div className="flex justify-between text-brand-darkGreen-500 text-sm sm:text-base">
          <span>Livraison</span>
          <span>{shippingCost === 0 ? "Gratuite" : `${shippingCost} DA`}</span>
        </div>

        {giftWrap && (
          <div className="flex justify-between text-brand-darkGreen-500 text-sm sm:text-base">
            <span>Emballage cadeau</span>
            <span>{giftWrapCost} DA</span>
          </div>
        )}

        {promoDiscount > 0 && (
          <div className="flex justify-between text-green-600 text-sm sm:text-base">
            <span>Réduction promo</span>
            <span>-{promoDiscount.toLocaleString()} DA</span>
          </div>
        )}

        <div className="border-t border-brand-sage-200 pt-3">
          <div className="flex justify-between text-lg sm:text-xl font-bold text-brand-camel-500">
            <span>Total</span>
            <span>{total.toLocaleString()} DA</span>
          </div>
        </div>
      </div>

      {/* Trust Signals */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
        {[
          { icon: Shield, text: "Paiement sécurisé" },
          { icon: Truck, text: "Livraison rapide" },
          { icon: Package, text: "Retour gratuit" },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-md"
            whileHover={{ y: -2 }}
          >
            <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-brand-camel-500 mx-auto mb-1" />
            <p className="text-xs font-medium text-brand-darkGreen-500 leading-tight">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
