'use client';

import { useState, useCallback } from 'react';
import type { Product } from '@/app/admin/types';
import { toast } from 'react-toastify';
import { deleteProductService, updateProductStatusService } from '../services/productsService';

/**
 * Hook for managing product actions (delete, bulk operations, selection)
 */
export function useProductsActions(
  products: Product[], 
  paginatedProducts: Product[], 
  fetchProducts: () => void
) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [bulkStatus, setBulkStatus] = useState(false);

  const handleDeleteProduct = useCallback(async (productSlug: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setDeletingSlug(productSlug);
      try {
        await deleteProductService(productSlug);
        toast.success('Produit supprimé avec succès');
        fetchProducts();
      } catch (error) {
        toast.error('Erreur lors de la suppression du produit');
      } finally {
        setDeletingSlug(null);
      }
    }
  }, [fetchProducts]);

  const handleBulkDelete = useCallback(async () => {
    if (window.confirm(`Supprimer ${selectedProducts.length} produit(s) ?`)) {
      setBulkDeleting(true);
      let successCount = 0;
      
      for (const slug of selectedProducts) {
        try {
          await deleteProductService(slug);
          successCount++;
        } catch (err) {
          toast.error(`Erreur lors de la suppression du produit (${slug})`);
        }
      }
      
      setSelectedProducts([]);
      setBulkDeleting(false);
      fetchProducts();
      
      if (successCount > 0) {
        toast.success(`${successCount} produit(s) supprimé(s) avec succès`);
      }
    }
  }, [selectedProducts, fetchProducts]);

  const handleStatusBulk = useCallback(async (status: 'active' | 'inactive') => {
    setBulkStatus(true);
    let successCount = 0;
    
    for (const slug of selectedProducts) {
      try {
        await updateProductStatusService(slug, status);
        successCount++;
      } catch (err) {
        toast.error(`Erreur lors du changement de statut du produit (${slug})`);
      }
    }
    
    setSelectedProducts([]);
    setBulkStatus(false);
    fetchProducts();
    
    if (successCount > 0) {
      toast.success(`${successCount} produit(s) mis à jour avec succès`);
    }
  }, [selectedProducts, fetchProducts]);

  const handleSelectProduct = useCallback((productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    }
  }, [selectedProducts.length, paginatedProducts]);

  return {
    selectedProducts,
    setSelectedProducts,
    deletingSlug,
    bulkDeleting,
    bulkStatus,
    handleDeleteProduct,
    handleBulkDelete,
    handleStatusBulk,
    handleSelectProduct,
    handleSelectAll
  };
}
