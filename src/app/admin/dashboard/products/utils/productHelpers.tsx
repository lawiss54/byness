'use client';

import { CheckCircle, XCircle, AlertCircle, Package } from 'lucide-react';
import { Badge } from '@/components/shared/ui';

/**
 * Utility functions for product-related operations
 */

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'inactive': return <XCircle className="w-4 h-4 text-red-500" />;
    case 'out-of-stock': return <AlertCircle className="w-4 h-4 text-orange-500" />;
    default: return <Package className="w-4 h-4 text-gray-500" />;
  }
};

export const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active': return <Badge variant="success">Actif</Badge>;
    case 'inactive': return <Badge variant="error">Inactif</Badge>;
    case 'out-of-stock': return <Badge variant="warning">Rupture</Badge>;
    default: return <Badge variant="default">{status}</Badge>;
  }
};

export const formatPrice = (price: number): string => {
  return `${price?.toLocaleString()} DA`;
};

export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  if (!originalPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const isLowStock = (quantity: number, threshold: number = 5): boolean => {
  return quantity < threshold;
};
