'use client';

import React from 'react';
import CheckoutFormWrapper from './CheckoutFormWrapper';

interface CheckoutStepsProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
}

export default function CheckoutSteps({ currentStep, nextStep, prevStep }: CheckoutStepsProps) {
  return (
    <CheckoutFormWrapper 
      currentStep={currentStep}
      nextStep={nextStep}
      prevStep={prevStep}
    />
  );
}