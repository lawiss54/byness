'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertCircle,
  CheckCircle,
  XCircle, Tag
} from 'lucide-react';

import { Button, Input, Select, Card, Badge } from '@/components/shared/ui';
import type { Category } from '@/app/admin/types';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic'


const BulkActions = dynamic(
  () => import('./Categories/BulkActions'),
  { ssr: false }
)
const CategoryDetails = dynamic(
  () => import('./Categories/CategoryDetails'),
  { ssr: false }
)
const CategoryForm = dynamic(
  () => import('./Categories/CategoryForm'),
  { ssr: false }
)

type ViewMode = 'grid' | 'table';
type CategoryStatus = 'all' | 'active' | 'inactive';

export default function CategoriesSection() {
  // State Management
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<CategoryStatus>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showCategoryDetails, setShowCategoryDetails] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  const router = useRouter();

  // Fetch categories function
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/Category');

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement des données");
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };
  

  // Fetch categories on component mount only
  useEffect(() => {
    if (typeof window === 'undefined') return;
    fetchCategories();
  }, []); // Empty dependency array - runs only once on mount

  // Handle refresh categories
  const handleRefreshCategories = () => {
    fetchCategories();
  };

  // Filtered and paginated categories
  const filteredCategories = useMemo(() => {
    if (!categories) return [];

    return categories.filter(category => {
      const matchesSearch = category?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category?.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || category?.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCategories.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCategories, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Statistics
  const stats = useMemo(() => ({
    total: categories.length,
    active: categories.filter(c => c.status === 'active').length,
    inactive: categories.filter(c => c.status === 'inactive').length,
    totalProducts: categories.reduce((sum, c) => sum + (c.productsCount || 0), 0)
  }), [categories]);

  // Handlers
  const handleCreateCategory = () => {
    setEditingCategory(null);
    setShowCategoryForm(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = async (categorySlug: string) => {
    
    const res = await fetch(`/api/Category/${categorySlug}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!res.ok) {
          toast.error("Erreur lors de la suppression");
        }
  };

  const handleViewCategory = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryDetails(true);
  };

  const handleSaveCategory = async (categoryData: Partial<Category>) => {
    try {
      if (editingCategory) {
        // Update existing category
        const res = await fetch(`/api/Category/${editingCategory.slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData),
        });

        if (!res.ok) {
          throw new Error('Erreur lors de la mise à jour');
        }

        const updatedCategory = await res.json();
        setCategories(prev => prev.map(c =>
          c.id === editingCategory.id ? updatedCategory : c
        ));
      } else {
        // Create new category
        const res = await fetch('/api/Category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoryData),
        });
        if (!res.ok) {
          console.log(res)
           toast.success(" Le problème a été résolu. Veuillez réessayer maintenant")
        }
        

        const newCategory = await res.json();
        setCategories(prev => [newCategory, ...prev]);
      }

      setShowCategoryForm(false);
      setEditingCategory(null);
    } catch (err) {
      toast.error("Erreur lors de la sauvegarde de la catégorie")
      
      router.refresh()
    }
  };

  const handleSelectCategory = (categorySlug: string) => {
    setSelectedCategories(prev =>
      prev.includes(categorySlug)
        ? prev.filter(slug => slug !== categorySlug)
        : [...prev, categorySlug]
    );
  };

  const handleChangeStatusCategory = async (categorySlug: string, status: string) => {

        const res = await fetch(`/api/Category/${categorySlug}/status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({status: status}),
        });

        if (!res.ok) {
          toast.error("Erreur lors change status")
          throw new Error('Erreur lors de la mise à jour');
        }
        const response = await res.json();
        toast.success(response)
  }

  const handleSelectAll = () => {
    if (selectedCategories.length === paginatedCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(paginatedCategories.map(c => c.id));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="success">Actif</Badge>;
      case 'inactive': return <Badge variant="error">Inactif</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Erreur lors du chargement des données</h3>
          <p className="text-gray-500 mb-4">{error}</p>
          <Button onClick={handleRefreshCategories} variant="primary">
            Réessayer
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Catégories</h1>
          <p className="text-gray-600 mt-2">Organisez et gérez les catégories de produits</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={handleCreateCategory}
          >
            Nouvelle Catégorie
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'bg-blue-500', icon: Tag },
          { label: 'Actives', value: stats.active, color: 'bg-green-500', icon: CheckCircle },
          { label: 'Inactives', value: stats.inactive, color: 'bg-red-500', icon: XCircle },
          { label: 'Total Produits', value: stats.totalProducts, color: 'bg-purple-500', icon: Package }
        ].map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Rechercher par nom ou description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as CategoryStatus)}
            options={[
              { value: 'all', label: 'Tous les statuts' },
              { value: 'active', label: 'Actives' },
              { value: 'inactive', label: 'Inactives' }
            ]}
          />

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              Grille
            </Button>
            <Button
              variant={viewMode === 'table' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
            >
              Tableau
            </Button>
          </div>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedCategories.length > 0 && (
        <BulkActions
          selectedCount={selectedCategories.length}
          onDelete={() => {
           
            selectedCategories.forEach((categorie) => {
              handleDeleteCategory(categorie);
            });
            setCategories(prev => prev.filter(c => !selectedCategories.includes(c.slug)));
            setSelectedCategories([]);
          }}
          onStatusChange={(status) => {
            selectedCategories.forEach((categorie) => {
              handleChangeStatusCategory(categorie, status)
            })
            setCategories(prev => prev.map(c =>
              selectedCategories.includes(c.slug) ? { ...c, status } : c
            ));
            setSelectedCategories([]);
          }}
        />
      )}

      {/* Categories Display */}
      <Card className="overflow-hidden">
        {viewMode === 'grid' ? (
          // Grid View
          <div className="p-6">
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
                        checked={selectedCategories.includes(category.slug)}
                        onChange={() => handleSelectCategory(category.slug)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </div>

                    {/* Category Header */}
                    <div
                      className="h-24 relative flex items-center justify-center text-4xl"
                      style={{ backgroundColor: category.color + '20' }}
                    >
                      <span className="text-5xl">{category.icon}</span>

                      {/* Status Badge */}
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
                        />
                      </div>
                    </div>

                    {/* Category Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-1 flex-1">
                          {category.name}
                        </h3>
                        
                      </div>

                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {category.description}
                      </p>

                      <div className="flex items-center justify-between mb-3">
                        {getStatusBadge(category.status)}
                        <span className="text-sm text-gray-500">
                          {category.productsCount || 0} produits
                        </span>
                      </div>

                      
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
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
                {paginatedCategories.map((category) => (
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
                      {category.productsCount || 0}
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
                          onClick={() => handleDeleteCategory(category.slug)}
                          className="text-red-600 hover:text-red-700"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredCategories.length)} sur {filteredCategories.length} catégories
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Précédent
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  size="sm"
                  variant={currentPage === page ? 'primary' : 'outline'}
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}

              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Suivant
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <Card className="p-12 text-center">
          <Tag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune catégorie trouvée</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all'
              ? 'Aucune catégorie ne correspond à vos critères de recherche.'
              : 'Commencez par ajouter votre première catégorie.'
            }
          </p>
          {(!searchTerm && statusFilter === 'all') && (
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={handleCreateCategory}
            >
              Ajouter une catégorie
            </Button>
          )}
        </Card>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showCategoryForm && (
          <CategoryForm
            category={editingCategory}
            onSave={handleSaveCategory}
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
              setShowCategoryForm(true);
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