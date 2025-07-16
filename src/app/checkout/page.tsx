'use client'

import dynamic from 'next/dynamic'




const CheckoutPage = dynamic(
  () => import('@/components/Checkout/CheckoutPage'),
  { ssr: false }
)

export default function Checkout() {
  return <CheckoutPage />;
}