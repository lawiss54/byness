'use client';

import React from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { Button, Select } from '@/components/shared/ui';

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
}

export default function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Filtres avancés:</span>
      </div>
      
      <Select
        placeholder="Prix"
        options={[
          { value: 'low-to-high', label: 'Prix croissant' },
          { value: 'high-to-low', label: 'Prix décroissant' }
        ]}
        onChange={(e) => onFilterChange({ priceSort: e.target.value })}
      />
      
      <Select
        placeholder="Stock"
        options={[
          { value: 'in-stock', label: 'En stock' },
          { value: 'low-stock', label: 'Stock faible' },
          { value: 'out-of-stock', label: 'Rupture' }
        ]}
        onChange={(e) => onFilterChange({ stockFilter: e.target.value })}
      />
      
      <Button
        size="sm"
        variant="outline"
        icon={<SlidersHorizontal className="w-4 h-4" />}
      >
        Plus de filtres
      </Button>
    </div>
  );
}