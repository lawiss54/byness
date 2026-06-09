'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Eye, Edit, MoreVertical, Trash2, Grid, List } from 'lucide-react';
import { Button, Input, Select, Card, Badge } from '@/components/shared/ui';
import type { Category } from '@/app/admin/types';
import { useCategoriesManagement } from '../hooks/useCategoriesManagement';
import BulkActions from './BulkActions';
import CategoryDetails from './CategoryDetails';
import CategoryForm from './CategoryForm';
import { Loader } from '@/components/shared';

type ViewMode = 'grid' | 'table';

interface CategoriesSectionProps {
  initialCategories: Category[];
}

// Helper functions
const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: { label: 'Actif', color: 'green' },
    inactive: { label: 'Inactif', color: 'gray' },
    pending: { label: 'En attente', color: 'yellow' }
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive;
  
  return (
    <Badge 
      variant={config.color as any}
      className="text-xs"
    >
      {config.label}
    </Badge>
  );
};

const getStatusIcon = (status: string) => {
  const statusColors = {
    active: 'text-green-500',
    inactive: 'text-gray-400',
    pending: 'text-yellow-500'
  };
  
  return (
    <div className={`w-2 h-2 rounded-full ${statusColors[status as keyof typeof statusColors] || statusColors.inactive}`} />
  );
};

export default function CategoriesSection({ initialCategories }: CategoriesSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const {
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedCategories,
    setSelectedCategories,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    paginatedCategories,
    totalPages,
    stats,
    fetchCategories,
    handleDeleteCategory,
    handleSaveCategory,
    handleSelectCategory,
    handleSelectAll,
    handleChangeStatusCategory
  } = useCategoriesManagement({ initialCategories });

  const handleCreate = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleView = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryDetails(true);
  };

  // Fixed handlers
  const handleViewCategory = (category: Category) => {
    handleView(category);
  };

  const handleEditCategory = (category: Category) => {
    handleEdit(category);
  };

  const handleSave = async (data: Partial<Category>) => {
    try {
      await handleSaveCategory(data, editingCategory);
      setShowCategoryForm(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Supprimer ${selectedCategories.length} catégorie(s) ?`)) {
      selectedCategories.forEach(id => handleDeleteCategory(id));
      setSelectedCategories([]);
    }
  };

  const handleBulkStatusChange = (status: string) => {
    selectedCategories.forEach(id => handleChangeStatusCategory(id, status));
    setSelectedCategories([]);
  };

  if (loading) return <Loader type="spinner" size="lg" text="Chargement des catégories..." />;

  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
      Erreur: {error}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des catégories</h1>
          <p className="text-gray-600">Gérez les catégories de vos produits</p>
        </div>
        <Button onClick={handleCreate} icon={<Plus />} className="bg-blue-600 hover:bg-blue-700">
          Nouvelle catégorie
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-500">Actives</div>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-500">Inactives</div>
            <div className="text-2xl font-bold text-gray-600">{stats.inactive}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-gray-500">En attente</div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pending || 0}</div>
          </Card>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-1 gap-4 max-w-md">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="Rechercher des catégories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            options={[
              { value: 'all', label: 'Tous les statuts' },
              { value: 'active', label: 'Actif' },
              { value: 'inactive', label: 'Inactif' },
              { value: 'pending', label: 'En attente' },
            ]}
            className="w-40"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            icon={<Grid className="w-4 h-4" />}
          >
            Grille
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            icon={<List className="w-4 h-4" />}
          >
            Liste
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCategories.length > 0 && (
        <BulkActions
          selectedCount={selectedCategories.length}
          onDelete={handleBulkDelete}
          onStatusChange={handleBulkStatusChange}
        />
      )}

      {/* Categories Display */}
      <Card className="overflow-hidden">
        {viewMode === 'grid' ? (
          // Grid View
          <div className="p-6">
            {paginatedCategories.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">Aucune catégorie trouvée</div>
                <p className="text-gray-500">Essayez de modifier vos filtres ou créez une nouvelle catégorie</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AnimatePresence>
                  {paginatedCategories.map((category, index) => (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      {/* Selection Checkbox */}
                      <div className="absolute top-3 left-3 z-10">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleSelectCategory(category.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </div>

                      {/* Category Header */}
                      <div 
                        className="h-24 relative flex items-center justify-center text-4xl"
                        style={{ backgroundColor: category.color + '20' }}
                      >
                        <span className="text-5xl">{category.icon}</span>
                        
                        {/* Status Indicator */}
                        <div className="absolute top-3 right-3">
                          {getStatusIcon(category.status)}
                        </div>

                        {/* Actions Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            icon={<Eye className="w-4 h-4" />}
                            onClick={() => handleViewCategory(category)}
                            className="bg-white/90 hover:bg-white"
                          >
                            Voir
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            icon={<Edit className="w-4 h-4" />}
                            onClick={() => handleEditCategory(category)}
                            className="bg-white/90 hover:bg-white"
                          >
                            Modifier
                          </Button>
                        </div>
                      </div>

                      {/* Category Info */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 line-clamp-1 flex-1">
                            {category.name}
                          </h3>
                          <div className="ml-2">
                            <button 
                              className="p-1 hover:bg-gray-100 rounded"
                              onClick={() => handleEditCategory(category)}
                            >
                              <MoreVertical className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {category.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-3">
                          {getStatusBadge(category.status)}
                          <span className="text-sm text-gray-500">
                            {category.productsCount} produits
                          </span>
                        </div>
                        
                        <div className="text-xs text-gray-400">
                          Créé le {new Date(category.createdAt).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        ) : (
          // Table View
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedCategories.length === paginatedCategories.length && paginatedCategories.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Créé le
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedCategories.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="text-gray-400 text-lg mb-2">Aucune catégorie trouvée</div>
                      <p className="text-gray-500">Essayez de modifier vos filtres ou créez une nouvelle catégorie</p>
                    </td>
                  </tr>
                ) : (
                  paginatedCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleSelectCategory(category.id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                            style={{ backgroundColor: category.color + '20' }}
                          >
                            <span className="text-lg">{category.icon}</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{category.name}</div>
                            <div className="text-sm text-gray-500">{category.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="line-clamp-2">{category.description}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {category.productsCount}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(category.status)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(category.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            icon={<Eye className="w-4 h-4" />}
                            onClick={() => handleViewCategory(category)}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            icon={<Edit className="w-4 h-4" />}
                            onClick={() => handleEditCategory(category)}
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            icon={<Trash2 className="w-4 h-4" />}
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-red-600 hover:text-red-700"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
          >
            Précédent
          </Button>
          <span className="text-gray-700 text-sm">
            Page {currentPage} sur {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
          >
            Suivant
          </Button>
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showCategoryForm && (
          <CategoryForm
            category={editingCategory}
            onSave={handleSave}
            onClose={() => {
              setShowCategoryForm(false);
              setEditingCategory(null);
            }}
          />
        )}
        {showCategoryDetails && editingCategory && (
          <CategoryDetails
            category={editingCategory}
            onEdit={() => {
              setShowCategoryDetails(false);
              handleEdit(editingCategory);
            }}
            onClose={() => {
              setShowCategoryDetails(false);
              setEditingCategory(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}