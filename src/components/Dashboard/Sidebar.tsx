'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Store, 
  Settings, 
  ShoppingCart,
  Users,
  TrendingUp,
  Tag,
  Home,
  UserRound,
  LogOut,
  Loader2
} from 'lucide-react';
import { toast } from 'react-toastify';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onLogout?: () => void; // Optional custom logout handler
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Store },
  { id: 'categories', label: 'Categories', icon: Tag },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'homepage-content', label: 'Homepage Manager', icon: Home },
  { id: 'profile', label: 'Profile', icon: UserRound },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeSection, onSectionChange, isOpen, onLogout }: SidebarProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    if (onLogout) {
      // Use custom logout handler if provided
      onLogout();
    } else {
      // Default logout behavior
      if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
        setIsLoggingOut(true);
        
        try {
          // Call the logout API endpoint
          const response = await fetch('/api/Auth/logout', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();

          if (response.ok) {
            toast.success("Déconnexion réussie");
            // Optional: Show success notification
            // You can uncomment and use your preferred notification system
            // showNotification('success', 'Déconnexion réussie');
            
          } else {
            // API returned error but we still proceed with local cleanup
            console.warn('⚠️ Logout API error:', data.error);
            
            // Optional: Show warning notification
            // showNotification('warning', 'Déconnexion locale effectuée');
          }
          
        } catch (error) {
          // Network error or other issues
          console.error('❌ Network error during logout:', error);
          
          // Optional: Show error notification
          // showNotification('error', 'Erreur réseau, déconnexion locale effectuée');
        }

        // Always perform local cleanup regardless of API response
        try {
          // Clear all local storage
          localStorage.clear();
          sessionStorage.clear();
          
          // Clear any application-specific data
          // Example: Clear Redux store, Context state, etc.
          // dispatch(clearUserState());
          // clearAuthContext();
          
          // Small delay for better UX
          setTimeout(() => {
            // Redirect to login page
            router.push('/admin');
            
          }, 500);
          
        } catch (cleanupError) {
          console.error('❌ Error during cleanup:', cleanupError);
          // Still try to redirect even if cleanup fails
          router.push('/login');
        } finally {
          // Reset loading state after delay
          setTimeout(() => {
            setIsLoggingOut(false);
          }, 1000);
        }
      }
    }
  };
  
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
              disabled={isLoggingOut} // Disable navigation during logout
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              } ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-700' : 'text-gray-400'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
            isLoggingOut
              ? 'bg-red-100 text-red-700 cursor-not-allowed'
              : 'text-red-600 hover:bg-red-50 hover:text-red-700'
          }`}
        >
          {isLoggingOut ? (
            <Loader2 className="w-5 h-5 text-red-500 animate-spin" />
          ) : (
            <LogOut className="w-5 h-5 text-red-500" />
          )}
          <span className="font-medium">
            {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
          </span>
        </button>
      </div>

      {/* Loading Overlay during logout */}
      {isLoggingOut && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="flex flex-col items-center space-y-2">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-sm text-gray-600">Déconnexion en cours...</p>
          </div>
        </div>
      )}
    </div>
  );
}