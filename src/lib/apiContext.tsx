'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { Category, Product } from '@/components/boutique/types/product.types';
import { getCache, setCache, delCache } from '@/lib/cache';

interface ApiContextType {
  activeProduct: () => Product[];
  activeCategory: () => Category[];
  similerProductsFinder: (category: string) => Product[];
  setLoading: (status: boolean) => void;
  loading: boolean;
  fetchResource: () => void;
  fetchContent: () => void;
  fetchOrders: () => void;
  orders: any[];
  products: Product[];
  contant: any[];
}

const apiContext = createContext<ApiContextType | undefined>(undefined);
export const useApi = () => {
  const context = useContext(apiContext);
  if (!context) throw new Error('useApi must be used within a ApiProvider');
  return context;
};

const TTL = 60 * 5; // 5 دقائق

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [contant, setContant] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  async function fetchContent() {
    const cachedData = getCache("contant");
    if (cachedData) {
      setContant(cachedData);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/contant');
      if (!res.ok) {
        toast.error('Erreur lors du chargement des données de contenu');
        return;
      }

      const { data } = await res.json();

      const animationTypes = ["bounceIn", "slideInLeft", "fadeInUp"];
      const getRandomAnimation = () => animationTypes[Math.floor(Math.random() * animationTypes.length)];

      const transformed = data
        .map((raw) => ({
          badge: raw.badge,
          mainTitle: raw.main_title,
          title: raw.title,
          description: raw.description,
          buttonText: raw.button_text,
          buttonLink: raw.button_link,
          image: raw.image,
          order: raw.order,
          status: raw.is_active,
          animationType: getRandomAnimation(),
        }))
        .filter(item => item.status === true);

      setCache("contant", transformed, TTL);
      setContant(transformed);

    } catch (err) {
      console.error('Erreur fetchContent:', err);
    } finally {
      setLoading(false);
    }
  }

  const fetchOrders = async () => {
    const cachedOrders = getCache("orders");
    if (cachedOrders) {
      setOrders(cachedOrders);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      if (!res.ok) {
        toast.error('Erreur lors du chargement des commandes');
        return;
      }

      const data = await res.json();
      const transformed = data.data.map(transformOrder);

      setCache("orders", transformed, TTL);
      setOrders(transformed);

    } catch (err) {
      console.error('Erreur fetchOrders:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchResource = async () => {
    if (isFetched) return;

    const cachedCategories = getCache("categories");
    const cachedProducts = getCache("products");

    if (cachedCategories && cachedProducts) {
      setCategories(cachedCategories);
      setProducts(cachedProducts);
      setIsFetched(true);
      return;
    }

    try {
      setLoading(true);

      const [resCategory, resProducts] = await Promise.all([
        fetch('/api/Category'),
        fetch('/api/products'),
      ]);

      const categoryData = await resCategory.json();
      const productData = await resProducts.json();

      const transformedCategories = categoryData.map(transformCategory);
      const transformedProducts = productData.data.map(transformProduct);

      setCache("categories", transformedCategories, TTL);
      setCache("products", transformedProducts, TTL);

      setCategories(transformedCategories);
      setProducts(transformedProducts);
      setIsFetched(true);
    } catch (error) {
      console.error('Erreur lors du chargement des ressources:', error);
    } finally {
      setLoading(false);
    }
  };

  // دوال المسح من الكاش (ممكن تستعملها بعد أي تعديل)
  const clearProductsCache = () => delCache("products");
  const clearCategoriesCache = () => delCache("categories");
  const clearOrdersCache = () => delCache("orders");
  const clearContentCache = () => delCache("contant");

  // Transform helpers
  const transformProduct = (raw): Product => ({
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    description: raw.description,
    price: parseFloat(raw.price),
    originalPrice: parseFloat(raw.original_price),
    images: raw.images?.map((img: any) => img.image_path) || [],
    badge: raw.badge || undefined,
    colors: raw.colors?.map((color: any) => color.hex_code) || [],
    sizes: raw.sizes?.map((size: any) => size.name) || [],
    category: raw.category?.name || 'Inconnu',
    stockQuantity: raw.stock_quantity,
    isNew: raw.is_new,
    isSale: raw.is_sale,
    discount: raw.discount ? parseFloat(raw.discount) : 0,
    status: raw.status,
    heroSection: raw.hero_section
  });

  const transformCategory = (raw): Category => ({
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description,
    icon: raw.icon,
    color: raw.color,
    status: raw.status,
    productsCount: raw.productsCount,
  });

  const transformOrder = (raw) => ({
    id: raw.order_number,
    customer_first_name: raw.customer_first_name,
    customer_last_name: raw.customer_last_name,
    customerPhone: raw.customer_phone,
    shippingType: raw.shipping_type,
    customerAddress: raw.shipping_address,
    municipality: raw.city,
    wilaya: raw.wilaya,
    status: raw.status,
    total: raw.total,
    orderDate: raw.created_at,
    items: Array.isArray(raw.items) ? raw.items.map(item => ({
      id: item.product_id,
      name: item.product_name,
      quantity: item.quantity,
      price: item.price,
      color: item.color,
      size: item.size,
      image: item.product_img
    })) : [],
  });

  const activeProduct = () => products.filter(p => p.status === "active");
  const activeCategory = () => categories.filter(c => c.status === "active");
  const similerProductsFinder = (category: string) => products.filter(p => p.category === category);

  const value: ApiContextType = {
    activeProduct,
    activeCategory,
    similerProductsFinder,
    setLoading,
    loading,
    fetchResource,
    fetchOrders,
    products,
    contant,
    orders,
    fetchContent
  };

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
};