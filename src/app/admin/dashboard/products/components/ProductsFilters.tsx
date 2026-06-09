'use client';

import { Search } from 'lucide-react';
import { Button, Input, Select, Card } from '@/components/shared/ui';
import type { Category } from '@/app/admin/types';

type ProductStatus = 'all' | 'active' | 'inactive';
type ViewMode = 'grid' | 'table';

interface ProductsFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: ProductStatus;
  setStatusFilter: (status: ProductStatus) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  categories: { value: string; label: string }[];
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

/**
 * Filters component for products search and filtering
 */
export default function ProductsFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  categories,
  viewMode,
  setViewMode
}: ProductsFiltersProps) {
  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'active', label: 'Actifs' },
    { value: 'inactive', label: 'Inactifs' },
    { value: 'out-of-stock', label: 'Rupture de stock' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'Toutes les catégories' },
    ...categories
  ];

  return (
    <Card className="p-6">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Rechercher par nom ou SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ProductStatus)}
          options={statusOptions}
        />
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          options={categoryOptions}
        />
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grille
          </Button>
          <Button
            variant={viewMode === 'table' ? 'primary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            Tableau
          </Button>
        </div>
      </div>
    </Card>
  );
}
