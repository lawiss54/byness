'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Plus, Minus, Save } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Select, Textarea, Card } from '@/components/shared/ui';
import type { Category, Product } from '@/app/admin/types';
import { Label } from '@/components/shared/ui/Label';

const productSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  price: z.number().min(0, 'Le prix doit être positif'),
  category: z.string().min(1, 'Veuillez sélectionner une catégorie'),
  stockQuantity: z.number().min(0, 'Le stock doit être positif'),
  status: z.enum(['active', 'inactive']),
  badge: z.string().optional(),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional()
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: Product | null;
  getCategories?: Category;
  onSave: (data: Partial<Product>) => void;
  onClose: () => void;
}


const statusOptions = [
  { value: 'active', label: 'Actif' },
  { value: 'inactive', label: 'Inactif' },
];

const predefinedColors = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
];

const predefinedSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

export default function ProductForm({getCategories, product, onSave, onClose }: ProductFormProps) {
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [colors, setColors] = useState<string[]>(product?.colors || []);
  const [sizes, setSizes] = useState<string[]>(product?.sizes || []);


  const categories = getCategories;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      category: product?.category || '',
      stockQuantity: product?.stockQuantity || 0,
      status: product?.status || 'active',
      badge: product?.badge || '',
      colors: product?.colors || [],
      sizes: product?.sizes || [],
    }
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleColor = (color: string) => {
    setColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const toggleSize = (size: string) => {
    setSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

 

  

  const onSubmit = (data: ProductFormData) => {
    const productData = {
      ...data,
      images,
      colors,
      sizes,
      slug: data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      isNew: false,
    };

    onSave(productData);
  };

  // Update form values when arrays change
  useEffect(() => {
    setValue('colors', colors);
    setValue('sizes', sizes);
  }, [colors, sizes, setValue]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {product ? 'Modifier le produit' : 'Nouveau produit'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            icon={<X className="w-5 h-5" />}
            onClick={onClose}
          />
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            {/* Basic Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de base</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Input
                    {...register('name')}
                    label="Nom du produit"
                    placeholder="Nom du produit"
                    error={errors.name?.message}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Textarea
                    {...register('description')}
                    label="Description"
                    placeholder="Description détaillée du produit"
                    rows={4}
                    error={errors.description?.message}
                    required
                  />
                </div>
                <Label className='block text-sm font-semibold text-brand-darkGreen-500'>Prix (Da)</Label>
                <Input
                  {...register('price', { valueAsNumber: true })}
                  type="number"
                  placeholder="0"
                  error={errors.price?.message}
                  required
                />

                <Select
                  {...register('category')}
                  label="Catégorie"
                  placeholder="Sélectionner une catégorie"
                  options={categories}
                  error={errors.category?.message}
                  required
                />

                <Select
                  {...register('status')}
                  label="Statut"
                  options={statusOptions}
                  error={errors.status?.message}
                  required
                />
                <Label className='block text-sm font-semibold text-brand-darkGreen-500'>Quantité en stock</Label>
                <Input
                  {...register('stockQuantity', { valueAsNumber: true })}
                  type="number"
                  label="Quantité en stock"
                  placeholder="0"
                  error={errors.stockQuantity?.message}
                  required
                />

                <Input
                  {...register('badge')}
                  label="Badge (optionnel)"
                  placeholder="Nouveau, Promo, etc."
                  error={errors.badge?.message}
                />
              </div>
            </Card>

            {/* Images */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Images</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Ajouter des images</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  <span className="text-sm text-gray-500">
                    Formats acceptés: JPG, PNG, WebP | Size: 10 MB
                  </span>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Colors */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Couleurs disponibles</h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                {predefinedColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => toggleColor(color)}
                    className={`w-10 h-10 rounded-full border-4 transition-all ${colors.includes(color)
                      ? 'border-blue-500 scale-110'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              {colors.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Couleurs sélectionnées:</p>
                  <div className="flex flex-wrap gap-2">
                    {colors.map(color => (
                      <span
                        key={color}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                        {color}
                        <button
                          type="button"
                          onClick={() => toggleColor(color)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Sizes */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tailles disponibles</h3>
              <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
                {predefinedSizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${sizes.includes(size)
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </Card>

            
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            icon={<Save className="w-4 h-4" />}
            onClick={handleSubmit(onSubmit)}
          >
            {product ? 'Mettre à jour' : 'Créer le produit'}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}