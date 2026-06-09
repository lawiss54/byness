import type React from "react"
import type { InputProps } from '../utils/types'

/**
 * مكون الإدخال الأساسي
 */
export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  required,
  icon,
  className = "",
  error
}) => (
  <div className="relative">
    {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
        error ? 'border-red-300' : 'border-gray-300'
      } ${icon ? "pl-10" : ""} ${className}`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
)
