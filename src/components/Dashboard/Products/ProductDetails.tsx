'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Edit, Package, DollarSign, Palette, Ruler } from 'lucide-react';
import { Button, Badge } from '@/components/shared/ui';
import type { Product } from '@/app/admin/types';

interface ProductDetailsProps {
  product: Product;
  onEdit: () => void;
  onClose: () => void;
}

export default function ProductDetails({ product, onEdit, onClose }: ProductDetailsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="success">Actif</Badge>;
      case 'inactive': return <Badge variant="error">Inactif</Badge>;
      case 'out-of-stock': return <Badge variant="warning">Rupture</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };
  console.log(product.images)

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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
          <h2 className="text-2xl font-bold text-gray-900">Détails du produit</h2>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Images</h3>
              {product.images && product?.images?.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {product.images.map((image, index) => (
                    <div >
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    />
                   </div>
                  ))}
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                  {getStatusBadge(product.status)}
                </div>
                
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Catégorie:</span>
                    <span className="ml-2 font-medium">{product.category}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Stock:</span>
                    <span className={`ml-2 font-medium ${product.stockQuantity < 10 ? 'text-red-600' : ''}`}>
                      {product.stockQuantity} unités
                    </span>
                  </div>
                  {product.badge && (
                    <div>
                      <span className="text-gray-500">Badge:</span>
                      <span className="ml-2 font-medium">{product.badge}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Prix
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Prix actuel:</span>
                    <span className="text-2xl font-bold text-green-600">
                      {product.price?.toLocaleString()} DA
                    </span>
                  </div>
                  {product.originalPrice > 0 && product.originalPrice > product.price && (
                    <>
                      <div className="flex items-center justify-between">
                        <span>Prix original:</span>
                        <span className="text-gray-500 line-through">
                          {product.originalPrice.toLocaleString()} DA
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Réduction:</span>
                        <span className="text-red-600 font-semibold">
                          -{discountPercentage}% ({(product.originalPrice - product.price).toLocaleString()} DA)
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    Couleurs disponibles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full"
                      >
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-sm">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    Tailles disponibles
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm font-medium"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Caractéristiques</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}