'use client'
import dynamic from 'next/dynamic'

const BoutiquePage = dynamic(
  () => import('@/components/Boutique/boutiquePage'),
    { ssr: false }
)


export default function Boutique() {

  return <BoutiquePage />
}