import React from 'react';
import { Button } from '@/components/shared/ui';

interface OrdersPaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  filteredOrdersLength: number;
  onPageChange: (page: number) => void;
}

export function OrdersPagination({
  currentPage,
  totalPages,
  itemsPerPage,
  filteredOrdersLength,
  onPageChange
}: OrdersPaginationProps) {
  return (
    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div className="text-sm text-gray-700">
        Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredOrdersLength)} sur {filteredOrdersLength} commande{filteredOrdersLength > 1 ? 's' : ''}
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Page précédente"
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
            aria-label={`Aller à la page ${page}`}
          >
            {page}
          </Button>
        ))}
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Page suivante"
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}
