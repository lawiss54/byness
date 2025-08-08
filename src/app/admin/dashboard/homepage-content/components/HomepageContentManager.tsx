"use client"
import type React from "react"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Plus, Eye } from 'lucide-react'
import { useContentSections } from '../hooks/useContentSections'
import { useContentForm } from '../hooks/useContentForm'
import { Button } from './common/Button'
import { StatisticsCards } from './StatisticsCards'
import { ContentSectionsList } from './ContentSectionsList'
import { PreviewMode } from './PreviewMode'
import { ContentForm } from './ContentForm'
import type { ContentSection } from '../utils/types'

interface HomepageContentManagerProps {
  initialSections: ContentSection[];
}

/**
 * الصفحة الرئيسية لإدارة محتوى الصفحة الرئيسية
 */
export default function HomepageContentManager({ initialSections }: HomepageContentManagerProps) {
  // حالة المعاينة
  const [previewMode, setPreviewMode] = useState(false)

  // استخدام hooks مخصصة
  const {
    sections,
    loading,
    statusButton,
    buttonLoading,
    statistics,
    setSections,
    handleDelete,
    handleToggleActive,
    handleReorder,
  } = useContentSections({ initialSections })

  const {
    showForm,
    setShowForm,
    editingSection,
    buttonLoading: formButtonLoading,
    resetForm,
    handleEdit,
    handleSubmit,
  } = useContentForm(sections, setSections)

  // عرض شاشة التحميل
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen space-y-4 sm:space-y-6 p-3 sm:p-6 bg-gray-50">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
            Gestion du contenu de la page d'accueil
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
            Ajouter et modifier les sections de contenu de la page d'accueil
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <Button
            onClick={() => setShowForm(true)}
            icon={<Plus className="w-4 h-4" />}
            className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
            size="sm"
          >
            <span className="hidden sm:inline">Ajouter nouveau contenu</span>
            <span className="sm:hidden">Ajouter</span>
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <StatisticsCards sections={sections} />

      {/* Content Sections List */}
      <ContentSectionsList
        sections={sections}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleActive={handleToggleActive}
        onReorder={handleReorder}
        statusButton={statusButton}
        buttonLoading={buttonLoading}
        onShowForm={() => setShowForm(true)}
      />

      {/* Preview Mode */}
      <PreviewMode sections={sections} previewMode={previewMode} />

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        <ContentForm
          showForm={showForm}
          editingSection={editingSection}
          onSubmit={handleSubmit}
          onClose={resetForm}
          isLoading={formButtonLoading}
        />
      </AnimatePresence>
    </div>
  )
}
