import type React from "react"
import type { ButtonProps } from '../utils/types'

/**
 * مكون الزر الأساسي
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  onClick,
  disabled,
  className = "",
  type = "button",
  title = "",
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`
      inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors whitespace-nowrap
      ${size === "sm"
        ? "px-2 py-1.5 text-sm min-h-[32px]"
        : size === "xs"
          ? "px-1.5 py-1 text-xs min-h-[28px]"
          : "px-4 py-2 min-h-[40px]"
      }
      ${variant === "outline"
        ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        : variant === "ghost"
          ? "text-gray-600 hover:bg-gray-100"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      ${className}
    `}
  >
    {icon}
    <span className={size === "xs" ? "hidden sm:inline" : ""}>{children}</span>
  </button>
)
