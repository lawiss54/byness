'use client'
import dynamic from 'next/dynamic'


const AdminPage = dynamic(
    () => import('@/components/Admin/adminPage'),
    { ssr: false }
)

export default function Admin() {
  return <AdminPage />
}
