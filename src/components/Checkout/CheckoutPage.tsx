'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckoutProvider } from './CheckoutContext';
import CheckoutHeader from './CheckoutHeader';
import StepIndicator from './StepIndicator';
import CheckoutSteps from './CheckoutSteps';
import CartSummary from './CartSummary';

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <CheckoutProvider>
      <div className="min-h-screen bg-gradient-to-br from-brand-darkGreen-50 via-white to-brand-sage-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CheckoutHeader />
          <StepIndicator currentStep={currentStep} />

          <div className="grid lg:grid-cols-3 gap-4">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                className="bg-white rounded-3xl shadow-2xl p-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <CheckoutSteps 
                  currentStep={currentStep}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              </motion.div>
            </div>

            {/* Cart Summary */}
            {currentStep === 1 && (
              <div className="lg:col-span-1">
                <CartSummary />
              </div>
            )}
            
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
}