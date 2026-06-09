'use client';

import React, { useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Truck, Package, MapPin } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { Input, Select, Textarea, RadioGroup } from '@/components/shared/ui';
import { CheckoutFormData } from '../../schemas/checkoutSchemas';
import { useShippingData } from '@/hooks/useShippingData';
import { useCheckout } from '../../context/CheckoutContext';

interface CustomerInfoStepProps {
  form: UseFormReturn<CheckoutFormData>;
}

const CustomerInfoStep: React.FC<CustomerInfoStepProps> = ({ form }) => {
  const { data, loading } = useShippingData();
  
  const { setShippingMethod } = useCheckout();

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;

  const selectedWilayaId = Number(watch('wilaya'));
  const selectedMunicipality = watch('municipality');
  const shippingType = watch('shippingType');
  const selectedDeskId = watch('deskId');

  const wilayaData = useMemo(() => data.find((w) => w.id === selectedWilayaId), [data, selectedWilayaId]);

  const communes = useMemo(() => {
    const seen = new Set();
    return (wilayaData?.communes || []).filter((c) => {
      if (seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });
  }, [wilayaData]);

  const shippingInfo = wilayaData?.shipping || {};
  const centers = wilayaData?.centers || [];

  const getShippingPrice = useCallback(() => {
    const array = shippingInfo?.[shippingType === 'home' ? 'home' : 'desk'];
    const found = array?.find((item: any) => item.name === selectedMunicipality);
    const price = found?.price || 0;
    // The shipping cost is now derived in the context based on the method.
    // We just need to set the price in the form for submission.
    setValue('shippingPrice', price);
  }, [shippingInfo, selectedMunicipality, shippingType, setValue]);

  useEffect(() => {
    if (selectedMunicipality && shippingType && shippingInfo) getShippingPrice();
  }, [selectedMunicipality, shippingType, shippingInfo, getShippingPrice]);

  useEffect(() => {
    setValue('municipality', '');
    setValue('shippingPrice', 0);
    setValue('deskId', '');
  }, [selectedWilayaId, setValue]);

  const shippingOptions = useMemo(() => {
    const getPrice = (type: 'home' | 'desk') =>
      shippingInfo?.[type]?.find((item: any) => item.name === selectedMunicipality)?.price || 0;

    return [
      {
        value: 'desk',
        label: `Livraison au bureau (${getPrice('desk')} DA)`,
        description: 'Récupération au bureau Yalidine',
        icon: <Package className="w-6 h-6" />,
      },
      {
        value: 'home',
        label: `Livraison à domicile (${getPrice('home')} DA)`,
        description: 'Livraison directe à votre adresse',
        icon: <Truck className="w-6 h-6" />,
      },
    ];
  }, [selectedMunicipality, shippingInfo]);

  const handleDeskSelection = (id: string) => {
    setValue('deskId', id);
  };

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-playfair font-bold text-brand-darkGreen-500 mb-2">Informations de livraison</h2>
        <p className="text-brand-darkGreen-400">Renseignez vos coordonnées pour finaliser votre commande</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Input {...register('firstName')} placeholder="Prénom"  label="Prénom" icon={<User className="w-5 h-5" />} error={errors.firstName?.message} required />
        <Input {...register('lastName')} placeholder="Nom" label="Nom" icon={<User className="w-5 h-5" />} error={errors.lastName?.message} required />
        <div className="md:col-span-2">
          <Input {...register('phone')} placeholder="Téléphone" label="Téléphone" icon={<Phone className="w-5 h-5" />} error={errors.phone?.message} required />
        </div>
        <div className="md:col-span-2">
          <Textarea {...register('address')} placeholder='Adresse complète' label="Adresse complète" rows={3} error={errors.address?.message} required />
        </div>
        <Select
          {...register('wilaya')}
          label="Wilaya"
          options={data.map((w) => ({key:w.id, value: w.id.toString(), label: w.name }))}
          error={errors.wilaya?.message}
          required
        />
        <Select
          {...register('municipality')}
          label="Baladia"
          options={communes.map((c) => ({key:c.id, value: c.name, label: c.name }))}
          error={errors.municipality?.message}
          required
          disabled={!selectedWilayaId}
        />
        <input type="hidden" {...register('municipalityId')} value={communes.find((c) => c.name === selectedMunicipality)?.id || ''} />
        <input type="hidden" {...register('deskId')} value={selectedDeskId || ''} />
      </div>

      <div className="mt-8">
        <RadioGroup
          label="Mode de livraison"
          options={shippingOptions}
          value={shippingType}
          onChange={(val) => {
            setValue('shippingType', val as 'home' | 'desk');
            setShippingMethod(val as 'home' | 'desk');
          }}
          name="shippingType"
          error={errors.shippingType?.message}
        />
      </div>

      {shippingType === 'desk' && selectedWilayaId && centers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 p-6 bg-gradient-to-br from-brand-lightGreen-50 to-brand-lightGreen-100 rounded-xl border border-brand-lightGreen-200"
        >
          <h3 className="text-lg font-semibold text-brand-darkGreen-500 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Centres de livraison disponibles
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {centers.map((center: any) => {
              const isSelected = selectedDeskId === center.id.toString();
              return (
                <div
                  key={center.id}
                  onClick={() => handleDeskSelection(center.id.toString())}
                  className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform ${
                    isSelected
                      ? 'border-brand-darkGreen-500 bg-gradient-to-br from-brand-darkGreen-50 to-brand-lightGreen-100'
                      : 'border-brand-lightGreen-200 bg-white hover:scale-105'
                  }`}
                >
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center">
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <h4 className={`font-medium mb-2 ${isSelected ? 'text-brand-darkGreen-600' : 'text-brand-darkGreen-500'}`}>
                    {center.name}
                  </h4>
                  <p className={`text-sm ${isSelected ? 'text-brand-darkGreen-500' : 'text-brand-darkGreen-400'}`}>
                    <MapPin className="w-4 h-4 mr-1 inline" />
                    {center.address}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {shippingType === 'desk' && selectedWilayaId && centers.length === 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
        >
          <p className="text-sm text-yellow-800 flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Aucun point de livraison n'est disponible actuellement dans cette wilaya. Veuillez opter pour la livraison à domicile.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CustomerInfoStep;
