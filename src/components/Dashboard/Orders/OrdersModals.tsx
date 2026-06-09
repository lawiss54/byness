import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { OrderDetails } from '@/app/admin/dashboard/orders/components/OrderDetails';
import OrderEdit  from '@/app/admin/dashboard/orders/components/OrderEdit';
import { ModalTéléchargementPDF } from './ModalTéléchargementPDF';

interface OrdersModalsProps {
  showOrderDetails: boolean;
  showOrderEdit: boolean;
  showPdfModal: boolean;
  currentOrder: any;
  pdfUrl: string;
  onCloseDetails: () => void;
  onCloseEdit: () => void;
  onClosePdf: () => void;
  onEdit: () => void;
  onSave: (updatedOrder: any) => void;
  setPdfUrl: (url: string) => void;
  setShowPdfModal: (show: boolean) => void;
}

export function OrdersModals({
  showOrderDetails,
  showOrderEdit,
  showPdfModal,
  currentOrder,
  pdfUrl,
  onCloseDetails,
  onCloseEdit,
  onClosePdf,
  onEdit,
  onSave,
  setPdfUrl,
  setShowPdfModal
}: OrdersModalsProps) {
  return (
    <AnimatePresence>
      {showOrderDetails && currentOrder && (
        <OrderDetails
          order={currentOrder}
          onClose={onCloseDetails}
          onEdit={onEdit}
        />
      )}
      {showOrderEdit && currentOrder && (
        <OrderEdit
          order={currentOrder}
          onSave={onSave}
          onClose={onCloseEdit}
          setPdfUrl={setPdfUrl}
          setShowPdfModal={setShowPdfModal}
        />
      )}
      {showPdfModal && (
        <ModalTéléchargementPDF
          onClose={onClosePdf}
          pdfUrl={pdfUrl}
        />
      )}
    </AnimatePresence>
  );
}
