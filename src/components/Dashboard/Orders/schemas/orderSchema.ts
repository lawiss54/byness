import { z } from "zod";

export const productItemSchema = z.object({
  id: z.string(),
  productName: z.string().min(1, "Le nom du produit est requis"),
  quantity: z.number().min(1, "La quantité doit être supérieure à zéro"),
  price: z.number().min(0, "Le prix ne peut pas être négatif"),
  color: z.string().optional(),
  size: z.string().optional(),
  image: z.string().optional(),
});

export const orderSchema = z.object({
  id: z.string(),
  customerName: z.string().min(2, "Le nom du client doit comporter au moins deux caractères"),
  customerEmail: z.string().email("E-mail invalide"),
  customerPhone: z.string().min(10, "Numéro de téléphone invalide"),
  orderDate: z.string(),
  total: z.number(),
  status: z.string(),
  deliveryToOffice: z.boolean().default(false),
  shippingAddress: z.object({
    street: z.string().min(5, "Rue requise").optional(),
    city: z.string().min(2, "Nom de la ville requis"),
    state: z.string().min(2, "Nom de la wilaya requis"),
  }),
  items: z.array(productItemSchema).min(1, "La commande doit contenir au moins un produit"),
});

export type OrderFormData = z.infer<typeof orderSchema>;
