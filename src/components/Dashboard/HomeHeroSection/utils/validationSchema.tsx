import { z } from 'zod'

/**
 * مخطط التحقق من صحة بيانات النموذج باستخدام Zod
 */
export const contentFormSchema = z.object({
  title: z.string().optional(),
  badge: z.string().optional(),
  mainTitle: z.string()
    .min(1, "الرجاء إدخال العنوان الرئيسي")
    .max(200, "العنوان الرئيسي طويل جداً"),
  description: z.string()
    .min(1, "الرجاء إدخال الوصف")
    .max(1000, "الوصف طويل جداً"),
  buttonText: z.string().optional(),
  buttonLink: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true
      return val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://')
    }, "الرابط يجب أن يبدأ بـ / أو http:// أو https://"),
  image: z.string().optional(),
  isActive: z.boolean().default(true),
})

export type ContentFormSchema = z.infer<typeof contentFormSchema>
