import { Branch, Order, SiteSettings, Category } from '../types';
import { Product } from '@/components/Boutique/types/product.types';

export const branches: Branch[] = [
  {
    id: '1',
    name: 'Downtown Store',
    location: 'New York, NY',
    manager: 'Sarah Johnson',
    status: 'active',
    productsCount: 150,
    revenue: 45000
  },
  {
    id: '2',
    name: 'Mall Branch',
    location: 'Los Angeles, CA',
    manager: 'Mike Chen',
    status: 'active',
    productsCount: 200,
    revenue: 62000
  },
  {
    id: '3',
    name: 'Warehouse Outlet',
    location: 'Chicago, IL',
    manager: 'Emily Davis',
    status: 'inactive',
    productsCount: 75,
    revenue: 28000
  }
];




export const categories: Category[] = [
  {
    id: '1',
    name: 'Robes',
    description: 'Collection élégante de robes pour toutes occasions',
    icon: '👗',
    color: '#da944a',
    status: 'active',
    productsCount: 45,
    slug: 'robes',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:20:00Z'
  },
  {
    id: '2',
    name: 'Blouses',
    description: 'Blouses modernes et confortables',
    icon: '👚',
    color: '#0f3a37',
    status: 'active',
    productsCount: 32,
    slug: 'blouses',
    createdAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '3',
    name: 'Pantalons',
    description: 'Pantalons chics et décontractés',
    icon: '👖',
    color: '#5f6e5f',
    status: 'active',
    productsCount: 28,
    slug: 'pantalons',
    createdAt: '2024-01-12T11:20:00Z',
    updatedAt: '2024-01-22T13:30:00Z'
  },
  {
    id: '4',
    name: 'Jupes',
    description: 'Jupes tendance pour un look féminin',
    icon: '🩱',
    color: '#c8a376',
    status: 'active',
    productsCount: 19,
    slug: 'jupes',
    createdAt: '2024-01-08T15:45:00Z',
    updatedAt: '2024-01-25T10:15:00Z'
  },
  {
    id: '5',
    name: 'Accessoires',
    description: 'Accessoires de mode pour compléter votre look',
    icon: '👜',
    color: '#d5e3ce',
    status: 'active',
    productsCount: 15,
    slug: 'accessoires',
    createdAt: '2024-01-05T12:00:00Z',
    updatedAt: '2024-01-28T09:30:00Z'
  },
  {
    id: '6',
    name: 'Chaussures',
    description: 'Chaussures élégantes et confortables',
    icon: '👠',
    color: '#0a1f1c',
    status: 'inactive',
    productsCount: 8,
    slug: 'chaussures',
    createdAt: '2024-01-03T14:30:00Z',
    updatedAt: '2024-01-30T11:45:00Z'
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    sku: 'WH-001',
    price: 199.99,
    stockQuantity: 45,
    category: 'Electronics',
    
    status: 'active',
    description: 'High-quality wireless headphones with noise cancellation.',
    images: ['/placeholder.jpg'],
    
    colors: ['black', 'silver'],
    sizes: ['one-size'],
    isNew: true,
    isSale: false,
    discount: 0
  },
  {
    id: '2',
    name: 'Smart Watch',
    sku: 'SW-002',
    price: 299.99,
    stockQuantity: 12,
    category: 'Electronics',
    
    status: 'active',
    description: 'Advanced smart watch with health tracking features.',
    images: ['/placeholder.jpg'],
    
    colors: ['black', 'rose-gold'],
    sizes: ['small', 'large'],
    isNew: false,
    isSale: true,
    discount: 10
  },
  {
    id: '3',
    name: 'Running Shoes',
    sku: 'RS-003',
    price: 89.99,
    stockQuantity: 0,
    category: 'Footwear',
    
    status: 'out-of-stock',
    description: 'Comfortable running shoes for daily use.',
    images: ['/placeholder.jpg'],
    
    colors: ['blue', 'red'],
    sizes: ['7', '8', '9', '10'],
    isNew: false,
    isSale: false,
    discount: 0
  },
  {
    id: '4',
    name: 'Coffee Maker',
    sku: 'CM-004',
    price: 149.99,
    stockQuantity: 23,
    category: 'Appliances',
    
    status: 'active',
    description: 'Automatic coffee maker with multiple brewing options.',
    images: ['/placeholder.jpg'],
    
    colors: ['white', 'black'],
    sizes: ['one-size'],
    isNew: true,
    isSale: false,
    discount: 0
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Smith',
    customerEmail: 'john@example.com',
    total: 399.98,
    status: 'processing',
    orderDate: '2024-01-15T10:30:00Z',
    branchId: '1',
    items: [
      { productId: '1', productName: 'Wireless Headphones', quantity: 2, price: 199.99 }
    ]
  },
  {
    id: 'ORD-002',
    customerName: 'Alice Johnson',
    customerEmail: 'alice@example.com',
    total: 299.99,
    status: 'shipped',
    orderDate: '2024-01-14T14:20:00Z',
    branchId: '1',
    items: [
      { productId: '2', productName: 'Smart Watch', quantity: 1, price: 299.99 }
    ]
  },
  {
    id: 'ORD-003',
    customerName: 'Bob Wilson',
    customerEmail: 'bob@example.com',
    total: 149.99,
    status: 'delivered',
    orderDate: '2024-01-13T09:15:00Z',
    branchId: '2',
    
    items: [
      { productId: '4', productName: 'Coffee Maker', quantity: 1, price: 149.99 }
    ]
  },
  {
    id: 'ORD-004',
    customerName: 'Emma Davis',
    customerEmail: 'emma@example.com',
    total: 89.99,
    status: 'pending',
    orderDate: '2024-01-16T16:45:00Z',
    branchId: '2',
    
    items: [
      { productId: '3', productName: 'Running Shoes', quantity: 1, price: 89.99 }
    ]
  }
];

export const siteSettings: SiteSettings = {
  storeName: 'TechMart Pro',
  storeDescription: 'Your one-stop shop for premium electronics and lifestyle products',
  contactEmail: 'info@techmartpro.com',
  contactPhone: '+1 (555) 123-4567',
  address: '123 Commerce Street, New York, NY 10001',
  currency: 'USD',
  timezone: 'America/New_York',
  emailNotifications: true,
  smsNotifications: false,
  maintenanceMode: false
};