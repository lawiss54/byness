"use client"
import { motion } from "framer-motion"
import { Trash2, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/shared/ui"

interface BulkActionsProps {
  selectedCount: number
  onDelete: () => void
  onStatusChange: (status: "active" | "inactive") => void
}

export default function BulkActions({ selectedCount, onDelete, onStatusChange }: BulkActionsProps) {
  return (
    <motion.div
      className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6 shadow-sm"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-blue-800 font-semibold text-sm md:text-base">
            {selectedCount} catégorie{selectedCount > 1 ? "s" : ""} sélectionnée{selectedCount > 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatusChange("active")}
              className="flex-1 sm:flex-none border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Activer</span>
              <span className="sm:hidden">Activer</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onStatusChange("inactive")}
              className="flex-1 sm:flex-none border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400 transition-all duration-200"
            >
              <XCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Désactiver</span>
              <span className="sm:hidden">Désactiver</span>
            </Button>
          </div>

          <div className="w-full sm:w-auto">
            <Button
              size="sm"
              variant="destructive"
              onClick={onDelete}
              className="w-full sm:w-auto text-white bg-red-500 hover:bg-red-600 border-red-500 hover:border-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Trash2 className="w-4 h-4" />
              Supprimer
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
