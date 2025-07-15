'use client';
import React, { useEffect, useState } from 'react';
import { Store, ShoppingCart, Package, DollarSign } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

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
    fetchOrders();
    fetchProducts();
    fetchCategories();
  }, []);

  // ✅ Compute stats
  useEffect(() => {
    if (products.length === 0 && orders.length === 0) return;

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

  return (
    <div className="space-y-6">
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
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                      order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status === 'delivered' ? 'Livré' :
                        order.status === 'shipped' ? 'Expédié' :
                        order.status === 'processing' ? 'En traitement' :
                        'Inconnu'}
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
