'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  X,
  Save,
  Plus,
  Minus,
  Trash2,
  User,
  MapPin,
  Package,
  Phone, Building
} from 'lucide-react';
import { Button, Input, Select, Textarea, Card } from '@/components/shared/ui';
import Image from 'next/image';
import { useShippingData } from '@/hooks/useShippingData';
import { toast } from 'react-toastify';
import { useApi } from '@/lib/apiContext';
import ProductsTableModal from "./ProductsTableModal";
import { Loader } from "@/components/shared";

const colorMap: { [key: string]: string } = {
  // Couleurs de base
  '#ff0000': 'Rouge',
  '#0000ff': 'Bleu',
  '#00ff00': 'Vert',
  '#ffff00': 'Jaune',
  '#000000': 'Noir',
  '#ffffff': 'Blanc',
  '#800080': 'Violet',
  '#ffc0cb': 'Rose',
  '#ffa500': 'Orange',
  '#a52a2a': 'Marron',
  '#808080': 'Gris',
  '#000080': 'Bleu marine',
  '#f5f5dc': 'Beige',
  '#ffd700': 'Or',
  '#c0c0c0': 'Argent',
  // Nuances de rouge
  '#dc143c': 'Rouge cramoisi',
  '#8b0000': 'Rouge foncé',
  '#ff6347': 'Rouge tomate',
  // Nuances de bleu
  '#4169e1': 'Bleu royal',
  '#87ceeb': 'Bleu ciel',
  '#00008b': 'Bleu foncé',
  // Nuances de vert
  '#006400': 'Vert foncé',
  '#90ee90': 'Vert clair',
  '#98fb98': 'Vert pâle',
  // Nuances de gris
  '#696969': 'Gris foncé',
  '#d3d3d3': 'Gris clair',
  // Autres couleurs
  '#800000': 'Bordeaux',
  '#f0e68c': 'Kaki',
  '#deb887': 'Brun bois'
};

const normalizeHexColor = (color: string): string => {
  // Si la couleur est déjà au format hex
  if (color.startsWith('#')) {
    return color.toLowerCase();
  }

  // Si c'est un nom de couleur, on le retourne tel quel
  if (!/^[0-9A-Fa-f]{6}$/.test(color)) {
    return color.toLowerCase();
  }

  // Sinon on ajoute le # pour le format hex
  return `#${color.toLowerCase()}`;
};

const getColorName = (color: string): string => {
  if (!color) return '';

  // Normaliser la couleur
  const normalizedColor = normalizeHexColor(color);

  // Chercher dans la map des couleurs
  if (colorMap[normalizedColor]) {
    return colorMap[normalizedColor];
  }

  // Si c'est un code hex valide mais pas dans notre map
  if (normalizedColor.startsWith('#')) {
    return `Code hex: ${normalizedColor}`;
  }

  // Si ce n'est pas un code hex, retourner la valeur originale
  return color;
};

// Zod Schema
const orderItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nom du produit requis'),
  quantity: z.number().min(1, 'La quantité doit être supérieure à 0'),
  price: z.number().min(0, 'Le prix doit être supérieur ou égal à 0'),
  color: z.string().optional(),
  size: z.string().optional(),
  image: z.string()
});

const orderSchema = z.object({
  isFreeShipping: z.boolean().optional(),
  needsExchange: z.boolean().optional(),
  product_to_collect: z.string().optional(),
  customerFirstName: z.string().min(1, 'Prénom requis'),
  customerLastName: z.string().min(1, 'Nom requis'),
  customerPhone: z.string().min(10, 'Le numéro de téléphone doit être valide'),
  customerAddress: z.string().optional(),
  wilaya: z.string().min(1, 'Wilaya requise'),
  municipality: z.string().optional(),
  shippingType: z.enum(['home', 'desk'], {
    errorMap: () => ({ message: 'Type de livraison requis' })
  }),
  deskId: z.string().optional(),
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'], {
    errorMap: () => ({ message: 'Statut de la commande requis' })
  }),
  items: z.array(orderItemSchema).min(1, 'Au moins un produit doit être ajouté')
}).refine((data) => {
  // Si le type de livraison est "desk", alors deskId est requis
  if (data.shippingType === 'desk' && !data.deskId) {
    return false;
  }
  return true;
}, {
  message: "Veuillez sélectionner un bureau",
  path: ["deskId"]
}).refine((data) => {
  if (data.needsExchange && !data.product_to_collect?.trim()) {
    return false;
  }
  return true;
}, {
  message: "Veuillez saisir le produit à échanger",
  path: ["product_to_collect"]
});

