'use client';

import { Tag } from 'lucide-react';
import { Input, Select, Textarea, Card, Label } from '@/components/shared/ui';
import type { Category } from '@/app/admin/types';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface BasicInfoSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  categories: Category[];
  product: any;
  discountPercentage: number;
  onPriceChange: (price: number) => void;
}

/**
 * Basic information section of product form
 */
export default function BasicInfoSection({
  register,
  errors,
  categories,
  product,
  discountPercentage,
  onPriceChange
}: BasicInfoSectionProps) {
  const statusOptions = [
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
  ];

  return (
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
          <Label className='block text-sm font-semibold text-brand-darkGreen-500'>
            Prix actuel (Da)
          </Label>
          <Input
            {...register('price', {
              valueAsNumber: true,
              onChange: (e) => onPriceChange(Number(e.target.value))
            })}
            type="number"
            placeholder="0"
            error={errors.price?.message}
            required
          />
        </div>
        
        <div>
          <Label className='block text-sm font-semibold text-brand-darkGreen-500'>
            Prix original (Da)
          </Label>
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
          <Label className='block text-sm font-semibold text-brand-darkGreen-500'>
            Quantité en stock
          </Label>
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
  );
}
