'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'react-toastify';
import { ordersService } from '../services/ordersService';
import { calculateOrderStats } from '../utils/orderUtils';
import type { Order, OrderStatus, ViewMode } from '../types/orders';

interface UseOrdersManagementProps {
  initialOrders?: Order[];
}

export function useOrdersManagement({ initialOrders = [] }: UseOrdersManagementProps) {
  // State Management
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showOrderEdit, setShowOrderEdit] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [showPdfModal, setShowPdfModal] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ordersService.fetchOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Erreur lors du chargement des orders');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filtered and paginated orders
  const filteredOrders = useMemo(() => {
    return orders?.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone?.includes(searchTerm);
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const totalPages = Math.ceil((filteredOrders?.length || 0) / itemsPerPage);

  // Statistics
  const stats = useMemo(() => {
    return calculateOrderStats(orders);
  }, [orders]);

  // Handlers
  const handleSelectOrder = useCallback((orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedOrders.length === paginatedOrders?.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders?.map(o => o.id) || []);
    }
  }, [selectedOrders.length, paginatedOrders]);

  const handleViewOrder = useCallback((order) => {
    setCurrentOrder(order);
    setShowOrderDetails(true);
  }, []);

  const handleEditOrder = useCallback((order) => {
    setCurrentOrder(order);
    setShowOrderEdit(true);
  }, []);

  const handleStatusChange = useCallback(async (orderIds: string[], newStatus: string) => {
    try {
      const response = await ordersService.changeOrderStatus(orderIds, newStatus);
      
      // Update local state
      setOrders(prev => prev.map(order =>
        orderIds.includes(order.id)
          ? { ...order, status: newStatus, trackingNumber: newStatus === 'shipped' ? `TRK${Date.now()}` : order.trackingNumber }
          : order
      ));

      toast.success('Statut mis à jour avec succès');
      
      if (newStatus === 'confirmed') {
        setPdfUrl(response.data || '');
        setShowPdfModal(true);
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut');
    }
    
    setSelectedOrders([]);
  }, []);

  const handleBulkDownload = useCallback(async (orderIds: string[]) => {
    try {
      await ordersService.downloadOrdersPDF(orderIds);
    } catch (error) {
      toast.error("Échec d'exportation");
    }
  }, []);

  const handleOrderSave = useCallback((updatedOrder: Order) => {
    setOrders(prev => prev.map(o =>
      o.id === updatedOrder.id ? updatedOrder : o
    ));
  }, []);

  return {
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
    handleOrderSave,
    
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
  };
}
