'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  className = ""
}) => {
  return (
    <div className={`flex items-center justify-center mb-12 ${className}`}>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <motion.div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
              currentStep >= step.id
                ? 'bg-brand-camel-500 text-white shadow-lg'
                : 'bg-white text-brand-darkGreen-400 border-2 border-brand-sage-200'
            }`}
            whileHover={{ scale: 1.05 }}
            animate={currentStep === step.id ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            {currentStep > step.id ? (
              <Check className="w-6 h-6" />
            ) : (
              step.id
            )}
          </motion.div>
          
          {index < steps.length - 1 && (
            <div className={`w-16 h-1 mx-4 transition-all duration-300 ${
              currentStep > step.id ? 'bg-brand-camel-500' : 'bg-brand-sage-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;