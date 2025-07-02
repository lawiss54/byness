'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../Boutique/types/product.types';



interface ShippingInfo {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  wilaya: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

interface CartContextType {
  // Cart
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  moveToWishlist: (id: string) => void;

  // Checkout-related
  shippingInfo: ShippingInfo;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo>>;
  paymentInfo: PaymentInfo;
  setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo>>;
  promoCode: string;
  setPromoCode: React.Dispatch<React.SetStateAction<string>>;
  appliedPromo: string | null;
  setAppliedPromo: React.Dispatch<React.SetStateAction<string | null>>;
  shippingMethod: string;
  setShippingMethod: React.Dispatch<React.SetStateAction<string>>;
  paymentMethod: string;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  giftWrap: boolean;
  setGiftWrap: React.Dispatch<React.SetStateAction<boolean>>;
  newsletter: boolean;
  setNewsletter: React.Dispatch<React.SetStateAction<boolean>>;
  applyPromoCode: () => void;
  removePromo: () => void;
  addToCart: (product: Product) => void;

  // Totals
  subtotal: number;
  originalTotal: number;
  savings: number;
  shippingCost: number;
  giftWrapCost: number;
  promoDiscount: number;
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
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    wilaya: '',
  });
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState('bureau');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [giftWrap, setGiftWrap] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

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
      // البحث عن نفس المنتج بنفس اللون والحجم
      const existingIndex = prev.findIndex(
        item =>
          item.id === product.id &&
          item.color === product.color &&
          item.size === product.size
      );

      // إذا كان موجود => نزيد الكمية
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += product.quantity || 1;
        return updated;
      }

      // إذا غير موجود => نضيفه بكمية 1 (أو الموجودة)
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };


 

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setAppliedPromo(promoCode);
      setPromoCode('');
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const originalTotal = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const savings = originalTotal - subtotal;
  const shippingCost = shippingMethod === 'bureau' ? 300 : 800;
  const giftWrapCost = giftWrap ? 200 : 0;
  const promoDiscount = appliedPromo ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal + shippingCost + giftWrapCost - promoDiscount;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextType = {
    cartItems,
    setCartItems,
    updateQuantity,
    removeItem,
    clearCart,
    shippingInfo,
    setShippingInfo,
    paymentInfo,
    setPaymentInfo,
    promoCode,
    setPromoCode,
    appliedPromo,
    setAppliedPromo,
    shippingMethod,
    setShippingMethod,
    paymentMethod,
    setPaymentMethod,
    giftWrap,
    setGiftWrap,
    newsletter,
    setNewsletter,
    applyPromoCode,
    removePromo,
    subtotal,
    originalTotal,
    savings,
    shippingCost,
    giftWrapCost,
    promoDiscount,
    total,
    itemCount,
    addToCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
