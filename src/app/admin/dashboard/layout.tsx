// app/admin/dashboard/layout.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRouter, usePathname } from "next/navigation";

const Sidebar = dynamic(
  () => import('@/components/Dashboard/Sidebar'),
  { ssr: false }
)


interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  // Sync activeSection with current pathname
  useEffect(() => {
    if (pathname === '/admin/dashboard') {
      setActiveSection('dashboard');
    } else if (pathname.startsWith('/admin/dashboard/')) {
      const section = pathname.split('/').pop();
      setActiveSection(section || 'dashboard');
    }
  }, [pathname]);

  // Handle navigation when activeSection changes
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    switch (section) {
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
  };

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

  return (
    <div className="flex min-h-screen">
      <div className={`relative transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
          isOpen={isSidebarOpen}
        />
      </div>
      <main className="flex-1 overflow-auto" data-scroll-target>
        <div className="p-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 mb-4 transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
          {children}
        </div>
      </main>
    </div>
  );
}