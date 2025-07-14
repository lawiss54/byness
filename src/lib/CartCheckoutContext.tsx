'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartCheckoutContextType, CartItem, ShippingInfo } from './CartCheckoutContextType';

// إنشاء Context جديد لتخزين وإدارة حالة السلة وبيانات الدفع
const CartCheckoutContext = createContext<CartCheckoutContextType | undefined>(undefined);

// هوك مخصص لاستخدام هذا الكونتكست في أي مكون
export const useCartCheckout = () => {
  const context = useContext(CartCheckoutContext);
  if (!context) throw new Error("Must use within <CartCheckoutProvider>");
  return context;
};

// مزود السياق (Context Provider) الذي يلف تطبيقك أو جزء معين منه
export const CartCheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // الحالة الأولية لعناصر السلة
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // معلومات الشحن الأولية
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '', lastName: '', phone: '', address: '', city: '', wilaya: ''
  });

  // خيارات الشحن والتغليف
  const [shippingMethod, setShippingMethod] = useState("bureau");
  const [giftWrap, setGiftWrap] = useState(false);

  // كود الخصم والحالة المطبقة
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [shippingCost, setShippingCost] = useState(0);

  // تحميل السلة من الخادم عند التحميل الأولي للصفحة
  useEffect(() => {
    fetch('/api/cart')
      .then(res => res.json())
      .then(data => setCartItems(data.data.items || []))
      .catch(err => console.error('Failed to load cart', err));
  }, []);

  // دالة لمزامنة التحديثات مع الخادم
  const syncCartWithBackend = async (updatedItems: CartItem[]) => {
    try {
      
      // إرسال التحديثات إلى الخادم 
      await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updatedItems })
      });
    } catch (err) {
      console.error('Sync failed', err);
    }
  };

  // إضافة منتج إلى السلة مع التحقق إن كان موجود مسبقاً
  const addToCart = (item: CartItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.color === item.color && i.size === item.size);
      const updated = existing
        ? prev.map(i => i.id === item.id && i.color === item.color && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i)
        : [...prev, item];
      syncCartWithBackend(updated);
      return updated;
    });
  };

  // تعديل الكمية
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(prev => {
      const updated = quantity <= 0 ? prev.filter(i => i.id !== id) : prev.map(i => i.id === id ? { ...i, quantity } : i);
      syncCartWithBackend(updated);
      return updated;
    });
  };

  // حذف منتج من السلة
  const removeItem = (id: string) => {
    setCartItems(prev => {
      const updated = prev.filter(i => i.id !== id);
      syncCartWithBackend(updated);
      return updated;
    });
  };

  // تفريغ السلة
  const clearCart = () => {
    setCartItems([]);
    syncCartWithBackend([]);
  };

  // تطبيق كود الخصم
  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'welcome10') {
      setAppliedPromo(promoCode);
      setPromoCode('');
    }
  };

  // إلغاء كود الخصم
  const removePromo = () => setAppliedPromo(null);

  // الحسابات
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const originalTotal = cartItems.reduce((sum, i) => sum + (i.originalPrice || i.price) * i.quantity, 0);
  const savings = originalTotal - subtotal;
  
  const giftWrapCost = giftWrap ? 300 : 0;
  const promoDiscount = appliedPromo ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal + shippingCost + giftWrapCost - promoDiscount;
  const itemCount = cartItems.length;

  return (
    <CartCheckoutContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        shippingInfo,
        setShippingInfo,
        shippingMethod,
        setShippingMethod,
        giftWrap,
        setGiftWrap,
        promoCode,
        setPromoCode,
        appliedPromo,
        setAppliedPromo,
        applyPromoCode,
        removePromo,
        subtotal,
        total,
        originalTotal,
        savings,
        itemCount,
        setShippingCost,
        shippingCost,
        giftWrapCost,
        promoDiscount,
      }}
    >
      {children}
    </CartCheckoutContext.Provider>
  );
};
