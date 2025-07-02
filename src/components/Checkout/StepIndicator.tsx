'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-12">
      {[1, 2].map((step) => (
        <div key={step} className="flex items-center">
          <motion.div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
              currentStep >= step
                ? 'bg-brand-camel-500 text-white shadow-lg'
                : 'bg-white text-brand-darkGreen-400 border-2 border-brand-sage-200'
            }`}
            whileHover={{ scale: 1.05 }}
            animate={currentStep === step ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {currentStep > step ? <Check className="w-6 h-6" /> : step}
          </motion.div>
          {step < 2 && (
            <div className={`w-16 h-1 mx-4 transition-all duration-300 ${
              currentStep > step ? 'bg-brand-camel-500' : 'bg-brand-sage-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}