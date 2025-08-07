'use client'

import { useEffect } from 'react'

export default function ScrollObserver() {
  useEffect(() => {
    const main = document.querySelector('main')

    if (!main) return

    const observer = new MutationObserver(() => {
      const target = main.querySelector('[data-auto-scroll]')
      
      if (target && !target.hasAttribute('data-scroll-done')) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        target.setAttribute('data-scroll-done', 'true') // حتى لا نكرر التمرير
      }
    })

    observer.observe(main, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return null
}