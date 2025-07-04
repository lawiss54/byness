'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  category: string;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  wilaya: string;
}

interface UnifiedCartContextType {
  // Cart Management
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  moveToWishlist: (id: string) => void;
  
  // Checkout Information
  shippingInfo: ShippingInfo;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo>>;
  shippingMethod: string;
  setShippingMethod: React.Dispatch<React.SetStateAction<string>>;
  giftWrap: boolean;
  setGiftWrap: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Promo Code Management
  promoCode: string;
  setPromoCode: React.Dispatch<React.SetStateAction<string>>;
  appliedPromo: string | null;
  setAppliedPromo: React.Dispatch<React.SetStateAction<string | null>>;
  applyPromoCode: () => void;
  removePromo: () => void;
  
  // Calculations
  subtotal: number;
  originalTotal: number;
  savings: number;
  shippingCost: number;
  giftWrapCost: number;
  promoDiscount: number;
  total: number;
  itemCount: number;
}

const UnifiedCartContext = createContext<UnifiedCartContextType | undefined>(undefined);

export const useUnifiedCart = () => {
  const context = useContext(UnifiedCartContext);
  if (!context) {
    throw new Error('useUnifiedCart must be used within a UnifiedCartProvider');
  }
  return context;
};

export const UnifiedCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Cart Items State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Robe Élégante Automne',
      price: 15900,
      originalPrice: 19900,
      image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'Noir',
      size: 'M',
      quantity: 1,
      category: 'Robes'
    },
    {
      id: '2',
      name: 'Blazer Signature',
      price: 22500,
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'Camel',
      size: 'L',
      quantity: 2,
      category: 'Vestes'
    },
    {
      id: '3',
      name: 'Pantalon Tailleur',
      price: 12900,
      originalPrice: 16900,
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'Sage',
      size: 'M',
      quantity: 1,
      category: 'Pantalons'
    }
  ]);

  // Shipping Information State
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    wilaya: ''
  });

  // Checkout Options State
  const [shippingMethod, setShippingMethod] = useState('bureau');
  const [giftWrap, setGiftWrap] = useState(false);

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Cart Management Functions
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const moveToWishlist = (id: string) => {
    // Logic to move item to wishlist
    removeItem(id);
  };

  // Promo Code Functions
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setAppliedPromo(promoCode);
      setPromoCode('');
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const savings = originalTotal - subtotal;
  const shippingCost = shippingMethod === 'bureau' ? 500 :  800;
  const giftWrapCost = giftWrap ? 300 : 0;
  const promoDiscount = appliedPromo ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal + shippingCost + giftWrapCost - promoDiscount;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    // Cart Management
    cartItems,
    setCartItems,
    updateQuantity,
    removeItem,
    clearCart,
    moveToWishlist,
    
    // Checkout Information
    shippingInfo,
    setShippingInfo,
    shippingMethod,
    setShippingMethod,
    giftWrap,
    setGiftWrap,
    
    // Promo Code Management
    promoCode,
    setPromoCode,
    appliedPromo,
    setAppliedPromo,
    applyPromoCode,
    removePromo,
    
    // Calculations
    subtotal,
    originalTotal,
    savings,
    shippingCost,
    giftWrapCost,
    promoDiscount,
    total,
    itemCount
  };

  return (
    <UnifiedCartContext.Provider value={value}>
      {children}
    </UnifiedCartContext.Provider>
  );
};