import type React from "react"
import { X } from 'lucide-react'
import { Button } from '@/components/Dashboard/HomeHeroSection'

interface FormHeaderProps {
  isEditing: boolean;
  onClose: () => void;
}

export const FormHeader: React.FC<FormHeaderProps> = ({ isEditing, onClose }) => {
  return (
    <div className="sticky top-0 bg-white p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between rounded-t-xl">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
        {isEditing ? "Modifier le contenu" : "Ajouter nouveau contenu"}
      </h2>
      <Button
        size="sm"
        variant="ghost"
        icon={<X className="w-4 h-4" />}
        onClick={onClose}
        className="flex-shrink-0"
      />
    </div>
  );
};
