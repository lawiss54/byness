import type React from "react"
import { Input } from '@/components/Dashboard/HomeHeroSection'
import { Type, Tag } from 'lucide-react'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ContentFormSchema } from '../../utils/validationSchema'

interface FormFieldsProps {
  register: UseFormRegister<ContentFormSchema>;
  errors: FieldErrors<ContentFormSchema>;
}

export const FormFields: React.FC<FormFieldsProps> = ({ register, errors }) => {
  return (
    <>
      {/* Badge */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Badge (optionnel)</label>
        <Input
          {...register('badge')}
          placeholder="Exemple: Nouveau, Recommandé, Offre spéciale"
          icon={<Tag className="w-4 h-4" />}
          error={errors.badge?.message}
        />
      </div>

      {/* Main Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Titre principal *</label>
        <Input
          {...register('mainTitle')}
          placeholder="Le titre qui apparaîtra sur la page"
          required
          icon={<Type className="w-4 h-4" />}
          error={errors.mainTitle?.message}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          {...register('description')}
          placeholder="Description détaillée du contenu"
          required
          rows={4}
          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
      </div>
    </>
  );
};
