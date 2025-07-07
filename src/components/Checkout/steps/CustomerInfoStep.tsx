'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, MapPin, Truck, Package } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { Input, Select, Textarea, RadioGroup } from '@/components/shared/ui';
import { CheckoutFormData, WILAYAS } from '@/lib/validations/checkout';

interface CustomerInfoStepProps {
  form: UseFormReturn<CheckoutFormData>;
}

const CustomerInfoStep: React.FC<CustomerInfoStepProps> = ({ form }) => {
  const { register, formState: { errors }, watch, setValue } = form;
  const shippingType = watch('shippingType');

  const shippingOptions = [
    {
      value: 'office',
      label: 'Livraison au bureau de transport',
      description: 'Récupération au bureau Yalidine - 300 DA',
      icon: <Package className="w-6 h-6" />
    },
    {
      value: 'home',
      label: 'Livraison à domicile',
      description: 'Livraison directe à votre adresse - 800 DA',
      icon: <Truck className="w-6 h-6" />
    }
  ];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-playfair font-bold text-brand-darkGreen-500 mb-2">
          Informations de livraison
        </h2>
        <p className="text-brand-darkGreen-400">
          Renseignez vos coordonnées pour finaliser votre commande
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input
          {...register('firstName')}
          label="Prénom"
          placeholder="Votre prénom"
          icon={<User className="w-5 h-5" />}
          error={errors.firstName?.message}
          required
        />

        <Input
          {...register('lastName')}
          label="Nom"
          placeholder="Votre nom"
          icon={<User className="w-5 h-5" />}
          error={errors.lastName?.message}
          required
        />

        <div className="md:col-span-2">
          <Input
            {...register('phone')}
            label="Téléphone"
            placeholder="0555 123 456"
            icon={<Phone className="w-5 h-5" />}
            error={errors.phone?.message}
            required
          />
        </div>

        <div className="md:col-span-2">
          <Textarea
            {...register('address')}
            label="Adresse complète"
            placeholder="Votre adresse complète"
            rows={3}
            error={errors.address?.message}
            required
          />
        </div>

        <Select
          {...register('wilaya')}
          label="Wilaya"
          placeholder="Sélectionnez une wilaya"
          options={WILAYAS}
          error={errors.wilaya?.message}
          required
        />

        <Input
          {...register('municipality')}
          label="Commune"
          placeholder="Votre commune"
          icon={<MapPin className="w-5 h-5" />}
          error={errors.municipality?.message}
          required
        />
      </div>

      <div className="mt-8">
        <RadioGroup
          label="Mode de livraison"
          options={shippingOptions}
          value={shippingType}
          onChange={(value) => setValue('shippingType', value as 'home' | 'office')}
          name="shippingType"
          error={errors.shippingType?.message}
        />
      </div>
    </motion.div>
  );
};

export default CustomerInfoStep;