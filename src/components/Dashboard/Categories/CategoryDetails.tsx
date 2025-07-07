'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Edit, Package, Calendar, Tag } from 'lucide-react';
import { Button, Badge } from '@/components/shared/ui';
import type { Category } from '@/app/admin/types';

interface CategoryDetailsProps {
  category: Category;
  onEdit: () => void;
  onClose: () => void;
}

export default function CategoryDetails({ category, onEdit, onClose }: CategoryDetailsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="success">Actif</Badge>;
      case 'inactive': return <Badge variant="error">Inactif</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Détails de la catégorie</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              icon={<Edit className="w-4 h-4" />}
              onClick={onEdit}
            >
              Modifier
            </Button>
            <Button
              variant="ghost"
              size="sm"
              icon={<X className="w-5 h-5" />}
              onClick={onClose}
            />
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
          <div className="space-y-8">
            {/* Category Header */}
            <div className="text-center">
              <div 
                className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-4 shadow-lg"
                style={{ backgroundColor: category.color + '20' }}
              >
                {category.icon}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
              <div className="flex items-center justify-center gap-4">
                {getStatusBadge(category.status)}
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{category.slug}</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{category.description}</p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-2xl p-6 text-center">
                <Package className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-blue-600">{category.productsCount}</div>
                <div className="text-sm text-blue-500 font-medium">Produits</div>
              </div>
              
              <div className="bg-green-50 rounded-2xl p-6 text-center">
                <Tag className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-green-600" style={{ color: category.color }}>
                  {category.color}
                </div>
                <div className="text-sm text-green-500 font-medium">Couleur</div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations détaillées</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">ID</label>
                  <div className="text-gray-900 font-mono text-sm">{category.id}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Slug</label>
                  <div className="text-gray-900">{category.slug}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Statut</label>
                  <div>{getStatusBadge(category.status)}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Nombre de produits</label>
                  <div className="text-gray-900">{category.products_count}</div>
                </div>

              </div>
            </div>

            {/* Color Preview */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Aperçu de la couleur</h3>
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-xl border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: category.color }}
                />
                <div>
                  <div className="font-medium text-gray-900">{category.color}</div>
                  <div className="text-sm text-gray-500">Code couleur hexadécimal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}