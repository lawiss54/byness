
'use client'

import { useCallback } from 'react'
import { tiktokTrackEvent } from '@/lib/tiktokPixel.client'


type TiktokStandardEvent =
  | 'PageView'
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'CompletePayment'
  | 'Search'
  | 'Subscribe'
  | 'Contact'
  | 'SubmitForm'

type EventPayload = Record<string, any>

export const useTiktokPixelEvent = () => {
  const trackTiktok = useCallback(
    (event: TiktokStandardEvent, data?: EventPayload) => {
      tiktokTrackEvent(event, data)
    },
    []
  )

  return { trackTiktok }
}
