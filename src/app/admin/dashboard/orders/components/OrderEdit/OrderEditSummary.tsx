import React from 'react';
import { Card } from '@/components/shared/ui';

interface OrderEditSummaryProps {
  watchedItems: any[];
  currentShippingPrice: number;
  watchedIsFreeShipping: boolean;
  calculateTotal: (isFreeShipping?: boolean) => number;
}

export function OrderEditSummary({
  watchedItems,
  currentShippingPrice,
  watchedIsFreeShipping,
  calculateTotal
}: OrderEditSummaryProps) {
  const subtotal = watchedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Résumé de la commande
      </h3>
      
      <div className="space-y-2">
        <div className="flex justify-between text-gray-600">
          <span>Sous-total:</span>
          <span>{subtotal.toLocaleString()} DA</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Livraison:</span>
          <div className="text-right">
            <span>
              {watchedIsFreeShipping ? "0" : currentShippingPrice} DA
            </span>
            {watchedIsFreeShipping && (
              <div className="text-brand-camel-600 text-xs">
                (Livraison gratuite appliquée)
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
          <span>Total:</span>
          <span>{calculateTotal(watchedIsFreeShipping).toLocaleString()} DA</span>
        </div>
      </div>
    </Card>
  );
}
