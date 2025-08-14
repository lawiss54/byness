'use client';

import { useState, useMemo } from 'react';
import type { Category } from '@/app/admin/types';

type CategoryStatus = 'all' | 'active' | 'inactive';

interface UseCategoriesManagementProps {
  initialCategories?: Category[];
}

export function useCategoriesManagement({ initialCategories = [] }: UseCategoriesManagementProps) {
  const [categories] = useState<Category[]>(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<CategoryStatus>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const filteredCategories = useMemo(() => {
    if (!Array.isArray(categories)) {
      return [];
    }
    return categories.filter(cat => {
      const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || cat.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCategories.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCategories, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredCategories.length / itemsPerPage);
  }, [filteredCategories, itemsPerPage]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    paginatedCategories,
    totalPages,
  };
}
