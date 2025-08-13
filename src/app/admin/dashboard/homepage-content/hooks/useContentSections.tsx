import { useState, useCallback, useMemo } from 'react';
import { ContentService } from '../services/contentService';
import { toast } from '../utils/toast';
import type { ContentSection } from '../utils/types';

interface UseContentSectionsProps {
  initialSections?: ContentSection[];
}

/**
 * Hook لإدارة أقسام المحتوى
 */
export const useContentSections = ({ initialSections = [] }: UseContentSectionsProps) => {
  const [sections, setSections] = useState<ContentSection[]>(initialSections);
  const [loading, setLoading] = useState(false);
  const [statusButton, setStatusButton] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  /**
   * تحميل الأقسام من الخادم
   */
  const loadSections = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ContentService.loadSections();
      setSections(data);
      toast.success("Les données ont été chargées avec succès");
    } catch (error) {
      console.error(" Erreur lors du chargement des données  :", error);
      toast.error("Erreur lors du chargement du contenu");
      setSections([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * حفظ الأقسام (محاكاة)
   */
  const saveSections = useCallback(async (updatedSections: ContentSection[]) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSections(updatedSections);
      toast.success("Contenu sauvegardé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde du contenu");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * حذف قسم
   */
  const handleDelete = useCallback(async (sectionId: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce contenu ?")) {
      setButtonLoading(true);
      try {
        const response = await ContentService.deleteSection(sectionId);
        toast.success(response.message);
        const updatedSections = sections.filter((section) => section.id !== sectionId);
        await saveSections(updatedSections);
      } catch (error) {
        toast.error("Une erreur s'est produite lors de la suppression");
      } finally {
        setButtonLoading(false);
      }
    }
  }, [sections, saveSections]);

  /**
   * تغيير حالة القسم
   */
  const handleToggleActive = useCallback(async (sectionId: string, newStatus: boolean) => {
    setButtonLoading(true);
    try {
      const toggleActive = await ContentService.toggleSectionStatus(sectionId, newStatus);
      toast.success(toggleActive.message);
      const updatedSections = sections.filter((section) => section.id !== sectionId);
      await saveSections(updatedSections);
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la suppression");
    } finally {
        setButtonLoading(false);
    }
  }, [sections, saveSections]);

  /**
   * إعادة ترتيب الأقسام
   */
  const handleReorder = useCallback(async (sectionId: string, direction: "up" | "down") => {
    setButtonLoading(true);
    try {
      const toggleActive = await ContentService.reorderSections(sectionId, direction);
      toast.success(toggleActive.message);
      const updatedSections = sections.filter((section) => section.id !== sectionId);
      await saveSections(updatedSections);
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la suppression");
    } finally {
        setButtonLoading(false);
    }
  }, [sections, saveSections]);

  // The useEffect for initial loading is removed.

  // حساب الإحصائيات باستخدام useMemo لتحسين الأداء
  const statistics = useMemo(() => ({
    total: sections?.length || 0,
    active: sections?.filter((s) => s.isActive).length || 0,
    hidden: sections?.filter((s) => !s?.isActive)?.length || 0,
    lastUpdate: sections?.length > 0
      ? new Date(Math.max(...sections?.map((s) => new Date(s.updatedAt)?.getTime()))).toLocaleDateString("fr-FR")
      : "Aucune"
  }), [sections]);

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
  };
};