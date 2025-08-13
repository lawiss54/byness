import type React from "react"
import { Card } from '@/components/Dashboard/HomeHeroSection'
import { Layout, Eye, EyeOff, Home } from 'lucide-react'
import type { ContentSection } from '../utils/types'

interface StatisticsCardsProps {
  sections: ContentSection[]
}

/**
 * مكون بطاقات الإحصائيات
 */
export const StatisticsCards: React.FC<StatisticsCardsProps> = ({ sections }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <Card className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-gray-600 truncate">Total sections</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{sections?.length}</p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Layout className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
          </div>
        </div>
      </Card>

      <Card className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-gray-600 truncate">Sections actives</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600">
              {sections?.filter((s) => s.isActive).length}
            </p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </div>
        </div>
      </Card>

      <Card className="p-3 sm:p-4">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-gray-600 truncate">Sections masquées</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-600">
              {sections?.filter((s) => !s?.isActive)?.length}
            </p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </div>
        </div>
      </Card>

      <Card className="p-3 sm:p-4 col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-gray-600 truncate">Dernière mise à jour</p>
            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
              {sections?.length > 0
                ? new Date(Math.max(...sections?.map((s) => new Date(s.updatedAt)?.getTime()))).toLocaleDateString(
                  "fr-FR",
                )
                : "Aucune"}
            </p>
          </div>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Home className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
          </div>
        </div>
      </Card>
    </div>
  )
}