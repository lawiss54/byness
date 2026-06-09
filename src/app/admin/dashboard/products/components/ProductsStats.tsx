'use client';

import { Package, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/shared/ui';

interface ProductsStatsProps {
  stats: {
    total: number;
    active: number;
    inactive: number;
    lowStock: number;
  };
}

/**
 * Statistics cards component showing product metrics
 */
export default function ProductsStats({ stats }: ProductsStatsProps) {
  const statsConfig = [
    { 
      label: 'Total', 
      value: stats.total, 
      color: 'bg-blue-500', 
      icon: Package 
    },
    { 
      label: 'Actifs', 
      value: stats.active, 
      color: 'bg-green-500', 
      icon: CheckCircle 
    },
    { 
      label: 'Inactifs', 
      value: stats.inactive, 
      color: 'bg-red-500', 
      icon: XCircle 
    },
    { 
      label: 'Stock Faible', 
      value: stats.lowStock, 
      color: 'bg-yellow-500', 
      icon: AlertCircle 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {statsConfig.map((stat, index) => (
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
  );
}
