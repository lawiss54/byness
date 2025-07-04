"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { UnifiedCartProvider } from "../shared/UnifiedCartContext";
import CheckoutHeader from "./CheckoutHeader";
import StepIndicator from "./StepIndicator";
import CheckoutSteps from "./CheckoutSteps";
import OrderSummary from "../shared/OrderSummary";

function CheckoutPageContent() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
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
    <div className="min-h-screen w-full bg-gradient-to-br from-brand-darkGreen-50 via-white to-brand-sage-50 py-4 sm:py-6 md:py-8 lg:py-12">
      {/* Container with responsive padding and max-width */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
        {/* Header with responsive spacing */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <CheckoutHeader />
        </div>

        {/* Step Indicator with responsive spacing */}
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <StepIndicator currentStep={currentStep} />
        </div>

        {/* Main content grid - responsive layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
          {/* Main Content - Takes full width on mobile, 8 columns on large screens */}
          <div className="lg:col-span-8 xl:col-span-2 order-2 lg:order-1">
            <motion.div
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl p-4 sm:p-6 lg:p-8"
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

          {/* Cart Summary - Appears first on mobile, second on desktop */}
          <div className="lg:col-span-4 xl:col-span-1 order-1 lg:order-2">
            <div className="sticky top-4 sm:top-6 lg:top-8">
              <OrderSummary />
            </div>
          </div>
        </div>

        {/* Bottom spacing for mobile */}
        <div className="h-4 sm:h-6 lg:h-8"></div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <UnifiedCartProvider>
      <CheckoutPageContent />
    </UnifiedCartProvider>
  );
}
