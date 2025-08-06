import React from 'react';
import { Search } from 'lucide-react';
import { Button, Select, Card, Input } from '@/components/shared/ui';
import type { OrderStatus, ViewMode } from './types/orders';

interface OrdersFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: OrderStatus;
  setStatusFilter: (status: OrderStatus) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export function OrdersFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  viewMode,
  setViewMode
}: OrdersFiltersProps) {
  const statusOptions = [
    {id: '1', value: 'all', label: 'Tous les statuts' },
    {id: '2', value: 'pending', label: 'En attente' },
    {id: '3', value: 'confirmed', label: 'Confirmée' },
    {id: '4', value: 'shipped', label: 'Expédiée' },
    {id: '5', value: 'out_for_delivery', label: 'Sortie pour livraison' },
    {id: '6', value: 'delivered', label: 'Livrée' },
    {id: '7', value: 'failed_delivery', label: 'Échec de livraison' },
    {id: '8', value: 'returned', label: 'Retournée' },
    {id: '9', value: 'cancelled', label: 'Annulée' },
  ];

  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            placeholder="Recherche par numéro, nom du client ou téléphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            aria-label="Recherche de commande"
          />
        </div>
        
        {/* Status Filter */}
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as OrderStatus)}
          options={statusOptions}
          aria-label="Filtrer par statut"
        />
        
        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'table' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            aria-label="Vue tableau"
          >
            Tableau
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            aria-label="Vue grille"
          >
            Grille
          </Button>
        </div>
      </div>
    </Card>
  );
}
