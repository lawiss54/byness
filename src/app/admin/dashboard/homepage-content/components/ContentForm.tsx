"use client"
import type React from "react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from "framer-motion"
import { contentFormSchema, type ContentFormSchema } from '../utils/validationSchema'
import type { ContentSection } from '../utils/types'
import { useEffect } from 'react'
import { FormHeader } from './form-parts/FormHeader'
import { FormFields } from './form-parts/FormFields'
import { ButtonFields } from './form-parts/ButtonFields'
import { ImageUpload } from './form-parts/ImageUpload'
import { StatusToggle } from './form-parts/StatusToggle'
import { FormActions } from './form-parts/FormActions'

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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-full overflow-auto"
      >
        <FormHeader isEditing={!!editingSection} onClose={handleClose} />
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 sm:p-6 space-y-4 sm:space-y-6"> 
          <FormFields register={register} errors={errors} />
          <ButtonFields register={register} errors={errors} />
          <ImageUpload
            watchedImage={watchedImage}
            onImageUpload={handleImageUpload}
            onRemoveImage={() => setValue('image', '')}
          />
          <StatusToggle register={register} />
          <FormActions
            isLoading={isLoading}
            isEditing={!!editingSection}
            onClose={handleClose}
          />
        </form>
      </motion.div>
    </motion.div>
  )
}
