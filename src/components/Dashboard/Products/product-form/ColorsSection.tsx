'use client';

import { Palette, Plus, X } from 'lucide-react';
import { Button, Input, Card } from '@/components/shared/ui';

interface ColorsSectionProps {
  colors: string[];
  predefinedColors: string[];
  customColor: string;
  showCustomColorInput: boolean;
  onToggleColor: (color: string) => void;
  onSetCustomColor: (color: string) => void;
  onToggleCustomColorInput: () => void;
  onAddCustomColor: () => void;
  onRemoveColor: (color: string) => void;
}

/**
 * Colors selection and management section
 */
export default function ColorsSection({
  colors,
  predefinedColors,
  customColor,
  showCustomColorInput,
  onToggleColor,
  onSetCustomColor,
  onToggleCustomColorInput,
  onAddCustomColor,
  onRemoveColor
}: ColorsSectionProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Couleurs disponibles</h3>
        <Button
          type="button"
          variant="outline"
          size="sm"
          icon={<Palette className="w-4 h-4" />}
          onClick={onToggleCustomColorInput}
        >
          Ajouter couleur personnalisée
        </Button>
      </div>
      
      <div className="space-y-4">
        {/* Predefined Colors */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Couleurs prédéfinies</p>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
            {predefinedColors.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => onToggleColor(color)}
                className={`w-10 h-10 rounded-full border-4 transition-all ${
                  colors.includes(color)
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
                onChange={(e) => onSetCustomColor(e.target.value)}
                className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <Button
                type="button"
                size="sm"
                onClick={onAddCustomColor}
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
                      onClick={() => onRemoveColor(color)}
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
  );
}
