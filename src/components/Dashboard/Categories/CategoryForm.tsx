'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Palette, ChevronDown, ChevronUp } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Input, Textarea, Card } from '@/components/shared/ui';
import type { Category } from '@/app/admin/types';

const categorySchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  icon: z.string().min(1, 'Veuillez sélectionner une icône'),
  color: z.string()
    .min(1, 'Veuillez saisir ou sélectionner une couleur')
    .refine(val => /^#([A-Fa-f0-9]{6})$/.test(val), {
      message: "Format de couleur invalide (ex: #123abc)"
    }),
  status: z.enum(['active', 'inactive'])
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  category?: Category | null;
  onSave: (data: Partial<Category>) => void;
  onClose: () => void;
}

const predefinedIcons = [
  '👗', '👚', '👖', '🩱', '👜', '👠', '🧥', '👕', 
  '🩳', '🧦', '🎩', '👒', '🕶️', '💍', '⌚', '🎀'
];

const predefinedColors = [
  '#da944a', '#0f3a37', '#5f6e5f', '#c8a376', '#d5e3ce', 
  '#0a1f1c', '#f39c12', '#e74c3c', '#9b59b6', '#3498db',
  '#2ecc71', '#f1c40f', '#e67e22', '#95a5a6', '#34495e'
];

export default function CategoryForm({ category, onSave, onClose }: CategoryFormProps) {
  const [selectedIcon, setSelectedIcon] = useState(category?.icon || '');
  const [selectedColor, setSelectedColor] = useState(category?.color || '');
  const [isManualColor, setIsManualColor] = useState(false);
  const [isColorPaletteOpen, setIsColorPaletteOpen] = useState(true);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || '',
      description: category?.description || '',
      icon: category?.icon || '',
      color: category?.color || '',
      status: category?.status || 'active'
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = form;

  // Update form values when selections change
  useEffect(() => {
    setValue('icon', selectedIcon, { shouldValidate: true });
    setValue('color', selectedColor, { shouldValidate: true });
  }, [selectedIcon, selectedColor, setValue]);

  // Set manual color mode if existing color isn't predefined
  useEffect(() => {
    if (category?.color && !predefinedColors.includes(category.color)) {
      setIsManualColor(true);
    }
  }, [category]);

  const handleColorChange = (value: string) => {
    // Format as hex color
    let formatted = value.trim();
    if (formatted && !formatted.startsWith('#')) {
      formatted = '#' + formatted;
    }
    
    // Limit to 7 characters
    if (formatted.length <= 7) {
      setSelectedColor(formatted);
    }
  };

  const toggleColorMode = () => {
    setIsManualColor(!isManualColor);
    if (!isManualColor) {
      setSelectedColor('');
    }
    trigger('color');
  };

  const onSubmit = (data: CategoryFormData) => {
    const categoryData = {
      ...data,
      icon: selectedIcon,
      color: selectedColor,
      slug: data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    };
    
    onSave(categoryData);
  };

  const currentColor = watch('color');
  const currentName = watch('name');
  const currentDescription = watch('description');

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {category ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
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
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de base</h3>
              <div className="space-y-4">
                <Input
                  {...register('name')}
                  label="Nom de la catégorie"
                  placeholder="Ex: Robes, Pantalons..."
                  error={errors.name?.message}
                  required
                />
                
                <Textarea
                  {...register('description')}
                  label="Description"
                  placeholder="Description détaillée de la catégorie"
                  rows={3}
                  error={errors.description?.message}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-brand-darkGreen-500 mb-2">
                      Statut <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register('status')}
                      className="w-full px-4 py-3 border-2 border-brand-sage-200 rounded-xl focus:border-brand-camel-500 focus:outline-none transition-colors bg-white text-brand-darkGreen-500"
                    >
                      <option value="active">Actif</option>
                      <option value="inactive">Inactif</option>
                    </select>
                  </div>
                </div>
              </div>
            </Card>

            {/* Icon Selection */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Icône de la catégorie</h3>
              
              <div className="space-y-4">
                {selectedIcon && (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-xl text-3xl mb-2">
                      {selectedIcon}
                    </div>
                    <p className="text-sm text-gray-600">Icône sélectionnée</p>
                  </div>
                )}

                <div className="grid grid-cols-8 gap-3">
                  {predefinedIcons.map(icon => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setSelectedIcon(icon)}
                      className={`w-12 h-12 rounded-xl border-2 transition-all text-2xl hover:scale-110 ${
                        selectedIcon === icon 
                          ? 'border-blue-500 bg-blue-50 scale-110' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                {errors.icon && (
                  <p className="text-sm text-red-500 font-medium">{errors.icon.message}</p>
                )}
              </div>
            </Card>

            {/* Color Selection */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Couleur de la catégorie
                </h3>
                <button 
                  type="button"
                  onClick={() => setIsColorPaletteOpen(!isColorPaletteOpen)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {isColorPaletteOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>
              
              {isColorPaletteOpen && (
                <div className="space-y-6">
                  {/* Color Preview */}
                  {selectedColor && (
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                      <div 
                        className="w-16 h-16 rounded-xl border-2 border-gray-300"
                        style={{ backgroundColor: selectedColor }}
                      />
                      <div>
                        <p className="font-medium text-gray-900">Couleur sélectionnée</p>
                        <p className="text-sm text-gray-600 mt-1">{selectedColor}</p>
                      </div>
                    </div>
                  )}

                  {/* Color Input Mode Toggle */}
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-700">
                      {isManualColor ? 'Saisie manuelle' : 'Palette de couleurs'}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleColorMode}
                    >
                      {isManualColor ? 'Voir les couleurs prédéfinies' : 'Saisir manuellement'}
                    </Button>
                  </div>

                  {/* Manual Color Input */}
                  {isManualColor ? (
                    <div className="space-y-3">
                      <Input
                        label="Couleur hexadécimale"
                        placeholder="#123abc"
                        type='color'
                        value={selectedColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                        error={errors.color?.message}
                      />
                      <p className="text-sm text-gray-500">
                        Saisissez une couleur au format hexadécimal (ex: #f39c12)
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-5 gap-3">
                        {predefinedColors.map(color => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            className={`w-12 h-12 rounded-xl border-4 transition-all hover:scale-110 ${
                              selectedColor === color 
                                ? 'border-blue-500 scale-110' 
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                      {errors.color && (
                        <p className="text-sm text-red-500 font-medium">{errors.color.message}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </Card>

            {/* Preview */}
            {selectedIcon && selectedColor && (
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu</h3>
                <div className="flex items-center justify-center">
                  <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-xl w-full max-w-md">
                    <div 
                      className="w-20 h-20 rounded-xl flex items-center justify-center text-4xl mx-auto mb-3"
                      style={{ backgroundColor: selectedColor + '20' }}
                    >
                      {selectedIcon}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {currentName || 'Nom de la catégorie'}
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">
                      {currentDescription || 'Description de la catégorie'}
                    </p>
                    <div className="mt-4 flex justify-center">
                      <div 
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: selectedColor }}
                      />
                      <span className="ml-2 text-sm text-gray-500">{selectedColor}</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
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
            disabled={!selectedIcon || !selectedColor}
          >
            {category ? 'Mettre à jour' : 'Créer la catégorie'}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}