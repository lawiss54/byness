'use client';

import { Package, Plus } from 'lucide-react';
import { Button, Card } from '@/components/shared/ui';

interface ProductsEmptyStateProps {
  searchTerm: string;
  statusFilter: string;
  categoryFilter: string;
  onCreateProduct: () => void;
}

/**
 * Empty state component when no products are found
 */
export default function ProductsEmptyState({
  searchTerm,
  statusFilter,
  categoryFilter,
  onCreateProduct
}: ProductsEmptyStateProps) {
  const hasFilters = searchTerm || statusFilter !== 'all' || categoryFilter !== 'all';

  return (
    <Card className="p-12 text-center">
      <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
      <p className="text-gray-500 mb-6">
        {hasFilters
          ? 'Aucun produit ne correspond à vos critères de recherche.'
          : 'Commencez par ajouter votre premier produit.'
        }
      </p>
      {!hasFilters && (
        <Button
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={onCreateProduct}
        >
          Ajouter un produit
        </Button>
      )}
    </Card>
  );
}
