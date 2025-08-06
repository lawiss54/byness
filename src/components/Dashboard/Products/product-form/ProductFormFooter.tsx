'use client';

import { Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/shared/ui';
import type { Product } from '@/app/admin/types';

interface ProductFormFooterProps {
  product: Product | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

/**
 * Footer component for product form with action buttons
 */
export default function ProductFormFooter({
  product,
  isSubmitting,
  onClose,
  onSubmit
}: ProductFormFooterProps) {
  return (
    <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
      <Button
        variant="outline"
        onClick={onClose}
        disabled={isSubmitting}
      >
        Annuler
      </Button>
      <Button
        variant="primary"
        icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting 
          ? 'En cours...'
          : product 
            ? 'Mettre à jour'
            : 'Créer le produit'
        }
      </Button>
    </div>
  );
}
