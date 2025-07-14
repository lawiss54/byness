'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutFormData } from '@/components/Checkout/schemas/checkoutSchemas';
import { useCartCheckout } from '@/lib/CartCheckoutContext';
import { toast } from 'react-toastify';

export const useCheckoutForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cartItems, total, clearCart } = useCartCheckout();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      wilaya: '',
      municipality: '',
      shippingType: 'home',
      shippingPrice: 0,
      giftWrap: false,
      deskId: ''
    }
  });

  // حساب الإجمالي مع الشحن
  const shippingPrice = form.watch('shippingPrice') || 0;
  const totalWithShipping = total + shippingPrice;

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
      // Create order object
      const order = {
        id: `CMD-${Date.now()}`,
        customer: data,
        items: cartItems,
        subtotal: total,
        shippingPrice: data.shippingPrice,
        total: totalWithShipping,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(order)
      });

      if (!res.ok) {
        throw new Error('Failed to create order');
      }
      const responseData = await res.json();
      if (responseData.error) {
        toast.error(responseData.error);
      }
      toast.success('Order created successfully!');

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
    shippingPrice,
    totalWithShipping,
    nextStep,
    prevStep,
    onSubmit: form.handleSubmit(onSubmit)
  };
};