'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/shared/ui';
import type { Product } from '@/app/admin/types';

interface ProductFormHeaderProps {
  product: Product | null;
  onClose: () => void;
}

/**
 * Header component for product form modal
 */
export default function ProductFormHeader({ product, onClose }: ProductFormHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900">
        {product ? 'Modifier le produit' : 'Nouveau produit'}
      </h2>
      <Button
        variant="ghost"
        size="sm"
        icon={<X className="w-5 h-5" />}
        onClick={onClose}
      />
    </div>
  );
}
