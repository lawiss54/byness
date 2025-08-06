import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Phone, Download, User } from 'lucide-react';
import { Button } from '@/components/shared/ui';
import { getStatusIcon, getStatusBadge, formatDate } from './utils/orderUtils';
import type { Order } from './types/orders';

interface OrdersTableProps {
  orders: Order[];
  selectedOrders: string[];
  onSelectOrder: (orderId: string) => void;
  onSelectAll: () => void;
  onViewOrder: (order: Order) => void;
  onEditOrder: (order: Order) => void;
  onBulkDownload: (orderIds: string[]) => void;
}

export function OrdersTable({
  orders,
  selectedOrders,
  onSelectOrder,
  onSelectAll,
  onViewOrder,
  onEditOrder,
  onBulkDownload
}: OrdersTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full" aria-label="Liste des commandes">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3 text-left">
              <input
                type="checkbox"
                checked={selectedOrders?.length === orders?.length && orders?.length > 0}
                onChange={onSelectAll}
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
          {orders?.map((order) => (
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
                  onChange={() => onSelectOrder(order?.id)}
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
                  {getStatusBadge(order.status, order.reason)}
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
                    onClick={() => onViewOrder(order)}
                    title="Voir les détails"
                    aria-label={`Voir les détails de la commande ${order.id}`}
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={<Edit className="w-4 h-4" />}
                    onClick={() => onEditOrder(order)}
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
                    onClick={() => onBulkDownload([order.id])}
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
  );
}
