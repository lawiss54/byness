'use client';

import { Star, TrendingUp, Award } from 'lucide-react';
import { Card } from '@/components/shared/ui';
import { UseFormRegister } from 'react-hook-form';

interface ClassificationSectionProps {
  register: UseFormRegister<any>;
}

/**
 * Product classification section with checkboxes
 */
export default function ClassificationSection({ register }: ClassificationSectionProps) {
  const classifications = [
    {
      name: 'is_new',
      icon: Star,
      label: 'Nouveau produit',
      description: 'Afficher dans la section "Nouveautés"',
      color: 'text-yellow-500',
      checkboxColor: 'text-blue-600 focus:ring-blue-500'
    },
    {
      name: 'is_sale',
      icon: TrendingUp,
      label: 'En promotion',
      description: 'Afficher dans la section "Promotions"',
      color: 'text-red-500',
      checkboxColor: 'text-red-600 focus:ring-red-500'
    },
    {
      name: 'hero_section',
      icon: Award,
      label: 'Produit exclusif',
      description: 'Afficher dans la section héros du magasin',
      color: 'text-purple-500',
      checkboxColor: 'text-purple-600 focus:ring-purple-500'
    }
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Classification du produit</h3>
      <div className="space-y-4">
        {classifications.map((item) => (
          <div key={item.name} className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register(item.name)}
                className={`w-4 h-4 bg-gray-100 border-gray-300 rounded ${item.checkboxColor}`}
              />
              <div className="flex items-center gap-2">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </div>
            </label>
            <p className="text-xs text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
