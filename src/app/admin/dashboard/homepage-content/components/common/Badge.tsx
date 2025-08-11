import type React from "react"
import type { BadgeProps } from '../utils/types'

/**
 * مكون الشارة الأساسي
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className = ""
}) => (
  <span
    className={`
    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
    ${variant === "success"
        ? "bg-green-100 text-green-800"
        : variant === "info"
          ? "bg-blue-100 text-blue-800"
          : "bg-gray-100 text-gray-800"
      }
    ${size === "sm" ? "px-1.5 py-0.5 text-xs" : "px-2 py-1 text-xs"}
    ${className}
  `}
  >
    {children}
  </span>
)
