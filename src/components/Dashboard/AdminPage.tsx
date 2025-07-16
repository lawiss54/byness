'use client'

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic'




const Sidebar = dynamic(
  () => import('@/components/Dashboard/Sidebar'),
  { ssr: false }
)
const Dashboard = dynamic(
  () => import('@/components/Dashboard/Dashboard'),
  { ssr: false }
)
const ProductsSection = dynamic(
  () => import('@/components/Dashboard/ProductsSection'),
  { ssr: false }
)
const CategoriesSection = dynamic(
  () => import('@/components/Dashboard/CategoriesSection'),
  { ssr: false }
)
const HomepageContentManager = dynamic(
  () => import('@/components/Dashboard/HomepageContentManager'),
  { ssr: false }
)
const OrdersSection = dynamic(
  () => import('@/components/Dashboard/OrdersSection'),
  { ssr: false }
)
const SettingsSection = dynamic(
  () => import('@/components/Dashboard/SettingsSection'),
  { ssr: false }
)


function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
 


  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'branches':
        return <ProductsSection />;
      case 'categories':
        return <CategoriesSection />;
      case 'orders':
        return <OrdersSection />;
      case 'settings':
        return <SettingsSection />;
      case 'homepage':
        return <HomepageContentManager />
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className={`relative transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
          isOpen={isSidebarOpen}
        />
      </div>
      <main className="flex-1 overflow-auto">
        <div className="p-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 mb-4"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
            
          </button>
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
}

export default AdminPage;