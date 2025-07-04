'use client'
import React, { useState } from 'react';
import { Store, Package, Users, MapPin, Plus, Eye } from 'lucide-react';
import { branches, products } from '@/app/admin/Dashboard/data/mockData';
import { Branch, Product } from '@/app/admin/Dashboard/types';

export default function ProductsSection() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const getBranchProducts = (branchId: string): Product[] => {
    return products.filter(product => product.branchId === branchId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Branches</h1>
          <p className="text-gray-600 mt-2">Manage your store locations and inventory</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Branch</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branches List */}
        <div className="space-y-4">
          {branches.map((branch) => (
            <div key={branch.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    branch.status === 'active' ? 'bg-emerald-100' : 'bg-gray-100'
                  }`}>
                    <Store className={`w-6 h-6 ${
                      branch.status === 'active' ? 'text-emerald-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{branch.name}</h3>
                    <div className="flex items-center space-x-1 text-gray-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{branch.location}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600 mt-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Manager: {branch.manager}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    branch.status === 'active' 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {branch.status.charAt(0).toUpperCase() + branch.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Products</p>
                  <p className="text-lg font-semibold text-gray-900">{branch.productsCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-lg font-semibold text-gray-900">${branch.revenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedBranch(branch)}
                  className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Products</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Products Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              {selectedBranch ? `${selectedBranch.name} - Products` : 'Select a branch to view products'}
            </h2>
          </div>
          <div className="p-6">
            {selectedBranch ? (
              <div className="space-y-4">
                {getBranchProducts(selectedBranch.id).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">SKU: {product.sku}</p>
                        <p className="text-sm text-gray-600">Category: {product.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${product.price}</p>
                      <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                        product.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                        product.status === 'out-of-stock' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {product.status === 'out-of-stock' ? 'Out of Stock' : 
                         product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Store className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Select a branch from the left to view its products</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}