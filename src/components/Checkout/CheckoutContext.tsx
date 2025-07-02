'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
}

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

interface CheckoutContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
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
  updateQuantity: (id: string, newQuantity: number) => void;
  applyPromoCode: () => void;
  removePromo: () => void;
  subtotal: number;
  originalTotal: number;
  savings: number;
  shippingCost: number;
  giftWrapCost: number;
  promoDiscount: number;
  total: number;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckout must be used within a CheckoutProvider');
  }
  return context;
};

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Robe Élégante Automne',
      price: 15900,
      originalPrice: 19900,
      image: 'https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'Noir',
      size: 'M',
      quantity: 1
    },
    {
      id: '2',
      name: 'Blazer Signature',
      price: 22500,
      image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=400',
      color: 'Camel',
      size: 'L',
      quantity: 2
    }
  ]);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    wilaya: ''
  });

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState('bureau');
  const [paymentMethod, setPaymentMethod] = useState('cod');


  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
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

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + ((item.originalPrice || item.price) * item.quantity), 0);
  const savings = originalTotal - subtotal;
  const shippingCost = shippingMethod === 'bureau' ? 300 : 800;
  const promoDiscount = appliedPromo ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal + shippingCost - promoDiscount;

  const value = {
    cartItems,
    setCartItems,
    shippingInfo,
    setShippingInfo,
    promoCode,
    setPromoCode,
    appliedPromo,
    setAppliedPromo,
    shippingMethod,
    setShippingMethod,
    paymentMethod,
    setPaymentMethod,
    updateQuantity,
    applyPromoCode,
    removePromo,
    subtotal,
    originalTotal,
    savings,
    shippingCost,
    promoDiscount,
    total
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};