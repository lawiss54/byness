'use client';

import { Category, Product } from '@/components/Boutique/types/product.types';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { categories } from './../app/boutique/api';
import { toast } from 'react-toastify';



interface ApiContextType {
  activeProduct: () => void;
  activeCategory: () => void;
  similerProductsFinder: (category: string) => void;

  setLoading: (status: boolean) => void;
  loading: boolean;
  fatchRessorce: () => void;

  



}

const apiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = () => {
  const context = useContext(apiContext);
  if (!context) throw new Error('useApi must be used within a ApiProvider');
  return context;
};

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [IsFetched, setIsFetched] = useState(false)

  async function fatchRessorce() {
    if (IsFetched) return;

    setLoading(true);
    
    try {
      const [resCategory, resProducts] = await Promise.all([
        fetch('/api/Category'),
        fetch('/api/products')
      ]);
      const dataCategory = await resCategory.json();
      const dataProducts = await resProducts.json();
      setCategories(dataCategory.map(transformCategory));
      setProducts(dataProducts.data.map(transformProduct));
      setIsFetched(true);
    } catch (error) {
      console.error(error)
      setIsFetched(false);
    } finally {
      setLoading(false)
    }
  }

  function transformProduct(raw): Product {
    return {
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
    };
  }
  function transformCategory(raw): Category {
    return {
      id: raw.id,
      name: raw.name,
      slug: raw.slug,
      description: raw.description,
      icon: raw.icon,
      color: raw.color,
      status: raw.status,
      productsCount: raw.productsCount,
    };
  }

  const activeProduct = () => {
    return products.filter(products => products?.status === "active")
  }
  const activeCategory = () => {
    return categories.filter(categories => categories?.status === "active")
  }

  const similerProductsFinder = ( categorie: string) => { 
    return products.filter(products => products?.category === categorie);
  }

  





  const value: ApiContextType = {
    activeCategory,
    activeProduct,
    setLoading,
    loading,
    fatchRessorce,
    similerProductsFinder
 

  };

  return <apiContext.Provider value={value}>{children}</apiContext.Provider>;
};