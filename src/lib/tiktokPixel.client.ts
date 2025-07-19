'use client'

import TiktokPixel from 'tiktok-pixel'

let isInitialized = false

export const initTiktokPixel = (pixelId: string) => {
  if (typeof window !== 'undefined' && !isInitialized) {
    TiktokPixel.init(pixelId)
    TiktokPixel.pageView()
    isInitialized = true
  }
}

export const tiktokTrackEvent = (eventName: string, payload: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && isInitialized) {
    TiktokPixel.track(eventName, payload)
  }
}
