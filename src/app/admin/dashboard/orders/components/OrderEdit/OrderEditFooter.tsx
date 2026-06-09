import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '@/components/shared/ui';

interface OrderEditFooterProps {
  onClose: () => void;
  isSubmitting: boolean;
}

export function OrderEditFooter({ onClose, isSubmitting }: OrderEditFooterProps) {
  return (
    <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        disabled={isSubmitting}
      >
        Annuler
      </Button>
      <Button
        type="submit"
        variant="primary"
        icon={<Save className="w-4 h-4" />}
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Enregistrement..."
          : "Enregistrer les modifications"}
      </Button>
    </div>
  );
}
