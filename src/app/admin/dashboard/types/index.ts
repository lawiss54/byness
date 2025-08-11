export interface Branch {
  id: string;
  name: string;
  location: string;
  manager: string;
  status: 'active' | 'inactive';
  productsCount: number;
  revenue: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  items: OrderItem[];
  branchId: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface SiteSettings {
  storeName: string;
  storeDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  currency: string;
  timezone: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
  maintenanceMode: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  badge: string;
  colors: string[];
  sizes: string[];
  category: string;
  stockQuantity: number;
  isNew: boolean;
  isSale: boolean;
  discount: number;
  status: 'active' | 'inactive';
  heroSection: boolean;
  quantity?: number;
  colorName?: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  status: string
  productsCount?: number;
  id?: string;
}