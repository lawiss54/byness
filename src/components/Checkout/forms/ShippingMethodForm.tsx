'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/shared/ui/form';
import { Truck, Package, Clock, Check } from 'lucide-react';
import type { CheckoutFormData } from '../schemas/checkoutSchemas';

export default function ShippingMethodForm() {
  const { control, watch } = useFormContext<CheckoutFormData>();
  const subtotal = 45000; // Mock subtotal
  const selectedMethod = watch('shippingMethod');

  const shippingMethods = [
    {
      id: 'bureau',
      name: 'Trouvez votre colis au bureau',
      time: '1-2 jours ouvrables',
      price: 300,
      icon: Truck,
      description: 'Livraison au bureau de la société de transport'
    },
    {
      id: 'domicile',
      name: 'Livraison à domicile',
      time: '1-2 jours ouvrables',
      price: 800,
      icon: Package,
      description: 'Livraison jusqu’à votre porte avec suivi'
    }

  ];

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
          className="inline-flex items-center gap-3 bg-brand-sage-100 px-6 py-3 rounded-full mb-4"
          whileHover={{ scale: 1.05 }}
        >
          <Clock className="w-5 h-5 text-brand-sage-600" />
          <span className="text-brand-sage-600 font-semibold">
            Mode de livraison
          </span>
        </motion.div>
        <h3 className="text-2xl font-playfair font-bold text-brand-darkGreen-500 mb-2">
          Quand souhaitez-vous recevoir votre commande ?
        </h3>
        <p className="text-brand-darkGreen-400">
          Choisissez le mode de livraison qui vous convient
        </p>
      </div>

      <FormField
        control={control}
        name="shippingMethod"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="space-y-4">
                {shippingMethods.map((method, index) => (
                  <motion.label
                    key={method.id}
                    className={`flex items-center p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                      field.value === method.id
                        ? 'border-brand-camel-500 bg-brand-camel-50 shadow-lg'
                        : 'border-brand-sage-200 hover:border-brand-camel-300 bg-white'
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <input
                      type="radio"
                      value={method.id}
                      checked={field.value === method.id}
                      onChange={field.onChange}
                      className="sr-only"
                    />
                    
                    <motion.div
                      className={`p-4 rounded-xl mr-4 ${
                        field.value === method.id
                          ? 'bg-brand-camel-500 text-white'
                          : 'bg-brand-sage-100 text-brand-sage-600'
                      }`}
                      whileHover={{ rotate: 5 }}
                    >
                      <method.icon className="w-6 h-6" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-brand-darkGreen-500 text-lg">
                          {method.name}
                        </h4>
                        <div className="text-right">
                          <div className={`font-bold text-lg ${
                            method.price === 0 ? 'text-green-600' : 'text-brand-camel-500'
                          }`}>
                            {method.price === 0 ? 'Gratuite' : `${method.price} DA`}
                          </div>
                          {method.price === 0 && subtotal >= 5000 && (
                            <div className="text-xs text-green-600 font-medium">
                              Économisez 500 DA
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-brand-darkGreen-400 mb-1">
                            {method.time}
                          </div>
                          <div className="text-sm text-brand-sage-500">
                            {method.description}
                          </div>
                        </div>
                        
                        {field.value === method.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-8 h-8 bg-brand-camel-500 rounded-full flex items-center justify-center"
                          >
                            <Check className="w-5 h-5 text-white" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.label>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Delivery Info */}
      <motion.div
        className="bg-gradient-to-r from-brand-sage-50 to-brand-camel-50 p-6 rounded-2xl border-2 border-dashed border-brand-camel-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Truck className="w-5 h-5 text-brand-camel-500" />
          </motion.div>
          <h4 className="font-semibold text-brand-darkGreen-500">
            Informations de livraison
          </h4>
        </div>
        <ul className="space-y-2 text-sm text-brand-darkGreen-400">
          <li>• Livraison rapide dans toutes les wilayas du pays</li>
          <li>• Suivi de commande par SMS et email</li>
          <li>• Livraison du dimanche au jeudi</li>
          <li>• Possibilité de reporter la livraison</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}