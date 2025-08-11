"use client"
import type React from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from "framer-motion"
import { X, Save, Upload, Type, Tag, Link, FileText } from 'lucide-react'
import { Button, Input } from '@/components/Dashboard/HomeHeroSection'
import { contentFormSchema, type ContentFormSchema } from '../utils/validationSchema'
import type { ContentSection } from '../utils/types'
import { useEffect } from 'react' // إضافة useEffect

interface ContentFormProps {
  showForm: boolean
  editingSection: ContentSection | null
  onSubmit: (data: ContentFormSchema) => Promise<void>
  onClose: () => void
  isLoading: boolean
}

/**
 * مكون نموذج إضافة/تعديل المحتوى
 */
export const ContentForm: React.FC<ContentFormProps> = ({
  showForm,
  editingSection,
  onSubmit,
  onClose,
  isLoading
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ContentFormSchema>({
    resolver: zodResolver(contentFormSchema),
    defaultValues: {
      title: "",
      badge: "",
      mainTitle: "",
      description: "",
      buttonText: "",
      buttonLink: "",
      image: "",
      isActive: true,
    }
  })

  // إضافة useEffect لتحديث النموذج عند التعديل
  useEffect(() => {
    if (editingSection) {
      reset({
        title: editingSection?.title,
        badge: editingSection?.badge,
        mainTitle: editingSection?.mainTitle,
        description: editingSection?.description,
        buttonText: editingSection?.buttonText,
        buttonLink: editingSection?.buttonLink,
        image: editingSection?.image,
        isActive: editingSection?.isActive,
      })
    } else {
      reset({
        title: "",
        badge: "",
        mainTitle: "",
        description: "",
        buttonText: "",
        buttonLink: "",
        image: "",
        isActive: true,
      })
    }
  }, [editingSection, reset])
  
  console.log(editingSection);

  const watchedImage = watch('image')

  /**
   * معالجة رفع الصور
   */
  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setValue('image', e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  /**
   * إغلاق النموذج وإعادة تعيينه
   */
  const handleClose = () => {
    reset({
      title: "",
      badge: "",
      mainTitle: "",
      description: "",
      buttonText: "",
      buttonLink: "",
      image: "",
      isActive: true,
    })
    onClose()
  }

  /**
   * إرسال النموذج
   */
  const handleFormSubmit = async (data: ContentFormSchema) => {
    await onSubmit(data)
    reset()
  }

  if (!showForm) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between rounded-t-xl">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {editingSection ? "Modifier le contenu" : "Ajouter nouveau contenu"}
          </h2>
          <Button
            size="sm"
            variant="ghost"
            icon={<X className="w-4 h-4" />}
            onClick={handleClose}
            className="flex-shrink-0"
          />
        </div>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre de la section (optionnel)
            </label>
            <Input
              {...register('title')}
              placeholder="Exemple: Section Hero"
              icon={<Type className="w-4 h-4" />}
              error={errors.title?.message}
            />
          </div>

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

          {/* Button Text and Link - Side by side on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton (optionnel)</label>
              <Input
                {...register('buttonText')}
                placeholder="Exemple: En savoir plus"
                icon={<FileText className="w-4 h-4" />}
                error={errors.buttonText?.message}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Lien du bouton (optionnel)</label>
              <Input
                {...register('buttonLink')}
                placeholder="Exemple: /services ou https://exemple.com"
                icon={<Link className="w-4 h-4" />}
                error={errors.buttonLink?.message}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image (optionnel)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center hover:border-blue-400 transition-colors">
              {watchedImage ? (
                <div className="space-y-4">
                  <img
                    src={watchedImage || "/placeholder.svg"}
                    alt="Aperçu"
                    className="max-h-32 sm:max-h-40 mx-auto rounded-lg"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setValue('image', '')}
                  >
                    Supprimer l'image
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-gray-400" />
                  <div>
                    <label className="cursor-pointer">
                      <span className="text-blue-600 hover:text-blue-700 text-sm sm:text-base">
                        Choisir un fichier
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleImageUpload(file)
                        }}
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG jusqu'à 5MB</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active Toggle */}
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

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 sm:pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
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
              {isLoading ? "Enregistrement en cours..." : editingSection ? "Mettre à jour" : "Enregistrer"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
