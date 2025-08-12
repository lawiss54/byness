import React from 'react';
import { MapPin, Building } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Card, Input, Select, Textarea } from '@/components/shared/ui';

interface OrderEditShippingInfoProps {
  control: any;
  errors: any;
  shippingData: any[];
  selectedWilayaId: string;
  setSelectedWilayaId: (id: string) => void;
  setValue: any;
  watchedShippingType: string;
  selectedWilayaShipping: any;
  availableDesks: any[];
  watchedDeskId: string;
  watchedStatus: string;
  watchedIsFreeShipping: boolean;
  needsExchange: boolean;
}

export function OrderEditShippingInfo({
  control,
  errors,
  shippingData,
  selectedWilayaId,
  setSelectedWilayaId,
  setValue,
  watchedShippingType,
  selectedWilayaShipping,
  availableDesks,
  watchedDeskId,
  watchedStatus,
  watchedIsFreeShipping,
  needsExchange
}: OrderEditShippingInfoProps) {
  const statusOptions = [
    { value: "pending", label: "En attente de confirmation" },
    { value: "confirmed", label: "Confirmé" },
    { value: "cancelled", label: "Annulé" },
  ];

  const shippingOptions = [
    { value: "home", label: "Livraison à domicile" },
    { value: "desk", label: "Retrait au bureau" },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5" />
        Informations de livraison
      </h3>
      <div className="space-y-4">
        <Controller
          name="customerAddress"
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              label="Adresse"
              rows={3}
              error={errors.customerAddress?.message}
            />
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="wilaya"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Wilaya"
                required
                options={
                  shippingData?.map((w) => ({
                    id: w.id.toString(),
                    key: w.id.toString(),
                    value: w.id.toString(),
                    label: w.name,
                  })) || []
                }
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedWilayaId(value);
                }}
                error={errors.wilaya?.message}
              />
            )}
          />
          <Controller
            name="shippingType"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Type de livraison"
                options={shippingOptions}
                required
                onChange={(e) => {
                  field.onChange(e.target.value);
                  setValue("municipality", "");
                  setValue("deskId", "");
                }}
                error={errors.shippingType?.message}
              />
            )}
          />
        </div>

        {/* Conditional rendering based on shipping type */}
        {watchedShippingType === "home" && (
          <Controller
            name="municipality"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                label="Commune"
                required
                options={
                  selectedWilayaShipping?.home?.map((m) => ({
                    value: m.name,
                    label: m.name,
                  })) || []
                }
                error={errors.municipality?.message}
              />
            )}
          />
        )}

        {watchedShippingType === "desk" && (
          <Controller
            name="deskId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value || watchedDeskId}
                label="Bureau de retrait"
                required
                icon={<Building className="w-4 h-4" />}
                options={availableDesks.map((desk) => ({
                  value: desk.id.toString(),
                  label: `${desk.name} - ${desk.address}`,
                }))}
                error={errors.deskId?.message}
                placeholder="Sélectionnez un bureau"
              />
            )}
          />
        )}

        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <>
              <Select
                {...field}
                label="Statut de la commande"
                options={statusOptions}
                required
                error={errors.status?.message}
              />
              {field.value === "confirmed" && (
                <div className="mt-4 space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <Controller
                    name="isFreeShipping"
                    control={control}
                    render={({ field: shippingField }) => (
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          {...shippingField}
                          checked={shippingField.value}
                          id="isFreeShipping"
                          className="w-4 h-4 text-brand-camel-600 rounded border-gray-300 focus:ring-brand-camel-500"
                        />
                        <label
                          htmlFor="isFreeShipping"
                          className="text-sm text-gray-700"
                        >
                          Livraison gratuite
                        </label>
                      </div>
                    )}
                  />
                  <Controller
                    name="needsExchange"
                    control={control}
                    render={({ field: exchangeField }) => (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            {...exchangeField}
                            checked={exchangeField.value}
                            id="needsExchange"
                            className="w-4 h-4 text-brand-camel-600 rounded border-gray-300 focus:ring-brand-camel-500"
                          />
                          <label
                            htmlFor="needsExchange"
                            className="text-sm text-gray-700"
                          >
                            Demander un échange après livraison
                          </label>
                        </div>
                        {exchangeField.value && (
                          <div className="ml-6 space-y-2">
                            <Controller
                              name="product_to_collect"
                              control={control}
                              render={({ field: productField }) => (
                                <div>
                                  <label
                                    htmlFor="product_to_collect"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Produit à récupérer
                                  </label>
                                  <input
                                    type="text"
                                    {...productField}
                                    id="product_to_collect"
                                    placeholder="Nom du produit ou référence"
                                    className={`mt-1 w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-camel-500 focus:border-brand-camel-500 ${errors.product_to_collect
                                      ? "border-red-500"
                                      : "border-gray-300"
                                      }`}
                                  />
                                  {errors.product_to_collect && (
                                    <p className="mt-1 text-sm text-red-600">
                                      {errors.product_to_collect.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>
              )}
            </>
          )}
        />

        {/* Display selected desk info */}
        {watchedShippingType === "desk" && watchedDeskId && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <Building className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">
                  Bureau sélectionné:
                </p>
                {availableDesks.find(
                  (desk) => desk.id === Number(watchedDeskId)
                ) && (
                    <div className="text-blue-700 mt-1">
                      <p className="font-medium">
                        {
                          availableDesks.find(
                            (desk) =>
                              desk.id === Number(watchedDeskId)
                          )?.name
                        }
                      </p>
                      <p className="text-xs">
                        {
                          availableDesks.find(
                            (desk) =>
                              desk.id === Number(watchedDeskId)
                          )?.address
                        }
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
