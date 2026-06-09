'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type CheckoutFormData } from '../schemas/checkoutSchemas';
import { useCartItems, useCartTotals, useCartActions } from '@/app/panier/store/cart';
import { useCheckout } from '../context/CheckoutContext';
import { useEffect, useRef } from 'react';
import { useFacebookPixelEvent } from '@/hooks/useFacebookPixelEvent';
import { useTiktokPixelEvent } from '@/hooks/useTiktokPixelEvent';
import { submitOrder } from '../services/order';

export const useCheckoutForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get state and actions from our new stores/contexts
  const cartItems = useCartItems();
  const { subtotal } = useCartTotals();
  const { clearCart } = useCartActions();
  const { total: totalWithExtras } = useCheckout();

  // Analytics hooks
  const { track: trackFb } = useFacebookPixelEvent();
  const { trackTiktok } = useTiktokPixelEvent();
  const hasTrackedInitiation = useRef(false);

  // Effect for tracking the initiation of checkout
  useEffect(() => {
    if (cartItems.length > 0 && !hasTrackedInitiation.current) {
      const contents = cartItems.map(p => ({ content_id: p.id, content_name: p.name, quantity: p.quantity, price: p.price, product_img: p.images[0] }));
      const eventData = { value: subtotal, currency: 'DZD', contents, content_type: 'product' };
      trackFb('InitiateCheckout', eventData);
      trackTiktok('InitiateCheckout', eventData);
      hasTrackedInitiation.current = true;
    }
  }, [cartItems, subtotal, trackFb, trackTiktok]);

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
      shippingPrice: '', 
      giftWrap: false,
      deskId: ''
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
    if (!cartItems || cartItems.length === 0) {
      return; // Should not happen if page redirects correctly
    }

    setIsSubmitting(true);

    // Analytics tracking
    const contents = cartItems.map(p => ({ content_id: p.id, content_name: p.name, quantity: p.quantity, price: p.price }));
    trackFb('Purchase', { value: totalWithExtras, currency: 'DZD', contents, content_type: 'product' });
    trackTiktok('Purchase', { value: totalWithExtras, currency: 'DZD', contents, content_type: 'product' });

    
    const payload = {
      customer: data,
      items: cartItems,
      subtotal: subtotal,
      total: totalWithExtras,
    };

    const { success } = await submitOrder(payload);

    if (success) {
      clearCart();
      setCurrentStep(3); // Go to success step
    }

    setIsSubmitting(false);
  };

  return {
    form,
    currentStep,
    isSubmitting,
    totalWithShipping: totalWithExtras,
    nextStep,
    prevStep,
    onSubmit: form.handleSubmit(onSubmit)
  };
};