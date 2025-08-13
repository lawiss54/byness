import { z } from 'zod'

/**
 * مخطط التحقق من صحة بيانات النموذج باستخدام Zod
 */
export const contentFormSchema = z.object({
  badge: z.string().optional(),
  mainTitle: z.string()
    .min(1, "Veuillez saisir l’adresse principale")
    .max(200, "L’adresse principale est trop longue"),
  description: z.string()
    .min(1, "Veuillez saisir la description")
    .max(1000, "La description est trop longue"),
  buttonText: z.string().optional(),
  buttonLink: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true
      return val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://')
    }, "Le lien doit commencer par / ou http:// ou https://"),
  image: z.string().optional(),
  isActive: z.boolean().default(true),
})

export type ContentFormSchema = z.infer<typeof contentFormSchema>