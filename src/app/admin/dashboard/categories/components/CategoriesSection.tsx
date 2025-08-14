'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Plus, Search, Eye, Edit } from 'lucide-react';
import { Button, Input, Select, Card, Badge } from '@/components/shared/ui';
import type { Category } from '@/app/admin/types';
import { useCategoriesManagement } from '../hooks/useCategoriesManagement';

// Assuming these components exist, but commenting out to ensure compilation
// import CategoryDetails from './CategoryDetails';
// import CategoryForm from './CategoryForm';

interface CategoriesSectionProps {
  initialCategories: Category[];
}

export default function CategoriesSection({ initialCategories }: CategoriesSectionProps) {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    paginatedCategories,
    totalPages,
  } = useCategoriesManagement({ initialCategories });

  // Using placeholders for modal interactions for now
  const handleCreate = () => alert('Create new category!');
  const handleEdit = (category: Category) => alert(`Editing: ${category.name}`);
  const handleView = (category: Category) => alert(`Viewing: ${category.name}`);

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button onClick={handleCreate} icon={<Plus />}>New Category</Button>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-1/3 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-1/4">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            options={[
              { value: 'all', label: 'All Statuses' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </div>
      </div>

      {paginatedCategories.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold">No Categories Found</h3>
          <p className="text-gray-500 mt-2">
            There are no categories that match your current filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedCategories.map((category) => (
            <Card key={category.id} className="flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{category.name}</h3>
                  <Badge variant={category.status === 'active' ? 'success' : 'danger'}>
                    {category.status}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mt-2">{category.description || 'No description'}</p>
                <p className="text-gray-500 text-xs mt-4">
                  {category.productsCount || 0} Products
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => handleView(category)} icon={<Eye />}>
                  View
                </Button>
                <Button variant="default" size="sm" onClick={() => handleEdit(category)} icon={<Edit />}>
                  Edit
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
          >
            Previous
          </Button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}