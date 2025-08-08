import React from 'react';
import { Package, Plus, Minus, Trash2 } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Card, Button, Input } from '@/components/shared/ui';
import Image from 'next/image';

// Color mapping utility
const colorMap: { [key: string]: string } = {
  '#ff0000': 'Rouge',
  '#0000ff': 'Bleu',
  '#00ff00': 'Vert',
  '#ffff00': 'Jaune',
  '#000000': 'Noir',
  '#ffffff': 'Blanc',
  '#800080': 'Violet',
  '#ffc0cb': 'Rose',
  '#ffa500': 'Orange',
  '#a52a2a': 'Marron',
  '#808080': 'Gris',
  '#000080': 'Bleu marine',
  '#f5f5dc': 'Beige',
  '#ffd700': 'Or',
  '#c0c0c0': 'Argent',
};

const normalizeHexColor = (color: string): string => {
  if (color.startsWith('#')) {
    return color.toLowerCase();
  }
  if (!/^[0-9A-Fa-f]{6}$/.test(color)) {
    return color.toLowerCase();
  }
  return `#${color.toLowerCase()}`;
};

const getColorName = (color: string): string => {
  if (!color) return '';
  const normalizedColor = normalizeHexColor(color);
  if (colorMap[normalizedColor]) {
    return colorMap[normalizedColor];
  }
  if (normalizedColor.startsWith('#')) {
    return `Code hex: ${normalizedColor}`;
  }
  return color;
};

interface OrderEditProductsListProps {
  control: any;
  errors: any;
  fields: any[];
  watchedItems: any[];
  handleQuantityChange: (index: number, change: number) => void;
  addNewItem: () => void;
  removeItem: (index: number) => void;
}

export function OrderEditProductsList({
  control,
  errors,
  fields,
  watchedItems,
  handleQuantityChange,
  addNewItem,
  removeItem
}: OrderEditProductsListProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Produits
        </h3>
        <Button
          type="button"
          size="sm"
          variant="outline"
          icon={<Plus className="w-4 h-4" />}
          onClick={addNewItem}
        >
          Ajouter un produit
        </Button>
      </div>
      
      {errors.items && (
        <div className="text-red-600 text-sm mb-4">
          {errors.items.message}
        </div>
      )}
      
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-gray-200 rounded-xl p-4"
          >
            <div className="flex gap-4 mb-4">
              <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={watchedItems[index]?.image || "/placeholder.svg"}
                  alt={watchedItems[index]?.name || "Produit"}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1">
                <Controller
                  name={`items.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="mb-2"
                      placeholder="Nom du produit"
                      error={errors.items?.[index]?.name?.message}
                    />
                  )}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Controller
                    name={`items.${index}.color`}
                    control={control}
                    render={({ field }) => {
                      const colorName = getColorName(field.value);
                      return (
                        <div className="relative">
                          {field.value && (
                            <div className="absolute -top-2 right-0 text-xs bg-brand-camel-50 border border-brand-camel-200 rounded px-2 py-0.5 shadow-sm">
                              <span className="font-mono text-brand-camel-700">
                                {field.value.startsWith("#")
                                  ? field.value
                                  : `#${field.value}`}
                              </span>
                            </div>
                          )}
                          <Input
                            {...field}
                            placeholder="Couleur"
                            value={colorName || field.value}
                            onChange={(e) => {
                              if (e.target.value.startsWith("#")) {
                                field.onChange(e.target.value);
                              } else {
                                const hexCode = Object.entries(
                                  colorMap
                                ).find(
                                  ([_, name]) =>
                                    name.toLowerCase() ===
                                    e.target.value.toLowerCase()
                                )?.[0];
                                field.onChange(
                                  hexCode || e.target.value
                                );
                              }
                            }}
                          />
                        </div>
                      );
                    }}
                  />
                  <Controller
                    name={`items.${index}.size`}
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="Taille" />
                    )}
                  />
                </div>
              </div>
              {fields.length > 1 && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => removeItem(index)}
                  className="text-red-600 hover:text-red-700"
                />
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  icon={<Minus className="w-4 h-4" />}
                  onClick={() => handleQuantityChange(index, -1)}
                  disabled={watchedItems[index]?.quantity <= 1}
                />
                <span className="w-12 text-center font-semibold">
                  {watchedItems[index]?.quantity || 1}
                </span>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  icon={<Plus className="w-4 h-4" />}
                  onClick={() => handleQuantityChange(index, 1)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Controller
                  name={`items.${index}.price`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) =>
                        field.onChange(
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-24 text-right"
                      placeholder="Prix"
                      error={errors.items?.[index]?.price?.message}
                    />
                  )}
                />
                <span className="text-sm text-gray-600">DA</span>
              </div>
            </div>
            <div className="mt-2 text-right">
              <span className="text-sm text-gray-600">Total: </span>
              <span className="font-semibold text-gray-900">
                {(
                  (watchedItems[index]?.price || 0) *
                  (watchedItems[index]?.quantity || 1)
                ).toLocaleString()}{" "}
                DA
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
