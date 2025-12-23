'use client'

import { useEffect } from 'react'
import { useUIStore } from '@/store'

export default function WindowSizeListener() {
  const { computeWindow } = useUIStore()

  useEffect(() => {
    const handleResize = () => {
      computeWindow(window.innerWidth, window.innerHeight)
    }

    handleResize() // Run once on mount
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [computeWindow])

  return null
}
