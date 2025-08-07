import type React from "react"
import type { CardProps } from '../utils/types'

/**
 * مكون البطاقة الأساسي
 */
export const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
    {children}
  </div>
)
