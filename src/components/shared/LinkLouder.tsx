'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './Loader';

export default function LinkLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => setLoading(false), 1000) // تأخير وهمي لإظهار الـ loader
    return () => clearTimeout(timeout)
  }, [pathname])
  if(loading){
    return <Loader
      type="fashion"
      size="lg"
      text=" "
    />
  }
  
}