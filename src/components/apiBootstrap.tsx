'use client'
import dynamic from 'next/dynamic'


const RequestApi = dynamic(
    () => import('@/components/Layout/requestApi'),
    { ssr: false }
)

export default function ApiBootstrap() {
    return <RequestApi />
}
