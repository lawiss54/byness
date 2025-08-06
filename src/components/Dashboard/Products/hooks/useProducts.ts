'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Product, Category } from '@/app/admin/types';
import { fetchProductsService, fetchCategoriesService } from '../services/productsService';

/**
 * Hook for managing products data and API calls
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

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
    if (typeof window === 'undefined') return;
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  return {
    products,
    setProducts,
    loading,
    error,
    categories,
    fetchProducts
  };
}
