'use client'
import dynamic from 'next/dynamic';


const HomePage = dynamic(
  () => import('@/components/Home/HomePage'),
  { ssr: false }
);

export default function Home(){
  return <HomePage />
}