'use client';
import React, { useEffect, useState } from 'react';
import { Store, ShoppingCart, Package, DollarSign, Clock, CheckCircle, Truck, Undo2, XCircle} from 'lucide-react';
import { toast } from 'react-toastify';
import {TooltipElement} from '@/components/shared/ui/TooltipElement';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/shared/ui';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch Orders
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      if (!res.ok) {
        toast.error('Erreur lors du chargement des commandes');
        return;
      }

      const data = await res.json();

      const transformed = data.data.map(raw => ({
        id: raw.order_number,
        customer_first_name: raw.customer_first_name,
        customer_last_name: raw.customer_last_name,
        customerPhone: raw.customer_phone,
        shippingType: raw.shipping_type,
        customerAddress: raw.shipping_address,
        municipality: raw.city,
        wilaya: raw.wilaya,
        status: raw.status,
        reason: raw.shipping_reason,
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
      }));

      setOrders(transformed);
      setRecentOrders(transformed.slice(0, 5));
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      const transformed = data.data.map(raw => ({
        id: raw.id,
        name: raw.name,
        description: raw.description,
        price: parseFloat(raw.price),
        originalPrice: parseFloat(raw.original_price),
        images: raw.images?.map(img => img.image_path) || [],
        badge: raw.badge || undefined,
        colors: raw.colors?.map(color => color.hex_code) || [],
        sizes: raw.sizes?.map(size => size.name) || [],
        category: raw.category?.name || 'Inconnu',
        stockQuantity: raw.stock_quantity,
        status: raw.status,
        slug: raw.slug,
        isNew: raw.is_new,
        isSale: raw.is_sale,
        discount: raw.discount ? parseFloat(raw.discount) : undefined,
      }));

      setProducts(transformed);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/Category');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      const transformed = data.map(raw => ({
        id: raw.id,
        value: raw.slug,
        label: raw.name
      }));
      setCategories(transformed);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  // ✅ Load on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    fetchOrders();
    fetchProducts();
    fetchCategories();
  }, []);

  // ✅ Compute stats
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (products.length === 0 && orders.length === 0) return;
    if(order){
      console.log(order);
    }
    

    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const activeProducts = products.filter(p => p.status === 'active').length;

    setStats([
      {
        title: 'Revenu total',
        value: `${totalRevenue.toLocaleString()} DA`,
        icon: DollarSign,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50'
      },
      {
        title: 'Produits actifs',
        value: activeProducts,
        icon: Store,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      },
      {
        title: 'Nombre total de produits',
        value: totalProducts,
        icon: Package,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50'
      },
      {
        title: 'Nombre total de commandes',
        value: totalOrders,
        icon: ShoppingCart,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50'
      }
    ]);
  }, [products, orders]);


  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'shipped':
        return <Truck className="w-4 h-4 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'retourné':
        return <Undo2 className="w-4 h-4 text-orange-600" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Package className="w-4 h-4 text-gray-500" />;
    }
  };

  
  const getStatusBadge = (status: string, reason?: string) => {
    const message = reason?.trim() ? reason : 'Aucune raison pour le moment';
    const renderBadge = (label: string, variant: string) => (
      <TooltipElement tooltip={message} color={variant}>
        <Badge variant={variant}>{label}</Badge>
      </TooltipElement>
    );

    switch (status) {
      case 'pending':
        return renderBadge('En attente de confirmation', 'warning');

      case 'confirmed':
        return renderBadge('Commande confirmée', 'info');

      case 'Pas encore expédié':
        return renderBadge('Pas encore expédiée', 'processing');

      case 'A vérifier':
        return renderBadge('À vérifier', 'processing');

      case 'En préparation':
        return renderBadge('Commande en préparation', 'processing');

      case 'Pas encore ramassé':
        return renderBadge('En attente de ramassage', 'delivery');

      case 'Prêt à expédier':
        return renderBadge('Prête à expédier', 'delivery');

      case 'Ramassé':
        return renderBadge('Colis ramassé', 'delivery');

      case 'Bloqué':
        return renderBadge('Commande bloquée', 'blocked');

      case 'Débloqué':
        return renderBadge('Commande débloquée', 'info');

      case 'Transfert':
        return renderBadge('Transfert en cours', 'transit');

      case 'Expédié':
        return renderBadge('Commande expédiée', 'info');

      case 'Centre':
        return renderBadge('Au centre logistique', 'transit');

      case 'En localisation':
        return renderBadge('En cours de localisation', 'transit');

      case 'Vers Wilaya':
        return renderBadge('En route vers la Wilaya', 'transit');

      case 'Reçu à Wilaya':
        return renderBadge('Arrivée à la Wilaya', 'transit');

      case 'En attente du client':
        return renderBadge('En attente du client', 'warning');

      case 'Prêt pour livreur':
        return renderBadge('Prête pour livraison', 'delivery');

      case 'Sorti en livraison':
        return renderBadge('Sortie pour livraison', 'delivery');

      case 'En attente':
        return renderBadge('Commande en attente', 'warning');

      case 'En alerte':
        return renderBadge('Commande en alerte', 'attention');

      case 'Tentative échouée':
        return renderBadge('Tentative de livraison échouée', 'attention');

      case 'Livré':
        return renderBadge('Commande livrée avec succès', 'success');

      case 'Echèc livraison':
        return renderBadge('Échec de livraison', 'error');

      case 'Retour vers centre':
        return renderBadge('Retour vers le centre', 'returned');

      case 'Retourné au centre':
        return renderBadge('Retournée au centre', 'returned');

      case 'Retour transfert':
        return renderBadge('Retour en transfert', 'returned');

      case 'Retour groupé':
        return renderBadge('Retour groupé', 'returned');

      case 'Retour à retirer':
        return renderBadge('Retour à retirer', 'returned');

      case 'Retour vers vendeur':
        return renderBadge('Retour vers le vendeur', 'returned');

      case 'Retourné au vendeur':
        return renderBadge('Retournée au vendeur', 'returned');

      case 'Echange échoué':
        return renderBadge('Échange échoué', 'error');

      default:
        return renderBadge(status, 'default');
    }
  };
  
  return (
    <div className="h-full w-full mt-2 p-4 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">Aperçu des performances de votre boutique</p>
      </div>

      {/* ✅ Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ✅ Commandes récentes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Commandes récentes</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <AnimatePresence>
              {recentOrders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer_first_name} {order.customer_last_name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.total} DA</p>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status, order.reason)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
