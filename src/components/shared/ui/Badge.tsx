'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?:
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'processing'
  | 'transit'
  | 'blocked'
  | 'delivery'
  | 'returned'
  | 'attention';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  size,
  variant,
}) => {
  const variants = {
    default: "bg-brand-camel-100 text-brand-camel-700 p-2 text-sm text-center",
    success: "bg-green-100 text-green-700 p-2 text-sm text-center",
    warning: "bg-yellow-100 text-yellow-700 p-2 text-sm text-center",
    error: "bg-red-100 text-red-700 p-2 text-sm text-center",
    info: "bg-blue-100 text-blue-700 p-2 text-sm text-center",

    // ✅ ألوان إضافية حسب الحالات الجديدة
    processing: "bg-orange-100 text-orange-700 p-2 text-sm text-center", // En préparation, À vérifier
    transit: "bg-sky-100 text-sky-700 p-2 text-sm text-center", // En localisation, Vers Wilaya
    blocked: "bg-gray-300 text-gray-800 p-2 text-sm text-center", // Bloqué
    delivery: "bg-indigo-100 text-indigo-700 p-2 text-sm text-center", // Sorti en livraison, Prêt pour livreur
    returned: "bg-purple-100 text-purple-700 p-2 text-sm text-center", // Retour vers centre, etc.
    attention: "bg-pink-100 text-pink-700 p-2 text-sm text-center", // Tentative échouée, Alerte
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full",
        variants[variant] || variants.default,
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
