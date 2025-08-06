import { z } from 'zod';

export const orderItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nom du produit requis'),
  quantity: z.number().min(1, 'La quantité doit être supérieure à 0'),
  price: z.number().min(0, 'Le prix doit être supérieur ou égal à 0'),
  color: z.string().optional(),
  size: z.string().optional(),
  image: z.string()
});

export const orderEditSchema = z.object({
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

export type OrderEditFormData = z.infer<typeof orderEditSchema>;

export type OrderEditItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
  image: string;
};

export type ShippingType = 'home' | 'desk';
export type OrderEditStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface WilayaData {
  id: number;
  name: string;
  shipping?: {
    home?: Array<{ name: string; price: string }>;
    desk?: Array<{ id: number; price: string }>;
  };
  centers?: Array<{
    id: number;
    name: string;
    address: string;
    commune_id: number;
  }>;
}

export interface OrderEditProps {
  order: any;
  onSave: (updatedOrder: any) => void;
  onClose: () => void;
  setPdfUrl: (url: string) => void;
  setShowPdfModal: (show: boolean) => void;
}
