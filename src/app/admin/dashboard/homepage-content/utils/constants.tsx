// ثوابت التطبيق
export const API_ENDPOINTS = {
  CONTENT: '/api/contant',
  CONTENT_BY_ID: (id: string) => `/api/contant/${id}`,
  CONTENT_STATUS: (id: string) => `/api/contant/status/${id}`,
  CONTENT_ORDER: '/api/contant/order',
} as const

export const FORM_VALIDATION = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_IMAGE_TYPES: ['image/png', 'image/jpg', 'image/jpeg'],
} as const

export const UI_CONFIG = {
  ANIMATION_DELAY: 0.1,
  PREVIEW_ANIMATION_DELAY: 0.2,
  LOADING_TIMEOUT: 500,
} as const
