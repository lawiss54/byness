"use client"

import { motion } from "framer-motion"
import { CheckCircle, XCircle, Download } from "lucide-react"
import { Button } from "@/components/shared/ui"

interface BulkActionsProps {
  selectedCount: number
  selectedOrders: string[]
  onStatusChange: (orderIds: string[], status: string) => void
  onDownload: (orderIds: string[]) => void
}

export default function BulkActions({ selectedCount, selectedOrders, onStatusChange, onDownload }: BulkActionsProps) {
  return (
    <motion.div
      className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mx-2 sm:mx-0"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
        {/* Counter Section */}
        <div className="flex-shrink-0">
          <span className="text-blue-700 font-medium text-sm sm:text-base" aria-live="polite">
            {selectedCount} commande{selectedCount > 1 ? "s" : ""} sélectionnée{selectedCount > 1 ? "s" : ""}
          </span>
        </div>

        {/* Actions Section */}
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-3 min-w-0">
          {/* Status Buttons Container */}
          <div className="flex flex-col xs:flex-row gap-2 min-w-0">
            <Button
              size="sm"
              variant="outline"
              icon={<CheckCircle className="w-4 h-4 flex-shrink-0 bg-transparent" />}
              onClick={() => onStatusChange(selectedOrders, "confirmed")}
              className="bg-white hover:bg-blue-50 border-blue-300 text-blue-700 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 min-w-0 flex-1 xs:flex-initial justify-center"
              aria-label="Confirmer les commandes sélectionnées"
            >
              <span className="truncate">Confirmer</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              icon={<XCircle className="w-4 h-4 flex-shrink-0 bg-transparent" />}
              onClick={() => onStatusChange(selectedOrders, "cancelled")}
              className="bg-white hover:bg-red-50 border-red-300 text-red-700 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 min-w-0 flex-1 xs:flex-initial justify-center"
              aria-label="Annuler les commandes sélectionnées"
            >
              <span className="truncate">Annuler</span>
            </Button>
          </div>

          {/* Separator - hidden on mobile */}
          <div className="hidden sm:block w-px h-6 bg-blue-300 mx-1" />

          {/* Download Button */}
          <div className="flex-shrink-0">
            <Button
              size="sm"
              variant="primary"
              icon={<Download className="w-4 h-4 flex-shrink-0" />}
              onClick={() => onDownload(selectedOrders)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2 w-full xs:w-auto justify-center"
              aria-label={`Télécharger le PDF de ${selectedCount} commande${selectedCount > 1 ? "s" : ""}`}
            >
              <span className="truncate">
                <span className="hidden xs:inline">Télécharger PDF </span>
                <span className="xs:hidden">PDF </span>({selectedCount})
              </span>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
