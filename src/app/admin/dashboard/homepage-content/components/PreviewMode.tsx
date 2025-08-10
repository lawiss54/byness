"use client"
import type React from "react"
import { motion } from "framer-motion"
import { Eye, ExternalLink } from 'lucide-react'
import { Button, Badge, Card} from '@/components/Dashboard/HomeHeroSection'
import type { ContentSection } from '../utils/types'

interface PreviewModeProps {
  sections: ContentSection[]
  previewMode: boolean
}

/**
 * مكون معاينة الصفحة الرئيسية
 */
export const PreviewMode: React.FC<PreviewModeProps> = ({ sections, previewMode }) => {
  if (!previewMode) return null

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
        </div>
        <div className="min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Aperçu de la page d'accueil</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Comment les sections apparaîtront sur la page d'accueil
          </p>
        </div>
      </div>
      
      <div className="space-y-6 sm:space-y-8">
        {sections
          .filter((section) => section.isActive)
          .sort((a, b) => a.order - b.order)
          .map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 sm:p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
                <div className="space-y-4 sm:space-y-6">
                  {section.badge && (
                    <Badge variant="info" className="w-fit">
                      {section.badge}
                    </Badge>
                  )}
                  <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 leading-tight">
                    {section.mainTitle}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{section.description}</p>
                  {section.buttonText && (
                    <Button className="bg-blue-600 hover:bg-blue-700" icon={<ExternalLink className="w-4 h-4" />}>
                      {section.buttonText}
                    </Button>
                  )}
                </div>
                {section.image && (
                  <div className="order-first lg:order-last">
                    <img
                      src={section.image || "/placeholder.svg"}
                      alt={section.mainTitle}
                      className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-xl shadow-lg"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
      </div>
    </Card>
  )
}
