'use client';;
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Download,
  Eye,
  Edit,
  Phone,
  MapPin,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  User,
  ShoppingBag
} from 'lucide-react';
import { Button, Input, Select, Card, Badge } from '@/components/shared/ui';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic'


const ModalTéléchargementPDF = dynamic(
  () => import('./Orders/ModalTéléchargementPDF'),
  { ssr: false }
)
const BulkActions = dynamic(
  () => import('./Orders/BulkActions'),
  { ssr: false }
)
const OrderEdit = dynamic(
  () => import('./Orders/OrderEdit'),
  { ssr: false }
)
const OrderDetails = dynamic(
  () => import('./Orders/OrderDetails'),
  { ssr: false }
)


type OrderStatus = 'all' | 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  color: string;
  size: string;
  image: string;
};

type Order = {
  id: string;
  customerName: string;
  customerPhone: string;
  shippingType: string;
  customerAddress: string;
  municipality: string;
  wilaya: string;
  status: string;
  total: number;
  orderDate: string;
  items: OrderItem[];
  trackingNumber?: string;
};

type ViewMode = 'grid' | 'table';

export default function OrdersManagement() {
  // State Management
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showOrderEdit, setShowOrderEdit] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [showPdfModal, setShowPdfModal] = useState(false);


  const fetchOrders = async () => {
    try {
      if (typeof window === 'undefined') return;
      setLoading(true);
      const res = await fetch('/api/orders');
      if (!res.ok) {
        toast.error('Erreur lors du chargement des orders');
        setLoading(false);
        return;
      }

      const data = await res.json();
      
      function transformProduct(raw) {
       
        return {
          id: raw.order_number,
          customer_first_name: raw.customer_first_name,
          customer_last_name: raw.customer_last_name,
          customerPhone: raw.customer_phone,
          shippingType: raw.shipping_type,
          customerAddress: raw.shipping_address,
          municipality: raw.city,
          wilaya: raw.wilaya,
          status: raw.status,
          total: raw.total,
          orderDate: raw.created_at,
          items: Array.isArray(raw.items) ? raw.items.map(item => ({
            id: item.product_id,
            name: item.product_name,
            quantity: item.quantity,
            price: item.price,
            color: item.color,
            size: item.size,
            image: item.product_img
          })) : [],
        };
      }
      setOrders(data.data.map(transformProduct));
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    fetchOrders()
  }, []);

  // Filtered and paginated orders
  const filteredOrders = useMemo(() => {
    return orders?.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm);
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredOrders?.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage);

  // Statistics
  const stats = useMemo(() => ({
    total: orders?.length,
    pending: orders?.filter(o => o.status === 'pending').length,
    confirmed: orders?.filter(o => o.status === 'confirmed').length,
    shipped: orders?.filter(o => o.status === 'shipped').length,
    delivered: orders?.filter(o => o.status === 'delivered').length,
    retourné: orders?.filter(o => o.status === 'retourné').length,
    cancelled: orders?.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders?.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0)
  }), [orders]);

  // Handlers
  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(paginatedOrders.map(o => o.id));
    }
  };

  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setShowOrderDetails(true);
  };

  const handleEditOrder = (order) => {
    setCurrentOrder(order);
    setShowOrderEdit(true);
  };

  const handleStatusChange = async (orderIds: string[], newStatus: string) => {
    setOrders(prev => prev.map(order =>
      orderIds.includes(order.id)
        ? { ...order, status: newStatus, trackingNumber: newStatus === 'shipped' ? `TRK${Date.now()}` : order.trackingNumber }
        : order
    ));
    const data = {
      orders: orderIds,
      status: newStatus
    }
    try {
      const res = await fetch('/api/orders/change-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();

      toast.success('Statut mis à jour avec succès');
      
      if(newStatus === 'confirmed'){
        setPdfUrl(response.data || '');
        setShowPdfModal(true);
      }
      
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut');
    }




    setSelectedOrders([]);
  };

  const handleBulkDownload = async (orderIds: string[]) => {
    const data = { orders: orderIds };
    const res = await fetch('/api/orders/Bordereaus', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      toast.error("Échec d'exportation");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders-links.xlsx';
    a.click();
    a.remove();


  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'shipped': return <Truck className="w-4 h-4 text-purple-500" />;
      case 'delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="warning">En attente de confirmation</Badge>;
      case 'confirmed': return <Badge variant="info">Confirmée</Badge>;
      case 'shipped': return <Badge variant="default">Expédiée</Badge>;
      case 'delivered': return <Badge variant="success">Commande livrée</Badge>;
      case 'retourné': return <Badge variant="error">Commande retournée </Badge>;
      case 'cancelled': return <Badge variant="error">Commande annulée</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (

    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des commandes</h1>
          <p className="text-gray-600 mt-2">Suivi et gestion de toutes les commandes clients</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {[
          { label: 'Total', value: stats?.total, color: 'bg-blue-500', icon: ShoppingBag },
          { label: 'En attente', value: stats?.pending, color: 'bg-yellow-500', icon: Clock },
          { label: 'Confirmées', value: stats?.confirmed, color: 'bg-blue-600', icon: CheckCircle },
          { label: 'Expédiées', value: stats?.shipped, color: 'bg-purple-500', icon: Truck },
          { label: 'Livrées', value: stats?.delivered, color: 'bg-green-500', icon: CheckCircle },
          { label: 'Annulées', value: stats?.cancelled, color: 'bg-red-500', icon: XCircle },
          { label: 'Returne', value: stats?.cancelled, color: 'bg-red-500', icon: XCircle },
          //{ label: 'Revenu', value: `${stats?.totalRevenue?.toLocaleString()} DA`, color: 'bg-emerald-500', icon: FileText }
        ].map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-1">{stat?.label}</p>
                <p className="text-lg font-bold text-gray-900">{stat?.value}</p>
              </div>
              <div className={`w-8 h-8 ${stat?.color} rounded-lg flex items-center justify-center`}>
                {React.createElement(stat?.icon, { className: 'w-4 h-4 text-white' })}
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
              placeholder="Recherche par numéro, nom du client ou téléphone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
              aria-label="Recherche de commande"
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus)}
            options={[
              { value: 'all', label: 'Tous les statuts' },
              { value: 'pending', label: 'En attente' },
              { value: 'confirmed', label: 'Confirmée' },
              { value: 'shipped', label: 'Expédiée' },
              { value: 'delivered', label: 'Livrée' },
              { value: 'cancelled', label: 'Annulée' },
              { value: 'retourné', label: 'Retourné' }
            ]}
            aria-label="Filtrer par statut"
          />
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'table' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('table')}
              aria-label="Vue tableau"
            >
              Tableau
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              aria-label="Vue grille"
            >
              Grille
            </Button>
          </div>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <BulkActions
          selectedCount={selectedOrders.length}
          onStatusChange={handleStatusChange}
          onDownload={handleBulkDownload}
          selectedOrders={selectedOrders}
        />
      )}

      {/* Orders Display */}
      <Card className="overflow-hidden">
        {viewMode === 'table' ? (
          // Table View
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Liste des commandes">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedOrders?.length === paginatedOrders?.length && paginatedOrders?.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      aria-label="Sélectionner tout"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    N° Commande
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedOrders?.map((order) => (
                  <motion.tr
                    key={order?.id}
                    className="hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order?.id)}
                        onChange={() => handleSelectOrder(order?.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        aria-label={`Sélectionner la commande ${order.id}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{order.id}</div>

                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-brand-camel-100 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-brand-camel-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{order.customer_first_name + ' ' + order.customer_last_name}</div>
                          <div className="text-sm text-gray-500">{order.customerPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-semibold">{order.total.toLocaleString()} DA</div>
                      <div className="text-xs text-gray-500">{order.items.length} produit{order.items.length > 1 ? 's' : ''}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {formatDate(order.orderDate)}
                    </td>
                    <td className="px-6 py-4 text-left text-sm font-medium">
                      <div className="flex items-center justify-start gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<Eye className="w-4 h-4" />}
                          onClick={() => handleViewOrder(order)}
                          title="Voir les détails"
                          aria-label={`Voir les détails de la commande ${order.id}`}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<Edit className="w-4 h-4" />}
                          onClick={() => handleEditOrder(order)}
                          title="Modifier la commande"
                          aria-label={`Modifier la commande ${order.id}`}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<Phone className="w-4 h-4" />}
                          onClick={() => window.open(`tel:${order.customerPhone}`)}
                          title="Appeler le client"
                          aria-label={`Appeler le client ${order.customerName}`}
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<Download className="w-4 h-4" />}
                          onClick={() => handleBulkDownload([order.id])}
                          title="Télécharger PDF"
                          aria-label={`Télécharger le PDF de la commande ${order.id}`}
                        />
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // Grid View
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        aria-label={`Sélectionner la commande ${order.id}`}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{order.id}</h3>
                        <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <User className="w-4 h-4 text-brand-camel-500" />
                      <span className="font-medium text-gray-900">{order.customer_first_name + ' ' + order.customer_last_name}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="w-4 h-4 text-brand-sage-500" />
                      <span className="text-sm text-gray-600">{order.customerPhone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-brand-darkGreen-500" />
                      <span className="text-sm text-gray-600">{order.wilaya}</span>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Montant total :</span>
                      <span className="font-semibold text-gray-900">{order.total.toLocaleString()} DA</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Nombre de produits :</span>
                      <span className="text-sm text-gray-900">{order.items.length}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => handleViewOrder(order)}
                        aria-label={`Voir les détails de la commande ${order.id}`}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        icon={<Edit className="w-4 h-4" />}
                        onClick={() => handleEditOrder(order)}
                        aria-label={`Modifier la commande ${order.id}`}
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        icon={<Phone className="w-4 h-4" />}
                        onClick={() => window.open(`tel:${order.customerPhone}`)}
                        aria-label={`Appeler le client ${order.customerName}`}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        icon={<Download className="w-4 h-4" />}
                        onClick={() => handleBulkDownload([order.id])}
                        aria-label={`Télécharger le PDF de la commande ${order.id}`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Affichage de {((currentPage - 1) * itemsPerPage) + 1} à {Math.min(currentPage * itemsPerPage, filteredOrders.length)} sur {filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                aria-label="Page précédente"
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
                  aria-label={`Aller à la page ${page}`}
                >
                  {page}
                </Button>
              ))}
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                aria-label="Page suivante"
              >
                Suivant
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <Card className="p-12 text-center">
          <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'all'
              ? "Aucune commande ne correspond à vos critères de recherche."
              : "Aucune commande n'a encore été créée."
            }
          </p>
        </Card>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showOrderDetails && currentOrder && (
          <OrderDetails
            order={currentOrder}
            onClose={() => {
              setShowOrderDetails(false);
              setCurrentOrder(null);
            }}
            onEdit={() => {
              setShowOrderDetails(false);
              setShowOrderEdit(true);
            }}
          />
        )}
        {showOrderEdit && currentOrder && (
          <OrderEdit
            order={currentOrder}
            onSave={(updatedOrder) => {
              setOrders(prev => prev.map(o =>
                o.id === updatedOrder.id ? updatedOrder : o
              ));
              setShowOrderEdit(false);
              setCurrentOrder(null);
            }}
            onClose={() => {
              setShowOrderEdit(false);
              setCurrentOrder(null);
            }}
          />
        )}
        {showPdfModal && (
          <ModalTéléchargementPDF
            onClose={() => setShowPdfModal(false)}
            pdfUrl={pdfUrl}
            
          />
        )}

      </AnimatePresence>
    </div>
  );
}