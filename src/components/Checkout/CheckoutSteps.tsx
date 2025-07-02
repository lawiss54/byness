'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ShippingStep from './steps/ShippingStep';
import ConfirmationStep from './steps/ConfirmationStep';

interface CheckoutStepsProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
}

export default function CheckoutSteps({ currentStep, nextStep, prevStep }: CheckoutStepsProps) {
  const stepVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  const handleNextStep = () => {
    if (currentStep === 2) {
      // Simulate order confirmation
      setTimeout(() => {
        nextStep();
      }, 500);
    } else {
      nextStep();
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="shipping"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ShippingStep />
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="confirmation"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <ConfirmationStep />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      {currentStep < 2 && (
        <motion.div
          className="flex justify-between mt-12 pt-8 border-t border-brand-sage-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              currentStep === 1
                ? 'text-brand-sage-400 cursor-not-allowed'
                : 'text-brand-darkGreen-500 hover:bg-brand-sage-50'
            }`}
            whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
            whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </motion.button>

          <motion.button
            onClick={handleNextStep}
            className="flex items-center gap-2 px-8 py-3 bg-brand-camel-500 hover:bg-brand-camel-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentStep === 2 ? 'Confirmer la commande' : 'Continuer'}
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </>
  );
}