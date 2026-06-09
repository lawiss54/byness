import React from 'react';
import { ShoppingBag, Clock, CheckCircle, Truck, XCircle, Undo2 } from 'lucide-react';
import { Card } from '@/components/shared/ui';

interface OrdersStatsProps {
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    shipped: number;
    delivered: number;
    cancelled: number;
    returned: number;
  };
}

export function OrdersStats({ stats }: OrdersStatsProps) {
  const statsConfig = [
    { label: 'Total', value: stats?.total, color: 'bg-blue-500', icon: ShoppingBag },
    { label: 'En attente', value: stats?.pending, color: 'bg-yellow-500', icon: Clock },
    { label: 'Confirmées', value: stats?.confirmed, color: 'bg-blue-600', icon: CheckCircle },
    { label: 'Expédiées', value: stats?.shipped, color: 'bg-purple-500', icon: Truck },
    { label: 'Livrées', value: stats?.delivered, color: 'bg-green-500', icon: CheckCircle },
    { label: 'Annulées', value: stats?.cancelled, color: 'bg-red-500', icon: XCircle },
    { label: 'Retournées', value: stats?.returned, color: 'bg-orange-600', icon: Undo2 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
      {statsConfig.map((stat, index) => (
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
  );
}
