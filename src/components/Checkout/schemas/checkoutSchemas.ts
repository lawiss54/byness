import { z } from 'zod';

// Shipping Information Schema
export const shippingSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Le prénom ne peut contenir que des lettres'),
  
  lastName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Le nom ne peut contenir que des lettres'),
  
  phone: z
    .string()
    .min(10, 'Le numéro de téléphone doit contenir au moins 10 chiffres')
    .regex(/^0(5|6|7)[0-9]{8}$/, 'Numéro de téléphone algérien invalide'),
  
  address: z
    .string()
    .min(7, 'L\'adresse doit contenir au moins 7 caractères')
    .max(200, 'L\'adresse ne peut pas dépasser 200 caractères'),
  
  city: z
    .string()
    .min(2, 'La ville est requise')
    .max(50, 'Le nom de la ville ne peut pas dépasser 50 caractères'),
  
  wilaya: z
    .string()
    .min(1, 'Veuillez sélectionner une wilaya'),
});

// Complete Checkout Schema (COD only - no payment step)
export const checkoutSchema = z.object({
  shipping: shippingSchema,
  shippingMethod: z.enum(['bureau', 'domicile'], {
    required_error: 'Veuillez sélectionner un mode de livraison',
  }),
  giftWrap: z.boolean().optional(),
  
});

export type ShippingFormData = z.infer<typeof shippingSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;