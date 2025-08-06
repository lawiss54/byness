'use client';

import { Ruler, Plus, X } from 'lucide-react';
import { Button, Input, Card } from '@/components/shared/ui';

interface SizesSectionProps {
  sizes: string[];
  predefinedSizes: string[];
  customSize: string;
  showCustomSizeInput: boolean;
  onToggleSize: (size: string) => void;
  onSetCustomSize: (size: string) => void;
  onToggleCustomSizeInput: () => void;
  onAddCustomSize: () => void;
  onRemoveSize: (size: string) => void;
}

/**
 * Sizes selection and management section
 */
export default function SizesSection({
  sizes,
  predefinedSizes,
  customSize,
  showCustomSizeInput,
  onToggleSize,
  onSetCustomSize,
  onToggleCustomSizeInput,
  onAddCustomSize,
  onRemoveSize
}: SizesSectionProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Tailles disponibles</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          icon={<Ruler className="w-4 h-4" />}
          onClick={onToggleCustomSizeInput}
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
                onClick={() => onToggleSize(size)}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition-all ${
                  sizes.includes(size)
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
                onChange={(e) => onSetCustomSize(e.target.value)}
                placeholder="Taille personnalisée (ex: 38, 42, 3XL)"
                className="flex-1"
              />
              <Button
                type="button"
                size="sm"
                onClick={onAddCustomSize}
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
                    onClick={() => onRemoveSize(size)}
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
  );
}
