'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Card } from '@/components/shared/ui';
import { useOrdersManagement } from './Orders/hooks/useOrdersManagement';
import { OrdersHeader } from './Orders/OrdersHeader';
import { OrdersStats } from './Orders/OrdersStats';
import { OrdersFilters } from './Orders/OrdersFilters';
import { OrdersTable } from './Orders/OrdersTable';
import { OrdersGrid } from './Orders/OrdersGrid';
import { OrdersPagination } from './Orders/OrdersPagination';
import { OrdersModals } from './Orders/OrdersModals';
import { LoadingSpinner } from './Orders/LoadingSpinner';
import { EmptyState } from './Orders/EmptyState';
import BulkActions from './Orders/BulkActions';

export default function OrdersManagement() {
  const {
    // Data
    orders,
    filteredOrders,
    paginatedOrders,
    stats,
    loading,
    
    // Filters & Search
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    
    // View & Pagination
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    
    // Selection
    selectedOrders,
    handleSelectOrder,
    handleSelectAll,
    
    // Actions
    handleViewOrder,
    handleEditOrder,
    handleStatusChange,
    handleBulkDownload,
    
    // Modals
    showOrderDetails,
    showOrderEdit,
    currentOrder,
    showPdfModal,
    pdfUrl,
    setShowPdfModal,
    setPdfUrl,
    setShowOrderDetails,
    setShowOrderEdit,
    setCurrentOrder
  } = useOrdersManagement();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <OrdersHeader />

      {/* Statistics Cards */}
      <OrdersStats stats={stats} />

      {/* Filters and Search */}
      <OrdersFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <BulkActions
          selectedCount={selectedOrders.length}
          onStatusChange={handleStatusChange}
          onDownload={handleBulkDownload}
          selectedOrders={selectedOrders}
        />
      )}

      {/* Orders Display */}
      <Card className="overflow-hidden">
        {viewMode === 'table' ? (
          <OrdersTable
            orders={paginatedOrders}
            selectedOrders={selectedOrders}
            onSelectOrder={handleSelectOrder}
            onSelectAll={handleSelectAll}
            onViewOrder={handleViewOrder}
            onEditOrder={handleEditOrder}
            onBulkDownload={handleBulkDownload}
          />
        ) : (
          <OrdersGrid
            orders={paginatedOrders}
            selectedOrders={selectedOrders}
            onSelectOrder={handleSelectOrder}
            onViewOrder={handleViewOrder}
            onEditOrder={handleEditOrder}
            onBulkDownload={handleBulkDownload}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <OrdersPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            filteredOrdersLength={filteredOrders?.length || 0}
            onPageChange={setCurrentPage}
          />
        )}
      </Card>

      {/* Empty State */}
      {filteredOrders?.length === 0 && (
        <EmptyState searchTerm={searchTerm} statusFilter={statusFilter} />
      )}

      {/* Modals */}
      <OrdersModals
        showOrderDetails={showOrderDetails}
        showOrderEdit={showOrderEdit}
        showPdfModal={showPdfModal}
        currentOrder={currentOrder}
        pdfUrl={pdfUrl}
        onCloseDetails={() => {
          setShowOrderDetails(false);
          setCurrentOrder(null);
        }}
        onCloseEdit={() => {
          setShowOrderEdit(false);
          setCurrentOrder(null);
        }}
        onClosePdf={() => setShowPdfModal(false)}
        onEdit={() => {
          setShowOrderDetails(false);
          setShowOrderEdit(true);
        }}
        onSave={(updatedOrder) => {
          // This will be handled by the hook
          setShowOrderEdit(false);
          setCurrentOrder(null);
        }}
        setPdfUrl={setPdfUrl}
        setShowPdfModal={setShowPdfModal}
      />
    </div>
  );
}
