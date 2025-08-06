'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Product, Category } from '@/app/admin/types';
import { toast } from 'react-toastify';
import { saveProductService } from '../services/form/productFormService';

const productSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  price: z.number().min(0, 'Le prix doit être positif'),
  original_price: z.number().optional(),
  category: z.string().min(1, 'Veuillez sélectionner une catégorie'),
  stockQuantity: z.number().min(0, 'Le stock doit être positif'),
  status: z.enum(['active', 'inactive']),
  badge: z.string().optional(),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  is_new: z.boolean().default(false),
  is_sale: z.boolean().default(false),
  discount: z.number().optional(),
  hero_section: z.boolean().default(false)
});

type ProductFormData = z.infer<typeof productSchema>;

/**
 * Hook for managing product form state and validation
 */
export function useProductForm(
  product: Product | null,
  onSave: (data: Partial<Product>) => void
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      original_price: product?.originalPrice || 0,
      category: product?.category || '',
      stockQuantity: product?.stockQuantity || 0,
      status: product?.status || 'active',
      badge: product?.badge || '',
      colors: product?.colors || [],
      sizes: product?.sizes || [],
      is_new: product?.isNew || false,
      is_sale: product?.isSale || false,
      discount: product?.discount || 0,
      hero_section: product?.hero_section || false
    }
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  // Watch for price changes to calculate discount
  const watchedPrice = watch('price');
  const watchedOriginalPrice = watch('original_price');
  const watchedIsSale = watch('is_sale');

  // Calculate discount percentage when prices change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (watchedOriginalPrice && watchedPrice && watchedOriginalPrice > watchedPrice) {
      const discount = ((watchedOriginalPrice - watchedPrice) / watchedOriginalPrice) * 100;
      setDiscountPercentage(Math.round(discount));
      setValue('discount', Math.round(discount));
      setValue('is_sale', true);
    } else {
      setDiscountPercentage(0);
      setValue('discount', 0);
      if (!watchedIsSale) {
        setValue('is_sale', false);
      }
    }
  }, [watchedPrice, watchedOriginalPrice, watchedIsSale, setValue]);

  // Handle price change and set original price
  const handlePriceChange = useCallback((newPrice: number) => {
    if (product && product.price !== newPrice && !watchedOriginalPrice) {
      setValue('original_price', product.price);
    }
  }, [product, watchedOriginalPrice, setValue]);

  const onSubmit = useCallback(async (data: ProductFormData, images: string[], colors: string[], sizes: string[]) => {
    setIsSubmitting(true);
    const productData = {
      ...data,
      images,
      colors,
      sizes,
      slug: data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    };

    try {
      const url = product ? `/api/products/${product?.slug}` : '/api/products';
      const method = product ? "PUT" : "POST";
      
      await saveProductService(url, method, productData);
      onSave(productData);
      toast.success(product ? "Produit mis à jour avec succès" : "Produit créé avec succès");
    } catch (error: any) {
      if (error.status === 422) {
        toast.error("Veuillez choisir un autre nom de produit, celui-ci existe déjà");
      } else {
        toast.error("Une erreur s'est produite lors de la sauvegarde");
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [product, onSave]);

  return {
    register,
    handleSubmit,
    errors,
    setValue,
    isSubmitting,
    discountPercentage,
    handlePriceChange,
    onSubmit
  };
}
