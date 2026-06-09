'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/shared/ui';

interface ProductsHeaderProps {
  onCreateProduct: () => void;
}

/**
 * Header component for products section
 * Contains title, description and create button
 */
export default function ProductsHeader({ onCreateProduct }: ProductsHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Produits</h1>
        <p className="text-gray-600 mt-2">Gérez votre catalogue de produits</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={onCreateProduct}
        >
          Nouveau Produit
        </Button>
      </div>
    </div>
  );
}
