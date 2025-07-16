'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Plus, Minus, Save, Palette, Ruler, Tag, Star, TrendingUp, Award, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Select, Textarea, Card } from '@/components/shared/ui';
import type { Category, Product } from '@/app/admin/types';
import { Label } from '@/components/shared/ui/Label';
import { toast } from 'react-toastify';
import Image from 'next/image';

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

export default function ProductForm({ getCategories, product, onSave, onClose }: ProductFormProps) {
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [colors, setColors] = useState<string[]>(product?.colors || []);
  const [sizes, setSizes] = useState<string[]>(product?.sizes || []);
  const [customColor, setCustomColor] = useState<string>('#000000');
  const [customColorName, setCustomColorName] = useState<string>('');
  const [customSize, setCustomSize] = useState<string>('');
  const [showCustomColorInput, setShowCustomColorInput] = useState(false);
  const [showCustomSizeInput, setShowCustomSizeInput] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number>(product?.price || 0);
  const [originalPrice, setOriginalPrice] = useState<number>(product?.original_price || 0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = getCategories;

  

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      original_price: product?.original_price || 0,
      category: product?.category || '',
      stockQuantity: product?.stockQuantity || 0,
      status: product?.status || 'active',
      badge: product?.badge || '',
      colors: product?.colors || [],
      sizes: product?.sizes || [],
      is_new: product?.is_new || false,
      is_sale: product?.is_sale || false,
      discount: product?.discount || 0,
      hero_section: product?.hero_section || false
    }
  });
  
  const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = form;

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
  const handlePriceChange = (newPrice: number) => {
    if (product && product.price !== newPrice && !originalPrice) {
      // If editing product and price changed, set original price
      setValue('original_price', product.price);
      setOriginalPrice(product.price);
    }
    setCurrentPrice(newPrice);
  };

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

  const addCustomColor = () => {
    if (customColor.trim()) {
      const colorValue = customColor.trim();
      if (!colors.includes(colorValue)) {
        setColors(prev => [...prev, colorValue]);
        setCustomColorName('');
        setCustomColor('#000000');
        setShowCustomColorInput(false);
      }
    }
  };

  const addCustomSize = () => {
    if (customSize.trim()) {
      const sizeValue = customSize.trim().toUpperCase();
      if (!sizes.includes(sizeValue)) {
        setSizes(prev => [...prev, sizeValue]);
        setCustomSize('');
        setShowCustomSizeInput(false);
      }
    }
  };

  const removeCustomColor = (color: string) => {
    setColors(prev => prev.filter(c => c !== color));
  };

  const removeCustomSize = (size: string) => {
    setSizes(prev => prev.filter(s => s !== size));
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    const productData = {
      ...data,
      images,
      colors,
      sizes,
      slug: data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    };
    
    try{
      // تحديد المسار والطريقة بناءً على نوع العملية
      const url = product ? `/api/products/${product.slug}` : '/api/products';
      const method = product ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(productData)
      })
      
      const responseData = await res.json();
      
      if (res.ok) {
        onSave(productData);
        toast.success(product ? "Produit mis à jour avec succès" : "Produit créé avec succès")
      } else if (res.status === 422) {
        toast.error("Veuillez choisir un autre nom de produit, celui-ci existe déjà")
      } else {
        toast.error("Une erreur s'est produite lors de la sauvegarde")
      }
    }catch (error) {
      console.log(error)
      toast.error("Une erreur s'est produite lors de la connexion au serveur")
    }finally {
      setIsSubmitting(false);
    }
  };



  // Update form values when arrays change
  useEffect(() => {
    if (typeof window === 'undefined') return;
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
                
                <div>
                  <Label className='block text-sm font-semibold text-brand-darkGreen-500'>Prix actuel (Da)</Label>
                  <Input
                    {...register('price', { 
                      valueAsNumber: true,
                      onChange: (e) => handlePriceChange(Number(e.target.value))
                    })}
                    type="number"
                    placeholder="0"
                    error={errors.price?.message}
                    required
                  />
                </div>

                <div>
                  <Label className='block text-sm font-semibold text-brand-darkGreen-500'>Prix original (Da)</Label>
                  <Input
                    {...register('original_price', { valueAsNumber: true })}
                    type="number"
                    placeholder="0"
                    error={errors.original_price?.message}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Sera automatiquement rempli si le prix est modifié
                  </p>
                </div>

                <Select
                  {...register('category')}
                  label="Catégorie"
                  placeholder="Sélectionner une catégorie"
                  options={[
                    { value: product?.category, label: product?.category },
                    ...(categories || [])
                  ]}
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
                
                <div>
                  <Label className='block text-sm font-semibold text-brand-darkGreen-500'>Quantité en stock</Label>
                  <Input
                    {...register('stockQuantity', { valueAsNumber: true })}
                    type="number"
                    placeholder="0"
                    error={errors.stockQuantity?.message}
                    required
                  />
                </div>

                <Input
                  {...register('badge')}
                  label="Badge (optionnel)"
                  placeholder="Nouveau, Promo, etc."
                  error={errors.badge?.message}
                />

                {/* Discount Display */}
                {discountPercentage > 0 && (
                  <div className="md:col-span-2">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          Remise automatique: {discountPercentage}%
                        </span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">
                        Calculée automatiquement basée sur les prix original et actuel
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Product Classification */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Classification du produit</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('is_new')}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">Nouveau produit</span>
                    </div>
                  </label>
                  <p className="text-xs text-gray-500">
                    Afficher dans la section "Nouveautés"
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('is_sale')}
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                    />
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-red-500" />
                      <span className="text-sm font-medium text-gray-700">En promotion</span>
                    </div>
                  </label>
                  <p className="text-xs text-gray-500">
                    Afficher dans la section "Promotions"
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('hero_section')}
                      className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-gray-700">Produit exclusif</span>
                    </div>
                  </label>
                  <p className="text-xs text-gray-500">
                    Afficher dans la section héros du magasin
                  </p>
                </div>
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
                        
                          <Image
                            src={image}
                            alt={`Product ${index + 1}`}
                            width={300}
                            height={128}
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Couleurs disponibles</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={<Palette className="w-4 h-4" />}
                  onClick={() => setShowCustomColorInput(!showCustomColorInput)}
                >
                  Ajouter couleur personnalisée
                </Button>
              </div>

              {/* Predefined Colors */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Couleurs prédéfinies</p>
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
                </div>

                {/* Custom Color Input */}
                {showCustomColorInput && (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <p className="text-sm font-medium text-gray-700">Ajouter une couleur personnalisée</p>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={addCustomColor}
                        disabled={!customColor.trim()}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Selected Colors */}
                {colors.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Couleurs sélectionnées</p>
                    <div className="flex flex-wrap gap-2">
                      {colors.map(color => {
                        const isPredefined = predefinedColors.includes(color);
                        return (
                          <span
                            key={color}
                            className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-full text-sm"
                          >
                            {isPredefined && (
                              <div
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color }}
                              />
                            )}
                            <span className={isPredefined ? '' : 'font-medium'}>{color}</span>
                            <button
                              type="button"
                              onClick={() => removeCustomColor(color)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Sizes */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Tailles disponibles</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  icon={<Ruler className="w-4 h-4" />}
                  onClick={() => setShowCustomSizeInput(!showCustomSizeInput)}
                >
                  Ajouter taille personnalisée
                </Button>
              </div>

              <div className="space-y-4">
                {/* Predefined Sizes */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Tailles prédéfinies</p>
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
                </div>

                {/* Custom Size Input */}
                {showCustomSizeInput && (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <p className="text-sm font-medium text-gray-700">Ajouter une taille personnalisée</p>
                    <div className="flex items-center gap-3">
                      <Input
                        value={customSize}
                        onChange={(e) => setCustomSize(e.target.value)}
                        placeholder="Taille personnalisée (ex: 38, 42, 3XL)"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={addCustomSize}
                        disabled={!customSize.trim()}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Selected Sizes */}
                {sizes.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-3">Tailles sélectionnées</p>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map(size => (
                        <span
                          key={size}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium"
                        >
                          {size}
                          <button
                            type="button"
                            onClick={() => removeCustomSize(size)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? 'En cours...' 
              : product 
                ? 'Mettre à jour' 
                : 'Créer le produit'
            }
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}