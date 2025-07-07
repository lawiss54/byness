'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../Boutique/types/product.types';

interface CartItem extends Omit<Product, 'description' | 'features' | 'stockQuantity' | 'sku' | 'status' | 'heroSection'> {
  quantity: number;
  color?: string;
  colorName?: string;
  size?: string;
}

interface CartContextType {
  // Cart
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  addToCart: (product: CartItem) => void;
  isProductInCart: (product: Product) => boolean;

  // Totals
  subtotal: number;
  originalTotal: number;
  savings: number;
  shippingCost: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addToCart = (product: CartItem) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
      );

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += product.quantity || 1;
        return updated;
      }

      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const isProductInCart = (product: Product): boolean => {
    return cartItems.some(item => item.id === product.id);
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const savings = originalTotal - subtotal;
  const shippingCost = 300; // Default shipping cost
  const total = subtotal + shippingCost;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    cartItems,
    setCartItems,
    updateQuantity,
    removeItem,
    clearCart,
    addToCart,
    isProductInCart,
    subtotal,
    originalTotal,
    savings,
    shippingCost,
    total,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};