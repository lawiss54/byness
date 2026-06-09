import type React from "react"
import { Input } from '@/components/Dashboard/HomeHeroSection'
import { Link, FileText } from 'lucide-react'
import type { FieldErrors, Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import type { ContentFormSchema } from '../../utils/validationSchema'

interface ButtonFieldsProps {
  control: Control<ContentFormSchema>;
  errors: FieldErrors<ContentFormSchema>;
}

export const ButtonFields: React.FC<ButtonFieldsProps> = ({ control, errors }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton</label>
        <Controller
          name="buttonText"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Exemple: En savoir plus"
              icon={<FileText className="w-4 h-4" />}
              error={errors.buttonText?.message}
            />
          )}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Lien du bouton </label>
        <Controller
          name="buttonLink"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Exemple: /services ou https://exemple.com"
              icon={<Link className="w-4 h-4" />}
              error={errors.buttonLink?.message}
            />
          )}
        />
      </div>
    </div>
  );
};
