'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, MapPin, Truck, Gift } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { id: 1, title: 'Livraison', icon: MapPin },
  { id: 2, title: 'Mode de livraison', icon: Truck },
  { id: 3, title: 'Options', icon: Gift },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-12 overflow-x-auto">
      <div className="flex items-center space-x-4 md:space-x-8 min-w-max px-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <motion.div
              className={`relative flex flex-col items-center ${
                index < steps.length - 1 ? 'mr-4 md:mr-8' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Step Circle */}
              <motion.div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-semibold transition-all duration-300 relative z-10 ${
                  currentStep > step.id
                    ? 'bg-green-500 text-white shadow-lg'
                    : currentStep === step.id
                    ? 'bg-brand-camel-500 text-white shadow-lg'
                    : 'bg-white text-brand-darkGreen-400 border-2 border-brand-sage-200'
                }`}
                whileHover={{ scale: 1.05 }}
                animate={
                  currentStep === step.id
                    ? { scale: [1, 1.1, 1] }
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                {currentStep > step.id ? (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Check className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </motion.div>
                )}
              </motion.div>

              {/* Step Title */}
              <motion.div
                className="mt-3 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <div
                  className={`text-sm md:text-base font-semibold transition-colors duration-300 ${
                    currentStep >= step.id
                      ? 'text-brand-darkGreen-500'
                      : 'text-brand-sage-400'
                  }`}
                >
                  {step.title}
                </div>
                <div className="text-xs text-brand-sage-400 mt-1">
                  Étape {step.id}
                </div>
              </motion.div>
            </motion.div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <motion.div
                className={`hidden md:block w-16 lg:w-24 h-1 transition-all duration-500 ${
                  currentStep > step.id
                    ? 'bg-green-500'
                    : currentStep === step.id
                    ? 'bg-gradient-to-r from-brand-camel-500 to-brand-sage-200'
                    : 'bg-brand-sage-200'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                style={{ transformOrigin: 'left' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}