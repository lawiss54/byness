'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/shared/ui';
import type { Product } from '@/app/admin/types';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';

// Components
import ProductsHeader from './Products/ProductsHeader';
import ProductsStats from './Products/ProductsStats';
import ProductsFilters from './Products/ProductsFilters';
import ProductsBulkActions from './Products/ProductsBulkActions';
import ProductsGrid from './Products/ProductsGrid';
import ProductsTable from './Products/ProductsTable';
import ProductsPagination from './Products/ProductsPagination';
import ProductsEmptyState from './Products/ProductsEmptyState';

// Hooks
import { useProducts } from './Products/hooks/useProducts';
import { useProductsFilters } from './Products/hooks/useProductsFilters';
import { useProductsActions } from './Products/hooks/useProductsActions';

// Dynamic imports
const ProductForm = dynamic(() => import('./Products/ProductForm'), { ssr: false });
const ProductDetails = dynamic(() => import('./Products/ProductDetails'), { ssr: false });

type ViewMode = 'grid' | 'table';

export default function ProductsSection() {
  // State Management
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Custom Hooks
  const { 
    products, 
    loading, 
    error, 
    categories, 
    fetchProducts 
  } = useProducts();

  const {
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
    stats
  } = useProductsFilters(products);

  const {
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
  } = useProductsActions(products, paginatedProducts, fetchProducts);

  // Handlers
  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleViewProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductDetails(true);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      // Update existing product logic handled in hook
      toast.success('Produit mis à jour avec succès');
    } else {
      // Create new product logic handled in hook
      toast.success('Produit créé avec succès');
    }
    setShowProductForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 min-h-screen">
      {/* Header */}
      <ProductsHeader onCreateProduct={handleCreateProduct} />

      {/* Statistics Cards */}
      <ProductsStats stats={stats} />

      {/* Filters and Search */}
      <ProductsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Bulk Actions */}
      {selectedProducts.length > 0 && (
        <ProductsBulkActions
          selectedCount={selectedProducts.length}
          onDelete={handleBulkDelete}
          bulkStatusLoading={bulkStatus}
          bulkDeleteLoading={bulkDeleting}
          onStatusChange={handleStatusBulk}
        />
      )}

      {/* Products Display */}
      {viewMode === 'grid' ? (
        <ProductsGrid
          products={paginatedProducts}
          selectedProducts={selectedProducts}
          onSelectProduct={handleSelectProduct}
          onViewProduct={handleViewProduct}
          onEditProduct={handleEditProduct}
        />
      ) : (
        <ProductsTable
          products={paginatedProducts}
          selectedProducts={selectedProducts}
          onSelectProduct={handleSelectProduct}
          onSelectAll={handleSelectAll}
          onViewProduct={handleViewProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          deletingSlug={deletingSlug}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <ProductsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          filteredProducts={filteredProducts}
          itemsPerPage={12}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <ProductsEmptyState
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          categoryFilter={categoryFilter}
          onCreateProduct={handleCreateProduct}
        />
      )}

      {/* Modals */}
      <AnimatePresence>
        {showProductForm && (
          <ProductForm
            getCategories={categories}
            product={editingProduct}
            onSave={handleSaveProduct}
            onClose={() => {
              setShowProductForm(false);
              setEditingProduct(null);
            }}
          />
        )}
        {showProductDetails && editingProduct && (
          <ProductDetails
            product={editingProduct}
            onEdit={() => {
              setShowProductDetails(false);
              setShowProductForm(true);
            }}
            onClose={() => {
              setShowProductDetails(false);
              setEditingProduct(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
