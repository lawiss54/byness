'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";

const Sidebar = dynamic(
  () => import('@/components/Dashboard/Sidebar'),
  { ssr: false }
)

const Profile = dynamic(
  () => import('@/components/Dashboard/Profile'),
  { ssr: false }
)

function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();

  // Handle navigation when activeSection changes
  useEffect(() => {
    switch (activeSection) {
      case 'dashboard':
        router.push('/admin/dashboard');
        break;
      case 'products':
        router.push('/admin/dashboard/products');
        break;
      case 'categories':
        router.push('/admin/dashboard/categories');
        break;
      case 'orders':
        router.push('/admin/dashboard/orders');
        break;
      case 'settings':
        router.push('/admin/dashboard/settings');
        break;
      case 'homepage-content':
        router.push('/admin/dashboard/homepage-content');
        break;
      case 'profile':
        router.push('/admin/dashboard/profile');
        break;
      default:
        router.push('/admin/dashboard');
        break;
    }
  }, [activeSection, router]);
 
  const renderActiveSection = () => {
   
    
    // For other sections, return null since navigation is handled by useEffect
    return null;
  };

  return (
    <div className="flex min-h-screen">
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
          {activeSection}
        </div>
      </main>
    </div>
  );
}

export default AdminPage;