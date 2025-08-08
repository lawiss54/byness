'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/shared/ui';

interface BulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  onStatusChange: (status: 'active' | 'inactive') => void;
}

export default function BulkActions({ selectedCount, onDelete, onStatusChange }: BulkActionsProps) {
  return (
    <motion.div
      className="bg-blue-50 border border-blue-200 rounded-lg p-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="flex items-center justify-between">
        <span className="text-blue-700 font-medium">
          {selectedCount} catégorie(s) sélectionnée(s)
        </span>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={<CheckCircle className="w-4 h-4" />}
            onClick={() => onStatusChange('active')}
          >
            Activer
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            icon={<XCircle className="w-4 h-4" />}
            onClick={() => onStatusChange('inactive')}
          >
            Désactiver
          </Button>
          
          <Button
            size="sm"
            variant="destructive"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={onDelete}
          >
            Supprimer
          </Button>
        </div>
      </div>
    </motion.div>
  );
}