"use client"
import type React from "react"
import { motion } from "framer-motion"
import { Edit, Trash2, Eye, EyeOff, ImageIcon, ArrowUp, ArrowDown, ExternalLink, Plus, Layout } from 'lucide-react'
import { Button } from './components/Button'
import { Badge } from './components/Badge'
import { Card } from './components/Card'
import type { ContentSection } from './utils/types'

interface ContentSectionsListProps {
  sections: ContentSection[]
  onEdit: (section: ContentSection) => void
  onDelete: (sectionId: string) => void
  onToggleActive: (sectionId: string) => void
  onReorder: (sectionId: string, direction: "up" | "down") => void
  statusButton: boolean
  buttonLoading: boolean
  onShowForm: () => void
}

/**
 * مكون عرض قائمة أقسام المحتوى
 */
export const ContentSectionsList: React.FC<ContentSectionsListProps> = ({
  sections,
  onEdit,
  onDelete,
  onToggleActive,
  onReorder,
  statusButton,
  buttonLoading,
  onShowForm
}) => {
  if (sections?.length === 0) {
    return (
      <Card className="overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Sections de contenu</h2>
        </div>
        <div className="p-6 sm:p-12 text-center">
          <Layout className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-300" />
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Aucune section de contenu</h3>
          <p className="text-gray-500 mb-4 sm:mb-6 text-sm sm:text-base">
            Commencez par ajouter une nouvelle section de contenu à la page d'accueil
          </p>
          <Button
            onClick={onShowForm}
            icon={<Plus className="w-4 h-4" />}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Ajouter première section
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Sections de contenu</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {sections
          ?.sort((a, b) => a.order - b.order)
          ?.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 sm:p-6"
            >
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                {/* Section Image */}
                <div className="flex-shrink-0 self-start">
                  {section.image ? (
                    <img
                      src={section.image || "/placeholder.svg"}
                      alt={section.mainTitle}
                      className="w-full lg:w-20 xl:w-24 h-20 xl:h-24 object-cover rounded-lg border border-gray-200"
                    />
                  ) : (
                    <div className="w-full lg:w-20 xl:w-24 h-20 xl:h-24 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                      <ImageIcon className="w-6 h-6 xl:w-8 xl:h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Section Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                        {section.title || section.mainTitle}
                      </h3>
                      {section.badge && (
                        <Badge variant="info" size="sm">
                          {section.badge}
                        </Badge>
                      )}
                      <Badge variant={section.isActive ? "success" : "default"} size="sm">
                        {section.isActive ? "Actif" : "Masqué"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                      <span>Ordre: {section.order}</span>
                    </div>
                  </div>
                  
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {section.mainTitle}
                  </h4>
                  
                  <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base">
                    {section.description}
                  </p>
                  
                  {section.buttonText && (
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <Button size="sm" variant="outline" className="pointer-events-none bg-transparent">
                        {section.buttonText}
                      </Button>
                      {section.buttonLink && (
                        <a
                          href={section.buttonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                  
                  <div className="text-xs sm:text-sm text-gray-500">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span>Créé le: {new Date(section.createdAt).toLocaleDateString("fr-FR")}</span>
                      <span className="hidden sm:inline">|</span>
                      <span>Mis à jour: {new Date(section.updatedAt).toLocaleDateString("fr-FR")}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2 lg:gap-1 flex-wrap lg:flex-nowrap">
                  {/* Reorder buttons */}
                  <div className="flex lg:flex-col gap-1 order-1 lg:order-1">
                    <Button
                      size="xs"
                      variant="ghost"
                      icon={<ArrowUp className="w-3 h-3 sm:w-4 sm:h-4" />}
                      onClick={() => onReorder(section.id, "up")}
                      disabled={index === 0}
                      title="Déplacer vers le haut"
                      className="min-w-[28px] sm:min-w-[32px]"
                    >
                      <span className="sr-only">Haut</span>
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      icon={<ArrowDown className="w-3 h-3 sm:w-4 sm:h-4" />}
                      onClick={() => onReorder(section.id, "down")}
                      disabled={index === sections.length - 1}
                      title="Déplacer vers le bas"
                      className="min-w-[28px] sm:min-w-[32px]"
                    >
                      <span className="sr-only">Bas</span>
                    </Button>
                  </div>

                  {/* Edit and visibility buttons */}
                  <div className="flex lg:flex-col gap-1 order-2 lg:order-2">
                    <Button
                      size="xs"
                      variant="ghost"
                      icon={<Edit className="w-3 h-3 sm:w-4 sm:h-4" />}
                      onClick={() => onEdit(section)}
                      title="Modifier"
                      className="min-w-[28px] sm:min-w-[32px]"
                    >
                      <span className="sr-only">Modifier</span>
                    </Button>
                    <Button
                      size="xs"
                      variant="ghost"
                      icon={
                        statusButton ? (
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
                        ) : section.isActive ? (
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" />
                        )
                      }
                      onClick={() => onToggleActive(section.id)}
                      title={section.isActive ? "Masquer" : "Afficher"}
                      disabled={statusButton}
                      className="min-w-[28px] sm:min-w-[32px]"
                    >
                      <span className="sr-only">{section.isActive ? "Masquer" : "Afficher"}</span>
                    </Button>
                  </div>

                  {/* Delete button */}
                  <div className="flex lg:flex-col gap-1 order-3 lg:order-3">
                    <Button
                      size="xs"
                      variant="ghost"
                      icon={
                        buttonLoading ? (
                          <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        )
                      }
                      onClick={() => onDelete(section.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 min-w-[28px] sm:min-w-[32px]"
                      title="Supprimer"
                      disabled={buttonLoading}
                    >
                      <span className="sr-only">Supprimer</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </Card>
  )
}
