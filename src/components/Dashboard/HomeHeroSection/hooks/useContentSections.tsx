import { useState, useEffect, useCallback, useMemo } from 'react'
import { ContentService } from '../services/contentService'
import { toast } from '../utils/toast'
import type { ContentSection } from '../utils/types'

/**
 * Hook لإدارة أقسام المحتوى
 */
export const useContentSections = () => {
  const [sections, setSections] = useState<ContentSection[]>([])
  const [loading, setLoading] = useState(false)
  const [statusButton, setStatusButton] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)

  /**
   * تحميل الأقسام من الخادم
   */
  const loadSections = useCallback(async () => {
    try {
      setLoading(true)
      const data = await ContentService.loadSections()
      setSections(data)
      toast.success("تم تحميل البيانات بنجاح")
      console.log("البيانات الأصلية:", data)
    } catch (error) {
      console.error("خطأ في تحميل البيانات:", error)
      toast.error("Erreur lors du chargement du contenu")
      setSections([])
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * حفظ الأقسام (محاكاة)
   */
  const saveSections = useCallback(async (updatedSections: ContentSection[]) => {
    try {
      setLoading(true)
      // محاكاة استدعاء API
      await new Promise((resolve) => setTimeout(resolve, 500))
      setSections(updatedSections)
      toast.success("Contenu sauvegardé avec succès")
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde du contenu")
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * حذف قسم
   */
  const handleDelete = useCallback(async (sectionId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce contenu ?")) {
      setButtonLoading(true)
      try {
        const response = await ContentService.deleteSection(sectionId)
        toast.success(response.message)
        const updatedSections = sections.filter((section) => section.id !== sectionId)
        await saveSections(updatedSections)
      } catch (error) {
        toast.error("Une erreur s'est produite lors de la suppression")
      } finally {
        setButtonLoading(false)
      }
    }
  }, [sections, saveSections])

  /**
   * تغيير حالة القسم
   */
  const handleToggleActive = useCallback(async (sectionId: string) => {
    try {
      setStatusButton(true)
      const currentSection = sections.find((section) => section.id === sectionId)
      if (!currentSection) {
        toast.error("ال��سم غير موجود")
        return
      }

      const newActiveStatus = !currentSection.isActive
      const response = await ContentService.toggleSectionStatus(sectionId, newActiveStatus)
      toast.success(response.message)

      const updatedSections = sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            isActive: newActiveStatus,
            updatedAt: new Date().toISOString(),
          }
        }
        return section
      })
      setSections(updatedSections)
    } catch (error) {
      console.error("خطأ في تغيير الحالة:", error)
      toast.error("Une erreur s'est produite lors de la connexion au serveur")
    } finally {
      setStatusButton(false)
    }
  }, [sections])

  /**
   * إعادة ترتيب الأقسام
   */
  const handleReorder = useCallback(async (sectionId: string, direction: "up" | "down") => {
    const sectionIndex = sections.findIndex((s) => s.id === sectionId)
    if ((direction === "up" && sectionIndex === 0) || (direction === "down" && sectionIndex === sections.length - 1)) {
      return
    }

    const newSections = [...sections]
    const targetIndex = direction === "up" ? sectionIndex - 1 : sectionIndex + 1
    ;[newSections[sectionIndex], newSections[targetIndex]] = [newSections[targetIndex], newSections[sectionIndex]]

    newSections.forEach((section, index) => {
      section.order = index + 1
      section.updatedAt = new Date().toISOString()
    })

    try {
      const response = await ContentService.reorderSections(newSections)
      toast.success(response.message)
      await saveSections(newSections)
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la réorganisation")
    }
  }, [sections, saveSections])

  // تحميل البيانات عند تحميل المكون
  useEffect(() => {
    if (typeof window === "undefined") return
    loadSections()
  }, [loadSections])

  // حساب الإحصائيات باستخدام useMemo لتحسين الأداء
  const statistics = useMemo(() => ({
    total: sections?.length || 0,
    active: sections?.filter((s) => s.isActive).length || 0,
    hidden: sections?.filter((s) => !s?.isActive)?.length || 0,
    lastUpdate: sections?.length > 0
      ? new Date(Math.max(...sections?.map((s) => new Date(s.updatedAt)?.getTime()))).toLocaleDateString("fr-FR")
      : "Aucune"
  }), [sections])

  return {
    sections,
    loading,
    statusButton,
    buttonLoading,
    statistics,
    setSections,
    handleDelete,
    handleToggleActive,
    handleReorder,
    loadSections,
    saveSections,
  }
}
