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
  slug: string;
  badge?: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  size: string;
  quantity: number;
  category: string;
}


export interface ShippingInfo {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  wilaya: string;
}

export interface CartCheckoutContextType {
  // 🛒 Cart
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  // 🚚 Shipping Info
  shippingInfo: ShippingInfo;
  setShippingInfo: React.Dispatch<React.SetStateAction<ShippingInfo>>;
  shippingMethod: string;
  setShippingMethod: React.Dispatch<React.SetStateAction<string>>;
  giftWrap: boolean;
  setGiftWrap: React.Dispatch<React.SetStateAction<boolean>>;

  // 🏷️ Promo Codes
  promoCode: string;
  setPromoCode: React.Dispatch<React.SetStateAction<string>>;
  appliedPromo: string | null;
  setAppliedPromo: React.Dispatch<React.SetStateAction<string | null>>;
  applyPromoCode: () => void;
  removePromo: () => void;

  // 💰 Calculations
  subtotal: number;
  total: number;
  originalTotal: number;
  savings: number;
  itemCount: number;
  setShippingCost: (cost: number) => void;
  shippingCost: number;
  giftWrapCost: number;
  promoDiscount: number;
}
