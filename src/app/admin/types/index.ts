export interface Branch {
  id: string;
  name: string;
  location: string;
  manager: string;
  status: 'active' | 'inactive';
  productsCount: number;
  revenue: number;
}



export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images?: string[];
  badge?: string;
  colors?: string[];
  sizes?: string[];
  category: string;
  features?: string[];
  stockQuantity: number;
  status: 'active' | 'inactive' | 'out-of-stock';
  slug?: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  status: 'active' | 'inactive';
  productsCount: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
  value?: string;
  label?: string;
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