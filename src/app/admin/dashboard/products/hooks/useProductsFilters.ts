'use client';

import { useState, useMemo } from 'react';
import type { Product } from '@/app/admin/types';

type ProductStatus = 'all' | 'active' | 'inactive';

/**
 * Hook for managing products filtering and pagination
 */
export function useProductsFilters(products: Product[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProductStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filtered products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.slug.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [products, searchTerm, statusFilter, categoryFilter]);

  // Paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products?.map(p => p.category))];
    return uniqueCategories.map(cat => ({ value: cat, label: cat }));
  }, [products]);

  // Statistics
  const stats = useMemo(() => ({
    total: products?.length || 0,
    active: products?.filter(p => p.status === 'active').length || 0,
    inactive: products?.filter(p => p.status === 'inactive').length || 0,
    lowStock: products?.filter(p => p.stockQuantity < 10).length || 0
  }), [products]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    currentPage,
    setCurrentPage,
    filteredProducts,
    paginatedProducts,
    totalPages,
    categories,
    stats
  };
}
