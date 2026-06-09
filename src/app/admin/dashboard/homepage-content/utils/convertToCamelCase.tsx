import type { ContentSection } from './types'

/**
 * تحويل البيانات من snake_case إلى camelCase
 * @param data البيانات الواردة من الخادم
 * @returns البيانات محولة إلى camelCase
 */
export const convertToCamelCase = (data: any): ContentSection => {
  return {
    id: data.id?.toString() || "",
    badge: data.badge || "",
    mainTitle: data.main_title || "",
    description: data.description || "",
    buttonText: data.button_text || "",
    buttonLink: data.button_link || "",
    image: data.image || "",
    isActive: Boolean(data.is_active),
    order: data.order || 0,
    createdAt: data.created_at || "",
    updatedAt: data.updated_at || "",
  }
}