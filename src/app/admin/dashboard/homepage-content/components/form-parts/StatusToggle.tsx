import type React from "react"
import type { UseFormRegister } from 'react-hook-form'
import type { ContentFormSchema } from '../../utils/validationSchema'

interface StatusToggleProps {
  register: UseFormRegister<ContentFormSchema>;
}

export const StatusToggle: React.FC<StatusToggleProps> = ({ register }) => {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        id="isActive"
        {...register('isActive')}
        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
      />
      <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
        Afficher ce contenu sur la page d'accueil
      </label>
    </div>
  );
};
