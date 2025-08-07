'use client';

import { Eye, Edit, Trash2, Loader2 } from 'lucide-react';
import { Button, Card } from '@/components/shared/ui';
import type { Product } from '@/app/admin/types';
import Image from 'next/image';
import { getStatusBadge } from './utils/productHelpers';

interface ProductsTableProps {
  products: Product[];
  selectedProducts: string[];
  onSelectProduct: (productId: string) => void;
  onSelectAll: () => void;
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productSlug: string) => void;
  deletingSlug: string | null;
}

/**
 * Table view component for displaying products
 */
export default function ProductsTable({
  products,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
  onViewProduct,
  onEditProduct,
  onDeleteProduct,
  deletingSlug
}: ProductsTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === products.length && products.length > 0}
                  onChange={onSelectAll}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produit
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prix
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => onSelectProduct(product.id)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Image
                      src={product.images?.[0] || '/placeholder.jpg'}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-lg object-cover mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {product.price?.toLocaleString()} DA
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <span className={`${product.stockQuantity < 10 ? 'text-red-600 font-semibold' : ''}`}>
                    {product.stockQuantity}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(product.status)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={<Eye className="w-4 h-4" />}
                      onClick={() => onViewProduct(product)}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={<Edit className="w-4 h-4" />}
                      onClick={() => onEditProduct(product)}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={deletingSlug === product.slug ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      onClick={() => onDeleteProduct(product.slug)}
                      className="text-red-600 hover:text-red-700"
                      disabled={deletingSlug === product.slug}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
