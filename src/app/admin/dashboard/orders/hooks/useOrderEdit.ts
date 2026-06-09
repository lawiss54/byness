'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useShippingData } from '@/hooks/useShippingData';
import { getProducts } from '@/app/admin/dashboard/services';
import { orderEditService } from '../services/orderEditService';
import { 
  orderEditSchema, 
  type OrderEditFormData,
  type WilayaData 
} from '../types/orderEdit';
import {
  transformOrderForEdit,
  calculateOrderTotal,
  calculateSubtotal,
  findWilayaById,
  findDeskById,
  calculateShippingPrice
} from '../utils/orderEditUtils';

export function useOrderEdit(
  order: any,
  onSave: (updatedOrder: any) => void,
  setPdfUrl: (url: string) => void,
  setShowPdfModal: (show: boolean) => void
) {
  // External hooks
  const { data: shippingData, loading } = useShippingData();
  
  // State for products
  const [activeProducts, setActiveProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Local state
  const [selectedWilayaId, setSelectedWilayaId] = useState(order.wilaya || "");
  const [openAddProductModel, setOpenAddProductModel] = useState(false);
  const [currentShippingPrice, setCurrentShippingPrice] = useState(0);

  // Load products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        const products = await getProducts();
        setActiveProducts(products);
      } catch (error) {
        console.error('Error loading products:', error);
        toast.error('خطأ في تحميل المنتجات');
        setActiveProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Form setup
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrderEditFormData>({
    resolver: zodResolver(orderEditSchema),
    defaultValues: transformOrderForEdit(order),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Watched values
  const watchedItems = watch("items");
  const watchedShippingType = watch("shippingType");
  const watchedMunicipality = watch("municipality");
  const watchedIsFreeShipping = watch("isFreeShipping");
  const watchedDeskId = watch("deskId");
  const watchedStatus = watch("status");
  const needsExchange = watch("needsExchange");

  // Get wilaya name from data
  const getWilayaName = useMemo(() => {
    if (!shippingData || !selectedWilayaId) return "";
    const wilaya = findWilayaById(shippingData, selectedWilayaId);
    return wilaya?.name || "";
  }, [shippingData, selectedWilayaId]);

  // Get shipping info for selected wilaya
  const selectedWilayaShipping = useMemo(() => {
    if (!shippingData || !selectedWilayaId) return null;
    const wilaya = findWilayaById(shippingData, selectedWilayaId);
    return wilaya?.shipping || null;
  }, [shippingData, selectedWilayaId]);

  // Get available desks in selected wilaya
  const availableDesks = useMemo(() => {
    if (!shippingData || !selectedWilayaId) return [];
    const wilaya = findWilayaById(shippingData, selectedWilayaId);
    return wilaya?.centers || [];
  }, [shippingData, selectedWilayaId]);

  // Update wilaya name when selection changes
  useEffect(() => {
    if (getWilayaName) {
      setValue("wilaya", getWilayaName);
    }
  }, [getWilayaName, setValue]);

  // Update shipping price when relevant data changes
  useEffect(() => {
    const price = calculateShippingPrice(
      watchedShippingType,
      selectedWilayaShipping,
      watchedMunicipality,
      watchedDeskId,
      availableDesks
    );
    setCurrentShippingPrice(price);
  }, [
    selectedWilayaShipping,
    watchedMunicipality,
    watchedShippingType,
    watchedDeskId,
    availableDesks,
  ]);

  // Handlers
  const handleQuantityChange = useCallback((index: number, change: number) => {
    const currentQuantity = watchedItems[index]?.quantity || 1;
    const newQuantity = Math.max(1, currentQuantity + change);
    const updatedItems = [...watchedItems];
    updatedItems[index] = { ...updatedItems[index], quantity: newQuantity };
    setValue("items", updatedItems);
  }, [watchedItems, setValue]);

  const handleAddNewItem = useCallback(() => {
    setOpenAddProductModel(true);
  }, []);

  const handleRemoveItem = useCallback((index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  }, [fields.length, remove]);

  const handleWilayaChange = useCallback((value: string) => {
    setSelectedWilayaId(value);
    const wilaya = findWilayaById(shippingData, value);
    setValue("wilaya", wilaya?.name || "");
    setValue("municipality", "");
    setValue("deskId", "");
  }, [shippingData, setValue]);

  const handleShippingTypeChange = useCallback((value: string) => {
    setValue("shippingType", value as any);
    setValue("municipality", "");
    setValue("deskId", "");
  }, [setValue]);

  const calculateTotal = useCallback((isFreeShipping: boolean = false) => {
    return calculateOrderTotal(watchedItems, currentShippingPrice, isFreeShipping);
  }, [watchedItems, currentShippingPrice]);

  const getSubtotal = useCallback(() => {
    return calculateSubtotal(watchedItems);
  }, [watchedItems]);

  const handleFormSubmit = useCallback(async (data: OrderEditFormData) => {
    try {
      // Validate order data
      await orderEditService.validateOrderData(data);

      // Prepare order for submission
      const updatedOrder = await orderEditService.prepareOrderForSubmission(
        data,
        order,
        currentShippingPrice
      );

      // Submit the order
      const response = await orderEditService.updateOrder(updatedOrder);
      
      if (updatedOrder.status === "cancelled") {
        toast.success(response.message);
      } else {
        setPdfUrl(response.data || '');
        setShowPdfModal(true);
      }
      
      onSave(updatedOrder);
    } catch (error) {
      toast.error(error.message || 'Erreur lors de la mise à jour du statut');
    }
  }, [order, currentShippingPrice, setPdfUrl, setShowPdfModal, onSave]);

  const handleCloseProductModal = useCallback(() => {
    setOpenAddProductModel(false);
  }, []);

  return {
    // Form
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
    errors,
    isSubmitting,
    fields,
    append,

    // Watched values
    watchedItems,
    watchedShippingType,
    watchedMunicipality,
    watchedIsFreeShipping,
    watchedDeskId,
    watchedStatus,
    needsExchange,

    // Data
    shippingData,
    loading: loading || productsLoading,
    selectedWilayaId,
    selectedWilayaShipping,
    availableDesks,
    currentShippingPrice,
    activeProducts,

    // Modals
    openAddProductModel,
    handleCloseProductModal,

    // Handlers
    handleQuantityChange,
    handleAddNewItem,
    handleRemoveItem,
    handleWilayaChange,
    handleShippingTypeChange,
    setSelectedWilayaId,
    setValue,

    // Calculations
    calculateTotal,
    getSubtotal,
  };
}