import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Card } from '@/components/shared/ui';

interface EmptyStateProps {
  searchTerm: string;
  statusFilter: string;
}

export function EmptyState({ searchTerm, statusFilter }: EmptyStateProps) {
  return (
    <Card className="p-12 text-center">
      <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande</h3>
      <p className="text-gray-500">
        {searchTerm || statusFilter !== 'all'
          ? "Aucune commande ne correspond à vos critères de recherche."
          : "Aucune commande n'a encore été créée."
        }
      </p>
    </Card>
  );
}
