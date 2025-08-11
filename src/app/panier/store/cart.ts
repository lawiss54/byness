'use client';

import { create } from 'zustand';
import { useMemo } from 'react';

// تعريف CartItem بالشكل المطلوب
export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  colors?: string[];
  color: string;
  colorName: string | null;
  sizes?: string[];
  size: string;
  slug: string;
  badge?: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  quantity: number;
  category: string;
}

interface CartState {
  items: CartItem[];
  isInitialized: boolean;
  actions: {
    initializeCart: () => Promise<void>;
    addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
    updateQuantity: (itemId: string, newQuantity: number) => void;
    removeItem: (itemId: string) => void;
    clearCart: () => void;
  };
}

// مزامنة السلة مع الباك إند
const syncCartWithBackend = async (items: CartItem[]) => {
  try {
    const syncData = items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      originalPrice: item.originalPrice,
      image: item.image,
      images: item.images,
      colors: item.colors,
      color: item.color,
      colorName: item.colorName,
      sizes: item.sizes,
      slug: item.slug,
      badge: item.badge,
      isNew: item.isNew,
      isSale: item.isSale,
      discount: item.discount,
      size: item.size,
      quantity: item.quantity,
      category: item.category
    }));

    await fetch('/api/cart', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: syncData }),
    });
  } catch (err) {
    console.error('Failed to sync cart with backend', err);
  }
};

const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isInitialized: false,
  actions: {
    initializeCart: async () => {
      if (get().isInitialized) return;
      try {
        const res = await fetch('/api/cart');
        if (!res.ok) throw new Error('Failed to fetch cart');
        const data = await res.json();

        // إعادة بناء العناصر القادمة من الباك إند لتكون مطابقة لـ CartItem
        const fetchedItems: CartItem[] = (data.data.items || []).map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice,
          image: item.image,
          images: item.images || [],
          colors: item.colors || [],
          color: item.color,
          colorName: item.colorName || null,
          sizes: item.sizes || [],
          slug: item.slug,
          badge: item.badge,
          isNew: item.isNew,
          isSale: item.isSale,
          discount: item.discount,
          size: item.size,
          quantity: item.quantity,
          category: item.category
        }));

        set({ items: fetchedItems, isInitialized: true });
      } catch (err) {
        console.error('Failed to initialize cart from backend', err);
        set({ isInitialized: true });
      }
    },

    addToCart: (item) => {
      set(state => {
        const existingItem = state.items.find(i =>
          i.id === item.id &&
          i.color === item.color &&
          i.size === item.size
        );

        let newItems;
        if (existingItem) {
          newItems = state.items.map(i =>
            i.id === item.id && i.color === item.color && i.size === item.size
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          );
        } else {
          newItems = [...state.items, { ...item, quantity: item.quantity || 1 }];
        }

        syncCartWithBackend(newItems);
        return { items: newItems };
      });
    },

    updateQuantity: (itemId, newQuantity) => {
      set(state => {
        const newItems = newQuantity <= 0
          ? state.items.filter(i => i.id !== itemId)
          : state.items.map(i => (i.id === itemId ? { ...i, quantity: newQuantity } : i));

        syncCartWithBackend(newItems);
        return { items: newItems };
      });
    },

    removeItem: (itemId) => {
      set(state => {
        const newItems = state.items.filter(i => i.id !== itemId);
        syncCartWithBackend(newItems);
        return { items: newItems };
      });
    },

    clearCart: () => {
      set({ items: [] });
      syncCartWithBackend([]);
    },
  }
}));

// Selectors
export const useCartItems = () => useCartStore(state => state.items);
export const useCartActions = () => useCartStore(state => state.actions);
export const useIsCartInitialized = () => useCartStore(state => state.isInitialized);

// حساب المجموعات باستخدام useMemo
export const useCartTotals = () => {
  const items = useCartItems();

  return useMemo(() => {
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const originalTotal = items.reduce((sum, i) => sum + (i.originalPrice || i.price) * i.quantity, 0);
    const savings = originalTotal - subtotal;
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

    return { subtotal, originalTotal, savings, itemCount };
  }, [items]);
};