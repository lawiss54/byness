'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Package, Truck, PhoneCall } from 'lucide-react';

import {useCheckout} from '../CheckoutContext'


export default function ConfirmationStep() {
  const {
    shippingMethod,
    total
  } = useCheckout();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <motion.div
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Check className="w-10 h-10 text-green-600" />
        </motion.div>
        <h2 className="text-3xl font-playfair font-bold text-brand-darkGreen-500 mb-2">
          Commande confirmée !
        </h2>
        <p className="text-brand-darkGreen-400">
          Merci pour votre commande. Vous recevrez un appel téléphonique pour confirmer votre commande.
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-r from-brand-sage-50 to-brand-camel-50 rounded-3xl p-8">
        <h3 className="text-xl font-playfair font-bold text-brand-darkGreen-500 mb-6">
          Détails de votre commande
        </h3>
        
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-brand-darkGreen-500">Numéro de commande:</span>
            <span className="font-semibold text-brand-camel-500">#CMD-2024-001</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-darkGreen-500">Date:</span>
            <span className="font-semibold">{new Date().toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-darkGreen-500">Mode de livraison:</span>
            <span className="font-semibold">
              {shippingMethod === 'bureau' ? 'Livraison au bureau yalidin ' : 'Livraison à domicile'}
            </span>
          </div>
         
        </div>

        <div className="border-t border-brand-sage-200 pt-4">
          <div className="flex justify-between text-xl font-bold text-brand-camel-500">
            <span>Total payé:</span>
            <span>{total.toLocaleString()} DA</span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: PhoneCall,
            title: 'Appel de confirmation',
            description: 'Vous recevrez un appel téléphonique avec tous les détails'
          },
          {
            icon: Package,
            title: 'Préparation',
            description: 'Votre commande sera préparée avec soin'
          },
          {
            icon: Truck,
            title: 'Livraison',
            description: 'Livraison sous 1 à 2 jours ouvrables'
          }
        ].map((step, index) => (
          <motion.div
            key={index}
            className="text-center p-6 bg-white rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <step.icon className="w-8 h-8 text-brand-camel-500 mx-auto mb-4" />
            <h4 className="font-semibold text-brand-darkGreen-500 mb-2">
              {step.title}
            </h4>
            <p className="text-sm text-brand-darkGreen-400">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}