type OrderFormData = z.infer<typeof orderSchema>;

interface OrderEditProps {
  order: {
    id: string;
    customer_first_name: string; // تغيير هنا
    customer_last_name: string;  // تغيير هنا
    customerPhone: string;
    customerAddress: string;
    wilaya: string | null;       // تعديل هنا
    municipality: string | null; // تعديل هنا
    shippingType: 'home' | 'desk' | null; // تعديل هنا
    deskId?: string | null;      // تعديل هنا
    status: 'pending' | 'confirmed' | 'cancelled'; // تعديل هنا
    items: {
      id: string | number;
      name: string;
      quantity: number;
      price: number | string;
      color?: string;
      size?: string;
      image: string;
    }[];
    isFreeShipping?: boolean;    // إضافة هنا
    needsExchange?: boolean;     // إضافة هنا
    product_to_collect?: string; // إضافة هنا
  };
  onSave: (updatedOrder: any) => void;
  onClose: () => void;
}

interface ShippingItem {
  id: number;
  name: string;
  price: number;
}

interface Center {
  id: number;
  name: string;
  address: string;
  commune_id: number;
}

interface ShippingData {
  id: number;
  name: string;
  centers: Center[];
  shipping: {
    home: ShippingItem[];
    desk: ShippingItem[];
  };
}

