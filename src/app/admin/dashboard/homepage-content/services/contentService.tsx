import { API_ENDPOINTS } from '../utils/constants'
import { convertToCamelCase } from '../utils/convertToCamelCase'
import type { ContentSection, ContentFormData } from '../utils/types'

/**
 * خدمة إدارة محتوى الصفحة الرئيسية
 */
export class ContentService {
  /**
   * تحميل جميع الأقسام من الخادم
   */
  static async loadSections(): Promise<ContentSection[]> {
    const res = await fetch(API_ENDPOINTS.CONTENT, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!res.ok) {
      throw new Error("Réponse serveur invalide")
    }

    const response = await res.json()

    if (response.data && Array.isArray(response.data)) {
      return response.data.map(convertToCamelCase)
    } else {
      throw new Error("تنسيق البيانات غير صحيح")
    }
  }

  /**
   * إنشاء قسم جديد
   */
  static async createSection(formData: ContentFormData): Promise<any> {
    const sectionData = {
      badge: formData.badge.trim(),
      mainTitle: formData.mainTitle.trim(),
      description: formData.description.trim(),
      buttonText: formData.buttonText.trim(),
      buttonLink: formData.buttonLink.trim(),
      image: formData.image,
      isActive: formData.isActive,
    }

    const response = await fetch(API_ENDPOINTS.CONTENT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(sectionData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "خطأ في إنشاء القسم")
    }

    return await response.json()
  }

  /**
   * تحديث قسم موجود
   */
  static async updateSection(sectionId: string, formData: ContentFormData): Promise<any> {
    const sectionData = {
      badge: formData.badge.trim(),
      mainTitle: formData.mainTitle.trim(),
      description: formData.description.trim(),
      buttonText: formData.buttonText.trim(),
      buttonLink: formData.buttonLink.trim(),
      image: formData.image,
      isActive: formData.isActive,
    }

    const response = await fetch(API_ENDPOINTS.CONTENT_BY_ID(sectionId), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(sectionData),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "خطأ في تحديث القسم")
    }

    return await response.json()
  }

  /**
   * حذف قسم
   */
  static async deleteSection(sectionId: string): Promise<any> {
    const res = await fetch(API_ENDPOINTS.CONTENT_BY_ID(sectionId), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    if (!res.ok) {
      throw new Error("Une erreur s'est produite lors de la connexion au serveur")
    }

    return await res.json()
  }

  /**
   * تغيير حالة القسم (نشط/غير نشط)
   */
  static async toggleSectionStatus(sectionId: string, newStatus: boolean): Promise<any> {
    const res = await fetch(API_ENDPOINTS.CONTENT_STATUS(sectionId), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })

    if (!res.ok) {
      throw new Error("Une erreur s'est produite lors de la connexion au serveur")
    }

    return await res.json()
  }

  /**
   * إعادة ترتيب الأقسام
   */
  static async reorderSections(sections: ContentSection[]): Promise<any> {
    const res = await fetch(API_ENDPOINTS.CONTENT_ORDER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ sections }),
    })

    if (!res.ok) {
      throw new Error("Une erreur s'est produite lors de la connexion au serveur")
    }

    return await res.json()
  }
}
