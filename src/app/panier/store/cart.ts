import { create } from 'zustand';
import { Product } from '@/app/boutique/types'; // Using the unified Product type

// The CartItem type might be slightly different from the Product type
// e.g., it includes quantity and selected color/size.
export interface CartItem extends Omit<Product, 'quantity'> {
  quantity: number;
  // It's better to store selected variants directly on the cart item
  selectedColor?: string | null;
  selectedSize?: string | null;
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

const syncCartWithBackend = async (items: CartItem[]) => {
  try {
    // We only need to send the essential data to the backend
    const syncData = items.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      color: item.selectedColor,
      size: item.selectedSize,
    }));
    await fetch('/api/cart', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: syncData }),
    });
  } catch (err) {
    console.error('Failed to sync cart with backend', err);
    // Here you might want to add some user feedback, e.g., a toast notification
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
        // The data from the backend needs to be transformed to match our CartItem structure
        // This is an assumption about the API response structure.
        const fetchedItems = data.data.items || [];
        set({ items: fetchedItems, isInitialized: true });
      } catch (err) {
        console.error('Failed to initialize cart from backend', err);
        set({ isInitialized: true }); // Mark as initialized even on error to prevent refetching
      }
    },
    addToCart: (item) => {
      set(state => {
        const existingItem = state.items.find(i =>
          i.id === item.id &&
          i.selectedColor === item.selectedColor &&
          i.selectedSize === item.selectedSize
        );
        let newItems;
        if (existingItem) {
          newItems = state.items.map(i =>
            i.id === item.id && i.selectedColor === item.selectedColor && i.selectedSize === item.selectedSize
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

// Selectors for computed values
export const useCartItems = () => useCartStore(state => state.items);
export const useCartActions = () => useCartStore(state => state.actions);
export const useIsCartInitialized = () => useCartStore(state => state.isInitialized);

export const useCartTotals = () => {
  return useCartStore(state => {
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const originalTotal = state.items.reduce((sum, i) => sum + (i.originalPrice || i.price) * i.quantity, 0);
    const savings = originalTotal - subtotal;
    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    return { subtotal, originalTotal, savings, itemCount };
  });
};
