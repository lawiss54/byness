'use client';

import { Button, Card } from '@/components/shared/ui';
import type { Product } from '@/app/admin/types';

interface ProductsPaginationProps {
  currentPage: number;
  totalPages: number;
  filteredProducts: Product[];
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination component for products
 */
export default function ProductsPagination({
  currentPage,
  totalPages,
  filteredProducts,
  itemsPerPage,
  onPageChange
}: ProductsPaginationProps) {
  return (
    <Card className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div className="text-sm text-gray-700">
        Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredProducts.length)} sur {filteredProducts.length} produits
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Précédent
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <Button
            key={page}
            size="sm"
            variant={currentPage === page ? 'primary' : 'outline'}
            onClick={() => onPageChange(page)}
            className="w-8 h-8 p-0"
          >
            {page}
          </Button>
        ))}
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Suivant
        </Button>
      </div>
    </Card>
  );
}
