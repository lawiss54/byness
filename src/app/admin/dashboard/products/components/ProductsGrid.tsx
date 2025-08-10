'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Edit } from 'lucide-react';
import { Button, Card } from '@/components/shared/ui';
import type { Product } from '@/app/admin/types';
import Image from 'next/image';
import { getStatusIcon, getStatusBadge } from '../utils/productHelpers';

interface ProductsGridProps {
  products: Product[];
  selectedProducts: string[];
  onSelectProduct: (productId: string) => void;
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
}

/**
 * Grid view component for displaying products
 */
export default function ProductsGrid({
  products,
  selectedProducts,
  onSelectProduct,
  onViewProduct,
  onEditProduct
}: ProductsGridProps) {
  return (
    <Card className="overflow-hidden drop-shadow-md">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-brand-ivory-200 border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 drop-shadow-lg"
              >
                {/* Selection Checkbox */}
                <div className="absolute top-3 left-3 z-10">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.slug)}
                    onChange={() => onSelectProduct(product.slug)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>

                {/* Product Image */}
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <Image
                    src={product?.images?.[0] || '/placeholder.jpg'}
                    alt={product.name}
                    fill
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    {getStatusIcon(product.status)}
                  </div>

                  {/* Actions Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      icon={<Eye className="w-4 h-4" />}
                      onClick={() => onViewProduct(product)}
                      className="bg-white/90 hover:bg-white"
                    >
                      Voir
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      icon={<Edit className="w-4 h-4" />}
                      onClick={() => onEditProduct(product)}
                      className="bg-white/90 hover:bg-white"
                    >
                      Modifier
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-lg text-gray-900">
                      {product.price?.toLocaleString()} DA
                    </span>
                    {getStatusBadge(product.status)}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Stock: {product.stockQuantity}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {product.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
