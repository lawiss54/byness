import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Phone, Download, User, MapPin } from 'lucide-react';
import { Button } from '@/components/shared/ui';
import { getStatusIcon, getStatusBadge, formatDate } from '@/app/admin/dashboard/orders/utils/orderUtils';
import type { Order } from '@/app/admin/dashboard/orders/types/orders';

interface OrdersGridProps {
  orders: Order[];
  selectedOrders: string[];
  onSelectOrder: (orderId: string) => void;
  onViewOrder: (order: Order) => void;
  onEditOrder: (order: Order) => void;
  onBulkDownload: (orderIds: string[]) => void;
}

export function OrdersGrid({
  orders,
  selectedOrders,
  onSelectOrder,
  onViewOrder,
  onEditOrder,
  onBulkDownload
}: OrdersGridProps) {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, index) => (
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
                  onChange={() => onSelectOrder(order.id)}
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
                {getStatusBadge(order.status, order.reason)}
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
                <span className="text-sm text-gray-600">Wilaya: {order.wilaya}</span>
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
                  onClick={() => onViewOrder(order)}
                  aria-label={`Voir les détails de la commande ${order.id}`}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  icon={<Edit className="w-4 h-4" />}
                  onClick={() => onEditOrder(order)}
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
                  onClick={() => onBulkDownload([order.id])}
                  aria-label={`Télécharger le PDF de la commande ${order.id}`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
