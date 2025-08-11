'use client';

import { useState, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import type { Category } from '@/app/admin/types';

type CategoryStatus = 'all' | 'active' | 'inactive';

interface UseCategoriesManagementProps {
  initialCategories?: Category[];
}

export function useCategoriesManagement({ initialCategories = [] }: UseCategoriesManagementProps) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<CategoryStatus>('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const router = useRouter();

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/Category');
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  }, []);

  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    return categories.filter(cat => {
      const matchesSearch = cat?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || cat?.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCategories.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCategories, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  const stats = useMemo(() => ({
    total: categories.length,
    active: categories.filter(c => c.status === 'active').length,
    inactive: categories.filter(c => c.status === 'inactive').length,
    totalProducts: categories.reduce((sum, c) => sum + (c.productsCount || 0), 0)
  }), [categories]);

  const handleDeleteCategory = async (slug: string) => {
    // ... (implementation remains the same)
  };

  const handleSaveCategory = async (data: Partial<Category>, editingCategory: Category | null) => {
    // ... (implementation remains the same)
  };

  const handleSelectCategory = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const handleSelectAll = () => {
    if (selectedCategories.length === paginatedCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(paginatedCategories.map(c => c.slug));
    }
  };

  const handleChangeStatusCategory = async (slug: string, status: string) => {
    // ... (implementation remains the same)
  };

  return {
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedCategories,
    setSelectedCategories,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    paginatedCategories,
    totalPages,
    stats,
    fetchCategories,
    handleDeleteCategory,
    handleSaveCategory,
    handleSelectCategory,
    handleSelectAll,
    handleChangeStatusCategory
  };
}
