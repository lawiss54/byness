'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Truck, Package } from 'lucide-react';
import { useCheckout } from '../CheckoutContext';

const wilayas = [
  'Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Djelfa', 'Sétif',
  'Sidi Bel Abbès', 'Biskra', 'Tébessa', 'El Oued', 'Skikda', 'Tiaret', 'Béjaïa'
];

export default function ShippingStep() {
  const {
    shippingInfo,
    setShippingInfo,
    shippingMethod,
    setShippingMethod,
  } = useCheckout();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-playfair font-bold text-brand-darkGreen-500 mb-2">
          Informations de livraison
        </h2>
        <p className="text-brand-darkGreen-400">
          Renseignez vos coordonnées pour la livraison
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-brand-darkGreen-500 mb-2">
            Prénom *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-sage-400" />
            <input
              type="text"
              value={shippingInfo.firstName}
              onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
              className="w-full pl-12 pr-4 py-3 border-2 border-brand-sage-200 rounded-xl focus:border-brand-camel-500 focus:outline-none transition-colors"
              placeholder="Votre prénom"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-brand-darkGreen-500 mb-2">
            Nom *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-sage-400" />
            <input
              type="text"
              value={shippingInfo.lastName}
              onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
              className="w-full pl-12 pr-4 py-3 border-2 border-brand-sage-200 rounded-xl focus:border-brand-camel-500 focus:outline-none transition-colors"
              placeholder="Votre nom"
            />
          </div>
        </div>

        <div className='md:col-span-2'>
          <label className="block text-sm font-semibold text-brand-darkGreen-500 mb-2 ">
            Téléphone *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brand-sage-400" />
            <input
              type="tel"
              value={shippingInfo.phone}
              onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
              className="w-full pl-12 pr-4 py-3 border-2 border-brand-sage-200 rounded-xl focus:border-brand-camel-500 focus:outline-none transition-colors"
              placeholder="0555 123 456"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-brand-darkGreen-500 mb-2">
            Adresse *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-4 w-5 h-5 text-brand-sage-400" />
            <textarea
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
              className="w-full pl-12 pr-4 py-3 border-2 border-brand-sage-200 rounded-xl focus:border-brand-camel-500 focus:outline-none transition-colors resize-none"
              rows={3}
              placeholder="Votre adresse complète"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-brand-darkGreen-500 mb-2">
            Ville *
          </label>
          <input
            type="text"
            value={shippingInfo.city}
            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
            className="w-full px-4 py-3 border-2 border-brand-sage-200 rounded-xl focus:border-brand-camel-500 focus:outline-none transition-colors"
            placeholder="Votre ville"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-brand-darkGreen-500 mb-2">
            Wilaya *
          </label>
          <select
            value={shippingInfo.wilaya}
            onChange={(e) => setShippingInfo({...shippingInfo, wilaya: e.target.value})}
            className="w-full px-4 py-3 border-2 border-brand-sage-200 rounded-xl focus:border-brand-camel-500 focus:outline-none transition-colors"
          >
            <option value="">Sélectionnez une wilaya</option>
            {wilayas.map((wilaya) => (
              <option key={wilaya} value={wilaya}>{wilaya}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Shipping Methods */}
      <div className="space-y-4">
        <h3 className="text-xl font-playfair font-bold text-brand-darkGreen-500">
          Mode de livraison
        </h3>
        
        <div className="space-y-3">
          {[
            {
              id: 'bureau',
              name: 'Livraison au bureau yalidin',
              time: '1-2 jours ouvrables',
              price: 300,
              icon: Truck
            },
            {
              id: 'maison',
              name: 'Livraison à domicile',
              time: '1-2 jours ouvrables',
              price: 800,
              icon: Package
            }
          ].map((method) => (
            <motion.label
              key={method.id}
              className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                shippingMethod === method.id
                  ? 'border-brand-camel-500 bg-brand-camel-50'
                  : 'border-brand-sage-200 hover:border-brand-camel-300'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="radio"
                name="shipping"
                value={method.id}
                checked={shippingMethod === method.id}
                onChange={(e) => setShippingMethod(e.target.value)}
                className="sr-only"
              />
              <method.icon className="w-6 h-6 text-brand-camel-500 mr-4" />
              <div className="flex-1">
                <div className="font-semibold text-brand-darkGreen-500">
                  {method.name}
                </div>
                <div className="text-sm text-brand-darkGreen-400">
                  {method.time}
                </div>
              </div>
              <div className="font-bold text-brand-camel-500">
                {method.price === 0 ? 'Gratuite' : `${method.price} DA`}
              </div>
            </motion.label>
          ))}
        </div>
      </div>

    </div>
  );
}