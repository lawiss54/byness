'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Gift, FileText, Shield, Package } from 'lucide-react';
import type { CheckoutFormData } from '../schemas/checkoutSchemas';

export default function AdditionalOptionsForm() {
  const { control } = useFormContext<CheckoutFormData>();

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
      className="space-y-6"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center gap-3 bg-brand-darkGreen-100 px-6 py-3 rounded-full mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Package className="w-5 h-5 text-brand-darkGreen-600" />
          <span className="text-brand-darkGreen-600 font-semibold">
            Finalisation de commande
          </span>
        </motion.div>
        <h3 className="text-2xl font-playfair font-bold text-brand-darkGreen-500 mb-2">
          Dernières options
        </h3>
        <p className="text-brand-darkGreen-400">
          Personnalisez votre commande avant validation
        </p>
      </div>

      <div className="space-y-6">
        {/* Payment Method Info - COD Only */}
        <motion.div
          className="p-6 bg-gradient-to-r from-brand-camel-50 to-brand-sage-50 rounded-2xl border-2 border-brand-camel-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="p-3 bg-brand-camel-500 rounded-xl text-white"
              whileHover={{ rotate: 5 }}
            >
              <Package className="w-6 h-6" />
            </motion.div>
            <div>
              <h4 className="font-semibold text-brand-darkGreen-500 text-lg">
                Paiement à la livraison
              </h4>
              <p className="text-brand-darkGreen-400">
                Payez en espèces lors de la réception de votre commande
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl">
            <ul className="space-y-2 text-sm text-brand-darkGreen-500">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-camel-500 rounded-full"></div>
                Aucun frais supplémentaire
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-camel-500 rounded-full"></div>
                Paiement sécurisé à la réception
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-camel-500 rounded-full"></div>
                Pas convaincu ? On vous le reprend gratuitement.
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Gift Wrap Option */}
        <motion.div
          className="p-6 border-2 border-dashed border-brand-camel-200 rounded-2xl bg-gradient-to-r from-brand-camel-50 to-brand-sage-50"
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <FormField
            control={control}
            name="giftWrap"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <motion.label
                    className="flex items-center gap-4 cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <input
                      type="checkbox"
                      checked={field.value || false}
                      onChange={field.onChange}
                      className="w-5 h-5 text-brand-camel-500 rounded focus:ring-brand-camel-500 border-brand-sage-300"
                    />
                    <motion.div
                      className="p-3 bg-brand-camel-100 rounded-xl"
                      whileHover={{ rotate: 5 }}
                    >
                      <Gift className="w-6 h-6 text-brand-camel-600" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="font-semibold text-brand-darkGreen-500 mb-1">
                        Emballage cadeau premium
                      </div>
                      <div className="text-sm text-brand-darkGreen-400 mb-2">
                        Emballage élégant avec ruban et carte personnalisée
                      </div>
                      <div className="text-brand-camel-600 font-semibold">
                        +300 DA
                      </div>
                    </div>
                  </motion.label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </motion.div>

       

        {/* Security Notice */}
        <motion.div
          className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Shield className="w-5 h-5 text-green-600" />
          </motion.div>
          <div className="text-sm text-green-700">
            <strong>Commande sécurisée</strong> - Vos données personnelles sont protégées 
            et nous ne stockons aucune information de paiement.
          </div>
        </motion.div>

        {/* Order Summary Info */}
        <motion.div
          className="bg-white p-6 rounded-2xl border-2 border-brand-sage-200 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="font-semibold text-brand-darkGreen-500 mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-brand-camel-500" />
            Récapitulatif de votre commande
          </h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-darkGreen-400">Mode de paiement:</span>
              <span className="font-semibold text-brand-darkGreen-500">Paiement à la livraison</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-darkGreen-400">Frais de paiement:</span>
              <span className="font-semibold text-green-600">Gratuit</span>
            </div>
            <div className="pt-2 border-t border-brand-sage-200">
              <p className="text-brand-darkGreen-400 text-xs">
                Vous recevrez un appel téléphonique de confirmation avec les détails de livraison.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}