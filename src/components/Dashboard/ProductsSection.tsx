'use client';;
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
  XCircle,
  Loader2
} from 'lucide-react';
import { Button, Input, Select, Card, Badge } from '@/components/shared/ui';
import type { Category, Product } from '@/app/admin/types';
import Image from 'next/image';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic'


const ProductForm = dynamic(
  () => import('./Products/ProductForm'),
  { ssr: false }
)
const ProductDetails = dynamic(
  () => import('./Products/ProductDetails'),
  { ssr: false }
)
const BulkActions = dynamic(
  () => import('./Products/BulkActions'),
  { ssr: false }
)

type ViewMode = 'grid' | 'table';
type ProductStatus = 'all' | 'active' | 'inactive';

export default function ProductsSection() {
  // State Management
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProductStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [getCategories, setCategories] = useState([])
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [bulkStatus, setBulkStatus] = useState(false);




  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/products');


      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();

      function transformProduct(raw): Product {
        return {
          id: raw.id,
          name: raw.name,
          description: raw.description,
          price: parseFloat(raw.price),
          originalPrice: parseFloat(raw.original_price),
          images: raw.images?.map((img: any) => img.image_path) || [],
          badge: raw.badge || undefined,
          colors: raw.colors?.map((color: any) => color.hex_code) || [],
          sizes: raw.sizes?.map((size: any) => size.name) || [],
          category: raw.category?.name || 'Inconnu',
          stockQuantity: raw.stock_quantity,
          status: raw.status,
          slug: raw.slug,
          isNew: raw.is_new,
          isSale: raw.is_sale,
          discount: raw.discount ? parseFloat(raw.discount) : undefined,
        };
      }
      setProducts(data.data.map(transformProduct));
    } catch (error) {
      setError(error instanceof Error ? err.message : "Erreur lors du chargement des données");
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/Category');

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      function transformProduct(raw): Category {
        return {
          id: raw.id,
          value: raw.slug,
          label: raw.name
        }
      }

      setCategories(data.map(transformProduct));
    } catch (err) {

      console.error('Error fetching categories:', err);
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;
    fetchProducts()
    fetchCategories()
  }, []);

  // Filtered and paginated products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.slug.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [products, searchTerm, statusFilter, categoryFilter]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products?.map(p => p.category))];
    return uniqueCategories.map(cat => ({ value: cat, label: cat }));
  }, [products]);

  // Statistics
  const stats = useMemo(() => ({
    total: products?.length,
    active: products?.filter(p => p.status === 'active').length,
    inactive: products?.filter(p => p.status === 'inactive').length,
    lowStock: products?.filter(p => p.stockQuantity < 10).length
  }), [products]);

  // Handlers
  const handleCreateProduct = () => {
    setEditingProduct(null);
    setShowProductForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productSlug: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setDeletingSlug(productSlug);
      const res = await fetch(`/api/products/${productSlug}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error || 'Erreur lors de la suppression du produit');
        setDeletingSlug(null);
        throw new Error(errorData.error || 'Erreur lors de la suppression du produit');
      } else {
        toast.success('Produit supprimé avec succès');
        setProducts(prev => prev.filter(p => p.slug !== productSlug));
        setDeletingSlug(null);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (window.confirm(`Supprimer ${selectedProducts.length} produit(s) ?`)) {
      setBulkDeleting(true);
      let successCount = 0;
      for (const slug of selectedProducts) {
        try {
          const res = await fetch(`/api/products/${slug}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          });
          if (res.ok) {
            successCount++;
          } else {
            const errorData = await res.json();
            toast.error(errorData.error || `Erreur lors de la suppression du produit (${slug})`);
          }
        } catch (err) {
          toast.error(`Erreur lors de la suppression du produit (${slug})`);
        }
      }
      setProducts(prev => prev.filter(p => !selectedProducts.includes(p.slug)));
      setSelectedProducts([]);
      setBulkDeleting(false);
      if (successCount > 0) toast.success(`${successCount} produit(s) supprimé(s) avec succès`);
    }
  }

  const handleStatusBulk = async (status) => {
    setBulkStatus(true);
    const data = { status: status }
    let successCount = 0;
    for (const slug of selectedProducts) {
      try {
        const res = await fetch(`/api/products/${slug}/status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(data)
        });
        if (res.ok) {
          successCount++;
        } else {
          const errorData = await res.json();
          toast.error(errorData.error || `Erreur lors du changement de statut du produit (${slug})`);
        }
      } catch (err) {
        toast.error(`Erreur lors du changement de statut du produit (${slug})`);
      }
    }
    setProducts(prev => prev.map(p =>
      selectedProducts.includes(p.slug) ? { ...p, status } : p
    ));
    setSelectedProducts([]);
    setBulkStatus(false);
    if (successCount > 0) toast.success(`${successCount} produit(s) mis à jour avec succès`);
  }

  const handleViewProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductDetails(true);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p =>
        p.id === editingProduct.id ? { ...p, ...productData } : p
      ));
    } else {
      // Create new product
      const newProduct: Product = {
        id: Date.now().toString(),
        status: 'active',
        stockQuantity: 0,
        ...productData
      } as Product;
      setProducts(prev => [newProduct, ...prev]);
    }
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'out-of-stock': return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default: return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="success">Actif</Badge>;
      case 'inactive': return <Badge variant="error">Inactif</Badge>;
      case 'out-of-stock': return <Badge variant="warning">Rupture</Badge>;
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
  return (
    <div className="space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Produits</h1>
          <p className="text-gray-600 mt-2">Gérez votre catalogue de produits</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={handleCreateProduct}
          >
            Nouveau Produit
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total', value: stats.total, color: 'bg-blue-500', icon: Package },
          { label: 'Actifs', value: stats.active, color: 'bg-green-500', icon: CheckCircle },
          { label: 'Inactifs', value: stats.inactive, color: 'bg-red-500', icon: XCircle },
          { label: 'Stock Faible', value: stats.lowStock, color: 'bg-yellow-500', icon: AlertCircle }
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
              placeholder="Rechercher par nom ou SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ProductStatus)}
            options={[
              { value: 'all', label: 'Tous les statuts' },
              { value: 'active', label: 'Actifs' },
              { value: 'inactive', label: 'Inactifs' },
              { value: 'out-of-stock', label: 'Rupture de stock' }
            ]}
          />

          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: 'all', label: 'Toutes les catégories' },
              ...categories
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
      {selectedProducts.length > 0 && (
        <BulkActions
          selectedCount={selectedProducts.length}
          onDelete={handleBulkDelete}
          bulkStatusLoading={bulkStatus}
          bulkDeleteLoading={bulkDeleting}
          onStatusChange={(status) => handleStatusBulk(status)}
        />
      )}

      {/* Products Display */}
      <Card className="overflow-hidden">
        {viewMode === 'grid' ? (
          // Grid View
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {paginatedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
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
                        checked={selectedProducts.includes(product.slug)}
                        onChange={() => handleSelectProduct(product.slug)}
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
                          onClick={() => handleViewProduct(product)}
                          className="bg-white/90 hover:bg-white"
                        >
                          Voir
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          icon={<Edit className="w-4 h-4" />}
                          onClick={() => handleEditProduct(product)}
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
        ) : (
          // Table View
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                      onChange={handleSelectAll}
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
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
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
                          onClick={() => handleViewProduct(product)}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<Edit className="w-4 h-4" />}
                          onClick={() => handleEditProduct(product)}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={deletingSlug === product.slug ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                          onClick={() => handleDeleteProduct(product.slug)}
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredProducts.length)} sur {filteredProducts.length} produits
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
      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || statusFilter !== 'all' || categoryFilter !== 'all'
              ? 'Aucun produit ne correspond à vos critères de recherche.'
              : 'Commencez par ajouter votre premier produit.'
            }
          </p>
          {(!searchTerm && statusFilter === 'all' && categoryFilter === 'all') && (
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={handleCreateProduct}
            >
              Ajouter un produit
            </Button>
          )}
        </Card>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showProductForm && (
          <ProductForm
            getCategories={getCategories}
            product={editingProduct}
            onSave={handleSaveProduct}
            onClose={() => {
              setShowProductForm(false);
              setEditingProduct(null);
            }}
          />
        )}

        {showProductDetails && editingProduct && (
          <ProductDetails
            product={editingProduct}
            onEdit={() => {
              setShowProductDetails(false);
              setShowProductForm(true);
            }}
            onClose={() => {
              setShowProductDetails(false);
              setEditingProduct(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}