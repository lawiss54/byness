'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/shared/ui/form';
import { Button } from '@/components/shared/ui/Button';
import { ArrowLeft, ArrowRight, Loader, CheckCircle } from 'lucide-react';
import { checkoutSchema, type CheckoutFormData } from './schemas/checkoutSchemas';
import ShippingForm from './forms/ShippingForm';
import ShippingMethodForm from './forms/ShippingMethodForm';
import AdditionalOptionsForm from './forms/AdditionalOptionsForm';

const steps = [
  { id: 1, title: 'Livraison', component: ShippingForm },
  { id: 2, title: 'Mode de livraison', component: ShippingMethodForm },
  { id: 3, title: 'Finalisation', component: AdditionalOptionsForm },
];

interface CheckoutFormWrapperProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
}

export default function CheckoutFormWrapper({ 
  currentStep, 
  nextStep, 
  prevStep 
}: CheckoutFormWrapperProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      shipping: {
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        wilaya: '',
      },
      shippingMethod: '',
      giftWrap: false,
      terms: false,
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: CheckoutFormData) => {
    if (currentStep < steps.length) {
      // Validate current step
      const stepValidation = await validateCurrentStep();
      if (stepValidation) {
        nextStep();
      }
    } else {
      // Final submission
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Checkout data:', data);
        // Redirect to confirmation page
        alert('Commande confirmée! Vous recevrez un SMS de confirmation.');
      } catch (error) {
        console.error('Checkout error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const validateCurrentStep = async () => {
    const stepFields = getStepFields(currentStep);
    const result = await form.trigger(stepFields);
    return result;
  };

  const getStepFields = (step: number): (keyof CheckoutFormData)[] => {
    switch (step) {
      case 1:
        return ['shipping'];
      case 2:
        return ['shippingMethod'];
      case 3:
        return ['terms'];
      default:
        return [];
    }
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  const stepVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <AnimatePresence mode="wait">
          {CurrentStepComponent && (
            <motion.div
              key={currentStep}
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.div
          className="flex justify-between pt-8 border-t border-brand-sage-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                currentStep === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'border-brand-darkGreen-500 text-brand-darkGreen-500 hover:bg-brand-darkGreen-500 hover:text-white'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Retour
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-brand-camel-500 hover:bg-brand-camel-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Traitement...</span>
                </>
              ) : currentStep === steps.length ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Confirmer la commande</span>
                </>
              ) : (
                <>
                  <span>Continuer</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>

        {/* Form Errors Summary */}
        {Object.keys(form.formState.errors).length > 0 && (
          <motion.div
            className="p-4 bg-red-50 border border-red-200 rounded-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="font-semibold text-red-700 mb-2">
              Veuillez corriger les erreurs suivantes :
            </h4>
            <ul className="text-sm text-red-600 space-y-1">
              {Object.entries(form.formState.errors).map(([field, error]) => (
                <li key={field}>
                  • {error?.message || `Erreur dans le champ ${field}`}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </form>
    </Form>
  );
}