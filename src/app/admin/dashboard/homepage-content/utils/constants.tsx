const API_BASE_URL = process.env.NEXT_PUBLIC_LOCAL_URL;

// ثوابت التطبيق
export const API_ENDPOINTS = {
  CONTENT: `${API_BASE_URL}/api/contant`,
  CONTENT_BY_ID: (id: string) => `${API_BASE_URL}/api/contant/${id}`,
  CONTENT_STATUS: (id: string) => `${API_BASE_URL}/api/contant/status/${id}`,
  CONTENT_ORDER: (id: string) => `${API_BASE_URL}/api/contant/order/${id}`,
} as const

export const FORM_VALIDATION = {
  MAX_FILE_SIZE: 15 * 1024 * 1024, // 15MB
  ACCEPTED_IMAGE_TYPES : [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif'
],
} as const

export const UI_CONFIG = {
  ANIMATION_DELAY: 0.1,
  PREVIEW_ANIMATION_DELAY: 0.2,
  LOADING_TIMEOUT: 500,
} as const