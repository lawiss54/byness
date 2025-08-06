import React from 'react';
import { User, Phone } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Card, Input } from '@/components/shared/ui';

interface OrderEditCustomerInfoProps {
  control: any;
  errors: any;
}

export function OrderEditCustomerInfo({ control, errors }: OrderEditCustomerInfoProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <User className="w-5 h-5" />
        Informations client
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="customerFirstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Prénom"
                icon={<User className="w-4 h-4" />}
                required
                error={errors.customerFirstName?.message}
              />
            )}
          />
          <Controller
            name="customerLastName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                label="Nom"
                icon={<User className="w-4 h-4" />}
                required
                error={errors.customerLastName?.message}
              />
            )}
          />
        </div>
        <Controller
          name="customerPhone"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Numéro de téléphone"
              icon={<Phone className="w-4 h-4" />}
              required
              error={errors.customerPhone?.message}
            />
          )}
        />
      </div>
    </Card>
  );
}
