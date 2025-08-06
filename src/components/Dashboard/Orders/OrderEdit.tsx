'use client';

import { motion } from 'framer-motion';
import { Loader } from '@/components/shared';
import { ProductsTableModal } from './ProductsTableModal';
import { useOrderEdit } from './hooks/useOrderEdit';
import type { OrderEditProps } from './types/orderEdit';

// Import the components
import { OrderEditHeader } from './OrderEdit/OrderEditHeader';
import { OrderEditCustomerInfo } from './OrderEdit/OrderEditCustomerInfo';
import { OrderEditShippingInfo } from './OrderEdit/OrderEditShippingInfo';
import { OrderEditProductsList } from './OrderEdit/OrderEditProductsList';
import { OrderEditSummary } from './OrderEdit/OrderEditSummary';
import { OrderEditFooter } from './OrderEdit/OrderEditFooter';

export function OrderEdit({ order, onSave, onClose, setShowPdfModal, setPdfUrl }: OrderEditProps) {
  const {
    // Form
    control,
    handleSubmit,
    errors,
    isSubmitting,
    fields,
    append,

    // Watched values
    watchedItems,
    watchedShippingType,
    watchedIsFreeShipping,
    watchedDeskId,
    watchedStatus,
    needsExchange,

    // Data
    shippingData,
    loading,
    selectedWilayaId,
    selectedWilayaShipping,
    availableDesks,
    currentShippingPrice,
    activeProducts,

    // Modals
    openAddProductModel,
    handleCloseProductModal,

    // Handlers
    handleQuantityChange,
    handleAddNewItem,
    handleRemoveItem,
    handleWilayaChange,
    handleShippingTypeChange,
    setValue,

    // Calculations
    calculateTotal,
  } = useOrderEdit(order, onSave, setPdfUrl, setShowPdfModal);

  if (loading) {
    return <Loader type="fashion" size="lg" text="Chargement..." overlay={true} />;
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-full overflow-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <OrderEditHeader orderId={order.id} onClose={onClose} />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Customer & Shipping Info */}
              <div className="space-y-6">
                <OrderEditCustomerInfo control={control} errors={errors} />
                
                <OrderEditShippingInfo
                  control={control}
                  errors={errors}
                  shippingData={shippingData}
                  selectedWilayaId={selectedWilayaId}
                  setSelectedWilayaId={handleWilayaChange}
                  setValue={setValue}
                  watchedShippingType={watchedShippingType}
                  selectedWilayaShipping={selectedWilayaShipping}
                  availableDesks={availableDesks}
                  watchedDeskId={watchedDeskId}
                  watchedStatus={watchedStatus}
                  watchedIsFreeShipping={watchedIsFreeShipping}
                  needsExchange={needsExchange}
                />
              </div>

              {/* Right Column - Products & Summary */}
              <div className="space-y-6">
                <OrderEditProductsList
                  control={control}
                  errors={errors}
                  fields={fields}
                  watchedItems={watchedItems}
                  handleQuantityChange={handleQuantityChange}
                  addNewItem={handleAddNewItem}
                  removeItem={handleRemoveItem}
                />
                
                <OrderEditSummary
                  watchedItems={watchedItems}
                  currentShippingPrice={currentShippingPrice}
                  watchedIsFreeShipping={watchedIsFreeShipping}
                  calculateTotal={calculateTotal}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <OrderEditFooter onClose={onClose} isSubmitting={isSubmitting} />
        </form>
      </motion.div>

      {openAddProductModel && (
        <ProductsTableModal
          onClose={handleCloseProductModal}
          append={append}
          productsData={activeProducts}
        />
      )}
    </motion.div>
  );
}
