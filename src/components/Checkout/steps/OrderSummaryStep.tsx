'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, MapPin, User, Phone } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import Image from 'next/image';
import { Card, Button } from '@/components/shared/ui';
import { CheckoutFormData } from '@/components/Checkout/schemas/checkoutSchemas';
import { useCartCheckout } from '@/lib/CartCheckoutContext';

interface OrderSummaryStepProps {
  form: UseFormReturn<CheckoutFormData>;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const OrderSummaryStep: React.FC<OrderSummaryStepProps> = ({ 
  form, 
  onSubmit, 
  isSubmitting 
}) => {
  const { cartItems, subtotal, shippingCost, total } = useCartCheckout();
  const formData = form.getValues();

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-playfair font-bold text-brand-darkGreen-500 mb-2">
          Récapitulatif de commande
        </h2>
        <p className="text-brand-darkGreen-400">
          Vérifiez vos informations avant de confirmer
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Customer Information */}
        <Card padding="lg">
          <h3 className="text-xl font-playfair font-bold text-brand-darkGreen-500 mb-6 flex items-center gap-2">
            <User className="w-5 h-5" />
            Informations client
          </h3>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-brand-darkGreen-400">Nom complet:</span>
              <span className="font-semibold text-brand-darkGreen-600">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-brand-darkGreen-400">Téléphone:</span>
              <span className="font-semibold text-brand-darkGreen-600">
                {formData.phone}
              </span>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-brand-darkGreen-400">Adresse:</span>
              <span className="font-semibold text-brand-darkGreen-600">
                {formData.address}
              </span>
              <span className="text-sm text-brand-darkGreen-400">
                {formData.municipality}, Wilaya {formData.wilaya}
              </span>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t border-brand-sage-200">
              <span className="text-brand-darkGreen-400">Livraison:</span>
              <div className="flex items-center gap-2">
                {formData.shippingType === 'home' ? (
                  <Truck className="w-4 h-4 text-brand-camel-500" />
                ) : (
                  <Package className="w-4 h-4 text-brand-camel-500" />
                )}
                <span className="font-semibold text-brand-darkGreen-600">
                  {formData.shippingType === 'home' 
                    ? 'Livraison à domicile' 
                    : 'Bureau de transport'
                  }
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Order Items */}
        <Card padding="lg">
          <h3 className="text-xl font-playfair font-bold text-brand-darkGreen-500 mb-6 flex items-center gap-2">
            <Package className="w-5 h-5" />
            Articles commandés
          </h3>
          
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-brand-sage-50 rounded-xl">
                <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.images?.[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-brand-darkGreen-500 line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-sm text-brand-darkGreen-400">
                    Quantité: {item.quantity}
                  </p>
                  {item.color && (
                    <p className="text-sm text-brand-darkGreen-400">
                      Couleur: {item.colorName || item.color}
                    </p>
                  )}
                  {item.size && (
                    <p className="text-sm text-brand-darkGreen-400">
                      Taille: {item.size}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-bold text-brand-camel-500">
                    {(item.price * item.quantity).toLocaleString()} DA
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <div className="space-y-3 pt-4 border-t border-brand-sage-200">
            <div className="flex justify-between text-brand-darkGreen-500">
              <span>Sous-total</span>
              <span>{subtotal.toLocaleString()} DA</span>
            </div>
            
            <div className="flex justify-between text-brand-darkGreen-500">
              <span>Livraison</span>
              <span>{shippingCost.toLocaleString()} DA</span>
            </div>
            
            <div className="flex justify-between text-xl font-bold text-brand-camel-500 pt-3 border-t border-brand-sage-200">
              <span>Total</span>
              <span>{total.toLocaleString()} DA</span>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default OrderSummaryStep;