export default function OrderEdit({ order, onSave, onClose, setShowPdfModal, setPdfUrl }: OrderEditProps) {
  const { data: shippingData, loading } = useShippingData();
  const {activeProduct} = useApi()

  const [selectedWilayaId, setSelectedWilayaId] = useState(order.wilaya || "");
  const [addProduct, setAddProduct] = useState({});
  const [openAddProductModel, setOpenAddProductModel] = useState(false);
 

  

  // استخراج اسم الولاية من البيانات
  const getWilayaName = useMemo(() => {
    if (!shippingData || !selectedWilayaId) return "";
    const wilaya = shippingData.find((w) => w.id === Number(selectedWilayaId));
    return wilaya?.name || "";
  }, [shippingData, selectedWilayaId]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      isFreeShipping: order.isFreeShipping || false,
      needsExchange: order.needsExchange || false,
      product_to_collect: order.product_to_collect || "",
      customerFirstName: order.customer_first_name || "", // تعديل هنا
      customerLastName: order.customer_last_name || "",   // تعديل هنا
      customerPhone: order.customerPhone || "",
      customerAddress: order.customerAddress || "",
      wilaya: order.wilaya || "",
      municipality: order.municipality || "",
      shippingType: order.shippingType || "home",
      deskId: order.deskId || "",
      status: order.status || "pending",
      items: order.items?.map((item) => ({
        id: item.id?.toString() || Date.now().toString(),
        name: item.name || "",
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
        color: item.color || "",
        size: item.size || "",
        image: item.image || "/robe.jpg",
      })) || [
          {
            id: Date.now().toString(),
            name: "Nouveau produit",
            quantity: 1,
            price: 0,
            color: "",
            size: "",
            image: "/robe.jpg",
          },
        ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items");
  const watchedShippingType = watch("shippingType");
  const watchedMunicipality = watch("municipality");
  const watchedIsFreeShipping = watch("isFreeShipping");
  const watchedDeskId = watch("deskId");
  const [currentShippingPrice, setCurrentShippingPrice] = useState(0);
  const needsExchange = watch("needsExchange");


  useEffect(() => {
    // تحديث اسم الولاية في النموذج عند تحميل البيانات
    if (getWilayaName) {
      setValue("wilaya", getWilayaName);
    }
  }, [getWilayaName, setValue]);

  // جلب معلومات الشحن للولاية المحددة
  const selectedWilayaShipping = useMemo(() => {
    if (!shippingData || !selectedWilayaId) return null;
    const wilaya = shippingData.find((w) => w.id === Number(selectedWilayaId));
    return wilaya?.shipping || null;
  }, [shippingData, selectedWilayaId]);

  // جلب المكاتب المتاحة في الولاية المحددة
  const availableDesks = useMemo(() => {
    if (!shippingData || !selectedWilayaId) return [];
    const wilaya = shippingData.find((w) => w.id === Number(selectedWilayaId));
    return wilaya?.centers || [];
  }, [shippingData, selectedWilayaId]);

  // تحديث سعر الشحن عند تغيير البيانات
  useEffect(() => {
    if (watchedShippingType === "home") {
      // للشحن المنزلي
      if (!selectedWilayaShipping || !watchedMunicipality) {
        setCurrentShippingPrice(0);
        return;
      }

      const municipalityShipping = selectedWilayaShipping.home?.find(
        (item) => item.name === watchedMunicipality
      );
      setCurrentShippingPrice(
        municipalityShipping ? Number(municipalityShipping.price) : 0
      );
    } else if (watchedShippingType === "desk") {
      // للشحن للمكتب
      if (!selectedWilayaShipping || !watchedDeskId) {
        setCurrentShippingPrice(0);
        return;
      }

      const selectedDesk = availableDesks.find(
        (desk) => desk.id === Number(watchedDeskId)
      );
      if (selectedDesk) {
        // البحث عن سعر الشحن للكومون التي يقع فيها المكتب
        const deskShipping = selectedWilayaShipping.desk?.find(
          (item) => item.id === selectedDesk.commune_id
        );
        setCurrentShippingPrice(deskShipping ? Number(deskShipping.price) : 0);
      }
    }
  }, [
    selectedWilayaShipping,
    watchedMunicipality,
    watchedShippingType,
    watchedDeskId,
    availableDesks,
  ]);

  const calculateTotal = (isFreeShipping: boolean = false) => {
    const subtotal = watchedItems.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0
    );
    return subtotal + (isFreeShipping ? 0 : currentShippingPrice);
  };

  const handleQuantityChange = (index: number, change: number) => {
    const currentQuantity = watchedItems[index]?.quantity || 1;
    const newQuantity = Math.max(1, currentQuantity + change);

    // Update the specific field
    const updatedItems = [...watchedItems];
    updatedItems[index] = { ...updatedItems[index], quantity: newQuantity };

    setValue("items", updatedItems);
  };

  const addNewItem = () => {
    setOpenAddProductModel(true)
  };

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmiting = async (data) => {
    const updatedOrder = {
      ...order,
      ...data,
      total: calculateTotal(data.isFreeShipping),
      shipping_price: currentShippingPrice,
      subtotal: watchedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    try {
      const res = await fetch('/api/orders/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });
      if(!res.ok){
        toast.error("Erreur lors de la mise à jour du statut")
      }
      const response = await res.json();
      if(updatedOrder.status === "cancelled"){
        toast.success(response.message);

      }else{
        
        setPdfUrl(response.data || '');
        setShowPdfModal(true);
      }
      onSave(updatedOrder);
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du statut');
    }
  };

  const statusOptions = [
    { value: "pending", label: "En attente de confirmation" },
    { value: "confirmed", label: "Confirmé" },
    { value: "cancelled", label: "Annulé" },
  ];

  const shippingOptions = [
    { value: "home", label: "Livraison à domicile" },
    { value: "desk", label: "Retrait au bureau" },
  ];

  if (loading) {
      return <Loader
          type="fashion"
          size="lg"
          text="Chargement..."
          overlay={true}
      />
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-full overflow-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-brand-camel-50 to-brand-sage-50">
          <h2 className="text-2xl font-bold text-gray-900">
            Modifier la commande {order.id}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            icon={<X className="w-5 h-5" />}
            onClick={onClose}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmiting, (errors) => {
          console.error('Validation errors:', errors);
        })}>
          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)] p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Customer Information */}
              <div className="space-y-6">
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
                              const wilaya = shippingData?.find(
                                (w) => w.id === Number(value)
                              );
                              field.onChange(wilaya?.name || "");
                              // Reset municipality and desk when wilaya changes
                              setValue("municipality", "");
                              setValue("deskId", "");
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
                              // Reset municipality and desk when shipping type changes
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
                                                  {
                                                    errors.product_to_collect
                                                      .message
                                                  }
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
              </div>

              {/* Order Items */}
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Produits
                    </h3>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      icon={<Plus className="w-4 h-4" />}
                      onClick={addNewItem}
                    >
                      Ajouter un produit
                    </Button>
                  </div>

                  {errors.items && (
                    <div className="text-red-600 text-sm mb-4">
                      {errors.items.message}
                    </div>
                  )}

                  <div className="space-y-4">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="border border-gray-200 rounded-xl p-4"
                      >
                        <div className="flex gap-4 mb-4">
                          <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={watchedItems[index]?.image}
                              alt={watchedItems[index]?.name || "Produit"}
                              fill
                              className="object-cover"
                              sizes="64px"
                            />
                          </div>
                          <div className="flex-1">
                            <Controller
                              name={`items.${index}.name`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  className="mb-2"
                                  placeholder="Nom du produit"
                                  error={errors.items?.[index]?.name?.message}
                                />
                              )}
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <Controller
                                name={`items.${index}.color`}
                                control={control}
                                render={({ field }) => {
                                  const colorName = getColorName(field.value);
                                  return (
                                    <div className="relative">
                                      {field.value && (
                                        <div className="absolute -top-2 right-0 text-xs bg-brand-camel-50 border border-brand-camel-200 rounded px-2 py-0.5 shadow-sm">
                                          <span className="font-mono text-brand-camel-700">
                                            {field.value.startsWith("#")
                                              ? field.value
                                              : `#${field.value}`}
                                          </span>
                                        </div>
                                      )}
                                      <Input
                                        {...field}
                                        placeholder="Couleur"
                                        value={colorName || field.value}
                                        onChange={(e) => {
                                          // Si l'utilisateur entre un code hex, on le garde tel quel
                                          if (e.target.value.startsWith("#")) {
                                            field.onChange(e.target.value);
                                          } else {
                                            // Chercher le code hex correspondant au nom de la couleur
                                            const hexCode = Object.entries(
                                              colorMap
                                            ).find(
                                              ([_, name]) =>
                                                name.toLowerCase() ===
                                                e.target.value.toLowerCase()
                                            )?.[0];
                                            field.onChange(
                                              hexCode || e.target.value
                                            );
                                          }
                                        }}
                                      />
                                    </div>
                                  );
                                }}
                              />
                              <Controller
                                name={`items.${index}.size`}
                                control={control}
                                render={({ field }) => (
                                  <Input {...field} placeholder="Taille" />
                                )}
                              />
                            </div>
                          </div>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              icon={<Trash2 className="w-4 h-4" />}
                              onClick={() => removeItem(index)}
                              className="text-red-600 hover:text-red-700"
                            />
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              icon={<Minus className="w-4 h-4" />}
                              onClick={() => handleQuantityChange(index, -1)}
                              disabled={watchedItems[index]?.quantity <= 1}
                            />
                            <span className="w-12 text-center font-semibold">
                              {watchedItems[index]?.quantity || 1}
                            </span>
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              icon={<Plus className="w-4 h-4" />}
                              onClick={() => handleQuantityChange(index, 1)}
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <Controller
                              name={`items.${index}.price`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  type="number"
                                  onChange={(e) =>
                                    field.onChange(
                                      parseFloat(e.target.value) || 0
                                    )
                                  }
                                  className="w-24 text-right"
                                  placeholder="Prix"
                                  error={errors.items?.[index]?.price?.message}
                                />
                              )}
                            />
                            <span className="text-sm text-gray-600">DA</span>
                          </div>
                        </div>

                        <div className="mt-2 text-right">
                          <span className="text-sm text-gray-600">Total: </span>
                          <span className="font-semibold text-gray-900">
                            {(
                              (watchedItems[index]?.price || 0) *
                              (watchedItems[index]?.quantity || 1)
                            ).toLocaleString()}{" "}
                            DA
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>Sous-total:</span>
                        <span>
                          {watchedItems
                            .reduce(
                              (sum, item) => sum + item.price * item.quantity,
                              0
                            )
                            .toLocaleString()}{" "}
                          DA
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Livraison:</span>
                        <span>
                          {watchedIsFreeShipping ? "0" : currentShippingPrice}{" "}
                          DA
                        </span>
                        {watchedIsFreeShipping && (
                          <span className="text-brand-camel-600 text-xs ml-2">
                            (Livraison gratuite appliquée)
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
                        <span>Total:</span>
                        <span>
                          {calculateTotal(
                            watchedIsFreeShipping
                          ).toLocaleString()}{" "}
                          DA
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={<Save className="w-4 h-4" />}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Enregistrement..."
                : "Enregistrer les modifications"}
            </Button>
          </div>
        </form>
      </motion.div>
      
      {openAddProductModel && (
        <ProductsTableModal 
          onClose={() => setOpenAddProductModel(false)}
          append={append}
          productsData={activeProduct}
          
        />
      )}
      
    </motion.div>
  );
}