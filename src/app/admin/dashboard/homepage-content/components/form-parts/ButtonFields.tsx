import type React from "react"
import { Input } from '@/components/Dashboard/HomeHeroSection'
import { Link, FileText } from 'lucide-react'
import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { ContentFormSchema } from '../../utils/validationSchema'

interface ButtonFieldsProps {
  register: UseFormRegister<ContentFormSchema>;
  errors: FieldErrors<ContentFormSchema>;
}

export const ButtonFields: React.FC<ButtonFieldsProps> = ({ register, errors }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton</label>
        <Input
          {...register('buttonText')}
          placeholder="Exemple: En savoir plus"
          icon={<FileText className="w-4 h-4" />}
          error={errors.buttonText?.message}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Lien du bouton </label>
        <Input
          {...register('buttonLink')}
          placeholder="Exemple: /services ou https://exemple.com"
          icon={<Link className="w-4 h-4" />}
          error={errors.buttonLink?.message}
        />
      </div>
    </div>
  );
};
