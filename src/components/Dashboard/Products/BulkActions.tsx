'use client';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/shared/ui';

interface BulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  onStatusChange: (status: 'active' | 'inactive') => void;
  bulkDeleteLoading: boolean;
  bulkStatusLoading: boolean;
}

export default function BulkActions({
  selectedCount,
  onDelete,
  onStatusChange,
  bulkDeleteLoading,
  bulkStatusLoading,
}: BulkActionsProps) {
  return (
    <motion.div
      className="bg-blue-50 border border-blue-200 rounded-lg p-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-blue-700 text-sm">
          {selectedCount} produit(s) sélectionné(s)
        </span>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={
              bulkStatusLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )
            }
            onClick={() => onStatusChange("active")}
            disabled={bulkStatusLoading}
          >
            Activer
          </Button>

          <Button
            size="sm"
            variant="outline"
            icon={
              bulkStatusLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <XCircle className="w-4 h-4" />
              )
            }
            onClick={() => onStatusChange("inactive")}
            disabled={bulkStatusLoading}
          >
            Désactiver
          </Button>

          <Button
            size="sm"
            variant="destructive"
            icon={
              bulkDeleteLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )
            }
            onClick={onDelete}
            disabled={bulkDeleteLoading}
          >
            Supprimer
          </Button>
        </div>
      </div>
    </motion.div>
  );
}