import { useState, useCallback } from 'react'
import { ContentService } from '../services/contentService'
import { toast } from '../utils/toast'
import type { ContentSection } from '../utils/types'
import type { ContentFormSchema } from '../utils/validationSchema'
import { convertToCamelCase } from '../utils/convertToCamelCase'

/**
 * Hook لإدارة نموذج المحتوى
 */
export const useContentForm = (
  sections: ContentSection[],
  setSections: React.Dispatch<React.SetStateAction<ContentSection[]>>
) => {
  const [showForm, setShowForm] = useState(false)
  const [editingSection, setEditingSection] = useState<ContentSection | null>(
    null
  )
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
  const handleSubmit = useCallback(
    async (data: ContentFormSchema) => {
      setButtonLoading(true)
      try {
        let result

        if (editingSection) {
          // تحديث القسم الموجود
          result = await ContentService.updateSection(editingSection.id, data)
          const updatedSection = convertToCamelCase(
            result.data
          ) as ContentSection
          const updatedSections = sections.map((section) =>
            section.id === editingSection.id ? updatedSection : section
          )
          setSections(updatedSections)
        } else {
          // إنشاء قسم جديد
          result = await ContentService.createSection(data)
          const newSection = convertToCamelCase(result.data) as ContentSection
          setSections((prevSections) => [...prevSections, newSection])
        }

        toast.success(
          result.message || "L'opération a été effectuée avec succès"
        )
        resetForm()
      } catch (error) {
        console.error("Erreur lors de la soumission du formulaire:", error)
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Une erreur inattendue s’est produite"
        toast.error(errorMessage)
      } finally {
        setButtonLoading(false)
      }
    },
    [editingSection, sections, setSections, resetForm]
  )

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
