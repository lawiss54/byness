'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutFormData } from '@/lib/validations/checkout';
import { useCart } from '@/components/cart/CartContext';

export const useCheckoutForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cartItems, total, clearCart } = useCart();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      wilaya: '',
      municipality: '',
      shippingType: 'office'
    }
  });

  const nextStep = async () => {
    const isValid = await form.trigger();
    if (isValid && currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order object
      const order = {
        id: `CMD-${Date.now()}`,
        customer: data,
        items: cartItems,
        total,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      console.log('Order created:', order);
      
      // Clear cart and redirect to success
      clearCart();
      setCurrentStep(3); // Success step
      
    } catch (error) {
      console.error('Order submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    currentStep,
    isSubmitting,
    nextStep,
    prevStep,
    onSubmit: form.handleSubmit(onSubmit)
  };
};