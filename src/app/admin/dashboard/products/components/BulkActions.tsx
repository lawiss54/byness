"use client"
import { motion } from "framer-motion"
import { Trash2, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/shared/ui"
import { cn } from "@/lib/utils"

interface BulkActionsProps {
  selectedCount: number
  onDelete: () => void
  onStatusChange: (status: "active" | "inactive") => void
  bulkDeleteLoading: boolean
  bulkStatusLoading: boolean
  className?: string
}

export default function BulkActions({
  selectedCount,
  onDelete,
  onStatusChange,
  bulkDeleteLoading,
  bulkStatusLoading,
  className,
}: BulkActionsProps) {
  return (
    <motion.div
      className={cn(
        "bg-primary/5 border border-primary/20 rounded-lg p-3 sm:p-4 shadow-sm",
        "backdrop-blur-sm transition-all duration-200 w-full max-w-full overflow-hidden",
        className,
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-4 w-full">
        <div className="flex items-center gap-2 flex-shrink-0 min-w-0">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse flex-shrink-0" />
          <span className="text-primary font-medium text-sm truncate">
            {selectedCount} produit{selectedCount > 1 ? "s" : ""} sélectionné{selectedCount > 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap xs:ml-auto w-full xs:w-auto justify-start xs:justify-end">
          <Button
            size="sm"
            variant="outline"
            className={cn(
              "transition-all duration-200 hover:bg-green-50 hover:border-green-200",
              "focus:ring-2 focus:ring-green-500/20 flex-shrink-0",
              "text-xs xs:text-sm px-2 xs:px-3 h-8 xs:h-9",
            )}
            onClick={() => onStatusChange("active")}
            disabled={bulkStatusLoading || bulkDeleteLoading}
          >
            {bulkStatusLoading ? (
              <Loader2 className="w-3 h-3 xs:w-4 xs:h-4 animate-spin mr-1 xs:mr-2" />
            ) : (
              <CheckCircle className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2 text-green-600" />
            )}
            <span className="xs:inline hidden">Activer</span>
            <span className="xs:hidden inline">✓</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            className={cn(
              "transition-all duration-200 hover:bg-orange-50 hover:border-orange-200",
              "focus:ring-2 focus:ring-orange-500/20 flex-shrink-0",
              "text-xs xs:text-sm px-2 xs:px-3 h-8 xs:h-9",
            )}
            onClick={() => onStatusChange("inactive")}
            disabled={bulkStatusLoading || bulkDeleteLoading}
          >
            {bulkStatusLoading ? (
              <Loader2 className="w-3 h-3 xs:w-4 xs:h-4 animate-spin mr-1 xs:mr-2" />
            ) : (
              <XCircle className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2 text-orange-600" />
            )}
            <span className="xs:inline hidden">Désactiver</span>
            <span className="xs:hidden inline">✗</span>
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className={cn(
              "transition-all duration-200 hover:shadow-md flex-shrink-0",
              "focus:ring-2 focus:ring-destructive/20",
              "text-xs xs:text-sm px-2 xs:px-3 h-8 xs:h-9",
            )}
            onClick={onDelete}
            disabled={bulkDeleteLoading || bulkStatusLoading}
          >
            {bulkDeleteLoading ? (
              <Loader2 className="w-3 h-3 xs:w-4 xs:h-4 animate-spin mr-1 xs:mr-2" />
            ) : (
              <Trash2 className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
            )}
            <span className="xs:inline hidden">Supprimer</span>
            <span className="xs:hidden inline">🗑</span>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
