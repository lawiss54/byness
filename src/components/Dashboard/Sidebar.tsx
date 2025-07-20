'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Store, 
  Settings, 
  ShoppingCart,
  Users,
  TrendingUp,
  Tag,
  Home
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'branches', label: 'Products', icon: Store },
  { id: 'categories', label: 'Categories', icon: Tag },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'homepage', label: 'Homepage Manager', icon: Home },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeSection, onSectionChange, isOpen }: SidebarProps) {
  return (
    <div className={`bg-white shadow-lg h-full flex-col ${isOpen ? 'flex' : 'hidden'}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">StoreControl</h1>
            <p className="text-sm text-gray-500">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@store.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
