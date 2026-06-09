import type React from "react"
import { Save } from 'lucide-react'
import { Button } from '@/components/Dashboard/HomeHeroSection'

interface FormActionsProps {
  isLoading: boolean;
  isEditing: boolean;
  onClose: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({ isLoading, isEditing, onClose }) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 sm:pt-6 border-t border-gray-200">
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        className="w-full sm:w-auto order-2 sm:order-1 bg-transparent"
      >
        Annuler
      </Button>
      <Button
        type="submit"
        disabled={isLoading}
        icon={
          isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )
        }
        className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto order-1 sm:order-2"
      >
        {isLoading ? "Enregistrement en cours..." : isEditing ? "Mettre à jour" : "Enregistrer"}
      </Button>
    </div>
  );
};
