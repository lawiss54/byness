'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/shared/ui';
import { CheckCircle, Download, X } from 'lucide-react';

interface Props {
  onClose: () => void;
  pdfUrl: string;
}

export function ModalTéléchargementPDF({ onClose, pdfUrl }: Props) {
  const handleDownload = () => {
    if (typeof window === 'undefined') return;
    
    window.open(pdfUrl, '_blank');
    onClose();
  };
  
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <CheckCircle className="w-14 h-14 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Bordereau prêt à télécharger
        </h2>
        <p className="text-gray-600 mb-6">
          Votre bordereau a été généré avec succès. Cliquez sur le bouton ci-dessous pour le télécharger.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={onClose} icon={<X className="w-4 h-4" />}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleDownload} icon={<Download className="w-4 h-4" />}>
            Télécharger
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}