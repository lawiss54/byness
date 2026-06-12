'use client';

import { useState, useCallback, useEffect } from 'react';
import type { Product, Category } from '@/app/admin/types';
import { fetchProductsService, fetchCategoriesService } from '../services/productsService';

interface UseProductsProps {
  initialProducts?: Product[];
  initialCategories?: Category[];
}

/**
 * Hook for managing products data and API calls.
 * Now accepts initial data to avoid client-side fetching on load.
 */
export function useProducts({ initialProducts = [], initialCategories = [] }: UseProductsProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  // This function can be called to manually refetch or update the product list.
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProductsService();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des données");
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await fetchCategoriesService();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  useEffect(() => {
    if (initialCategories.length === 0) {
      fetchCategories();
    }
  }, [fetchCategories, initialCategories.length]);

  return {
    products,
    setProducts,
    loading,
    error,
    categories,
    fetchProducts,
    fetchCategories
  };
}
