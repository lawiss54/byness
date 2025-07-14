'use client';;
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Truck, Download, Package } from 'lucide-react';
import { Button } from '@/components/shared/ui';

interface BulkActionsProps {
  selectedCount: number;
  selectedOrders: string[];
  onStatusChange: (orderIds: string[], status: string) => void;
  onDownload: (orderIds: string[]) => void;
}

export default function BulkActions({ 
  selectedCount, 
  selectedOrders, 
  onStatusChange, 
  onDownload 
}: BulkActionsProps) {
  return (
    <motion.div
      className="bg-blue-50 border border-blue-200 rounded-lg p-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="text-blue-700 font-medium text-sm" aria-live="polite">
          {selectedCount} commande{selectedCount > 1 ? 's' : ''} sélectionnée{selectedCount > 1 ? 's' : ''}
        </span>
        
        <div className="flex flex-wrap items-center gap-2">
          {/* Status Change Buttons */}
          <Button
            size="sm"
            variant="outline"
            icon={<CheckCircle className="w-4 h-4" />}
            onClick={() => onStatusChange(selectedOrders, 'confirmed')}
            className="bg-white hover:bg-blue-50 border-blue-300 text-blue-700"
            aria-label="Confirmer les commandes sélectionnées"
          >
            Confirmer
          </Button>
          
          
          <Button
            size="sm"
            variant="outline"
            icon={<XCircle className="w-4 h-4" />}
            onClick={() => onStatusChange(selectedOrders, 'cancelled')}
            className="bg-white hover:bg-red-50 border-red-300 text-red-700"
            aria-label="Annuler les commandes sélectionnées"
          >
            Annuler
          </Button>
          
          {/* Download PDF Button */}
          <div className="w-px h-6 bg-blue-300 mx-2" />
          
          <Button
            size="sm"
            variant="primary"
            icon={<Download className="w-4 h-4" />}
            onClick={() => onDownload(selectedOrders)}
            className="bg-blue-600 hover:bg-blue-700"
            aria-label={`Télécharger le PDF de ${selectedCount} commande${selectedCount > 1 ? 's' : ''}`}
          >
            Télécharger PDF ({selectedCount})
          </Button>
        </div>
      </div>
    </motion.div>
  );
}