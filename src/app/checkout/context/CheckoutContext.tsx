'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useCartTotals } from '@/app/panier/store/cart';

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  wilaya: string;
}

interface CheckoutContextType {
  shippingInfo: ShippingInfo;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo>>;
  shippingMethod: string;
  setShippingMethod: React.Dispatch<React.SetStateAction<string>>;
  giftWrap: boolean;
  setGiftWrap: React.Dispatch<React.SetStateAction<boolean>>;
  promoCode: string;
  setPromoCode: React.Dispatch<React.SetStateAction<string>>;
  appliedPromo: string | null;
  applyPromoCode: () => void;
  removePromo: () => void;
  // Calculated values
  shippingCost: number;
  giftWrapCost: number;
  promoDiscount: number;
  total: number;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const useCheckout = () => {
  const context = useContext(CheckoutContext);
  if (!context) throw new Error("useCheckout must be used within a CheckoutProvider");
  return context;
};

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { subtotal } = useCartTotals();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '', lastName: '', phone: '', address: '', city: '', wilaya: ''
  });
  const [shippingMethod, setShippingMethod] = useState("bureau");
  const [giftWrap, setGiftWrap] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // In a real app, shipping costs might come from an API
  const shippingCost = shippingMethod === 'bureau' ? 500 : 800;
  const giftWrapCost = giftWrap ? 300 : 0;

  const applyPromoCode = () => {
    // In a real app, you'd validate this against an API
    if (promoCode.toLowerCase() === 'welcome10') {
      setAppliedPromo(promoCode);
      setPromoCode('');
    } else {
      // Optional: Add feedback for invalid promo code
      console.log("Invalid promo code");
    }
  };

  const removePromo = () => setAppliedPromo(null);

  const promoDiscount = useMemo(() => {
    return appliedPromo ? Math.floor(subtotal * 0.1) : 0;
  }, [appliedPromo, subtotal]);

  const total = useMemo(() => {
    return subtotal + shippingCost + giftWrapCost - promoDiscount;
  }, [subtotal, shippingCost, giftWrapCost, promoDiscount]);

  const value: CheckoutContextType = {
    shippingInfo,
    setShippingInfo,
    shippingMethod,
    setShippingMethod,
    giftWrap,
    setGiftWrap,
    promoCode,
    setPromoCode,
    appliedPromo,
    applyPromoCode,
    removePromo,
    shippingCost,
    giftWrapCost,
    promoDiscount,
    total
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};
