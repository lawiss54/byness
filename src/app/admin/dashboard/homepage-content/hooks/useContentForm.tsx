import { useState, useCallback } from 'react'
import { ContentService } from '../services/contentService'
import { toast } from '../utils/toast'
import type { ContentSection } from '../utils/types'
import type { ContentFormSchema } from '../utils/validationSchema'

/**
 * Hook لإدارة نموذج المحتوى
 */
export const useContentForm = (
  sections: ContentSection[],
  setSections: React.Dispatch<React.SetStateAction<ContentSection[]>>
) => {
  const [showForm, setShowForm] = useState(false)
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null)
  const [buttonLoading, setButtonLoading] = useState(false)

  /**
   * إعادة تعيين النموذج
   */
  const resetForm = useCallback(() => {
    setEditingSection(null)
    setShowForm(false)
  }, [])

  /**
   * تحضير النموذج للتعديل
   */
  const handleEdit = useCallback((section: ContentSection) => {
    setEditingSection(section)
    setShowForm(true)
  }, [])

  /**
   * إرسال النموذج
   */
  const handleSubmit = useCallback(async (data: ContentFormSchema) => {
    try {
      setButtonLoading(true)

      if (editingSection) {
        // تحديث القسم الموجود
        const result = await ContentService.updateSection(editingSection.id, data)

        const newSection: ContentSection = {
          ...editingSection,
          badge: data.badge || "",
          mainTitle: data.mainTitle,
          description: data.description,
          buttonText: data.buttonText || "",
          buttonLink: data.buttonLink || "",
          image: data.image || "",
          isActive: data.isActive,
          updatedAt: new Date().toISOString(),
        }

        const updatedSections = sections.map((section) =>
          section.id === editingSection.id ? newSection : section
        )
        setSections(updatedSections)
        toast.success(result.message || "La section a été mise à jour avec succès");
      } else {
        // إنشاء قسم جديد
        const result = await ContentService.createSection(data)

        const newSection: ContentSection = {
          id: result.data?.id?.toString() || Date.now().toString(),
          badge: data.badge || "",
          mainTitle: data.mainTitle,
          description: data.description,
          buttonText: data.buttonText || "",
          buttonLink: data.buttonLink || "",
          image: data.image || "",
          isActive: data.isActive,
          order: sections.length + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        setSections((prevSections) => [...prevSections, newSection])
        toast.success(result.message || "La section a été créée avec succès")
      }

      resetForm()
    } catch (error) {
      console.error(" Erreur au handleSubmit:", error)
      if (error instanceof TypeError && error.message.includes("fetch")) {
        toast.error("Erreur de connexion au serveur, veuillez réessayer")
      } else if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Une erreur inattendue s’est produite")
      }
    } finally {
      setButtonLoading(false)
    }
  }, [editingSection, sections, setSections, resetForm])

  return {
    showForm,
    setShowForm,
    editingSection,
    buttonLoading,
    resetForm,
    handleEdit,
    handleSubmit,
  }
}
