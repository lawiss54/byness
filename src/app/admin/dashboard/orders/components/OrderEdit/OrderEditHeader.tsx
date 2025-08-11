import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/shared/ui';

interface OrderEditHeaderProps {
  orderId: string;
  onClose: () => void;
}

export function OrderEditHeader({ orderId, onClose }: OrderEditHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-brand-camel-50 to-brand-sage-50">
      <h2 className="text-2xl font-bold text-gray-900">
        Modifier la commande {orderId}
      </h2>
      <Button
        variant="ghost"
        size="sm"
        icon={<X className="w-5 h-5" />}
        onClick={onClose}
        aria-label="Fermer"
      />
    </div>
  );
}
