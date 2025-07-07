'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCheckoutForm } from '@/hooks/useCheckoutForm';
import { StepIndicator, Button } from '@/components/shared/ui';
import CustomerInfoStep from './steps/CustomerInfoStep';
import OrderSummaryStep from './steps/OrderSummaryStep';
import SuccessStep from './steps/SuccessStep';
import { useRouter } from 'next/navigation';

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { form, currentStep, isSubmitting, nextStep, prevStep, onSubmit } = useCheckoutForm();

  const steps = [
    { id: 1, title: 'Informations', description: 'Vos coordonnées' },
    { id: 2, title: 'Confirmation', description: 'Récapitulatif' }
  ];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CustomerInfoStep form={form} />;
      case 2:
        return (
          <OrderSummaryStep 
            form={form} 
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case 3:
        return <SuccessStep />;
      default:
        return <CustomerInfoStep form={form} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-darkGreen-50 via-white to-brand-sage-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.button
            className="inline-flex items-center gap-2 text-brand-darkGreen-500 hover:text-brand-camel-500 mb-6 transition-colors duration-300"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/panier')}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Retour au panier</span>
          </motion.button>

          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-brand-darkGreen-500 mb-4">
            Finaliser ma commande
          </h1>
          <p className="text-xl text-brand-darkGreen-400 font-secondary">
            Quelques étapes simples pour finaliser votre achat
          </p>
        </motion.div>

        {/* Step Indicator */}
        {currentStep < 3 && <StepIndicator steps={steps} currentStep={currentStep} />}

        {/* Step Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        {currentStep < 3 && (
          <motion.div
            className="flex justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              size="lg"
              icon={<ArrowLeft className="w-5 h-5" />}
            >
              Retour
            </Button>

            {currentStep === 1 && (
              <Button
                onClick={nextStep}
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Continuer
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;